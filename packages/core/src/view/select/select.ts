import { getElementNodesFromFiber } from "../../tree";

import { Overlay } from "./overlay";

import type { DevToolCore } from "../../instance";
import type { MyReactFiberNode, MyReactFiberNodeDev } from "@my-react/react-reconciler";

export class Select {
  overlay: Overlay;

  constructor(public readonly agent: DevToolCore) {
    this.agent = agent;
  }

  inspect(fiber: MyReactFiberNode) {
    if (typeof window === "undefined") return;

    this.overlay?.remove?.();

    this.overlay = new Overlay(this.agent);

    this.overlay.inspect(fiber as MyReactFiberNodeDev, getElementNodesFromFiber(fiber));
  }

  remove() {
    if (typeof window === "undefined") return;

    this.overlay?.remove?.();
  }
}
