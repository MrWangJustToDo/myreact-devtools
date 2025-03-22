import { Button, Divider, Input, NumberInput, Popover, PopoverContent, PopoverTrigger, Switch, useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";

import { useChunk } from "@/hooks/useChunk";
import { useUpdateState } from "@/hooks/useUpdateState";

import type { NodeValue } from "@my-react-devtool/core";
import type { ReactNode } from "react";

const { setUpdateState, clear } = useUpdateState.getActions();

export const NodeValueChange = ({
  item,
  rootItem,
  parentItem,
  hookIndex,
  path,
  type,
  chunkId,
  children,
}: {
  item: NodeValue;
  rootItem?: NodeValue;
  parentItem?: NodeValue;
  hookIndex?: number;
  path: string;
  type: string;
  chunkId?: number;
  children: ReactNode;
}) => {
  const [val, setVal] = useState("");

  const { isOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setVal(String(item.v));
    }
  }, [isOpen, item.v]);

  const onUpdate = () => {
    if (val === item.v) return;

    setUpdateState({ id: item.i, rootId: rootItem?.i, parentId: parentItem?.i, oldVal: item.v, newVal: val, hookIndex, path, type });

    onClose();

    setTimeout(() => {
      if (chunkId) {
        useChunk.getActions().setLoading(chunkId);
      }
      clear();
    }, 60);
  };

  return (
    <Popover placement="bottom" isOpen={isOpen} backdrop="opaque" triggerScaleOnOpen={false} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <span className="cursor-pointer">✨ {children}</span>
      </PopoverTrigger>
      <PopoverContent className="text-[13px]">
        <div className="p-2 min-w-[200px]">
          {item.t === "Boolean" && <Switch autoFocus size="sm" isSelected={val === "true"} onValueChange={() => setVal(val === "true" ? "false" : "true")} />}
          {item.t === "Number" && <NumberInput autoFocus size="sm" value={+val} onValueChange={(l) => setVal(l.toString())} />}
          {item.t === "String" && <Input autoFocus size="sm" value={val} onValueChange={(l) => setVal(l)} />}
          <Divider className="my-3" />
          <div className="flex justify-end">
            <Button size="sm" color="danger" onPress={onClose}>
              Cancel
            </Button>
            <Button size="sm" className="ml-2" color="primary" onPress={onUpdate}>
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
