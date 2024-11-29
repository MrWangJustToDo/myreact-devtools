import { unmountPlainNode } from "./tree";

import type { DevToolCore } from "./instance";
import type { CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  ["$$hasDevToolInject"]?: boolean;
  ["$$hasDevToolPatch"]?: boolean;
  onDOMUpdate?: (cb: (f: MyReactFiberNode) => void) => void;
  onDOMAppend?: (cb: (f: MyReactFiberNode) => void) => void;
  onDOMSetRef?: (cb: (f: MyReactFiberNode) => void) => void;
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

export const setupDispatch = (dispatch: DevToolRenderDispatch, runtime: DevToolCore) => {
  if (dispatch["$$hasDevToolInject"]) return;

  dispatch["$$hasDevToolInject"] = true;

  overridePatchToFiberUnmount(dispatch);

  Object.defineProperty(dispatch, "__devtool_runtime__", { value: runtime });
};
