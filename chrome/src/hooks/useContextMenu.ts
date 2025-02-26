import { createState } from "reactivity-store";

import type { NodeValue as NodeValueType } from "@my-react-devtool/core";

export const useContextMenu = createState(() => ({ state: false, id: 0, type: "" as NodeValueType["t"], store: 0, source: 0, position: { x: 0, y: 0 } }), {
  withActions: (s) => ({
    open: (position: { x: number; y: number }) => {
      s.state = true;
      s.position = position;
    },
    setId: (id: number) => {
      s.id = id;
    },
    setType: (type: NodeValueType["t"]) => {
      s.type = type;
    },
    setStore: () => {
      s.store = s.id;
      s.id = 0;
    },
    setSource: () => {
      s.source = s.id;
      s.id = 0;
    },
    close: () => {
      s.id = 0;
      s.store = 0;
      s.source = 0;
      s.type = "" as NodeValueType["t"];
      s.state = false;
    },
    clear: () => {
      s.id = 0;
      s.store = 0;
      s.source = 0;
      s.type = "" as NodeValueType["t"];
      s.state = false;
      s.position = { x: 0, y: 0 };
    },
  }),
  withDeepSelector: false,
  withStableSelector: true,
});
