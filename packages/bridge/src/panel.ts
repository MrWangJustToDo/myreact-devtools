import { DevToolMessageEnum, parseDetailNode, type DevToolMessageType, type PlainNode, type Tree } from "@my-react-devtool/core";

import { MessageHookType, MessagePanelType, MessageWorkerType, sourceFrom } from "./type";

import type { MessageHookDataType } from "./type";

let port: chrome.runtime.Port | null = null;

// TODO avoid using window
let panelWindow: Window = window;

let workerReady = false;

let workerConnecting = false;

// TODO use messageId to sync message
let messageId = 0;

let id = null;

const getTabId = () => chrome.devtools.inspectedWindow.tabId;

// const tabId = chrome.devtools.inspectedWindow.tabId;

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
    id = setTimeout(() => runWhenWorkerReady(fn, count ? count + 1 : 1), 2000);
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
    port?.postMessage({ ...data, _messageId: messageId++, from: sourceFrom.panel });
  });
};

const onRender = (data: DevToolMessageType, _window: Window) => {
  if (data.type === DevToolMessageEnum.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] init", data.data);
    }

    const detector = data.data as boolean;

    try {
      const { setRender } = _window.useConnect.getActions();

      setRender(detector);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.dir) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] dir", data.data);
    }

    const node = data.data as Record<string, string>;

    try {
      const { set } = _window.useNodeName.getActions();

      set(node);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.ready) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] init", data.data);
    }

    const node = data.data as Tree;

    try {
      const { addNode } = _window.useAppTree.getActions();

      if (node) {
        addNode(node);
      }
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.hmr) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] hmr", data.data);
    }

    const nodes = data.data as Record<string, number>;

    try {
      const { update } = _window.useHMRNode.getActions();

      update(nodes);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.trigger) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] trigger", data.data);
    }

    const nodes = data.data as Record<string, number>;

    try {
      const { update } = _window.useTriggerNode.getActions();

      update(nodes);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.detail) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] detail", data.data);
    }

    const node = data.data as PlainNode;

    try {
      const { addNode, setLoading } = _window.useDetailNode.getActions();

      if (node) {
        if (__DEV__) {
          console.log("[@my-react-devtool/panel] before parse detail node", node);
        }

        parseDetailNode(node);

        if (__DEV__) {
          console.log("[@my-react-devtool/panel] after parse detail node", node);
        }

        addNode(node);

        setLoading(false);
      }
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.highlight) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] highlight", data.data);
    }

    const node = data.data as { id: string; type: string };

    try {
      const { highlightNode } = _window.useHighlightNode.getActions();

      highlightNode(node.id, node.type);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.config) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] config", data.data);
    }

    const config = data.data as { enableHover: boolean; enableUpdate: boolean };

    try {
      const { setEnableHover, setEnableUpdate } = _window.useConfig.getActions();

      setEnableHover(config?.enableHover);

      setEnableUpdate(config?.enableUpdate);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
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

        if (currentSelect) {
          useDetailNode.getActions().setLoading(true);

          sendMessage({ type: MessagePanelType.nodeSelect, data: currentSelect });
        } else {
          useDetailNode.getActions().setLoading(false);

          sendMessage({ type: MessagePanelType.nodeSelect, data: currentSelect });
        }
      }
    );
  } catch {
    void 0;
  }
};

const initHoverListen = (_window: Window) => {
  const useTreeNode = _window.useTreeNode;

  try {
    return useTreeNode.subscribe(
      (s) => s.hover,
      () => {
        const currentHover = useTreeNode.getReadonlyState().hover;

        sendMessage({ type: MessagePanelType.nodeHover, data: currentHover });
      }
    );
  } catch {
    void 0;
  }
};

const initConfigListen = (_window: Window) => {
  const useConfig = _window.useConfig;

  const cbArray: Array<() => void> = [];

  try {
    cbArray.push(
      useConfig.subscribe(
        (s) => s.state.enableHover,
        () => {
          const enableHover = useConfig.getReadonlyState().state.enableHover;

          sendMessage({ type: MessagePanelType.enableHover, data: enableHover });
        }
      )
    );
    cbArray.push(
      useConfig.subscribe(
        (s) => s.state.enableUpdate,
        () => {
          const enableUpdate = useConfig.getReadonlyState().state.enableUpdate;

          sendMessage({ type: MessagePanelType.enableUpdate, data: enableUpdate });
        }
      )
    );
    return () => {
      cbArray.forEach((f) => f());
    };
  } catch {
    void 0;
  }
};

const initPort = () => {
  workerConnecting = true;

  const { disconnect, setConnectHandler } = panelWindow.useConnect.getActions();

  setConnectHandler(() => initPort());

  port = chrome.runtime.connect({ name: getTabId().toString() });

  const onMessage = (message: MessageHookDataType | { type: MessageWorkerType }) => {
    workerConnecting = false;

    if (__DEV__) {
      console.log("[@my-react-devtool/panel] message from port", message);
    }

    if (!workerReady && message.type === MessageWorkerType.init) {
      workerReady = true;

      panelWindow.useConnect.getActions().connect();
    }

    if (message?.type === MessageHookType.render) {
      onRender(message.data, panelWindow);
    }
  };

  const onDisconnect = () => {
    console.log("[@my-react-devtool/panel] disconnect");

    port.onMessage.removeListener(onMessage);

    disconnect();

    port = null;

    workerReady = false;
  };

  port.onMessage.addListener(onMessage);

  port.onDisconnect.addListener(onDisconnect);
};

const init = async (id: number) => {
  if (id) {
    const cleanList: Array<() => void> = [];

    await showPanel(
      (window) => {
        if (__DEV__) {
          console.log("show panel");
        }

        panelWindow = window;

        sendMessage({ type: MessagePanelType.show });

        cleanList.push(initSelectListen(window), initHoverListen(window), initConfigListen(window));
      },
      () => {
        if (__DEV__) {
          console.log("hide panel");
        }

        sendMessage({ type: MessagePanelType.hide });

        cleanList.forEach((f) => f());
      }
    );
  } else {
    if (__DEV__) {
      console.error("[@my-react-devtool/panel] tabId is empty");
    }
  }
};

const clear = () => {
  workerConnecting = false;

  if (port) {
    port.disconnect();
  }

  port = null;

  if (panelWindow) {
    panelWindow.useAppTree.getActions().clear();
    panelWindow.useNodeName.getActions().clear();
    panelWindow.useTreeNode.getActions().clear();
    panelWindow.useDetailNode.getActions().clear();
  }
}

init(getTabId());

// TODO! fix this
chrome.devtools.network.onNavigated.addListener(() => {
  if (__DEV__) {
    console.log("[@my-react-devtool/panel] onNavigated");
  }

  clear();

  sendMessage({ type: MessagePanelType.show });
});
