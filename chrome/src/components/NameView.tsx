import { useTreeNode } from "@/hooks/useTreeNode";

import { RenderItem } from "./TreeItem";

import type { TreeNode } from "@/utils/node";

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  if (select) {
    return (
      <div className="p-2 text-[16px] whitespace-nowrap text-ellipsis overflow-hidden">
        <RenderItem node={select as TreeNode} withCollapse={false} withSelect={false} withKey={false} />
      </div>
    );
  } else {
    return null;
  }
};
