import { MessageHookType, MessagePanelType, MessageWorkerType } from "./type";

import type { MessageHookDataType } from "./type";
import type { PlainNode } from "@my-react-devtool/core";

let port: chrome.runtime.Port | null = null;

let workerReady = false;

let id = null;

const runWhenWorkerReady = (fn: () => void, count?: number) => {
  clearTimeout(id);
  if (workerReady) {
    fn();
  } else {
    if (count && count > 10) {
      if (__DEV__) {
        console.error("[@my-react-devtool/panel] worker not ready");
      }
      return;
    }
    id = setTimeout(() => runWhenWorkerReady(fn, count ? count + 1 : 1), 2000);
  }
};

const showPanel = (id: number): Promise<{ window: Window; panel: chrome.devtools.panels.ExtensionPanel }> => {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] create panel", id);
    }
    chrome.devtools.panels.create(`@my-react`, "", "devTool.html", (panel) => {
      const f1 = (window: Window) => {
        resolve({ window, panel });
        panel.onShown.removeListener(f1);
      };

      panel.onShown.addListener(f1);

      const f2 = () => {
        workerReady = false;
        panel.onHidden.removeListener(f2);
      };

      panel.onHidden.addListener(f2);
    });
  });
};

const init = async (id: number) => {
  if (id) {
    const { window } = await showPanel(id);

    port = chrome.runtime.connect({ name: id.toString() });

    const onMessage = (message: MessageHookDataType | { type: MessageWorkerType }) => {
      if (__DEV__) {
        console.log("[@my-react-devtool/panel] message from port", message);
      }

      if (!workerReady && message.type === MessageWorkerType.init) {
        workerReady = true;
      }

      if (message?.type === MessageHookType.render) {
        const data = message.data?.data;

        const { addNode } = window.useAppTree.getActions();

        if (data) {
          addNode(data as PlainNode);
        }
      }
    };

    port.onMessage.addListener(onMessage);

    port.onDisconnect.addListener(() => {
      port.onMessage.removeListener(onMessage);
    });

    runWhenWorkerReady(() => {
      port.postMessage({ type: MessagePanelType.show });
    });
  }
};

init(chrome.devtools.inspectedWindow.tabId);
