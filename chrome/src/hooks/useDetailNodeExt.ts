import { createState } from "reactivity-store";

import type { HMRStatus, NodeValue } from "@my-react-devtool/core";

export const useDetailNodeExt = createState(
  () =>
    ({ hmrStatus: [], triggerStatus: [], warnStatus: [], errorStatus: [], enable: false, }) as {
      hmrStatus: HMRStatus[];
      triggerStatus: NodeValue[];
      warnStatus: NodeValue[];
      errorStatus: NodeValue[];
      enable: boolean;
    },
  {
    withActions: (s) => {
      return {
        toggleEnable: () => s.enable = !s.enable,
        updateHMRStatus: (status: HMRStatus[]) => {
          s.hmrStatus = status;
        },
        updateTriggerStatus: (status: NodeValue[]) => {
          s.triggerStatus = status;
        },
        updateWarnStatus: (status: NodeValue[]) => {
          s.warnStatus = status;
        },
        updateErrorStatus: (status: NodeValue[]) => {
          s.errorStatus = status;
        },
        clear: () => {
          s.hmrStatus = [];
          s.triggerStatus = [];
          s.warnStatus = [];
          s.errorStatus = [];
        },
      };
    },
    withDeepSelector: false,
    withStableSelector: true,
  }
);
