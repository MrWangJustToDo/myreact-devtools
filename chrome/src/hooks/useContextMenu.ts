import { createState } from "reactivity-store";

export const useContextMenu = createState(() => ({state: false, position: { x: 0, y: 0 }}), {
  withActions: (s) => ({
    open: (position: { x: number; y: number }) => {
      s.state = true;
      s.position = position;
    },
    close: () => {
      s.state = false;
    }
  }),
  withDeepSelector: false,
  withStableSelector: true,
});