import { MessageWorkerType, MessagePanelType, DevToolMessageEnum, DevToolSource, MessageHookType } from "@my-react-devtool/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { onListener } from "@/utils/listener";
import { onRender } from "@/utils/render";

import { useConnect } from "./useConnect";

export const from = "iframe";

let bridge: null | BroadcastChannel = null;

export const DevBridgeSource = "@my-react/devtool/bridge";

const postMessageToBridge = (data: any) => {
  bridge?.postMessage({ from, ...data, source: DevBridgeSource });
};

export const useBridgeTarget = () => {
  const { query, push, pathname } = useRouter();

  const isBridgePage = pathname.endsWith("bridge");

  useEffect(() => {
    const _query = new URLSearchParams(window.location.search);

    if (process.env.NEXT_PUBLIC_MODE === "local" && !_query?.get("token")) {
      push({ query: { token: Math.random().toString(36).slice(2) } });
    }
  }, [query?.token, push]);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;

    if (process.env.NEXT_PUBLIC_MODE === "local" && !isBridgePage && query?.token) {
      bridge = new BroadcastChannel(("@my-react-" + query.token) as string);

      console.log("[Dev mode] bridge start");

      let connect = false;

      let id: NodeJS.Timeout | null = null;

      let unsubscribe = () => {};

      const listenBackEndReady = () => {
        if (connect) {
          return;
        } else {
          postMessageToBridge({ type: MessageWorkerType.init });

          postMessageToBridge({ type: MessagePanelType.show });

          id = setTimeout(listenBackEndReady, 1000);
        }
      };

      const onConnect = () => {
        console.log("[Dev mode] bridge connect");

        useConnect.getActions().connect();

        listenBackEndReady();

        unsubscribe = onListener(postMessageToBridge);
      };

      const onDisconnect = () => {
        console.log("[Dev mode] bridge disconnect");

        connect = false;

        if (id) {
          clearTimeout(id);
        }

        unsubscribe();

        useConnect.getActions().disconnect();

        bridge?.removeEventListener("message", onMessage);

        bridge?.close();
      };

      const onMessage = (e: MessageEvent) => {
        if (e.data?.source !== DevToolSource) return;

        if (e.data?.from === from) return;

        const data = e.data?.type === MessageHookType.render ? e.data.data : e.data;

        if (data.type === DevToolMessageEnum.init) {
          connect = true;
        }

        onRender(data);
      };

      bridge.addEventListener("message", onMessage);

      onConnect();

      return () => {
        onDisconnect();
      };
    }
  }, [isBridgePage, query.token]);
};
