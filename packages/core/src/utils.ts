/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
  Consumer,
  Context,
  ForwardRef,
  Fragment,
  HOOK_TYPE,
  Root,
  Lazy,
  Memo,
  Element,
  merge,
  Portal,
  Profiler,
  Provider,
  Scope,
  ScopeLazy,
  ScopeSuspense,
  Strict,
  Suspense,
  TYPEKEY,
  Comment,
} from "@my-react/react-shared";

import { getNode } from "./data";
import { inspectHooksOfFiber } from "./hook";
import { disableLogs, reenableLogs } from "./log";
import { getDispatchFromFiber, getPlainNodeByFiber } from "./tree";
import { NODE_TYPE } from "./type";

import type { DispatcherType, HooksTree } from "./hook";
import type { HOOKTree, PlainNode } from "./plain";
import type { DevToolRenderDispatch } from "./setup";
import type {
  MixinMyReactClassComponent,
  MixinMyReactFunctionComponent,
  MixinMyReactObjectComponent,
  MyReactElement,
  MyReactElementNode,
  MyReactObjectComponent,
  createContext,
  forwardRef,
  lazy,
  memo,
} from "@my-react/react";
import type { MyReactFiberNode, MyReactHookNode, MyReactFiberNodeDev, MyReactHookNodeDev, CustomRenderDispatch } from "@my-react/react-reconciler";

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
    case NODE_TYPE.__internal__:
      return "KEEP——Internal (not used)";
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
    case NODE_TYPE.__context__:
      return "Context";
    case NODE_TYPE.__scopeLazy__:
      return "ScopeLazy";
    case NODE_TYPE.__scopeSuspense__:
      return "ScopeSuspense";
    case NODE_TYPE.__activity__:
      return "Activity";
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

const getNameFromRawType = (rawType: MixinMyReactObjectComponent) => {
  if (typeof rawType === "object") {
    return rawType.displayName || getNameFromRawType(rawType.render);
  }

  if (typeof rawType === "function") {
    return rawType.displayName || rawType.name || "Anonymous";
  }
};

// SEE @my-react/react-reconciler
export const getFiberName = (fiber: MyReactFiberNodeDev) => {
  const typedFiber = fiber as MyReactFiberNodeDev;
  if (fiber.type & NODE_TYPE.__provider__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Provider"];
    const name = typedElementType.Context.displayName;
    return `${name || "Context"}.Provider`;
  }
  if (fiber.type & NODE_TYPE.__context__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>;
    const name = typedElementType.displayName;
    return `${name || "Context"}`;
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
  if (fiber.type & NODE_TYPE.__scopeLazy__) return `ScopeLazy`;
  if (fiber.type & NODE_TYPE.__scopeSuspense__) return `ScopeSuspense`;
  if (fiber.type & NODE_TYPE.__activity__) return `Activity`;
  if (fiber.type & NODE_TYPE.__strict__) return `Strict`;
  if (fiber.type & NODE_TYPE.__profiler__) return `Profiler`;
  if (fiber.type & NODE_TYPE.__suspense__) return `Suspense`;
  if (fiber.type & NODE_TYPE.__comment__) return `Comment`;
  if (fiber.type & NODE_TYPE.__internal__) return `KEEP——Internal`;
  if (fiber.type & NODE_TYPE.__fragment__) return `Fragment`;
  if (fiber.type & NODE_TYPE.__text__) return `text`;
  if (typeof fiber.elementType === "string") return `${fiber.elementType}`;
  if (typeof fiber.elementType === "function") {
    const typedElementType = fiber.elementType as MixinMyReactClassComponent | MixinMyReactFunctionComponent;
    let name = typedElementType.displayName || typedElementType.name || "Anonymous";
    const element = typedFiber._debugElement as MyReactElement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rawType = typedFiber.elementRawType as MyReactElement["type"];
    // may be a Suspense element
    const type = (element?.type || rawType) as MixinMyReactObjectComponent;
    name = getNameFromRawType(type) || name;
    return `${name}`;
  }
  return `unknown`;
};

// SEE @my-react/react-reconciler
export const isValidElement = (element?: MyReactElementNode | any): element is MyReactElement => {
  return typeof element === "object" && !Array.isArray(element) && element !== null && element?.[TYPEKEY] === Element;
};

// SEE @my-react/react-reconciler
export const getMockFiberFromElement = (element: MyReactElement): MyReactFiberNodeDev => {
  let nodeType = NODE_TYPE.__initial__;

  let elementType = element.type;

  const finalElement = element;

  const pendingProps = element.props;

  const ref: MyReactElement["ref"] | null = element.ref ?? undefined;

  const key: MyReactElement["key"] | null = element.key ?? undefined;

  if (typeof elementType === "object" && elementType !== null) {
    const typedElementType = elementType as MyReactObjectComponent;
    switch (typedElementType[TYPEKEY]) {
      case Provider:
        nodeType = merge(nodeType, NODE_TYPE.__provider__);
        break;
      // support react 19 context api
      case Context:
        nodeType = merge(nodeType, NODE_TYPE.__context__);
        break;
      case Consumer:
        nodeType = merge(nodeType, NODE_TYPE.__consumer__);
        break;
      case Memo:
        nodeType = merge(nodeType, NODE_TYPE.__memo__);
        elementType = (typedElementType as ReturnType<typeof memo>).render;
        break;
      case ForwardRef:
        nodeType = merge(nodeType, NODE_TYPE.__forwardRef__);
        elementType = (typedElementType as ReturnType<typeof forwardRef>).render;
        break;
      case Lazy:
        nodeType = merge(nodeType, NODE_TYPE.__lazy__);
        break;
      default:
        throw new Error(`[@my-react/react] invalid object element type "${typedElementType[TYPEKEY]?.toString()}"`);
    }
    if (typeof elementType === "object") {
      if (elementType[TYPEKEY] === ForwardRef) {
        nodeType = merge(nodeType, NODE_TYPE.__forwardRef__);
        elementType = (elementType as ReturnType<typeof forwardRef>).render;
      }
      if (elementType[TYPEKEY] === Provider) {
        nodeType = merge(nodeType, NODE_TYPE.__provider__);
      }
      if (elementType[TYPEKEY] === Context) {
        nodeType = merge(nodeType, NODE_TYPE.__context__);
      }
      if (elementType[TYPEKEY] === Consumer) {
        nodeType = merge(nodeType, NODE_TYPE.__consumer__);
      }
    }
    if (typeof elementType === "function") {
      if (elementType.prototype?.isMyReactComponent) {
        nodeType = merge(nodeType, NODE_TYPE.__class__);
      } else {
        nodeType = merge(nodeType, NODE_TYPE.__function__);
      }
    }
  } else if (typeof elementType === "function") {
    if (elementType.prototype?.isMyReactComponent) {
      nodeType = merge(nodeType, NODE_TYPE.__class__);
    } else {
      nodeType = merge(nodeType, NODE_TYPE.__function__);
    }
  } else if (typeof elementType === "symbol") {
    switch (elementType) {
      case Root:
        nodeType = merge(nodeType, NODE_TYPE.__internal__);
        break;
      case Fragment:
        nodeType = merge(nodeType, NODE_TYPE.__fragment__);
        break;
      case Strict:
        nodeType = merge(nodeType, NODE_TYPE.__strict__);
        break;
      case Suspense:
        nodeType = merge(nodeType, NODE_TYPE.__suspense__);
        break;
      case Scope:
        nodeType = merge(nodeType, NODE_TYPE.__scope__);
        break;
      case ScopeLazy:
        nodeType = merge(nodeType, NODE_TYPE.__scopeLazy__);
        break;
      case ScopeSuspense:
        nodeType = merge(nodeType, NODE_TYPE.__scopeSuspense__);
        break;
      case Comment:
        nodeType = merge(nodeType, NODE_TYPE.__comment__);
        break;
      case Portal:
        nodeType = merge(nodeType, NODE_TYPE.__portal__);
        break;
      case Profiler:
        nodeType = merge(nodeType, NODE_TYPE.__profiler__);
        break;
      default:
        throw new Error(`[@my-react/react] invalid symbol element type "${elementType?.toString()}"`);
    }
  } else if (typeof elementType === "string") {
    nodeType = merge(nodeType, NODE_TYPE.__plain__);
  } else {
    nodeType = merge(nodeType, NODE_TYPE.__empty__);
  }

  const mockFiber = {
    type: nodeType,
    elementType: elementType,
    pendingProps: pendingProps,
    key: key,
    ref: ref,
    _debugElement: finalElement,
  };

  return mockFiber as unknown as MyReactFiberNodeDev;
};

export const getElementName = (element: MyReactElement) => `<${getFiberName(getMockFiberFromElement(element))} />`;

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
      const packageName = dispatch?.renderPackage || "@my-react";
      tree.push(`$$ ${packageName} ${dispatch.renderMode}`);
    }

    if (dispatch && dispatch.version) {
      if (dispatch.dispatcher) {
        tree.push(`$$ @my-react ${dispatch.version}`);
      } else {
        tree.push(`$$ @my-react legacy ${dispatch.version}`);
      }
    } else {
      tree.push(`$$ @my-react legacy`);
    }
  }

  return tree;
};

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

export const getProps = (fiber: MyReactFiberNodeDev) => {
  return getNode(fiber.pendingProps);
};

export const getState = (fiber: MyReactFiberNodeDev) => {
  return getNode(fiber.pendingState);
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

// -- reactivity-store utils --

enum ReactiveFlags {
  SKIP = "__v_skip",
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
  IS_SHALLOW = "__v_isShallow",
  RAW = "__v_raw",
  IS_REF = "__v_isRef",
}

export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as any)[ReactiveFlags.RAW]);
  }
  return !!(value && (value as any)[ReactiveFlags.IS_REACTIVE]);
}

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_READONLY]);
}

export function isShallow(value: unknown): boolean {
  return !!(value && (value as any)[ReactiveFlags.IS_SHALLOW]);
}

export function isProxy(value: any): boolean {
  return value ? !!value[ReactiveFlags.RAW] : false;
}

export function isRef(r: any): boolean {
  return r ? r[ReactiveFlags.IS_REF] === true : false;
}
