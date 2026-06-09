import { PlainNode, TreeOpType } from "@my-react-devtool/core";

import type { TreeOpRemove, TreeOp, Tree } from "@my-react-devtool/core";

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

const assignNode = (exist: PlainNode, inComing: PlainNode) => {
  for (const key in inComing) {
    if (Object.prototype.hasOwnProperty.call(inComing, key)) {
      const typeKey = key as keyof PlainNode;
      (exist as any)[typeKey] = inComing[typeKey];
    }
  }
};

const nodeMap = new Map<string | number, PlainNode>();

const getCacheNode = (node: PlainNode) => {
  const prev = nodeMap.get(node.i);

  // When display-relevant properties change (_d, _r, etc.), create a new object
  // so React.memo detects the change and re-renders the TreeItem.
  if (prev && prev._d === node._d && prev._r === node._r && prev.n === node.n && prev.t === node.t && prev.k === node.k && prev.m === node.m) {
    assignNode(prev, node);
    return prev;
  }

  const cacheNode = new PlainNode(node.i);
  assignNode(cacheNode, node);
  nodeMap.set(node.i, cacheNode);
  return cacheNode;
};

export const flattenNode = (node: PlainNode, isCollapsed: (node: PlainNode) => boolean, isHide: (node: PlainNode) => boolean, withDeepReWrite = true) => {
  const list: PlainNode[] = [];

  const stack = [node];

  while (stack.length) {
    const currentNode = stack.pop();

    if (!currentNode) continue;

    const currentIsHide = isHide(currentNode);

    if (!currentIsHide) list.push(getCacheNode(currentNode));

    const _d = currentIsHide && withDeepReWrite ? (getParentIsNotHide(currentNode, isHide)?._d ?? -1) : currentNode._d;

    // let pre: PlainNode | null = null;

    if (currentNode.c && !isCollapsed(currentNode)) {
      for (let i = currentNode.c.length - 1; i >= 0; i--) {
        const childNode = currentNode.c[i];

        if (withDeepReWrite) childNode._d = _d! + 1;

        stack.push(childNode);
      }
      for (let i = 0; i < currentNode.c.length; i++) {
        const childNode = currentNode.c[i];

        // link parent
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

// --- Weight-based tree indexing (React DevTools pattern) ---
// Each node gets a `_w` (weight) = number of visible nodes in its subtree (including itself).
// This enables O(depth) row lookups without materializing a flat array.

type IsCollapsed = (node: PlainNode) => boolean;
type IsHide = (node: PlainNode) => boolean;

// idMap is rebuilt on each computeWeights call, providing O(1) id->node lookup
const idMap = new Map<string | number, PlainNode>();

// Snapshot of the isCollapsed/isHide used during the last computeWeights call.
// getElementAtIndex/getIndexOfElement reuse these to guarantee consistency
// between the stored _w values and the walk logic.
let _lastIsCollapsed: IsCollapsed = () => false;
let _lastIsHide: IsHide = () => false;
let _lastRoots: PlainNode[] = [];

/**
 * Compute visible weight for every node in the tree and populate the id lookup map.
 * Also rewrites `_d` (display depth) and `r` (parent link) for hidden-node depth collapsing.
 * Returns the total visible weight across all roots.
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

  // Store a snapshot of the roots array (not a reference to the reactive proxy)
  // so getElementAtIndex/getIndexOfElement always walk the same tree that was weighted.
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
 * Get the PlainNode at the given visible row index.
 * Reuses the isCollapsed/isHide from the last computeWeights call
 * to guarantee consistency with stored _w values.
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
 * Reuses the isCollapsed/isHide from the last computeWeights call.
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

/**
 * Get a node by its id from the cached map (populated by computeWeights).
 */
export function getNodeById(id: string | number): PlainNode | null {
  return idMap.get(id) || null;
}

/**
 * Collect all visible nodes as a flat list. Used by search which needs
 * the full list to find matches by name. This is intentionally lazy —
 * only called on search submit, not on every tree update.
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

// --- Incremental tree patching ---

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

let fullMap: Map<string, PlainNode> | null = null;

type ApplyOpResult = { applied: boolean; modified: boolean };

const tryApplyTreeOp = (roots: Tree[], op: TreeOp): ApplyOpResult => {
  if (!fullMap) return { applied: false, modified: false };

  switch (op.op) {
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

      fullMap.delete(op.id);
      return { applied: true, modified: true };
    }

    case TreeOpType.UPDATE_META: {
      const node = fullMap.get(op.id);
      if (!node) return { applied: false, modified: false };

      if (op.n !== undefined) node.n = op.n;
      if (op.t !== undefined) node.t = op.t;
      if (op.k !== undefined) node.k = op.k;
      if (op.m !== undefined) node.m = op.m;
      return { applied: true, modified: true };
    }

    case TreeOpType.MOVE: {
      const node = fullMap.get(op.id);
      if (!node) return { applied: false, modified: false };
      if (!fullMap.has(op.parentId)) return { applied: false, modified: false };

      const parent = fullMap.get(op.parentId)!;
      if (!parent.c) parent.c = [];

      const targetIdx = op.afterId ? parent.c.findIndex((c) => c.i === op.afterId) + 1 : 0;
      if (op.afterId && targetIdx === 0) return { applied: false, modified: false };

      const currentParent = node.r;
      const currentIdx = currentParent?.c ? currentParent.c.indexOf(node) : roots.findIndex((r) => r.i === op.id);
      const alreadyInPlace = currentParent === parent && currentIdx === targetIdx;
      if (alreadyInPlace) return { applied: true, modified: false };

      if (node.r?.c) {
        const idx = node.r.c.indexOf(node);
        if (idx !== -1) node.r.c.splice(idx, 1);
      } else {
        const rootIdx = roots.findIndex((r) => r.i === op.id);
        if (rootIdx !== -1) roots.splice(rootIdx, 1);
      }

      if (op.afterId) {
        const afterIdx = parent.c.findIndex((c) => c.i === op.afterId);
        if (afterIdx === -1) return { applied: false, modified: false };
        parent.c.splice(afterIdx + 1, 0, node);
      } else {
        parent.c.unshift(node);
      }

      node.r = parent;
      return { applied: true, modified: true };
    }

    default:
      return { applied: true, modified: false };
  }
};

/**
 * Apply incremental tree operations in place.
 * Ops may arrive out of order within a batch (e.g. child before parent).
 * Retries deferred ops until the queue is empty or makes no progress.
 * Returns true if any modification was made.
 */
export function applyTreeOperations(roots: Tree[], ops: TreeOp[]): boolean {
  if (ops.length === 0) return false;

  fullMap = buildFullIdMap(roots);
  let modified = false;
  const allPending = ops.slice();

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
      console.log("pending node not remove", pendingRemove.slice(0));
      break;
    }

    pendingRemove = queue;
  }

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
      console.log("pending node not applied", pending.slice(0));
      break;
    }

    pending = queue;
  }

  return modified;
}
