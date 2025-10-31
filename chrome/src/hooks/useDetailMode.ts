import { createState } from "reactivity-store";

export const useDetailMode = createState(() => ({ mode: "node" as "node" | "flameGraph" }), {
  withActions: (s) => ({
    setMode: (mode: "node" | "flameGraph") => {
      s.mode = mode;
    },
    toggleMode: () => {
      s.mode = s.mode === "node" ? "flameGraph" : "node";
    },
  }),
  withPersist: "useDetailMode",
  withDeepSelector: false,
  withStableSelector: true,
});
