import { MessageDetectorType, MessageHookType, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";

export { MessageDetectorType, MessageHookType, MessagePanelType, MessageWorkerType };

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
  iframe = "iframe",
  detector = "detector",
}
