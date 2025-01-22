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
  enableHover = "panel-enable-hover",
  enableUpdate = "panel-enable-update",
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
  nodeStore = "panel-store",
  nodeTrigger = "panel-trigger",
  nodeSelectForce = "panel-select-force",
  chunk = "panel-chunk",
  clear = "panel-clear",
}

export enum MessageWorkerType {
  init = "worker-init",
  close = "worker-close",
}

export const DevToolSource = "@my-react/devtool";
