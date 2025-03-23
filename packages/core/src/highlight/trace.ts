import { getComponentFiberByFiber } from "../tree";
import { getFiberName } from "../utils";

import { destroy as destroyCanvas, draw } from "./canvas";
import { getNestedBoundingClientRect } from "./utils";

import type { DevToolCore } from "../instance";
import type { Rect } from "./utils";
import type { MyReactFiberNode, MyReactFiberNodeDev } from "@my-react/react-reconciler";

// How long the rect should be shown for?
const DISPLAY_DURATION = 250;

// What's the longest we are willing to show the overlay for?
// This can be important if we're getting a flurry of events (e.g. scroll update).
const MAX_DISPLAY_DURATION = 3000;

// How long should a rect be considered valid for?
const REMEASUREMENT_AFTER_DURATION = 250;

// Markers for different types of HOCs
// const HOC_MARKERS = new Map([
//   ['Forget', '✨'],
//   ['Memo', '🧠'],
// ]);

// Some environments (e.g. React Native / Hermes) don't support the performance API yet.
const getCurrentTime = typeof performance === "object" && typeof performance.now === "function" ? () => performance.now() : () => Date.now();

export type Data = {
  count: number;
  expirationTime: number;
  lastMeasuredAt: number;
  rect: Rect | null;
  displayName: string | null;
};

const nodeToData: Map<HTMLElement, Data> = new Map();

let drawAnimationFrameID: number | null = null;
let redrawTimeoutID: NodeJS.Timeout | null = null;

function traceUpdates(fibers: Set<MyReactFiberNode>): void {
  fibers.forEach((fiber) => {
    const node = fiber.nativeNode as HTMLElement;

    if (!node) return;

    const data = nodeToData.get(node);

    const now = getCurrentTime();

    let lastMeasuredAt = data != null ? data.lastMeasuredAt : 0;
    let rect = data != null ? data.rect : null;

    if (rect === null || lastMeasuredAt + REMEASUREMENT_AFTER_DURATION < now) {
      lastMeasuredAt = now;
      rect = measureNode(node);
    }

    const comFiber = getComponentFiberByFiber(fiber);

    const displayName = getFiberName((comFiber || fiber) as MyReactFiberNodeDev);
    
    nodeToData.set(node, {
      count: data != null ? data.count + 1 : 1,
      expirationTime: data != null ? Math.min(now + MAX_DISPLAY_DURATION, data.expirationTime + DISPLAY_DURATION) : now + DISPLAY_DURATION,
      lastMeasuredAt,
      rect,
      displayName,
    });
  });

  if (redrawTimeoutID !== null) {
    clearTimeout(redrawTimeoutID);
    redrawTimeoutID = null;
  }

  if (drawAnimationFrameID === null) {
    drawAnimationFrameID = requestAnimationFrame(prepareToDraw);
  }
}

function prepareToDraw(): void {
  drawAnimationFrameID = null;
  redrawTimeoutID = null;

  const now = getCurrentTime();
  let earliestExpiration = Number.MAX_VALUE;

  // Remove any items that have already expired.
  nodeToData.forEach((data, node) => {
    if (data.expirationTime < now) {
      nodeToData.delete(node);
    } else {
      earliestExpiration = Math.min(earliestExpiration, data.expirationTime);
    }
  });

  draw(nodeToData);

  if (earliestExpiration !== Number.MAX_VALUE) {
    redrawTimeoutID = setTimeout(prepareToDraw, earliestExpiration - now);
  }
}

function measureNode(node: HTMLElement): Rect | null {
  if (!node || typeof node.getBoundingClientRect !== "function") {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const currentWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;

  return getNestedBoundingClientRect(node, currentWindow);
}

export class Highlight {
  pendingUpdates: Set<MyReactFiberNode> = new Set();

  constructor(public readonly agent: DevToolCore) {
    this.agent = agent;
  }

  addPending(fiber: MyReactFiberNode, type: "update" | "append" | "setRef" | "warn"): void {
    if (type === "update") {
      this.pendingUpdates.add(fiber);
    }
  }

  flushPending(): void {
    traceUpdates(this.pendingUpdates);
    this.pendingUpdates.clear();
  }

  cancelPending(): void {
    nodeToData.clear();

    if (drawAnimationFrameID !== null) {
      cancelAnimationFrame(drawAnimationFrameID);
      drawAnimationFrameID = null;
    }

    if (redrawTimeoutID !== null) {
      clearTimeout(redrawTimeoutID);
      redrawTimeoutID = null;
    }

    destroyCanvas();
  }
}
