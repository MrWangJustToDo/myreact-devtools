import { createState } from "reactivity-store";

export const useRunNode = createState(() => ({ state: {} }) as { state: Record<string, { c: number; t?: number }> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, { c: number; t?: number }>) => {
        Object.keys(state).forEach((id) => {
          s.state[id] = { ...s.state[id], ...state[id] };
        });
      },
      clear: () => {
        s.state = {};
      },
    };
  },
});

