import { NODE_TYPE } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { useAppTree } from "./useAppTree";

const defaultDisableType = new Set<string>(
  [NODE_TYPE.__comment__, NODE_TYPE.__initial__, NODE_TYPE.__text__, NODE_TYPE.__empty__, NODE_TYPE.__null__, NODE_TYPE.__plain__, NODE_TYPE.__fragment__].map(
    (i) => `${i}`
  )
);

export const useFilterNode = createState(() => ({ filter: defaultDisableType }), {
  withActions: (s) => ({
    onChange: (filter: Set<string>) => {
      s.filter = filter;
      useAppTree.getActions().update();
    },
  }),
  withDeepSelector: false,
  withNamespace: "useFilterNode",
  withPersist: {
    key: "useFilterNode_v1",
    stringify: (state) => JSON.stringify(Array.from(state.filter)),
    parse: (state) => ({ filter: new Set(JSON.parse(state)) }),
  },
});
