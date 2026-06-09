import { debounce } from "@my-react-devtool/core";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useAppTree, getTreeElementAtIndex, getTreeIndexOfElement } from "@/hooks/useAppTree";
import { useKeyboardSelect } from "@/hooks/useKeyboardSelect";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useDomSize } from "@/hooks/useSize";

import { TreeItem } from "./TreeItem";
import { TreeViewHover } from "./TreeViewHover";
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

  container.style.opacity = "1";
}, 16);

const NodeItem = ({ index }: { index: number }) => {
  const node = getTreeElementAtIndex(index);

  useAppTree.useShallowSelector((s) => s.updateCount);

  if (!node) return <div style={{ height: 20 }} />;

  return <TreeItem node={node} />;
};

const TreeViewImpl = memo(({ onScroll, totalCount, onMount }: { onScroll: () => void; totalCount: number; onMount: (s?: VirtuosoHandle) => void }) => {
  const ref = useRef<VirtuosoHandle>(null);

  const [index, setIndex] = useState(0);

  const mountRef = useRef(false);

  const totalCountRef = useRef(totalCount);

  totalCountRef.current = totalCount;

  const render = useCallback((index: number) => <NodeItem index={index} />, []);

  useEffect(() => {
    const scrollToCurrent = () => {
      const select = useSelectNode.getReadonlyState().select;

      if (select === null || select === undefined) return;

      const idx = getTreeIndexOfElement(select);

      if (idx !== -1) {
        if (!mountRef.current) {
          mountRef.current = true;
          setIndex(idx);
        } else {
          ref.current?.scrollIntoView({ index: idx, align: "center", done: onScroll });
        }
      }
    };

    const cb = useSelectNode.subscribe((s) => s.scroll, scrollToCurrent);

    if (totalCount > 0) {
      scrollToCurrent();
    }

    return cb;
  }, [onScroll, totalCount]);

  useEffect(() => {
    const id = setTimeout(() => (mountRef.current = true), 1000);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    onMount(ref.current as VirtuosoHandle);

    return () => onMount();
  }, [onMount, index]);

  return (
    <Virtuoso
      className="font-code font-sm overflow-x-hidden"
      ref={ref}
      increaseViewportBy={300}
      onScroll={onScroll}
      key={index}
      initialTopMostItemIndex={{ index, align: "center" }}
      totalCount={totalCount}
      itemContent={render}
    />
  );
});

TreeViewImpl.displayName = "TreeViewImpl";

export const TreeView = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  const totalWeight = useAppTree.useShallowStableSelector((s) => s.totalWeight) as number;

  const { width, height } = useDomSize({ ref });

  const [r, setR] = useState<VirtuosoHandle>();

  const lastIndentSizeRef = useRef(12);

  const lastContainerWidthRef = useRef(width);

  useKeyboardSelect();

  const onScroll = useCallback(() => {
    if (ref.current) {
      updateIndentationSizeVar(ref.current as HTMLDivElement, lastIndentSizeRef, lastContainerWidthRef);
    }
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll, width, height, totalWeight]);

  return (
    <div className="tree-view h-full p-1">
      <div className="group h-full transform-gpu" ref={ref} style={{ opacity: 0 }}>
        <TreeViewHover />
        {totalWeight > 0 && <TreeViewImpl onScroll={onScroll} totalCount={totalWeight} onMount={setR} />}
        <TreeViewSetting handle={r} />
      </div>
    </div>
  );
});

TreeView.displayName = "TreeView";
