import { STATE_TYPE, include } from "@my-react/react-shared";

import { debounce } from "../utils";

import type { DevToolCore } from "../instance";
import type { MyReactFiberNode } from "@my-react/react-reconciler";

export const color = {
  update: "rgba(200,50,50,0.8)",
  append: "rgba(50,200,50,0.8)",
  setRef: "rgba(50,50,200,0.8)",
  warn: "rgba(230,150,40,0.8)",
};

/**
 * @internal
 */
export class HighLight {
  mask: HTMLCanvasElement | null = null;

  range = document.createRange();

  running = false;

  __pendingUpdate__: Set<MyReactFiberNode> = new Set();

  __pendingAppend__: Set<MyReactFiberNode> = new Set();

  __pendingSetRef__: Set<MyReactFiberNode> = new Set();

  __pendingWarn__: Set<MyReactFiberNode> = new Set();

  width = 0;

  height = 0;

  constructor(public agent: DevToolCore) {
    
  }

  ready = () => {
    this.mask = document.createElement("canvas");
    this.mask.setAttribute("data-update", "@my-react");
    this.mask.style.cssText = `
      position: fixed;
      z-index: 99999999;
      left: 0;
      top: 0;
      pointer-events: none;
      `;
    document.documentElement.prepend(this.mask);
    this.setSize();
    window.addEventListener("resize", this.setSize);
  }

  setSize = debounce(() => {
    this.width = window.innerWidth || document.documentElement.clientWidth;

    this.height = window.innerHeight || document.documentElement.clientHeight;

    this.mask.width = this.width;

    this.mask.height = this.height;
  });

  highLight = (fiber: MyReactFiberNode, type: "update" | "append" | "setRef" | "warn") => {
    if (!this.mask) {
      this.ready();
    }

    if (fiber.nativeNode) {
      switch (type) {
        case "update":
          this.__pendingUpdate__.add(fiber);
          break;
        case "append":
          this.__pendingAppend__.add(fiber);
          break;
        case "setRef":
          this.__pendingSetRef__.add(fiber);
          break;
        case "warn":
          this.__pendingWarn__.add(fiber);
      }
    }

    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.flashPending);
    }
  };

  processHighlight = (fiber: MyReactFiberNode, context: CanvasRenderingContext2D) => {
    if (include(fiber.state, STATE_TYPE.__unmount__) || !fiber.nativeNode) return;
    try {
      const node = fiber.nativeNode as HTMLElement;
      if (node.nodeType === Node.TEXT_NODE) {
        this.range.selectNodeContents(node);
      } else {
        this.range.selectNode(node);
      }
      const rect = this.range.getBoundingClientRect();
      if (
        (rect.width || rect.height) &&
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        // do the highlight paint
        const left = rect.left - 0.5;
        const top = rect.top - 0.5;
        const width = rect.width + 1;
        const height = rect.height + 1;
        context.strokeRect(
          left < 0 ? 0 : left,
          top < 0 ? 0 : top,
          width > window.innerWidth ? window.innerWidth : width,
          height > window.innerHeight ? window.innerHeight : height
        );
      }
    } catch {
      void 0;
    }
  };

  flashPending = () => {
    const context = this.mask.getContext("2d");

    const allPendingUpdate = new Set(this.__pendingUpdate__);

    this.__pendingUpdate__.clear();

    context.strokeStyle = color.update;

    allPendingUpdate.forEach((fiber) => this.processHighlight(fiber, context));

    const allPendingAppend = new Set(this.__pendingAppend__);

    this.__pendingAppend__.clear();

    context.strokeStyle = color.append;

    allPendingAppend.forEach((fiber) => this.processHighlight(fiber, context));

    const allPendingSetRef = new Set(this.__pendingSetRef__);

    this.__pendingSetRef__.clear();

    context.strokeStyle = color.setRef;

    allPendingSetRef.forEach((fiber) => this.processHighlight(fiber, context));

    const allPendingWarn = new Set(this.__pendingWarn__);

    this.__pendingWarn__.clear();

    context.strokeStyle = color.warn;

    allPendingWarn.forEach((fiber) => this.processHighlight(fiber, context));

    setTimeout(() => {
      context.clearRect(0, 0, this.width, this.height);
      this.running = false;
      if (this.__pendingUpdate__.size || this.__pendingAppend__.size || this.__pendingSetRef__.size) {
        this.running = true;
        this.flashPending();
      }
    }, 100);
  };
}
