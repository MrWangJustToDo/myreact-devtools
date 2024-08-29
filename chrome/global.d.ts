import { useAppTree } from "@/hooks/useAppTree";
import { useConnect } from "@/hooks/useConnect";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useConfig } from "@/hooks/useConfig";
import { useTriggerNode } from "@/hooks/useTriggerNode";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { io } from "socket.io-client";
import type { CustomRenderDispatch, CustomRenderPlatform, initHMR } from "@my-react/react-reconciler";

declare global {
  interface Window {
    __MY_REACT_DEVTOOL_RUNTIME__: (dispatch: CustomRenderDispatch, platform: CustomRenderPlatform, initHMR: typeof initHMR) => void;

    "__@my-react/react-inject__": (runtime: Window["__MY_REACT_DEVTOOL_RUNTIME__"], dispatch: CustomRenderDispatch, platform: CustomRenderPlatform) => void;

    "__@my-react/dispatch__": CustomRenderDispatch[];

    useAppTree: typeof useAppTree;

    io: typeof io;

    useTriggerNode: typeof useTriggerNode;

    useDetailNode: typeof useDetailNode;

    useTreeNode: typeof useTreeNode;

    useConnect: typeof useConnect;

    useNodeName: typeof useNodeName;

    useHMRNode: typeof useHMRNode;

    useHighlightNode: typeof useHighlightNode;

    useConfig: typeof useConfig;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MODE?: "web";
    }
  }
}

export {};
