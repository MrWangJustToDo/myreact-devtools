import { createState } from "reactivity-store";

import type { NodeValue } from "@my-react-devtool/core";

export const useHookValue = createState(
  () => ({ state: {} as Record<string | number, { old: NodeValue; new: NodeValue }>, open: false, index: null as number | null }),
  {
    withActions: (s) => ({
      setHookValue: (index: string | number, oldValue: NodeValue, newValue: NodeValue) => {
        s.state[index] = { old: oldValue, new: newValue };
      },
      setOldValue: (index: string | number, oldValue: NodeValue) => {
        if (!s.state[index]) {
          s.state[index] = { old: oldValue, new: oldValue };
        } else {
          s.state[index].old = oldValue;
        }
      },
      setNewValue: (index: string | number, newValue: NodeValue) => {
        if (!s.state[index]) {
          s.state[index] = { old: newValue, new: newValue };
        } else {
          s.state[index].new = newValue;
        }
      },
      setIndex: (index: number | null) => {
        s.index = index;
      },
      toggleOpen: () => {
        s.open = !s.open;
      },
      clear: () => {
        s.index = null;
        s.state = {};
        s.open = false;
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
