import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput, Switch, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { useUpdateState } from "@/hooks/useUpdateState";

import type { NodeValue } from "@my-react-devtool/core";

const { setUpdateState } = useUpdateState.getActions();

export const NodeValueChange = ({
  item,
  rootItem,
  parentItem,
  index,
  path,
}: {
  item: NodeValue;
  rootItem?: NodeValue;
  parentItem?: NodeValue;
  index: number;
  path: string;
}) => {
  const [val, setVal] = useState("");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setVal(String(item.v));
    }
  }, [isOpen, item.v]);

  const onUpdate = () => {
    if (val === item.v) return;

    setUpdateState({ id: item.i, rootId: rootItem?.i, parentId: parentItem?.i, oldVal: item.v, newVal: val, hookIndex: index, path });

    onClose();
  };

  return (
    <>
      <span className="absolute flex justify-center items-center right-2 top-0 cursor-pointer">
        <Pencil className="w-[0.85em] h-[0.85em]" onClick={onOpen} />
      </span>
      <Modal isOpen={isOpen} size="2xl" onClose={onClose} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Inspect State</ModalHeader>
          <ModalBody>
            <p>
              <span className="font-semibold min-w-[8em] inline-block">Type: </span>
              <span className="text-gray-500">{item.t}</span>
            </p>
            <Divider />
            <p>
              <span className="font-semibold min-w-[8em] inline-block">Value: </span>
              <span className="text-gray-500">{item.v}</span>
            </p>
            <Divider />
            <p>
              <span className="font-semibold min-w-[8em] inline-block">Change To: </span>
              <span className="text-gray-600">{val}</span>
            </p>
            <p>
              {item.t === "Boolean" && <Switch isSelected={val === "true"} onValueChange={() => setVal(val === "true" ? "false" : "true")} />}
              {item.t === "Number" && <NumberInput value={+val} onValueChange={(l) => setVal(l.toString())} />}
              {item.t === "String" && <Input value={val} onValueChange={(l) => setVal(l)} />}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onUpdate}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
