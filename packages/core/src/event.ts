export enum MessageHookType {
  init = "hook-init",
  mount = "hook-mount",
  render = "hook-render",
}

export enum MessageDetectorType {
  init = "detector-init",
}

export enum MessagePanelType {
  show = "panel-show",
  hide = "panel-hide",
  enableHover = "panel-enable-hover",
  enableUpdate = "panel-enable-update",
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
  nodeSubscriber = "panel-subscriber",
}

export enum MessageWorkerType {
  init = "worker-init",
  close = "worker-close",
}
