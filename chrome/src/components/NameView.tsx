import { Button, ButtonGroup, Divider, Tooltip } from "@nextui-org/react";
import { CubeIcon, ReloadIcon } from "@radix-ui/react-icons";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { TreeItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

const { forceReload, storeFiber } = useTreeNode.getActions();

export const NameView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const sizeClass = size === "sm" ? "text-[15px]" : size === "md" ? "text-[16px]" : "text-[17px]";

  if (currentSelectDetail) {
    return (
      <div className={`p-2 ${sizeClass} sticky top-0 bg-content1 transition-transform-background z-50`}>
        <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
        <ButtonGroup className="absolute right-4 top-0">
          <Tooltip content="store fiber node" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={storeFiber}>
              <CubeIcon width="11" height="11" />
            </Button>
          </Tooltip>
          <Tooltip content="force load" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={forceReload}>
              <ReloadIcon width="10" height="10" />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
