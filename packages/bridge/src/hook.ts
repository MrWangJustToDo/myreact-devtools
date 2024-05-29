import type { CustomRenderDispatch } from "@my-react/react-reconciler";

enum MessagePostType {
  init = "hook-init",
  render = "hook-render",
}

enum MessageReceiveType {
  ready = "proxy-ready",
}

type MessageData = {
  type: MessageReceiveType;
  data: any;
};

let proxyReady = false;

const onMessage = (message: MessageEvent<MessageData>) => {
  if (!proxyReady && message.data.type === MessageReceiveType.ready) {
    console.log("[@my-react-devtool] proxy ready");
    proxyReady = true;
  }
};

window.addEventListener("message", onMessage);

const set = new Set<CustomRenderDispatch>();

let hasPending = false;

const runWhenProxyReady = (fn: () => void, count: number) => {
  if (proxyReady) {
    fn();
  } else {
    if (count > 10) {
      console.error("[@my-react-devtool] proxy is not ready");
      return;
    }
    if (hasPending) return;
    hasPending = true;
    setTimeout(() => {
      runWhenProxyReady(fn, count + 1);
    }, 5000);
  }
};

export const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);
  runWhenProxyReady(() => {
    window.postMessage({ type: MessagePostType.render, data: set }, "*");
  }, 1);
};

if (window.parent && window.parent !== window) {
  console.warn(
    "[@my-react-devtool] currently the @my-react extension does not support iframe."
  );
} else {
  window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
  window.postMessage({ type: MessagePostType.init }, "*");
}
