import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

import type { TreeNode } from "@/utils/node";

export const useTreeNode = createState(
  () => ({ select: null, hover: null, closeList: [] }) as { select: TreeNode | null; hover: TreeNode | null; closeList: TreeNode[] },
  {
    withActions: (s) => ({
      setSelect: (node: TreeNode | null) => {
        if (s.select && node?.id === s.select.id) {
          s.select = null;
        } else {
          s.select = node;
        }
      },
      setHover: (node: TreeNode | null) => {
        if (s.hover && node?.id === s.hover.id) {
          s.hover = null;
        } else {
          s.hover = node;
        }
      },
      setClose: (node: TreeNode) => {
        const hasInclude = s.closeList.some((i) => i.id === node.id);
        if (hasInclude) {
          s.closeList = s.closeList.filter((i) => i.id !== node.id);
        } else {
          s.closeList = Array.from([...s.closeList, node]);
        }
      },
    }),
    withDeepSelector: false,
    // withNamespace: "useTreeNode",
  }
);

if (!isServer) {
  window.useTreeNode = useTreeNode;
}
