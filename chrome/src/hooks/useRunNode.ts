import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useRunNode = createState(() => ({ state: {} }) as { state: Record<string, { c: number; t?: number }> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, { c: number; t?: number }>) => {
        s.state = { ...s.state, ...state };
      },
      reset: () => {
        s.state = {};
      },
    };
  },
});

if (!isServer) {
  window.useRunNode = useRunNode;
}
