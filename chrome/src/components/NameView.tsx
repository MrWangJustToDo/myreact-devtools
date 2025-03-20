import { Button, ButtonGroup, Divider, Tooltip } from "@heroui/react";
import { NODE_TYPE, type PlainNode } from "@my-react-devtool/core";
import { Bug, Locate, Package, Play, RefreshCcw, SquareMousePointer } from "lucide-react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useUISize } from "@/hooks/useUISize";

import { TreeItem } from "./TreeItem";

const { forceReload, storeFiber, triggerFiber, scrollIntoView, inspectComAction, inspectDomAction } = useSelectNode.getActions();

export const NameView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const sizeNum = size === "sm" ? 11 : size === "md" ? 12 : 13;

  const isComponent = currentSelectDetail?.t & NODE_TYPE.__class__ || currentSelectDetail?.t & NODE_TYPE.__function__;

  if (currentSelectDetail) {
    return (
      <div
        className={`p-2 sticky top-0 bg-content1 transition-transform-background z-50 ${size === "sm" ? "text-[15px]" : size === "md" ? "text-[16px]" : "text-[17px]"}`}
      >
        <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
        <ButtonGroup className="absolute right-4 top-0">
          <Tooltip content="force scroll to select" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={scrollIntoView}>
              <Locate width={sizeNum} height={sizeNum} />
            </Button>
          </Tooltip>
          <Tooltip content="store fiber node" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={storeFiber}>
              <Package width={sizeNum} height={sizeNum} />
            </Button>
          </Tooltip>
          <Tooltip content="force trigger" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={triggerFiber}>
              <Play width={sizeNum} height={sizeNum} />
            </Button>
          </Tooltip>
          <Tooltip content="inspect dom" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={inspectDomAction}>
              <SquareMousePointer width={sizeNum} height={sizeNum} />
            </Button>
          </Tooltip>
          <Tooltip content="force reload" showArrow color="foreground" placement="bottom-end">
            <Button isIconOnly size="sm" variant="flat" onPress={forceReload}>
              <RefreshCcw width={sizeNum - 1} height={sizeNum - 1} />
            </Button>
          </Tooltip>
          {isComponent > 0 && (
            <Tooltip content="inspect code" showArrow color="foreground" placement="bottom-end">
              <Button isIconOnly size="sm" variant="flat" onPress={inspectComAction}>
                <Bug width={sizeNum} height={sizeNum} />
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>

        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
