import { TreeNode } from "./node";

import type { PlainNode } from "@my-react-devtool/core";

export function flattenTree(node: PlainNode): TreeNode[] {
  const list: TreeNode[] = [];

  const temp: Record<string, boolean> = {};

  function collect(node: PlainNode, parents?: TreeNode[]) {
    if (!temp[node.id]) {
      temp[node.id] = true;

      const tree = new TreeNode(node);

      list.push(tree);

      tree.parents = parents;

      if (node.children) {
        node.children.forEach((child) => {
          collect(child, [...(parents || []), tree]);
        });
      }
    }
  }

  collect(node);

  return list;
}

export const flattenNode = (node: PlainNode[]): TreeNode[] => {
  const re: TreeNode[] = [];
  node.forEach((n) => {
    re.push(...flattenTree(n));
  });
  return re;
};
