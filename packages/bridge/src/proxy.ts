import { MessageHookType, PortName } from "./type";

import type { MessageHookDataType, MessagePanelDataType } from "./type";

const port = chrome.runtime.connect({ name: PortName.proxy });

const sendMessageToBackend = (message: MessagePanelDataType) => {
  window.postMessage(message, "*");
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.type === MessageHookType.mount || message.data?.type === MessageHookType.render || message.data?.type === MessageHookType.init) {
    port.postMessage(message.data);
  }
};

const handleDisconnect = () => {
  port.onMessage.removeListener(sendMessageToBackend);
  window.removeEventListener("message", sendMessageToPanel);
};

port.onMessage.addListener(sendMessageToBackend);

port.onDisconnect.addListener(handleDisconnect);

window.addEventListener("message", sendMessageToPanel);
