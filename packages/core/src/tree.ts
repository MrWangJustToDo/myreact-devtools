import { include, type ListTree } from "@my-react/react-shared";

import { PlainNode } from "./plain";
import { NODE_TYPE } from "./type";
import { getFiberName, getFiberType, getHook, getProps, getSource, getState, getTree } from "./utils";

import type { DevToolCore } from "./instance";
import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode, MyReactFiberContainer } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const detailMap = new Map<MyReactFiberNode, PlainNode>();

const fiberStore = new Map<string, MyReactFiberNode>();

const domToFiber = new WeakMap<HTMLElement, MyReactFiberNode>();

const plainStore = new Map<string, PlainNode>();

const directory: Record<string, string> = {};

let count = 0;

export const shallowAssignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  const hasKey = fiber.key !== null && fiber.key !== undefined;

  if (fiber.nativeNode) {
    domToFiber.set(fiber.nativeNode as HTMLElement, fiber);
  }

  const typedContainerFiber = fiber as MyReactFiberContainer;

  if (typedContainerFiber.containerNode) {
    domToFiber.set(typedContainerFiber.containerNode as HTMLElement, fiber);
  }

  if (hasKey && !directory[fiber.key]) {
    directory[fiber.key] = ++count + "";
  }

  const name = getFiberName(fiber as MyReactFiberNodeDev);

  if (!directory[name]) {
    directory[name] = ++count + "";
  }

  plain.k = hasKey ? directory[fiber.key] : undefined;

  const { t, hasCompiler } = getFiberType(fiber);

  plain.t = t;

  hasCompiler && (plain.m = true);

  plain.n = directory[name];
};

export const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode, force: boolean) => {
  shallowAssignFiber(plain, fiber);

  plain.p = getProps(fiber as MyReactFiberNodeDev, force);

  plain._s = getSource(fiber as MyReactFiberNodeDev);

  plain._t = getTree(fiber as MyReactFiberNodeDev);

  plain._h = getHook(fiber as MyReactFiberNodeDev, force);

  if (fiber.type & NODE_TYPE.__class__) {
    plain.s = getState(fiber as MyReactFiberNodeDev, force);
  }
};

// TODO improve performance
export const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): { current: PlainNode; directory: Record<string, string> } | null => {
  if (!fiber) return null;

  const exist = treeMap.get(fiber);

  const current = exist || new PlainNode();

  current.c = null;

  if (parent) {
    parent.c = parent.c || [];

    parent.c.push(current);

    current._d = parent._d! + 1;
  } else {
    current._d = 0;
  }

  shallowAssignFiber(current, fiber);

  if (!exist) {
    treeMap.set(fiber, current);

    fiberStore.set(current.i, fiber);

    plainStore.set(current.i, current);
  }

  if (fiber.child) {
    loopTree(fiber.child, current);
  }

  if (fiber.sibling) {
    loopTree(fiber.sibling, parent);
  }

  return { current, directory };
};

export const loopChangedTree = (
  fiber: MyReactFiberNode,
  set: WeakSet<MyReactFiberNode>,
  parent?: PlainNode
): { current: PlainNode; directory: Record<string, string> } | null => {
  if (!fiber) return null;

  set.add(fiber);

  const exist = treeMap.get(fiber);

  // TODO throw a error?
  if (!exist && !parent) return null;

  const current = exist || new PlainNode();

  current.c = null;

  if (parent) {
    parent.c = parent.c || [];

    parent.c.push(current);

    current._d = parent._d! + 1;
  }

  shallowAssignFiber(current, fiber);

  if (!exist) {
    treeMap.set(fiber, current);

    fiberStore.set(current.i, fiber);

    plainStore.set(current.i, current);
  }

  if (fiber.child) {
    loopChangedTree(fiber.child, set, current);
  }

  if (fiber.sibling) {
    loopChangedTree(fiber.sibling, set, parent);
  }

  return { current, directory };
};

export const generateTreeMap = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootNode = loopTree(rootFiber);

  return rootNode;
};

export type Tree = ReturnType<typeof generateTreeMap>["current"];

export const unmountPlainNode = (fiber: MyReactFiberNode, runtime: DevToolCore) => {
  const plain = treeMap.get(fiber);

  if (plain) {
    if (plain.i === runtime._selectId) {
      runtime.notifyUnSelect();
    }

    fiberStore.delete(plain.i);

    plainStore.delete(plain.i);
  }

  treeMap.delete(fiber);

  detailMap.delete(fiber);
};

export const getPlainNodeByFiber = (fiber: MyReactFiberNode) => {
  return treeMap.get(fiber);
};

export const getPlainNodeIdByFiber = (fiber: MyReactFiberNode) => {
  const node = getPlainNodeByFiber(fiber);

  return node?.i;
};

export const getTreeByFiber = (fiber: MyReactFiberNode): null | PlainNode => {
  if (!fiber) return null;

  if (fiber.parent) {
    return getTreeByFiber(fiber.parent);
  } else {
    return getPlainNodeByFiber(fiber);
  }
};

export const getPlainNodeArrayByList = (list: ListTree<MyReactFiberNode>) => {
  const hasViewList = new WeakSet<MyReactFiberNode>();

  const result: PlainNode[] = [];

  list.listToFoot((fiber) => {
    if (hasViewList.has(fiber)) return;

    hasViewList.add(fiber);

    const re = loopChangedTree(fiber, hasViewList);

    if (re && re.current) {
      result.push(re.current);
    }
  });

  return { result, directory };
};

export const getDetailNodeByFiber = (fiber: MyReactFiberNode, force?: boolean) => {
  const plainNode = getPlainNodeByFiber(fiber);

  if (!plainNode) {
    throw new Error("plainNode not found, look like a bug for @my-react/devtools");
  }

  const exist = detailMap.get(fiber);

  if (exist) {
    assignFiber(exist, fiber, force);

    return exist;
  } else {
    const created = new PlainNode(plainNode.i);

    assignFiber(created, fiber, force);

    detailMap.set(fiber, created);

    return created;
  }
};

export const getComponentFiberByDom = (dom: HTMLElement) => {
  const fiber = domToFiber.get(dom);

  if (!fiber) return;

  let r = fiber;

  while (r) {
    if (include(r.type, NODE_TYPE.__class__) | include(r.type, NODE_TYPE.__function__)) {
      return r;
    }

    r = r.parent;
  }
};

export const getFiberNodeById = (id: string) => {
  return fiberStore.get(id);
};
