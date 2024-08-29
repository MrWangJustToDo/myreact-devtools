/* eslint-disable @typescript-eslint/ban-types */
import { isNormalEquals } from "@my-react/react-shared";

import { HighLight, Overlay } from "./highlight";
import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { generateTreeMap, getDetailNodeByFiber, getFiberNodeById, getPlainNodeArrayByList, getPlainNodeIdByFiber, getTreeByFiber } from "./tree";
import { getElementNodesFromFiber } from "./utils";

import type { Tree } from "./tree";
import type { MyReactFiberNode } from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

const SHOW_DURATION = 2000;

let timeoutID: NodeJS.Timeout | null = null;

// 事件类型
export enum DevToolMessageEnum {
  // 初始化，判断是否用@my-react进行页面渲染
  init = "init",
  dir = "dir",
  ready = "ready",
  update = "update",
  changed = "changed",
  highlight = "highlight",
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

  _enableHover = false;

  _enableUpdate = false;

  _forceEnable = false;

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

  version = __VERSION__;

  select: Overlay;

  update: HighLight;

  constructor() {
    this.update = new HighLight(this);
  }

  getDispatch() {
    return Array.from(this._dispatch);
  }

  get hasEnable() {
    return this._enabled || this._forceEnable;
  }

  setHoverStatus(d: boolean) {
    if (__DEV__) {
      console.log(`[@my-react-devtool/core] hoverStatus ${d ? "enable" : "disable"}`);
    }

    this._enableHover = d;
  }

  setUpdateStatus(d: boolean) {
    if (__DEV__) {
      console.log(`[@my-react-devtool/core] updateStatus ${d ? "enable" : "disable"}`);
    }

    this._enableUpdate = d;
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

    const onChange = (list: ListTree<MyReactFiberNode>) => {
      const { directory } = getPlainNodeArrayByList(list);

      if (!isNormalEquals(this._dir, directory)) {
        this._dir = { ...directory };

        this.notifyDir();
      }

      this.notifyChanged(list);

      this.notifySelect();
    };

    const onUnmount = () => {
      if (!this.hasEnable) return;

      this.delDispatch(dispatch);
    };

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

      this.notifyDispatch(dispatch);
    };

    const onPerformanceWarn = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      if (this.hasEnable && this._enableUpdate) {
        this.update.highLight(fiber, "warn");
      }

      this.notifyHighlight(id, "performance");
    };

    const onDOMUpdate = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.highLight(fiber, "update");
      }
    };

    const onDOMAppend = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.highLight(fiber, "append");
      }
    };

    const onDOMSetRef = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.highLight(fiber, "setRef");
      }
    };

    if (typeof dispatch.onAfterCommit === "function" && typeof dispatch.onAfterUpdate === "function") {
      dispatch.onAfterCommit(onLoad);

      // dispatch.onAfterUpdate(onLoad);

      dispatch.onAfterUnmount?.(onUnmount);

      dispatch.onFiberTrigger?.(onFiberTrigger);

      dispatch.onPerformanceWarn?.(onPerformanceWarn);

      dispatch.onFiberChange?.(onChange);

      dispatch.onFiberHMR?.(onFiberHMR);

      dispatch.onDOMUpdate?.(onDOMUpdate);

      dispatch.onDOMAppend?.(onDOMAppend);

      dispatch.onDOMSetRef?.(onDOMSetRef);
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
      };
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

  showHover() {
    if (!this._enableHover) return;

    clearTimeout(timeoutID);

    this.select?.remove?.();

    this.select = new Overlay(this);

    if (this._hoverId) {
      const fiber = getFiberNodeById(this._hoverId);

      this.select.inspect(getElementNodesFromFiber(fiber));

      timeoutID = setTimeout(() => {
        this.select.remove();

        this.select = null;
      }, SHOW_DURATION);
    }
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

  notifyHighlight(id: string, type: "performance") {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.highlight, data: { id, type } });
  }

  notifyChanged(list: ListTree<MyReactFiberNode>) {
    if (!this.hasEnable) return;

    const tree = getTreeByFiber(list.head.value);

    this._notify({ type: DevToolMessageEnum.ready, data: tree });
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

    const fiber = getFiberNodeById(id);

    if (fiber) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] current select fiber", fiber);
      }

      this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeByFiber(fiber) });
    } else {
      this._notify({ type: DevToolMessageEnum.detail, data: null });
    }
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

    this.notifyTrigger();

    this.notifyHMR();

    this.notifySelect();
  }, 200);

  connect() {
    if (this._enabled) return;

    if (__DEV__) {
      console.log("[@my-react-devtool/core] connect");
    }

    this._enabled = true;
  }

  disconnect() {
    if (!this._enabled) return;

    if (__DEV__) {
      console.log("[@my-react-devtool/core] disconnect");
    }

    this._enabled = false;
  }
}
