import { createState } from "reactivity-store";

export const useChunk = createState(
  () => ({ length: 0, ids: [], data: {} }) as { length: number; ids: (number | string)[]; data: Record<number | string, { loaded: any }> },
  {
    withActions: (s) => ({
      setLoading: (id: number | string) => {
        s.length++;
        s.ids.push(id);
      },
      setChunk: (data: Record<number | string, { loaded: any }>) => {
        const arr = Array.from(s.ids);

        let len = 0;

        s.ids.length = 0;

        s.data = { ...s.data, ...data };

        arr.forEach((item) => {
          if (!data[item]) {
            len++;
            s.ids.push(item);
          }
        });

        s.length = len;
      },
      clear: () => {
        s.ids = [];
        s.data = {};
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
