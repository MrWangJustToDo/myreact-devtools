import { createState } from "reactivity-store";

export const useConfig = createState(() => ({ state: { enableEdit: false, enableHover: false, enableUpdate: false, enableHoverOnBrowser: false, enableRetrigger: false } }), {
  withActions: (s) => ({
    setEnableEdit(enableEdit: boolean) {
      s.state.enableEdit = enableEdit;
    },
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
      s.state.enableHover = s.state.enableHoverOnBrowser;
    },
    toggleEnableRetrigger() {
      s.state.enableRetrigger = !s.state.enableRetrigger;
    }
  }),
  withNamespace: "useConfig",
  withDeepSelector: true,
});
