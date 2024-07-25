import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useNodeName = createState(() => ({ map: {}, state: {} }) as { map: Record<string, string>; state: Record<string, string> }, {
  withDeepSelector: false,
  withActions: (state) => ({
    set: (s: Record<string, string>) => {
      state.state = s;
      state.map = Object.keys(s).reduce<Record<string, string>>((p, c) => {
        p[s[c]] = c;
        return p;
      }, {});
    },
  }),
});

if (!isServer) {
  window.useNodeName = useNodeName;
}
