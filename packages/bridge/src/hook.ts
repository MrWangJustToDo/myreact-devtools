import { once } from "@my-react/react-shared";
import { DevToolCore } from "@my-react-devtool/core";

import { MessageHookType, MessageDetectorType, MessagePanelType } from "./type";

import type { MessagePanelDataType } from "./type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

const core = new DevToolCore();

core.subscribe((message) => {
  window.postMessage({ type: MessageHookType.render, data: message }, "*");
});

const set = new Set<CustomRenderDispatch>();

let detectorReady = false;

let id = null;

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
    id = setTimeout(() => runWhenDetectorReady(fn, count ? count + 1 : 1), 2000);
  }
};

const onMessage = (message: MessageEvent<MessagePanelDataType | { type: MessageDetectorType }>) => {
  if (message.source !== window) return;

  if (!detectorReady && message.data?.type === MessageDetectorType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] detector init");
    }

    detectorReady = true;
  }

  if (message.data?.type === MessagePanelType.show) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] message from proxy", message);
    }

    core.forceNotify();
  }
};

window.addEventListener("message", onMessage);

const onceMount = once(() => {
  // current site is render by @my-react
  window.postMessage({ type: MessageHookType.mount }, "*");
});

export const globalHook = (dispatch: CustomRenderDispatch) => {
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
  window.postMessage({ type: MessageHookType.init }, "*");
}
