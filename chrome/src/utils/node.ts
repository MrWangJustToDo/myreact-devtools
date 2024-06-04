import type { PlainNode } from "@my-react-devtool/core";

export class TreeNode {
  isOpen?: boolean;
  isSelect?: boolean;
  parents?: TreeNode[];
  current: PlainNode;

  constructor(node: PlainNode) {
    this.current = node;
    this.isOpen = true;
    this.isSelect = false;
  }
}

export const currentHasSelect = (node: TreeNode, select: TreeNode | null) => {
  if (!select) return false;
  return node.current.id === select.current.id || node.parents?.some((i) => i.current.id === select.current.id);
};

export const checkHasInclude = (node: TreeNode, typeArray: number[]) => {
  return typeArray.some((i) => node.current.type & i);
};
