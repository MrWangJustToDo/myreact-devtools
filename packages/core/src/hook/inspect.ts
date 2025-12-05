import { HOOK_TYPE, UpdateQueueType } from "@my-react/react-shared";

import { getNode } from "../data";
import { getContextName } from "../fiber";
import { disableLogs, reenableLogs } from "../log";
import { getDispatchFromFiber, type HOOKTree } from "../tree";

import { inspectHooksOfFiber } from "./internal";

import type { DispatcherType, HooksTree } from "./internal";
import type { CustomRenderDispatch, MyReactFiberNode, MyReactFiberNodeDev, MyReactHookNodeDev, UpdateState } from "@my-react/react-reconciler";

const linkStateToHookIndex = new WeakMap<UpdateState, Array<number | string>>();

const parseHooksTreeToHOOKTree = (node: HooksTree, d: number, p?: { index: number }): HOOKTree[] => {
  const _p = p || { index: 0 };
  return node.map<HOOKTree>((item) => {
    const { id, name, value, subHooks, isStateEditable } = item;
    const isHook = !subHooks || subHooks.length === 0;
    const children = subHooks ? parseHooksTreeToHOOKTree(subHooks, d + 1, _p) : undefined;
    return {
      k: id?.toString(),
      e: isStateEditable,
      i: isHook ? _p.index++ : undefined,
      n: name || "Anonymous",
      v: getNode(value),
      d,
      h: isHook,
      c: children,
      // all the hooks key
      keys: isHook ? [id] : children.map((c) => c.keys).flat(),
    };
  });
};

const getHookName = (type: number) => {
  switch (type) {
    case HOOK_TYPE.useReducer:
      return "Reducer";
    case HOOK_TYPE.useEffect:
      return "Effect";
    case HOOK_TYPE.useLayoutEffect:
      return "LayoutEffect";
    case HOOK_TYPE.useMemo:
      return "Memo";
    case HOOK_TYPE.useCallback:
      return "Callback";
    case HOOK_TYPE.useRef:
      return "Ref";
    case HOOK_TYPE.useImperativeHandle:
      return "ImperativeHandle";
    case HOOK_TYPE.useDebugValue:
      return "DebugValue";
    case HOOK_TYPE.useContext:
      return "Context";
    case HOOK_TYPE.useDeferredValue:
      return "DeferredValue";
    case HOOK_TYPE.useTransition:
      return "Transition";
    case HOOK_TYPE.useId:
      return "Id";
    case HOOK_TYPE.useSyncExternalStore:
      return "SyncExternalStore";
    case HOOK_TYPE.useInsertionEffect:
      return "InsertionEffect";
    case HOOK_TYPE.useState:
      return "State";
    case HOOK_TYPE.useSignal:
      return "Signal";
  }
};

const getHookNormal = (fiber: MyReactFiberNodeDev) => {
  const final: HOOKTree[] = [];

  if (!fiber.hookList) return final;

  const hookList = fiber.hookList;

  const processStack = (hook: MyReactHookNodeDev, index: number) => {
    const isEffect = hook.type === HOOK_TYPE.useEffect || hook.type === HOOK_TYPE.useLayoutEffect || hook.type === HOOK_TYPE.useInsertionEffect;
    const isRef = hook.type === HOOK_TYPE.useRef;
    const isContext = hook.type === HOOK_TYPE.useContext;
    final.push({
      k: index.toString(),
      i: index,
      n: isContext ? getContextName(hook.value) : getHookName(hook.type),
      v: getNode(isEffect ? hook.value : isRef ? hook.result?.current : hook.result),
      d: 0,
      h: true,
      keys: [index],
    });
  };

  hookList?.toArray()?.forEach(processStack);

  return final;
};

// disable all log
const getHookStack = (fiber: MyReactFiberNodeDev, dispatch: CustomRenderDispatch) => {
  const final: HOOKTree[] = [];

  if (!fiber.hookList) return final;

  disableLogs();

  const hookTree = inspectHooksOfFiber(fiber, dispatch.dispatcher as { current: DispatcherType });

  reenableLogs();

  return parseHooksTreeToHOOKTree(hookTree, 0);
};

export const getHook = (fiber: MyReactFiberNodeDev) => {
  const dispatch = getDispatchFromFiber(fiber);
  if (dispatch && dispatch.dispatcher) {
    try {
      return getHookStack(fiber, dispatch);
    } catch (e) {
      console.error(e);
      return getHookNormal(fiber);
    }
  } else {
    return getHookNormal(fiber);
  }
};

export const tryLinkStateToHookIndex = (fiber: MyReactFiberNode, state: UpdateState) => {
  if (state.needUpdate && state.nodes) {
    // filter all hook update queue
    // const nodes = state.nodes?.filter?.((node) => node.type === UpdateQueueType.hook);
    // get all the keys from the nodes;
    const allHooksArray = fiber.hookList?.toArray?.() || [];

    const nodes = state.nodes || [];

    const keys =
      nodes.map?.((node) => {
        if (node.type !== UpdateQueueType.hook) return -1;

        const index = allHooksArray?.findIndex?.((_node) => node?.trigger === _node);

        // there are a valid updater, link the before node value
        // if (index !== -1 && Object.prototype.hasOwnProperty.call(node, "_debugBeforeValue")) {
        //   const data = getNode(node._debugBeforeValue);

        //   indexMap[index] = data;
        // }

        return index;
      }) || [];
    // link the keys to the state
    linkStateToHookIndex.set(state, keys);
  }
};

export const getHookIndexFromState = (state: UpdateState) => {
  return linkStateToHookIndex.get(state);
};

export const deleteLinkState = (state: UpdateState) => {
  linkStateToHookIndex.delete(state);
};
