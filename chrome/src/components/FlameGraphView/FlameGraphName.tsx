import { memo } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { TreeItem } from "../TreeView/TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

export const FlameGraphName = memo(() => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  if (currentSelectDetail) {
    return <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />;
  } else {
    return <div className="opacity-0">1</div>;
  }
});

FlameGraphName.displayName = "FlameGraphName";
