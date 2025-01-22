import { MessagePanelType } from "@my-react-devtool/core";

import { useChunk } from "@/hooks/useChunk";
import { useConfig } from "@/hooks/useConfig";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

import { isServer } from "./isServer";

import type { MessageDetectorType, MessageWorkerType } from "@my-react-devtool/core";

type MessageDataType = {
  type: MessagePanelType | MessageWorkerType | MessageDetectorType;
  data: any;
};

export const onListener = (postMessage: (data: MessageDataType) => void) => {
  const unSubscribeArray: Array<() => void> = [];

  unSubscribeArray.push(
    useTreeNode.subscribe(
      (s) => s.select,
      () => {
        const currentSelect = useTreeNode.getReadonlyState().select;

        if (currentSelect) {
          useDetailNode.getActions().setLoading(true);

          postMessage({ type: MessagePanelType.nodeSelect, data: currentSelect });
        } else {
          postMessage({ type: MessagePanelType.nodeSelect, data: null });
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

          postMessage({ type: MessagePanelType.nodeSelectForce, data: currentSelect });
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
          useDetailNode.getActions().setLoading(true);

          postMessage({ type: MessagePanelType.nodeTrigger, data: currentSelect });
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
          postMessage({ type: MessagePanelType.nodeStore, data: currentSelect });
        }
      }
    )
  );

  unSubscribeArray.push(
    useTreeNode.subscribe(
      (s) => s.hover,
      () => {
        const currentHover = useTreeNode.getReadonlyState().hover;

        postMessage({ type: MessagePanelType.nodeHover, data: currentHover });
      }
    )
  );

  unSubscribeArray.push(
    useConfig.subscribe(
      (s) => s.state.enableHover,
      () => {
        const enableHover = useConfig.getReadonlyState().state.enableHover;

        postMessage({ type: MessagePanelType.enableHover, data: enableHover });
      }
    )
  );

  unSubscribeArray.push(
    useConfig.subscribe(
      (s) => s.state.enableUpdate,
      () => {
        const enableUpdate = useConfig.getReadonlyState().state.enableUpdate;

        postMessage({ type: MessagePanelType.enableUpdate, data: enableUpdate });
      }
    )
  );

  unSubscribeArray.push(
    useContextMenu.subscribe(
      (s) => s.store,
      () => {
        const store = useContextMenu.getReadonlyState().store;

        if (store) {
          postMessage({ type: MessagePanelType.varStore, data: store });
        }
      }
    )
  );

  unSubscribeArray.push(
    useChunk.subscribe(
      (s) => s.length,
      () => {
        const ids = useChunk.getReadonlyState().ids;

        if (ids.length) {
          postMessage({ type: MessagePanelType.chunks, data: ids });
        }
      }
    )
  );

  return () => {
    unSubscribeArray.forEach((unSubscribe) => unSubscribe());
  };
};

if (!isServer) {
  window.onListener = onListener;
}
