/* eslint-disable @typescript-eslint/ban-types */
import { isNormalEquals } from "@my-react/react-shared";

import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { generateTreeMap, getDetailNodeById, getPlainNodeIdByFiber } from "./tree";

import type { Tree } from "./tree";
import type { MyReactFiberNode } from "@my-react/react-reconciler";

export enum DevToolMessageEnum {
  // 初始化，判断是否用@my-react进行页面渲染
  init = "init",
  dir = "dir",
  ready = "ready",
  update = "update",
  trigger = "trigger",
  hmr = "hmr",
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

  // 字符串字典
  _dir = {};

  _hoverId = "";

  _selectId = "";

  _trigger = {};

  _hmr = {};

  _enabled = false;

  _forceEnable = false;

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

  getDispatch() {
    return Array.from(this._dispatch);
  }

  get hasEnable() {
    return this._enabled || this._forceEnable
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

    const onLoad = throttle(() => {
      if (!this.hasEnable) return;

      this.notifyDispatch(dispatch);

      this.notifySelect();
    }, 200);

    const onUnmount = () => {
      if (!this.hasEnable) return;

      this.delDispatch(dispatch);
    }

    const onFiberTrigger = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._trigger[id] = this._trigger[id] ? this._trigger[id] + 1 : 1;

      if (!this.hasEnable) return;

      this.notifyTrigger();
    };

    const onFiberHMR = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._hmr[id] = this._hmr[id] ? this._hmr[id] + 1 : 1;

      if (!this.hasEnable) return;

      this.notifyHMR();
    };

    if (typeof dispatch.onAfterCommit === "function" && typeof dispatch.onAfterUpdate === "function") {
      dispatch.onAfterCommit(onLoad);

      dispatch.onAfterUpdate(onLoad);

      dispatch.onAfterUnmount?.(onUnmount);

      dispatch.onFiberTrigger?.(onFiberTrigger);

      dispatch.onFiberHMR?.(onFiberHMR);

    } else {
      const originalAfterCommit = dispatch.afterCommit;

      const originalAfterUpdate = dispatch.afterUpdate;

      const originalAfterUnmount = dispatch.afterUnmount;

      dispatch.afterCommit = function (this: DevToolRenderDispatch) {
        originalAfterCommit?.call?.(this);

        onLoad();
      };

      // TODO `global patch` flag for performance
      dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
        originalAfterUpdate?.call?.(this);

        onLoad();
      };

      dispatch.afterUnmount = function (this: DevToolRenderDispatch) {
        originalAfterUnmount?.call?.(this);

        onUnmount();
      }
    }
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
    const { directory, current } = generateTreeMap(dispatch);

    if (!isNormalEquals(this._dir, directory)) {
      this._dir = { ...directory };

      this.notifyDir();
    }

    this._map.set(dispatch, current);

    return current;
  }

  setSelect(id: string) {
    this._selectId = id;
  }

  setHover(id: string) {
    this._hoverId = id;
  }

  notifyDir() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.dir, data: this._dir });
  }

  notifyDetector() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.init, data: this._detector });
  }

  notifyTrigger() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.trigger, data: this._trigger });
  }

  notifyHMR() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.hmr, data: this._hmr });
  }

  notifySelect() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) {
      return;
    }

    this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  notifyHover() {
    if (!this.hasEnable) return;

    const id = this._hoverId;

    if (!id) {
      return;
    }

    this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeById(id) });
  }

  notifyDispatch(dispatch: DevToolRenderDispatch) {
    if (!this.hasEnable) return;

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

    this.notifyDir();

    this.notifyHover();

    this.notifyTrigger();

    this.notifyHMR();

    this.notifySelect();
  }, 200);

  connect() {
    if (this._enabled) return;

    if (__DEV__) {
      console.log("[@my-react-devtool/core-instance] connect");
    }

    this._enabled = true;
  }

  disconnect() {
    if (!this._enabled) return;

    if (__DEV__) {
      console.log("[@my-react-devtool/core-instance] disconnect");
    }

    this._enabled = false;
  }
}
