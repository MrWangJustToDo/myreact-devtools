import { createState } from "reactivity-store";

// import { mock } from "@/mock/data";
import { flattenNode } from "@/utils/flattenTree";
import { isServer } from "@/utils/isServer";

import type { TreeNode } from "@/utils/node";
import type { PlainNode } from "@my-react-devtool/core";

type AppTreeType = { nodes: PlainNode[]; flattenNodes: TreeNode[] };

// const _data = JSON.parse(mock);

// const _flattenNodes = flattenNode([_data]);

export const useAppTree = createState(
  () => {
    return { nodes: [], flattenNodes: [] } as AppTreeType;
  },
  {
    withDeepSelector: false,
    withActions: (state) => {
      const flattenCurrentNodes = () => {
        state.flattenNodes = flattenNode(state.nodes);
      };

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

          flattenCurrentNodes();
        },
        delNode: (node: PlainNode) => {
          if (state.nodes.some((n) => n.id === node.id)) {
            state.nodes = state.nodes.filter((n) => n.id !== node.id);
            flattenCurrentNodes();
          }
        },
      };
    },
    // withNamespace: "useAppTree",
  }
);

if (!isServer) {
  window.useAppTree = useAppTree;
}
