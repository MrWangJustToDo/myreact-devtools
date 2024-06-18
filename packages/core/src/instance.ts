/* eslint-disable @typescript-eslint/ban-types */
import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { generateFiberTreeToPlainTree, getDetailNodeById } from "./tree";

import type { PlainNode } from "./plain";

export enum DevToolMessageEnum {
  init = "init",
  update = "update",
  detail = "detail",
  unmount = "unmount",
}

export type DevToolMessageType = {
  type: DevToolMessageEnum;
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
};

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  _map: Map<DevToolRenderDispatch, PlainNode> = new Map();

  _hoverId = "";

  _selectId = "";

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

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

    const originalAfterUpdate = dispatch.afterUpdate;

    const onLoad = throttle(() => {
      const tree = generateFiberTreeToPlainTree(dispatch);

      this._map.set(dispatch, tree);

      this.notify({ type: DevToolMessageEnum.init, data: tree });

      this.notifySelect();
    }, 1000);

    dispatch.afterCommit = function (this: DevToolRenderDispatch) {
      originalAfterCommit?.call?.(this);

      onLoad();
    };

    dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
      originalAfterUpdate?.call?.(this);

      onLoad();
    };
  }

  hasDispatch(dispatch: DevToolRenderDispatch) {
    return this._dispatch.has(dispatch);
  }

  delDispatch(dispatch: DevToolRenderDispatch) {
    const tree = this._map.get(dispatch);
    this._map.delete(dispatch);
    this._dispatch.delete(dispatch);
    this.notify({ type: DevToolMessageEnum.unmount, data: tree });
  }

  subscribe(listener: (data: DevToolMessageType) => void) {
    this._listeners.add(listener);

    return () => this._listeners.delete(listener);
  }

  unSubscribe(listener: (data: DevToolMessageType) => void) {
    this._listeners.delete(listener);
  }

  notify(data: DevToolMessageType) {
    this._listeners.forEach((listener) => listener(data));
  }

  getTree(dispatch: DevToolRenderDispatch) {
    const tree = generateFiberTreeToPlainTree(dispatch);
    this._map.set(dispatch, tree);
    return tree;
  }

  setSelect(id: string) {
    this._selectId = id;
  }

  setHover(id: string) {
    this._hoverId = id;
  }

  notifySelect() {
    const id = this._selectId;

    if (!id) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] select id is empty");
      }
      return;
    }

    this.notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  notifyHover() {
    const id = this._hoverId;

    if (!id) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] hover id is empty");
      }
      return;
    }

    this.notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  forceNotify() {
    this._dispatch.forEach((dispatch) => {
      const tree = this.getTree(dispatch);
      this.notify({ type: DevToolMessageEnum.init, data: tree });
    });
    this.notifySelect();
  }
}
