import { createState } from "reactivity-store";

import type { NodeValue } from "@my-react-devtool/core";

export type ConsoleEntry = {
  type: string;
  args: readonly NodeValue[];
};

export const useConsole = createState(() => ({ entries: [] as ConsoleEntry[], count: 0 }), {
  withActions: (state) => ({
    appendEntries: (entries: ConsoleEntry[]) => {
      state.entries = [...state.entries, ...entries];
    },
    // called by core when it clears, no need to notify back
    reset: () => {
      state.entries = [];
    },
    // called by UI clear button, bumps count to notify core
    clear: () => {
      state.entries = [];
      state.count++;
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
