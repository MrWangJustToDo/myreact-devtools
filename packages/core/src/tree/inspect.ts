import { include, STATE_TYPE } from "@my-react/react-shared";

import { getFiberName, getFiberType, getProps, getSource, getState, getTree, NODE_TYPE } from "../fiber";
import { getHook } from "../hook";

import { PlainNode } from "./instance";

import type { DevToolCore } from "../instance";
import type {
  CustomRenderDispatch,
  MyReactFiberContainer,
  MyReactFiberNode,
  MyReactFiberNodeDev,
  MyReactFiberRoot,
} from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

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

  if (hasCompiler) {
    plain.m = true;
  }

  plain.n = directory[name];
};

export const assignFiber = (plain: PlainNode, fiber: MyReactFiberNode) => {
  shallowAssignFiber(plain, fiber);

  plain.p = getProps(fiber as MyReactFiberNodeDev);

  plain._s = getSource(fiber as MyReactFiberNodeDev);

  plain._t = getTree(fiber as MyReactFiberNodeDev);

  plain._h = getHook(fiber as MyReactFiberNodeDev);

  if (fiber.type & NODE_TYPE.__class__) {
    plain.s = getState(fiber as MyReactFiberNodeDev);
  }
};

// TODO improve performance
export const loopTree = (fiber: MyReactFiberNode, parent?: PlainNode): { current: PlainNode; directory: Record<string, string> } | null => {
  if (!fiber) return null;

  if (include(fiber.state, STATE_TYPE.__unmount__)) return null;

  const exist = treeMap.get(fiber);

  const current = exist || new PlainNode();

  current.c = null;

  if (parent) {
    parent.c = parent.c || [];

    parent.c.push(current);

    current.d = parent.d! + 1;
  } else {
    current.d = 0;
  }

  current._d = current.d;

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

  if (include(fiber.state, STATE_TYPE.__unmount__)) return null;

  set.add(fiber);

  const exist = treeMap.get(fiber);

  // TODO throw a error?
  if (!exist && !parent) return null;

  const current = exist || new PlainNode();

  current.c = null;

  if (parent) {
    parent.c = parent.c || [];

    parent.c.push(current);

    current.d = parent.d! + 1;
  }

  current._d = current.d;

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

export type Tree = ReturnType<typeof inspectDispatch>["current"];

export const unmountPlainNode = (_fiber: MyReactFiberNode, _runtime: DevToolCore) => {
  if (!_fiber) return;

  const plain = treeMap.get(_fiber);

  if (plain) {
    _runtime.notifyUnmountNode(plain.i);

    fiberStore.delete(plain.i);

    plainStore.delete(plain.i);

    delete _runtime._hmr[plain.i];

    delete _runtime._warn[plain.i];

    delete _runtime._error[plain.i];

    delete _runtime._state[plain.i];

    delete _runtime._trigger[plain.i];
  }

  treeMap.delete(_fiber);

  detailMap.delete(_fiber);
};

export const initPlainNode = (_fiber: MyReactFiberNode, _runtime: DevToolCore) => {
  if (!_fiber) return;

  const plain = treeMap.get(_fiber);

  if (!plain) {
    const newPlain = new PlainNode();

    treeMap.set(_fiber, newPlain);

    fiberStore.set(newPlain.i, _fiber);

    plainStore.set(newPlain.i, newPlain);
  }
};

export const getPlainNodeByFiber = (fiber: MyReactFiberNode) => {
  return treeMap.get(fiber);
};

export const getPlainNodeIdByFiber = (fiber: MyReactFiberNode) => {
  const node = getPlainNodeByFiber(fiber);

  return node?.i;
};

export const getRootTreeByFiber = (fiber: MyReactFiberNode): null | PlainNode => {
  if (!fiber) return null;

  if (fiber.parent) {
    return getRootTreeByFiber(fiber.parent);
  } else {
    return getPlainNodeByFiber(fiber);
  }
};

export const inspectDispatch = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const map = loopTree(rootFiber);

  return map;
};

export const inspectList = (list: ListTree<MyReactFiberNode>) => {
  const hasViewList = new WeakSet<MyReactFiberNode>();

  const result: PlainNode[] = [];

  list.listToFoot((fiber) => {
    const loopFiber = fiber.parent || fiber;

    if (hasViewList.has(loopFiber)) return;

    hasViewList.add(loopFiber);

    const re = loopChangedTree(loopFiber, hasViewList);

    if (re && re.current) {
      result.push(re.current);
    }
  });

  return { result, directory };
};

export const inspectFiber = (fiber: MyReactFiberNode) => {
  const plainNode = getPlainNodeByFiber(fiber);

  if (!plainNode) {
    throw new Error("plainNode not found, look like a bug for @my-react/devtools");
  }

  const exist = detailMap.get(fiber);

  if (exist) {
    assignFiber(exist, fiber);

    return exist;
  } else {
    const created = new PlainNode(plainNode.i);

    assignFiber(created, fiber);

    detailMap.set(fiber, created);

    return created;
  }
};

export const getFiberByDom = (dom: HTMLElement) => {
  const fiber = domToFiber.get(dom);

  if (!fiber) {
    if (dom.parentElement) {
      return getFiberByDom(dom.parentElement as HTMLElement);
    } else {
      return null;
    }
  } else {
    return fiber;
  }
};

export const getComponentFiberByDom = (dom: HTMLElement) => {
  const fiber = getFiberByDom(dom);

  if (!fiber) return;

  let r = fiber;

  while (r) {
    if (include(r.type, NODE_TYPE.__class__) || include(r.type, NODE_TYPE.__function__)) {
      return r;
    }

    r = r.parent;
  }
};

export const getComponentFiberByFiber = (fiber: MyReactFiberNode) => {
  let r = fiber;

  while (r) {
    if (include(r.type, NODE_TYPE.__class__) || include(r.type, NODE_TYPE.__function__)) {
      return r;
    }

    r = r.parent;
  }
};

export const getElementNodesFromFiber = (fiber: MyReactFiberNode) => {
  const nodes: HTMLElement[] = [];

  const fibers = fiber ? [fiber] : [];

  while (fibers.length) {
    const c = fibers.shift();
    if (c.nativeNode) {
      nodes.push(c.nativeNode as HTMLElement);
    } else {
      let l = c.child;
      while (l) {
        fibers.push(l);
        l = l.sibling;
      }
    }
  }

  return nodes;
};

export const getDispatchFromFiber = (fiber?: MyReactFiberNode) => {
  if (!fiber) return;

  const typedFiber = fiber as MyReactFiberRoot;

  if (typedFiber.renderDispatch) {
    return typedFiber.renderDispatch;
  }

  return getDispatchFromFiber(fiber.parent);
};

export const getFiberNodeById = (id: string) => {
  return fiberStore.get(id);
};

export const getDirectoryIdByFiber = (fiber: MyReactFiberNode) => {
  const name = getFiberName(fiber as MyReactFiberNodeDev);

  return directory[name];
}
