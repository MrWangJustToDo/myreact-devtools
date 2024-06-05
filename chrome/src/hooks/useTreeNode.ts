import { createState } from "reactivity-store";

import type { TreeNode } from "@/utils/node";

export const useTreeNode = createState(() => ({ select: null, closeList: [] }) as { select: TreeNode | null; closeList: TreeNode[] }, {
  withActions: (s) => ({
    setSelect: (node: TreeNode | null) => {
      if (s.select && node?.current?.id === s.select.current.id) {
        s.select = null;
      } else {
        s.select = node;
      }
    },
    setClose: (node: TreeNode) => {
      const hasInclude = s.closeList.some((i) => i.current.id === node.current.id);
      if (hasInclude) {
        s.closeList = s.closeList.filter((i) => i.current.id !== node.current.id);
      } else {
        s.closeList = Array.from([...s.closeList, node]);
      }
    },
  }),
  withDeepSelector: false,
  // withNamespace: "useTreeNode",
});
