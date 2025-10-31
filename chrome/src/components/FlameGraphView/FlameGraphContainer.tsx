import { Button, ButtonGroup, Divider, Tooltip } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useRecordStack } from "@/hooks/useRecordStack";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useDomSize } from "@/hooks/useSize";

import { TreeItem } from "../TreeView/TreeItem";

import { FlameGraphNode } from "./FlameGraphNode";

import type { PlainNode, StackItemType } from "@my-react-devtool/core";

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type SafeStackItemType = DeepRequired<StackItemType>;

export const FlameGraphContainer = () => {
  const { state, record } = useRecordStack((s) => ({ state: s.state, record: s.select })) as {
    state: Array<{ stack: SafeStackItemType; id?: string }>;
    record?: SafeStackItemType;
  };

  const { clearSelect } = useRecordStack.getActions();

  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.i === select) as PlainNode;

  const [index, setIndex] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const { width } = useDomSize({ ref });

  const hasNextPage = index === 0 ? state.length > 4 : state.length - index * 4 > 4;

  const hasPrevPage = index > 0;

  const currentPageStack = state.slice(index * 4, index * 4 + 4);

  const onNextPage = () => {
    if (hasNextPage) {
      setIndex((i) => i + 1);
      clearSelect();
    }
  };

  const onPrevPage = () => {
    if (hasPrevPage) {
      setIndex((i) => i - 1);
      clearSelect();
    }
  };

  const totalStackTime = Math.ceil(
    useMemo(() => (record ? record.e - record.s : currentPageStack.reduce((p, c) => p + c.stack.e - c.stack.s, 0)), [currentPageStack, record])
  );

  return (
    <div
      className="w-full flex flex-col"
      ref={ref}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ["--flameGraph-width-step"]: `calc(${width - currentPageStack.length}px/${totalStackTime})`,
        ["--flameGraph-height-step"]: `20px`,
      }}
    >
      <div className="sticky top-0 z-50">
        <div className="flex node-name p-2 pb-0 font-lg font-code bg-content1">
          {currentSelectDetail ? (
            <TreeItem node={currentSelectDetail} withCollapse={false} withSelect={false} withKey={false} />
          ) : (
            <div className="opacity-0">1</div>
          )}
          <div className="ml-auto flex gap-x-2 absolute right-4 top-0">
            {(hasPrevPage || hasNextPage) && (
              <ButtonGroup size="sm">
                {hasPrevPage && (
                  <Button onPress={onPrevPage} isIconOnly>
                    <ChevronLeftIcon className="w-[1.2em]" />
                  </Button>
                )}
                {hasNextPage && (
                  <Button onPress={onNextPage} isIconOnly>
                    <ChevronRightIcon className="w-[1.2em]" />
                  </Button>
                )}
              </ButtonGroup>
            )}
            {record && (
              <Button size="sm" isIconOnly onPress={clearSelect}>
                <ChevronUpIcon className="w-[1.2em]" />
              </Button>
            )}
            <Tooltip content="Clear Recorded Data" showArrow placement="bottom-end">
              <Button
                isIconOnly
                size="sm"
                onPress={() => {
                  useRecordStack.getActions().clearStack();
                  setIndex(0);
                }}
              >
                <XIcon className="w-[1.2em]" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <Divider />
      </div>
      <div className="flex mt-1">
        {record ? (
          <FlameGraphNode isRoot={true} parent={undefined} previous={undefined} current={record as SafeStackItemType} />
        ) : (
          currentPageStack.map((item, index) => {
            const prev = index > 0 ? currentPageStack[index - 1] : undefined;
            return (
              <FlameGraphNode
                key={index}
                isRoot={true}
                parent={undefined}
                previous={prev ? (prev.stack as SafeStackItemType) : undefined}
                current={item.stack as SafeStackItemType}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
