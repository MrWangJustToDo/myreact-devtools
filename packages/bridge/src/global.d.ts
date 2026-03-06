import { DevToolMessageType, PlainNode, Tree } from "@my-react-devtool/core";
import { CustomRenderDispatch } from "@my-react/react-reconciler";
import { UseSelectorWithState } from "reactivity-store";
import { io as socketIO } from "socket.io-client";

declare global {
  const __DEV__: boolean;
  const __VERSION__: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }

  var onListener: (postMessage: (data: any) => void) => () => void;

  var onRender: (data: DevToolMessageType) => void;

  var onClear: () => void;

  var useConnect: UseSelectorWithState<
    { state: boolean },
    {
      connect: () => void;
      disconnect: () => void;
      setError: (r?: string) => void;
      setRender: (r?: boolean) => void;
      setConnectHandler: (cb: () => void) => void;
    }
  >;

  var useAppTree: UseSelectorWithState<{ nodes: Tree[]; list: PlainNode[] }, {}>;

  var __MY_REACT_DEVTOOL_RUNTIME__: (((dispatch: CustomRenderDispatch) => void) & { init: () => void; prepare?: () => void }) | undefined;

  var io: typeof socketIO;

  interface Window {
    onListener: typeof onListener;

    onRender: typeof onRender;

    onClear: typeof onClear;

    useConnect: typeof useConnect;

    useAppTree: typeof useAppTree;

    __MY_REACT_DEVTOOL_RUNTIME__?: typeof __MY_REACT_DEVTOOL_RUNTIME__;

    ["__@my-react/dispatch__"]?: CustomRenderDispatch[];

    io: typeof io;
  }

  var __MY_REACT_DEVTOOL_FORWARD__: any;
  var __MY_REACT_DEVTOOL_INTERNAL__: any;
  var __MY_REACT_DEVTOOL_WEB__: any;
  var __MY_REACT_DEVTOOL_IFRAME__: any;
  var __MY_REACT_DEVTOOL_NODE__: any;
  var __MY_REACT_DEVTOOL_BUNDLE__: any;
}

export {};
