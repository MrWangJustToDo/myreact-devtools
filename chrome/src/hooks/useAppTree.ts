import { type PlainNode, type Tree } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { flattenNode } from "@/utils/node";

import { useFilterNode } from "./useFilterNode";
import { useNodeName } from "./useNodeName";
import { useSelectNode } from "./useSelectNode";

type AppTreeType = { nodes: Tree[]; list: PlainNode[] };

function getIsHide() {
  const filterSet = useFilterNode.getReadonlyState().filter;
  const filterArray = Array.from(filterSet);
  const nameFilters = useFilterNode.getReadonlyState().nameFilters;
  const nameState = useNodeName.getReadonlyState().map;

  return (node: PlainNode) => {
    if (filterArray.some((i) => +i & node.t)) return true;
    if (nameFilters.size > 0 && nameState[node.n]) {
      const displayName = nameState[node.n].toLowerCase();
      const nameArray = Array.from(nameFilters);
      for (let j = 0; j < nameArray.length; j++) {
        if (displayName.includes(nameArray[j].toLowerCase())) return true;
      }
    }
    return false;
  };
}

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
          const closeList = useSelectNode.getReadonlyState().closeList;
          const isHide = getIsHide();
          const exist = state.nodes.find((n) => n.i === node.i);
          // TODO! improve
          if (exist) {
            state.nodes = state.nodes.map((n) => (n.i === node.i ? node : n));
            state.list = state.nodes.map((n) => flattenNode(n, (node) => closeList?.[node.i], isHide)).flat(1);
            useSelectNode.getActions().updateSelectList();
          } else {
            state.nodes = [...state.nodes, node];
            state.list = [...state.list, ...flattenNode(node, (node) => closeList?.[node.i], isHide)];
            useSelectNode.getActions().updateSelectList();
          }
        },
        update: () => {
          const closeList = useSelectNode.getReadonlyState().closeList;
          const isHide = getIsHide();
          state.list = state.nodes.map((n) => flattenNode(n, (node) => closeList?.[node.i], isHide)).flat(1);
          useSelectNode.getActions().updateSelectList();
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
    withNamespace: {
      namespace: "useAppTree",
    },
  }
);

if (!isServer) {
  window.useAppTree = useAppTree;
}
