import { createState } from "reactivity-store";

import type { HMRStatus } from "@my-react-devtool/core";

export const useHMRNode = createState(() => ({ state: {}, status: {} }) as { state: Record<string, number>; status: Record<string, HMRStatus> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (state: Record<string, number>) => {
        Object.keys(state).forEach((key) => {
          s.state[key] = state[key];
        });
      },
      updateStatus: (status: Record<string, HMRStatus>) => {
        Object.keys(status).forEach((key) => {
          s.status[key] = status[key];
        });
      },
      clear: () => {
        s.state = {};
        s.status = {};
      },
    };
  },
});
