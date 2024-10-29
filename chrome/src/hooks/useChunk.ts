import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useChunk = createState(() => ({ id: null, data: {} }) as { id: number | string | null; data: Record<number | string, { loaded: any }> }, {
  withActions: (s) => ({
    setLoading: (id: number | string) => {
      s.id = id;
    },
    setLoaded: () => {
      s.id = null;
    },
    setChunk: (data: Record<number | string, { loaded: any }>) => {
      if (s.id && data[s.id]) {
        s.id = null;
      }
      s.data = { ...s.data, ...data };
    },
    clear: () => {
      s.id = null;
      s.data = {};
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});

if (!isServer) {
  window.useChunk = useChunk;
}
