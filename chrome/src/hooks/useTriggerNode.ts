import { createState } from "reactivity-store";

export const useTriggerNode = createState(() => ({ state: {}, count: 0 }) as { state: Record<string, number>; count: number }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        const targetKeys = Object.keys(state);
        const existKeys = Object.keys(s.state);
        const allKeys = new Set([...targetKeys, ...existKeys]);
        allKeys.forEach((key) => {
          if (state[key] === s.state[key]) return;
          if (state[key]) {
            s.state[key] = state[key];
          } else {
            delete s.state[key];
          }
        })
      },
      clearTrigger: () => {
        s.count++;
      },
      clear: () => {
        s.state = {};
      },
    };
  },
});
