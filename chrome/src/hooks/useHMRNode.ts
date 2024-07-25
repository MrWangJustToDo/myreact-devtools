import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useHMRNode = createState(() => ({ state: {} }) as { state: Record<string, number> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        s.state = state;
      },
      reset: () => {
        s.state = {};
      },
    };
  },
});

if (!isServer) {
  window.useHMRNode = useHMRNode;
}
