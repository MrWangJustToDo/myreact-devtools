import { isNormalEquals } from "@my-react/react-shared";

import { getNode, getNodeFromId } from "../data";
import { getHookIndexFromState } from "../hook";
import { inspectDispatch } from "../tree";

import type { DevToolCore } from "../instance";
import type { DevToolRenderDispatch } from "../setup";
import type { UpdateState } from "@my-react/react-reconciler";

export const getTree = (dispatch: DevToolRenderDispatch, runtime: DevToolCore) => {
  const { directory, current } = inspectDispatch(dispatch);

  runtime._map.set(dispatch, current);

  if (!isNormalEquals(runtime._dir, directory)) {
    runtime._dir = { ...directory };

    return { directory, current };
  }

  return { current };
};

export const getValidTrigger = (runtime: DevToolCore) => {
  return Object.keys(runtime._trigger).reduce((p, c) => {
    const t = runtime._trigger[c];

    const f = t.filter((i: { isRetrigger?: boolean }) => (i.isRetrigger ? runtime._enableRetrigger : true));

    p[c] = f.length;

    return p;
  }, {});
};

export const getValidTriggerStatus = (id: string, runtime: DevToolCore) => {
  const status = runtime._trigger[id];

  if (!status) return;

  const finalStatus = status.filter((i) => (i.isRetrigger ? runtime._enableRetrigger : true)).slice(-10);

  return finalStatus.map((i) => {
    const _keysToLinkHook = getHookIndexFromState(i as UpdateState);

    const node = getNode(i);

    if (_keysToLinkHook && _keysToLinkHook.length > 0) {
      node._keysToLinkHook = _keysToLinkHook;
    }

    return node;
  });
};

export const getMapValueLengthObject = (map: Record<string, any[]>) => {
  return Object.keys(map).reduce(
    (p, c) => {
      p[c] = map[c].length;
      return p;
    },
    {} as Record<string, number>
  );
};

export const getChunkDataFromIds = (ids: Array<string | number>) => {
  return ids.reduce((p, c) => {
    const d = getNodeFromId(Number(c));

    p[c] = { loaded: d };

    return p;
  }, {});
};
