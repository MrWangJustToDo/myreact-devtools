import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useTriggerNode = createState(() => ({ state: {} }) as { state: Record<string, number> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        Object.keys(state).forEach(key => {
          s.state[key] = state[key];
        });
      },
      reset: () => {
        s.state = {};
      },
    };
  },
});

if (!isServer) {
  window.useTriggerNode = useTriggerNode;
}
