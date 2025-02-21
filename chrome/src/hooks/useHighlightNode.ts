import { createState } from "reactivity-store";

import type { NodeValue } from "@my-react-devtool/core";

export const useHighlightNode = createState(
  () => ({ state: {}, warn: {}, error: {} }) as { state: Record<string, string>; warn: Record<string, Array<NodeValue>>; error: Record<string, Array<NodeValue>> },
  {
    withActions: (s) => {
      return {
        highlightNode: (id: string, type: string) => {
          s.state[id] = type;
          setTimeout(() => {
            delete s.state[id];
          }, 3000);
        },

        setError: (state: Record<string, Array<NodeValue>>) => {
          s.error = state;
        },

        setWarn: (state: Record<string, Array<NodeValue>>) => {
          s.warn = state;
        },

        clear: () => {
          s.state = {};
          s.warn = {};
          s.error = {};
        }
      };
    },
  }
);

