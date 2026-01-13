import { STATE_TYPE } from "@my-react/react-shared";

import { getValueFromId } from "../data";

import type { Action, MyReactComponent, Reducer } from "@my-react/react/type";
import type { MyReactFiberNode } from "@my-react/react-reconciler";


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

  const currentData = getValueFromId(nodeId);

  const parentData = getValueFromId(parentId);

  const rootData = getValueFromId(rootId);

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

  const currentData = getValueFromId(nodeId);

  const parentData = getValueFromId(parentId);

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

  const currentData = getValueFromId(nodeId);

  const parentData = getValueFromId(parentId);

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
