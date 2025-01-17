import { DevToolSource } from "@my-react-devtool/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DevBridgeSource, from } from "./useBridgeTarget";

let bridge: null | BroadcastChannel = null;

const postMessageToApp = (data: any) => {
  window.top?.postMessage({ from, ...data, source: DevToolSource }, "*");
};

const postMessageToBridge = (data: any) => {
  bridge?.postMessage({ ...data, source: DevToolSource });
};

export const useBridgeSource = () => {
  const { query } = useRouter();

  useEffect(() => {
    const currentIsIframe = window !== window.top;

    if (process.env.NEXT_PUBLIC_MODE === "local" && currentIsIframe && window.top && query?.token) {

      bridge = new BroadcastChannel(("@my-react-" + query?.token) as string);

      const forWardMessageToBridge = (e: MessageEvent) => {
        console.log("[Dev mode] bridge message to bridge", e.data);

        if (e.data?.source !== DevToolSource) return;

        postMessageToBridge(e.data);
      };

      const forWardMessageToApp = (e: MessageEvent) => {
        console.log("[Dev mode] bridge message to app", e.data);

        if (e.data?.source !== DevBridgeSource) return;

        postMessageToApp(e.data);
      };

      const onConnect = () => {
        console.log("[Dev mode] bridge connect");

        window.addEventListener("message", forWardMessageToBridge);

        bridge?.addEventListener("message", forWardMessageToApp);

        postMessageToApp({ type: "bridge-init" });

        postMessageToBridge({ type: "bridge-init" });
      };

      const onDisconnect = () => {
        console.log("[Dev mode] bridge disconnect");

        window.removeEventListener("message", forWardMessageToBridge);

        bridge?.removeEventListener("message", forWardMessageToApp);

        bridge?.close();
      };

      onConnect();

      return () => {
        onDisconnect();
      };
    }
  }, [query?.token]);
};
