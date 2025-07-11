import { initPlainNode, unmountPlainNode } from "./tree";

import type { DevToolCore } from "./instance";
import type { CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  ["$$hasDevToolInject"]?: boolean;
  ["$$hasDevToolPatch"]?: boolean;
  onDOMUpdate?: (cb: (f: MyReactFiberNode) => void) => void;
  onDOMAppend?: (cb: (f: MyReactFiberNode) => void) => void;
  onDOMSetRef?: (cb: (f: MyReactFiberNode) => void) => void;

  // old version api
  onBeforeCommit: (cb: () => void) => () => boolean;
  onAfterCommit: (cb: () => void) => () => boolean;
  onBeforeUpdate: (cb: () => void) => () => boolean;
  onAfterUpdate: (cb: () => void) => () => boolean;
  onBeforeUnmount: (cb: () => void) => () => boolean;
  onAfterUnmount: (cb: () => void) => () => boolean;

  // new version api
  onBeforeCommitMount?: (cb: () => void) => () => void;
  onAfterCommitMount?: (cb: () => void) => () => void;
  onBeforeCommitUpdate?: (cb: () => void) => () => void;
  onAfterCommitUpdate?: (cb: () => void) => () => void;
  onBeforeCommitUnmount?: (cb: () => void) => () => void;
  onAfterCommitUnmount?: (cb: () => void) => () => void;
}

// TODO use 'eventListener' instead of 'patchFunction'
function overridePatchToFiberUnmount(dispatch: DevToolRenderDispatch, runtime: DevToolCore) {
  if (typeof dispatch.onFiberUnmount === "function") {
    dispatch.onFiberUnmount((f) => unmountPlainNode(f, runtime));
  } else {
    if (__DEV__) {
      console.warn("[@my-react-devtool/core] current version of @my-react will deprecate in next update, please upgrade to latest version");
    }

    const originalPatchUnmount = dispatch.patchToFiberUnmount;

    dispatch.patchToFiberUnmount = function (this: CustomRenderDispatch, fiber) {
      originalPatchUnmount.call(this, fiber);
      unmountPlainNode(fiber, runtime);
    };
  }
}

function overridePatchToFiberInit(dispatch: DevToolRenderDispatch, runtime: DevToolCore) {
  if (typeof dispatch.onFiberInitial === "function") {
    dispatch.onFiberInitial((f) => initPlainNode(f, runtime));
  } else {
    if (__DEV__) {
      console.warn("[@my-react-devtool/core] current version of @my-react will deprecate in next update, please upgrade to latest version");
    }

    const originalPatchInit = dispatch.patchToFiberInitial;

    dispatch.patchToFiberInitial = function (this: CustomRenderDispatch, fiber) {
      originalPatchInit.call(this, fiber);
      initPlainNode(fiber, runtime);
    };
  }
}

export const setupDispatch = (dispatch: DevToolRenderDispatch, runtime: DevToolCore) => {
  if (dispatch["$$hasDevToolInject"]) return;

  dispatch["$$hasDevToolInject"] = true;

  overridePatchToFiberInit(dispatch, runtime);

  overridePatchToFiberUnmount(dispatch, runtime);

  Object.defineProperty(dispatch, "__dev_devtool_runtime__", { value: { core: runtime, version: __VERSION__ } });
};
