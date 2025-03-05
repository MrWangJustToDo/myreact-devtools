import { debounce, type PlainNode } from "@my-react-devtool/core";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useDomSize } from "@/hooks/useSize";
import { UISize, useUISize } from "@/hooks/useUISize";

import { TreeItem } from "./TreeItem";
import { TreeViewSetting } from "./TreeViewSetting";

import type { VirtuosoHandle } from "react-virtuoso";

const updateIndentationSizeVar = debounce((container: HTMLDivElement, lastIndentSizeRef: { current: number }, lastContainerWidthRef: { current: number }) => {
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
}, 16);

const TreeViewImpl = memo(({ onScroll, data, onMount }: { onScroll: () => void; data: PlainNode[]; onMount: (s?: VirtuosoHandle) => void }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const ref = useRef<VirtuosoHandle>(null);

  const [initialIndex] = useState(() => {
    const select = useSelectNode.getReadonlyState().select;
    const index = data.findIndex((item) => item.i === select);
    if (index === -1) {
      return 0;
    }
    return index;
  });

  const dataRef = useRef(data);

  dataRef.current = data;

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const render = useCallbackRef((index: number, _: unknown, { isScrolling }: { isScrolling?: boolean }) => {
    const node = data[index];

    if (!node) return null;

    return (
      <TreeItem node={node} isScrolling={isScrolling} className={size === UISize.sm ? "text-[12px]" : size === UISize.md ? "text-[14px]" : "text-[16px]"} />
    );
  });

  useEffect(() => {
    if (initialIndex !== 0) {
      setTimeout(onScroll);
    }
  }, [initialIndex, onScroll]);

  useEffect(() => {
    const cb = useSelectNode.subscribe(
      (s) => s.scroll,
      () => {
        const select = useSelectNode.getReadonlyState().select;
        const index = dataRef.current?.findIndex((item) => item.i === select);
        if (index !== -1) {
          ref.current?.scrollIntoView({ index, align: "center" });
        }
      }
    );

    return cb;
  }, []);

  useEffect(() => {
    onMount(ref.current as VirtuosoHandle);

    return () => onMount();
  }, [onMount]);

  return (
    <Virtuoso
      ref={ref}
      increaseViewportBy={500}
      isScrolling={setIsScrolling}
      initialTopMostItemIndex={{ index: initialIndex, align: "center" }}
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

    const cb = useSelectNode.subscribe(
      (s) => s.scroll,
      () => setTimeout(onScroll, 20)
    );

    return cb;
  }, [width, height, nodes.length, onScroll]);

  return (
    <div className="tree-view h-full p-1">
      <div className="group h-full transform-gpu" ref={ref}>
        {nodes.length > 0 && <TreeViewImpl onScroll={onScroll} data={nodes} onMount={setR} />}
        <TreeViewSetting handle={r} />
      </div>
    </div>
  );
});

TreeView.displayName = "TreeView";
