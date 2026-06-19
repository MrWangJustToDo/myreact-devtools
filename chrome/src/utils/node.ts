/* eslint-disable max-lines */
import { PlainNode, TreeOpType } from "@my-react-devtool/core";

import type { TreeOpRemove, TreeOp, Tree } from "@my-react-devtool/core";

// ────────────────────────────────────────────────────────────────────────────
// Tree display helpers (hide/collapse filtering, weight-based indexing)
// ────────────────────────────────────────────────────────────────────────────

const getParentIsNotHide = (node: PlainNode, isHide: (node: PlainNode) => boolean) => {
  let parent = node.r;
  while (parent) {
    if (!isHide(parent)) {
      return parent;
    }
    parent = parent.r;
  }
  return null;
};

export const checkHasInclude = (node: PlainNode, typeArray: number[]) => {
  return typeArray.some((i) => node?.t & i);
};

/**
 * Copy all enumerable own properties from `inComing` onto `exist`.
 * Used to update a cached PlainNode in-place so that reference-equal
 * checks in React.memo still work (we keep the same object identity
 * when display-relevant fields haven't changed).
 */
const assignNode = (exist: PlainNode, inComing: PlainNode) => {
  for (const key in inComing) {
    if (Object.prototype.hasOwnProperty.call(inComing, key)) {
      const typeKey = key as keyof PlainNode;
      (exist as any)[typeKey] = inComing[typeKey];
    }
  }
};

/**
 * Node identity cache — keyed by node id.
 *
 * When display-relevant properties (_d, _r, n, t, k, m) haven't changed,
 * we reuse the same object so React.memo in TreeItem can skip re-rendering.
 * When they DO change, we create a fresh PlainNode so the memo sees a new
 * reference and re-renders.
 */
const nodeMap = new Map<string | number, PlainNode>();

const getCacheNode = (node: PlainNode) => {
  const prev = nodeMap.get(node.i);

  if (prev && prev._d === node._d && prev._r === node._r && prev.n === node.n && prev.t === node.t && prev.k === node.k && prev.m === node.m) {
    assignNode(prev, node);
    return prev;
  }

  const cacheNode = new PlainNode(node.i);
  assignNode(cacheNode, node);
  nodeMap.set(node.i, cacheNode);
  return cacheNode;
};

/**
 * Flatten the tree into a visible node list.
 * Respects collapse (skip children of collapsed nodes) and hide (skip the
 * node itself but still visit its children — "depth collapsing").
 */
export const flattenNode = (node: PlainNode, isCollapsed: (node: PlainNode) => boolean, isHide: (node: PlainNode) => boolean, withDeepReWrite = true) => {
  const list: PlainNode[] = [];

  const stack = [node];

  while (stack.length) {
    const currentNode = stack.pop();

    if (!currentNode) continue;

    const currentIsHide = isHide(currentNode);

    if (!currentIsHide) list.push(getCacheNode(currentNode));

    const _d = currentIsHide && withDeepReWrite ? (getParentIsNotHide(currentNode, isHide)?._d ?? -1) : currentNode._d;

    if (currentNode.c && !isCollapsed(currentNode)) {
      for (let i = currentNode.c.length - 1; i >= 0; i--) {
        const childNode = currentNode.c[i];

        if (withDeepReWrite) childNode._d = _d! + 1;

        stack.push(childNode);
      }
      for (let i = 0; i < currentNode.c.length; i++) {
        const childNode = currentNode.c[i];

        childNode.r = currentNode;
      }
    }
  }

  return list;
};

export function getLastChild(nodes: PlainNode[], node: PlainNode): PlainNode {
  const stack = [node];

  let item: PlainNode | undefined;

  let last = node;

  while ((item = stack.pop()) != null) {
    last = item;
    if (item && item.c && item.c.length > 0) {
      let index = item.c.length - 1;
      while (index >= 0 && !nodes.some((i) => i.i === item!.c[index]?.i)) {
        index--;
      }
      if (index >= 0) {
        stack.push(item.c[index]);
      }
    }
  }

  return last;
}

export const clearNodeCache = () => nodeMap.clear();

// ────────────────────────────────────────────────────────────────────────────
// Weight-based tree indexing (React DevTools pattern)
// ────────────────────────────────────────────────────────────────────────────
//
// Each node gets a `_w` (weight) = number of visible nodes in its subtree
// (including itself). This enables O(depth) row lookups for virtualized
// rendering without materializing a full flat array on every update.

type IsCollapsed = (node: PlainNode) => boolean;
type IsHide = (node: PlainNode) => boolean;

const idMap = new Map<string | number, PlainNode>();

let _lastIsCollapsed: IsCollapsed = () => false;
let _lastIsHide: IsHide = () => false;
let _lastRoots: PlainNode[] = [];

/**
 * Compute visible weight for every node in the tree and populate the id→node
 * lookup map. Also rewrites `_d` (display depth) and `r` (parent link) for
 * hidden-node depth collapsing. Returns the total visible weight across all
 * roots.
 */
export function computeWeights(roots: PlainNode[], isCollapsed: IsCollapsed, isHide: IsHide): number {
  idMap.clear();
  _lastIsCollapsed = isCollapsed;
  _lastIsHide = isHide;

  let total = 0;
  for (let i = 0; i < roots.length; i++) {
    computeNodeWeight(roots[i], isCollapsed, isHide, null, 0);
    total += roots[i]._w || 0;
  }

  _lastRoots = roots.slice();

  return total;
}

function computeNodeWeight(node: PlainNode, isCollapsed: IsCollapsed, isHide: IsHide, parent: PlainNode | null, depth: number): number {
  node.r = parent;
  const hidden = isHide(node);

  if (hidden) {
    const visibleParent = getParentIsNotHide(node, isHide);
    node._d = visibleParent ? (visibleParent._d ?? 0) : -1;
  } else {
    node._d = depth;
  }

  const selfWeight = hidden ? 0 : 1;
  let childWeight = 0;

  if (node.c && !isCollapsed(node)) {
    const childDepth = hidden ? depth : depth + 1;
    for (let i = 0; i < node.c.length; i++) {
      childWeight += computeNodeWeight(node.c[i], isCollapsed, isHide, node, childDepth);
    }
  }

  const w = selfWeight + childWeight;

  node._w = w;

  if (!hidden) {
    const cached = getCacheNode(node);
    idMap.set(node.i, cached);
  }

  return w;
}

/**
 * Get the PlainNode at a given visible row index.
 * Uses the stored weights for O(depth) lookup.
 */
export function getElementAtIndex(targetIndex: number): PlainNode | null {
  let remaining = targetIndex;

  for (let i = 0; i < _lastRoots.length; i++) {
    const root = _lastRoots[i];
    const rootWeight = root._w || 0;
    if (remaining < rootWeight) {
      return findByIndex(root, remaining);
    }
    remaining -= rootWeight;
  }

  return null;
}

function findByIndex(node: PlainNode, targetIndex: number): PlainNode | null {
  const hidden = _lastIsHide(node);

  if (!hidden) {
    if (targetIndex === 0) return idMap.get(node.i) || null;
    targetIndex -= 1;
  }

  if (!node.c || _lastIsCollapsed(node)) return null;

  for (let i = 0; i < node.c.length; i++) {
    const child = node.c[i];
    const childWeight = child._w || 0;
    if (targetIndex < childWeight) {
      return findByIndex(child, targetIndex);
    }
    targetIndex -= childWeight;
  }

  return null;
}

/**
 * Get the visible row index of a node by its id.
 */
export function getIndexOfElement(id: string | number): number {
  let offset = 0;

  for (let i = 0; i < _lastRoots.length; i++) {
    const result = findIndexInSubtree(_lastRoots[i], id);
    if (result !== -1) return offset + result;
    offset += _lastRoots[i]._w || 0;
  }

  return -1;
}

function findIndexInSubtree(node: PlainNode, id: string | number): number {
  const hidden = _lastIsHide(node);

  if (!hidden && node.i === id) return 0;

  let offset = hidden ? 0 : 1;

  if (!node.c || _lastIsCollapsed(node)) return -1;

  for (let i = 0; i < node.c.length; i++) {
    const child = node.c[i];
    const result = findIndexInSubtree(child, id);
    if (result !== -1) return offset + result;
    offset += child._w || 0;
  }

  return -1;
}

export function getNodeById(id: string | number): PlainNode | null {
  return idMap.get(id) || null;
}

/**
 * Collect all visible nodes as a flat list. Used by search (intentionally
 * lazy — only called on search submit, not on every tree update).
 */
export function collectVisibleNodes(): PlainNode[] {
  const list: PlainNode[] = [];
  for (let i = 0; i < _lastRoots.length; i++) {
    collectFromNode(_lastRoots[i], list);
  }
  return list;
}

function collectFromNode(node: PlainNode, list: PlainNode[]): void {
  const hidden = _lastIsHide(node);
  if (!hidden) {
    const cached = idMap.get(node.i);
    if (cached) list.push(cached);
  }

  if (node.c && !_lastIsCollapsed(node)) {
    for (let i = 0; i < node.c.length; i++) {
      collectFromNode(node.c[i], list);
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Incremental tree patching
// ────────────────────────────────────────────────────────────────────────────
//
// The backend (core) sends TreeOp[] deltas after each reconciler commit.
// `applyTreeOperations()` applies these ops to the frontend's mirror tree
// (an array of root PlainNodes with nested `.c` children arrays).
//
// ── Processing order ──
//
//   1. REMOVE ops are extracted and processed first. This ensures stale nodes
//      are cleaned up before new nodes are added (avoids id collisions and
//      dangling references).
//
//   2. Remaining ops (ADD, UPDATE_META, REORDER_CHILDREN) are processed with
//      a retry loop. Ops that fail (e.g. child ADD before parent ADD) are
//      deferred and retried until the queue is empty or makes no progress.
//
// ── REORDER_CHILDREN (React DevTools pattern) ──
//
//   The backend sends a single REORDER_CHILDREN per parent with the complete
//   new child id list. The frontend replaces the parent's `.c` array
//   atomically. This works because:
//     - REMOVE has already removed deleted children
//     - ADD has already created new children
//     - REORDER_CHILDREN runs last and sets the final order
//
// ── Retry loop for out-of-order ops ──
//
//   Ops within a batch may arrive out of order (e.g. child ADD before parent
//   ADD, or REORDER_CHILDREN before its children's ADD). The retry loop
//   handles this: failed ops are deferred and retried after other ops
//   succeed. The loop terminates when the queue is empty or no progress is
//   made (stuck ops are silently dropped with a warning).

/**
 * Build a flat id→node map from the current tree roots.
 * This is rebuilt at the start of each `applyTreeOperations` call.
 */
function buildFullIdMap(roots: Tree[]): Map<string, PlainNode> {
  const map = new Map<string, PlainNode>();
  const stack: PlainNode[] = [];
  for (let i = roots.length - 1; i >= 0; i--) {
    stack.push(roots[i]);
  }
  while (stack.length) {
    const node = stack.pop()!;
    map.set(node.i, node);
    if (node.c) {
      for (let i = node.c.length - 1; i >= 0; i--) {
        stack.push(node.c[i]);
      }
    }
  }
  return map;
}

/**
 * Recursively remove a node and all its descendants from the id map.
 *
 * React DevTools enforces children-first removal order (throws if a parent
 * is removed before its children). Our backend doesn't guarantee that order,
 * so we clean up the entire subtree here to prevent orphan nodes from
 * accumulating in fullMap and causing stale lookups.
 */
function removeSubtreeFromMap(node: PlainNode, map: Map<string, PlainNode>): void {
  map.delete(node.i);
  if (node.c) {
    for (let i = 0; i < node.c.length; i++) {
      removeSubtreeFromMap(node.c[i], map);
    }
  }
}

/** Module-level map rebuilt per applyTreeOperations call. */
let fullMap: Map<string, PlainNode> | null = null;

type ApplyOpResult = { applied: boolean; modified: boolean };

/**
 * Try to apply a single tree operation.
 *
 * Returns:
 *   - applied: true if the op was handled (successfully or as a no-op)
 *   - modified: true if the tree was actually changed
 *
 * When `applied` is false, the op should be retried later (its dependencies
 * haven't been satisfied yet, e.g. parent not yet added).
 */
const tryApplyTreeOp = (roots: Tree[], op: TreeOp): ApplyOpResult => {
  if (!fullMap) return { applied: false, modified: false };

  switch (op.op) {
    // ── ADD: insert a new node into the tree ──
    //
    // If parentId is set, insert as child of that parent.
    // Position is determined by afterId:
    //   - afterId = null → prepend as first child
    //   - afterId = "xyz" → insert after sibling "xyz"
    //   - afterId sibling not found → append at end (fallback)
    //
    // If parentId is null, this is a root node.
    //
    // Deferred if parentId is set but parent doesn't exist yet.
    case TreeOpType.ADD: {
      if (fullMap.has(op.id)) return { applied: true, modified: false };

      if (op.parentId && !fullMap.has(op.parentId)) {
        return { applied: false, modified: false };
      }

      const newNode = op.node;
      newNode.c = null as any;
      newNode.r = null;

      if (op.parentId) {
        const parent = fullMap.get(op.parentId)!;
        if (!parent.c) parent.c = [];
        if (op.afterId) {
          const afterIdx = parent.c.findIndex((c) => c.i === op.afterId);
          if (afterIdx !== -1) {
            parent.c.splice(afterIdx + 1, 0, newNode);
          } else {
            parent.c.push(newNode);
          }
        } else {
          parent.c.unshift(newNode);
        }
        newNode.r = parent;
      } else {
        roots.push(newNode);
        newNode.r = null;
      }

      fullMap.set(op.id, newNode);
      return { applied: true, modified: true };
    }

    // ── REMOVE: delete a node and its subtree from the tree ──
    //
    // Detaches the node from its parent's `.c` array (or from roots),
    // then recursively removes the entire subtree from fullMap so
    // descendants don't become orphans.
    //
    // Deferred if the node doesn't exist (might be removed by a
    // previous subtree removal, or not yet added).
    case TreeOpType.REMOVE: {
      const node = fullMap.get(op.id);
      if (!node) return { applied: false, modified: false };

      if (node.r && node.r.c) {
        const idx = node.r.c.indexOf(node);
        if (idx !== -1) {
          node.r.c.splice(idx, 1);
        }
      } else {
        const rootIdx = roots.findIndex((r) => r.i === op.id);
        if (rootIdx !== -1) {
          roots.splice(rootIdx, 1);
        }
      }

      removeSubtreeFromMap(node, fullMap);
      return { applied: true, modified: true };
    }

    // ── UPDATE_META: patch display fields on an existing node ──
    //
    // Only updates fields that are present in the op (sparse update).
    // Deferred if the node doesn't exist yet.
    case TreeOpType.UPDATE_META: {
      const node = fullMap.get(op.id);
      if (!node) return { applied: false, modified: false };

      if (op.n !== undefined) node.n = op.n;
      if (op.t !== undefined) node.t = op.t;
      if (op.k !== undefined) node.k = op.k;
      if (op.m !== undefined) node.m = op.m;
      return { applied: true, modified: true };
    }

    // ── REORDER_CHILDREN: atomically replace a parent's child list ──
    //
    // Modeled after React DevTools' TREE_OPERATION_REORDER_CHILDREN.
    // The op carries the complete new child id list. We look up each
    // child by id, build a new array, and replace the parent's `.c`.
    //
    // This is processed AFTER ADD ops, so all referenced children
    // should exist. Deferred if the parent or any child is missing.
    //
    // This is atomic — no sequential splice issues, no stale afterId
    // references.
    case TreeOpType.REORDER_CHILDREN: {
      const parent = fullMap.get(op.id);
      if (!parent) return { applied: false, modified: false };

      const newChildren: PlainNode[] = [];
      for (let i = 0; i < op.children.length; i++) {
        const child = fullMap.get(op.children[i]);
        if (!child) {
          // A referenced child doesn't exist yet — defer this op.
          // It will be retried after ADD ops create the missing child.
          return { applied: false, modified: false };
        }
        newChildren.push(child);
      }

      parent.c = newChildren;
      for (let i = 0; i < newChildren.length; i++) {
        newChildren[i].r = parent;
      }
      return { applied: true, modified: true };
    }

    default:
      return { applied: true, modified: false };
  }
};

/**
 * Apply incremental tree operations to the mirror tree.
 *
 * Two-phase processing:
 *   Phase 1: REMOVE ops (drain stale nodes before adding new ones)
 *   Phase 2: ADD, UPDATE_META, REORDER_CHILDREN (with retry for ordering)
 *
 * Each phase uses a retry loop: failed ops are deferred and retried until
 * the queue is empty or makes no progress (stuck). This handles out-of-order
 * dependencies (e.g. child ADD arriving before parent ADD in the same batch).
 *
 * Returns true if any modification was made to the tree.
 */
export function applyTreeOperations(roots: Tree[], ops: TreeOp[]): boolean {
  if (ops.length === 0) return false;

  fullMap = buildFullIdMap(roots);
  let modified = false;
  const allPending = ops.slice();

  // ── Phase 1: process all REMOVE ops first ──
  // Removing before adding prevents id collisions (a node removed then
  // re-added with the same id) and ensures parent.c doesn't have stale refs.
  let pendingRemove = allPending.filter((op) => op.op === TreeOpType.REMOVE);
  let pending: TreeOp[] = allPending.filter((op) => op.op !== TreeOpType.REMOVE);

  while (pendingRemove.length > 0) {
    const queue: TreeOpRemove[] = [];

    for (let i = 0; i < pendingRemove.length; i++) {
      const { applied, modified: opModified } = tryApplyTreeOp(roots, pendingRemove[i]);
      if (applied) {
        if (opModified) modified = true;
      } else {
        queue.push(pendingRemove[i]);
      }
    }

    if (queue.length === 0) break;
    if (queue.length === pendingRemove.length) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[@my-react-devtool] REMOVE ops stuck — nodes not found:",
          queue.map((q) => q.id)
        );
      }
      break;
    }

    pendingRemove = queue;
  }

  // ── Phase 2: process ADD, UPDATE_META, REORDER_CHILDREN ──
  // Retry loop handles out-of-order dependencies.
  while (pending.length > 0) {
    const queue: TreeOp[] = [];

    for (let i = 0; i < pending.length; i++) {
      const { applied, modified: opModified } = tryApplyTreeOp(roots, pending[i]);
      if (applied) {
        if (opModified) modified = true;
      } else {
        queue.push(pending[i]);
      }
    }

    if (queue.length === 0) break;
    if (queue.length === pending.length) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[@my-react-devtool] ops stuck — dependencies not satisfied:",
          queue.map((q) => ({ op: q.op, id: (q as any).id }))
        );
      }
      break;
    }

    pending = queue;
  }

  return modified;
}
