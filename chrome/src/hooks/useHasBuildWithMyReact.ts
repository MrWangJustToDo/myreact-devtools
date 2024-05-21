import { createState } from "reactivity-store";

import type { CustomRenderDispatch } from "@my-react/react-reconciler";

export const useHasBuildWithMyReact = createState(
  () =>
    ({ state: false, dispatchArr: [] } as {
      state: boolean;
      dispatchArr: CustomRenderDispatch[];
    }),
  {
    withActions: (state) => ({
      addDispatch: (dispatch: CustomRenderDispatch) => {
        state.dispatchArr.push(dispatch);
        state.state = true;
      },
      delDispatch: (dispatch: CustomRenderDispatch) => {
        state.dispatchArr = state.dispatchArr.filter((i) => i !== dispatch);
        state.state = state.dispatchArr.length > 0;
      },
    }),
    withDeepSelector: false,
  }
);
