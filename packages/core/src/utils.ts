import { HOOK_TYPE } from "@my-react/react-shared";

import { NODE_TYPE } from "./type";

import type {
  MixinMyReactClassComponent,
  MixinMyReactFunctionComponent,
  MixinMyReactObjectComponent,
  MyReactElement,
  createContext,
  lazy,
} from "@my-react/react";
import type { MyReactHookNodeDev, MyReactFiberNodeDev } from "@my-react/react-reconciler";

export const typeKeys: number[] = [];

Object.keys(NODE_TYPE).forEach((key) => {
  if (!key.startsWith("__")) {
    typeKeys.push(+key);
  }
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const safeClone = (obj: Object) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return (e as Error).message;
  }
};

export const safeCloneRef = (ref: MyReactElement["ref"]) => {
  if (ref) {
    if (typeof ref === "function") {
      return ref.toString();
    } else {
      return safeClone(ref);
    }
  } else {
    return null;
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

export const getFiberType = (fiber: MyReactFiberNodeDev) => {
  const type: string[] = [];

  typeKeys.forEach((key) => {
    if (fiber.type & key) {
      const name = getTypeName(key);
      name && type.push(name);
    }
  });

  return type;
};

export const getFiberTag = (fiber: MyReactFiberNodeDev) => {
  const tag: string[] = [];
  if (fiber.type & NODE_TYPE.__memo__) {
    tag.push("memo");
  }
  if (fiber.type & NODE_TYPE.__forwardRef__) {
    tag.push("forwardRef");
  }
  if (fiber.type & NODE_TYPE.__lazy__) {
    tag.push("lazy");
  }
  if (fiber.type & NODE_TYPE.__fragment__ && fiber.pendingProps["wrap"]) {
    tag.push("auto-wrap");
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
    const name = typedElementType.displayName || typedElementType.name || "anonymous";
    return `${name}`;
  }
  return `unknown`;
};

export const getComponentName = (fiber: MyReactFiberNodeDev) => {
  if (fiber.type & NODE_TYPE.__provider__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Provider"];
    const name = typedElementType.Context.displayName;
    if (name) {
      return `${name}.Provider`;
    } else {
      return "Context.Provider";
    }
  }
  if (fiber.type & NODE_TYPE.__consumer__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Consumer"];
    const name = typedElementType.Context.displayName;
    if (name) {
      return `${name}.Consumer`;
    } else {
      return "Context.Consumer";
    }
  }
  if (fiber.type & NODE_TYPE.__function__ || fiber.type & NODE_TYPE.__class__) {
    const typedElementType = fiber.elementType as MixinMyReactFunctionComponent;
    let name = typedElementType.displayName || typedElementType.name || "anonymous";
    const element = fiber._debugElement as MyReactElement;
    const type = element?.type as MixinMyReactObjectComponent;
    name = type?.displayName || name;
    return name;
  }
};

export const getHookName = (hook: MyReactHookNodeDev) => {
  switch (hook.type) {
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

export const getFiberSource = (fiber: MyReactFiberNodeDev) => {
  if (fiber._debugElement) {
    const element = fiber._debugElement as MyReactElement;
    return element._source;
  }
  return null;
};

export const getFiberTree = (fiber: MyReactFiberNodeDev) => {
  const tree: string[] = [];

  let parent = fiber?.parent;

  while (parent) {
    tree.push(getFiberName(parent as MyReactFiberNodeDev));
    parent = parent.parent;
  }

  return tree;
};

export const getHookTree = (fiber: MyReactFiberNodeDev) => {
  const tree: string[] = [];

  const hookList = fiber.hookList;

  hookList?.listToFoot?.((h) => tree.push(getHookName(h as MyReactHookNodeDev)));

  return tree;
};
