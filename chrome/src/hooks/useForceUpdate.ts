import { createState } from "reactivity-store";

export const useForceUpdate = createState(() => ({ count: 0 }), {
  withActions(state) {
    return {
      increment() {
        state.count++;
      },
    };
  },
  withDeepSelector: false,
});
