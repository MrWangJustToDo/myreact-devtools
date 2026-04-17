import { wsClient } from "./ws-share";

import type { WebSocketClient } from "./ws-share";

let connectSocket: WebSocketClient | null = null;

export const initNodeWS_DEV = async (url: string) => {
  if (typeof process !== "object") return;

  if (__DEV__) {
    console.log("[@my-react-devtool/hook] start a node app devtool (websocket)");
  }

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  connectSocket = wsClient({
    url,
    name: "node-app-engine",
    options: {
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    },
  });
};

initNodeWS_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
