import { Button, Chip, NumberInput, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Textarea, useDisclosure } from "@heroui/react";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useChunk } from "@/hooks/useChunk";
import { useUpdateState } from "@/hooks/useUpdateState";

import { Color } from "./Color";

import type { NodeValue } from "@my-react-devtool/core";
import type { ReactNode } from "react";

const { setUpdateState, clear } = useUpdateState.getActions();

const cssColor = (str: string) => {
  if (!str) return false;
  const s = new Option().style;
  s.color = str;
  return s.color !== "";
};

// const isUrl = (str: string) => /^https?:\/\/\S+$/i.test(str);

// const openUrlInNewTab = (url: string) => {
//   if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
//     chrome.tabs.create({ url });
//   } else {
//     window.open(url, "_blank", "noopener");
//   }
// };

export const ValueChange = ({
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
      setWidth(ref.current?.offsetWidth ? ref.current.offsetWidth + 40 : 0);
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
      <span className="cursor-pointer">
        <Chip size="sm" variant="flat" color="primary" classNames={{ content: "p-0" }} className="h-[1.3em] min-w-0 !px-1 rounded-sm">
          <Pencil className="w-[0.65em] h-[0.65em]" />
        </Chip>
        {item.t === "String" && cssColor(String(item.v)) && <Color value={String(item.v)} />}
        {children}
      </span>
      <Popover placement="bottom" isOpen={isOpen} backdrop="opaque" triggerScaleOnOpen={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div ref={ref} className="absolute w-full h-full left-0 top-0 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="p-0 shadow-lg">
          <div className="flex flex-col min-w-[250px]" style={{ minWidth: width ?? 250 }}>
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Edit Value</span>
                <Chip size="sm" variant="flat" color="primary" classNames={{ content: "px-1" }} className="rounded-sm h-[1.3em] min-w-0">
                  {item.t}
                </Chip>
              </div>
            </div>
            <div className="px-4">
              {item.t === "Boolean" && (
                <Select
                  variant="bordered"
                  size="sm"
                  disableAnimation
                  selectedKeys={[val]}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0];
                    if (v) setVal(v as string);
                  }}
                >
                  <SelectItem key="true">true</SelectItem>
                  <SelectItem key="false">false</SelectItem>
                </Select>
              )}
              {item.t === "Number" && <NumberInput variant="bordered" disableAnimation size="sm" value={+val} onValueChange={(l) => setVal(l.toString())} />}
              {item.t === "String" && (
                <Textarea
                  classNames={{ input: "resize-y min-h-[60px] font-code text-sm" }}
                  variant="bordered"
                  disableAnimation
                  disableAutosize
                  size="sm"
                  value={val}
                  onValueChange={(l) => setVal(l)}
                />
              )}
            </div>
            <div className="flex justify-end gap-2 px-4 py-2">
              <Button size="sm" variant="light" startContent={<X className="w-[0.85em]" />} onPress={onClose}>
                Cancel
              </Button>
              <Button size="sm" color="primary" startContent={<Check className="w-[0.85em]" />} onPress={onUpdate}>
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
