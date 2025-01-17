import { createState } from "reactivity-store";

export const useNodeName = createState(() => ({ map: {}, state: {} }) as { map: Record<string, string>; state: Record<string, string> }, {
  withDeepSelector: false,
  withActions: (state) => ({
    set: (s: Record<string, string>) => {
      Object.keys(s).forEach(key => {
        state.state[key] = s[key];
        state.map[s[key]] = key;
      })
    },
    clear: () => {
      state.state = {};
      state.map = {};
    }
  }),
});
