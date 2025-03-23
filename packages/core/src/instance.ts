/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable max-lines */
import { isNormalEquals } from "@my-react/react-shared";

import { getNode, getNodeFromId } from "./data";
import { DevToolMessageEnum, HMRStatus } from "./event";
import { Highlight, Overlay } from "./highlight";
import { type DispatcherType } from "./hook";
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
  updateFiberNode,
} from "./tree";
import { debounce, setPlatform, throttle } from "./utils";

import type { Tree } from "./tree";
import type { CustomRenderPlatform, MyReactFiberNode, MyReactFiberNodeDev, UpdateState } from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

export type DevToolMessageType = {
  type: DevToolMessageEnum;
  data: any;
};

export type DevToolRenderPlatform = CustomRenderPlatform & {
  dispatcher: { current: DispatcherType };
};

let cb = () => {};

const map = new Map();

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  // 是否存在 @my-react
  _detector = false;

  _origin = "";

  _map: Map<DevToolRenderDispatch, Tree> = new Map();

  _platform: DevToolRenderPlatform;

  // 字符串字典
  _dir = {};

  _hmr = {};

  _error = {};

  _warn = {};

  _hoverId = "";

  _selectId = "";

  _selectDom = null;

  _hasSelectChange = false;

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

  // 显示Retrigger的触发状态
  _enableRetrigger = false;

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

  version = __VERSION__;

  select: Overlay;

  update: Highlight;

  constructor() {
    this.update = new Highlight(this);
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
      this.disableBrowserHover();
      this.notifyConfig();
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

  setRetriggerStatus(d: boolean) {
    if (__DEV__) {
      console.log(`[@my-react-devtool/core] retriggerStatus ${d ? "enable" : "disable"}`);
    }

    this._enableRetrigger = d;

    this.notifyTrigger();

    this.notifyTriggerStatus();
  }

  addDispatch(dispatch: DevToolRenderDispatch, platform?: CustomRenderPlatform) {
    if (dispatch) this._detector = true;

    if (this.hasDispatch(dispatch)) return;

    setupDispatch(dispatch, this);

    this._dispatch.add(dispatch);

    if (platform && this._platform && platform !== this._platform) {
      console.warn("[@my-react-devtool/core] you have multiple platform connect, please check");
    }

    if (platform) {
      this._platform = platform as DevToolRenderPlatform;

      setPlatform(this._platform);
    }

    this.patchDispatch(dispatch);
  }

  patchDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch["$$hasDevToolPatch"]) return;

    dispatch["$$hasDevToolPatch"] = true;

    const onLoad = throttle(() => {
      if (!this.hasEnable) return;

      this.notifyDispatch(dispatch);

      this.notifySelect();

      this.notifyHMRStatus();

      this.notifyTriggerStatus();

      this.notifyWarnStatus();

      this.notifyErrorStatus();
    }, 200);

    const onTrace = () => {
      if (!this.hasEnable) return;

      if (!this._enableUpdate) return;

      this.update.flushPending();
    };

    const onChange = (list: ListTree<MyReactFiberNode>) => {
      if (!this.hasEnable) return;

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

    const onFiberTrigger = (fiber: MyReactFiberNode, state: UpdateState) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._trigger[id] = this._trigger[id] || [];

      // 长数据过滤
      if (this._trigger[id].length > 10) {
        const index = this._trigger[id].length - 11;
        this._trigger[id][index] = { isRetrigger: this._trigger[id][index].isRetrigger };
      }

      this._trigger[id].push(state);

      if (!this.hasEnable) return;

      this.notifyTrigger();
    };

    const onFiberUpdate = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      if (!this.hasEnable) return;

      if (id === this._selectId) {
        this.notifySelect();

        this.notifyHMRStatus();

        this.notifyTriggerStatus();

        this.notifyWarnStatus();

        this.notifyErrorStatus();
      }
    };

    const onFiberState = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._state[id] = this._state[id] ? this._state[id] + 1 : 1;
    };

    const onFiberHMR = (fiber: MyReactFiberNode, forceRefresh?: boolean) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._hmr[id] = this._hmr[id] || [];

      this._hmr[id].push(typeof forceRefresh === "boolean" ? (forceRefresh ? HMRStatus.remount : HMRStatus.refresh) : HMRStatus.none);

      if (!this.hasEnable) return;

      this.notifyHMR();

      this.notifyDispatch(dispatch, true);
    };

    const onFiberWarn = (fiber: MyReactFiberNode, ...args: any[]) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._warn[id] = this._warn[id] || [];

      if (this._warn[id].length > 10) {
        const index = this._warn[id].length - 11;
        this._warn[id][index] = 1;
      }

      this._warn[id].push(args);

      this.notifyWarn();
    };

    const onFiberError = (fiber: MyReactFiberNode, ...args: any[]) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      this._error[id] = this._error[id] || [];

      if (this._error[id].length > 10) {
        const index = this._error[id].length - 11;
        this._error[id][index] = 1;
      }

      this._error[id].push(args);

      this.notifyError();
    };

    const onPerformanceWarn = (fiber: MyReactFiberNode) => {
      const id = getPlainNodeIdByFiber(fiber);

      if (!id) return;

      if (this.hasEnable && this._enableUpdate) {
        this.update.addPending(fiber, "warn");
      }

      this.notifyHighlight(id, "performance");
    };

    const onDOMUpdate = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.addPending(fiber, "update");
      }
    };

    const onDOMAppend = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.addPending(fiber, "append");
      }
    };

    const onDOMSetRef = (fiber: MyReactFiberNode) => {
      if (this.hasEnable && this._enableUpdate) {
        this.update.addPending(fiber, "setRef");
      }
    };

    if (typeof dispatch.onAfterCommit === "function" && typeof dispatch.onAfterUpdate === "function") {
      dispatch.onAfterCommit(onLoad);

      dispatch.onAfterUpdate(onTrace);

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
    const fiber = getFiberNodeById(id);

    if (!fiber) return;

    if (id === this._selectId) return;

    const domArray = getElementNodesFromFiber(fiber);

    this._selectId = id;

    this._selectDom = domArray[0];
  }

  setSelectDom(dom: HTMLElement) {
    const fiber = getComponentFiberByDom(dom);

    if (!fiber) return;

    const id = getPlainNodeIdByFiber(fiber);

    if (id === this._selectId) return;

    this._selectId = id;

    this._selectDom = dom;

    this._hasSelectChange = true;
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

    const dom = this._selectDom;

    if (typeof globalThis["inspect"] === "function" && dom) {
      globalThis["inspect"](dom);

      window["$$$$0"] = dom;

      return;
    }

    this.notifyMessage(`current id: ${this._selectId} of fiber not contain dom node`, "warning");
  }

  inspectCom() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const fiber = getFiberNodeById(id);

    if (fiber) {
      const elementType = fiber.elementType;

      if (typeof globalThis["inspect"] === "function" && elementType) {
        globalThis["inspect"](elementType);

        return;
      }
    }

    this.notifyMessage(`current id: ${id} of fiber can not inspect`, "warning");
  }

  inspectSource() {
    if (!this.hasEnable) return;

    if (typeof this._source === "function" && typeof globalThis["inspect"] === "function") {
      const s = this._source;

      this._source = null;

      globalThis["inspect"](s);

      return;
    }

    if (this._source && this._source instanceof HTMLElement && typeof globalThis["inspect"] === "function") {
      const s = this._source;

      this._source = null;

      globalThis["inspect"](s);

      window["$$$$0"] = s;

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

    const state = Object.keys(this._trigger).reduce((p, c) => {
      const t = this._trigger[c];

      const f = t.filter((i: { isRetrigger?: boolean }) => (i.isRetrigger ? this._enableRetrigger : true));

      p[c] = f.length;

      return p;
    }, {});

    this._notify({ type: DevToolMessageEnum.trigger, data: state });
  }

  notifyTriggerStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const status = this._trigger[id];

    if (!status) return;

    const finalStatus = status.filter((i: { isRetrigger?: boolean }) => (i.isRetrigger ? this._enableRetrigger : true)).slice(-10);

    this._notify({ type: DevToolMessageEnum.triggerStatus, data: finalStatus.map((i: any) => getNode(i)) });
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
        p[c] = this._warn[c].length;

        return p;
      }, {}),
    });
  }

  notifyWarnStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const status = this._warn[id];

    if (!status) return;

    const finalStatus = status.slice(-10);

    this._notify({ type: DevToolMessageEnum.warnStatus, data: finalStatus.map((i: any) => getNode(i)) });
  }

  notifyError() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.error,
      data: Object.keys(this._error).reduce((p, c) => {
        p[c] = this._error[c].length;

        return p;
      }, {}),
    });
  }

  notifyErrorStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const status = this._error[id];

    if (!status) return;

    const finalStatus = status.slice(-10);

    this._notify({ type: DevToolMessageEnum.errorStatus, data: finalStatus.map((i: any) => getNode(i)) });
  }

  // TODO
  notifyChanged(list: ListTree<MyReactFiberNode>) {
    if (!this.hasEnable) return;

    const tree = getTreeByFiber(list.head.value);

    this._notify({ type: DevToolMessageEnum.ready, data: tree });
  }

  notifyHMR() {
    if (!this.hasEnable) return;

    const state = Object.keys(this._hmr).reduce((p, c) => {
      p[c] = this._hmr[c].length;

      return p;
    }, {});

    this._notify({ type: DevToolMessageEnum.hmr, data: state });
  }

  notifyHMRStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const status = this._hmr[id];

    if (!status) return;

    this._notify({ type: DevToolMessageEnum.hmrStatus, data: status });
  }

  notifyConfig() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.config,
      data: {
        enableHover: this._enableHover,
        enableUpdate: this._enableUpdate,
        enableRetrigger: this._enableRetrigger,
        enableHoverOnBrowser: this._enableHoverOnBrowser,
      },
    });
  }

  notifySelect() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

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

  notifySelectSync() {
    if (!this.hasEnable) return;

    if (this._hasSelectChange) {
      this._hasSelectChange = false;

      this._notify({ type: DevToolMessageEnum["select-sync"], data: this._selectId });
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

  notifyEditor(params: {
    id: number | string;
    oldVal: any;
    newVal: any;
    hookIndex?: number | string;
    path: string;
    rootId?: number | string;
    parentId?: number | string;
    type?: string;
  }) {
    if (!this.hasEnable) return;

    const fiber = getFiberNodeById(this._selectId);

    const res = updateFiberNode(fiber, params);

    if (typeof res === "string") {
      // have error
      this.notifyMessage(res, "error");
    } else {
      this.notifyMessage("update success", "success");
    }
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

    this.notifySelect();

    this.notifyTrigger();

    this.notifyTriggerStatus();

    this.notifyHMR();

    this.notifyHMRStatus();

    this.notifyWarn();

    this.notifyWarnStatus();

    this.notifyError();

    this.notifyErrorStatus();
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

    this._selectDom = null;

    this._source = null;

    this._domHoverId = "";

    this._tempDomHoverId = "";

    this._state = {};

    this._trigger = {};

    this._warn = {};

    this._platform = null;

    this._enableHoverOnBrowser = false;

    this.disableBrowserHover();
  }
}
