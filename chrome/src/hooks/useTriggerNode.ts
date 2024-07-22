import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

import type { PlainNode } from "@my-react-devtool/core";

export const useTriggerNode = createState(() => ({ state: null, count: {} }) as { state: PlainNode[] | null; count: Record<string, number> }, {
  withDeepSelector: false,
  withActions: (s) => {
    return {
      update: (node: PlainNode[]) => {
        s.state = node;
        node.forEach((i) => {
          s.count[i.id] = s.count[i.id] ? s.count[i.id] + 1 : 1;
        });
      },
      reset: () => {
        s.state = null;
      },
    };
  },
});

if (!isServer) {
  window.useTriggerNode = useTriggerNode;
}
