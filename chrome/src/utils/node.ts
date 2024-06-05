import type { PlainNode } from "@my-react-devtool/core";

export class TreeNode {
  parents?: TreeNode[];
  current: PlainNode;

  constructor(node: PlainNode) {
    this.current = node;
  }
}

export const currentHasSelect = (node: TreeNode, select: TreeNode | null) => {
  if (!select) return false;
  return node.parents?.some((i) => i.current.id === select.current.id);
};

export const currentHasClose = (node: TreeNode, close: TreeNode | null) => {
  if (!close) return false;
  return node.parents?.some((i) => i.current.id === close.current.id);
}

export const currentHasCloseList = (node: TreeNode, closeList: TreeNode[]) => {
  return closeList.some((i) => currentHasClose(node, i));
}

export const checkHasInclude = (node: TreeNode, typeArray: number[]) => {
  return typeArray.some((i) => node.current.type & i);
};
