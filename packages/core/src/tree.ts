import { PlainNode } from "./plain";
import { getFiberContent, getFiberName } from "./utils";

import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const store = new Map<string, MyReactFiberNode>();

const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  plain.name = getFiberName(fiber as MyReactFiberNodeDev);

  plain.content = getFiberContent(fiber);

  plain.key = fiber.key;

  plain.type = fiber.type;

  // plain.ref = safeCloneRef(fiber.ref);

  // plain.props = safeClone(fiber.pendingProps);
};

const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): PlainNode | null => {
  if (!fiber) return null;

  const exist = treeMap.get(fiber);

  if (exist) return exist;

  const current = new PlainNode();

  if (parent) {
    parent.children = parent.children || [];

    parent.children.push(current);

    current.deep = parent.deep! + 1;
  } else {
    current.deep = 0;
  }

  assignFiber(current, fiber);

  treeMap.set(fiber, current);

  store.set(current.uuid, fiber);

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
    store.delete(plain.uuid);
  }
  treeMap.delete(fiber);
};
