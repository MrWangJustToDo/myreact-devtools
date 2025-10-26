import { MessageDetectorType, MessageHookType, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core/event";

import type { MessageProxyType} from "@my-react-devtool/core/event";

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
  to?: string;
  forward?: string;
};

export type MessagePanelDataType = {
  type: MessagePanelType;
  tabId: number | string;
  data?: any;
  source?: string;
  from?: string;
  to?: string;
  forward?: string;
  agentId?: string;
};

export type MessageWorkerDataType = {
  type: MessageWorkerType;
  source?: string;
  from?: string;
  to?: string;
  forward?: string;
};

export type MessageDetectorDataType = {
  type: MessageDetectorType;
  source?: string;
  from?: string;
  to?: string;
};

export type MessageProxyDataType = {
  type: MessageProxyType;
  data?: any;
  source?: string;
  from?: string;
  to?: string;
}

export enum sourceFrom {
  // message from hook script
  hook = "hook",
  // message from proxy script
  proxy = "proxy",
  // message from devtool panel
  panel = "panel",
  // message from background worker
  worker = "worker",
  // message from iframe 
  iframe = "iframe",
  // message from socket
  socket = "socket",
  // message from detector
  detector = "detector",

  // message from another runtime engine
  forward = "forward",
}
