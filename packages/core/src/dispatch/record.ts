import { include, STATE_TYPE } from "@my-react/react-shared";

import { getNode } from "../data";
import { NODE_TYPE } from "../fiber";
import { getDirectoryIdByFiber, getPlainNodeByFiber, getPlainNodeIdByFiber } from "../tree";

import type { DevToolCore } from "../instance";
import type { DevToolRenderDispatch } from "../setup";
import type { MyReactFiberNode, MyReactFiberNodeDev, UpdateQueueDev } from "@my-react/react-reconciler";

type TreeItemType = {
  // id
  i: number | string;
  // name Id
  n: string;
  // start time
  s: number;
  // end time
  e: number;
  // rerun count
  r?: number;
  // duration time
  d: number;
  // children
  c: TreeItemType[];
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type StackItemType = DeepPartial<TreeItemType>;

const checkIsValidDispatchVersion = (dispatch: DevToolRenderDispatch) => {
  const version = dispatch.version?.split(".").map((v) => parseInt(v, 10)) || [];

  if (version.length !== 3) return false;

  if (version[1] < 3) return false;

  if (version[2] >= 21) return true;

  return false;
};

const checkIsComponent = (fiber: MyReactFiberNodeDev) => {
  return include(fiber.type, NODE_TYPE.__class__ | NODE_TYPE.__function__);
};

const checkIsConcurrent = (dispatch: DevToolRenderDispatch, list: MyReactFiberNode[]) => {
  return dispatch.enableConcurrentMode && list.every((f) => include(f.state, STATE_TYPE.__triggerConcurrent__ | STATE_TYPE.__triggerConcurrentForce__));
};

const getCurrent = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now()) * 1000;

const resetArray: Array<() => void> = [];

export const patchRecord = (dispatch: DevToolRenderDispatch, runtime: DevToolCore) => {
  if (!checkIsValidDispatchVersion(dispatch)) return;

  if (dispatch.mode !== "development") return;

  runtime._supportRecord = true;

  const stack: StackItemType[] = [];

  let map = {};

  let trigger: Array<{ n: string; i: string; updater: UpdateQueueDev[] }> = [];

  let mode = "legacy" as "legacy" | "concurrent";

  let id = "";

  let current: StackItemType | null = null;

  if (dispatch["$$hasDevToolRecord"]) return;

  dispatch["$$hasDevToolRecord"] = true;

  dispatch.onBeforeDispatchUpdate((_, list) => {
    if (!runtime._enableRecord) return;

    current = null;

    stack.length = 0;

    map = {};

    mode = checkIsConcurrent(dispatch, list) ? "concurrent" : "legacy";

    trigger = list.map((f) => {
      const plain = getPlainNodeByFiber(f);

      // next version of @my-react support _debugLatestUpdateQueue
      const updater = (f as any)._debugLatestUpdateQueue as MyReactFiberNodeDev["_debugUpdateQueue"] | null;

      return {
        n: plain ? plain.n : "",
        i: plain ? plain.i : "",
        updater: updater?.toArray() || [],
      };
    });

    id = dispatch.id;
  });

  dispatch.onBeforeFiberRun((fiber: MyReactFiberNodeDev) => {
    if (!runtime._enableRecord) return;

    if (!checkIsComponent(fiber)) return;

    const nodeId = getPlainNodeIdByFiber(fiber);

    if (nodeId === null) return;

    map[nodeId] = true;

    // rerun check
    if (current && current.i === nodeId) {
      current.r = (current.r || 0) + 1;
      return;
    }

    const node: StackItemType = {
      i: nodeId,
      n: getDirectoryIdByFiber(fiber),
      s: getCurrent(),
    };

    if (current) {
      current.c = current.c || [];
      current.c.push(node);
    }

    stack.push(node);

    current = node;
  });

  dispatch.onAfterFiberDone((fiber: MyReactFiberNodeDev) => {
    if (!runtime._enableRecord) return;

    if (!checkIsComponent(fiber)) return;

    const nodeId = getPlainNodeIdByFiber(fiber);

    if (nodeId === null) return;

    if (!map[nodeId]) {
      if (__DEV__) {
        console.warn(`[@my-react-devtool/core] record node id missing: ${nodeId} %o`, fiber);
      }
      return;
    }

    let stackTop = stack.pop();

    while (stackTop && stackTop.i !== nodeId) {
      stackTop = stack.pop();
    }

    if (!stackTop) return;

    stackTop.e = getCurrent();

    stackTop.d = Math.max(Math.floor((stackTop.e as number) - (stackTop.s as number)), 1);

    current = stack[stack.length - 1] || null;

    if (!current) {
      runtime._stack.push({ stack: stackTop, id, mode, list: trigger });
    }
  });

  const reset = () => {
    stack.length = 0;
    current = null;
    map = {};
    trigger = [];
  };

  resetArray.push(reset);

  runtime.startRecord = () => {
    if (!runtime._supportRecord) return;

    runtime._enableRecord = true;

    runtime._stack.length = 0;

    resetArray.forEach((r) => r());
  };

  runtime.stopRecord = () => {
    if (!runtime._supportRecord) return;

    runtime._enableRecord = false;

    runtime.notifyRecordStack();

    resetArray.forEach((r) => r());
  };
};

export const getRecord = (runtime: DevToolCore) => {
  if (!runtime._enabled) return [];

  const stack = runtime._stack.map((item) => ({ ...item, list: item.list.map((t) => ({ ...t, updater: t.updater.map((u) => getNode(u)) })) }));

  return stack;
};
