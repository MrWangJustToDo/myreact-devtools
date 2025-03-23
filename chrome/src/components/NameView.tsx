import { Button, ButtonGroup, Divider, Tooltip } from "@heroui/react";
import { NODE_TYPE, type PlainNode } from "@my-react-devtool/core";
import { Bug, Eye, Locate, Package, Play } from "lucide-react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { TreeItem } from "./TreeItem";

const { storeFiber, triggerFiber, scrollIntoView, inspectComAction, inspectDomAction } = useSelectNode.getActions();

export const NameView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const isComponent = currentSelectDetail?.t & NODE_TYPE.__class__ || currentSelectDetail?.t & NODE_TYPE.__function__;

  if (currentSelectDetail) {
    return (
      <>
        <div className={`node-name p-2 pb-0 sticky font-lg font-code top-0 bg-content1 transition-transform-background z-50`}>
          <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
          <ButtonGroup className="absolute right-4 top-0">
            <Tooltip content="force scroll to select" showArrow color="foreground" placement="bottom-end">
              <Button isIconOnly size="sm" variant="flat" onPress={scrollIntoView}>
                <Locate className="w-[1.1em]" />
              </Button>
            </Tooltip>
            <Tooltip content="store fiber node" showArrow color="foreground" placement="bottom-end">
              <Button isIconOnly size="sm" variant="flat" onPress={storeFiber}>
                <Package className="w-[1.1em]" />
              </Button>
            </Tooltip>
            <Tooltip content="force trigger" showArrow color="foreground" placement="bottom-end">
              <Button isIconOnly size="sm" variant="flat" onPress={triggerFiber}>
                <Play className="w-[1.1em]" />
              </Button>
            </Tooltip>
            <Tooltip content="inspect dom" showArrow color="foreground" placement="bottom-end">
              <Button isIconOnly size="sm" variant="flat" onPress={inspectDomAction}>
                <Eye className="w-[1.1em]" />
              </Button>
            </Tooltip>
            {isComponent > 0 && (
              <Tooltip content="inspect code" showArrow color="foreground" placement="bottom-end">
                <Button isIconOnly size="sm" variant="flat" onPress={inspectComAction}>
                  <Bug className="w-[1.1em]" />
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </div>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};
