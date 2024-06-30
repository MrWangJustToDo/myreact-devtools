import { unmountPlainNode } from "./tree";

import type { CustomRenderDispatch } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  hasDevToolInject?: boolean;
  hasDevToolPatch?: boolean;
}

function overridePatchToFiberUnmount(dispatch: DevToolRenderDispatch) {
  const originalPatchUnmount = dispatch.patchToFiberUnmount;

  dispatch.patchToFiberUnmount = function (this: CustomRenderDispatch, fiber) {
    originalPatchUnmount.call(this, fiber);
    unmountPlainNode(fiber);
  };
}

export const setupDispatch = (dispatch: DevToolRenderDispatch) => {
  if (dispatch.hasDevToolInject) return;

  dispatch.hasDevToolInject = true;

  overridePatchToFiberUnmount(dispatch);
};
