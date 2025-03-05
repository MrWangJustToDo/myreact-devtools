import { createState } from "reactivity-store";

import type { HMRStatus, NodeValue } from "@my-react-devtool/core";

export const useDetailNodeExt = createState(
  () =>
    ({ hmrStatus: [], triggerStatus: [], warnStatus: [], errorStatus: [] }) as {
      hmrStatus: HMRStatus[];
      triggerStatus: NodeValue[];
      warnStatus: NodeValue[];
      errorStatus: NodeValue[];
    },
  {
    withActions: (s) => {
      return {
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
