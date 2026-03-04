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
  // message from hook script, `content` dir
  hook = "hook",
  // message from proxy script, `backend` dir
  proxy = "proxy",
  // message from devtool panel, `panel` dir
  panel = "panel",
  // message from background worker, `background` dir
  worker = "worker",
  // message from iframe, chrome/src/hooks/useBridgeForward.ts
  iframe = "iframe",
  // message from socket, chrome/src/hooks/useWebDev.ts
  socket = "socket",
  // message from detector, `popover` dir
  detector = "detector",

  // message from another runtime engine
  forward = "forward",
}
