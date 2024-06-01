import { DevToolCore } from "@my-react-devtool/core";

import { MessageHookType, MessageProxyType } from "./type";

import type { MessageProxyDataType } from "./type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

const core = new DevToolCore();

let proxyReady = false;

const onMessage = (message: MessageEvent<MessageProxyDataType>) => {
  if (!proxyReady && message.data.type === MessageProxyType.ready) {
    console.log("[@my-react-devtool/hook] proxy ready");

    proxyReady = true;
  }
};

window.addEventListener("message", onMessage);

const set = new Set<CustomRenderDispatch>();

let id = null;

const runWhenProxyReady = (fn: () => void, count: number) => {
  if (proxyReady) {
    fn();
  } else {
    if (count > 10) {
      console.error("[@my-react-devtool/hook] proxy is not ready");
      return;
    }

    clearTimeout(id);

    id = setTimeout(() => {
      runWhenProxyReady(fn, count + 1);
    }, 2000);
  }
};

core.subscribe((message) => {
  window.postMessage({ type: MessageHookType.render, data: message }, "*");
});

export const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);
  runWhenProxyReady(() => {
    // current site is render by @my-react
    window.postMessage({ type: MessageHookType.mount }, "*");
    console.log("[@my-react-devtool/hook] render", set);
    set.forEach((dispatch) => {
      if (!core.hasDispatch(dispatch)) {
        core.addDispatch(dispatch);
      }
    });
  }, 1);
};

if (window.parent && window.parent !== window) {
  console.warn("[@my-react-devtool/hook] currently the @my-react extension does not support iframe.");
} else {
  window["__MY_REACT_DEVTOOL_INTERNAL__"] = core;
  window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
  console.log("chrome from hook.js", chrome);
  window.postMessage({ type: MessageHookType.init }, "*");
}
