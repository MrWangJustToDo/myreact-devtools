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
  nodeHover = "panel-hover",
  nodeSelect = "panel-select",
}

export enum MessageWorkerType {
  init = "worker-init",
}

export enum PortName {
  proxy = "dev-tool/proxy",
  panel = "dev-tool/panel",
}

export type MessageHookDataType = {
  type: MessageHookType;
  data: any;
};

export type MessagePanelDataType = {
  type: MessagePanelType;
  tabId: number | string;
  data?: any;
};
