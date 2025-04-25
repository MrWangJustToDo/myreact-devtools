import { DevToolSource } from "@my-react-devtool/core/event";

import { core } from "./core";
import { loadIframe, loadScript } from "./tool";
import { sourceFrom } from "./type";

let close = () => {};

export const initIFRAME_DEV = async (origin: string, token?: string) => {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  if (typeof window.__MY_REACT_DEVTOOL_RUNTIME__ !== "function") {
    await loadScript(`${origin}/bundle/hook.js`);
  }

  const bridgeUrl = `${origin}/bridge`;

  const bridgeView = `${origin}/devTool`;

  const bridgeToken = token || Math.random().toString(36).slice(2);

  document.querySelectorAll(".my-react-devtool-bridge")?.forEach?.((el) => el.remove());

  const bridgeIframe = await loadIframe(`${bridgeUrl}?token=${bridgeToken}`, bridgeToken);

  const bridgeWindow = bridgeIframe.contentWindow;

  if (!bridgeWindow) {
    console.error("[@my-react-devtool/iframe] iframe contentWindow not found");

    return;
  }

  if (!token) {
    const viewWindow = window.open(`${bridgeView}?token=${bridgeToken}`, "_blank");

    close = () => viewWindow.close();
  }

  window.addEventListener("message", (e: MessageEvent) => {
    if (e.source === window && e.data && e.data.source === DevToolSource && e.data.from === sourceFrom.hook) {
      bridgeWindow?.postMessage?.(e.data, "*");
    }
  });

  window["__@my-react/dispatch__"]?.forEach((d) => window.__MY_REACT_DEVTOOL_RUNTIME__?.(d));

  window.__MY_REACT_DEVTOOL_RUNTIME__?.init?.();
};

initIFRAME_DEV.close = () => {
  close();

  core.disconnect();
};
