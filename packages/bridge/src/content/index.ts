import { once } from "@my-react/react-shared";
import { DevToolSource, MessagePanelType, MessageProxyType } from "@my-react-devtool/core/event";

import { core } from "../core";
import { initIFRAME_DEV } from "../entry/iframe-dev";
import { initNODE_DEV } from "../entry/node-dev";
import { initWEB_DEV } from "../entry/web-dev";
import { onMessageFromPanelOrWorkerOrDetector } from "../message";
import { MessageHookType, MessageDetectorType, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

import type { MessageDetectorDataType, MessageHookDataType, MessagePanelDataType, MessageWorkerDataType } from "../type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

const hookPostMessageWithSource = generatePostMessageWithSource(sourceFrom.hook);

// default render agentId
const agentId = core.id;

core.subscribe((message) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/hook] core message", message);
  }

  hookPostMessageWithSource({ type: MessageHookType.render, data: message, to: sourceFrom.panel });
});

const set = new Set<CustomRenderDispatch>();

let detectorReady = false;

const idMap = new Map<() => void, NodeJS.Timeout>();

const runWhenDetectorReady = (fn: () => void, count?: number) => {
  const id = idMap.get(fn);

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

    const newId = setTimeout(() => runWhenDetectorReady(fn, count ? count + 1 : 1), 1000);

    idMap.set(fn, newId);
  }
};

const onMessage = (message: MessageEvent<MessageHookDataType | MessagePanelDataType | MessageDetectorDataType | MessageWorkerDataType>) => {
  if (typeof window === "undefined") return;

  // allow iframe dev
  if (message.source !== window && message.data?.from !== sourceFrom.iframe) return;

  if (message.data?.source !== DevToolSource) return;

  if (message.data?.to !== sourceFrom.hook) return;

  if (!detectorReady && message.data?.type === MessageDetectorType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] detector init");
    }

    detectorReady = true;
  }

  if (message.data.from === sourceFrom.forward) {
    // 通知forward source端，detector已准备好
    hookPostMessageWithSource({ type: MessageDetectorType.init, to: sourceFrom.hook, forward: sourceFrom.forward });
  }

  if (message.data.type === MessagePanelType.show) {
    hookPostMessageWithSource({ type: MessageProxyType.init, to: sourceFrom.proxy, data: agentId });

    hookPostMessageWithSource({ type: MessageHookType.clear, to: sourceFrom.panel, data: { agentId: agentId } });
  }

  onMessageFromPanelOrWorkerOrDetector(message.data);
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onMessage);
}

const onceMount = once(() => {
  // current site is render by @my-react
  hookPostMessageWithSource({ type: MessageHookType.mount, to: sourceFrom.detector });
});

const onceDev = once(() => {
  hookPostMessageWithSource({ type: MessageHookType.mount, data: "develop", to: sourceFrom.detector });
});

const oncePro = once(() => {
  hookPostMessageWithSource({ type: MessageHookType.mount, data: "product", to: sourceFrom.detector });
});

const onceOrigin = once(() => {
  try {
    const origin = window.location.origin;

    core._origin = origin;

    if (origin) {
      hookPostMessageWithSource({ type: MessageHookType.origin, data: origin, to: sourceFrom.detector });
    }
  } catch {
    void 0;
  }
});

const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);

  core.addDispatch(dispatch);

  if (dispatch.mode === "development") {
    runWhenDetectorReady(onceDev);
  } else if (dispatch.mode === "production") {
    runWhenDetectorReady(oncePro);
  } else {
    runWhenDetectorReady(onceMount);
  }

  runWhenDetectorReady(onceOrigin);
};

if (!globalThis["__MY_REACT_DEVTOOL_INTERNAL__"]) {
  globalThis["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

  globalThis["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;

  globalThis["__@my-react/react-devtool-inject__"] = globalHook;

  if (typeof window !== "undefined") {
    // support web dev
    globalThis["__MY_REACT_DEVTOOL_WEB__"] = initWEB_DEV;
    // support iframe dev
    globalThis["__MY_REACT_DEVTOOL_IFRAME__"] = initIFRAME_DEV;
  }

  if (typeof process !== "undefined") {
    // support node dev
    globalThis["__MY_REACT_DEVTOOL_NODE__"] = initNODE_DEV;
  }

  if (typeof globalThis["__@my-react/react-devtool-inject-pending__"] === "function") {
    globalThis["__@my-react/react-devtool-inject-pending__"]?.();
  } else {
    if (Array.isArray(globalThis["__@my-react/dispatch__"])) {
      globalThis["__@my-react/dispatch__"].forEach((dispatch: CustomRenderDispatch) => {
        globalHook(dispatch);
      });
    }
  }

  hookPostMessageWithSource({ type: MessageHookType.init, to: sourceFrom.detector });

  globalHook.init = () => hookPostMessageWithSource({ type: MessageHookType.init, to: sourceFrom.detector });
} else {
  if (__DEV__) {
    console.warn("[@my-react-devtool/hook] current file should only be loaded once");
  }
}
