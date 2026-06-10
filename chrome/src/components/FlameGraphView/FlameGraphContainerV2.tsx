import { Button, ButtonGroup, Divider, Tooltip } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { useMemo, useRef } from "react";
import { toRaw } from "reactivity-store";

import { useNodeName } from "@/hooks/useNodeName";
import { useRecordStack } from "@/hooks/useRecordStack";
import { useDomSize } from "@/hooks/useSize";
import { useUnmountNode } from "@/hooks/useUnmountNode";

import { FlameGraphBars } from "./FlameGraphBars";
import { buildFlameLayout } from "./flameGraphLayout";
import { FlameGraphName } from "./FlameGraphName";
import { FlameGraphTrigger } from "./FlameGraphTrigger";
import { FlameGraphViewModeSwitch } from "./FlameGraphViewModeSwitch";

import type { RootStack, SafeStackItemType } from "./types";
import type { StackRecordItem } from "@/hooks/useRecordStack";

export const FlameGraphContainerV2 = () => {
  const { index, state, record } = useRecordStack((s) => ({ state: s.state, record: s.select, index: s.index })) as {
    index: number;
    state: RootStack;
    record?: SafeStackItemType;
  };

  const { clearSelect, setIndex } = useRecordStack.getActions();

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
    useMemo(
      () => (record ? record.e2 - record.s : currentPageStack.reduce((p, c) => p + (c?.stack?.e2 || 0) - (c?.stack?.s || 0), 0)),
      [currentPageStack, record]
    )
  );

  const nameMap = useNodeName((s) => s.map);
  const unmountState = useUnmountNode((s) => s.state);
  const selectedRoot = toRaw(useRecordStack((s) => s.root)) as StackRecordItem | undefined;

  const ROW_HEIGHT = 20;

  const layout = useMemo(() => {
    if (width <= 0 || totalStackTime <= 0) {
      return { items: [], totalWidth: 0, totalHeight: ROW_HEIGHT };
    }

    const gapCount = record ? 0 : Math.max(0, currentPageStack.length - 1);
    const pxPerMs = (width - gapCount) / totalStackTime;

    return buildFlameLayout(currentPageStack, record, selectedRoot, {
      pxPerMs,
      rowHeight: ROW_HEIGHT,
      getName: (n) => nameMap[n] ?? n,
      hasUnmount: (id) => !!unmountState[id],
    });
  }, [width, totalStackTime, currentPageStack, record, selectedRoot, nameMap, unmountState]);

  return (
    <div className="w-full h-full overflow-auto" ref={ref}>
      <div className="sticky top-0 z-50">
        <div className="flex node-name p-2 pb-0 font-lg font-code bg-content1 transition-transform-background">
          <FlameGraphName />
          <div className="ml-auto flex gap-x-2 absolute right-4 top-0">
            <FlameGraphViewModeSwitch />
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
            <FlameGraphTrigger />
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
      <div className="relative mt-1 w-full" style={{ minHeight: layout.totalHeight }}>
        <FlameGraphBars items={layout.items} />
      </div>
    </div>
  );
};
