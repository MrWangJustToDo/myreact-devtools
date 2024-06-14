import { Divider } from "@nextui-org/react";

import { useTreeNode } from "@/hooks/useTreeNode";

import { RenderItem } from "./TreeItem";

import type { TreeNode } from "@/utils/node";

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  if (select) {
    return (
      <div className="p-2 text-[16px] whitespace-nowrap text-ellipsis overflow-hidden sticky top-0 bg-white z-50">
        <RenderItem node={select as TreeNode} withCollapse={false} withSelect={false} withKey={false} />
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
