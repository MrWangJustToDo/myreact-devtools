import { type PlainNode, type Tree } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { computeWeights, getElementAtIndex, getIndexOfElement, getNodeById, collectVisibleNodes } from "@/utils/node";

import { useFilterNode } from "./useFilterNode";
import { useNodeName } from "./useNodeName";
import { useSelectNode } from "./useSelectNode";

type AppTreeType = { nodes: Tree[]; totalWeight: number };

function getIsCollapsed() {
  const closeList = useSelectNode.getReadonlyState().closeList;
  return (node: PlainNode) => !!closeList?.[node.i];
}

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

function recomputeWeights(nodes: Tree[]): number {
  const isCollapsed = getIsCollapsed();
  const isHide = getIsHide();
  return computeWeights(nodes, isCollapsed, isHide);
}

export const useAppTree = createState(
  () => {
    return { nodes: [], totalWeight: 0 } as AppTreeType;
  },
  {
    withDeepSelector: false,
    withActions: (state) => {
      return {
        addNode: (node: Tree) => {
          const exist = state.nodes.find((n) => n.i === node.i);
          if (exist) {
            state.nodes = state.nodes.map((n) => (n.i === node.i ? node : n));
          } else {
            state.nodes = [...state.nodes, node];
          }
          state.totalWeight = recomputeWeights(state.nodes);
          useSelectNode.getActions().updateSelectList();
        },
        update: () => {
          state.totalWeight = recomputeWeights(state.nodes);
          useSelectNode.getActions().updateSelectList();
        },
        clear: () => {
          state.nodes = [];
          state.totalWeight = 0;
        },
      };
    },
    withNamespace: {
      namespace: "useAppTree",
    },
  }
);

/**
 * Get visible node at the given row index. O(depth) per call.
 * Reuses the isCollapsed/isHide snapshot from the last computeWeights call,
 * so the walk is always consistent with the stored _w values.
 */
export function getTreeElementAtIndex(index: number): PlainNode | null {
  return getElementAtIndex(index);
}

/**
 * Get the visible row index of a node by its id. Used for scroll-to-selection.
 */
export function getTreeIndexOfElement(id: string | number): number {
  return getIndexOfElement(id);
}

/**
 * Get a node by id from the cached map (populated during weight computation).
 */
export function getTreeNodeById(id: string | number): PlainNode | null {
  return getNodeById(id);
}

/**
 * Collect all visible nodes as a flat list.
 * Intentionally lazy — only called by search, not on every tree update.
 */
export function getVisibleNodeList(): PlainNode[] {
  return collectVisibleNodes();
}

// --- Future optimization plans ---
//
// Phase 2: Incremental tree mutations (requires bridge/core changes)
//   Instead of sending a full PlainNode tree snapshot on every commit via DevToolMessageEnum.changed,
//   the backend should send compact delta operations (ADD / REMOVE / REORDER) like React DevTools does.
//   - Add a `diffTree` function in packages/core/src/tree/inspect.ts that compares the previous
//     and current tree, emitting numeric opcodes instead of a full serialized tree.
//   - Add a new DevToolMessageEnum.operations message type to carry the deltas.
//   - Add an `applyOperations(ops)` action here that mutates the existing tree in place and
//     only recomputes weights for affected subtrees.
//   This eliminates the biggest bottleneck: serializing/deserializing the entire tree on every commit.
//
// Phase 3: Backend filtering
//   Currently type/name filters are applied on the frontend during weight computation.
//   Moving filters to the backend (packages/core) would reduce the tree size sent over the bridge,
//   especially for large apps where most nodes are filtered out (e.g. plain DOM elements).

if (!isServer) {
  window.useAppTree = useAppTree;
}
