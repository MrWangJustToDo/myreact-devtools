import { PlainNode } from "./plain";
import { NODE_TYPE } from "./type";
import { getFiberName, getHook, getObj, getSource, getTree, parseHook, parseProps, parseState } from "./utils";

import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const detailMap = new Map<MyReactFiberNode, PlainNode>();

const fiberStore = new Map<string, MyReactFiberNode>();

const plainStore = new Map<string, PlainNode>();

const directory: Record<string, string> = {};

let count = 0;

export const shallowAssignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  const hasKey = fiber.key !== null && fiber.key !== undefined;

  if (hasKey && !directory[fiber.key]) {
    directory[fiber.key] = ++count + "";
  }

  const name = getFiberName(fiber as MyReactFiberNodeDev);

  if (!directory[name]) {
    directory[name] = ++count + "";
  }

  plain.key = hasKey ? directory[fiber.key] : undefined;

  plain.type = fiber.type;

  plain.name = directory[name];
};

export const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  shallowAssignFiber(plain, fiber);

  plain.source = getSource(fiber as MyReactFiberNodeDev);

  plain.hook = getHook(fiber as MyReactFiberNodeDev);

  // plain.hook_v2 = getHook_v2(fiber as MyReactFiberNodeDev);

  plain.props = getObj(fiber.pendingProps);

  plain.tree = getTree(fiber as MyReactFiberNodeDev);

  if (fiber.type & NODE_TYPE.__class__) {
    plain.state = getObj(fiber.pendingState);
  }
};

// TODO improve performance
export const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): { current: PlainNode; directory: Record<string, string> } | null => {
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

  return { current, directory };
};

export const generateTreeMap = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootNode = loopTree(rootFiber);

  return rootNode;
};

export type Tree = ReturnType<typeof generateTreeMap>["current"];

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

export const getPlainNodeIdByFiber = (fiber: MyReactFiberNode) => {
  const node = getPlainNodeByFiber(fiber);
  return node?.id;
};

export const getDetailNodeByFiber = (fiber: MyReactFiberNode) => {
  const plainNode = getPlainNodeByFiber(fiber);

  if (!plainNode) {
    throw new Error("plainNode not found, look like a bug for @my-react/devtools");
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
    if (__DEV__) {
      console.log("[@my-react-devtool/core] current select fiber", fiber);
    }

    return getDetailNodeByFiber(fiber);
  }
};

export const parseDetailNode = (plain: PlainNode) => {
  plain.hook = parseHook(plain);

  plain.props = parseProps(plain);

  if (plain.state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plain.state = parseState(plain);
  }

  return plain;
};
