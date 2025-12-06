import { createState } from "reactivity-store";

import type { PlainNode } from "@my-react-devtool/core";

export const useDetailNode = createState(
  () =>
    ({ nodes: [], loading: false, error: null, prevNode: null }) as { nodes: PlainNode[]; loading: boolean; error: Error | null; prevNode: PlainNode | null },
  {
    withActions: (s) => ({
      addNode: (node: PlainNode) => {
        if (!node._$f) {
          console.warn("Detail node must be full filled", node);
        }

        const prevNode = s.nodes.find((i) => i.i === node.i);

        s.prevNode = prevNode && prevNode._r !== node._r ? prevNode : s.prevNode;

        const list = s.nodes.filter((i) => i.i !== node.i);

        list.push(node);

        s.nodes = list;
      },

      delNode: (id: string) => {
        s.nodes = s.nodes.filter((i) => i.i !== id);
      },

      setLoading: (loading: boolean) => {
        s.loading = loading;
      },

      setError: (error: Error | null) => {
        s.error = error;
      },

      clearPrev: () => {
        s.prevNode = null;
      },

      clear: () => {
        s.nodes = [];
        s.loading = false;
        s.error = null;
        s.prevNode = null;
      },
    }),
    withDeepSelector: false,
  }
);
