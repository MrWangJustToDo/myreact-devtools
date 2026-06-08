import { DevToolSource } from "@my-react-devtool/core/event";

import { MessageDetectorType, MessageHookType, sourceFrom } from "../type";
import { generatePostMessageWithSource, safeRuntimeSendMessage, updateExtensionIconForCurrentTab } from "../utils";

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

const notifyBackgroundIcon = (data: MessageHookDataType["data"]) => {
  safeRuntimeSendMessage({
    type: MessageHookType.mount,
    source: DevToolSource,
    from: sourceFrom.detector,
    data,
    to: sourceFrom.worker,
  });
};

const notifyBackgroundUnload = () => {
  safeRuntimeSendMessage({
    type: MessageDetectorType.unload,
    source: DevToolSource,
    from: sourceFrom.detector,
    to: sourceFrom.worker,
  });
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

      updateExtensionIconForCurrentTab(message.data?.data, () => notifyBackgroundIcon(message.data?.data));
    });
  }
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onMessageFromHook);

  // Real page unload only. pushState / hash routing stay on the same document.
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;

    notifyBackgroundUnload();
  });
}
