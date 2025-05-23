export enum MessageHookType {
  init = "hook-init",
  mount = "hook-mount",
  render = "hook-render",
  origin = "hook-origin",
}

export enum MessageDetectorType {
  init = "detector-init",
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
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
  nodeStore = "panel-store",
  nodeEditor = "panel-editor",
  nodeTrigger = "panel-trigger",
  nodeInspect = "panel-inspect",
  chunks = "panel-chunks",
  clear = "panel-clear",
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
  source = "source",
  detail = "detail",
  unmount = "unmount",
  ["select-sync"] = "select-sync",
  ["select-unmount"] = "select-unmount",

  message = "message",

  warn = "warn",
  warnStatus = "warnStatus",
  error = "error",
  errorStatus = "errorStatus",

  chunks = "chunks",

  ["dom-hover"] = "dom-hover",
}

export enum HMRStatus {
  none = 0,
  refresh = 1,
  remount = 2,
}

export const DevToolSource = "@my-react/devtool";
