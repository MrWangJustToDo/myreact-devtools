import { DevToolMessageEnum, MessagePanelType, MessageWorkerType, parseDetailNode } from "@my-react-devtool/core";
import { useEffect } from "react";

const safeAction = (cb: () => void) => {
  try {
    cb();
  } catch (e) {
    const typedE = e as Error;

    window.useConnect.getActions().setError(typedE.message);
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

        window.useConnect.getActions().connect();

        listenBackEndReady();

        unSubscribe = window.useTreeNode.subscribe(
          (s) => s.select,
          () => {
            const currentSelect = window.useTreeNode.getReadonlyState().select;

            if (currentSelect) {
              window.useDetailNode.getActions().setLoading(true);

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

        window.useConnect.getActions().disconnect();
      });

      io.on("render", (data) => {
        console.log("[Dev mode] render", data);
        if (data.type === DevToolMessageEnum.init) {
          safeAction(() => {
            connect = true;

            window.useConnect.getActions().setRender(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.dir) {
          safeAction(() => {
            window.useNodeName.getActions().set(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.ready) {
          safeAction(() => {
            window.useAppTree.getActions().addNode(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.hmr) {
          safeAction(() => {
            window.useHMRNode.getActions().update(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.trigger) {
          safeAction(() => {
            window.useTriggerNode.getActions().update(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.detail) {
          safeAction(() => {
            window.useDetailNode.getActions().addNode(parseDetailNode(data.data));

            window.useDetailNode.getActions().setLoading(false);
          });
        }
      });
    }
  }, []);
};
