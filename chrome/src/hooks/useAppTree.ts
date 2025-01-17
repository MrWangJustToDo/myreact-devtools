import { type PlainNode, type Tree } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { flattenNode } from "@/utils/node";

import { useFilterNode } from "./useFilterNode";
import { useTreeNode } from "./useTreeNode";

type AppTreeType = { nodes: Tree[]; list: PlainNode[] };

// TODO
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
          const exist = state.nodes.find((n) => n.i === node.i);
          // TODO! improve
          if (exist) {
            state.nodes = state.nodes.map((n) => (n.i === node.i ? node : n));
            state.list = state.nodes
              .map((n) =>
                flattenNode(
                  n,
                  (node) => closeList?.[node.i],
                  (node) => filterArray.some((i) => +i & node.t)
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
                (node) => closeList?.[node.i],
                (node) => filterArray.some((i) => +i & node.t)
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
                (node) => closeList?.[node.i],
                (node) => filterArray.some((i) => +i & node.t)
              )
            )
            .flat(1);
          useTreeNode.getActions().updateSelectList();
        },
        clear: () => {
          state.nodes = [];
          state.list = [];
        },
        // change: (node: PlainNode) => {
        //   void 0;
        // }
      };
    },
    // withNamespace: "useAppTree",
  }
);
