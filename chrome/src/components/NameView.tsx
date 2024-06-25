import { Divider } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

import { RenderItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.id === select) as PlainNode;

  if (currentSelectDetail) {
    return (
      <div className="p-2 text-[16px] whitespace-nowrap text-ellipsis overflow-hidden sticky top-0 bg-white z-50">
        <RenderItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
