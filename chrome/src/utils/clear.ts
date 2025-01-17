import { useActiveNode } from "@/hooks/useActiveNode";
import { useAppTree } from "@/hooks/useAppTree";
import { useChunk } from "@/hooks/useChunk";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useRunNode } from "@/hooks/useRunNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import { isServer } from "./isServer";

export const onClear = () => {
  useChunk?.getActions?.()?.clear?.();
  useAppTree?.getActions?.()?.clear?.();
  useNodeName?.getActions?.()?.clear?.();
  useTreeNode?.getActions?.()?.clear?.();
  useDetailNode?.getActions?.()?.clear?.();
  useActiveNode?.getActions()?.clear?.();
  useRunNode?.getActions?.()?.clear?.();
  useHMRNode?.getActions?.()?.clear?.();
  useContextMenu?.getActions?.()?.clear?.();
  useTriggerNode?.getActions?.()?.clear?.();
  useHighlightNode?.getActions?.()?.clear?.();
};

if (!isServer) {
  window.onClear = onClear;
}