/* eslint-disable @typescript-eslint/ban-types */
import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { generateTreeMap, getDetailNodeById } from "./tree";

import type { Tree } from "./tree";

export enum DevToolMessageEnum {
  // 初始化，判断是否用@my-react进行页面渲染
  init = "init",
  ready = "ready",
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

  // 是否存在 @my-react
  _detector = false;

  _map: Map<DevToolRenderDispatch, Tree> = new Map();

  _hoverId = "";

  _selectId = "";

  _enabled = false;

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

  getDispatch() {
    return Array.from(this._dispatch);
  }

  addDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch) this._detector = true;

    if (this.hasDispatch(dispatch)) return;

    setupDispatch(dispatch);

    this._dispatch.add(dispatch);

    this.patchDispatch(dispatch);
  }

  patchDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch.hasDevToolPatch) return;

    dispatch.hasDevToolPatch = true;

    const originalAfterCommit = dispatch.afterCommit;

    const originalAfterUpdate = dispatch.afterUpdate;

    const onLoad = throttle(() => {
      if (!this._enabled) return;

      this.notifyDispatch(dispatch);

      this.notifySelect();
    }, 200);

    dispatch.afterCommit = function (this: DevToolRenderDispatch) {
      originalAfterCommit?.call?.(this);

      onLoad();
    };

    // TODO `global patch` flag for performance
    dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
      originalAfterUpdate?.call?.(this);

      onLoad();
    };
  }

  hasDispatch(dispatch: DevToolRenderDispatch) {
    return this._dispatch.has(dispatch);
  }

  delDispatch(dispatch: DevToolRenderDispatch) {
    this._map.delete(dispatch);

    this._dispatch.delete(dispatch);

    this.notifyAll();
  }

  subscribe(listener: (data: DevToolMessageType) => void) {
    this._listeners.add(listener);

    return () => this._listeners.delete(listener);
  }

  unSubscribe(listener: (data: DevToolMessageType) => void) {
    this._listeners.delete(listener);
  }

  _notify(data: DevToolMessageType) {
    this._listeners.forEach((listener) => listener(data));
  }

  getTree(dispatch: DevToolRenderDispatch) {
    const tree = generateTreeMap(dispatch);

    this._map.set(dispatch, tree);

    return tree;
  }

  setSelect(id: string) {
    this._selectId = id;
  }

  setHover(id: string) {
    this._hoverId = id;
  }

  notifyDetector() {
    if (!this._enabled) return;

    this._notify({ type: DevToolMessageEnum.init, data: this._detector });
  }

  notifySelect() {
    if (!this._enabled) return;

    const id = this._selectId;

    if (!id) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] select id is empty");
      }
      return;
    }

    this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  notifyHover() {
    if (!this._enabled) return;

    const id = this._hoverId;

    if (!id) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] hover id is empty");
      }
      return;
    }

    this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  notifyDispatch(dispatch: DevToolRenderDispatch) {
    if (!this._enabled) return;

    if (this._dispatch.has(dispatch)) {
      const tree = this.getTree(dispatch);

      this._notify({ type: DevToolMessageEnum.ready, data: tree });
    }
  }

  notifyAll = debounce(() => {
    this.notifyDetector();

    this._dispatch.forEach((dispatch) => {
      this.notifyDispatch(dispatch);
    });

    this.notifyHover();

    this.notifySelect();
  }, 200);

  connect() {
    this._enabled = true;
  }

  disconnect() {
    this._enabled = false;
  }
}
