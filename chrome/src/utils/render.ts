import { DevToolMessageEnum } from "@my-react-devtool/core";
import { toast } from "sonner";

import { useAppTree } from "@/hooks/useAppTree";
import { useChunk } from "@/hooks/useChunk";
import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useRunNode } from "@/hooks/useRunNode";
import { useTreeNode } from "@/hooks/useTreeNode";
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
    });
  }

  if (data.type === DevToolMessageEnum.unmount) {
    safeAction(() => {
      useChunk.getActions().clear();
      useAppTree.getActions().clear();
      useNodeName.getActions().clear();
      useTreeNode.getActions().clear();
      useDetailNode.getActions().clear();
      useContextMenu.getActions().clear?.();
    });
  }

  if (data.type === DevToolMessageEnum["select-unmount"]) {
    safeAction(() => {
      useTreeNode.getActions().clearSelect?.();
    });
  }

  if (data.type === DevToolMessageEnum['select-sync']) {
    safeAction(() => {
      useTreeNode.getActions().setSelect(data.data as string);
      useTreeNode.getActions().scrollIntoView();
    })
  }

  if (data.type === DevToolMessageEnum.hmr) {
    const nodes = data.data as Record<string, number>;

    safeAction(() => {
      const { update } = useHMRNode.getActions();

      update(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.hmrStatus) {
    const nodes = data.data as Record<string, HMRStatus>;

    safeAction(() => {
      const { updateStatus } = useHMRNode.getActions();

      updateStatus(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.trigger) {
    const nodes = data.data as Record<string, number>;

    safeAction(() => {
      const { update } = useTriggerNode.getActions();

      update(nodes);
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
      toast.error("inspect not support");
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

  if (data.type === DevToolMessageEnum.run) {
    const nodes = data.data as Record<string, { c: number; t?: number }>;

    safeAction(() => {
      const { update } = useRunNode.getActions();

      update(nodes);
    });
  }

  if (data.type === DevToolMessageEnum.chunks) {
    const chunks = data.data as Record<number | string, { loaded: any }>;

    safeAction(() => {
      const { setChunk } = useChunk.getActions();

      setChunk(chunks);
    });
  }

  if (data.type === DevToolMessageEnum.warn) {
    const warn = data.data as Record<string, Array<NodeValue>>;

    safeAction(() => {
      const { setWarn } = useHighlightNode.getActions();

      setWarn(warn);
    });
  }

  if (data.type === DevToolMessageEnum.error) {
    const error = data.data as Record<string, Array<NodeValue>>;

    safeAction(() => {
      const { setError } = useHighlightNode.getActions();

      setError(error);
    });
  }

  if (data.type === DevToolMessageEnum["dom-hover"]) {
    const id = data.data as string;

    safeAction(() => {
      const { setSelect, scrollIntoView, clearSelect } = useTreeNode.getActions();

      clearSelect();

      setSelect(id);

      scrollIntoView();
    });
  }

  if (data.type === DevToolMessageEnum.message) {
    const re = data.data as { message: string; type: "success" | "error" | "info" | "warning" };

    switch (re.type) {
      case "success":
        toast.success(re.message);
        break;
      case "error":
        toast.error(re.message);
        break;
      case "info":
        toast.info(re.message);
        break;
      case "warning":
        toast.warning(re.message);
        break;
      default:
        toast.message(re.message);
    }
  }
};

if (!isServer) {
  window.onRender = onRender;
}
