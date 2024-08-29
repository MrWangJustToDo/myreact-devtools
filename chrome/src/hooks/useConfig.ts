import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useConfig = createState(() => ({ state: { enableHover: false, enableUpdate: false } }), {
  withActions: (s) => ({
    setEnableHover(enableHover: boolean) {
      s.state.enableHover = enableHover;
    },
    setEnableUpdate(enableUpdate: boolean) {
      s.state.enableUpdate = enableUpdate;
    },
  }),
  withNamespace: "useConfig",
  withDeepSelector: true,
});

if (!isServer) {
  window.useConfig = useConfig;
}
