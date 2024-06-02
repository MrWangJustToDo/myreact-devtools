import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

import type { PlainNode } from "@my-react-devtool/core";

type AppTreeType = { nodes: PlainNode[] };

export const useAppTree = createState(
  () => {
    return { nodes: [] } as AppTreeType;
  },
  {
    withDeepSelector: false,
    withActions: (state) => {
      return {
        addNode: (node: PlainNode) => {
          if (state.nodes.every((n) => n.uuid !== node.uuid)) {
            state.nodes = state.nodes.concat(node);
          }
        },
        delNode: (node: PlainNode) => {
          if (state.nodes.some((n) => n.uuid === node.uuid)) {
            state.nodes = state.nodes.filter((n) => n.uuid !== node.uuid);
          }
        },
      };
    },
  }
);

if (!isServer) {
  window.useAppTree = useAppTree;
}