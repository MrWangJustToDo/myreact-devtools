import { createState } from "reactivity-store";

import { useSelectNode } from "./useSelectNode";

export const useUpdateState = createState(
  () =>
    ({ id: "", oldVal: "", newVal: "", hookIndex: "", path: "" }) as {
      id: number | string;
      oldVal: any;
      newVal: any;
      hookIndex: number | string;
      path: string;
    },
  {
    withActions: (state) => ({
      setUpdateState: ({
        id,
        path,
        oldVal,
        newVal,
        hookIndex,
      }: {
        id: number | string;
        path: string;
        oldVal: any;
        newVal: any;
        hookIndex: number | string;
      }) => {
        if (!useSelectNode.getReadonlyState().select) return;
        state.id = id;
        state.path = path;
        state.oldVal = oldVal;
        state.newVal = newVal;
        state.hookIndex = hookIndex;
      },
      clear: () => {
        state.id = "";
        state.path = "";
        state.oldVal = "";
        state.newVal = "";
        state.hookIndex = "";
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
