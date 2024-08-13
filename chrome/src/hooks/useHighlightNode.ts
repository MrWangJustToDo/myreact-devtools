import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useHighlightNode = createState(() => ({ state: {} }) as { state: Record<string, string> }, {
  withActions: (s) => {
    return {
      highlightNode: (id: string, type: string) => {
        s.state[id] = type;
        setTimeout(() => {
          delete s.state[id];
        }, 3000);
      },
    };
  },
});

if (!isServer) {
  window.useHighlightNode = useHighlightNode;
}
