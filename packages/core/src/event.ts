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
  enableHoverOnBrowser = "panel-enable-hover-on-browser",
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
  nodeStore = "panel-store",
  nodeTrigger = "panel-trigger",
  nodeInspect = "panel-inspect",
  nodeSelectForce = "panel-select-force",
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
  hmr = "hmr",
  hmrStatus = "hmrStatus",
  run = "run",
  source = "source",
  detail = "detail",
  unmount = "unmount",
  ["select-sync"] = "select-sync",
  ["select-unmount"] = "select-unmount",

  message = "message",

  warn = "warn",
  error = "error",

  chunks = "chunks",

  ["dom-hover"] = "dom-hover",
}

export enum HMRStatus {
  refresh = 1,
  remount = 2,
}

export const DevToolSource = "@my-react/devtool";
