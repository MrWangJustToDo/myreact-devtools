import { type DevToolMessageType } from "@my-react-devtool/core";

import { MessageHookType, MessagePanelType, MessageWorkerType, sourceFrom } from "../type";

import type { MessageHookDataType, MessageWorkerDataType } from "../type";

let port: chrome.runtime.Port | null = null;

let currentOnDisconnect: (() => void) | null = null;

// TODO avoid using window
let panelWindow: Window = window;

let workerReady = false;

let workerConnecting = false;

let id = null;

let navigationTimerId: ReturnType<typeof setTimeout> | null = null;

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

const sendMessage = <T = any>(data: T, withAgentId = true) => {
  runWhenWorkerReady(() => {
    port?.postMessage({
      ...data,
      from: sourceFrom.panel,
      to: sourceFrom.hook,
      agentId: withAgentId ? agentIdMap.get(getTabId()) : undefined,
    });
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

  // Disconnect the old port before creating a new one (e.g. after navigation).
  // Remove the onDisconnect listener first to prevent it from triggering
  // a UI disconnect flash during intentional reconnection.
  if (port) {
    if (currentOnDisconnect) {
      try {
        port.onDisconnect.removeListener(currentOnDisconnect);
      } catch {
        /* */
      }
      currentOnDisconnect = null;
    }
    try {
      port.disconnect();
    } catch {
      /* port may already be disconnected */
    }
    port = null;
  }

  workerConnecting = true;

  const { disconnect, setConnectHandler } = panelWindow.useConnect.getActions();

  setConnectHandler(() => initPort());

  port = chrome.runtime.connect({ name: getTabId().toString() });

  const onMessage = (message: MessageHookDataType | MessageWorkerDataType) => {
    if (!hasShow) return;

    if (message.to !== sourceFrom.panel) return;

    workerConnecting = false;

    if (__DEV__) {
      console.log("[@my-react-devtool/panel] message from port", message, agentIdMap.get(getTabId()));
    }

    if (!workerReady && message.type === MessageWorkerType.init) {
      workerReady = true;

      panelWindow.useConnect.getActions().connect();
    }

    if (message?.type === MessageHookType.clear) {
      const currentAgentId = agentIdMap.get(getTabId());

      if (currentAgentId && message.data?.agentId === currentAgentId) {
        clear?.();

        agentIdMap.delete(getTabId());

        return;
      }
    }

    if (message?.type === MessageHookType.render) {
      const currentAgentId = agentIdMap.get(getTabId());

      if (!currentAgentId && message.data?.agentId) {
        agentIdMap.set(getTabId(), message.data.agentId);
      }

      if (currentAgentId && message.data.agentId !== currentAgentId) return;

      // Got a valid render message — cancel the "not detected" fallback timer
      if (navigationTimerId) {
        clearTimeout(navigationTimerId);
        navigationTimerId = null;
      }

      onRender(message.data, panelWindow);
    }
  };

  const onDisconnect = () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] disconnect");
    }

    port?.onMessage?.removeListener?.(onMessage);

    currentOnDisconnect = null;

    disconnect();

    port = null;

    workerReady = false;

    workerConnecting = false;
  };

  currentOnDisconnect = onDisconnect;

  // sendMessage({ type: MessagePanelType.show }, false);

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

        sendMessage({ type: MessagePanelType.show }, false);

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

let isHandlingNavigation = false;

const handleNavigation = () => {
  // Deduplicate — onNavigated and tabs.onUpdated can both fire for the same navigation
  if (isHandlingNavigation) return;
  isHandlingNavigation = true;
  setTimeout(() => (isHandlingNavigation = false), 200);

  if (__DEV__) {
    console.log("[@my-react-devtool/panel] handleNavigation");
  }

  clear();

  agentIdMap.delete(getTabId());

  if (panelWindow?.useConnect) {
    panelWindow.useConnect.getActions().setRender(undefined);
  }

  workerReady = false;
  workerConnecting = false;

  if (navigationTimerId) {
    clearTimeout(navigationTimerId);
  }

  setTimeout(() => {
    initPort();
  }, 100);

  navigationTimerId = setTimeout(() => {
    navigationTimerId = null;
    if (panelWindow?.useConnect) {
      const render = panelWindow.useConnect.getReadonlyState?.()?.render;
      if (render === undefined) {
        panelWindow.useConnect.getActions().setRender(false);
      }
    }
  }, 2000);
};

chrome.devtools.network.onNavigated.addListener(handleNavigation);

// Backup for bfcache restores where onNavigated may not fire
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (tabId === getTabId() && changeInfo.status === "loading") {
    handleNavigation();
  }
});
