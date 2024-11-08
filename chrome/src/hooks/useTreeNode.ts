import { debounce, type PlainNode } from "@my-react-devtool/core";
import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { flattenNode } from "@/utils/node";

import { useAppTree } from "./useAppTree";
import { useChunk } from "./useChunk";
import { useDetailNode } from "./useDetailNode";

const clearChunk = useChunk.getActions().clear;

const delNode = useDetailNode.getActions().delNode;

export const useTreeNode = createState(
  () =>
    ({ select: null, hover: null, closeList: {}, selectList: {}, force: 0 }) as {
      select: string | null;
      hover: string | null;
      force: number;
      closeList: Record<string, boolean>;
      selectList: Record<string, boolean>;
    },
  {
    withActions: (s) => {
      const updateSelectList = debounce(() => {
        const plainNode = useAppTree.getReadonlyState().list.find((i) => i.i === s.select) as PlainNode;
        if (!plainNode) return;
        s.selectList = flattenNode(
          plainNode,
          () => false,
          () => false
        ).reduce<Record<string, boolean>>((p, c) => {
          p[c.i] = true;
          return p;
        }, {});
      }, 16);
      return {
        setSelect: (node: string | null, force?: boolean) => {
          if (node === s.select && !force) {
            s.select = null;
            s.selectList = {};
          } else {
            s.select = node;
            updateSelectList();
          }
        },
        forceReload: () => {
          if (s.select) {
            s.force++;

            delNode(s.select);
          }

          clearChunk();
        },
        updateSelectList,
        setHover: (node: string | null) => {
          if (node === s.hover) {
            s.hover = null;
          } else {
            s.hover = node;
          }
        },
        setClose: (node: string | null) => {
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

if (!isServer) {
  window.useTreeNode = useTreeNode;
}
