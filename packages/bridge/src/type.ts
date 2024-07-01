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
  close = "worker-close",
}

export enum PortName {
  proxy = "dev-tool/proxy",
  panel = "dev-tool/panel",
}

export type MessageHookDataType = {
  type: MessageHookType;
  data: any;
  source?: string;
  from?: string;
};

export type MessagePanelDataType = {
  type: MessagePanelType;
  tabId: number | string;
  data?: any;
  source?: string;
  from?: string;
};

export type MessageWorkerDataType = {
  type: MessageWorkerType;
  source?: string;
  from?: string;
};

export type MessageDetectorDataType = {
  type: MessageDetectorType;
  source?: string;
  from?: string;
};

export const DevToolSource = "@my-react/devtool";

export enum sourceFrom {
  hook = "hook",
  proxy = "proxy",
  panel = "panel",
  worker = "worker",
  detector = "detector",
}
