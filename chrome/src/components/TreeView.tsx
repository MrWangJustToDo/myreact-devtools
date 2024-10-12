import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDomSize } from "@/hooks/useSize";
import { useTreeNode } from "@/hooks/useTreeNode";
import { UISize, useUISize } from "@/hooks/useUISize";

import { RenderItem } from "./TreeItem";
import { TreeViewSetting } from "./TreeViewSetting";

import type { PlainNode } from "@my-react-devtool/core";
import type { VirtuosoHandle } from "react-virtuoso";

const updateIndentationSizeVar = (container: HTMLDivElement, lastIndentSizeRef: { current: number }, lastContainerWidthRef: { current: number }) => {
  const children = Array.from(container.querySelectorAll("[data-depth]")) as HTMLDivElement[];

  const listWidth = container.clientWidth;

  let maxIndentationSize: number = lastIndentSizeRef.current || 12;

  if (listWidth > lastContainerWidthRef.current) {
    maxIndentationSize = 12;
  }

  lastContainerWidthRef.current = listWidth;

  for (const child of children) {
    const depth = parseInt(child.getAttribute("data-depth") || "0", 10) || 0;

    if (depth === 0) {
      continue;
    }

    const childWidth: number = child.querySelector("[data-content]")?.clientWidth || 0;

    const remainingWidth = Math.max(0, listWidth - childWidth - 6);

    maxIndentationSize = Math.min(maxIndentationSize, remainingWidth / depth);
  }

  lastIndentSizeRef.current = maxIndentationSize;

  container.style.setProperty("--indentation-size", `${maxIndentationSize}px`);

  container.style.setProperty("--width-size", `${listWidth}px`);
};

const TreeViewImpl = memo(({ onScroll, data, onMount }: { onScroll: () => void; data: PlainNode[]; onMount: (s?: VirtuosoHandle) => void }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const ref = useRef<VirtuosoHandle>(null);

  const select = useTreeNode.useShallowStableSelector((s) => s.select);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const render = useCallbackRef((index: number, _: unknown, { isScrolling }: { isScrolling?: boolean }) => {
    const node = data[index];

    if (!node) return null;

    return (
      <RenderItem node={node} isScrolling={isScrolling} className={size === UISize.sm ? "text-[12px]" : size === UISize.md ? "text-[14px]" : "text-[16px]"} />
    );
  });

  const index = useMemo(() => data.findIndex((item) => item.id === select), [data, select]);

  useEffect(() => {
    if (index !== -1) {
      ref.current?.scrollIntoView({ index });
    }
  }, [index]);

  const hasLength = data.length > 0;

  useEffect(() => {
    if (hasLength) {
      onMount(ref.current as VirtuosoHandle);
    }

    return () => {
      onMount();
    };
  }, [hasLength, onMount]);

  if (!data.length) return null;

  return (
    <Virtuoso
      ref={ref}
      overscan={60}
      isScrolling={setIsScrolling}
      context={{ isScrolling }}
      onScroll={onScroll}
      totalCount={data.length}
      itemContent={render}
    />
  );
});

TreeViewImpl.displayName = "TreeViewImpl";

export const TreeView = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  const nodes = useAppTree.useShallowStableSelector((s) => s.list) as PlainNode[];

  const { width, height } = useDomSize({ ref });

  const [r, setR] = useState<VirtuosoHandle>();

  const lastIndentSizeRef = useRef(12);

  const lastContainerWidthRef = useRef(width);

  const onScroll = useCallback(() => {
    if (ref.current) {
      updateIndentationSizeVar(ref.current as HTMLDivElement, lastIndentSizeRef, lastContainerWidthRef);
    }
  }, []);

  useEffect(() => {
    onScroll();
  }, [width, height, nodes.length, onScroll]);

  return (
    <div data-container className="tree-view h-full border rounded-md border-gray-200 group transform-cpu" ref={ref}>
      <TreeViewImpl onScroll={onScroll} data={nodes} onMount={setR} />
      <TreeViewSetting handle={r} />
    </div>
  );
});

TreeView.displayName = "TreeView";
