import { MessageWorkerType, MessagePanelType, debounce, DevToolMessageEnum } from "@my-react-devtool/core";
import { useEffect } from "react";

import { useActiveNode } from "./useActiveNode";
import { useAppTree } from "./useAppTree";
import { useChunk } from "./useChunk";
import { useConfig } from "./useConfig";
import { useConnect } from "./useConnect";
import { useDetailNode } from "./useDetailNode";
import { useHMRNode } from "./useHMRNode";
import { useNodeName } from "./useNodeName";
import { useRunNode } from "./useRunNode";
import { useTreeNode } from "./useTreeNode";
import { useTriggerNode } from "./useTriggerNode";
import { DevToolSource, safeAction } from "./useWebDev";

const from = "iframe";

const poseMessageFromIframe = (data: any) => {
  window.top?.postMessage({ from, ...data, source: DevToolSource }, "*");
};

export const useIframeDev = () => {
  useEffect(() => {
    const currentIsIframe = window !== window.top;

    if (process.env.NEXT_PUBLIC_MODE === "local" && currentIsIframe && window.top) {
      let connect = false;

      let id: NodeJS.Timeout | null = null;

      const unSubscribeArray: Array<() => void> = [];

      const listenBackEndReady = () => {
        if (connect) {
          return;
        } else {
          poseMessageFromIframe({ type: MessageWorkerType.init });

          poseMessageFromIframe({ type: MessagePanelType.show });

          id = setTimeout(listenBackEndReady, 1000);
        }
      };

      const onConnect = () => {
        console.log("[Dev mode] iframe connect");

        useConnect.getActions().connect();

        listenBackEndReady();

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.select,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                useDetailNode.getActions().setLoading(true);

                poseMessageFromIframe({ type: MessagePanelType.nodeSelect, data: currentSelect });
              } else {
                poseMessageFromIframe({ type: MessagePanelType.nodeSelect, data: null });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.hover,
            () => poseMessageFromIframe({ type: MessagePanelType.nodeHover, data: useTreeNode.getReadonlyState().hover })
          )
        );

        unSubscribeArray.push(
          useActiveNode.subscribe(
            (s) => s.state,
            debounce(() => poseMessageFromIframe({ type: MessagePanelType.nodeSubscriber, data: useActiveNode.getReadonlyState().state }), 100)
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableHover,
            () => poseMessageFromIframe({ type: MessagePanelType.enableHover, data: useConfig.getReadonlyState().state.enableHover })
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableUpdate,
            () => poseMessageFromIframe({ type: MessagePanelType.enableUpdate, data: useConfig.getReadonlyState().state.enableUpdate })
          )
        );

        unSubscribeArray.push(
          useChunk.subscribe(
            (s) => s.id,
            () => {
              const id = useChunk.getReadonlyState().id;
              if (id) {
                poseMessageFromIframe({ type: MessagePanelType.chunk, data: id });
              }
            }
          )
        );
      };

      const onDisconnect = () => {
        console.log("[Dev mode] iframe disconnect");

        connect = false;

        id && clearTimeout(id);

        unSubscribeArray.forEach((fn) => fn());

        useConnect.getActions().disconnect();
      };

      window.addEventListener("message", (e) => {
        if (e.source !== window.top) return;

        if (e.data?.source !== DevToolSource) return;

        if (e.data?.from === from) return;

        const data = e.data;

        if (data.type === DevToolMessageEnum.init) {
          safeAction(() => {
            connect = true;

            onConnect();

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
      });

      return () => {
        onDisconnect();
      };
    }
  }, []);
};