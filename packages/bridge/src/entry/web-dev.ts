import { loadScript } from "../utils";

import { socketClient } from "./socket-share";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

// 通过 Web 端调试 Web 应用
export const initWEB_DEV = async (url: string) => {
  if (typeof window === "undefined") return;

  console.log("[@my-react-devtool/hook] start a web app devtool");

  if (!window.io || !globalThis["io"]) {
    try {
      await loadScript("https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js");
    } catch {
      console.error("[@my-react-devtool/hook] load socket.io-client failed, please add socket.io-client manually");
    }
  }

  window.io = window.io || globalThis["io"];

  window.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  window.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  connectSocket = socketClient({ io: window.io, url, name: "web-app-engine" });
};

initWEB_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
