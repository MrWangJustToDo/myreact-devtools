import { MessageHookType, MessageProxyType, PortName } from "./type";

import type { MessageHookDataType, MessageWorkerDataType } from "./type";

const port = chrome.runtime.connect({ name: PortName.proxy });

const sendMessageToBackend = (message: MessageWorkerDataType) => {
  window.postMessage({ type: MessageProxyType.forward, data: message }, "*");
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.type === MessageHookType.mount || message.data?.type === MessageHookType.render || message.data?.type === MessageHookType.init) {
    port.postMessage({ type: MessageProxyType.forward, data: message.data });
  }
};

const handleDisconnect = () => {
  window.removeEventListener("message", sendMessageToPanel);
};

port.onMessage.addListener(sendMessageToBackend);

port.onDisconnect.addListener(handleDisconnect);

window.addEventListener("message", sendMessageToPanel);
