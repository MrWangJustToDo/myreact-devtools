export enum MessageHookType {
  init = "hook-init",
  mount = "hook-mount",
  render = "hook-render",
}

export enum MessageProxyType {
  ready = "proxy-ready",
}

export enum MessagePortType {
  init = "port-init",
}

export type MessageProxyDataType = {
  type: MessageProxyType;
  data: any;
};

export type MessageHookDataType = {
  type: MessageHookType;
  data: any;
};

export type MessagePortDataType = {
  type: MessagePortType;
  data: any;
};
