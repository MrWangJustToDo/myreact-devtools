// https://github.com/facebook/react/blob/main/packages/react-debug-tools/src/ReactDebugHooks.js

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Context, HOOK_TYPE, include, isPromise, TYPEKEY } from "@my-react/react-shared";
import ErrorStackParser from "error-stack-parser";

import { NODE_TYPE } from "./type";

import type { createContext, MixinMyReactFunctionComponent, RenderPlatform } from "@my-react/react";
import type { MyReactFiberNode, MyReactHookNode } from "@my-react/react-reconciler";
import type { ListTreeNode } from "@my-react/react-shared";

type HookLogEntry = {
  displayName: string | null;
  primitive: string;
  stackError: Error;
  value: any;
  dispatcherHookName: string;
};

type BasicStateAction<S> = ((p: S) => S) | S;

type Dispatch<A> = (p: A) => void;

let hookLog: Array<HookLogEntry> = [];

let primitiveStackCache: null | Map<string, Array<any>> = null;

function getPrimitiveStackCache(): Map<string, Array<any>> {
  // This initializes a cache of all primitive hooks so that the top
  // most stack frames added by calling the primitive hook can be removed.
  if (primitiveStackCache === null) {
    const cache = new Map<string, Array<any>>();
    let readHookLog;
    try {
      // Use all hooks here to add them to the hook log.
      Dispatcher.useContext({ [TYPEKEY]: Context, Provider: { value: null } });
      Dispatcher.useState(null);
      Dispatcher.useReducer((s: any, a: any) => s, null);
      Dispatcher.useRef(null);
      Dispatcher.useLayoutEffect(() => {});
      Dispatcher.useInsertionEffect(() => {});
      Dispatcher.useEffect(() => {});
      Dispatcher.useOptimistic(null, (s: any, a: any) => s);
      Dispatcher.useImperativeHandle(undefined, () => null);
      Dispatcher.useDebugValue(null, () => {});
      Dispatcher.useCallback(() => {});
      Dispatcher.useTransition();
      Dispatcher.useSyncExternalStore(
        () => () => {},
        () => null,
        () => null
      );
      Dispatcher.useDeferredValue(null);
      Dispatcher.useMemo(() => null);
      if (typeof Dispatcher.use === "function") {
        Dispatcher.use({ [TYPEKEY]: Context, Provider: { value: null } });
        Dispatcher.use({
          then() {},
          state: "fulfilled",
          value: null,
        });
        try {
          Dispatcher.use({
            then() {},
          });
        } catch (x) {
          void 0;
        }
      }
      Dispatcher.useSignal(null);
      Dispatcher.useId();
    } finally {
      readHookLog = hookLog;
      hookLog = [];
    }
    for (let i = 0; i < readHookLog.length; i++) {
      const hook = readHookLog[i];
      cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
    }
    primitiveStackCache = cache;
  }
  return primitiveStackCache;
}

let currentFiber: null | MyReactFiberNode = null;
let currentHookNode: null | ListTreeNode<MyReactHookNode> = null;

function nextHook(): null | MyReactHookNode {
  const hook = currentHookNode;

  if (hook !== null) {
    currentHookNode = currentHookNode.next;
  }

  return hook?.value;
}

const defaultGetContextFiber = (fiber: MyReactFiberNode, ContextObject?: ReturnType<typeof createContext> | null) => {
  if (fiber?.parent && ContextObject) {
    let parent = fiber.parent;
    while (parent) {
      if (include(parent.type, NODE_TYPE.__provider__)) {
        const typedElementType = parent.elementType as ReturnType<typeof createContext>["Provider"];

        const contextObj = typedElementType["Context"];

        if (contextObj === ContextObject) {
          return parent;
        }
      }

      if (include(parent.type, NODE_TYPE.__context__)) {
        const typedElementType = parent.elementType as ReturnType<typeof createContext>;

        const contextObj = typedElementType;

        if (contextObj === ContextObject) {
          return parent;
        }
      }
      parent = parent.parent;
    }
  } else {
    return null;
  }
};

const defaultGetContextValue = (fiber: MyReactFiberNode | null, ContextObject?: ReturnType<typeof createContext> | null) => {
  if (fiber) {
    return fiber.pendingProps["value"] as Record<string, unknown>;
  } else {
    return ContextObject?.Provider["value"] as Record<string, unknown>;
  }
};

function readContext<T>(context: ReturnType<typeof createContext>): T {
  if (currentFiber === null) {
    return context.Provider.value as T;
  } else {
    const fiber = defaultGetContextFiber(currentFiber, context);
    const value = defaultGetContextValue(fiber, context);
    return value as T;
  }
}

const SuspenseException = new Error(
  "Suspense Exception: This is not a real error! It's an implementation " +
    "detail of `use` to interrupt the current render. You must either " +
    "rethrow it immediately, or move the `use` call outside of the " +
    "`try/catch` block. Capturing without rethrowing will lead to " +
    "unexpected behavior.\n\n" +
    "To handle async errors, wrap your component in an error boundary, or " +
    "call the promise's `.catch` method and pass the result to `use`."
);

function use<T>(usable: any): T {
  if (usable !== null && typeof usable === "object") {
    if (typeof usable.then === "function") {
      const thenable = usable;
      // new version of @my-react change the `state` to `status`
      const field = thenable.state || thenable.status;
      switch (field) {
        case "fulfilled": {
          const fulfilledValue: T = thenable.value;
          hookLog.push({
            displayName: null,
            primitive: "Promise",
            stackError: new Error(),
            value: fulfilledValue,
            dispatcherHookName: "Use",
          });
          return fulfilledValue;
        }
        case "rejected": {
          const rejectedError = thenable.reason;
          throw rejectedError;
        }
      }
      // If this was an uncached Promise we have to abandon this attempt
      // but we can still emit anything up until this point.
      hookLog.push({
        displayName: null,
        primitive: "Unresolved",
        stackError: new Error(),
        value: thenable,
        dispatcherHookName: "Use",
      });
      throw SuspenseException;
    } else if (usable[TYPEKEY] === Context) {
      const context = usable;
      const value = readContext<T>(context);

      hookLog.push({
        displayName: context.displayName || "Context",
        primitive: "Context (use)",
        stackError: new Error(),
        value,
        dispatcherHookName: "Use",
      });

      return value;
    }
  }

  throw new Error("An unsupported type was passed to use(): " + String(usable));
}

function useContext<T>(context: any): T {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useContext) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const value = readContext<T>(context);

  hookLog.push({
    displayName: context.displayName || null,
    primitive: "Context",
    stackError: new Error(),
    value: value,
    dispatcherHookName: "Context",
  });

  return value;
}

function useState<S>(initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>] {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useState) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const typedInitialState = initialState as () => S;

  const state: S = hook ? hook.result : typeof initialState === "function" ? typedInitialState() : initialState;

  hookLog.push({
    displayName: null,
    primitive: "State",
    stackError: new Error(),
    value: state,
    dispatcherHookName: "State",
  });

  return [state, (action: BasicStateAction<S>) => {}];
}

function useReducer<S, I, A>(reducer: (p1: S, p2: A) => S, initialArg: I, init?: (p: I) => S): [S, Dispatch<A>] {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useReducer) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const state = hook ? hook.result : init !== undefined ? init(initialArg) : (initialArg as unknown as S);

  hookLog.push({
    displayName: null,
    primitive: "Reducer",
    stackError: new Error(),
    value: state,
    dispatcherHookName: "Reducer",
  });

  return [state, (action: A) => {}];
}

function useRef<T>(initialValue: T): { current: T } {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useRef) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const ref = hook ? hook.result : { current: initialValue };

  hookLog.push({
    displayName: null,
    primitive: "Ref",
    stackError: new Error(),
    value: ref,
    dispatcherHookName: "Ref",
  });

  return ref;
}

function useLayoutEffect(create: () => (() => void) | void, inputs: Array<any> | void | null): void {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useLayoutEffect) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  hookLog.push({
    displayName: null,
    primitive: "LayoutEffect",
    stackError: new Error(),
    value: create,
    dispatcherHookName: "LayoutEffect",
  });
}

function useInsertionEffect(create: () => any, inputs: Array<any> | void | null): void {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useInsertionEffect) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  hookLog.push({
    displayName: null,
    primitive: "InsertionEffect",
    stackError: new Error(),
    value: create,
    dispatcherHookName: "InsertionEffect",
  });
}

function useEffect(create: () => (() => void) | void, deps?: any[] | void | null): void {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useEffect) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  hookLog.push({
    displayName: null,
    primitive: "Effect",
    stackError: new Error(),
    value: create,
    dispatcherHookName: "Effect",
  });
}

function useImperativeHandle<T>(ref: { current: T | null } | ((inst: T | null) => any) | null | void, create: () => T, inputs: Array<any> | void | null): void {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useImperativeHandle) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  // We don't actually store the instance anywhere if there is no ref callback
  // and if there is a ref callback it might not store it but if it does we
  // have no way of knowing where. So let's only enable introspection of the
  // ref itself if it is using the object form.
  let instance: T = undefined;
  if (ref !== null && typeof ref === "object") {
    instance = ref.current;
  }

  hookLog.push({
    displayName: null,
    primitive: "ImperativeHandle",
    stackError: new Error(),
    value: instance,
    dispatcherHookName: "ImperativeHandle",
  });
}

function useDebugValue(value: any, formatterFn: (value: any) => any) {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useDebugValue) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  hookLog.push({
    displayName: null,
    primitive: "DebugValue",
    stackError: new Error(),
    value: typeof formatterFn === "function" ? formatterFn(value) : value,
    dispatcherHookName: "DebugValue",
  });
}

function useCallback<T>(callback: T, inputs: Array<any> | void | null): T {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useCallback) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const value = hook ? hook.result : callback;

  hookLog.push({
    displayName: null,
    primitive: "Callback",
    stackError: new Error(),
    value,
    dispatcherHookName: "Callback",
  });
  return value;
}

function useMemo<T>(nextCreate: () => T, inputs: Array<any> | void | null): T {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useMemo) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const value = hook ? hook.result : nextCreate();

  hookLog.push({
    displayName: null,
    primitive: "Memo",
    stackError: new Error(),
    value,
    dispatcherHookName: "Memo",
  });

  return value;
}

function useSyncExternalStore<T>(subscribe: (p: () => void) => () => void, getSnapshot: () => T, getServerSnapshot?: () => T): T {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useSyncExternalStore) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const value = getSnapshot();

  hookLog.push({
    displayName: null,
    primitive: "SyncExternalStore",
    stackError: new Error(),
    value,
    dispatcherHookName: "SyncExternalStore",
  });

  return value;
}

function useTransition(): [boolean, (callback: () => void, options?: any) => void] {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useTransition) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const isPending = hook ? (Array.isArray(hook.result) ? hook.result[0] : hook.result.value) : false;

  hookLog.push({
    displayName: null,
    primitive: "Transition",
    stackError: new Error(),
    value: isPending,
    dispatcherHookName: "Transition",
  });

  return [isPending, () => {}];
}

function useDeferredValue<T>(value: T, initialValue?: T): T {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useDeferredValue) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const prevValue = hook ? hook.result : value;

  hookLog.push({
    displayName: null,
    primitive: "DeferredValue",
    stackError: new Error(),
    value: prevValue,
    dispatcherHookName: "DeferredValue",
  });

  return prevValue;
}

function useId(): string {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useId) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const id = hook ? hook.result : "";

  hookLog.push({
    displayName: null,
    primitive: "Id",
    stackError: new Error(),
    value: id,
    dispatcherHookName: "Id",
  });

  return id;
}

function useSignal<T>(initial: T | (() => T)) {
  const hook = nextHook();

  if (hook && hook.type !== HOOK_TYPE.useSignal) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const value = hook ? hook.result.getValue : typeof initial === "function" ? initial : () => initial;

  hookLog.push({
    displayName: null,
    primitive: "Signal",
    stackError: new Error(),
    value: value(),
    dispatcherHookName: "Signal",
  });

  return [value, () => {}];
}

function useOptimistic<S, A>(passthrough: S, reducer?: (S, A) => S): [S, (A) => void] {
  const hook = nextHook();

  // TODO update
  // @ts-ignore
  if (hook && hook.type !== 16) {
    throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
  }

  const state = hook ? hook.result?.value : passthrough;

  hookLog.push({
    displayName: null,
    primitive: "Optimistic",
    stackError: new Error(),
    value: state,
    dispatcherHookName: "Optimistic",
  });
  return [state, (action: A) => {}];
}

const Dispatcher = {
  readContext,

  use,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useInsertionEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useDebugValue,
  useDeferredValue,
  useTransition,
  useSyncExternalStore,
  useId,
  useSignal,
  useOptimistic,
};

export type DispatcherType = typeof Dispatcher & { proxy: typeof Dispatcher | null };

// create a proxy to throw a custom error
// in case future versions of React adds more hooks
const DispatcherProxyHandler = {
  get(target: DispatcherType, prop: string) {
    if (Object.prototype.hasOwnProperty.call(target, prop)) {
      return target[prop];
    }
    const error = new Error("Missing method in Dispatcher: " + prop);
    // Note: This error name needs to stay in sync with react-devtools-shared
    // TODO: refactor this if we ever combine the devtools and debug tools packages
    error.name = "ReactDebugToolsUnsupportedHookError";
    throw error;
  },
};

// `Proxy` may not exist on some platforms
const DispatcherProxy = typeof Proxy === "undefined" ? Dispatcher : new Proxy(Dispatcher, DispatcherProxyHandler);

// Inspect

export type HookSource = {
  lineNumber: number | null;
  columnNumber: number | null;
  fileName: string | null;
  functionName: string | null;
};

export type HooksNode = {
  id: number | null;
  isStateEditable: boolean;
  name: string;
  value: any;
  subHooks: Array<HooksNode>;
  hookSource: null | HookSource;
};
export type HooksTree = Array<HooksNode>;

// Don't assume
//
// We can't assume that stack frames are nth steps away from anything.
// E.g. we can't assume that the root call shares all frames with the stack
// of a hook call. A simple way to demonstrate this is wrapping `new Error()`
// in a wrapper constructor like a polyfill. That'll add an extra frame.
// Similar things can happen with the call to the dispatcher. The top frame
// may not be the primitive.
//
// We also can't assume that the last frame of the root call is the same
// frame as the last frame of the hook call because long stack traces can be
// truncated to a stack trace limit.

let mostLikelyAncestorIndex = 0;

function findSharedIndex(hookStack: any, rootStack: any, rootIndex: number) {
  const source = rootStack[rootIndex].source;
  hookSearch: for (let i = 0; i < hookStack.length; i++) {
    if (hookStack[i].source === source) {
      // This looks like a match. Validate that the rest of both stack match up.
      for (let a = rootIndex + 1, b = i + 1; a < rootStack.length && b < hookStack.length; a++, b++) {
        if (hookStack[b].source !== rootStack[a].source) {
          // If not, give up and try a different match.
          continue hookSearch;
        }
      }
      return i;
    }
  }
  return -1;
}

function findCommonAncestorIndex(rootStack: any, hookStack: any) {
  let rootIndex = findSharedIndex(hookStack, rootStack, mostLikelyAncestorIndex);
  if (rootIndex !== -1) {
    return rootIndex;
  }
  // If the most likely one wasn't a hit, try any other frame to see if it is shared.
  // If that takes more than 5 frames, something probably went wrong.
  for (let i = 0; i < rootStack.length && i < 5; i++) {
    rootIndex = findSharedIndex(hookStack, rootStack, i);
    if (rootIndex !== -1) {
      mostLikelyAncestorIndex = i;
      return rootIndex;
    }
  }
  return -1;
}

function isReactWrapper(functionName: any, wrapperName: string) {
  const hookName = parseHookName(functionName);
  if (wrapperName === "HostTransitionStatus") {
    return hookName === wrapperName || hookName === "FormStatus";
  }

  return hookName === wrapperName;
}

function findPrimitiveIndex(hookStack: any, hook: HookLogEntry) {
  const stackCache = getPrimitiveStackCache();
  const primitiveStack = stackCache.get(hook.primitive);
  if (primitiveStack === undefined) {
    return -1;
  }
  for (let i = 0; i < primitiveStack.length && i < hookStack.length; i++) {
    // Note: there is no guarantee that we will find the top-most primitive frame in the stack
    // For React Native (uses Hermes), these source fields will be identical and skipped
    if (primitiveStack[i].source !== hookStack[i].source) {
      // If the next two frames are functions called `useX` then we assume that they're part of the
      // wrappers that the React package or other packages adds around the dispatcher.
      if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.dispatcherHookName)) {
        i++;
      }
      if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.dispatcherHookName)) {
        i++;
      }

      return i;
    }
  }
  return -1;
}

function parseTrimmedStack(rootStack: any, hook: HookLogEntry) {
  // Get the stack trace between the primitive hook function and
  // the root function call. I.e. the stack frames of custom hooks.
  const hookStack = ErrorStackParser.parse(hook.stackError);
  const rootIndex = findCommonAncestorIndex(rootStack, hookStack);
  const primitiveIndex = findPrimitiveIndex(hookStack, hook);
  if (rootIndex === -1 || primitiveIndex === -1 || rootIndex - primitiveIndex < 2) {
    if (primitiveIndex === -1) {
      // Something went wrong. Give up.
      return [null, null];
    } else {
      return [hookStack[primitiveIndex - 1], null];
    }
  }
  return [hookStack[primitiveIndex - 1], hookStack.slice(primitiveIndex, rootIndex - 1)];
}

function parseHookName(functionName: void | string): string {
  if (!functionName) {
    return "";
  }
  let startIndex = functionName.lastIndexOf("[as ");

  if (startIndex !== -1) {
    // Workaround for sourcemaps in Jest and Chrome.
    // In `node --enable-source-maps`, we don't see "Object.useHostTransitionStatus [as useFormStatus]" but "Object.useFormStatus"
    // "Object.useHostTransitionStatus [as useFormStatus]" -> "useFormStatus"
    return parseHookName(functionName.slice(startIndex + "[as ".length, -1));
  }
  startIndex = functionName.lastIndexOf(".");
  if (startIndex === -1) {
    startIndex = 0;
  } else {
    startIndex += 1;
  }

  if (functionName.slice(startIndex).startsWith("unstable_")) {
    startIndex += "unstable_".length;
  }

  if (functionName.slice(startIndex).startsWith("experimental_")) {
    startIndex += "experimental_".length;
  }

  if (functionName.slice(startIndex, startIndex + 3) === "use") {
    if (functionName.length - startIndex === 3) {
      return "Use";
    }
    startIndex += 3;
  }
  return functionName.slice(startIndex);
}

function buildTree(rootStack: any, readHookLog: Array<HookLogEntry>): HooksTree {
  const rootChildren: Array<HooksNode> = [];
  let prevStack = null;
  let levelChildren = rootChildren;
  let nativeHookID = 0;
  const stackOfChildren = [];
  for (let i = 0; i < readHookLog.length; i++) {
    const hook = readHookLog[i];
    const parseResult = parseTrimmedStack(rootStack, hook);
    const primitiveFrame = parseResult[0];
    let stack = parseResult[1];
    let displayName = hook.displayName;
    if (displayName === null && primitiveFrame !== null) {
      displayName =
        // @ts-ignore
        parseHookName(primitiveFrame?.functionName) ||
        // Older versions of React do not have sourcemaps.
        // In those versions there was always a 1:1 mapping between wrapper and dispatcher method.
        parseHookName(hook.dispatcherHookName);
    }
    if (stack !== null) {
      stack = Array.isArray(stack) ? stack : [stack];
      // Note: The indices 0 <= n < length-1 will contain the names.
      // The indices 1 <= n < length will contain the source locations.
      // That's why we get the name from n - 1 and don't check the source
      // of index 0.
      let commonSteps = 0;
      if (prevStack !== null) {
        // Compare the current level's stack to the new stack.
        while (commonSteps < stack.length && commonSteps < prevStack.length) {
          const stackSource = stack[stack.length - commonSteps - 1].source;
          const prevSource = prevStack[prevStack.length - commonSteps - 1].source;
          if (stackSource !== prevSource) {
            break;
          }
          commonSteps++;
        }
        // Pop back the stack as many steps as were not common.
        for (let j = prevStack.length - 1; j > commonSteps; j--) {
          // $FlowFixMe[incompatible-type]
          levelChildren = stackOfChildren.pop();
        }
      }
      // The remaining part of the new stack are custom hooks. Push them
      // to the tree.
      for (let j = stack.length - commonSteps - 1; j >= 1; j--) {
        const children: Array<HooksNode> = [];
        const stackFrame = stack[j];
        const levelChild: HooksNode = {
          id: null,
          isStateEditable: false,
          name: parseHookName(stack[j - 1].functionName),
          value: undefined,
          subHooks: children,
          hookSource: {
            lineNumber: stackFrame.lineNumber,
            columnNumber: stackFrame.columnNumber,
            functionName: stackFrame.functionName,
            fileName: stackFrame.fileName,
          },
        };

        levelChildren.push(levelChild);
        stackOfChildren.push(levelChildren);
        levelChildren = children;
      }
      prevStack = stack;
    }
    const { primitive } = hook;

    const id = nativeHookID++;

    // For the time being, only State and Reducer hooks support runtime overrides.
    const isStateEditable = primitive === "Reducer" || primitive === "State";
    const name = displayName || primitive;
    const levelChild: HooksNode = {
      id,
      isStateEditable,
      name,
      value: hook.value,
      subHooks: [],
      hookSource: null,
    };

    const hookSource: HookSource = {
      lineNumber: null,
      functionName: null,
      fileName: null,
      columnNumber: null,
    };
    if (stack && Array.isArray(stack) && stack.length >= 1) {
      const stackFrame = stack[0];
      hookSource.lineNumber = stackFrame.lineNumber;
      hookSource.functionName = stackFrame.functionName;
      hookSource.fileName = stackFrame.fileName;
      hookSource.columnNumber = stackFrame.columnNumber;
    }

    levelChild.hookSource = hookSource;

    levelChildren.push(levelChild);
  }

  // Associate custom hook values (useDebugValue() hook entries) with the correct hooks.
  processDebugValues(rootChildren, null);

  return rootChildren;
}

// Custom hooks support user-configurable labels (via the special useDebugValue() hook).
// That hook adds user-provided values to the hooks tree,
// but these values aren't intended to appear alongside of the other hooks.
// Instead they should be attributed to their parent custom hook.
// This method walks the tree and assigns debug values to their custom hook owners.
function processDebugValues(hooksTree: HooksTree, parentHooksNode: HooksNode | null): void {
  const debugValueHooksNodes: Array<HooksNode> = [];

  for (let i = 0; i < hooksTree.length; i++) {
    const hooksNode = hooksTree[i];
    if (hooksNode.name === "DebugValue" && hooksNode.subHooks.length === 0) {
      hooksTree.splice(i, 1);
      i--;
      debugValueHooksNodes.push(hooksNode);
    } else {
      processDebugValues(hooksNode.subHooks, hooksNode);
    }
  }

  // Bubble debug value labels to their custom hook owner.
  // If there is no parent hook, just ignore them for now.
  // (We may warn about this in the future.)
  if (parentHooksNode !== null) {
    if (debugValueHooksNodes.length === 1) {
      parentHooksNode.value = debugValueHooksNodes[0].value;
    } else if (debugValueHooksNodes.length > 1) {
      parentHooksNode.value = debugValueHooksNodes.map(({ value }) => value);
    }
  }
}

function handleRenderFunctionError(error: any): void {
  // original error might be any type.
  if (error === SuspenseException) {
    // An uncached Promise was used. We can't synchronously resolve the rest of
    // the Hooks but we can at least show what ever we got so far.
    return;
  }
  if (isPromise(error)) {
    return;
  }
  if (error instanceof Error && error.name === "ReactDebugToolsUnsupportedHookError") {
    throw error;
  }
  // If the error is not caused by an unsupported feature, it means
  // that the error is caused by user's code in renderFunction.
  // In this case, we should wrap the original error inside a custom error
  // so that devtools can give a clear message about it.
  // @ts-ignore
  const wrapperError = new Error("Error rendering inspected component", {
    cause: error,
  });
  // Note: This error name needs to stay in sync with react-devtools-shared
  // TODO: refactor this if we ever combine the devtools and debug tools packages
  wrapperError.name = "ReactDebugToolsRenderError";
  // this stage-4 proposal is not supported by all environments yet.
  // @ts-ignore
  wrapperError.cause = error;
  throw wrapperError;
}

function inspectHooks<Props>(renderFunction: (p: Props) => any, props: Props, currentDispatcher: { current: DispatcherType }): HooksTree {
  // DevTools will pass the current renderer's injected dispatcher.
  // Other apps might compile debug hooks as part of their app though.

  currentDispatcher.current.proxy = DispatcherProxy;

  let readHookLog;

  let ancestorStackError;

  try {
    ancestorStackError = new Error();

    renderFunction(props);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    readHookLog = hookLog;

    hookLog = [];

    currentDispatcher.current.proxy = null;
  }

  const rootStack = ErrorStackParser.parse(ancestorStackError);

  return buildTree(rootStack, readHookLog);
}

function inspectHooksOfForwardRef<Props, Ref>(
  renderFunction: (Props, Ref) => any,
  props: Props,
  ref: Ref,
  currentDispatcher: { current: DispatcherType }
): HooksTree {
  currentDispatcher.current.proxy = DispatcherProxy;

  let readHookLog;

  let ancestorStackError;

  try {
    ancestorStackError = new Error();

    renderFunction(props, ref);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    readHookLog = hookLog;

    hookLog = [];

    currentDispatcher.current.proxy = null;
  }
  const rootStack = ErrorStackParser.parse(ancestorStackError);

  return buildTree(rootStack, readHookLog);
}

export function inspectHooksOfFiber(fiber: MyReactFiberNode, dispatch: { current: DispatcherType }): HooksTree {
  if (!include(fiber.type, NODE_TYPE.__function__)) {
    return;
  }

  // Warm up the cache so that it doesn't consume the currentHook.
  getPrimitiveStackCache();

  // Set up the current hook so that we can step through and read the
  // current state from them.
  currentHookNode = fiber.hookList.head as ListTreeNode<MyReactHookNode>;
  currentFiber = fiber;

  const typedElementType = fiber.elementType as MixinMyReactFunctionComponent;

  const props = fiber.memoizedProps;

  try {
    if (include(fiber.type, NODE_TYPE.__forwardRef__)) {
      return inspectHooksOfForwardRef(typedElementType, props, fiber.ref, dispatch);
    } else {
      return inspectHooks(typedElementType, props, dispatch);
    }
  } finally {
    currentHookNode = null;
    currentFiber = null;
  }
}
