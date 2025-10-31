import type { DevToolCore } from "../instance";

export const setUpdateStatus = (core: DevToolCore, d: boolean) => {
  if (!core._enabled) return;

  if (__DEV__) {
    console.log(`[@my-react-devtool/core] updateStatus ${d ? "enable" : "disable"}`);
  }

  core._enableUpdate = d;

  if (!core._enableUpdate) {
    core.update.cancelPending();
  }
};
