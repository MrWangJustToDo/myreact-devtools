import type { PlainNode } from "@my-react-devtool/core";

export const checkHasInclude = (node: PlainNode, typeArray: number[]) => {
  return typeArray.some((i) => node?.type & i);
};

export const flattenNode = (node: PlainNode, isCollapsed: (node: PlainNode) => boolean, isHide: (node: PlainNode) => boolean) => {
  const list: PlainNode[] = [];
  const stack = [node];
  while (stack.length) {
    const currentNode = stack.pop();
    if (!currentNode) continue;
    if (!isHide(currentNode)) {
      list.push(currentNode);
    }
    if (currentNode.children && !isCollapsed(currentNode)) {
      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        stack.push(currentNode.children[i]);
      }
    }
  }
  return list;
};

