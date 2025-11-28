import { debounce, type PlainNode } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { flattenNode } from "@/utils/node";

import { useAppTree } from "./useAppTree";
import { useRunningCount } from "./useRunningCount";

export const useSelectNode = createState(
  () =>
    ({ select: null, hover: null, closeList: {}, selectList: {}, store: 0, trigger: 0, scroll: 0, inspectDom: 0, inspectCom: 0 }) as {
      select: string | number | null;
      hover: string | number | null;
      trigger: number;
      store: number;
      scroll: number;
      inspectDom: number;
      inspectCom: number;
      closeList: Record<string, boolean>;
      selectList: Record<string, boolean>;
    },
  {
    withActions: (s) => {
      const updateSelectList = debounce(() => {
        const plainNode = useAppTree.getReactiveState().list.find((i) => i.i === s.select) as PlainNode;
        if (!plainNode) return;
        s.selectList = flattenNode(
          plainNode,
          () => false,
          () => false,
          false
        ).reduce<Record<string, boolean>>((p, c) => {
          p[c.i] = true;
          return p;
        }, {});
      }, 16);

      const internalClear = () => {
        s.select = null;
        s.selectList = {};
        updateSelectList();

        useRunningCount.getActions().clear();
      };

      return {
        setSelect: (node: string | number | null, force?: boolean) => {
          if (node === s.select && !force) {
            s.select = null;
            s.selectList = {};
          } else {
            s.select = node;
            s.selectList = {};
            updateSelectList();
          }

          useRunningCount.getActions().clear();
        },
        clearSelect: () => {
          internalClear();
        },
        clearSelectIfNeed: (node: string) => {
          if (node === s.select) {
            internalClear();
          }
        },
        storeFiber: () => {
          if (s.select) {
            s.store++;
          }
        },
        triggerFiber: () => {
          if (s.select) {
            s.trigger++;
          }
        },
        scrollIntoView: () => {
          if (s.select) {
            s.scroll++;
          }
        },
        inspectDomAction: () => {
          if (s.select) {
            s.inspectDom++;
          }
        },
        inspectComAction: () => {
          if (s.select) {
            s.inspectCom++;
          }
        },
        updateSelectList,
        setHover: (node: string | number | null) => {
          if (node === s.hover) {
            s.hover = null;
          } else {
            s.hover = node;
          }
        },
        setClose: (node: string | number | null) => {
          if (!node) return;
          if (s.closeList?.[node]) {
            s.closeList = { ...s.closeList, [node]: false };
          } else {
            s.closeList = { ...s.closeList, [node]: true };
          }
          useAppTree.getActions().update();
        },
        clear: () => {
          s.hover = null;
          s.select = null;
          s.closeList = {};
          s.selectList = {};
        },
      };
    },
    withDeepSelector: false,
    // withNamespace: "useTreeNode",
  }
);
