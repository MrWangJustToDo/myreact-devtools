import { once } from "@my-react/react-shared";
import { DevToolSource } from "@my-react-devtool/core";

import { core } from "./core";
import { initIFRAME_DEV } from "./iframe-dev";
import { onMessageFromPanelOrWorkerOrDetector } from "./message";
import { MessageHookType, MessageDetectorType, MessagePanelType, sourceFrom } from "./type";
import { initWEB_DEV } from "./web-dev";
import { generatePostMessageWithSource } from "./window";

import type { MessageDetectorDataType, MessagePanelDataType, MessageWorkerDataType } from "./type";
import type { CustomRenderDispatch, CustomRenderPlatform } from "@my-react/react-reconciler";

const hookPostMessageWithSource = generatePostMessageWithSource(sourceFrom.hook);

core.subscribe((message) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/hook] core message", message);
  }

  hookPostMessageWithSource({ type: MessageHookType.render, data: message });
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

  onMessageFromPanelOrWorkerOrDetector(message.data);
};

window.addEventListener("message", onMessage);

const onceMount = once(() => {
  // current site is render by @my-react
  hookPostMessageWithSource({ type: MessageHookType.mount });
});

const onceOrigin = once(() => {
  try {
    const origin = window.location.origin;

    core._origin = origin;

    if (origin) {
      hookPostMessageWithSource({ type: MessageHookType.origin, data: origin });
    }
  } catch {
    void 0;
  }
});

const globalHook = (dispatch: CustomRenderDispatch, platform?: CustomRenderPlatform) => {
  set.add(dispatch);

  core.addDispatch(dispatch, platform);

  runWhenDetectorReady(onceMount);

  runWhenDetectorReady(onceOrigin);
};

window["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;

window["__@my-react/react-devtool-inject__"] = globalHook;

// support local dev
window["__MY_REACT_DEVTOOL_WEB__"] = initWEB_DEV;
// support iframe dev
window["__MY_REACT_DEVTOOL_IFRAME__"] = initIFRAME_DEV;

window["__@my-react/react-devtool-inject-pending__"]?.();

hookPostMessageWithSource({ type: MessageHookType.init });

globalHook.init = () => hookPostMessageWithSource({ type: MessageHookType.init });
