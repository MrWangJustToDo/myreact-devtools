import { wsClient } from "./ws-share";

import type { WebSocketClient } from "./ws-share";

let connectSocket: WebSocketClient | null = null;

export const initBundleWS_DEV = async (url: string) => {
  console.log("[@my-react-devtool/hook] start a app devtool (websocket)");

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();

  connectSocket = wsClient({ url, name: "bundle-app-engine" });
};

initBundleWS_DEV.close = () => {
  connectSocket?.close?.();

  connectSocket = null;
};
