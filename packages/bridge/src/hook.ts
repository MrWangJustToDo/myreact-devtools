import { once } from "@my-react/react-shared";
import { DevToolCore } from "@my-react-devtool/core";

import { MessageHookType, MessageDetectorType, MessagePanelType, DevToolSource, MessageWorkerType, sourceFrom } from "./type";
import { generatePostMessageWithSource } from "./window";

import type { MessageDetectorDataType, MessagePanelDataType, MessageWorkerDataType } from "./type";
import type { CustomRenderDispatch } from "@my-react/react-reconciler";

const core = new DevToolCore();

const hookPostMessageWithSource = generatePostMessageWithSource(sourceFrom.hook);

core.subscribe((message) => {
  if (__DEV__) {
    console.log("[@my-react-devtool/hook] core message", message);
  }
  hookPostMessageWithSource({ type: MessageHookType.render, data: message });
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

const onMessage = (message: MessageEvent<MessagePanelDataType | MessageDetectorDataType | MessageWorkerDataType>) => {
  if (message.source !== window) return;

  if (message.data?.source !== DevToolSource) return;

  if (message.data?.from === sourceFrom.hook) return;

  if (__DEV__ && message.data?.type) {
    console.log("[@my-react-devtool/hook] message from proxy", message.data);
  }

  if (!detectorReady && message.data?.type === MessageDetectorType.init) {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] detector init");
    }

    detectorReady = true;
  }

  if (message.data?.type === MessageWorkerType.init) {
    core.connect();
  }

  if (message.data?.type === MessagePanelType.show) {
    core.connect();

    core.notifyAll();
  }

  // 主动关闭panel / 或者worker失活
  if (message.data?.type === MessagePanelType.hide || message.data?.type === MessageWorkerType.close) {
    core.disconnect();
  }

  if (message.data?.type === MessagePanelType.nodeSelect) {
    core.setSelect(message.data.data);

    core.notifySelect();
  }
};

window.addEventListener("message", onMessage);

const onceMount = once(() => {
  // current site is render by @my-react
  hookPostMessageWithSource({ type: MessageHookType.mount });
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
  hookPostMessageWithSource({ type: MessageHookType.init });
}
