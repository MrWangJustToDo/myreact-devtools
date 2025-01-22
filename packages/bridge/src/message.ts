import { STATE_TYPE } from "@my-react/react-shared";
import { getFiberNodeById, getValueById, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";

import { core } from "./core";
import { getValidGlobalVarName } from "./tool";

import type { MessagePanelDataType, MessageDetectorDataType, MessageWorkerDataType } from "./type";

export const onMessageFromPanelOrWorkerOrDetector = (data: MessagePanelDataType | MessageDetectorDataType | MessageWorkerDataType) => {
  if (data?.type === MessageWorkerType.init || data?.type === MessagePanelType.show) {
    core.connect();

    core.notifyAll();
  }

  // 主动关闭panel / 或者worker失活
  if (data?.type === MessagePanelType.hide || data?.type === MessageWorkerType.close) {
    core.disconnect();
  }

  if (data?.type === MessagePanelType.nodeSelect) {
    core.setSelect(data.data);

    core.notifySelect();
  }

  if (data?.type === MessagePanelType.nodeSelectForce) {
    core.notifySelect(true);
  }

  if (data?.type === MessagePanelType.nodeStore) {
    const id = data.data;

    const f = getFiberNodeById(id);

    if (f) {
      console.log(
        "[@my-react-devtool/hook] %cStore fiber node%c Value: %o",
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        "",
        f
      );
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (data?.type === MessagePanelType.nodeTrigger) {
    const id = data.data;

    const f = getFiberNodeById(id);

    if (f) {
      f._update(STATE_TYPE.__triggerConcurrentForce__);
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (data?.type === MessagePanelType.nodeHover) {
    core.setHover(data.data);

    core.showHover();
  }

  if (data?.type === MessagePanelType.enableHover) {
    core.setHoverStatus(data.data);
  }

  if (data?.type === MessagePanelType.enableUpdate) {
    core.setUpdateStatus(data.data);
  }

  if (data?.type === MessagePanelType.chunk) {
    core.notifyChunk(data.data);
  }

  if (data?.type === MessagePanelType.varStore) {
    const id = data.data;

    const { f, v: varStore } = getValueById(id);

    if (f) {
      const varName = getValidGlobalVarName();

      globalThis[varName] = varStore;

      console.log(
        `[@my-react-devtool/hook] %cStore global variable%c Name: ${varName}`,
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        ""
      );
      console.log(
        "[@my-react-devtool/hook] %cStore global variable%c Value: %o",
        "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px",
        "",
        varStore
      );
    } else {
      console.error("[@my-react-devtool/hook] fiber node not found", id);
    }
  }

  if (data?.type === MessagePanelType.clear) {
    core.clear();
  }
};
