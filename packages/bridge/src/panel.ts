/* eslint-disable max-lines */
import { debounce, DevToolMessageEnum, type DevToolMessageType, type PlainNode, type Tree, type NodeValue } from "@my-react-devtool/core";

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

let hasShow = false;

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
    port?.postMessage({ ...data, _messageId: messageId++, from: sourceFrom.panel });
  });
};

const onRender = (data: DevToolMessageType, _window: Window) => {
  if (!hasShow) return;

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

  if (data.type === DevToolMessageEnum.unmount) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] unmount");
    }

    try {
      _window.useChunk.getActions().clear();
      _window.useAppTree.getActions().clear();
      _window.useNodeName.getActions().clear();
      _window.useTreeNode.getActions().clear();
      _window.useDetailNode.getActions().clear();
      _window.useActiveNode.getActions().clear();
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

  if (data.type === DevToolMessageEnum.run) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] run", data.data);
    }

    const nodes = data.data as Record<string, { c: number; t?: number }>;

    try {
      const { update } = _window.useRunNode.getActions();

      update(nodes);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.chunk) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] chunk", data.data);
    }

    const chunk = data.data as Record<number | string, { loaded: any }>;

    try {
      const { setChunk } = _window.useChunk.getActions();

      setChunk(chunk);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.warn) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] warn", data.data);
    }

    const warn = data.data as Record<string, Array<NodeValue>>;

    try {
      const { setWarn } = _window.useHighlightNode.getActions();

      setWarn(warn);
    } catch (e) {
      const typedE = e as Error;

      _window.useConnect.getActions().setError(typedE.message);
    }
  }

  if (data.type === DevToolMessageEnum.error) {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] error", data.data);
    }

    const error = data.data as Record<string, Array<NodeValue>>;

    try {
      const { setError } = _window.useHighlightNode.getActions();

      setError(error);
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

const initForceReloadListen = (_window: Window) => {
  const useTreeNode = _window.useTreeNode;
  const useDetailNode = _window.useDetailNode;

  try {
    return useTreeNode.subscribe(
      (s) => s.force,
      () => {
        const currentSelect = useTreeNode.getReadonlyState().select;

        if (currentSelect) {
          useDetailNode.getActions().setLoading(true);

          sendMessage({ type: MessagePanelType.nodeSelectForce, data: currentSelect });
        }
      }
    );
  } catch {
    void 0;
  }
};

const initFiberStoreListen = (_window: Window) => {
  const useTreeNode = _window.useTreeNode;

  try {
    return useTreeNode.subscribe(
      (s) => s.store,
      () => {
        const currentStore = useTreeNode.getReadonlyState().select;

        sendMessage({ type: MessagePanelType.nodeStore, data: currentStore });
      }
    );
  } catch {
    void 0;
  }
}

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

const initSubscribeListen = (_window: Window) => {
  const useActiveNode = _window.useActiveNode;

  try {
    return useActiveNode.subscribe(
      (s) => s.state,
      debounce(() => {
        const state = useActiveNode.getReadonlyState().state;

        sendMessage({ type: MessagePanelType.nodeSubscriber, data: state });
      }, 100),
      true
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

const initStoreListen = (_window: Window) => {
  const useContextMenu = _window.useContextMenu;

  try {
    return useContextMenu.subscribe(
      (s) => s.store,
      () => {
        const store = useContextMenu.getReadonlyState().store;

        if (store) {
          sendMessage({ type: MessagePanelType.varStore, data: store });
        }
      }
    );
  } catch {
    void 0;
  }
}

const initChunkListen = (_window: Window) => {
  const useChunk = _window.useChunk;

  try {
    return useChunk.subscribe(
      (s) => s.id,
      () => {
        const id = useChunk.getReadonlyState().id;

        if (id) {
          sendMessage({ type: MessagePanelType.chunk, data: id });
        }
      }
    );
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
    if (!hasShow) return;

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
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] disconnect");
    }

    port.onMessage.removeListener(onMessage);

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
    const cleanList: Array<() => void> = [];

    await showPanel(
      (window) => {
        if (__DEV__) {
          console.log("show panel");
        }

        hasShow = true;

        panelWindow = window;

        sendMessage({ type: MessagePanelType.show });

        cleanList.push(
          initSelectListen(window),
          initHoverListen(window),
          initConfigListen(window),
          initSubscribeListen(window),
          initChunkListen(window),
          initStoreListen(window),
          initFiberStoreListen(window),
          initForceReloadListen(window),
        );
      },
      () => {
        if (__DEV__) {
          console.log("hide panel");
        }

        sendMessage({ type: MessagePanelType.hide });

        cleanList.forEach((f) => f());

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
  if (panelWindow) {
    panelWindow.useChunk?.getActions?.()?.clear?.();
    panelWindow.useAppTree?.getActions?.()?.clear?.();
    panelWindow.useNodeName?.getActions?.()?.clear?.();
    panelWindow.useTreeNode?.getActions?.()?.clear?.();
    panelWindow.useDetailNode?.getActions?.()?.clear?.();
    panelWindow.useActiveNode?.getActions()?.clear?.();
    panelWindow.useRunNode?.getActions?.()?.clear?.();
    panelWindow.useHMRNode?.getActions?.()?.clear?.();
    panelWindow.useContextMenu?.getActions?.()?.clear?.();
    panelWindow.useTriggerNode?.getActions?.()?.clear?.();
    panelWindow.useHighlightNode?.getActions?.()?.clear?.();
  }
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
