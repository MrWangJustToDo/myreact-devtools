import { createState } from "reactivity-store";

export const useHighlightNode = createState(
  () =>
    ({ state: {}, warn: {}, error: {}, count: 0 }) as {
      state: Record<string, string>;
      warn: Record<string, number>;
      error: Record<string, number>;
      count: number;
    },
  {
    withActions: (s) => {
      return {
        highlightNode: (id: string, type: string) => {
          s.state[id] = type;
          setTimeout(() => {
            delete s.state[id];
          }, 3000);
        },

        setError: (state: Record<string, number>) => {
          s.error = state;
        },

        setWarn: (state: Record<string, number>) => {
          s.warn = state;
        },

        deleteHighlight: (id: string) => {
          delete s.state[id];
          delete s.warn[id];
          delete s.error[id];
        },

        clearMessage: () => {
          s.count++;
        },

        clear: () => {
          s.state = {};
          s.warn = {};
          s.error = {};
        },
      };
    },
  }
);
