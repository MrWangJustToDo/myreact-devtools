import { type DevToolMessageType } from "@my-react-devtool/core";

import { MessageHookType, MessagePanelType, MessageWorkerType, sourceFrom } from "../type";

import type { MessageHookDataType, MessageWorkerDataType } from "../type";

let port: chrome.runtime.Port | null = null;

// TODO avoid using window
let panelWindow: Window = window;

let workerReady = false;

let workerConnecting = false;

// TODO use messageId to sync message
let messageId = 0;

let id = null;

let hasShow = false;

const getTabId = () => chrome.devtools.inspectedWindow.tabId;

const agentIdMap = new Map<number | string, number | string>();

const runWhenWorkerReady = (fn: () => void, count?: number) => {
  clearTimeout(id);
  if (workerReady) {
    fn();
  } else {
    if (!workerConnecting) {
      initPort();
    }
    if (count && count > 10) {
      if (__DEV__) {
        console.error("[@my-react-devtool/panel] worker not ready");
      }
      return;
    }
    id = setTimeout(() => runWhenWorkerReady(fn, count ? count + 1 : 1), 1000);
  }
};

const showPanel = (onShow: (_window: Window) => void, onHide: () => void): Promise<{ window: Window; panel: chrome.devtools.panels.ExtensionPanel }> => {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] create panel", getTabId());
    }
    chrome.devtools.panels.create(`@my-react`, "", "devTool.html", (panel) => {
      const f1 = (_window: Window) => {
        onShow(_window);
        resolve({ window: _window, panel });
      };

      panel.onShown.addListener(f1);

      const f2 = () => {
        onHide();
      };

      panel.onHidden.addListener(f2);
    });
  });
};

const sendMessage = <T = any>(data: T) => {
  runWhenWorkerReady(() => {
    port?.postMessage({ ...data, _messageId: messageId++, from: sourceFrom.panel, to: sourceFrom.hook, agentId: agentIdMap.get(getTabId()) });
  });
};

const onRender = (data: DevToolMessageType, _window: Window) => {
  if (!hasShow) return;

  _window.onRender?.(data);
};

const initPort = () => {
  if (!panelWindow || !panelWindow.useConnect || typeof panelWindow.useConnect.getActions !== "function") {
    if (__DEV__) {
      console.error("[@my-react-devtool/panel] panelWindow is empty");
    }

    return;
  }
  workerConnecting = true;

  const { disconnect, setConnectHandler } = panelWindow.useConnect.getActions();

  setConnectHandler(() => initPort());

  port = chrome.runtime.connect({ name: getTabId().toString() });

  // only process message from worker
  const onMessage = (message: MessageHookDataType | MessageWorkerDataType) => {
    if (!hasShow) return;

    if (message.to !== sourceFrom.panel) return;

    workerConnecting = false;

    if (__DEV__) {
      console.log("[@my-react-devtool/panel] message from port", message);
    }

    if (!workerReady && message.type === MessageWorkerType.init) {
      workerReady = true;

      panelWindow.useConnect.getActions().connect();
    }

    if (message?.type === MessageHookType.clear) {
      const currentAgentId = agentIdMap.get(getTabId());

      if (currentAgentId && message.data?.agentId === currentAgentId) return;

      if (message.data?.agentId) {
        agentIdMap.set(getTabId(), message.data.agentId);
      }

      clear?.();

      return;
    }

    if (message?.type === MessageHookType.render) {
      const currentAgentId = agentIdMap.get(getTabId());

      console.log("currentAgentId", currentAgentId, message.data.agentId);

      if (currentAgentId && message.data.agentId !== currentAgentId) return;

      onRender(message.data, panelWindow);
    }
  };

  const onDisconnect = () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] disconnect");
    }

    port?.onMessage?.removeListener?.(onMessage);

    disconnect();

    port = null;

    workerReady = false;

    workerConnecting = false;
  };

  port.onMessage.addListener(onMessage);

  port.onDisconnect.addListener(onDisconnect);
};

const init = async (id: number) => {
  if (id) {
    let unsubscribe = () => {};

    await showPanel(
      (window) => {
        if (__DEV__) {
          console.log("show panel");
        }

        hasShow = true;

        panelWindow = window;

        sendMessage({ type: MessagePanelType.show });

        unsubscribe = panelWindow.onListener(sendMessage);
      },
      () => {
        if (__DEV__) {
          console.log("hide panel");
        }

        sendMessage({ type: MessagePanelType.hide });

        unsubscribe();

        hasShow = false;
      }
    );
  } else {
    if (__DEV__) {
      console.error("[@my-react-devtool/panel] tabId is empty");
    }
  }
};

const clear = () => {
  panelWindow?.onClear?.();
};

init(getTabId());

chrome.devtools.network.onNavigated.addListener(() => {
  if (__DEV__) {
    console.log("[@my-react-devtool/panel] onNavigated");
  }

  clear();

  // 不会触发onShow事件 ？
  init(getTabId());

  // TODO! fix this
  setTimeout(() => {
    sendMessage({ type: MessagePanelType.clear });

    if (hasShow) sendMessage({ type: MessagePanelType.show });
  }, 60);
});
