import { createState } from "reactivity-store";

export const useTriggerNode = createState(() => ({ state: {}, count: 0 }) as { state: Record<string, number>; count: number }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        const targetKeys = Object.keys(state);
        const targetLength = targetKeys.length;
        const existLength = Object.keys(s.state).length;
        // 更新优化
        if (targetLength === existLength) {
          targetKeys.forEach((key) => {
            if (s.state[key] !== state[key]) {
              s.state[key] = state[key];
            }
          });
        } else {
          s.state = state;
        }
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
