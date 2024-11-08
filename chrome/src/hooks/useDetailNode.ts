import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

import type { PlainNode } from "@my-react-devtool/core";

export const useDetailNode = createState(() => ({ nodes: [], loading: false, error: null }) as { nodes: PlainNode[]; loading: boolean; error: Error | null }, {
  withActions: (s) => ({
    addNode: (node: PlainNode) => {
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
    
    clear: () => {
      s.nodes = [];
      s.loading = false;
      s.error = null;
    }
  }),
  withDeepSelector: false,
});

if (!isServer) {
  window.useDetailNode = useDetailNode;
}
