import { PlainNode } from "./plain";
// import { safeClone, safeCloneRef } from "./utils";

import type { CustomRenderDispatch, MyReactFiberNode} from "@my-react/react-reconciler";

const map = new Map();

let id = 0;

const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  plain.elementType = fiber.elementType.toString();

  plain.key = fiber.key;

  plain.type = fiber.type;

  // plain.ref = safeCloneRef(fiber.ref);

  // plain.props = safeClone(fiber.pendingProps);
}

const loopFiber = (fiber: MyReactFiberNode, parent?: PlainNode, previous?: PlainNode): PlainNode | null => {

  if (!fiber) return null;

  const current = new PlainNode();

  current.uuid = `${id++}--fiber`;

  current.parent = parent;

  parent.child = parent.child || current;

  previous && (previous.sibling = current);

  assignFiber(current, fiber);

  map.set(current.uuid, fiber);

  if (fiber.child) {
    loopFiber(fiber.child, current);
  }

  if (fiber.sibling) {
    loopFiber(fiber.sibling, parent, current);
  }

  return current;
}

export const generateFiberTreeToPlainTree = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootPlain = loopFiber(rootFiber);

  return rootPlain;
};
