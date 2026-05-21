import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageDetectorType, MessageHookType, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

import type { MessageHookDataType } from "../type";

let hookReady = false;

const detectorPostMessageWithSource = generatePostMessageWithSource(sourceFrom.detector);

const pendingHookCallbacks: Array<() => void> = [];

const runWhenHookReady = (fn: () => void) => {
  if (hookReady) {
    fn();
  } else {
    pendingHookCallbacks.push(fn);
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

    for (const cb of pendingHookCallbacks) {
      cb();
    }
    pendingHookCallbacks.length = 0;
  }

  if (message.data?.type === MessageHookType.mount) {
    runWhenHookReady(() => {
      if (__DEV__) {
        console.log("[@my-react-devtool/detector] hook mount:", message.data);
      }

      const runtime = (globalThis as any).browser?.runtime || (globalThis as any).chrome?.runtime;

      runtime?.sendMessage({
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
