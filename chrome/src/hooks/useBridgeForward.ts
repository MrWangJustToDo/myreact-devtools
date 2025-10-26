import { sourceFrom } from "@my-react-devtool/bridge/type";
import { DevToolSource } from "@my-react-devtool/core/event";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DevBridgeSource } from "./useBridgeTarget";

let bridge: null | BroadcastChannel = null;

const postMessageToApp = (data: any) => {
  window.top?.postMessage({ from: sourceFrom.iframe, to: sourceFrom.hook, ...data, source: DevToolSource }, "*");
};

const postMessageToBridge = (data: any) => {
  bridge?.postMessage({ from: sourceFrom.iframe, ...data, source: DevToolSource });
};

export const useBridgeForward = () => {
  const { query } = useRouter();

  useEffect(() => {
    const currentIsIframe = window !== window.top;

    if (process.env.NEXT_PUBLIC_MODE === "local" && currentIsIframe && window.top && query?.token) {
      bridge = new BroadcastChannel(("@my-react-" + query?.token) as string);

      const forwardMessageToBridge = (e: MessageEvent) => {
        console.log("[Dev mode] bridge message to bridge", e.data);

        if (e.data?.source !== DevToolSource) return;

        postMessageToBridge(e.data);
      };

      const forwardMessageToApp = (e: MessageEvent) => {
        console.log("[Dev mode] bridge message to app", e.data);

        if (e.data?.source !== DevBridgeSource) return;

        postMessageToApp(e.data);
      };

      const onConnect = () => {
        console.log("[Dev mode] bridge connect");

        window.addEventListener("message", forwardMessageToBridge);

        bridge?.addEventListener("message", forwardMessageToApp);

        postMessageToApp({ type: "bridge-init" });

        postMessageToBridge({ type: "bridge-init" });
      };

      const onDisconnect = () => {
        console.log("[Dev mode] bridge disconnect");

        window.removeEventListener("message", forwardMessageToBridge);

        bridge?.removeEventListener("message", forwardMessageToApp);

        bridge?.close();
      };

      onConnect();

      return () => {
        onDisconnect();
      };
    }
  }, [query?.token]);
};
