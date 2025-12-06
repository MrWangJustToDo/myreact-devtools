import { useConnect } from "@/hooks/useConnect";
import { io } from "socket.io-client";
import type { DevToolMessageType } from "@my-react-devtool/core";
import type { CustomRenderDispatch, CustomRenderPlatform, initHMR } from "@my-react/react-reconciler";
import { useAppTree } from "@/hooks/useAppTree";

declare global {

  interface Window {
    __MY_REACT_DEVTOOL_RUNTIME__: (dispatch: CustomRenderDispatch, platform: CustomRenderPlatform, initHMR: typeof initHMR) => void;

    "__@my-react/react-inject__": (runtime: Window["__MY_REACT_DEVTOOL_RUNTIME__"], dispatch: CustomRenderDispatch, platform: CustomRenderPlatform) => void;

    "__@my-react/dispatch__": CustomRenderDispatch[];

    useConnect: typeof useConnect;

    useAppTree: typeof useAppTree;

    io: typeof io;

    onListener: (postMessage: (data: any) => void) => void;

    onRender: (data: DevToolMessageType) => void;

    onClear: () => void;

    $$$$0: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MODE?: "web" | "local";
    }
  }
}

export {};
