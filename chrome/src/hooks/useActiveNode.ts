import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useActiveNode = createState(
  () => ({
    state: {} as Record<string, number>,
  }),
  {
    withActions: (s) => ({
      add: (id: string) => {
        if (s.state[id]) {
          if (s.state[id] < 0) {
            s.state[id] = 1;
          } else {
            s.state[id]++;
          }
        } else {
          s.state[id] = 1;
        }
      },
      remove: (id: string) => {
        if (s.state[id]) {
          if (s.state[id] < 0) {
            s.state[id] = 0;
          } else {
            s.state[id]--;
          }
        }
      },
      clear: () => {
        s.state = {};
      },
    }),
  }
);

if (!isServer) {
  window.useActiveNode = useActiveNode;
}
