import { createState } from "reactivity-store";

import { mock } from "@/mock/data";
import { isServer } from "@/utils/isServer";

import type { PlainNode } from "@my-react-devtool/core";

type AppTreeType = { nodes: PlainNode[]; current: PlainNode | null };

const _data = JSON.parse(mock);

export const useAppTree = createState(
  () => {
    return { nodes: [_data], current: null } as AppTreeType;
  },
  {
    withDeepSelector: false,
    withActions: (state) => {
      return {
        addNode: (node: PlainNode) => {
          const currentNodes = Array.from(state.nodes);

          const index = currentNodes.findIndex((n) => n.id === node.id);

          if (index !== -1) {
            currentNodes.splice(index, 1, node);
          } else {
            currentNodes.push(node);
          }

          state.nodes = currentNodes;
        },
        delNode: (node: PlainNode) => {
          if (state.nodes.some((n) => n.id === node.id)) {
            state.nodes = state.nodes.filter((n) => n.id !== node.id);
          }
        },
        selectCurrent: (node: PlainNode | null) => {
          state.current = node;
        },
      };
    },
    // withNamespace: "useAppTree",
  }
);

if (!isServer) {
  window.useAppTree = useAppTree;
}
