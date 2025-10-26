import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageHookType, MessageWorkerType, sourceFrom } from "../type";

import type { MessageHookDataType, MessagePanelDataType } from "../type";

const hub: Record<string, { proxy: chrome.runtime.Port | null; devtool: chrome.runtime.Port | null }> = {};

function isNumeric(str: string) {
  return `${+str}` === str;
}

const installProxy = (tabId: number) => {
  chrome.scripting.executeScript({ target: { tabId }, files: ["bundle/proxy.js"] }).then((res) => {
    if (res && __DEV__) {
      console.log(`[@my-react-devtool/worker] install proxy success for tab: ${tabId}`);
    }
  });
};

const portPip = (id: string, port1: chrome.runtime.Port, port2: chrome.runtime.Port) => {
  const onMessagePort1 = (message: MessageHookDataType) => {
    if (message.to !== sourceFrom.panel) return;

    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from hook: ${id}`, message);
    }

    port2.postMessage({ ...message, forward: message.forward ? `${message.forward}->${sourceFrom.worker}` : sourceFrom.worker });
  };

  const onMessagePort2 = (message: MessagePanelDataType) => {
    if (message.to !== sourceFrom.hook) return;

    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from panel: ${id}`, message);
    }

    port1.postMessage({ ...message, forward: message.forward ? `${message.forward}->${sourceFrom.worker}` : sourceFrom.worker });
  };

  function shutdown() {
    port1.onMessage.removeListener(onMessagePort1);
    port2.onMessage.removeListener(onMessagePort2);
    port1.disconnect();
    port2.disconnect();
    hub[id] = null;
  }

  port1.onMessage.addListener(onMessagePort1);

  port2.onMessage.addListener(onMessagePort2);

  port1.onDisconnect.addListener(shutdown);

  port2.onDisconnect.addListener(shutdown);

  port1.postMessage({ type: MessageWorkerType.init, from: sourceFrom.worker, to: sourceFrom.hook, source: DevToolSource });

  port2.postMessage({ type: MessageWorkerType.init, form: sourceFrom.worker, to: sourceFrom.panel, source: DevToolSource });

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

// from detector, change the extension icon and popup page
chrome.runtime.onMessage.addListener((message: MessageHookDataType, sender) => {
  if (message.from !== sourceFrom.detector) return;

  if (message.to !== sourceFrom.worker) {
    if (__DEV__) {
      console.log("[@my-react-devtool/worker] invalid message to change icon from detector", message);
    }
    return;
  }

  if (sender.tab?.id && message.type === MessageHookType.mount) {
    if (message.data === "develop") {
      chrome.action.setPopup({
        tabId: sender.tab.id,
        popup: chrome.runtime.getURL("enablePopupDev.html"),
      });
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          48: chrome.runtime.getURL("icons/48-s-d.png"),
          128: chrome.runtime.getURL("icons/128-s-d.png"),
        },
      });
    } else if (message.data === "product") {
      chrome.action.setPopup({
        tabId: sender.tab.id,
        popup: chrome.runtime.getURL("enablePopupPro.html"),
      });
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          48: chrome.runtime.getURL("icons/48-s.png"),
          128: chrome.runtime.getURL("icons/128-s.png"),
        },
      });
    } else {
      chrome.action.setPopup({
        tabId: sender.tab.id,
        popup: chrome.runtime.getURL("enablePopup.html"),
      });
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          48: chrome.runtime.getURL("icons/48-s.png"),
          128: chrome.runtime.getURL("icons/128-s.png"),
        },
      });
    }
  }
});
