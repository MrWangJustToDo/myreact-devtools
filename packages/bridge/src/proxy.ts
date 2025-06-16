import { DevToolMessageEnum } from "@my-react-devtool/core";

import { MessageHookType, MessageWorkerType, PortName, sourceFrom } from "./type";
import { generatePostMessageWithSource } from "./window";

import type { MessageHookDataType, MessagePanelDataType, MessageWorkerDataType } from "./type";

const port = chrome.runtime.connect({ name: PortName.proxy });

const proxyPostMessageWithSource = generatePostMessageWithSource(sourceFrom.proxy);

const sendMessageToBackend = (message: MessagePanelDataType | MessageWorkerDataType) => {
  proxyPostMessageWithSource(message);
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.type === MessageHookType.mount || message.data?.type === MessageHookType.render || message.data?.type === MessageHookType.init) {
    try {
      port.postMessage(message.data);
    } catch (error) {
      port.postMessage({ type: DevToolMessageEnum.message, data: { type: "error", message: `Failed to send message to panel. ${(error as Error).message}` } });
    }
  }
};

const handleDisconnect = () => {
  port.onMessage.removeListener(sendMessageToBackend);

  sendMessageToBackend({ type: MessageWorkerType.close });

  window.removeEventListener("message", sendMessageToPanel);
};

port.onMessage.addListener(sendMessageToBackend);

port.onDisconnect.addListener(handleDisconnect);

window.addEventListener("message", sendMessageToPanel);
