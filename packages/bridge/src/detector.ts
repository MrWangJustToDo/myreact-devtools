import { DevToolSource, MessageDetectorType, MessageHookType } from "./type";
import { windowPostMessageWithSource } from "./window";

import type { MessageHookDataType } from "./type";

let hookReady = false;

let id = null;

const runWhenHookReady = (fn: () => void, count?: number) => {
  clearTimeout(id);
  if (hookReady) {
    fn();
  } else {
    if (count && count > 10) {
      if (__DEV__) {
        console.error("[@my-react-devtool/detector] hook not ready");
      }
      return;
    }
    id = setTimeout(() => runWhenHookReady(fn, count ? count + 1 : 1), 2000);
  }
};

const onMessage = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.source !== DevToolSource) return;

  if (!hookReady && message.data?.type === MessageHookType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/detector] hook init");
    }

    hookReady = true;

    windowPostMessageWithSource({ type: MessageDetectorType.init });
  }

  if (message.data?.type === MessageHookType.mount) {
    runWhenHookReady(() => {
      if (__DEV__) {
        console.log("[@my-react-devtool/detector] hook mount");
      }
      chrome.runtime.sendMessage({ type: MessageHookType.mount });
    });
  }
};

window.addEventListener("message", onMessage);
