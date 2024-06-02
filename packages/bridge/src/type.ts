export enum MessageHookType {
  init = "hook-init",
  mount = "hook-mount",
  render = "hook-render",
}

export enum MessageDetectorType {
  init = "detector-init",
}

export enum MessageProxyType {
  ready = "proxy-ready",
  unmount = "proxy-unmount",
  forward = "proxy-forward",
}

export enum MessagePanelType {
  show = "panel-show",
  hide = "panel-hide",
}

export enum MessageWorkerType {
  forward = "worker-forward",
}

export enum PortName {
  proxy = "dev-tool/proxy",
  panel = "dev-tool/panel",
}

export type MessageProxyDataType<T = any> = {
  type: MessageProxyType;
  data: T;
};

export type MessageWorkerDataType<T = any> = {
  type: MessageWorkerType;
  data: T;
};

export type MessageHookDataType = {
  type: MessageHookType;
  data: any;
};

export type MessagePanelDataType = {
  type: MessagePanelType;
  tabId: number | string;
  data?: any;
};

export const getData = (message: { type: MessageWorkerType; data: any }) => {
  if (message.type) {
    getData(message.data);
  } else {
    return message;
  }
};
