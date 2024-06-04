/* eslint-disable @typescript-eslint/ban-types */
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

export const debounce = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback.call(null, ...args);
    }, time || 40);
  }) as unknown as T;
};

export const throttle = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    if (id) return;
    id = setTimeout(() => {
      callback.call(null, ...args);
      id = null;
    }, time || 40);
  }) as unknown as T;
}

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  _map: Map<DevToolRenderDispatch, PlainNode> = new Map();

  _listeners: Set<(data: Message) => void> = new Set();

  getDispatch() {
    return Array.from(this._dispatch);
  }

  addDispatch(dispatch: DevToolRenderDispatch) {
    if (this.hasDispatch(dispatch)) return;

    setupDispatch(dispatch);

    this._dispatch.add(dispatch);

    this.patchDispatch(dispatch);
  }

  patchDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch.hasPatch) return;

    dispatch.hasPatch = true;

    const originalAfterCommit = dispatch.afterCommit;

    // const originalAfterUpdate = dispatch.afterUpdate;

    const onLoad = throttle(() => {
      const tree = generateFiberTreeToPlainTree(dispatch);

      this._map.set(dispatch, tree);

      this.notify({ type: MessageType.init, data: tree });
    }, 10000);

    dispatch.afterCommit = function (this: DevToolRenderDispatch) {
      originalAfterCommit?.call?.(this);

      onLoad();
    };

    // dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
    //   originalAfterUpdate?.call?.(this);

    //   onLoad();
    // };
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

  getTree(dispatch: DevToolRenderDispatch) {
    const tree = generateFiberTreeToPlainTree(dispatch);
    this._map.set(dispatch, tree);
    return tree;
  }

  forceNotify() {
    this._dispatch.forEach((dispatch) => {
      const tree = this.getTree(dispatch);
      this.notify({ type: MessageType.init, data: tree });
    });
  }
}
