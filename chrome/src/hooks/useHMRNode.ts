import { createState } from "reactivity-store";

export const useHMRNode = createState(() => ({ state: {} }) as { state: Record<string, number> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        s.state = state;
      },
      clear: () => {
        s.state = {};
      },
    };
  },
});
