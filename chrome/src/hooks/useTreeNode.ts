import { createState } from "reactivity-store";

import type { TreeNode } from "@/utils/node";

export const useTreeNode = createState(() => ({ select: null, close: null }) as { select: TreeNode | null; close: TreeNode | null }, {
  withActions: (s) => ({ setSelect: (node: TreeNode | null) => (s.select = node), setClose: (node: TreeNode | null) => (s.close = node) }),
  withDeepSelector: false,
});
