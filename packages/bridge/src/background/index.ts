import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageHookType, MessageWorkerType, sourceFrom } from "../type";

import { setExtensionIconForTab } from "./icon";

import type { MessageHookDataType, MessagePanelDataType } from "../type";

const hub: Record<string, { proxy: chrome.runtime.Port | null; devtool: chrome.runtime.Port | null }> = {};

function isNumeric(str: string) {
  return `${+str}` === str;
}

const installProxy = (tabId: number) => {
  chrome.scripting
    .executeScript({ target: { tabId }, files: ["bundle/proxy.js"] })
    .then((res) => {
      if (res && __DEV__) {
        console.log(`[@my-react-devtool/worker] install proxy success for tab: ${tabId}`);
      }
    })
    .catch((err) => {
      if (__DEV__) {
        console.warn(`[@my-react-devtool/worker] install proxy failed for tab: ${tabId}`, err);
      }
    });
};

const portPip = (id: string, port1: chrome.runtime.Port, port2: chrome.runtime.Port) => {
  const onMessagePort1 = (message: MessageHookDataType) => {
    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from hook: ${id}`, message);
    }

    port2.postMessage({ ...message });
  };

  const onMessagePort2 = (message: MessagePanelDataType) => {
    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from panel: ${id}`, message);
    }

    port1.postMessage({ ...message });
  };

  let isShutdown = false;

  function shutdown() {
    if (isShutdown) return;
    isShutdown = true;

    try {
      port1.onMessage.removeListener(onMessagePort1);
    } catch {
      /* already disconnected */
    }
    try {
      port2.onMessage.removeListener(onMessagePort2);
    } catch {
      /* already disconnected */
    }
    try {
      port1.disconnect();
    } catch {
      /* already disconnected */
    }
    try {
      port2.disconnect();
    } catch {
      /* already disconnected */
    }
    hub[id] = null;
  }

  port1.onMessage.addListener(onMessagePort1);

  port2.onMessage.addListener(onMessagePort2);

  port1.onDisconnect.addListener(shutdown);

  port2.onDisconnect.addListener(shutdown);

  port1.postMessage({ type: MessageWorkerType.init, from: sourceFrom.worker, to: sourceFrom.hook, source: DevToolSource });

  port2.postMessage({ type: MessageWorkerType.init, from: sourceFrom.worker, to: sourceFrom.panel, source: DevToolSource });

  if (__DEV__) {
    console.log(`[@my-react-devtool/worker] connected: ${id}`);
  }
};

// forward message devtool -> worker -> proxy -> page
// or page -> proxy -> worker -> devtool
chrome.runtime.onConnect.addListener((port) => {
  let portName = port.name;

  let type: "proxy" | "devtool" = "proxy";

  if (isNumeric(portName)) {
    type = "devtool";
    installProxy(+portName);
  } else {
    portName = port.sender?.tab?.id?.toString();
    type = "proxy";
  }

  if (__DEV__) {
    console.log(`[@my-react-devtool/worker] pre connect: ${portName}`);
  }

  if (!hub[portName]) {
    hub[portName] = { proxy: null, devtool: null };
  }

  hub[portName][type] = port;

  if (hub[portName].proxy && hub[portName].devtool) {
    portPip(portName, hub[portName].proxy, hub[portName].devtool);
  }
});

// Reset the icon to default (disabled) state when a tab navigates,
// before the detector has a chance to re-detect @my-react on the new page.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    try {
      chrome.action.setPopup({
        tabId,
        popup: chrome.runtime.getURL("disablePopup.html"),
      });
      chrome.action.setIcon({
        tabId,
        path: {
          48: chrome.runtime.getURL("icons/48.png"),
          128: chrome.runtime.getURL("icons/128.png"),
        },
      });
    } catch {
      // tab may have been closed
    }
  }
});

// from detector, change the extension icon and popup page
chrome.runtime.onMessage.addListener((message: MessageHookDataType, sender, sendResponse) => {
  if (message.from !== sourceFrom.detector) return;

  if (message.to !== sourceFrom.worker) {
    if (__DEV__) {
      console.log("[@my-react-devtool/worker] invalid message to change icon from detector", message);
    }
    return;
  }

  if (sender.tab?.id && message.type === MessageHookType.mount) {
    setExtensionIconForTab(sender.tab.id, message.data);
  }

  sendResponse({ ok: true });
});
