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

    core.notifyHMRStatus();

    core.notifyTriggerStatus();

    core.notifyWarnStatus();

    core.notifyErrorStatus();
  }

  if (data?.type === MessagePanelType.nodeSelectForce) {
    core.notifySelect(true);

    core.notifyMessage(`success force reload current id: ${data.data} of fiber`, "success");
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

      core.notifyMessage(`success log current id: ${id} of fiber in the console`, "success");
    } else {
      core.notifyMessage(`current id: ${id} of fiber not exist`, "error");
    }
  }

  if (data?.type === MessagePanelType.nodeTrigger) {
    const id = data.data;

    const f = getFiberNodeById(id);

    if (f) {
      f._update(STATE_TYPE.__triggerConcurrentForce__);

      core.notifyMessage(`success trigger a update for current id: ${id} of fiber`, "success");
    } else {
      core.notifyMessage(`current id: ${id} of fiber not exist`, "error");
    }
  }

  // if (data?.type === MessagePanelType.nodeInspect) {
  //   core.inspectDom();
  // }

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

  if (data?.type === MessagePanelType.enableHoverOnBrowser) {
    const d = data.data;

    if (d) {
      core.enableBrowserHover();
    } else {
      core.disableBrowserHover();
    }
  }

  if (data?.type === MessagePanelType.chunks) {
    core.notifyChunks(data.data);
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

      core.notifyMessage(`success store current id: ${id} of data in the global variable: ${varName}`, "success");
    } else {
      core.notifyMessage(`current id: ${id} of data not exist`, "error");
    }
  }

  if (data?.type === MessagePanelType.varSource) {
    const id = data.data;

    const { v: varSource } = getValueById(id);

    core.setSource(varSource);

    core.notifySource();
  }

  if (data?.type === MessagePanelType.clear) {
    core.clear();
  }
};
