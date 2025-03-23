import { Button, Divider, NumberInput, Popover, PopoverContent, PopoverTrigger, Switch, Textarea, useDisclosure } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

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

  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setVal(String(item.v));
      setWidth(ref.current?.offsetWidth || 0);
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
    <>
      <span className="cursor-pointer">✨ {children}</span>
      <Popover placement="bottom" isOpen={isOpen} backdrop="opaque" triggerScaleOnOpen={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div ref={ref} className="absolute w-full h-full left-0 top-0 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-2 min-w-[200px]" style={{ minWidth: width ?? 200 }}>
            {item.t === "Boolean" && <Switch size="sm" isSelected={val === "true"} onValueChange={() => setVal(val === "true" ? "false" : "true")} />}
            {item.t === "Number" && <NumberInput variant="bordered" disableAnimation size="sm" value={+val} onValueChange={(l) => setVal(l.toString())} />}
            {item.t === "String" && (
              <Textarea
                classNames={{ input: "resize-y min-h-[40px]" }}
                className="font-code"
                variant="bordered"
                disableAnimation
                disableAutosize
                size="sm"
                value={val}
                onValueChange={(l) => setVal(l)}
              />
            )}
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
    </>
  );
};
