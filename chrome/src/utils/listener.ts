import { addToast } from "@heroui/react";
import { MessagePanelType } from "@my-react-devtool/core";

import { useChunk } from "@/hooks/useChunk";
import { useConfig } from "@/hooks/useConfig";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useUpdateState } from "@/hooks/useUpdateState";

import { isServer } from "./isServer";

import type { MessageDetectorType, MessageWorkerType } from "@my-react-devtool/core";

type MessageDataType = {
  type: MessagePanelType | MessageWorkerType | MessageDetectorType;
  data: any;
};

export const onListener = (postMessage: (data: MessageDataType) => void) => {
  const unSubscribeArray: Array<() => void> = [];

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.select,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        useDetailNodeExt.getActions().clear();

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
    useSelectNode.subscribe(
      (s) => s.reload,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        if (currentSelect) {
          useDetailNode.getActions().setLoading(true);

          postMessage({ type: MessagePanelType.nodeSelectForce, data: currentSelect });
        }
      }
    )
  );

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.trigger,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        if (currentSelect) {
          useDetailNode.getActions().setLoading(true);

          postMessage({ type: MessagePanelType.nodeTrigger, data: currentSelect });
        }
      }
    )
  );

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.inspectDom,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        if (currentSelect) {
          if (chrome?.devtools?.inspectedWindow?.eval) {
            chrome?.devtools?.inspectedWindow?.eval("window.__MY_REACT_DEVTOOL_INTERNAL__?.inspectDom?.()");
          } else {
            addToast({ severity: "danger", description: "inspect not support", title: "error", color: "danger" });
          }
        }
      }
    )
  );

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.inspectCom,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        if (currentSelect) {
          if (chrome?.devtools?.inspectedWindow?.eval) {
            chrome?.devtools?.inspectedWindow?.eval("window.__MY_REACT_DEVTOOL_INTERNAL__?.inspectCom?.()");
          } else {
            addToast({ severity: "danger", description: "inspect not support", title: "error", color: "danger" });
          }
        }
      }
    )
  );

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.store,
      () => {
        const currentSelect = useSelectNode.getReadonlyState().select;

        if (currentSelect) {
          postMessage({ type: MessagePanelType.nodeStore, data: currentSelect });
        }
      }
    )
  );

  unSubscribeArray.push(
    useSelectNode.subscribe(
      (s) => s.hover,
      () => {
        const currentHover = useSelectNode.getReadonlyState().hover;

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
    useConfig.subscribe(
      (s) => s.state.enableRetrigger,
      () => {
        const enableRetrigger = useConfig.getReadonlyState().state.enableRetrigger;

        postMessage({ type: MessagePanelType.enableRetrigger, data: enableRetrigger });
      }
    )
  );

  unSubscribeArray.push(
    useConfig.subscribe(
      (s) => s.state.enableHoverOnBrowser,
      () => {
        const enableHoverOnBrowser = useConfig.getReadonlyState().state.enableHoverOnBrowser;

        postMessage({ type: MessagePanelType.enableHoverOnBrowser, data: enableHoverOnBrowser });
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
    useContextMenu.subscribe(
      (s) => s.source,
      () => {
        const source = useContextMenu.getReadonlyState().source;

        if (source) {
          postMessage({ type: MessagePanelType.varSource, data: source });
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
          postMessage({ type: MessagePanelType.chunks, data: Array.from(ids) });
        }
      }
    )
  );

  unSubscribeArray.push(
    useUpdateState.subscribe(
      (s) => s.id,
      () => {
        const { id, oldVal, newVal, hookIndex, path } = useUpdateState.getReadonlyState();

        const select = useSelectNode.getReadonlyState().select;

        if (id && select) {
          postMessage({ type: MessagePanelType.nodeEditor, data: { id, oldVal, newVal, hookIndex, path } });
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
