import { createState } from "reactivity-store";

import type { HMRStatus, NodeValue } from "@my-react-devtool/core";

export const useDetailNodeExt = createState(
  () =>
    ({ hmrStatus: [], triggerStatus: [], warnStatus: [], errorStatus: [], enable: false, hmrInternal: null, hookUpdaterStatus: {} }) as {
      hmrStatus: HMRStatus[];
      triggerStatus: NodeValue[];
      hookUpdaterStatus: Record<string | number, NodeValue>;
      warnStatus: NodeValue[];
      errorStatus: NodeValue[];
      hmrInternal: NodeValue | null;
      enable: boolean;
    },
  {
    withActions: (s) => {
      return {
        toggleEnable: () => (s.enable = !s.enable),
        updateHMRStatus: (status: HMRStatus[]) => {
          s.hmrStatus = status;
        },
        updateTriggerStatus: (status: NodeValue[]) => {
          s.triggerStatus = status;
          status.forEach((node) => {
            const { _nodesToLinkHook } = node;
            if (_nodesToLinkHook) {
              Object.entries(_nodesToLinkHook).forEach(([key, value]) => {
                s.hookUpdaterStatus[key] = value as NodeValue;
              });
            }
          });
        },
        updateWarnStatus: (status: NodeValue[]) => {
          s.warnStatus = status;
        },
        updateErrorStatus: (status: NodeValue[]) => {
          s.errorStatus = status;
        },
        updateHMRInternal: (node: NodeValue | null) => {
          s.hmrInternal = node;
        },
        clear: () => {
          s.hmrInternal = null;
          s.hmrStatus = [];
          s.triggerStatus = [];
          s.warnStatus = [];
          s.errorStatus = [];
          s.hookUpdaterStatus = {};
        },
      };
    },
    withDeepSelector: false,
    withStableSelector: true,
  }
);
