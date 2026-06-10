import { createState } from "reactivity-store";

export type FlameGraphViewMode = "v1" | "v2";

export const useFlameGraphViewMode = createState(() => ({ mode: "v2" as FlameGraphViewMode }), {
  withActions: (s) => ({
    setMode: (mode: FlameGraphViewMode) => {
      s.mode = mode;
    },
  }),
  withNamespace: "useFlameGraphViewMode",
  withPersist: "useFlameGraphViewMode",
  withDeepSelector: false,
  withStableSelector: true,
});
