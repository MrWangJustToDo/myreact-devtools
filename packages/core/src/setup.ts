import { unmountPlainNode } from "./tree";

import type { CustomRenderDispatch } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  hasInject?: boolean;
}

function overridePatchToFiberUnmount(dispatch: DevToolRenderDispatch) {
  const originalPatchUnmount = dispatch.patchToFiberUnmount;

  dispatch.patchToFiberUnmount = function (this: CustomRenderDispatch, fiber) {
    originalPatchUnmount.call(this, fiber);
    unmountPlainNode(fiber);
  };
}

export const setupDispatch = (dispatch: DevToolRenderDispatch) => {
  if (dispatch.hasInject) return;

  dispatch.hasInject = true;

  overridePatchToFiberUnmount(dispatch);
};
