import { createState } from "reactivity-store";

let id: NodeJS.Timeout | null = null;

export const useTriggerHover = createState(() => ({ keys: [] as Array<number | string> }), {
  withActions: (s) => ({
    setKeys: (keys: Array<number | string>) => {
      if (id) {
        clearTimeout(id);
      }
      if (keys.length === 0) {
        id = setTimeout(() => (s.keys = []), 600);
      } else {
        s.keys = keys;
      }
    },
    clear: () => {
      s.keys = [];
    },
  }),
  withNamespace: "useHoverTrigger",
  withDeepSelector: false,
  withStableSelector: true,
});

export const useTriggerLayout = createState(() => ({ layout: "vertical" as "horizontal" | "vertical" }), {
  withActions: (s) => ({
    setLayout: (layout: "horizontal" | "vertical") => {
      s.layout = layout;
    },
  }),
  withNamespace: "useTriggerLayout",
  withDeepSelector: false,
  withStableSelector: true,
});
