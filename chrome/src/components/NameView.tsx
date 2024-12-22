import { Button, Divider, Tooltip } from "@nextui-org/react";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { RenderItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

const forceReload = useTreeNode.getActions().forceReload;

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const sizeClass = size === "sm" ? "text-[15px]" : size === "md" ? "text-[16px]" : "text-[17px]";

  if (currentSelectDetail) {
    return (
      <div className={`p-2 ${sizeClass} sticky top-0 bg-content1 transition-transform-background z-50`}>
        <RenderItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
        <Tooltip content="force load" showArrow color="foreground" placement="bottom-end">
          <Button isIconOnly size="sm" variant="flat" className="absolute right-4 top-0" onClick={forceReload}>
            <ReloadIcon width="10" height="10" />
          </Button>
        </Tooltip>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
