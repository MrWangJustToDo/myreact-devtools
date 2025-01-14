import { MessageWorkerType, MessagePanelType, debounce, DevToolMessageEnum } from "@my-react-devtool/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useActiveNode } from "./useActiveNode";
import { useAppTree } from "./useAppTree";
import { useChunk } from "./useChunk";
import { useConfig } from "./useConfig";
import { useConnect } from "./useConnect";
import { useContextMenu } from "./useContextMenu";
import { useDetailNode } from "./useDetailNode";
import { useHMRNode } from "./useHMRNode";
import { useNodeName } from "./useNodeName";
import { useRunNode } from "./useRunNode";
import { useTreeNode } from "./useTreeNode";
import { useTriggerNode } from "./useTriggerNode";
import { DevToolSource, safeAction } from "./useWebDev";

export const from = "iframe";

const render = "hook-render";

let bridge: null | BroadcastChannel = null;

export const DevBridgeSource = "@my-react/devtool/bridge";

const postMessageToBridge = (data: any) => {
  bridge?.postMessage({ from, ...data, source: DevBridgeSource });
};

const debouncePostMessageFromIframe = debounce(postMessageToBridge, 100);

export const useBridgeTarget = () => {
  const { query, push } = useRouter();

  useEffect(() => {
    const currentIsIframe = window !== window.top;

    if (process.env.NEXT_PUBLIC_MODE === "local" && !currentIsIframe && !query?.token) {
      push({ query: { token: Date.now() } });
    }
  }, [query?.token, push]);

  useEffect(() => {
    const currentIsIframe = window !== window.top;

    if (typeof BroadcastChannel === "undefined") return;

    if (process.env.NEXT_PUBLIC_MODE === "local" && !currentIsIframe && query?.token) {
      bridge = new BroadcastChannel(("@my-react-" + query.token) as string);

      console.log("[Dev mode] bridge start");

      let connect = false;

      let id: NodeJS.Timeout | null = null;

      const unSubscribeArray: Array<() => void> = [];

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

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.select,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                useDetailNode.getActions().setLoading(true);

                postMessageToBridge({ type: MessagePanelType.nodeSelect, data: currentSelect });
              } else {
                postMessageToBridge({ type: MessagePanelType.nodeSelect, data: null });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.reload,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                useDetailNode.getActions().setLoading(true);

                debouncePostMessageFromIframe({ type: MessagePanelType.nodeSelectForce, data: currentSelect });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.store,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                debouncePostMessageFromIframe({ type: MessagePanelType.nodeStore, data: currentSelect });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.trigger,
            () => {
              const currentSelect = useTreeNode.getReadonlyState().select;

              if (currentSelect) {
                debouncePostMessageFromIframe({ type: MessagePanelType.nodeTrigger, data: currentSelect });
              }
            }
          )
        );

        unSubscribeArray.push(
          useTreeNode.subscribe(
            (s) => s.hover,
            () => postMessageToBridge({ type: MessagePanelType.nodeHover, data: useTreeNode.getReadonlyState().hover })
          )
        );

        unSubscribeArray.push(
          useActiveNode.subscribe(
            (s) => s.state,
            debounce(() => postMessageToBridge({ type: MessagePanelType.nodeSubscriber, data: useActiveNode.getReadonlyState().state }), 100)
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableHover,
            () => postMessageToBridge({ type: MessagePanelType.enableHover, data: useConfig.getReadonlyState().state.enableHover })
          )
        );

        unSubscribeArray.push(
          useConfig.subscribe(
            (s) => s.state.enableUpdate,
            () => postMessageToBridge({ type: MessagePanelType.enableUpdate, data: useConfig.getReadonlyState().state.enableUpdate })
          )
        );

        unSubscribeArray.push(
          useChunk.subscribe(
            (s) => s.id,
            () => {
              const id = useChunk.getReadonlyState().id;
              if (id) {
                postMessageToBridge({ type: MessagePanelType.chunk, data: id });
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
                postMessageToBridge({ type: MessagePanelType.varStore, data: id });
              }
            }
          )
        );
      };

      const onDisconnect = () => {
        console.log("[Dev mode] bridge disconnect");

        connect = false;

        id && clearTimeout(id);

        unSubscribeArray.forEach((fn) => fn());

        useConnect.getActions().disconnect();

        bridge?.removeEventListener("message", onMessage);

        bridge?.close();
      };

      const onMessage = (e: MessageEvent) => {
        if (e.data?.source !== DevToolSource) return;

        if (e.data?.from === from) return;

        const data = e.data?.type === render ? e.data.data : e.data;

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
      };

      bridge.addEventListener("message", onMessage);

      onConnect();

      return () => {
        onDisconnect();
      };
    }
  }, [query?.token]);
};
