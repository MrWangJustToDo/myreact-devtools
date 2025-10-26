import { include, merge } from "@my-react/react-shared";

import { getDispatchFromFiber, getFiberNodeById } from "../tree";

import { NODE_TYPE } from "./type";

import type { CustomRenderDispatch, HMR } from "@my-react/react-reconciler";

// SEE packages/myreact-refresh/src/RefreshRuntime.ts#7
type RefreshCustomRenderDispatch = CustomRenderDispatch & {
  ["$$hasRefreshInject"]?: boolean;
  __dev_hmr_runtime__?: HMR;
  __dev_refresh_runtime__?: {
    getSignatureByType: (type: any) => {
      key: string;
      forceReset: boolean;
      getCustomHooks: () => any[];

      fullKey?: string;
    };
  };
};

export const getHMRState = (dispatch: RefreshCustomRenderDispatch) => {
  return dispatch?.["$$hasRefreshInject"];
};

export const getHMRInternal = (dispatch: RefreshCustomRenderDispatch, type: any) => {
  return dispatch?.__dev_refresh_runtime__?.getSignatureByType?.(type);
};

export const getHMRInternalFromId = (id: number | string) => {
  const fiber = getFiberNodeById(id.toString());

  const dispatch = getDispatchFromFiber(fiber) as RefreshCustomRenderDispatch | undefined;

  const hmrEnabled = getHMRState(dispatch);

  if (!hmrEnabled) return;

  if (dispatch && fiber && include(fiber.type, merge(NODE_TYPE.__function__, NODE_TYPE.__class__))) {
    return getHMRInternal(dispatch, fiber.elementType);
  }
};
