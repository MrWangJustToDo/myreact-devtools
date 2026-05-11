import { createState } from "reactivity-store";

export const useDetailMode = createState(() => ({ mode: "node" as "node" | "flameGraph" | "global" | "console" }), {
  withActions: (s) => ({
    setMode: (mode: "node" | "flameGraph" | "global" | "console") => {
      s.mode = mode;
    },
    toggleMode: () => {
      s.mode = s.mode === "node" ? "flameGraph" : "node";
    },
  }),
  withNamespace: "useDetailMode",
  withPersist: "useDetailMode",
  withDeepSelector: false,
  withStableSelector: true,
});
