import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { generateFiberTreeToPlainTree } from "./tree";

import type { PlainNode } from "./plain";

enum MessageType {
  init = "init",
  update = "update",
  detail = "detail",
  unmount = "unmount",
}

type Message = {
  type: MessageType;
  data: any;
};

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  _map: Map<DevToolRenderDispatch, PlainNode> = new Map();

  _listeners: Set<(data: Message) => void> = new Set();

  getDispatch() {
    return Array.from(this._dispatch);
  }

  addDispatch(dispatch: DevToolRenderDispatch) {
    setupDispatch(dispatch);
    this._dispatch.add(dispatch);
    const tree = generateFiberTreeToPlainTree(dispatch);
    this._map.set(dispatch, tree);
    this.notify({ type: MessageType.init, data: tree });
  }

  hasDispatch(dispatch: DevToolRenderDispatch) {
    return this._dispatch.has(dispatch);
  }

  delDispatch(dispatch: DevToolRenderDispatch) {
    const tree = this._map.get(dispatch);
    this._map.delete(dispatch);
    this._dispatch.delete(dispatch);
    this.notify({ type: MessageType.unmount, data: tree });
  }

  subscribe(listener: (data: Message) => void) {
    this._listeners.add(listener);

    return () => this._listeners.delete(listener);
  }

  unSubscribe(listener: (data: Message) => void) {
    this._listeners.delete(listener);
  }

  notify(data: Message) {
    this._listeners.forEach((listener) => listener(data));
  }
}
