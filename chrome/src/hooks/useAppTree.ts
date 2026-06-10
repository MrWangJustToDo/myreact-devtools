import { type PlainNode, type Tree, type TreeOp } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { computeWeights, getElementAtIndex, getIndexOfElement, getNodeById, collectVisibleNodes, applyTreeOperations } from "@/utils/node";

import { useFilterNode } from "./useFilterNode";
import { useNodeName } from "./useNodeName";
import { useSelectNode } from "./useSelectNode";

type AppTreeType = {
  nodes: Tree[];
  totalWeight: number;
  updateCount: number;
  /** Bumped on force refresh to remount Virtuoso even when totalWeight is unchanged. */
  refreshKey: number;
  /** Per-root refresh keys — one entry per root node id. */
  rootRefreshKeys: Record<string, number>;
  /** Bumped to request a full data sync from the bridge. */
  refreshCount: number;
};

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
    return { nodes: [], totalWeight: 0, updateCount: 0, refreshKey: 0, rootRefreshKeys: {}, refreshCount: 0 } as AppTreeType;
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
            if (state.rootRefreshKeys[node.i] === undefined) {
              state.rootRefreshKeys = { ...state.rootRefreshKeys, [node.i]: 0 };
            }
          }
          state.totalWeight = recomputeWeights(state.nodes);
          useSelectNode.getActions().updateSelectList();
        },
        applyOperations: (ops: TreeOp[]) => {
          const modified = applyTreeOperations(state.nodes, ops);
          if (modified) {
            state.totalWeight = recomputeWeights(state.nodes);
            state.updateCount++;
            useSelectNode.getActions().updateSelectList();
          }
        },
        update: () => {
          state.totalWeight = recomputeWeights(state.nodes);
          useSelectNode.getActions().updateSelectList();
        },
        forceRefresh: () => {
          const nextRootKeys = { ...state.rootRefreshKeys };
          for (const root of state.nodes) {
            nextRootKeys[root.i] = (nextRootKeys[root.i] ?? 0) + 1;
          }
          state.rootRefreshKeys = nextRootKeys;
          state.refreshKey++;
          state.refreshCount++;
          state.totalWeight = recomputeWeights(state.nodes);
          state.updateCount++;
          useSelectNode.getActions().updateSelectList();
        },
        clear: () => {
          state.nodes = [];
          state.totalWeight = 0;
          state.refreshKey = 0;
          state.rootRefreshKeys = {};
          state.refreshCount = 0;
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
// Phase 3: Backend filtering
//   Currently type/name filters are applied on the frontend during weight computation.
//   Moving filters to the backend (packages/core) would reduce the tree size sent over the bridge,
//   especially for large apps where most nodes are filtered out (e.g. plain DOM elements).

if (!isServer) {
  window.useAppTree = useAppTree;
}
