import { useAppTree } from "@/hooks/useAppTree";
import type { CustomRenderDispatch, CustomRenderPlatform, initHMR } from "@my-react/react-reconciler";

declare global {
  interface Window {
    __MY_REACT_DEVTOOL_RUNTIME__: (dispatch: CustomRenderDispatch, platform: CustomRenderPlatform, initHMR: typeof initHMR) => void;

    "__@my-react/react-inject__": (runtime: Window["__MY_REACT_DEVTOOL_RUNTIME__"], dispatch: CustomRenderDispatch, platform: CustomRenderPlatform) => void;

    "__@my-react/dispatch__": CustomRenderDispatch[];
    
    useAppTree: typeof useAppTree;
  }
}

export {};
