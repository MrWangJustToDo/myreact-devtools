import { PlainNode } from "@my-react-devtool/core";

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
  let cacheNode = nodeMap.get(node.i);

  if (!cacheNode) {
    cacheNode = new PlainNode(node.i);

    nodeMap.set(node.i, cacheNode);
  }

  assignNode(cacheNode, node);

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
        // link siblings
        // childNode.l = null;
        // if (pre && !currentIsHide) {
        //   if (!currentIsHide && !isHide(childNode)) {
        //     pre.l = childNode;
        //   } else {
        //     pre.l = null;
        //   }
        // }

        // pre = childNode;
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
