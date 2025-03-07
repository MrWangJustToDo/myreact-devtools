import { DevToolMessageType } from "@my-react-devtool/core";
import { CustomRenderDispatch, CustomRenderPlatform } from "@my-react/react-reconciler";
import { UseSelectorWithState } from "reactivity-store";
import { io } from "socket.io-client";

declare global {
  const __DEV__: boolean;
  const __VERSION__: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }

  interface Window {
    onListener: (postMessage: (data: any) => void) => () => void;

    onRender: (data: DevToolMessageType) => void;

    onClear: () => void;

    useConnect: UseSelectorWithState<
      { state: boolean },
      {
        connect: () => void;
        disconnect: () => void;
        setError: (r?: string) => void;
        setRender: (r?: boolean) => void;
        setConnectHandler: (cb: () => void) => void;
      }
    >;

    __MY_REACT_DEVTOOL_RUNTIME__?: ((dispatch: CustomRenderDispatch, platform?: CustomRenderPlatform) => void) & { init: () => void };

    ["__@my-react/dispatch__"]?: CustomRenderDispatch[];

    io: typeof io;
  }
}

export {};
