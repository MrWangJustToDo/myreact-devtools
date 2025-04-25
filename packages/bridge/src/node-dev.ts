// support debug more platform

import { core } from "./core";
import { onMessageFromPanelOrWorkerOrDetector } from "./message";
import { loadScript } from "./tool";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

export const initNODE_DEV = async (url: string) => {
  if (typeof process !== "object") return;

  if (__DEV__) {
    console.log("[@my-react-devtool/hook] start a node devtool");
  }

  if (!globalThis.io) {
    await loadScript("https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js");
  }

  globalThis["__@my-react/dispatch__"]?.forEach((d) => globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.(d));

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  const socket = globalThis.io(url);

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
};

initNODE_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
