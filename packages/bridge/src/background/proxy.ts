import { DevToolMessageEnum, DevToolSource } from "@my-react-devtool/core/event";

import { MessageWorkerType, PortName, sourceFrom } from "../type";
import { consumeRuntimeLastError, generatePostMessageWithSource } from "../utils";

import type { MessageHookDataType, MessagePanelDataType, MessageWorkerDataType } from "../type";

const proxyPostMessageWithSource = generatePostMessageWithSource(sourceFrom.proxy);

let port: chrome.runtime.Port | null = null;

const connectPort = (): chrome.runtime.Port | null => {
  if (port) return port;

  try {
    const next = chrome.runtime.connect({ name: PortName.proxy });

    if (chrome.runtime.lastError) {
      consumeRuntimeLastError();
      return null;
    }

    if (!next) {
      return null;
    }

    port = next;
    port.onDisconnect.addListener(handleDisconnect);
    port.onMessage.addListener(sendMessageToContent);
  } catch {
    consumeRuntimeLastError();
    port = null;
  }

  return port;
};

const sendMessageToContent = (message: MessagePanelDataType | MessageWorkerDataType) => {
  proxyPostMessageWithSource(message);
};

const sendMessageToPanel = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data.source !== DevToolSource) return;

  if (message.data.to === sourceFrom.panel) {
    const activePort = connectPort();
    if (!activePort) return;

    try {
      activePort.postMessage({ ...message.data });
    } catch (error) {
      consumeRuntimeLastError();
      try {
        activePort.postMessage({
          type: DevToolMessageEnum.message,
          source: DevToolSource,
          data: { type: "error", message: `Failed to send message to panel. ${(error as Error).message}` },
          from: sourceFrom.proxy,
          to: sourceFrom.panel,
        });
      } catch {
        consumeRuntimeLastError();
      }
    }
  }
};

function handleDisconnect() {
  consumeRuntimeLastError();

  if (port) {
    try {
      port.onMessage.removeListener(sendMessageToContent);
      port.onDisconnect.removeListener(handleDisconnect);
    } catch {
      consumeRuntimeLastError();
    }
    port = null;
  }

  try {
    sendMessageToContent({ type: MessageWorkerType.close, to: sourceFrom.hook });
  } catch {
    consumeRuntimeLastError();
  }

  // Reconnect after transient disconnect — keep the window listener alive.
  setTimeout(() => connectPort(), 100);
}

// Eager connect when proxy is injected so background can pair proxy + devtool ports
// before the panel sends its first message (required for portPip / workerReady).
setTimeout(() => connectPort(), 0);

window.addEventListener("message", sendMessageToPanel);
