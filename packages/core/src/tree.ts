import { PlainNode } from "./plain";
import { getFiberName, getHook, getObj, getSource, getTree, parseHook, parseObj } from "./utils";

import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const detailMap = new Map<MyReactFiberNode, PlainNode>();

const fiberStore = new Map<string, MyReactFiberNode>();

const plainStore = new Map<string, PlainNode>();

export const shallowAssignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  plain.key = fiber.key;

  plain.type = fiber.type;

  plain.name = getFiberName(fiber as MyReactFiberNodeDev);

  // plain.source = getFiberSource(fiber as MyReactFiberNodeDev);

  // plain.renderTree = getRenderTree(fiber as MyReactFiberNodeDev);

  // plain.fiberType = getFiberType(fiber as MyReactFiberNodeDev);

  // plain.hookTree = getHookTree(fiber as MyReactFiberNodeDev);

  // plain.ref = safeCloneRef(fiber.ref);

  // plain.props = safeClone(fiber.pendingProps);
};

export const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  shallowAssignFiber(plain, fiber);

  plain.source = getSource(fiber as MyReactFiberNodeDev);

  plain.hook = getHook(fiber as MyReactFiberNodeDev);

  plain.props = getObj(fiber.pendingProps);

  plain.tree = getTree(fiber as MyReactFiberNodeDev);
};

export const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): PlainNode | null => {
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
    shallowAssignFiber(current, fiber);

    treeMap.set(fiber, current);

    fiberStore.set(current.id, fiber);

    plainStore.set(current.id, current);
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
    fiberStore.delete(plain.id);

    plainStore.delete(plain.id);
  }

  treeMap.delete(fiber);

  detailMap.delete(fiber);
};

export const getPlainNodeByFiber = (fiber: MyReactFiberNode) => {
  return treeMap.get(fiber);
};

export const getDetailNodeByFiber = (fiber: MyReactFiberNode) => {
  const plainNode = getPlainNodeByFiber(fiber);

  if (!plainNode) {
    throw new Error("plainNode not found, look like a @my-react/devtools bug");
  }

  const exist = detailMap.get(fiber);

  if (exist) {
    assignFiber(exist, fiber);

    return exist;
  } else {
    const created = new PlainNode(plainNode.id);

    assignFiber(created, fiber);

    detailMap.set(fiber, created);

    return created;
  }
};

export const getDetailNodeById = (id: string) => {
  const fiber = fiberStore.get(id);

  if (fiber) {
    return getDetailNodeByFiber(fiber);
  }
};

export const parseDetailNode = (plain: PlainNode) => {
  plain.hook = parseHook(plain);

  plain.props = parseObj(plain);

  return plain;
};
