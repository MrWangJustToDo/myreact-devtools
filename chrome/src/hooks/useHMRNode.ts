import { createState } from "reactivity-store";

export const useHMRNode = createState(() => ({ state: {}, count: 0 }) as { state: Record<string, number>; count: number }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        s.state = state;
      },
      clearHMR: () => {
        s.count++;
      },
      clear: () => {
        s.state = {};
      },
    };
  },
});
