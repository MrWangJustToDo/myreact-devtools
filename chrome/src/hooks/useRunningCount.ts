import { createState } from "reactivity-store";

export const useRunningCount = createState(() => ({ state: {} as Record<string | number, number> }), {
  withNamespace: "useRunningCount",
  withDeepSelector: false,
  withActions: (s) => ({
    increment(key: string | number) {
      if (!s.state[key]) {
        s.state[key] = 1;
      } else {
        s.state[key] += 1;
      }
    },
    clear() {
      s.state = {};
    },
  }),
});
