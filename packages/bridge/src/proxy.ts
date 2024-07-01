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
    port.postMessage(message.data);
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
