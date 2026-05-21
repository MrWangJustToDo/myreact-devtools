import { once } from "@my-react/react-shared";
import { DevToolSource } from "@my-react-devtool/core/event";

import { core } from "../core";
import { onMessageFromPanelOrWorkerOrDetector } from "../message";
import { MessageHookType, MessageDetectorType, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

import type { MessageDetectorDataType, MessageHookDataType, MessagePanelDataType, MessageWorkerDataType } from "../type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

const hookPostMessageWithSource = generatePostMessageWithSource(sourceFrom.hook);

core.subscribe((message) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/hook] core message", message);
  }

  hookPostMessageWithSource({ type: MessageHookType.render, data: message, to: sourceFrom.panel });
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

    if (count && count > 60) {
      return;
    }

    const newId = setTimeout(() => runWhenDetectorReady(fn, count ? count + 1 : 1), 1000);

    idMap.set(fn, newId);
  }
};

const onMessage = (message: MessageEvent<MessageHookDataType | MessagePanelDataType | MessageDetectorDataType | MessageWorkerDataType>) => {
  if (typeof window === "undefined") return;

  // allow iframe dev
  if (message.source !== window && message.data?.from !== sourceFrom.iframe) return;

  if (message.data?.source !== DevToolSource) return;

  if (message.data?.to !== sourceFrom.hook) return;

  if (!detectorReady && message.data?.type === MessageDetectorType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] detector init");
    }

    detectorReady = true;
  }

  onMessageFromPanelOrWorkerOrDetector(message.data);
};

if (typeof window !== "undefined") {
  window.addEventListener("message", onMessage);
}

const onceMount = once(() => {
  hookPostMessageWithSource({ type: MessageHookType.mount, to: sourceFrom.detector });
});

const onceDev = once(() => {
  hookPostMessageWithSource({ type: MessageHookType.mount, data: { mode: "develop" }, to: sourceFrom.detector });
});

const oncePro = once(() => {
  hookPostMessageWithSource({ type: MessageHookType.mount, data: { mode: "product" }, to: sourceFrom.detector });
});

const onceOrigin = once(() => {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;

    core._origin = origin;

    hookPostMessageWithSource({ type: MessageHookType.origin, data: origin, to: sourceFrom.detector });
  }
});

export const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);

  core.addDispatch(dispatch);

  if (dispatch.mode === "development") {
    runWhenDetectorReady(onceDev);
  } else if (dispatch.mode === "production") {
    runWhenDetectorReady(oncePro);
  } else {
    runWhenDetectorReady(onceMount);
  }

  runWhenDetectorReady(onceOrigin);
};

globalHook.prepare = () => {
  if (typeof globalThis["__@my-react/react-devtool-inject-pending__"] === "function") {
    globalThis["__@my-react/react-devtool-inject-pending__"]?.();
  } else {
    globalThis["__@my-react/dispatch__"]?.forEach((d) => globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.(d));
  }
};

globalHook.init = () => hookPostMessageWithSource({ type: MessageHookType.init, to: sourceFrom.detector });

export const getDetectorReady = () => detectorReady;

globalHook.getDetectorReady = getDetectorReady;

// Re-send mount message when the page is restored from bfcache,
// since the once() guards prevent the initial mount handlers from firing again.
if (typeof window !== "undefined") {
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && set.size > 0) {
      const dispatch = Array.from(set)[0];
      const data: any = {};
      if (dispatch?.mode === "development") {
        data.mode = "develop";
      } else if (dispatch?.mode === "production") {
        data.mode = "product";
      }
      hookPostMessageWithSource({ type: MessageHookType.mount, data, to: sourceFrom.detector });
    }
  });
}

export { core };
