/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable max-lines */
import { disableBrowserHover, enableBrowserHover, inspectCom, inspectDom, inspectSource, setHoverStatus, setRetriggerStatus, setUpdateStatus } from "./config";
import { getNode } from "./data";
import { getChunkDataFromIds, getMapValueLengthObject, getRecord, getTree, getValidTrigger, getValidTriggerStatus, patchEvent, patchRecord } from "./dispatch";
import { DevToolMessageEnum } from "./event";
import { updateFiberNode } from "./fiber";
import { getHMRInternalFromId } from "./fiber/hmr";
import { setupDispatch, type DevToolRenderDispatch } from "./setup";
import { getFiberNodeById, getPlainNodeIdByFiber, getComponentFiberByDom, getElementNodesFromFiber, getRootTreeByFiber, inspectFiber } from "./tree";
import { debounce } from "./utils";
import { Select, Highlight } from "./view";

import type { StackItemType } from "./dispatch";
import type { HMRStatus } from "./event";
import type { Tree } from "./tree";
import type { MyReactFiberNode, UpdateQueueDev, UpdateState } from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

export type DevToolMessageType = {
  type: DevToolMessageEnum;
  data: any;
  agentId?: number | string;
};

export class DevToolCore {
  _dispatch: Set<DevToolRenderDispatch> = new Set();

  // 是否存在 @my-react
  _detector = false;

  _origin = "";

  _map: Map<DevToolRenderDispatch, Tree> = new Map();

  _timeMap: Map<DevToolRenderDispatch, number> = new Map();

  _stack: Array<{
    stack: StackItemType;
    id: string;
    mode: "legacy" | "concurrent";
    list?: Array<{ n: string; i: string; updater?: UpdateQueueDev[] }>;
  }> = [];

  // 字符串字典
  _dir: Record<string | number, string> = {};

  _hmr: Record<string | number, HMRStatus[]> = {};

  _error: Record<string | number, any> = {};

  _warn: Record<string | number, any> = {};

  _hoverId = "";

  _selectId = "";

  _selectDom = null;

  _selectNode = null;

  _hasSelectChange = false;

  _tempDomHoverId = "";

  _domHoverId = "";

  _trigger: Record<string | number, Array<Partial<UpdateState>>> = {};

  _state: Record<string | number, number> = {};

  _source = null;

  _needUnmount = false;

  _enabled = false;

  // 在开发工具中选中组件定位到浏览器中
  _enableHover = false;

  _enableUpdate = false;

  _enableRecord = false;

  _supportRecord = false;

  // 在浏览器中选中dom定位到开发工具组件树中
  _enableHoverOnBrowser = false;

  // 显示Retrigger的触发状态
  _enableRetrigger = false;

  _listeners: Set<(data: DevToolMessageType) => void> = new Set();

  version = __VERSION__;

  select: Select;

  update: Highlight;

  id = Math.random().toString(16).slice(2);

  constructor() {
    this.update = new Highlight(this);

    this.select = new Select(this);
  }

  getDispatch() {
    return Array.from(this._dispatch);
  }

  get hasEnable() {
    return this._enabled;
  }

  setHoverStatus(d: boolean) {
    setHoverStatus(this, d);
  }

  enableBrowserHover() {
    enableBrowserHover(this);
  }

  disableBrowserHover() {
    disableBrowserHover(this);
  }

  setUpdateStatus(d: boolean) {
    setUpdateStatus(this, d);
  }

  setRetriggerStatus(d: boolean) {
    setRetriggerStatus(this, d);
  }

  addDispatch(dispatch: DevToolRenderDispatch) {
    if (dispatch) this._detector = true;

    if (this.hasDispatch(dispatch)) return;

    setupDispatch(dispatch, this);

    this._dispatch.add(dispatch);

    this.patchDispatch(dispatch);
  }

  patchDispatch(dispatch: DevToolRenderDispatch) {
    patchEvent(dispatch, this);
    patchRecord(dispatch, this);
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
    this._listeners.forEach((listener) => listener({ ...data, agentId: this.id }));
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

    this.select.remove();

    if (this._hoverId) {
      const fiber = getFiberNodeById(this._hoverId);

      if (fiber) {
        this.select.inspect(fiber);
      }
    } else {
      this.select.remove();
    }
  }

  inspectDom(agentId?: number | string) {
    if (agentId && agentId !== this.id) {
      this.notifyMessage("cannot inspect dom from other agent", "error");

      return;
    }

    inspectDom(this);
  }

  inspectCom(agentId?: number | string) {
    if (agentId && agentId !== this.id) {
      this.notifyMessage("cannot inspect com from other agent", "error");

      return;
    }

    inspectCom(this);
  }

  inspectSource(agentId?: number | string) {
    if (agentId && agentId !== this.id) {
      this.notifyMessage("cannot inspect source from other agent", "error");

      return;
    }

    inspectSource(this);
  }

  inspectFun(source?: string) {
    globalThis["inspect"](source);
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

    const state = getValidTrigger(this);

    this._notify({ type: DevToolMessageEnum.trigger, data: state });
  }

  notifyTriggerStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const state = getValidTriggerStatus(id, this);

    if (!state) return;

    this._notify({ type: DevToolMessageEnum.triggerStatus, data: state });
  }

  notifyHighlight(id: string, type: "performance") {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.highlight, data: { id, type } });
  }

  notifyWarn() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.warn,
      data: getMapValueLengthObject(this._warn),
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
      data: getMapValueLengthObject(this._error),
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

    const tree = getRootTreeByFiber(list.head.value);

    this._notify({ type: DevToolMessageEnum.ready, data: tree });
  }

  notifyHMR() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.hmr, data: getMapValueLengthObject(this._hmr) });
  }

  notifyHMRStatus() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const status = this._hmr[id];

    if (!status) return;

    this._notify({ type: DevToolMessageEnum.hmrStatus, data: status });
  }

  notifyHMRExtend() {
    if (!this.hasEnable) return;

    const id = this._selectId;

    if (!id) return;

    const extend = getHMRInternalFromId(id);

    this._notify({ type: DevToolMessageEnum.hmrInternal, data: extend ? getNode(extend) : null });
  }

  notifyConfig() {
    if (!this.hasEnable) return;

    this._notify({
      type: DevToolMessageEnum.config,
      data: {
        enableHover: this._enableHover,
        enableUpdate: this._enableUpdate,
        enableRetrigger: this._enableRetrigger,
        enableRecord: this._enableRecord,
        supportRecord: this._supportRecord,
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

      const detailNode = inspectFiber(fiber);

      this._selectNode = detailNode;

      this._notify({ type: DevToolMessageEnum.detail, data: detailNode });
    } else {
      this._notify({ type: DevToolMessageEnum.detail, data: null });
    }
  }

  notifyRunning(id: number | string) {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.running, data: id });
  }

  notifySelectSync() {
    if (!this.hasEnable) return;

    if (this._hasSelectChange) {
      this._hasSelectChange = false;

      this._notify({ type: DevToolMessageEnum.selectSync, data: this._selectId });
    }
  }

  notifyUnmountNode(id: number | string) {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.unmountNode, data: id });
  }

  notifyDomHover() {
    if (!this.hasEnable) return;

    this._notify({ type: DevToolMessageEnum.domHover, data: this._domHoverId });
  }

  notifySource() {
    if (!this.hasEnable) return;

    // notify devtool to inspect source
    this._notify({ type: DevToolMessageEnum.source, data: true });
  }

  notifyChunks(ids: (number | string)[]) {
    if (!this.hasEnable) return;

    const data = getChunkDataFromIds(ids);

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
        this._timeMap.set(dispatch, now);

        const { current, directory } = getTree(dispatch, this);

        if (directory) this.notifyDir();

        this._notify({ type: DevToolMessageEnum.ready, data: current });
      } else {
        const last = this._timeMap.get(dispatch);

        if (last && now - last < 200) return;

        this._timeMap.set(dispatch, now);

        const { current, directory } = getTree(dispatch, this);

        if (directory) this.notifyDir();

        this._notify({ type: DevToolMessageEnum.ready, data: current });
      }
    }
  }

  notifyRecordStack() {
    if (!this.hasEnable) return;

    const data = getRecord(this);

    data.map((item) => this._notify({ type: DevToolMessageEnum.record, data: item }));

    this._notify({ type: DevToolMessageEnum.record, data: true });
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

    this.notifyHMRExtend();

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

    this.select.remove();

    this.update.cancelPending();

    if (__DEV__) {
      console.log("[@my-react-devtool/core] disconnect");
    }

    this._enabled = false;
  }

  startRecord() {}

  stopRecord() {}

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

    this._enableHoverOnBrowser = false;

    this.disableBrowserHover();

    this.stopRecord();
  }

  clearHMR() {
    this._hmr = {};

    this.notifyHMR();

    this.notifyHMRStatus();
  }

  clearMessage() {
    this._warn = {};

    this._error = {};

    this.notifyWarn();

    this.notifyError();

    this.notifyWarnStatus();

    this.notifyErrorStatus();
  }

  clearTrigger() {
    this._trigger = {};

    this.notifyTrigger();

    this.notifyTriggerStatus();
  }
}
