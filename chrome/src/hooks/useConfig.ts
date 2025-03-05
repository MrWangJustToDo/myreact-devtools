import { createState } from "reactivity-store";

export const useConfig = createState(() => ({ state: { enableHover: false, enableUpdate: false, enableHoverOnBrowser: false, enableRetrigger: false } }), {
  withActions: (s) => ({
    setEnableHover(enableHover: boolean) {
      s.state.enableHover = enableHover;
    },
    setEnableUpdate(enableUpdate: boolean) {
      s.state.enableUpdate = enableUpdate;
    },
    setEnableHoverOnBrowser(enableHoverOnBrowser: boolean) {
      s.state.enableHoverOnBrowser = enableHoverOnBrowser;
    },
    toggleHoverOnBrowser() {
      s.state.enableHoverOnBrowser = !s.state.enableHoverOnBrowser;
    },
    toggleEnableRetrigger() {
      s.state.enableRetrigger = !s.state.enableRetrigger;
    }
  }),
  withNamespace: "useConfig",
  withDeepSelector: true,
});
