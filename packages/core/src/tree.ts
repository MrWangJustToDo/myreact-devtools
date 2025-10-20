/* eslint-disable max-lines */
import { include, STATE_TYPE, UpdateQueueType, type ListTree } from "@my-react/react-shared";

import { getValueById } from "./data";
import { PlainNode } from "./plain";
import { NODE_TYPE } from "./type";
import { getFiberName, getFiberType, getHook, getProps, getSource, getState, getTree } from "./utils";

import type { DevToolCore } from "./instance";
import type { Action, MyReactComponent, Reducer } from "@my-react/react";
import type { MyReactFiberNodeDev, CustomRenderDispatch, MyReactFiberNode, MyReactFiberContainer, UpdateState, MyReactFiberRoot } from "@my-react/react-reconciler";

const treeMap = new Map<MyReactFiberNode, PlainNode>();

const detailMap = new Map<MyReactFiberNode, PlainNode>();

const fiberStore = new Map<string, MyReactFiberNode>();

const domToFiber = new WeakMap<HTMLElement, MyReactFiberNode>();

const plainStore = new Map<string, PlainNode>();

const directory: Record<string, string> = {};

const linkStateToHookIndex = new WeakMap<UpdateState, Array<number | string>>();

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

export const generateTreeMap = (dispatch: CustomRenderDispatch) => {
  const rootFiber = dispatch.rootFiber;

  const rootNode = loopTree(rootFiber);

  return rootNode;
};

export type Tree = ReturnType<typeof generateTreeMap>["current"];

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

export const getFiberNodeById = (id: string) => {
  return fiberStore.get(id);
};

export const getDispatchFromFiber = (fiber?: MyReactFiberNode) => {
  if (!fiber) return;

  const typedFiber = fiber as MyReactFiberRoot;

  if (typedFiber.renderDispatch) {
    return typedFiber.renderDispatch;
  }

  return getDispatchFromFiber(fiber.parent);
};

const editorReducer: Reducer = (state?: unknown, action?: Action) => {
  return typeof action === "function" ? action(state) : action;
};

const updateFiberByHook = (
  fiber: MyReactFiberNode,
  params: {
    id: string | number;
    oldVal: any;
    newVal: any;
    hookIndex?: number | string;
    path: string;
    rootId?: string | number;
    parentId?: string | number;
    type?: string;
  }
) => {
  if (typeof params.hookIndex !== "number") return "params not valid";

  const hookNode = fiber.hookList?.toArray?.()?.[params.hookIndex];

  if (!hookNode) return "hook not found";

  const nodeId = Number(params.id);

  const parentId = Number(params.parentId);

  const rootId = Number(params.rootId);

  const currentData = getValueById(nodeId);

  const parentData = getValueById(parentId);

  const rootData = getValueById(rootId);

  if (!currentData.f) return "current hook state not exist";

  const currentDataType = typeof currentData.v;

  if (!parentData.f && currentDataType !== "boolean" && currentDataType !== "number" && currentDataType !== "string")
    return "current hook state is not primitive";

  const newVal =
    currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;

  // 更新成功
  if (!parentData.f) {
    const hookInstance = hookNode as any;
    // oldVersion, not full support
    if (hookInstance._dispatch) {
      hookInstance._dispatch(newVal);
    } else {
      hookInstance._update({ payLoad: () => newVal, reducer: editorReducer, isForce: true });
    }

    return;
  }

  if (parentData.f && !rootData.f) {
    return "root hook state not exist";
  }

  // const parentDataValue = parentData.v;

  // shallow update
  if (parentData.v === rootData.v) {
    const newPayLoad = Object.assign({}, rootData.v);

    newPayLoad[params.path] = newVal;

    const hookInstance = hookNode as any;

    if (hookInstance._dispatch) {
      hookInstance._update({ isForce: true });
    } else {
      hookInstance._update({ payLoad: () => newPayLoad, reducer: editorReducer, isForce: true });
    }
  } else {
    // deep update
    const newPayLoad = Object.assign({}, rootData.v);

    parentData.v[params.path] = newVal;

    const hookInstance = hookNode as any;

    if (hookInstance._dispatch) {
      hookInstance._update({ isForce: true });
    } else {
      hookInstance._update({ payLoad: () => newPayLoad, reducer: editorReducer, isForce: true });
    }
  }
};

const updateFiberByProps = (
  fiber: MyReactFiberNode,
  params: {
    id: string | number;
    oldVal: any;
    newVal: any;
    hookIndex?: number | string;
    path: string;
    rootId?: string | number;
    parentId?: string | number;
    type?: string;
  }
) => {
  const nodeId = Number(params.id);

  const parentId = Number(params.parentId);

  const currentData = getValueById(nodeId);

  const parentData = getValueById(parentId);

  if (!currentData.f) return "current props not exist";

  const currentDataType = typeof currentData.v;

  const newVal =
    currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;

  // deep props update
  if (parentData.f) {
    const newProps = Object.assign({}, fiber.pendingProps);

    parentData.v[params.path] = newVal;

    fiber.pendingProps = newProps;

    fiber._update(STATE_TYPE.__triggerSyncForce__);
  } else {
    // shallow props update
    const newProps = Object.assign({}, fiber.pendingProps);

    newProps[params.path] = newVal;

    fiber.pendingProps = newProps;

    fiber._update(STATE_TYPE.__triggerSyncForce__);
  }
};

const updateFiberByState = (
  fiber: MyReactFiberNode,
  params: {
    id: string | number;
    oldVal: any;
    newVal: any;
    hookIndex?: number | string;
    path: string;
    rootId?: string | number;
    parentId?: string | number;
    type?: string;
  }
) => {
  const nodeId = Number(params.id);

  const parentId = Number(params.parentId);

  const currentData = getValueById(nodeId);

  const parentData = getValueById(parentId);

  if (!currentData.f) return "current state not exist";

  const currentDataType = typeof currentData.v;

  const newVal =
    currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;

  // deep state update
  if (parentData.f) {
    const typedInstance = fiber.instance as MyReactComponent;

    const newState = Object.assign({}, typedInstance.state);

    parentData.v[params.path] = newVal;

    typedInstance.setState(newState);
  } else {
    // shallow state update
    const typedInstance = fiber.instance as MyReactComponent;

    const newState = Object.assign({}, typedInstance.state);

    newState[params.path] = newVal;

    typedInstance.setState(newState);
  }
};

export const updateFiberNode = (
  fiber: MyReactFiberNode,
  params: {
    id: string | number;
    oldVal: any;
    newVal: any;
    hookIndex?: number | string;
    path: string;
    rootId?: string | number;
    parentId?: string | number;
    type?: string;
  }
): string => {
  try {
    if (params.type === "state") {
      return updateFiberByState(fiber, params);
    }
    if (params.type === "hook") {
      return updateFiberByHook(fiber, params);
    }
    if (params.type === "props") {
      return updateFiberByProps(fiber, params);
    }
    return "type not valid";
  } catch (e) {
    return e.message;
  }
};

export const tryLinkStateToHookIndex = (fiber: MyReactFiberNode, state: UpdateState) => {
  if (state.needUpdate && state.nodes) {
    // filter all hook update queue
    const nodes = state.nodes?.filter?.((node) => node.type === UpdateQueueType.hook);
    // get all the keys from the nodes;
    const allHooksArray = fiber.hookList?.toArray?.() || [];

    const keys = nodes?.map?.((node) => allHooksArray?.findIndex?.((_node) => node?.trigger === _node))?.filter((i) => i !== -1) || [];
    // link the keys to the state
    linkStateToHookIndex.set(state, keys);
  }
};

export const getHookIndexFromState = (state: UpdateState) => {
  return linkStateToHookIndex.get(state);
};

export const deleteLinkState = (state: UpdateState) => {
  linkStateToHookIndex.delete(state);
}
