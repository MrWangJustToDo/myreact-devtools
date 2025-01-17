import { core } from "./core";
import { onMessageFromPanelOrWorkerOrDetector } from "./message";
import { loadScript } from "./tool";

import type { Socket } from "socket.io-client";

let connectSocket: Socket | null = null;

export const initWEB_DEV = async (url: string) => {
  if (typeof window === "undefined") return;

  console.log("[@my-react-devtool/hook] start a web ui devtool");

  if (!window.io) {
    await loadScript("https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js");
  }

  window["__@my-react/dispatch__"]?.forEach((d) => window.__MY_REACT_DEVTOOL_RUNTIME__?.(d));

  window.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  const socket = window.io(url);

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

  socket.emit("web-dev", { name: window.document.title, url: window.location.href });
};

initWEB_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
