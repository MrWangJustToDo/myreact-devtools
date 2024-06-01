import { MessageHookType, MessageProxyType } from "./type";

import type { MessageHookDataType } from "./type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

let hookReady = false;

const portReady = false;

let port: chrome.runtime.Port | null = null;

let id = null;

const runWhenHookReady = (fn: () => void, count: number) => {
  if (hookReady) {
    fn();
  } else {
    if (count > 10) {
      console.error("[@my-react-devtool/proxy] hook is not ready");

      return;
    }

    clearTimeout(id);

    id = setTimeout(() => {
      runWhenHookReady(fn, count + 1);
    }, 2000);
  }
};

const onMessage = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (!hookReady && message.data?.type === MessageHookType.init) {
    console.log("[@my-react-devtool/proxy] hook ready");

    hookReady = true;

    window.postMessage({ type: MessageProxyType.ready }, "*");

    port = chrome.runtime.connect({ name: "devtool" });
  }

  if (message.data?.type === MessageHookType.mount) {
    console.log("[@my-react-devtool/proxy] hook mount");

    runWhenHookReady(() => {
      port.postMessage(message.data);
    }, 1);
  }

  if (message.data?.type === MessageHookType.render) {
    console.log("[@my-react-devtool/proxy] hook render");

    runWhenHookReady(() => {
      const dataSet = message.data.data as Set<CustomRenderDispatch>;
      // TODO
      console.log("[@my-react-devtool/proxy] render", dataSet);
    }, 1);
  }
};

console.log("chrome from proxy.js", chrome);

window.addEventListener("message", onMessage);
