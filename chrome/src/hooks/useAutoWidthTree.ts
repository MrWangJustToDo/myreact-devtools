import { createState } from "reactivity-store";

export const useAutoWidthTree = createState(() => ({ state: true }), {
  withActions: (s) => ({
    toggle: () => (s.state = !s.state),
    setAutoWidth: (autoWidth: boolean) => (s.state = autoWidth),
  }),
  withNamespace: "useAutoWidthTree",
  withDeepSelector: false,
  withStableSelector: true,
  withPersist: "useAutoWidthTree",
});
