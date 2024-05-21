import type { CustomRenderDispatch } from "@my-react/react-reconciler";

export interface DevToolRenderDispatch extends CustomRenderDispatch {
  hasInject?: boolean;
}

export const setupDispatch = (dispatch: DevToolRenderDispatch) => {
  if (dispatch.hasInject) return;

  dispatch.hasInject = true;

  const originalPatchUnmount = dispatch.patchToFiberUnmount;

  dispatch.patchToFiberUnmount = function (this: CustomRenderDispatch, fiber) {
    originalPatchUnmount.call(this, fiber);
  }
}