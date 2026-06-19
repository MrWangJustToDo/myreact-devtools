import type { PlainNode } from "./instance";

/**
 * Operation types for incremental tree updates.
 *
 * The backend (core) diffs the fiber tree before/after each commit and emits
 * a list of TreeOp objects. These are sent over the bridge and applied by the
 * frontend (chrome) to keep its mirror tree in sync.
 *
 * Processing order on the frontend:
 *   1. REMOVE   — processed first (children-first order preferred)
 *   2. ADD      — creates new nodes in the mirror tree
 *   3. UPDATE_META — patches display-relevant fields on existing nodes
 *   4. REORDER_CHILDREN — atomically sets the final child order for a parent
 */
export enum TreeOpType {
  ADD = 1,
  REMOVE = 2,
  UPDATE_META = 3,
  REORDER_CHILDREN = 5,
}

/** Insert a new node into the tree. */
export type TreeOpAdd = {
  op: TreeOpType.ADD;
  id: string;
  parentId: string | null;
  /** Insert after this sibling, or null to prepend as first child. */
  afterId: string | null;
  node: PlainNode;
};

/** Remove a node (and implicitly its entire subtree) from the tree. */
export type TreeOpRemove = { op: TreeOpType.REMOVE; id: string };

/** Patch display-relevant metadata on an existing node. */
export type TreeOpUpdateMeta = {
  op: TreeOpType.UPDATE_META;
  id: string;
  n?: string;
  t?: number;
  k?: string | number;
  m?: boolean;
};

/**
 * Atomically replace a parent's child list with the new ordered list.
 * Emitted AFTER ADD/REMOVE so all referenced children exist in the map.
 *
 * Modeled after React DevTools' TREE_OPERATION_REORDER_CHILDREN which sends
 * [parentId, numChildren, ...childIds] as a single operation.
 */
export type TreeOpReorderChildren = {
  op: TreeOpType.REORDER_CHILDREN;
  id: string;
  children: string[];
};

export type TreeOp = TreeOpAdd | TreeOpRemove | TreeOpUpdateMeta | TreeOpReorderChildren;
