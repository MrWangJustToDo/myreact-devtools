import { once, STATE_TYPE } from "@my-react/react-shared";
import { DevToolCore, getFiberNodeById, getValueById } from "@my-react-devtool/core";

import { MessageHookType, MessageDetectorType, MessagePanelType, DevToolSource, MessageWorkerType, sourceFrom } from "./type";
import { generatePostMessageWithSource } from "./window";

import type { MessageDetectorDataType, MessagePanelDataType, MessageWorkerDataType } from "./type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";
import type { Socket } from "socket.io-client";

const core = new DevToolCore();

const hookPostMessageWithSource = generatePostMessageWithSource(sourceFrom.hook);

core.subscribe((message) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/hook] core message", message);
  }
  hookPostMessageWithSource({ type: MessageHookType.render, data: message });
});

const set = new Set<CustomRenderDispatch>();

let detectorReady = false;

let id = null;

let varId = 0;

const getValidGlobalVarName = () => {
  let varName = `$my-react-var-${varId++}`;

  while (globalThis[varName]) {
    varName = `$my-react-var-${varId++}`;
  }

  return varName;
};

const runWhenDetectorReady = (fn: () => void, count?: number) => {
  clearTimeout(id);
  if (detectorReady) {
    fn();
  } else {
    if (count && count > 10) {
      if (__DEV__) {
        console.error("[@my-react-devtool/hook] detector not ready");
      }
    }
    if (count && count > 18) {
      return;
    }
    id = setTimeout(() => runWhenDetectorReady(fn, count ? count + 1 : 1), 1000);
  }
};

const onMessage = (message: MessageEvent<MessagePanelDataType | MessageDetectorDataType | MessageWorkerDataType>) => {
  // allow iframe dev
  // allow bridge dev
  if (message.source !== window && message.data?.from !== sourceFrom.iframe && message.data?.from !== sourceFrom.bridge) return;

  if (message.data?.source !== DevToolSource) return;

  if (message.data?.from === sourceFrom.hook) return;

  if (__DEV__ && message.data?.type && message.data.type !== MessagePanelType.nodeHover) {
    console.log("[@my-react-devtool/hook] message from proxy", message.data);
  }

  if (!detectorReady && message.data?.type === MessageDetectorType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] detector init");
    }

    detectorReady = true;
  }

  if (message.data?.type === MessageWorkerType.init) {
    core.connect();

    core.notifyAll();
  }

  if (message.data?.type === MessagePanelType.show) {
    core.connect();

    core.notifyAll();
  }

  // 主动关闭panel / 或者worker失活
  if (message.data?.type === MessagePanelType.hide || message.data?.type === MessageWorkerType.close) {
    core.disconnect();
  }

  if (message.data?.type === MessagePanelType.enableHover) {
    core.setHoverStatus(message.data.data);
  }

  if (message.data?.type === MessagePanelType.enableUpdate) {
    core.setUpdateStatus(message.data.data);
  }

  if (message.data?.type === MessagePanelType.nodeSelect) {
    core.setSelect(message.data.data);

    core.notifySelect();
  }

  if (message.data?.type === MessagePanelType.nodeSelectForce) {
    core.notifySelect(true);
  }

  if (message.data?.type === MessagePanelType.nodeTrigger) {
    const id = message.data.data;

    const f = getFiberNodeById(id);

    if (f) {
      f._update(STATE_TYPE.__triggerConcurrentForce__);
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (message.data?.type === MessagePanelType.nodeStore) {
    const id = message.data.data;

    const f = getFiberNodeById(id);

    if (f) {
      console.log(
        "[@my-react-devtool/hook] %cStore fiber node%c Value: %o",
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        "",
        f
      );
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (message.data?.type === MessagePanelType.nodeHover) {
    core.setHover(message.data.data);

    core.showHover();
  }

  if (message.data.type === MessagePanelType.nodeSubscriber) {
    core.setSubscribe(message.data.data);

    core.notifyRun();
  }

  if (message.data.type === MessagePanelType.chunk) {
    core.notifyChunk(message.data.data);
  }

  if (message.data.type === MessagePanelType.varStore) {
    const id = message.data.data;

    const { f, v: varStore } = getValueById(id);

    if (f) {
      const varName = getValidGlobalVarName();

      globalThis[varName] = varStore;

      console.log(
        `[@my-react-devtool/hook] %cStore global variable%c Name: ${varName}`,
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        ""
      );
      console.log(
        "[@my-react-devtool/hook] %cStore global variable%c Value: %o",
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        "",
        varStore
      );
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (message.data.type === MessagePanelType.clear) {
    core.clear();
  }
};

window.addEventListener("message", onMessage);

const onceMount = once(() => {
  // current site is render by @my-react
  hookPostMessageWithSource({ type: MessageHookType.mount });
});

const loadScript = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

let connectSocket: Socket | null = null;

// TODO! 与 onMessage 保持同步
const initWEB_UI = async (url: string) => {
  console.log("[@my-react-devtool/hook] start a web ui devtool");

  await loadScript("https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js");

  const socket = window.io(url);

  connectSocket = socket;

  let unSubscribe = () => {};

  socket.on("connect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket connected");
    }

    unSubscribe = core.subscribe((message) => {
      socket.emit("render", message);
    });
  });

  socket.on("disconnect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket disconnected");
    }

    unSubscribe();
  });

  socket.on("action", (data) => {
    if (data?.type === MessageWorkerType.init || data?.type === MessagePanelType.show) {
      core._forceEnable = true;

      core.connect();

      core.notifyAll();
    }

    if (data?.type === MessagePanelType.nodeSelect) {
      core.setSelect(data.data);

      core.notifySelect();
    }

    if (data?.type === MessagePanelType.nodeSelectForce) {
      core.notifySelect(true);
    }

    if (data?.type === MessagePanelType.nodeStore) {
      const id = data.data;

      const f = getFiberNodeById(id);

      if (f) {
        console.log(
          "[@my-react-devtool/hook] %cStore fiber node%c Value: %o",
          "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
          "",
          f
        );
      } else {
        console.error("[@my-react-devtool/hook] fiber node not found", id);
      }
    }

    if (data?.type === MessagePanelType.nodeTrigger) {
      const id = data.data;

      const f = getFiberNodeById(id);

      if (f) {
        f._update(STATE_TYPE.__triggerConcurrentForce__);
      } else {
        console.error("[@my-react-devtool/hook] fiber node not found", id);
      }
    }

    if (data?.type === MessagePanelType.nodeHover) {
      core.setHover(data.data);

      core.showHover();
    }

    if (data?.type === MessagePanelType.nodeSubscriber) {
      core.setSubscribe(data.data);

      core.notifyRun();
    }

    if (data?.type === MessagePanelType.enableHover) {
      core.setHoverStatus(data.data);
    }

    if (data?.type === MessagePanelType.enableUpdate) {
      core.setUpdateStatus(data.data);
    }

    if (data?.type === MessagePanelType.chunk) {
      core.notifyChunk(data.data);
    }

    if (data?.type === MessagePanelType.varStore) {
      const id = data.data;

      const { f, v: varStore } = getValueById(id);

      if (f) {
        const varName = getValidGlobalVarName();

        globalThis[varName] = varStore;

        console.log(
          `[@my-react-devtool/hook] %cStore global variable%c Name: ${varName}`,
          "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
          ""
        );
        console.log(
          "[@my-react-devtool/hook] %cStore global variable%c Value: %o",
          "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
          "",
          varStore
        );
      } else {
        console.error("[@my-react-devtool/hook] fiber node not found", id);
      }
    }

    if (data?.type === MessagePanelType.clear) {
      core.clear();
    }
  });

  socket.emit("web-dev", { name: window.document.title, url: window.location.href });
};

initWEB_UI.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};

const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);

  core.addDispatch(dispatch);

  runWhenDetectorReady(onceMount);
};

if (window.parent && window.parent !== window) {
  if (__DEV__) {
    console.warn("[@my-react-devtool/hook] currently the @my-react extension does not support iframe.");
  }
} else {
  window["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

  window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
  // support local dev
  window["__MY_REACT_DEVTOOL_WEB__"] = initWEB_UI;

  hookPostMessageWithSource({ type: MessageHookType.init });

  globalHook.init = () => hookPostMessageWithSource({ type: MessageHookType.init });
}
