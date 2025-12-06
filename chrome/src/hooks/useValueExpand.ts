import { createState } from "reactivity-store";

type ValueExpandState = Record<string, boolean>;

export const useValueExpand = createState(() => ({ state: {} as ValueExpandState }), {
  withActions: (s) => ({
    toggleExpand: (key: string) => {
      s.state[key] = !s.state[key];
    },
    reset: () => {
      s.state = {};
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
