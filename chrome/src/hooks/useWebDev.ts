import { DevToolMessageEnum, MessagePanelType, MessageWorkerType, parseDetailNode } from "@my-react-devtool/core";
import { useEffect } from "react";

import { useAppTree } from "./useAppTree";
import { useConfig } from "./useConfig";
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

      const unSubscribeArray: Array<() => void> = [];

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

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.select,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                useDetailNode.getActions().setLoading(true);

                io.emit("action", { type: MessagePanelType.nodeSelect, data: currentSelect });
              } else {
                io.emit("action", { type: MessagePanelType.nodeSelect, data: null });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.hover,
            () => io.emit("action", { type: MessagePanelType.nodeHover, data: useTreeNode.getReadonlyState().hover })
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableHover,
            () => io.emit("action", { type: MessagePanelType.enableHover, data: useConfig.getReadonlyState().state.enableHover })
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableUpdate,
            () => io.emit("action", { type: MessagePanelType.enableUpdate, data: useConfig.getReadonlyState().state.enableUpdate })
          )
        );
        
      });

      io.on("disconnect", () => {
        console.log("[Dev mode] client disconnect");

        connect = false;

        id && clearTimeout(id);

        unSubscribeArray.forEach((fn) => fn());

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
            if (data.data) {
              useDetailNode.getActions().addNode(parseDetailNode(data.data));
            }

            useDetailNode.getActions().setLoading(false);
          });
        }

        if (data.type === DevToolMessageEnum.config) {
          safeAction(() => {
            useConfig.getActions().setEnableHover(data.data?.enableHover);

            useConfig.getActions().setEnableUpdate(data.data?.enableUpdate);
          });
        }
      });

      io.on("refresh", () => {
        window.location.reload();
      });

      return () => {
        io.disconnect();
      };
    }
  }, []);
};
