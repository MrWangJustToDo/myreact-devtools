import { isNormalEquals } from "@my-react/react-shared";

import { HMRStatus } from "../event";
import { deleteLinkState, tryLinkStateToHookIndex } from "../hook";
import { getPlainNodeIdByFiber, inspectList } from "../tree";
import { debounce, throttle } from "../utils";

import type { DevToolCore } from "../instance";
import type { DevToolRenderDispatch } from "../setup";
import type { PlainNode } from "../tree";
import type { MyReactFiberNode, UpdateState } from "@my-react/react-reconciler";
import type { ListTree } from "@my-react/react-shared";

export const patchEvent = (dispatch: DevToolRenderDispatch, runtime: DevToolCore) => {
  if (dispatch["$$hasDevToolEvent"]) return;

  dispatch["$$hasDevToolEvent"] = true;

  const onLoad = throttle(() => {
    if (!runtime.hasEnable) return;

    runtime.notifyDispatch(dispatch);

    runtime.notifySelect();

    runtime.notifyHMRStatus();

    runtime.notifyHMRExtend();

    runtime.notifyTriggerStatus();

    runtime.notifyWarnStatus();

    runtime.notifyErrorStatus();
  }, 200);

  const onTrace = () => {
    if (!runtime.hasEnable) return;

    if (!runtime._enableUpdate) return;

    runtime.update.flushPending();
  };

  const notifyChangedWithDebounce = debounce((list: ListTree<MyReactFiberNode>) => runtime.notifyChanged(list), 100);

  const onChange = (list: ListTree<MyReactFiberNode>) => {
    if (!runtime.hasEnable) return;

    const { directory } = inspectList(list);

    if (!isNormalEquals(runtime._dir, directory)) {
      runtime._dir = { ...directory };

      runtime.notifyDir();
    }

    notifyChangedWithDebounce(list);
  };

  const onUnmount = () => {
    // if (!runtime.hasEnable) return;

    runtime._needUnmount = true;

    runtime.delDispatch(dispatch);
  };

  const notifyTriggerWithThrottle = throttle(() => runtime.notifyTrigger(), 100);

  const onFiberTrigger = (fiber: MyReactFiberNode, state: UpdateState) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    runtime._trigger[id] = runtime._trigger[id] || [];

    // 长数据过滤
    if (runtime._trigger[id].length > 10) {
      const index = runtime._trigger[id].length - 11;
      if (runtime._trigger[id][index]) {
        deleteLinkState(runtime._trigger[id][index] as UpdateState);
      }
      runtime._trigger[id][index] = { isRetrigger: runtime._trigger[id][index].isRetrigger };
    }

    tryLinkStateToHookIndex(fiber, state);

    runtime._trigger[id].push(state);

    if (!runtime.hasEnable) return;

    notifyTriggerWithThrottle();
  };

  const onFiberUpdate = (fiber: MyReactFiberNode) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    if (!runtime.hasEnable) return;

    if (id === runtime._selectId) {
      runtime.notifySelect();

      runtime.notifyHMRStatus();

      runtime.notifyHMRExtend();

      runtime.notifyTriggerStatus();

      runtime.notifyWarnStatus();

      runtime.notifyErrorStatus();
    }
  };

  const onFiberState = (fiber: MyReactFiberNode) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    runtime._state[id] = runtime._state[id] ? runtime._state[id] + 1 : 1;
  };

  const onFiberHMR = (fiber: MyReactFiberNode, forceRefresh?: boolean) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    runtime._hmr[id] = runtime._hmr[id] || [];

    runtime._hmr[id].push(typeof forceRefresh === "boolean" ? (forceRefresh ? HMRStatus.remount : HMRStatus.refresh) : HMRStatus.none);

    if (!runtime.hasEnable) return;

    runtime.notifyHMR();

    runtime.notifyDispatch(dispatch, true);
  };

  const onFiberWarn = (fiber: MyReactFiberNode, ...args: any[]) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    runtime._warn[id] = runtime._warn[id] || [];

    if (runtime._warn[id].length > 10) {
      const index = runtime._warn[id].length - 11;
      runtime._warn[id][index] = 1;
    }

    runtime._warn[id].push(args);

    runtime.notifyWarn();
  };

  const onFiberError = (fiber: MyReactFiberNode, ...args: any[]) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    runtime._error[id] = runtime._error[id] || [];

    if (runtime._error[id].length > 10) {
      const index = runtime._error[id].length - 11;
      runtime._error[id][index] = 1;
    }

    runtime._error[id].push(args);

    runtime.notifyError();
  };

  const onFiberRun = (fiber: MyReactFiberNode) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    if (!runtime._selectNode) return;

    const selectTree = (runtime._selectNode as PlainNode)._t || [];

    if (!selectTree.includes(id)) return;

    runtime.notifyRunning(id);
  };

  const onPerformanceWarn = (fiber: MyReactFiberNode) => {
    const id = getPlainNodeIdByFiber(fiber);

    if (!id) return;

    if (runtime.hasEnable && runtime._enableUpdate) {
      runtime.update.addPending(fiber, "warn");
    }

    runtime.notifyHighlight(id, "performance");
  };

  const onDOMUpdate = (fiber: MyReactFiberNode) => {
    if (runtime.hasEnable && runtime._enableUpdate) {
      runtime.update.addPending(fiber, "update");
    }
  };

  const onDOMAppend = (fiber: MyReactFiberNode) => {
    if (runtime.hasEnable && runtime._enableUpdate) {
      runtime.update.addPending(fiber, "append");
    }
  };

  const onDOMSetRef = (fiber: MyReactFiberNode) => {
    if (runtime.hasEnable && runtime._enableUpdate) {
      runtime.update.addPending(fiber, "setRef");
    }
  };

  if (typeof dispatch.onFiberTrigger === "function") {
    if (typeof dispatch.onAfterCommitMount === "function") {
      dispatch.onAfterCommitMount(onLoad);

      dispatch.onAfterCommitUpdate(onTrace);

      dispatch.onAfterCommitUnmount(onUnmount);
    } else {
      dispatch.onAfterCommit(onLoad);

      dispatch.onAfterUpdate(onTrace);

      dispatch.onAfterUnmount?.(onUnmount);
    }

    dispatch.onFiberState?.(onFiberState);

    dispatch.onFiberTrigger?.(onFiberTrigger);

    dispatch.onPerformanceWarn?.(onPerformanceWarn);

    dispatch.onFiberChange?.(onChange);

    dispatch.onFiberUpdate?.(onFiberUpdate);

    dispatch.onAfterFiberRun?.(onFiberRun);

    dispatch.onFiberHMR?.(onFiberHMR);

    dispatch.onDOMUpdate?.(onDOMUpdate);

    dispatch.onDOMAppend?.(onDOMAppend);

    dispatch.onDOMSetRef?.(onDOMSetRef);

    dispatch.onFiberError?.(onFiberError);

    dispatch.onFiberWarn?.(onFiberWarn);
  } else {
    const originalAfterCommit = dispatch.afterCommit;

    const originalAfterUpdate = dispatch.afterUpdate;

    const originalAfterUnmount = dispatch.afterUnmount;

    dispatch.afterCommit = function (this: DevToolRenderDispatch) {
      originalAfterCommit?.call?.(this);

      onLoad();
    };

    // TODO `global patch` flag for performance
    dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
      originalAfterUpdate?.call?.(this);

      onLoad();
    };

    dispatch.afterUnmount = function (this: DevToolRenderDispatch) {
      originalAfterUnmount?.call?.(this);

      onUnmount();
    };
  }
};
