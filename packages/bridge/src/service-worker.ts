import { MessageHookType, MessageWorkerType, sourceFrom } from "./type";

import type { MessageHookDataType, MessagePanelDataType } from "./type";

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
    if (message.from === sourceFrom.panel) return;

    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from hook: ${id}`, message);
    }

    port2.postMessage(message);
  };

  const onMessagePort2 = (message: MessagePanelDataType) => {
    if (message.from === sourceFrom.hook) return;

    if (__DEV__) {
      console.log(`[@my-react-devtool/worker] message from panel: ${id}`, message);
    }
    port1.postMessage(message);
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

  port1.postMessage({ type: MessageWorkerType.init });

  port2.postMessage({ type: MessageWorkerType.init });

  if (__DEV__) {
    console.log(`[@my-react-devtool/worker] connected: ${id}`);
  }
};

// forward message devtool -> proxy -> page
// or page -> proxy -> devtool
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

chrome.runtime.onMessage.addListener((message: MessageHookDataType, sender) => {
  if (sender.tab?.id && message.type === MessageHookType.mount) {
    chrome.action.setPopup({ tabId: sender.tab.id, popup: chrome.runtime.getURL("enablePopup.html") });
    chrome.action.setIcon({
      tabId: sender.tab.id,
      path: {
        48: chrome.runtime.getURL("icons/48-s.png"),
        128: chrome.runtime.getURL("icons/128-s.png"),
      },
    });
  }
});
