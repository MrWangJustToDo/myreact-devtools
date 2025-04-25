// support debug more platform

import { core } from "./core";
import { onMessageFromPanelOrWorkerOrDetector } from "./message";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

export const initNODE_DEV = async (url: string) => {
  if (typeof process !== "object" || typeof globalThis.io !== "function") return;

  if (__DEV__) {
    console.log("[@my-react-devtool/hook] start a node devtool");
  }

  globalThis["__@my-react/dispatch__"]?.forEach((d) => globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.(d));

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  const socket = globalThis.io(url, {
    reconnection: true, // 是否自动重新连接
    reconnectionAttempts: Infinity, // 重新连接尝试次数
    reconnectionDelay: 1000, // 初始重新连接延迟(ms)
    reconnectionDelayMax: 5000, // 最大重新连接延迟(ms)
    timeout: 8000, // 连接超时时间(ms)
  });

  connectSocket = socket;

  let unSubscribe = () => {};

  socket.on("connect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket connected");
    }

    unSubscribe = core.subscribe((message) => {
      socket.emit("render", message);
    });
  });

  socket.on("disconnect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket disconnected");
    }

    unSubscribe();

    core.disconnect();
  });

  socket.on("action", (data) => {
    onMessageFromPanelOrWorkerOrDetector(data);
  });

  return socket;
};

initNODE_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
