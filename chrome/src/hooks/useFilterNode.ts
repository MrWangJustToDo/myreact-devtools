import { NODE_TYPE } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { useAppTree } from "./useAppTree";

const defaultDisableType = new Set<string>(
  [
    NODE_TYPE.__comment__,
    NODE_TYPE.__initial__,
    NODE_TYPE.__text__,
    NODE_TYPE.__empty__,
    NODE_TYPE.__null__,
    NODE_TYPE.__plain__,
    NODE_TYPE.__fragment__,
    NODE_TYPE.__scopeSuspense__,
    NODE_TYPE.__scopeLazy__,
  ].map((i) => `${i}`)
);

export const useFilterNode = createState(() => ({ filter: defaultDisableType, nameFilters: new Set<string>() }), {
  withActions: (s) => ({
    onChange: (filter: Set<string>) => {
      s.filter = filter;
      useAppTree.getActions().update();
    },
    addNameFilter: (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      s.nameFilters = new Set(Array.from(s.nameFilters).concat(trimmed));
      useAppTree.getActions().update();
    },
    removeNameFilter: (name: string) => {
      s.nameFilters = new Set(Array.from(s.nameFilters).filter((n) => n !== name));
      useAppTree.getActions().update();
    },
  }),
  withDeepSelector: false,
  withNamespace: "useFilterNode",
  withPersist: {
    key: "useFilterNode_v3",
    stringify: (state) => JSON.stringify({ filter: Array.from(state.filter), nameFilters: Array.from(state.nameFilters) }),
    parse: (raw) => {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return { filter: new Set(parsed), nameFilters: new Set<string>() };
      }
      return { filter: new Set(parsed.filter), nameFilters: new Set<string>(parsed.nameFilters || []) };
    },
  },
});
