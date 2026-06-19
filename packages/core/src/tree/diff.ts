import { getParentIdMap, getPlainStore } from "./inspect";
import { TreeOpType } from "./op";

import type { PlainNode } from "./instance";
import type { TreeOp, TreeOpUpdateMeta } from "./op";

/**
 * ── Tree Diff Algorithm ──
 *
 * This module computes the minimum set of operations needed to transform the
 * frontend's mirror tree from its previous state into the current state.
 *
 * Lifecycle:
 *   1. BEFORE the reconciler mutates the tree, `snapshotBeforeChange()` clones
 *      the affected subtree into a Map<id, ClonedPlainNode>. Each clone stores
 *      `_ci` (old children ids in order) and `_pi` (old parent id).
 *   2. `inspectList()` walks the changed fibers and mutates the canonical
 *      `treeMap` / `plainStore` / `parentIdMap` in place.
 *   3. `diffTree()` (this function) compares the snapshot against the
 *      now-mutated canonical maps and emits TreeOp[] deltas.
 *
 * The walk is depth-first (using an explicit stack) starting from each
 * changedRoot. For every node visited:
 *
 *   - NOT in snapshot → new node → emit ADD
 *   - In snapshot but parent changed → reparented → emit REMOVE + ADD
 *   - In snapshot, same parent, meta changed → emit UPDATE_META
 *   - Old children missing from new set → emit REMOVE for each
 *   - Child order changed → emit REORDER_CHILDREN (full child list)
 *
 * On the frontend, ops are applied in two phases:
 *   Phase 1: all REMOVE ops (so stale nodes are cleared first)
 *   Phase 2: ADD, UPDATE_META, REORDER_CHILDREN (with retry for ordering)
 *
 * ── Why REORDER_CHILDREN ──
 *
 * React DevTools uses a single REORDER_CHILDREN op per parent that carries the
 * complete new child id list. This is atomic and order-independent — the
 * frontend simply replaces the parent's children array.
 */
export function diffTree(snapshot: Map<string, PlainNode>, changedRoots: PlainNode[]): TreeOp[] {
  const ops: TreeOp[] = [];
  const plainStore = getPlainStore();
  const parentIdMap = getParentIdMap();
  const visited = new Set<string>();

  // Depth-first walk using explicit stack (push in reverse for correct order)
  const stack: PlainNode[] = [];
  for (let i = changedRoots.length - 1; i >= 0; i--) {
    stack.push(changedRoots[i]);
  }

  while (stack.length) {
    const node = stack.pop()!;

    // Guard against visiting the same node twice (possible with overlapping changedRoots)
    if (visited.has(node.i)) continue;
    visited.add(node.i);

    // Guard: if the node was unmounted (removed from plainStore by
    // unmountPlainNode during commit step ①) but still appears in the
    // rebuilt tree due to a race, skip it — any REMOVE for it was already
    // handled by the parent's removed-children detection.
    if (!plainStore.has(node.i)) continue;

    const old = snapshot.get(node.i);
    const newParentId = parentIdMap.get(node.i) || null;

    if (!old) {
      // ── New node: not in the pre-change snapshot ──
      // Emit ADD with positional hint (afterId) so the frontend can insert
      // it at the correct position among its siblings.
      emitAdd(node, plainStore, parentIdMap, ops);
    } else {
      const parentChanged = old._pi !== newParentId;

      if (parentChanged) {
        // ── Reparented node: parent changed between commits ──
        // The node moved to a different parent. We emit REMOVE from the old
        // position, then ADD at the new position. The frontend processes
        // REMOVEs first, so the node will be gone before the ADD re-creates it.
        ops.push({ op: TreeOpType.REMOVE, id: node.i });
        emitAdd(node, plainStore, parentIdMap, ops);
      } else if (hasMetaChanged(old, node)) {
        // ── Metadata changed: name, type, key, or compiler flag ──
        // Emit a lightweight UPDATE_META with only the changed fields.
        const metaOp: TreeOpUpdateMeta = { op: TreeOpType.UPDATE_META, id: node.i };
        if (old.n !== node.n) metaOp.n = node.n;
        if (old.t !== node.t) metaOp.t = node.t;
        if (old.k !== node.k) metaOp.k = node.k;
        if (old.m !== node.m) metaOp.m = node.m;
        ops.push(metaOp);
      }

      // ── Detect removed children ──
      // Compare old._ci (snapshot children ids) with the new children set.
      // If a child id was in the old set but is NOT in the new set, check
      // whether the node still exists in plainStore:
      //   - If not in plainStore → the fiber was truly unmounted → emit REMOVE
      //   - If still in plainStore → it was reparented to another parent,
      //     which will be handled when we visit that node (parentChanged path)
      const newChildren = node.c ? node.c.map((c) => c.i) : [];
      const newChildSet = new Set(newChildren);

      for (let i = 0; i < old._ci.length; i++) {
        const oldChildId = old._ci[i];
        if (!newChildSet.has(oldChildId) && !plainStore.has(oldChildId)) {
          ops.push({ op: TreeOpType.REMOVE, id: oldChildId });
        }
      }

      // ── Detect child reorder ──
      // If the child list changed in any way (different length or different
      // order), emit a single REORDER_CHILDREN op with the complete new list.
      // This is processed AFTER ADD ops on the frontend, so newly added
      // children will already exist in the map.
      //
      // This is atomic — no sequential splice issues. It also works when
      // children are added/removed AND reordered in the same commit.
      if (!parentChanged && !childOrderEqual(old._ci, newChildren)) {
        ops.push({
          op: TreeOpType.REORDER_CHILDREN,
          id: node.i,
          children: newChildren,
        });
      }
    }

    // Push children onto stack in reverse order for correct DFS processing
    if (node.c) {
      for (let i = node.c.length - 1; i >= 0; i--) {
        stack.push(node.c[i]);
      }
    }
  }

  return ops;
}

/** Compare two ordered child-id arrays for equality. */
function childOrderEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function hasMetaChanged(old: PlainNode, node: PlainNode): boolean {
  return old.n !== node.n || old.t !== node.t || old.k !== node.k || old.m !== node.m;
}

/**
 * Emit an ADD op for a node.
 *
 * The `afterId` field tells the frontend where to insert among siblings.
 * We derive it from the node's position in its parent's current children
 * array (which reflects the post-commit state).
 */
function emitAdd(node: PlainNode, plainStore: Map<string, PlainNode>, parentIdMap: Map<string, string>, ops: TreeOp[]): void {
  const parentId = parentIdMap.get(node.i) || null;
  let afterId: string | null = null;

  if (parentId) {
    const parentNode = plainStore.get(parentId);
    if (parentNode && parentNode.c) {
      const idx = parentNode.c.indexOf(node);
      if (idx > 0) {
        afterId = parentNode.c[idx - 1].i;
      }
    }
  }

  ops.push({
    op: TreeOpType.ADD,
    id: node.i,
    parentId,
    afterId,
    node,
  });
}
