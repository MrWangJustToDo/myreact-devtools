import { createState } from "reactivity-store";

import { useSelectNode } from "./useSelectNode";

export const useUpdateState = createState(
  () =>
    ({ id: "", oldVal: "", newVal: "", hookIndex: "", path: "", type: "" }) as {
      id: number | string;
      rootId?: number | string;
      parentId?: number | string;
      oldVal: any;
      newVal: any;
      hookIndex?: number | string;
      path: string;
      type: string;
    },
  {
    withActions: (state) => ({
      setUpdateState: ({ id, rootId, parentId, path, oldVal, newVal, hookIndex, type }: typeof state) => {
        if (!useSelectNode.getReadonlyState().select) return;
        state.id = id;
        state.rootId = rootId;
        state.parentId = parentId;
        state.path = path;
        state.oldVal = oldVal;
        state.newVal = newVal;
        state.hookIndex = hookIndex;
        state.type = type;
      },
      clear: () => {
        state.id = "";
        state.rootId = "";
        state.parentId = "";
        state.path = "";
        state.oldVal = "";
        state.newVal = "";
        state.hookIndex = "";
        state.type = "";
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
