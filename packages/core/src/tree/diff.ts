import { getParentIdMap, getPlainStore } from "./inspect";
import { TreeOpType } from "./op";

import type { PlainNode } from "./instance";
import type { TreeOp, TreeOpUpdateMeta } from "./op";

/**
 * Compute delta operations by comparing a pre-change snapshot against
 * the current treeMap state (which has already been mutated by inspectList).
 *
 * @param snapshot - Map of nodeId -> cloned PlainNode captured BEFORE inspectList ran
 * @param changedRoots - The PlainNode roots returned by inspectList (the subtrees that were rebuilt)
 */
export function diffTree(snapshot: Map<string, PlainNode>, changedRoots: PlainNode[]): TreeOp[] {
  const ops: TreeOp[] = [];
  const plainStore = getPlainStore();
  const parentIdMap = getParentIdMap();
  const visited = new Set<string>();

  const stack: PlainNode[] = [];
  for (let i = changedRoots.length - 1; i >= 0; i--) {
    stack.push(changedRoots[i]);
  }

  while (stack.length) {
    const node = stack.pop()!;

    if (visited.has(node.i)) continue;
    visited.add(node.i);

    const old = snapshot.get(node.i);
    const newParentId = parentIdMap.get(node.i) || null;

    if (!old) {
      emitAdd(node, plainStore, parentIdMap, ops);
    } else {
      const parentChanged = old._pi !== newParentId;

      if (parentChanged) {
        ops.push({ op: TreeOpType.REMOVE, id: node.i });
        emitAdd(node, plainStore, parentIdMap, ops);
      } else if (old.n !== node.n || old.t !== node.t || old.k !== node.k || old.m !== node.m) {
        const metaOp: TreeOpUpdateMeta = { op: TreeOpType.UPDATE_META, id: node.i };
        if (old.n !== node.n) metaOp.n = node.n;
        if (old.t !== node.t) metaOp.t = node.t;
        if (old.k !== node.k) metaOp.k = node.k;
        if (old.m !== node.m) metaOp.m = node.m;
        ops.push(metaOp);
      }

      // Detect removed children
      const newChildren = node.c ? node.c.map((c) => c.i) : [];
      const newChildSet = new Set(newChildren);

      for (let i = 0; i < old._ci.length; i++) {
        if (!newChildSet.has(old._ci[i])) {
          if (!plainStore.has(old._ci[i])) {
            ops.push({ op: TreeOpType.REMOVE, id: old._ci[i] });
          }
        }
      }
    }

    // Push children onto stack (reverse order for correct processing order)
    if (node.c) {
      for (let i = node.c.length - 1; i >= 0; i--) {
        stack.push(node.c[i]);
      }
    }
  }

  return ops;
}

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
