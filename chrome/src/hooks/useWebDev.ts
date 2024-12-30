import { debounce, DevToolMessageEnum, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";
import { useEffect } from "react";

import { useActiveNode } from "./useActiveNode";
import { useAppTree } from "./useAppTree";
import { useChunk } from "./useChunk";
import { useConfig } from "./useConfig";
import { useConnect } from "./useConnect";
import { useContextMenu } from "./useContextMenu";
import { useDetailNode } from "./useDetailNode";
import { useHighlightNode } from "./useHighlightNode";
import { useHMRNode } from "./useHMRNode";
import { useNodeName } from "./useNodeName";
import { useRunNode } from "./useRunNode";
import { useTreeNode } from "./useTreeNode";
import { useTriggerNode } from "./useTriggerNode";

// SEE packages/bridge/src/hook.ts:42 onMessage
export const DevToolSource = "@my-react/devtool";

export const safeAction = (cb: () => void) => {
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
            (s) => s.force,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                useDetailNode.getActions().setLoading(true);

                io.emit("action", { type: MessagePanelType.nodeSelectForce, data: currentSelect });
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
          useActiveNode.subscribe(
            (s) => s.state,
            debounce(() => io.emit("action", { type: MessagePanelType.nodeSubscriber, data: useActiveNode.getReadonlyState().state }), 100)
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

        unSubscribeArray.push(
          useChunk.subscribe(
            (s) => s.id,
            () => {
              const id = useChunk.getReadonlyState().id;
              if (id) {
                io.emit("action", { type: MessagePanelType.chunk, data: id });
              }
            }
          )
        );

        unSubscribeArray.push(
          useContextMenu.subscribe(
            (s) => s.store,
            () => {
              const id = useContextMenu.getReadonlyState().store;

              if (id) {
                io.emit("action", { type: MessagePanelType.varStore, data: id });
              }
            }
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
            if (data.data) {
              useAppTree.getActions().addNode(data.data);
            }
          });
        }

        if (data.type === DevToolMessageEnum.unmount) {
          safeAction(() => {
            useChunk?.getActions?.()?.clear?.();
            useAppTree?.getActions?.()?.clear?.();
            useNodeName?.getActions?.()?.clear?.();
            useTreeNode?.getActions?.()?.clear?.();
            useDetailNode?.getActions?.()?.clear?.();
            useActiveNode?.getActions()?.clear?.();
            useContextMenu?.getActions?.()?.clear?.();
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

        if (data.type === DevToolMessageEnum.run) {
          safeAction(() => {
            useRunNode.getActions().update(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.detail) {
          safeAction(() => {
            if (data.data) {
              useDetailNode.getActions().addNode(data.data);
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

        if (data.type === DevToolMessageEnum.chunk) {
          safeAction(() => {
            useChunk.getActions().setChunk(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.warn) {
          safeAction(() => {
            useHighlightNode.getActions().setWarn(data.data);
          });
        }

        if (data.type === DevToolMessageEnum.error) {
          safeAction(() => {
            useHighlightNode.getActions().setError(data.data);
          });
        }
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
