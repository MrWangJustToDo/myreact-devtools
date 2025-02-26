/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { HOOK_TYPE } from "@my-react/react-shared";

import { getNode, getNodeForce } from "./data";
import { getPlainNodeByFiber } from "./tree";
import { NODE_TYPE } from "./type";

import type { HOOKTree, PlainNode } from "./plain";
import type { DevToolRenderDispatch } from "./setup";
import type {
  MixinMyReactClassComponent,
  MixinMyReactFunctionComponent,
  MixinMyReactObjectComponent,
  MyReactElement,
  createContext,
  lazy,
} from "@my-react/react";
import type { MyReactFiberNode, MyReactFiberNodeDev, MyReactHookNode, MyReactHookNodeDev } from "@my-react/react-reconciler";

export const typeKeys: number[] = [];

// SEE https://github.com/facebook/react/blob/main/compiler/packages/react-compiler-runtime/src/index.ts
const reactCompilerSymbol = Symbol.for("react.memo_cache_sentinel");

Object.keys(NODE_TYPE).forEach((key) => {
  if (!key.startsWith("__")) {
    typeKeys.push(+key);
  }
});

export const getTypeName = (type: number) => {
  switch (type) {
    case NODE_TYPE.__keepLive__:
      return "KeepAlive";
    case NODE_TYPE.__memo__:
      return "Memo";
    case NODE_TYPE.__forwardRef__:
      return "ForwardRef";
    case NODE_TYPE.__lazy__:
      return "Lazy";
    case NODE_TYPE.__provider__:
      return "Provider";
    case NODE_TYPE.__consumer__:
      return "Consumer";
    case NODE_TYPE.__fragment__:
      return "Fragment";
    case NODE_TYPE.__scope__:
      return "Scope";
    case NODE_TYPE.__strict__:
      return "Strict";
    case NODE_TYPE.__profiler__:
      return "Profiler";
    case NODE_TYPE.__suspense__:
      return "Suspense";
    case NODE_TYPE.__portal__:
      return "Portal";
    case NODE_TYPE.__comment__:
      return "Comment";
    case NODE_TYPE.__empty__:
      return "Empty";
    case NODE_TYPE.__null__:
      return "Null";
    case NODE_TYPE.__text__:
      return "Text";
    case NODE_TYPE.__function__:
      return "Function";
    case NODE_TYPE.__class__:
      return "Class";
    case NODE_TYPE.__plain__:
      return "Plain";
    case NODE_TYPE.__initial__:
      return "Initial";
    default:
      return "";
  }
};

export const getFiberTag = (node: PlainNode) => {
  const t = node.t;

  const tag: string[] = [];

  if (t & NODE_TYPE.__memo__) {
    tag.push("memo");
  }

  if (t & NODE_TYPE.__forwardRef__) {
    tag.push("forwardRef");
  }

  if (t & NODE_TYPE.__lazy__) {
    tag.push("lazy");
  }

  if (node.m) {
    tag.push("compiler ✨");
  }

  return tag;
};

export const getFiberType = (fiber: MyReactFiberNode) => {
  const t = fiber.type;

  let hasCompiler = false;

  // check react compiler
  fiber.hookList?.listToFoot((l: MyReactHookNode) => {
    if (hasCompiler) return;

    if (l.type === HOOK_TYPE.useMemo && l.result?.[reactCompilerSymbol]) {
      hasCompiler = true;
    }
  });

  return { t, hasCompiler };
};

export const getFiberName = (fiber: MyReactFiberNodeDev) => {
  const typedFiber = fiber as MyReactFiberNodeDev;
  if (fiber.type & NODE_TYPE.__provider__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Provider"];
    const name = typedElementType.Context.displayName;
    return `${name || "Context"}.Provider`;
  }
  if (fiber.type & NODE_TYPE.__consumer__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Consumer"];
    const name = typedElementType.Context.displayName;
    return `${name || "Context"}.Consumer`;
  }
  if (fiber.type & NODE_TYPE.__lazy__) {
    const typedElementType = fiber.elementType as ReturnType<typeof lazy>;
    const typedRender = typedElementType?.render;
    let name = typedRender?.displayName || typedRender?.name || "";
    const element = typedFiber._debugElement as MyReactElement;
    const type = element?.type as MixinMyReactObjectComponent;
    name = type?.displayName || name;
    return `${name || "Anonymous"}`;
  }
  if (fiber.type & NODE_TYPE.__portal__) return `Portal`;
  if (fiber.type & NODE_TYPE.__null__) return `Null`;
  if (fiber.type & NODE_TYPE.__empty__) return `Empty`;
  if (fiber.type & NODE_TYPE.__scope__) return `Scope`;
  if (fiber.type & NODE_TYPE.__strict__) return `Strict`;
  if (fiber.type & NODE_TYPE.__profiler__) return `Profiler`;
  if (fiber.type & NODE_TYPE.__suspense__) return `Suspense`;
  if (fiber.type & NODE_TYPE.__comment__) return `Comment`;
  if (fiber.type & NODE_TYPE.__keepLive__) return `KeepAlive`;
  if (fiber.type & NODE_TYPE.__fragment__) return `Fragment`;
  if (fiber.type & NODE_TYPE.__text__) return `text`;
  if (typeof fiber.elementType === "string") return `${fiber.elementType}`;
  if (typeof fiber.elementType === "function") {
    const typedElementType = fiber.elementType as MixinMyReactClassComponent | MixinMyReactFunctionComponent;
    let name = typedElementType.displayName || typedElementType.name || "Anonymous";
    const element = typedFiber._debugElement as MyReactElement;
    // may be a Suspense element
    const type = element?.type as MixinMyReactObjectComponent;
    name = type?.displayName || name;
    return `${name}`;
  }
  return `unknown`;
};

export const getHookName = (type: number) => {
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

export const getContextName = (value: ReturnType<typeof createContext>) => {
  return value.displayName || "Context";
};

export const getSource = (fiber: MyReactFiberNodeDev) => {
  if (fiber._debugElement) {
    const element = fiber._debugElement as MyReactElement;
    return element._source;
  }
  return null;
};

export const getTree = (fiber: MyReactFiberNodeDev) => {
  const tree: string[] = [];

  let current = fiber;

  let parent = current?.parent;

  while (parent) {
    const plain = getPlainNodeByFiber(parent);

    const id = plain.i;

    tree.push(id);

    current = parent as MyReactFiberNodeDev;

    parent = parent.parent;
  }

  if (current) {
    const typedCurrent = current as MyReactFiberNode & { renderDispatch?: DevToolRenderDispatch };

    const dispatch = typedCurrent.renderDispatch;

    if (dispatch && dispatch.renderMode) {
      tree.push(`@my-react ${dispatch.renderMode}`);
    }

    if (dispatch && dispatch.version) {
      tree.push(`@my-react ${dispatch.version}`);
    } else {
      tree.push(`@my-react legacy`);
    }
  }

  return tree;
};

export const getHook = (fiber: MyReactFiberNodeDev, force?: boolean) => {
  const final: HOOKTree[] = [];

  const hookList = fiber.hookList;

  const processStack = (hook: MyReactHookNodeDev, index: number) => {
    const stack = hook._debugStack;

    if (!stack || !Array.isArray(stack) || stack.length === 0) {
      const isEffect = hook.type === HOOK_TYPE.useEffect || hook.type === HOOK_TYPE.useLayoutEffect || hook.type === HOOK_TYPE.useInsertionEffect;
      const isContext = hook.type === HOOK_TYPE.useContext;
      final.push({
        k: index.toString(),
        h: true,
        i: index,
        n: isContext ? getContextName(hook.value) : getHookName(hook.type),
        v: force ? getNodeForce(isEffect ? hook.value : hook.result) : getNode(isEffect ? hook.value : hook.result),
        d: 0,
      });
    } else {
      let prevHookTree = final.at(-1);
      let parentHookChild = final;
      for (let i = 0; i < stack.length; i++) {
        const isHook = i === stack.length - 1;
        const { name, id } = stack[i];
        if (id === prevHookTree?.k) {
          if (isHook) {
            const hookTree: HOOKTree = { k: id, i: index, h: isHook, d: i, n: name.startsWith("use") ? name.substring(3) : name };
            parentHookChild.push(hookTree);
            prevHookTree = hookTree;
          } else {
            prevHookTree.c = prevHookTree.c || [];
            parentHookChild = prevHookTree.c;
            prevHookTree = prevHookTree.c?.at(-1);
          }
        } else {
          const hookTree: HOOKTree = { k: id, i: isHook ? index : undefined, h: isHook, d: i, n: name.startsWith("use") ? name.substring(3) : name };
          if (isHook) {
            parentHookChild.push(hookTree);
            prevHookTree = hookTree;
          } else {
            parentHookChild.push(hookTree);
            hookTree.c = hookTree.c || [];
            parentHookChild = hookTree.c;
            prevHookTree = hookTree.c?.at(-1);
          }
        }
        if (isHook) {
          const isEffect = hook.type === HOOK_TYPE.useEffect || hook.type === HOOK_TYPE.useLayoutEffect || hook.type === HOOK_TYPE.useInsertionEffect;
          const isContext = hook.type === HOOK_TYPE.useContext;
          // overwrite name
          prevHookTree.n = isContext ? getContextName(hook.value) : getHookName(hook.type);
          prevHookTree.v = force ? getNodeForce(isEffect ? hook.value : hook.result) : getNode(isEffect ? hook.value : hook.result);
        }
      }
    }
  };

  hookList?.toArray()?.forEach(processStack);

  return final;
};

export const getProps = (fiber: MyReactFiberNodeDev, force?: boolean) => {
  return force ? getNodeForce(fiber.pendingProps) : getNode(fiber.pendingProps);
};

export const getState = (fiber: MyReactFiberNodeDev, force?: boolean) => {
  return force ? getNodeForce(fiber.pendingState) : getNode(fiber.pendingState);
};

export const debounce = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback.call(null, ...args);
    }, time || 40);
  }) as unknown as T;
};

export const throttle = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    if (id) return;
    id = setTimeout(() => {
      callback.call(null, ...args);
      id = null;
    }, time || 40);
  }) as unknown as T;
};
