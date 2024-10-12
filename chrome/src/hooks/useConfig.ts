import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useConfig = createState(() => ({ state: { enableHover: false, enableUpdate: false, enableRuntimeCount: false, enableRuntimeMis: false } }), {
  withActions: (s) => ({
    setEnableHover(enableHover: boolean) {
      s.state.enableHover = enableHover;
    },
    setEnableUpdate(enableUpdate: boolean) {
      s.state.enableUpdate = enableUpdate;
    },
    setEnableRuntimeCount(enableRuntimeCount: boolean) {
      s.state.enableRuntimeCount = enableRuntimeCount;
    },
    setEnableRuntimeMis(enableRuntimeMis: boolean) {
      s.state.enableRuntimeMis = enableRuntimeMis;
    }
  }),
  withNamespace: "useConfig",
  withDeepSelector: true,
});

if (!isServer) {
  window.useConfig = useConfig;
}
