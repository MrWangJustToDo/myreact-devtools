import { useAppTree } from "@/hooks/useAppTree";
import { useChunk } from "@/hooks/useChunk";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useGlobalThis } from "@/hooks/useGlobalThis";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useHookValue } from "@/hooks/useHookValue";
import { useNodeName } from "@/hooks/useNodeName";
import { useRunningCount } from "@/hooks/useRunningCount";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";
import { useTriggerHover } from "@/hooks/useTriggerState";
import { useUnmountNode } from "@/hooks/useUnmountNode";

import { isServer } from "./isServer";

export const onClear = () => {
  useChunk?.getActions?.()?.clear?.();
  useAppTree?.getActions?.()?.clear?.();
  useNodeName?.getActions?.()?.clear?.();
  useSelectNode?.getActions?.()?.clear?.();
  useDetailNode?.getActions?.()?.clear?.();
  useHMRNode?.getActions?.()?.clear?.();
  useContextMenu?.getActions?.()?.clear?.();
  useTriggerNode?.getActions?.()?.clear?.();
  useTriggerHover?.getActions?.()?.clear?.();
  useHighlightNode?.getActions?.()?.clear?.();
  useDetailNodeExt?.getActions?.()?.clear?.();
  useUnmountNode?.getActions?.()?.onClear?.();
  useRunningCount?.getActions?.()?.clear?.();
  useHookValue.getActions?.()?.clear?.();
  useGlobalThis.getActions?.()?.clear?.();
};

if (!isServer) {
  window.onClear = onClear;
}
