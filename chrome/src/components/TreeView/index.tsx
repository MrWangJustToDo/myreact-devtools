import { debounce } from "@my-react-devtool/core";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useAppTree, getTreeElementAtIndex, getTreeIndexOfElement } from "@/hooks/useAppTree";
import { useAutoWidthTree } from "@/hooks/useAutoWidthTree";
import { useKeyboardSelect } from "@/hooks/useKeyboardSelect";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useDomSize } from "@/hooks/useSize";

import { TreeItem } from "./TreeItem";
import { TreeViewHover } from "./TreeViewHover";
import { TreeViewSetting } from "./TreeViewSetting";

import type { CSSProperties } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const DEFAULT_INDENTATION_SIZE = 10;

const updateIndentationSizeVar = debounce((container: HTMLDivElement, lastIndentSizeRef: { current: number }, lastContainerWidthRef: { current: number }) => {
  const children = Array.from(container.querySelectorAll("[data-depth]")) as HTMLDivElement[];

  const listWidth = container.clientWidth;

  let maxIndentationSize: number = lastIndentSizeRef.current || DEFAULT_INDENTATION_SIZE;

  if (listWidth > lastContainerWidthRef.current) {
    maxIndentationSize = DEFAULT_INDENTATION_SIZE;
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

  // container.style.setProperty("--width-size", `${listWidth}px`);

  container.style.opacity = "1";
}, 16);

const TREE_ITEM_PADDING_X = 4; // px-[2px] left + right on TreeItem inner row

const updateContainerWidth = debounce((container: HTMLDivElement, lastContainerWidthRef: { current: number }, forceSetLeft?: boolean) => {
  const children = Array.from(container.querySelectorAll("[data-depth]")) as HTMLDivElement[];

  const indentSize = parseFloat(getComputedStyle(container).getPropertyValue("--indentation-size")) || DEFAULT_INDENTATION_SIZE;

  let childMaxWidth = 0;

  for (const child of children) {
    const depth = parseInt(child.getAttribute("data-depth") || "0", 10) || 0;
    // Measure intrinsic content, not the row already stretched by --width-size / 100%
    const contentWidth = (child.querySelector("[data-content]") as HTMLElement | null)?.scrollWidth || 0;
    const childWidth = depth * indentSize + contentWidth + TREE_ITEM_PADDING_X;

    childMaxWidth = Math.max(childMaxWidth, childWidth);
  }

  // Keep the historical max so scrolling past narrower rows doesn't shrink the content width
  // (scrollbar stays; previously-seen wide items remain reachable without re-scrolling horizontally)
  const prevWidth = parseFloat(container.style.getPropertyValue("--width-size")) || 0;
  const listWidth = Math.max(Math.ceil(childMaxWidth), prevWidth);

  lastContainerWidthRef.current = listWidth;

  container.style.setProperty("--width-size", `${listWidth}px`);

  container.style.opacity = "1";

  if (forceSetLeft) {
    const scrollLeft = Math.max(0, listWidth - container.clientWidth);
    // Virtuoso root is the scrollport; TreeViewHover injects a <style> as a sibling
    const scroller = container.querySelector<HTMLElement>(".font-code");

    if (scroller) {
      scroller.scrollLeft = scrollLeft;
    }
  }
}, 16);

const NodeItem = ({ index }: { index: number }) => {
  const node = getTreeElementAtIndex(index);

  useAppTree.useShallowSelector((s) => s.updateCount);

  if (!node) return <div style={{ height: 20 }} />;

  return <TreeItem node={node} />;
};

const TreeViewImpl = memo(
  ({
    onScroll,
    totalCount,
    onMount,
    fixedWidth,
  }: {
    onScroll: (forceSetLeft?: boolean) => void;
    totalCount: number;
    onMount: (s?: VirtuosoHandle) => void;
    fixedWidth: boolean;
  }) => {
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
            // 只有在页面上通过点击选中元素定位的场景才强制同步left，避免影响正常滚动
            ref.current?.scrollIntoView({ index: idx, align: "center", done: () => onScroll(true) });
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

      setTimeout(() => onScroll(true), 1000);

      return () => onMount();
    }, [onMount, onScroll, index]);

    return (
      <Virtuoso
        className={`font-code font-sm ${fixedWidth ? "overflow-x-hidden w-full" : "w-auto"}`}
        ref={ref}
        increaseViewportBy={300}
        onScroll={() => onScroll()}
        key={index}
        initialTopMostItemIndex={{ index, align: "center" }}
        totalCount={totalCount}
        itemContent={render}
      />
    );
  }
);

TreeViewImpl.displayName = "TreeViewImpl";

export const TreeView = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  const state = useAutoWidthTree((s) => s.state);

  const totalWeight = useAppTree.useShallowStableSelector((s) => s.totalWeight) as number;

  const refreshKey = useAppTree.useShallowStableSelector((s) => s.refreshKey) as number;

  const { width, height } = useDomSize({ ref });

  const [r, setR] = useState<VirtuosoHandle>();

  const lastIndentSizeRef = useRef(DEFAULT_INDENTATION_SIZE);

  const lastContainerWidthRef = useRef(width);

  useKeyboardSelect();

  const onScroll = useCallback(
    (forceSetLeft?: boolean) => {
      if (ref.current) {
        if (state) {
          updateIndentationSizeVar(ref.current as HTMLDivElement, lastIndentSizeRef, lastContainerWidthRef);
        } else {
          updateContainerWidth(ref.current as HTMLDivElement, lastContainerWidthRef, forceSetLeft);
        }
      }
    },
    [state]
  );

  useEffect(() => {
    onScroll();
  }, [onScroll, width, height, totalWeight]);

  return (
    <div className="tree-view h-full p-1 transform-gpu">
      <div
        key={state ? "auto-width" : "static-width"}
        className="group h-full transform-gpu"
        ref={ref}
        style={{ opacity: 0, ["--indentation-size"]: `${DEFAULT_INDENTATION_SIZE}px` } as CSSProperties}
      >
        <TreeViewHover />
        {totalWeight > 0 && <TreeViewImpl key={refreshKey} onScroll={onScroll} totalCount={totalWeight} onMount={setR} fixedWidth={state} />}
      </div>
      <TreeViewSetting handle={r} />
    </div>
  );
});

TreeView.displayName = "TreeView";
