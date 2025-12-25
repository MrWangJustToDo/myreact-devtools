import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { ComponentIcon } from "lucide-react";

import { useRecordStack } from "@/hooks/useRecordStack";

import { TreeItemWithId } from "../TreeView/TreeItem";
import { ValueView } from "../ValueView";

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
            <Accordion>
              {root.list.map((i) => (
                <AccordionItem key={i.i} title={<TreeItemWithId i={i.i} n={i.n} key={i.i} withCollapse={false} withSelect={false} withFallback />}>
                  {i.updater.map((u, index) => (
                    <div key={index} className="font-code">
                      <ValueView name={index.toString()} item={u} />
                    </div>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
