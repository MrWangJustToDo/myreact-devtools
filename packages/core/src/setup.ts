import { unmountPlainNode } from "./tree";

import type { CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  hasDevToolInject?: boolean;
  hasDevToolPatch?: boolean;
  // next version
  onFiberUnmount?: (cb: (fiber: MyReactFiberNode) => void) => void;
  onFiberTrigger?: (cb: (fiber: MyReactFiberNode) => void) => void;
  onAfterCommit?: (cb: () => void) => void;
  onAfterUpdate?: (cb: () => void) => void;
  version?: string;
}

// TODO use 'eventListener' instead of 'patchFunction'
function overridePatchToFiberUnmount(dispatch: DevToolRenderDispatch) {
  if (typeof dispatch.onFiberUnmount === "function") {
    dispatch.onFiberUnmount(unmountPlainNode);
  } else {
    const originalPatchUnmount = dispatch.patchToFiberUnmount;

    dispatch.patchToFiberUnmount = function (this: CustomRenderDispatch, fiber) {
      originalPatchUnmount.call(this, fiber);
      unmountPlainNode(fiber);
    };
  }
}

export const setupDispatch = (dispatch: DevToolRenderDispatch) => {
  if (dispatch.hasDevToolInject) return;

  dispatch.hasDevToolInject = true;

  overridePatchToFiberUnmount(dispatch);
};
