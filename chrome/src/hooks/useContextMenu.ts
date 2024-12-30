import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useContextMenu = createState(() => ({ state: false, id: 0, store: 0, position: { x: 0, y: 0 } }), {
  withActions: (s) => ({
    open: (position: { x: number; y: number }) => {
      s.state = true;
      s.position = position;
    },
    setId: (id: number) => {
      s.id = id;
    },
    setStore: () => {
      s.store = s.id;
      s.id = 0;
    },
    close: () => {
      s.id = 0;
      s.store = 0;
      s.state = false;
    },
    clear: () => {
      s.id = 0;
      s.store = 0;
      s.state = false;
      s.position = { x: 0, y: 0 };
    }
  }),
  withDeepSelector: false,
  withStableSelector: true,
});

if (!isServer) {
  window.useContextMenu = useContextMenu;
}