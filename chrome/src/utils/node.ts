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

export function getLastChild(nodes: PlainNode[], node: PlainNode): PlainNode {
  const stack = [node];

  let item: PlainNode | undefined;

  let last = node;

  while ((item = stack.pop()) != null) {
    last = item;
    if (item && item.children && item.children.length > 0) {
      let index = item.children.length - 1;
      while (index >= 0 && !nodes.some((i) => i.id === item!.children[index]?.id)) {
        index--;
      }
      index >= 0 && stack.push(item.children[index]);
    }
  }

  return last;
}
