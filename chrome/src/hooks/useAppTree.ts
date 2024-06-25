import { type PlainNode, type Tree } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { flattenNode } from "@/utils/node";

import { useFilterNode } from "./useFilterNode";
import { useTreeNode } from "./useTreeNode";

type AppTreeType = { nodes: Tree[]; list: PlainNode[] };

export const useAppTree = createState(
  () => {
    return { nodes: [], list: [] } as AppTreeType;
  },
  {
    withDeepSelector: false,
    withActions: (state) => {
      return {
        addNode: (node: Tree) => {
          const closeList = useTreeNode.getReadonlyState().closeList;
          const filterSet = useFilterNode.getReadonlyState().filter;
          const filterArray = Array.from(filterSet);
          const exist = state.nodes.find((n) => n.id === node.id);
          // TODO! improve
          if (exist) {
            state.nodes = state.nodes.map((n) => (n.id === node.id ? node : n));
            state.list = state.nodes
              .map((n) =>
                flattenNode(
                  n,
                  (node) => closeList?.[node.id],
                  (node) => filterArray.some((i) => +i & node.type)
                )
              )
              .flat(1);
            useTreeNode.getActions().updateSelectList();
          } else {
            state.nodes = [...state.nodes, node];
            state.list = [
              ...state.list,
              ...flattenNode(
                node,
                (node) => closeList?.[node.id],
                (node) => filterArray.some((i) => +i & node.type)
              ),
            ];
            useTreeNode.getActions().updateSelectList();
          }
        },
        update: () => {
          const closeList = useTreeNode.getReadonlyState().closeList;
          const filterSet = useFilterNode.getReadonlyState().filter;
          const filterArray = Array.from(filterSet);
          state.list = state.nodes
            .map((n) =>
              flattenNode(
                n,
                (node) => closeList?.[node.id],
                (node) => filterArray.some((i) => +i & node.type)
              )
            )
            .flat(1);
          useTreeNode.getActions().updateSelectList();
        },
      };
    },
    // withNamespace: "useAppTree",
  }
);

if (!isServer) {
  window.useAppTree = useAppTree;
}
