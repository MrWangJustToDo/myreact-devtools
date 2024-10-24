import { Divider } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { RenderItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const sizeClass = size === "sm" ? "text-[15px]" : size === "md" ? "text-[16px]" : "text-[17px]";

  if (currentSelectDetail) {
    return (
      <div className={`p-2 ${sizeClass} sticky top-0 bg-content1 z-50`}>
        <RenderItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
