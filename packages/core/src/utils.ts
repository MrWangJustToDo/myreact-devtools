import { HOOK_TYPE } from "@my-react/react-shared";
import { immutable } from "@redux-devtools/serialize";
import * as Immutable from "immutable";

import { getPlainNodeByFiber } from "./tree";
import { NODE_TYPE } from "./type";

import type { HOOK, PlainNode } from "./plain";
import type {
  MixinMyReactClassComponent,
  MixinMyReactFunctionComponent,
  MixinMyReactObjectComponent,
  MyReactElement,
  createContext,
  lazy,
} from "@my-react/react";
import type { MyReactFiberNodeDev, MyReactHookNode } from "@my-react/react-reconciler";

function customReplacer(key: string, value: any, defaultReplacer: any) {
  if (key === "_owner" || key === "fiber") {
    return null;
  }
  return defaultReplacer(key, value);
}

const { stringify, parse } = immutable(Immutable, null, customReplacer);

export const typeKeys: number[] = [];

Object.keys(NODE_TYPE).forEach((key) => {
  if (!key.startsWith("__")) {
    typeKeys.push(+key);
  }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const safeStringify = (obj: Object | Function) => {
  try {
    if (typeof obj === "function") {
      return { type: "function", name: obj.name, value: obj.toString() } as const;
    } else {
      return { type: "object", name: "object", value: stringify(obj) } as const;
    }
  } catch (e) {
    console.log((e as Error).message);
  }
};

export type FiberObj = ReturnType<typeof safeStringify>;

export const safeParse = (val: FiberObj) => {
  try {
    if (val.type === "function") {
      const re = new Function(val.value);
      Object.defineProperty(re, "name", {
        value: val.name,
      });
      return re;
    } else {
      return parse(val.value);
    }
  } catch(e) {
    console.log((e as Error).message);
  }
};

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

export const getFiberType = (t: number) => {
  const type: string[] = [];

  typeKeys.forEach((key) => {
    if (t & key) {
      const name = getTypeName(key);
      name && type.push(name);
    }
  });

  return type;
};

export const getFiberTag = (t: number) => {
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
  return tag;
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
    if (__DEV__) {
      const element = typedFiber._debugElement as MyReactElement;
      const type = element?.type as MixinMyReactObjectComponent;
      name = type?.displayName || name;
    }
    return `${name || "anonymous"}`;
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
    let name = typedElementType.displayName || typedElementType.name || "anonymous";
    if (__DEV__) {
      const element = typedFiber._debugElement as MyReactElement;
      // may be a Suspense element
      const type = element?.type as MixinMyReactObjectComponent;
      name = type?.displayName || name;
    }
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

export const getSource = (fiber: MyReactFiberNodeDev) => {
  if (fiber._debugElement) {
    const element = fiber._debugElement as MyReactElement;
    return element._source;
  }
  return null;
};

export const getTree = (fiber: MyReactFiberNodeDev) => {
  const tree: string[] = [];

  let parent = fiber?.parent;

  while (parent) {
    const plain = getPlainNodeByFiber(parent);

    const id = plain.id;

    tree.push(id);

    parent = parent.parent;
  }

  return tree;
};

export const getHook = (fiber: MyReactFiberNodeDev) => {
  const tree: HOOK[] = [];

  const hookList = fiber.hookList;

  const parseHook = (hook: MyReactHookNode) => {
    const name = getHookName(hook.type);

    const value = safeStringify(hook.result);

    const deps = safeStringify(hook.deps);

    return { name, value, deps };
  };

  hookList?.listToFoot?.((h) => tree.push(parseHook(h as MyReactHookNode)));

  return tree;
};

export const parseHook = (plain: PlainNode) => {
  const hook = plain.hook;

  if (!hook || hook.length === 0) return [];

  return hook.map((item) => ({ ...item, value: safeParse(item.value), deps: safeParse(item.deps) }));
};

export const getObj = (obj: any) => {
  return safeStringify(obj);
};

export const parseObj = (plain: PlainNode) => {
  const obj = plain.props;

  return safeParse(obj);
};
