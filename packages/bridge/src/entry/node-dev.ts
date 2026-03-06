import { socketClient } from "./socket-share";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

// 通过 Web 端调试 Node.js 应用
export const initNODE_DEV = async (url: string) => {
  if (typeof process !== "object" || typeof globalThis.io !== "function") return;

  if (__DEV__) {
    console.log("[@my-react-devtool/hook] start a node app devtool");
  }

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  connectSocket = socketClient({
    io: globalThis["io"],
    url,
    name: "node-app-engine",
    options: {
      reconnection: true, // 是否自动重新连接
      reconnectionAttempts: Infinity, // 重新连接尝试次数
      reconnectionDelay: 1000, // 初始重新连接延迟(ms)
      reconnectionDelayMax: 5000, // 最大重新连接延迟(ms)
      timeout: 8000, // 连接超时时间(ms)
    },
  });
};

initNODE_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
