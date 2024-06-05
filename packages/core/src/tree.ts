import { PlainNode } from "./plain";
import { getFiberName, getFiberSource, getFiberTag, getRenderTree, getFiberType, getHookTree } from "./utils";

import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const store = new Map<string, MyReactFiberNode>();

const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  plain.name = getFiberName(fiber as MyReactFiberNodeDev);

  plain.tag = getFiberTag(fiber as MyReactFiberNodeDev);

  plain.source = getFiberSource(fiber as MyReactFiberNodeDev);

  plain.renderTree = getRenderTree(fiber as MyReactFiberNodeDev);

  plain.fiberType = getFiberType(fiber as MyReactFiberNodeDev);

  plain.hookTree = getHookTree(fiber as MyReactFiberNodeDev);

  plain.key = fiber.key;

  plain.type = fiber.type;

  // plain.ref = safeCloneRef(fiber.ref);

  // plain.props = safeClone(fiber.pendingProps);
};

const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): PlainNode | null => {
  if (!fiber) return null;

  const exist = treeMap.get(fiber);

  const current = exist || new PlainNode();

  current.children = null;

  if (parent) {
    parent.children = parent.children || [];

    parent.children.push(current);

    current.deep = parent.deep! + 1;
  } else {
    current.deep = 0;
  }

  if (!exist) {
    assignFiber(current, fiber);

    treeMap.set(fiber, current);

    store.set(current.id, fiber);
  }

  if (fiber.child) {
    loopTree(fiber.child, current);
  }

  if (fiber.sibling) {
    loopTree(fiber.sibling, parent);
  }

  return current;
};

export const generateFiberTreeToPlainTree = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootPlain = loopTree(rootFiber);

  return rootPlain;
};

export const unmountPlainNode = (fiber: MyReactFiberNode) => {
  const plain = treeMap.get(fiber);
  if (plain) {
    store.delete(plain.id);
  }
  treeMap.delete(fiber);
};

export const getPlainNodeByFiber = (fiber: MyReactFiberNode) => {
  return treeMap.get(fiber);
};
