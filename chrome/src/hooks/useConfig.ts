import { createState } from "reactivity-store";

export const useConfig = createState(
  () => ({
    state: {
      enableEdit: true,
      enableHover: false,
      enableUpdate: false,
      enableHoverOnBrowser: false,
      enableRetrigger: false,
      enableRecord: false,
      supportRecord: false,
    },
  }),
  {
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
      setEnableRecord(enableRecord: boolean) {
        if (s.state.supportRecord) {
          s.state.enableRecord = enableRecord;
        }
      },
      setSupportRecord(supportRecord: boolean) {
        s.state.supportRecord = supportRecord;
      },
      toggleHoverOnBrowser() {
        s.state.enableHoverOnBrowser = !s.state.enableHoverOnBrowser;
        s.state.enableHover = s.state.enableHoverOnBrowser;
      },
      toggleEnableRetrigger() {
        s.state.enableRetrigger = !s.state.enableRetrigger;
      },
    }),
    withNamespace: "useConfig",
    withDeepSelector: true,
  }
);
