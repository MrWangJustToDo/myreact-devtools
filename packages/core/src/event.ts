export enum MessageHookType {
  init = "hook-init",
  mount = "hook-mount",
  render = "hook-render",
  origin = "hook-origin",
  clear = "hook-clear",
}

export enum MessageDetectorType {
  init = "detector-init",
}

export enum MessageProxyType {
  init = "proxy-init",
}

export enum MessagePanelType {
  show = "panel-show",
  hide = "panel-hide",
  varStore = "panel-var-store",
  varSource = "panel-var-source",
  enableHover = "panel-enable-hover",
  enableUpdate = "panel-enable-update",
  enableRetrigger = "panel-enable-retrigger",
  enableHoverOnBrowser = "panel-enable-hover-on-browser",
  enableRecord = "panel-enable-record",
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
  nodeStore = "panel-store",
  nodeEditor = "panel-editor",
  nodeTrigger = "panel-trigger",
  nodeInspect = "panel-inspect",
  chunks = "panel-chunks",
  clear = "panel-clear",
  clearHMR = "panel-clear-hmr",
  clearMessage = "panel-clear-message",
  clearTrigger = "panel-clear-trigger",
}

export enum MessageWorkerType {
  init = "worker-init",
  close = "worker-close",
}

export enum DevToolMessageEnum {
  // 初始化，判断是否用@my-react进行页面渲染
  init = "init",
  dir = "dir",
  config = "config",
  // tree ready
  ready = "ready",
  // tree update
  update = "update",
  changed = "changed",
  highlight = "highlight",
  trigger = "trigger",
  triggerStatus = "triggerStatus",
  hmr = "hmr",
  hmrStatus = "hmrStatus",
  hmrInternal = "hmrInternal",
  source = "source",
  detail = "detail",
  unmount = "unmount",
  unmountNode = "unmount-node",
  selectSync = "select-sync",

  message = "message",

  warn = "warn",
  warnStatus = "warnStatus",
  error = "error",
  errorStatus = "errorStatus",

  chunks = "chunks",
  record = "record",

  domHover = "dom-hover",
}

export enum HMRStatus {
  none = 0,
  refresh = 1,
  remount = 2,
}

export const DevToolSource = "@my-react/devtool";
