import { getTypeName, typeKeys } from "@my-react-devtool/core";
import { Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { GearIcon } from "@radix-ui/react-icons";
import { memo } from "react";

import { useFilterNode } from "@/hooks/useFilterNode";

import type { ChangeEvent } from "react";

const onChange = useFilterNode.getActions().onChange;

export const TreeViewSetting = memo(() => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const values = useFilterNode((s) => s.filter);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(new Set(e.target.value.split(",")));
  };

  return (
    <>
      <Button isIconOnly className="fixed top-3 right-3 z-10" variant="bordered" onClick={onOpen}>
        <GearIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isDismissable={false} placement="top">
        <ModalContent className=" text-[16px]">
          <ModalHeader>
            <p className="text-[18px]">TreeView Setting</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center">
              <Select
                label={<p className=" whitespace-nowrap text-[14px]">Filter Node: </p>}
                selectionMode="multiple"
                placeholder="Select a Type"
                selectedKeys={values}
                className="flex items-center"
                radius="sm"
                variant="bordered"
                size="lg"
                onChange={handleSelectionChange}
              >
                {typeKeys.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getTypeName(type)}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="bordered">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

TreeViewSetting.displayName = "TreeViewSetting";
