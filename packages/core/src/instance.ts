/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable max-lines */
import { isNormalEquals } from "@my-react/react-shared";

import { getNode, getNodeFromId } from "./data";
import { DevToolMessageEnum, HMRStatus } from "./event";
import { HighLight, Overlay, color as _color } from "./highlight";
import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import {
  generateTreeMap,
  getDetailNodeByFiber,
  getFiberNodeById,
  getPlainNodeArrayByList,
  getPlainNodeIdByFiber,
  getTreeByFiber,
  getComponentFiberByDom,
  getElementNodesFromFiber,
} from "./tree";
import { debounce, throttle } from "./utils";

import type { Tree } from "./tree";
import type { MyReactFiberNode, MyReactFiberNodeDev } from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

export type DevToolMessageType = {
  type: DevToolMessageEnum;
  data: any;
};

let cb = () => {};

const map = new Map();

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  // 是否存在 @my-react
  _detector = false;

  _origin = "";

  _map: Map<DevToolRenderDispatch, Tree> = new Map();

  // 字符串字典
  _dir = {};

  _hmr = {};

  _hmrStatus = {};

  _error = {};

  _warn = {};

  _hoverId = "";

  _selectId = "";

  _tempDomHoverId = "";

  _domHoverId = "";

  _trigger = {};

  _state = {};

  _source = null;

  _needUnmount = false;

  _enabled = false;

  // 在开发工具中选中组件定位到浏览器中
  _enableHover = false;

  _enableUpdate = false;

  // 在浏览器中选中dom定位到开发工具组件树中
  _enableHoverOnBrowser = false;

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
    return this._enabled;
  }

  setHoverStatus(d: boolean) {
    if (__DEV__) {
      console.log(`[@my-react-devtool/core] hoverStatus ${d ? "enable" : "disable"}`);
    }

    this._enableHover = d;
  }

  setHoverOnBrowserStatus(d: boolean, cb?: (state: boolean) => void) {
    if (__DEV__) {
      console.log(`[@my-react-devtool/core] hoverOnBrowserStatus ${d ? "enable" : "disable"}`);
    }

    this._enableHoverOnBrowser = d;

    cb?.(d);
  }

  enableBrowserHover() {
    if (!this.hasEnable) return;

    if (this._enableHoverOnBrowser) return;

    if (typeof document === "undefined") {
      if (__DEV__) {
        console.warn("[@my-react-devtool/core] current env not support");
      }
      return;
    }

    this._enableHoverOnBrowser = true;

    this.select?.remove?.();

    const debounceNotifyDomHover = debounce(() => {
      this.notifyDomHover();
    }, 100);

    const onMouseEnter = debounce((e: MouseEvent) => {
      const target = e.target as HTMLElement;

      this.select?.remove?.();

      if (!this.hasEnable) return;

      if (target.nodeType === Node.ELEMENT_NODE) {
        const fiber = getComponentFiberByDom(target);

        if (fiber) {
          this.select?.remove?.();

          this.select = new Overlay(this);

          this.select.inspect(fiber as MyReactFiberNodeDev, getElementNodesFromFiber(fiber));

          const id = getPlainNodeIdByFiber(fiber);

          this._tempDomHoverId = id;

          // debounceNotifyDomHover();
        }
      }
    }, 16);

    const onClick = (e: MouseEvent) => {
      if (!this.hasEnable) return;

      this._domHoverId = this._tempDomHoverId;

      debounceNotifyDomHover();

      e.stopPropagation();

      e.preventDefault();
    };

    document.addEventListener("mouseenter", onMouseEnter, true);

    document.addEventListener("click", onClick, true);

    document.addEventListener("mousedown", onClick, true);

    document.addEventListener("pointerdown", onClick, true);

    cb = () => {
      this._enableHoverOnBrowser = false;

      this.select?.remove?.();

      document.removeEventListener("mouseenter", onMouseEnter, true);

      document.removeEventListener("click", onClick, true);

      document.removeEventListener("mousedown", onClick, true);

      document.removeEventListener("pointerdown", onClick, true);
    };
  }

  disableBrowserHover() {
    if (!this._enableHoverOnBrowser) return;

    cb();
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

    setupDispatch(dispatch, this);

    this._dispatch.add(dispatch);

    this.patchDispatch(dispatch);
  }

  patchDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch["$$hasDevToolPatch"]) return;

    dispatch["$$hasDevToolPatch"] = true;

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
    };

    const onUnmount = () => {
      // if (!this.hasEnable) return;

      this._needUnmount = true;

      this.delDispatch(dispatch);
    };

    const onFiberTrigger = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._trigger[id] = this._trigger[id] ? this._trigger[id] + 1 : 1;

      if (!this.hasEnable) return;

      this.notifyTrigger();
    };

    const onFiberUpdate = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      if (!this.hasEnable) return;

      if (id === this._selectId) this.notifySelect();
    };

    const onFiberState = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._state[id] = this._state[id] ? this._state[id] + 1 : 1;
    };

    const onFiberHMR = (fiber: MyReactFiberNode, forceRefresh?: boolean) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._hmr[id] = this._hmr[id] ? this._hmr[id] + 1 : 1;

      if (typeof forceRefresh === "boolean") {
        this._hmrStatus[id] = forceRefresh ? HMRStatus.remount : HMRStatus.refresh;
      }

      if (!this.hasEnable) return;

      this.notifyHMR();

      if (typeof forceRefresh === "boolean") {
        this.notifyHMRStatus();
      }

      this.notifyDispatch(dispatch, true);
    };

    const onFiberWarn = (fiber: MyReactFiberNode, ...args: any[]) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._warn[id] = this._warn[id] || [];

      this._warn[id].push(args);

      this.notifyWarn();
    };

    const onFiberError = (fiber: MyReactFiberNode, ...args: any[]) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._error[id] = this._error[id] || [];

      this._error[id].push(args);

      this.notifyError();
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

      dispatch.onFiberState?.(onFiberState);

      dispatch.onFiberTrigger?.(onFiberTrigger);

      dispatch.onPerformanceWarn?.(onPerformanceWarn);

      dispatch.onFiberChange?.(onChange);

      dispatch.onFiberUpdate?.(onFiberUpdate);

      dispatch.onFiberHMR?.(onFiberHMR);

      dispatch.onDOMUpdate?.(onDOMUpdate);

      dispatch.onDOMAppend?.(onDOMAppend);

      dispatch.onDOMSetRef?.(onDOMSetRef);

      dispatch.onFiberError?.(onFiberError);

      dispatch.onFiberWarn?.(onFiberWarn);
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

  setSource(source: any) {
    this._source = source;
  }

  showHover() {
    if (!this._enableHover) return;

    this.select?.remove?.();

    this.select = new Overlay(this);

    if (this._hoverId) {
      const fiber = getFiberNodeById(this._hoverId);

      if (fiber) {
        this.select.inspect(fiber as MyReactFiberNodeDev, getElementNodesFromFiber(fiber));
      }
    } else {
      this.select?.remove?.();

      this.select = null;
    }
  }

  inspectDom() {
    if (!this.hasEnable) return;

    const fiber = getFiberNodeById(this._selectId);

    const domArray = getElementNodesFromFiber(fiber);

    const dom = domArray[0];

    if (typeof inspect === "function" && dom) {
      inspect(dom);

      return;
    }

    this.notifyMessage(`current id: ${this._selectId} of fiber not contain dom node`, "warning");
  }

  inspectSource() {
    if (!this.hasEnable) return;

    if (typeof this._source === "function") {
      const s = this._source;

      this._source = null;

      inspect(s);

      return;
    }

    this.notifyMessage(`can not view source for current item`, "warning");
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

  notifyWarn() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.warn,
      data: Object.keys(this._warn).reduce((p, c) => {
        p[c] = this._warn[c].map((i) => getNode(i));
        return p;
      }, {}),
    });
  }

  notifyError() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.error,
      data: Object.keys(this._error).reduce((p, c) => {
        p[c] = this._error[c].map((i) => getNode(i));
        return p;
      }, {}),
    });
  }

  // TODO
  notifyChanged(list: ListTree<MyReactFiberNode>) {
    if (!this.hasEnable) return;

    const tree = getTreeByFiber(list.head.value);

    this._notify({ type: DevToolMessageEnum.ready, data: tree });
  }

  notifyHMR() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.hmr, data: this._hmr });
  }

  notifyHMRStatus() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.hmrStatus, data: this._hmrStatus });
  }

  notifyConfig() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.config,
      data: { enableHover: this._enableHover, enableUpdate: this._enableUpdate, enableHoverOnBrowser: this._enableHoverOnBrowser },
    });
  }

  notifySelect(force = false) {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const fiber = getFiberNodeById(id);

    if (fiber) {
      if (__DEV__) {
        console.log("[@my-react-devtool/core] current select fiber", fiber);
      }

      this._notify({ type: DevToolMessageEnum.detail, data: getDetailNodeByFiber(fiber, force) });
    } else {
      this._notify({ type: DevToolMessageEnum.detail, data: null });
    }
  }

  notifyUnSelect() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum["select-unmount"], data: null });
  }

  notifyDomHover() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum["dom-hover"], data: this._domHoverId });
  }

  notifySource() {
    if (!this.hasEnable) return;

    // notify devtool to inspect source
    this._notify({ type: DevToolMessageEnum.source, data: true });
  }

  notifyChunks(ids: (number | string)[]) {
    if (!this.hasEnable) return;

    const data = ids.reduce((p, c) => {
      const d = getNodeFromId(Number(c));

      p[c] = { loaded: d };

      return p;
    }, {});

    this._notify({ type: DevToolMessageEnum.chunks, data });
  }

  notifyMessage(message: string, type: "success" | "info" | "warning" | "error") {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.message, data: { message, type } });
  }

  notifyDispatch(dispatch: DevToolRenderDispatch, force?: boolean) {
    if (!this.hasEnable) return;

    if (this._dispatch.has(dispatch)) {
      const now = Date.now();

      if (force) {
        map.set(dispatch, now);

        const tree = this.getTree(dispatch);

        this._notify({ type: DevToolMessageEnum.ready, data: tree });
      } else {
        const last = map.get(dispatch);

        if (last && now - last < 200) return;

        map.set(dispatch, now);

        const tree = this.getTree(dispatch);

        this._notify({ type: DevToolMessageEnum.ready, data: tree });
      }
    }
  }

  notifyAll = debounce(() => {
    this.notifyDetector();

    if (this._needUnmount) {
      this._notify({ type: DevToolMessageEnum.unmount, data: null });
      this._needUnmount = false;
    }

    if (this._dispatch.size) {
      this._dispatch.forEach((dispatch) => {
        this.notifyDispatch(dispatch);
      });
    }

    this.notifyConfig();

    this.notifyDir();

    this.notifyTrigger();

    this.notifyHMR();

    this.notifyHMRStatus();

    this.notifySelect();

    this.notifyWarn();

    this.notifyError();
  }, 200);

  // TODO support multiple connect agent
  connect() {
    if (this._enabled) return;

    if (__DEV__) {
      console.log("[@my-react-devtool/core] connect");
    }

    this._enabled = true;
  }

  disconnect() {
    if (!this._enabled) return;

    this.select?.remove?.();

    this.select = null;

    if (__DEV__) {
      console.log("[@my-react-devtool/core] disconnect");
    }

    this._enabled = false;
  }

  clear() {
    this._error = {};

    this._hmr = {};

    this._hoverId = "";

    this._selectId = "";

    this._source = null;

    this._hmrStatus = {};

    this._domHoverId = "";

    this._tempDomHoverId = "";

    this._state = {};

    this._trigger = {};

    this._warn = {};

    this._enableHoverOnBrowser = false;

    this.disableBrowserHover();
  }
}

export const color = _color;
