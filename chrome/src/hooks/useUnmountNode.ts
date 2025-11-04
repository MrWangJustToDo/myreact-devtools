import { createState } from "reactivity-store";

export const useUnmountNode = createState(() => ({ state: {} as Record<string, boolean> }), {
  withActions: (s) => ({
    addUnmountNode: (id: string) => {
      s.state[id] = true;
    },
    onClear: () => {
      s.state = {};
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
