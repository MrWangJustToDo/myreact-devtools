import { sourceFrom } from "@my-react-devtool/bridge/type";
import { DevToolMessageEnum, DevToolSource, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";
import { useEffect } from "react";

import { onListener } from "@/utils/listener";
import { onRender } from "@/utils/render";

import { useConnect } from "./useConnect";

export const useWebDev = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === "web" && window.io && typeof window.io === "function") {
      const io = window.io();

      let connect = false;

      let id: NodeJS.Timeout | null = null;

      let unSubscribe = () => {};

      const listenBackendReady = () => {
        if (connect) {
          return;
        } else {
          io.emit("action", { type: MessageWorkerType.init, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource });

          io.emit("action", { type: MessagePanelType.show, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource });

          id = setTimeout(listenBackendReady, 1000);
        }
      };

      io.on("connect", () => {
        console.log("[Dev mode] client connect");

        useConnect.getActions().connect();

        listenBackendReady();

        io.emit("init", {
          name: "@my-react/devtool",
          type: "server",
        });

        unSubscribe = onListener((data) => io.emit("action", { ...data, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource }));
      });

      io.on("disconnect", () => {
        console.log("[Dev mode] client disconnect");

        connect = false;

        if (id) {
          clearTimeout(id);
        }

        unSubscribe();

        useConnect.getActions().disconnect();
      });

      io.on("render", (data) => {
        console.log("[Dev mode] render", data);

        if (data.type === DevToolMessageEnum.init) {
          connect = true;
        }

        onRender(data);
      });

      io.on("refresh", () => {
        window.location.reload();
      });

      io.on("web-dev", (data) => {
        console.log("[Dev mode] web-dev", data);

        useConnect.getActions().setWebDev(data.name || "", data.url || "");
      });

      io.on("duplicate", () => {
        console.warn("[Dev mode] duplicate server detected, disconnecting...");

        io.disconnect();
      });

      return () => {
        io.disconnect();
      };
    }
  }, []);
};
