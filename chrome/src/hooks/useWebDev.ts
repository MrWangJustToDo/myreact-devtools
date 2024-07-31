import { DevToolMessageEnum, MessagePanelType, MessageWorkerType, parseDetailNode } from "@my-react-devtool/core";
import { useEffect } from "react";

import { useAppTree } from "./useAppTree";
import { useConnect } from "./useConnect";
import { useDetailNode } from "./useDetailNode";
import { useHMRNode } from "./useHMRNode";
import { useNodeName } from "./useNodeName";
import { useTreeNode } from "./useTreeNode";
import { useTriggerNode } from "./useTriggerNode";

const safeAction = (cb: () => void) => {
  try {
    cb();
  } catch (e) {
    const typedE = e as Error;

    useConnect.getActions().setError(typedE.message);
  }
};

export const useWebDev = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === "web") {
      const io = window.io();

      let connect = false;

      let id: NodeJS.Timeout | null = null;

      let unSubscribe = () => {};

      const listenBackEndReady = () => {
        if (connect) {
          return;
        } else {
          io.emit("action", { type: MessageWorkerType.init });

          io.emit("action", { type: MessagePanelType.show });

          id = setTimeout(listenBackEndReady, 1000);
        }
      };

      io.on("connect", () => {
        console.log("[Dev mode] client connect");

        useConnect.getActions().connect();

        listenBackEndReady();

        unSubscribe = useTreeNode.subscribe(
          (s) => s.select,
          () => {
            const currentSelect = useTreeNode.getReadonlyState().select;

            if (currentSelect) {
              useDetailNode.getActions().setLoading(true);

              io.emit("action", { type: MessagePanelType.nodeSelect, data: currentSelect });
            }
          }
        );
      });

      io.on("disconnect", () => {
        console.log("[Dev mode] client disconnect");

        connect = false;

        id && clearTimeout(id);

        unSubscribe();

        useConnect.getActions().disconnect();
      });

      io.on("render", (data) => {
        console.log("[Dev mode] render", data);
        if (data.type === DevToolMessageEnum.init) {
          safeAction(() => {
            connect = true;

            useConnect.getActions().setRender(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.dir) {
          safeAction(() => {
            useNodeName.getActions().set(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.ready) {
          safeAction(() => {
            useAppTree.getActions().addNode(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.hmr) {
          safeAction(() => {
            useHMRNode.getActions().update(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.trigger) {
          safeAction(() => {
            useTriggerNode.getActions().update(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.detail) {
          safeAction(() => {
            useDetailNode.getActions().addNode(parseDetailNode(data.data));

            useDetailNode.getActions().setLoading(false);
          });
        }
      });

      io.on('refresh', () => {
        window.location.reload();
      })
    }
  }, []);
};
