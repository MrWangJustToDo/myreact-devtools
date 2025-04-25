import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageDetectorType, MessageHookType, sourceFrom } from "./type";
import { generatePostMessageWithSource } from "./window";

import type { MessageHookDataType } from "./type";

let hookReady = false;

let id = null;

const detectorPostMessageWithSource = generatePostMessageWithSource(sourceFrom.detector);

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

    id = setTimeout(() => runWhenHookReady(fn, count ? count + 1 : 1), 1000);
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

    detectorPostMessageWithSource({ type: MessageDetectorType.init });
  }

  if (message.data?.type === MessageHookType.mount) {
    runWhenHookReady(() => {
      if (__DEV__) {
        console.log("[@my-react-devtool/detector] hook mount");
      }

      chrome.runtime.sendMessage({ type: MessageHookType.mount, from: sourceFrom.detector, data: message.data?.data });
    });
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onMessage);
}
