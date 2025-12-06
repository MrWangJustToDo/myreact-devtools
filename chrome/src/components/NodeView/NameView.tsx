import { Button, ButtonGroup, Divider, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { NODE_TYPE, type PlainNode } from "@my-react-devtool/core";
import { Bug, Eye, GitCompareArrowsIcon, Locate, Package, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { useCompare } from "@/hooks/useCompare";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { TreeItem } from "../TreeView/TreeItem";

import { CompareView } from "./CompareView";

const { storeFiber, triggerFiber, scrollIntoView, inspectComAction, inspectDomAction } = useSelectNode.getActions();

export const NameView = ({ node }: { node?: PlainNode }) => {
  const currentSelectDetail = node;

  const [count, setCount] = useState(0);

  const nextNode = node;

  const prevNode = useDetailNode.useShallowStableSelector((s) => s.prevNode) as PlainNode;

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const isComponent = currentSelectDetail && (currentSelectDetail?.t & NODE_TYPE.__class__ || currentSelectDetail?.t & NODE_TYPE.__function__);

  useEffect(() => {
    setCount((c) => c + 1);
  }, [prevNode]);

  useEffect(() => {
    const clearExpandState = useCompare.getActions().reset;

    return clearExpandState;
  }, []);

  if (currentSelectDetail) {
    return (
      <div className="sticky top-0 z-50">
        <div className={`node-name p-2 pb-0 font-lg font-code bg-content1 transition-transform-background`}>
          <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} withRunningCount />
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
            {Boolean(isComponent) && (
              <Tooltip content="inspect code" showArrow color="foreground" placement="bottom-end">
                <Button isIconOnly size="sm" variant="flat" onPress={inspectComAction}>
                  <Bug className="w-[1.1em]" />
                </Button>
              </Tooltip>
            )}
            {prevNode && nextNode && (
              <Tooltip content="compare with previous node" showArrow color="foreground" placement="bottom-end">
                <Button isIconOnly size="sm" variant="flat" onPress={onOpen}>
                  <GitCompareArrowsIcon className="w-[1.1em] rotate-180" />
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </div>
        <Divider />
        <Modal isOpen={isOpen} scrollBehavior="inside" size="4xl" onClose={onClose} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>
              <div className="flex items-center">
                <h2>Compare Node (+{count})</h2>
              </div>
            </ModalHeader>
            <ModalBody className="font-sm">
              <div className="flex">
                <CompareView node={prevNode} side="l" />
                <Divider className="h-auto" orientation="vertical" />
                <CompareView node={nextNode} side="r" />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
};
