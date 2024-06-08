import { DevToolMessageEnum, type DevToolMessageType, type PlainNode } from "@my-react-devtool/core";

import { MessageHookType, MessagePanelType, MessageWorkerType } from "./type";

import type { MessageHookDataType } from "./type";

let port: chrome.runtime.Port | null = null;

let panelWindow: Window = window;

let workerReady = false;

// TODO use messageId to sync message
let messageId = 0;

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

const showPanel = (
  id: number,
  onShow: (window: Window) => void,
  onHide: () => void
): Promise<{ window: Window; panel: chrome.devtools.panels.ExtensionPanel }> => {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] create panel", id);
    }
    chrome.devtools.panels.create(`@my-react`, "", "devTool.html", (panel) => {
      const f1 = (window: Window) => {
        onShow(window);
        resolve({ window, panel });
        panel.onShown.removeListener(f1);
      };

      panel.onShown.addListener(f1);

      const f2 = () => {
        onHide();
        workerReady = false;
        panel.onHidden.removeListener(f2);
      };

      panel.onHidden.addListener(f2);
    });
  });
};

const sendMessage = <T = any>(data: T) => {
  runWhenWorkerReady(() => {
    port?.postMessage({ ...data, _messageId: messageId++ });
  });
};

const onRender = (data: DevToolMessageType) => {
  if (data.type === DevToolMessageEnum.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] init", data.data);
    }
    const node = data.data as PlainNode;
    try {
      const { addNode } = panelWindow.useAppTree.getActions();

      if (node) {
        addNode(node);
      }
    } catch {
      void 0;
    }
  }
  if (data.type === DevToolMessageEnum.detail) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] detail", data.data);
    }
    const node = data.data as PlainNode;
    try {
      const { addNode } = panelWindow.useDetailNode.getActions();

      if (node) {
        addNode(node);
      }
    } catch {
      void 0;
    }
  }
};

const onMessage = (message: MessageHookDataType | { type: MessageWorkerType }) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/panel] message from port", message);
  }

  if (!workerReady && message.type === MessageWorkerType.init) {
    workerReady = true;
  }

  if (message?.type === MessageHookType.render) {
    onRender(message.data);
  }
};

const initSelectListen = (_window: Window) => {
  const useTreeNode = _window.useTreeNode;
  const useDetailNode = _window.useDetailNode;

  try {
    return useTreeNode.subscribe(
      (s) => s.select,
      () => {
        const currentSelect = useTreeNode.getReadonlyState().select;
        if (currentSelect?.current) {
          useDetailNode.getActions().setLoading(true);
          sendMessage({ type: MessagePanelType.nodeSelect, data: currentSelect.current.id });
        }
      }
    );
  } catch {
    void 0;
  }
};

const initHoverListen = (_window: Window) => {
  const useTreeNode = _window.useTreeNode;
  const useDetailNode = _window.useDetailNode;

  try {
    return useTreeNode.subscribe(
      (s) => s,
      () => {
        const currentHover = useTreeNode.getReadonlyState().hover;
        if (currentHover?.current) {
          useDetailNode.getActions().setLoading(true);
          sendMessage({ type: MessagePanelType.nodeHover, data: currentHover.current.id });
        }
      }
    );
  } catch {
    void 0;
  }
};

const init = async (id: number) => {
  if (id) {
    const cleanList: Array<() => void> = [];

    const { window } = await showPanel(
      id,
      (window) => {
        cleanList.push(initSelectListen(window), initHoverListen(window));
      },
      () => {
        cleanList.forEach((f) => f());
      }
    );

    panelWindow = window;

    port = chrome.runtime.connect({ name: id.toString() });

    const onDisconnect = () => {
      port.onMessage.removeListener(onMessage);
    };

    port.onMessage.addListener(onMessage);

    port.onDisconnect.addListener(onDisconnect);

    sendMessage({ type: MessagePanelType.show });
  }
};

init(chrome.devtools.inspectedWindow.tabId);
