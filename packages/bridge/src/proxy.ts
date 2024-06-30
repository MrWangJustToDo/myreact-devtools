import { MessageHookType, MessagePanelType, PortName } from "./type";
import { windowPostMessageWithSource } from "./window";

import type { MessageHookDataType, MessagePanelDataType } from "./type";

const port = chrome.runtime.connect({ name: PortName.proxy });

const sendMessageToBackend = (message: MessagePanelDataType) => {
  windowPostMessageWithSource(message);
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.type === MessageHookType.mount || message.data?.type === MessageHookType.render || message.data?.type === MessageHookType.init) {
    port.postMessage(message.data);
  }
};

const handleDisconnect = () => {
  port.onMessage.removeListener(sendMessageToBackend);

  sendMessageToBackend({ type: MessagePanelType.hide, tabId: "" });

  window.removeEventListener("message", sendMessageToPanel);
};

port.onMessage.addListener(sendMessageToBackend);

port.onDisconnect.addListener(handleDisconnect);

window.addEventListener("message", sendMessageToPanel);
