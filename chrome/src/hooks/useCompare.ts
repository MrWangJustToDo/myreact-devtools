import { createState } from "reactivity-store";

type Expand = Record<string, boolean>;
type Ids = Record<string, string | number>;

export const useCompare = createState(() => ({ expand: {} as Expand, lIds: {} as Ids, rIds: {} as Ids }), {
  withActions: (s) => ({
    toggleExpand: (key: string) => {
      s.expand[key] = !s.expand[key];
    },
    setLId: (key: string, id: string | number) => {
      s.lIds[key] = id;
    },
    setRId: (key: string, id: string | number) => {
      s.rIds[key] = id;
    },
    reset: () => {
      s.expand = {};
      s.lIds = {};
      s.rIds = {};
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
