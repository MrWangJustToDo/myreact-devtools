import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useHighlightNode = createState(
  () => ({ state: {}, warn: {}, error: {} }) as { state: Record<string, string>; warn: Record<string, Array<any[]>>; error: Record<string, Array<any[]>> },
  {
    withActions: (s) => {
      return {
        highlightNode: (id: string, type: string) => {
          s.state[id] = type;
          setTimeout(() => {
            delete s.state[id];
          }, 3000);
        },

        setError: (state: Record<string, Array<any[]>>) => {
          Object.keys(state).forEach((i) => {
            s.error[i] = s.error[i] || [];

            s.error[i].push(...state[i]);
          })
        },

        setWarn: (state: Record<string, Array<any[]>>) => {
          Object.keys(state).forEach((i) => {
            s.warn[i] = s.warn[i] || [];

            s.warn[i].push(...state[i]);
          })
        }
      };
    },
  }
);

if (!isServer) {
  window.useHighlightNode = useHighlightNode;
}
