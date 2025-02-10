import { DevToolMessageEnum, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";
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
          io.emit("action", { type: MessageWorkerType.init });

          io.emit("action", { type: MessagePanelType.show });

          id = setTimeout(listenBackendReady, 1000);
        }
      };

      io.on("connect", () => {
        console.log("[Dev mode] client connect");

        useConnect.getActions().connect();

        listenBackendReady();

        unSubscribe = onListener((data) => io.emit("action", data));
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

      return () => {
        io.disconnect();
      };
    }
  }, []);
};
