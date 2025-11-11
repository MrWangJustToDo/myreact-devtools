import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { ComponentIcon } from "lucide-react";

import { useRecordStack } from "@/hooks/useRecordStack";

import { TreeItemWithId } from "../TreeView/TreeItem";

export const FlameGraphTrigger = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const root = useRecordStack((s) => s.root);

  if (!root || !root.list || root.list.length === 0) {
    return null;
  }

  return (
    <>
      <Button size="sm" isIconOnly onPress={onOpen}>
        <ComponentIcon className="w-[1.2em]" />
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" size="2xl" onClose={onClose} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          <ModalHeader>
            <h3>Trigger fiber</h3>
          </ModalHeader>
          <ModalBody className="p-4">
            {root.list.map((i) => (
              <TreeItemWithId i={i.i} n={i.n} key={i.i} withCollapse={false} withSelect={false} withFallback />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
