import type { DevToolCore } from "../instance";

export const setRetriggerStatus = (core: DevToolCore, d: boolean) => {
  if (!core._enabled) return;

  if (__DEV__) {
    console.log(`[@my-react-devtool/core] retriggerStatus ${d ? "enable" : "disable"}`);
  }

  core._enableRetrigger = d;

  core.notifyTrigger();

  core.notifyTriggerStatus();
};
