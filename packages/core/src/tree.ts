import { PlainNode } from "./plain";
import { getFiberName } from "./utils";

import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

const map = new Map<MyReactFiberNode, PlainNode>();

const store = new Map<string, MyReactFiberNode>();

const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  plain.name = getFiberName(fiber as MyReactFiberNodeDev);

  plain.key = fiber.key;

  plain.type = fiber.type;

  // plain.ref = safeCloneRef(fiber.ref);

  // plain.props = safeClone(fiber.pendingProps);
};

const loopFiber = (fiber: MyReactFiberNode, parent?: PlainNode, previous?: PlainNode): PlainNode | null => {
  if (!fiber) return null;

  const exist = map.get(fiber);

  const current = exist || new PlainNode();

  if (parent) {
    parent.child = parent.child || current;

    parent.children = parent.children || [];

    parent.children.push(current);
  }

  if (previous) {
    previous.sibling = current;
  }

  assignFiber(current, fiber);

  map.set(fiber, current);

  store.set(current.uuid, fiber);

  if (fiber.child) {
    loopFiber(fiber.child, current);
  }

  if (fiber.sibling) {
    loopFiber(fiber.sibling, parent, current);
  }

  return current;
};

export const generateFiberTreeToPlainTree = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootPlain = loopFiber(rootFiber);

  return rootPlain;
};

export const unmountPlainNode = (fiber: MyReactFiberNode) => {
  const plain = map.get(fiber);
  if (plain) {
    plain.child = null;
    plain.sibling = null;
    store.delete(plain.uuid);
  }
  map.delete(fiber);
};
