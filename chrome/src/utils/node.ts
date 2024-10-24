import type { PlainNode } from "@my-react-devtool/core";

export const checkHasInclude = (node: PlainNode, typeArray: number[]) => {
  return typeArray.some((i) => node?.t & i);
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
    if (currentNode.c && !isCollapsed(currentNode)) {
      for (let i = currentNode.c.length - 1; i >= 0; i--) {
        stack.push(currentNode.c[i]);
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
      index >= 0 && stack.push(item.c[index]);
    }
  }

  return last;
}
