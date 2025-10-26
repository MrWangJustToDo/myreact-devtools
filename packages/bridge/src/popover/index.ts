import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageDetectorType, MessageHookType, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

import type { MessageHookDataType } from "../type";

let hookReady = false;

const detectorPostMessageWithSource = generatePostMessageWithSource(sourceFrom.detector);

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

    id = setTimeout(() => runWhenHookReady(fn, count ? count + 1 : 1), 1000);
  }
};

// message from hook
const onMessageFromHook = (message: MessageEvent<MessageHookDataType>) => {
  if (message.source !== window) return;

  if (message.data?.source !== DevToolSource) return;

  if (message.data.to !== sourceFrom.detector) return;

  if (!hookReady && message.data?.type === MessageHookType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/detector] hook init");
    }

    hookReady = true;

    detectorPostMessageWithSource({ type: MessageDetectorType.init, to: sourceFrom.hook });
  }

  if (message.data?.type === MessageHookType.mount) {
    runWhenHookReady(() => {
      if (__DEV__) {
        console.log("[@my-react-devtool/detector] hook mount:", message.data);
      }

      // to background worker
      chrome.runtime.sendMessage({
        type: message.data.type,
        source: DevToolSource,
        from: sourceFrom.detector,
        data: message.data?.data,
        to: sourceFrom.worker,
      });
    });
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onMessageFromHook);
}
