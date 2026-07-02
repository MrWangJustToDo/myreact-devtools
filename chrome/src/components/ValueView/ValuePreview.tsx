import { Button, Chip, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@heroui/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { NodeValue } from "@my-react-devtool/core";
import type { ReactNode } from "react";

export const ValuePreview = ({ item, children }: { item: NodeValue; children: ReactNode }) => {
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

  return (
    <>
      <span className="cursor-pointer">{children}</span>
      <Popover placement="bottom" isOpen={isOpen} onClose={onClose} backdrop="opaque" triggerScaleOnOpen={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <div ref={ref} className="absolute w-full h-full left-0 top-0 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="p-0 shadow-lg">
          <div className="flex flex-col" style={{ minWidth: width ?? 280 }}>
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Preview</span>
                <Chip size="sm" variant="flat" classNames={{ content: "px-1" }} className="rounded-sm h-[1.3em] min-w-0">
                  {item.t}
                </Chip>
              </div>
              <Button size="sm" isIconOnly variant="light" className="h-6 w-6 min-w-0 text-foreground-400" onPress={onClose}>
                <X className="w-[0.85em]" />
              </Button>
            </div>
            <div className="px-4 pb-4 max-h-[50vh] overflow-auto">
              <Textarea classNames={{ input: "resize-y min-h-[60px] font-code text-sm" }} variant="bordered" disableAnimation size="sm" value={val} readOnly />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
