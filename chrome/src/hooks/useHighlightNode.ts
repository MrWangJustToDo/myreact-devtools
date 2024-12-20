import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

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
          Object.keys(state).forEach((i) => {
            s.error[i] = s.error[i] || [];

            s.error[i].push(...state[i]);
          })
        },

        setWarn: (state: Record<string, Array<NodeValue>>) => {
          Object.keys(state).forEach((i) => {
            s.warn[i] = s.warn[i] || [];

            s.warn[i].push(...state[i]);
          })
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

if (!isServer) {
  window.useHighlightNode = useHighlightNode;
}
