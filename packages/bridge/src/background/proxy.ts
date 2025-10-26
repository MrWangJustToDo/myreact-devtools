import { DevToolMessageEnum, DevToolSource, MessageProxyType } from "@my-react-devtool/core/event";

import { MessageWorkerType, PortName, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

import type { MessageHookDataType, MessagePanelDataType, MessageProxyDataType, MessageWorkerDataType } from "../type";

let agentId = "";

const port = chrome.runtime.connect({ name: PortName.proxy });

const proxyPostMessageWithSource = generatePostMessageWithSource(sourceFrom.proxy);

const sendMessageToContent = (message: MessagePanelDataType | MessageWorkerDataType) => {
  if (message.to === sourceFrom.hook) {
    proxyPostMessageWithSource(message);
  }
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data.source !== DevToolSource) return;

  if (message.data.to === sourceFrom.panel) {
    if (message.data.data?.agentId && message.data.data.agentId !== agentId) return;

    try {
      port.postMessage({ ...message.data, forward: message.data.forward ? `${message.data.forward}->${sourceFrom.proxy}` : sourceFrom.proxy });
    } catch (error) {
      port.postMessage({
        type: DevToolMessageEnum.message,
        source: DevToolSource,
        data: { type: "error", message: `Failed to send message to panel. ${(error as Error).message}` },
        from: sourceFrom.proxy,
        to: sourceFrom.panel,
      });
    }
  }
};

const onMessage = (message: MessageEvent<MessageProxyDataType>) => {
  if (message.source !== window) return;

  if (message.data.source !== DevToolSource) return;

  if (message.data.to !== sourceFrom.proxy) return;

  if (message.data.type === MessageProxyType.init) {
    agentId = message.data.data;
  }
};

const handleDisconnect = () => {
  port.onMessage.removeListener(sendMessageToContent);

  sendMessageToContent({ type: MessageWorkerType.close, to: sourceFrom.hook });

  window.removeEventListener("message", sendMessageToPanel);
};

// listen message from background worker, then forward to page hook
port.onMessage.addListener(sendMessageToContent);

port.onDisconnect.addListener(handleDisconnect);

// listen message from hook, then forward to worker -> panel
window.addEventListener("message", sendMessageToPanel);

window.addEventListener("message", onMessage);
