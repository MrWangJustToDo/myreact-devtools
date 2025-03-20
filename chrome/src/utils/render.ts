import { addToast } from "@heroui/react";
import { DevToolMessageEnum } from "@my-react-devtool/core";

import { useAppTree } from "@/hooks/useAppTree";
import { useChunk } from "@/hooks/useChunk";
import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import { isServer } from "./isServer";

import type { DevToolMessageType, HMRStatus, NodeValue, PlainNode, Tree } from "@my-react-devtool/core";

export const safeAction = (cb: () => void) => {
  try {
    cb();
  } catch (e) {
    const typedE = e as Error;

    useConnect.getActions().setError(typedE.message);
  }
};

export const onRender = (data: DevToolMessageType) => {
  if (data.type === DevToolMessageEnum.init) {
    const detector = data.data as boolean;

    safeAction(() => {
      const { setRender } = useConnect.getActions();

      setRender(detector);
    });
  }

  if (data.type === DevToolMessageEnum.dir) {
    const node = data.data as Record<string, string>;

    safeAction(() => {
      const { set } = useNodeName.getActions();

      set(node);
    });
  }

  if (data.type === DevToolMessageEnum.ready) {
    const node = data.data as Tree;

    safeAction(() => {
      const { addNode } = useAppTree.getActions();

      if (node) {
        addNode(node);
      }

      chrome.devtools?.inspectedWindow?.eval?.(`(() => {
        if (window['$$$$0'] !== $0) {
          window.__MY_REACT_DEVTOOL_INTERNAL__?.setSelectDom?.($0);
          window.__MY_REACT_DEVTOOL_INTERNAL__?.notifySelectSync?.();
          window['$$$$0'] = $0;
        }
      })()`);
    });
  }

  if (data.type === DevToolMessageEnum.unmount) {
    safeAction(() => {
      useChunk.getActions().clear();
      useAppTree.getActions().clear();
      useNodeName.getActions().clear();
      useSelectNode.getActions().clear();
      useDetailNode.getActions().clear();
      useContextMenu.getActions().clear?.();
    });
  }

  if (data.type === DevToolMessageEnum["select-unmount"]) {
    safeAction(() => {
      useSelectNode.getActions().clearSelect?.();
    });
  }

  if (data.type === DevToolMessageEnum["select-sync"]) {
    safeAction(() => {
      useSelectNode.getActions().setSelect(data.data as string);
      useSelectNode.getActions().scrollIntoView();
    });
  }

  if (data.type === DevToolMessageEnum.hmr) {
    const nodes = data.data as Record<string, number>;

    safeAction(() => {
      const { update } = useHMRNode.getActions();

      update(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.hmrStatus) {
    const nodes = data.data as HMRStatus[];

    safeAction(() => {
      const { updateHMRStatus } = useDetailNodeExt.getActions();

      updateHMRStatus(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.trigger) {
    const nodes = data.data as Record<string, number>;

    safeAction(() => {
      const { update } = useTriggerNode.getActions();

      update(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.triggerStatus) {
    const nodes = data.data as NodeValue[];

    safeAction(() => {
      const { updateTriggerStatus } = useDetailNodeExt.getActions();

      updateTriggerStatus(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.detail) {
    const node = data.data as PlainNode;

    safeAction(() => {
      const { addNode, setLoading } = useDetailNode.getActions();

      if (node) {
        addNode(node);

        setLoading(false);
      }
    });
  }

  if (data.type === DevToolMessageEnum.source) {
    if (chrome?.devtools?.inspectedWindow?.eval) {
      chrome?.devtools?.inspectedWindow?.eval("window.__MY_REACT_DEVTOOL_INTERNAL__?.inspectSource?.()");
    } else {
      addToast({ severity: "danger", description: "inspect not support", title: "error", color: "danger" });
    }
  }

  if (data.type === DevToolMessageEnum.highlight) {
    const node = data.data as { id: string; type: string };

    safeAction(() => {
      const { highlightNode } = useHighlightNode.getActions();

      highlightNode(node.id, node.type);
    });
  }

  if (data.type === DevToolMessageEnum.config) {
    const config = data.data as { enableHover: boolean; enableUpdate: boolean; enableHoverOnBrowser: boolean };

    safeAction(() => {
      const { setEnableHover, setEnableUpdate, setEnableHoverOnBrowser } = useConfig.getActions();

      setEnableHover(config?.enableHover);

      setEnableUpdate(config?.enableUpdate);

      setEnableHoverOnBrowser(config?.enableHoverOnBrowser);
    });
  }

  if (data.type === DevToolMessageEnum.chunks) {
    const chunks = data.data as Record<number | string, { loaded: NodeValue }>;

    safeAction(() => {
      const { setChunk } = useChunk.getActions();

      setChunk(chunks);
    });
  }

  if (data.type === DevToolMessageEnum.warn) {
    const warn = data.data as Record<string, number>;

    safeAction(() => {
      const { setWarn } = useHighlightNode.getActions();

      setWarn(warn);
    });
  }

  if (data.type === DevToolMessageEnum.warnStatus) {
    const warn = data.data as NodeValue[];

    safeAction(() => {
      const { updateWarnStatus } = useDetailNodeExt.getActions();

      updateWarnStatus(warn);
    });
  }

  if (data.type === DevToolMessageEnum.error) {
    const error = data.data as Record<string, number>;

    safeAction(() => {
      const { setError } = useHighlightNode.getActions();

      setError(error);
    });
  }

  if (data.type === DevToolMessageEnum.errorStatus) {
    const error = data.data as NodeValue[];

    safeAction(() => {
      const { updateErrorStatus } = useDetailNodeExt.getActions();

      updateErrorStatus(error);
    });
  }

  if (data.type === DevToolMessageEnum["dom-hover"]) {
    const id = data.data as string;

    safeAction(() => {
      const { setSelect, scrollIntoView, clearSelect } = useSelectNode.getActions();

      clearSelect();

      setSelect(id);

      scrollIntoView();
    });
  }

  if (data.type === DevToolMessageEnum.message) {
    const re = data.data as { message: string; type: "success" | "error" | "info" | "warning" };

    switch (re.type) {
      case "success":
        addToast({ severity: "success", description: re.message, title: "success", color: "success" });
        break;
      case "error":
        addToast({ severity: "danger", description: re.message, title: "error", color: "danger" });
        break;
      case "info":
        addToast({ severity: "secondary", description: re.message, title: "info", color: "secondary" });
        break;
      case "warning":
        addToast({ severity: "warning", description: re.message, title: "warning", color: "warning" });
        break;
      default:
        addToast({ severity: "default", description: re.message, title: "default", color: "default" });
    }
  }
};

if (!isServer) {
  window.onRender = onRender;
}
