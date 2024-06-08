import type { PlainNode } from "@my-react-devtool/core";

export class TreeNode {
  id: string;
  current: PlainNode;
  parent?: TreeNode;

  constructor(node: PlainNode) {
    this.id = node.id;
    this.current = node;
  }
}

export const currentHasSelect = (node: TreeNode, select: TreeNode | null): boolean => {
  if (!select) return false;
  if (node.id === select.id) return true;
  return node.parent ? currentHasSelect(node.parent, select) : false;
};

export const currentHasClose = (node: TreeNode, close: TreeNode | null): boolean => {
  if (!close) return false;
  if (node.id === close.id) return true;
  return node.parent ? currentHasClose(node.parent, close) : false;
};

export const currentHasInCloseList = (node: TreeNode, closeList: TreeNode[]) => {
  return closeList.some((i) => currentHasClose(node, i));
};

export const checkHasInclude = (node: TreeNode, typeArray: number[]) => {
  return typeArray.some((i) => node.current.type & i);
};
