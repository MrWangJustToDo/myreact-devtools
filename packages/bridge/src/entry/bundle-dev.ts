import "socket.io-client/dist/socket.io.js";

import { socketClient } from "./socket-share";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

// 打包 socket io 调试
export const initBundle_DEV = async (url: string) => {
  console.log("[@my-react-devtool/hook] start a app devtool");

  if (!globalThis["io"]) return null;

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  connectSocket = socketClient({ io: globalThis.io, url, name: "bundle-app-engine" });
};

initBundle_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
