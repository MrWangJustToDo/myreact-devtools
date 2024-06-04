import { type MyReactFiberNodeDev, type MyReactFiberNode } from "@my-react/react-reconciler";

import { NODE_TYPE } from "./type";

import type {
  MixinMyReactClassComponent,
  MixinMyReactFunctionComponent,
  MixinMyReactObjectComponent,
  MyReactElement,
  createContext,
  lazy,
} from "@my-react/react";

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

export const getFiberName = (fiber: MyReactFiberNodeDev) => {
  const typedFiber = fiber as MyReactFiberNodeDev;
  if (fiber.type & NODE_TYPE.__memo__) {
    const targetRender = fiber.elementType as MixinMyReactClassComponent | MixinMyReactFunctionComponent;
    let name = "";
    let res = "memo";
    if (fiber.type & NODE_TYPE.__provider__) {
      const typedTargetRender = fiber.elementType as ReturnType<typeof createContext>["Provider"];
      name = typedTargetRender.Context.displayName || "anonymous" + "-" + typedTargetRender.Context.contextId;
      res += "-provider";
    } else if (fiber.type & NODE_TYPE.__consumer__) {
      const typedTargetRender = fiber.elementType as ReturnType<typeof createContext>["Consumer"];
      name = typedTargetRender.Context.displayName || "anonymous" + "-" + typedTargetRender.Context.contextId;
      res += "-consumer";
    } else if (typeof targetRender === "function") {
      name = targetRender?.displayName || targetRender?.name || name;
    }
    if (__DEV__ && typedFiber._debugElement) {
      const element = typedFiber._debugElement as MyReactElement;
      const type = element.type as MixinMyReactObjectComponent;
      name = type.displayName || name;
    }
    if (fiber.type & NODE_TYPE.__forwardRef__) {
      res += "-forwardRef";
    }
    return `${name ? name : "anonymous"} - (${res})`;
  }
  if (fiber.type & NODE_TYPE.__lazy__) {
    const typedElementType = fiber.elementType as ReturnType<typeof lazy>;
    const typedRender = typedElementType?.render;
    let name = typedRender?.displayName || typedRender?.name || "";
    if (__DEV__ && typedFiber._debugElement) {
      const element = typedFiber._debugElement as MyReactElement;
      const type = element.type as MixinMyReactObjectComponent;
      name = type.displayName || name;
    }
    return `${name ? name : "anonymous"} - (lazy)`;
  }
  if (fiber.type & NODE_TYPE.__portal__) return `Portal`;
  if (fiber.type & NODE_TYPE.__null__) return `Null`;
  if (fiber.type & NODE_TYPE.__empty__) return `Empty`;
  if (fiber.type & NODE_TYPE.__scope__) return `Scope`;
  if (fiber.type & NODE_TYPE.__strict__) return `Strict`;
  if (fiber.type & NODE_TYPE.__profiler__) return `Profiler`;
  if (fiber.type & NODE_TYPE.__suspense__) return `Suspense`;
  if (fiber.type & NODE_TYPE.__fragment__) {
    if (fiber.pendingProps["wrap"]) return `Fragment - (auto-wrap)`;
    return `Fragment`;
  }
  if (fiber.type & NODE_TYPE.__keepLive__) return `KeepAlive`;
  if (fiber.type & NODE_TYPE.__provider__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Provider"];
    const name = typedElementType.Context.displayName;
    return `${name ? name : "anonymous" + "-" + typedElementType.Context.contextId} - (provider)`;
  }
  if (fiber.type & NODE_TYPE.__consumer__) {
    const typedElementType = fiber.elementType as ReturnType<typeof createContext>["Consumer"];
    const name = typedElementType.Context.displayName;
    return `${name ? name : "anonymous" + "-" + typedElementType.Context.contextId} - (consumer)`;
  }
  if (fiber.type & NODE_TYPE.__comment__) return `Comment`;
  if (fiber.type & NODE_TYPE.__forwardRef__) {
    const targetRender = fiber.elementType as MixinMyReactFunctionComponent;
    let name = targetRender?.displayName || targetRender?.name || "";
    if (__DEV__ && typedFiber._debugElement) {
      const element = typedFiber._debugElement as MyReactElement;
      const type = element.type as MixinMyReactObjectComponent;
      name = type.displayName || name;
    }
    return `${name ? name : "anonymous"} - (forwardRef)`;
  }
  if (typeof fiber.elementType === "function") {
    const typedElementType = fiber.elementType as MixinMyReactClassComponent | MixinMyReactFunctionComponent;
    const name = typedElementType.displayName || typedElementType.name || "anonymous";
    return `${name}`;
  }
  if (fiber.type & NODE_TYPE.__text__) return `text - (native)`;
  if (typeof fiber.elementType === "string") return `${fiber.elementType}`;
  return `Unknown`;
};

export const getFiberContent = (fiber: MyReactFiberNode) => {
  return fiber.elementType?.toString();
}