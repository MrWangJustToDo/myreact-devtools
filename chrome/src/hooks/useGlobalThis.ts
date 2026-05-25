import { createState } from "reactivity-store";

import type { NodeValue } from "@my-react-devtool/core";

// debug for global, help for cross platform
export const useGlobalThis = createState(() => ({ target: null as null | NodeValue, count: 0 }), {
  withActions: (state) => ({
    setTarget: (n?: NodeValue) => {
      state.target = n || null;
    },
    forceLoad: () => state.count++,
    clear: () => {
      state.target = null;
      state.count = 0;
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
