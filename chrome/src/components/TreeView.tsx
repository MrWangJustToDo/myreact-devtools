import { useIsomorphicLayoutEffect } from "framer-motion";
import { memo, useCallback, useMemo, useRef } from "react";
import { FixedSizeList } from "react-window";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDomSize } from "@/hooks/useSize";
import { flattenNode } from "@/utils/flattenTree";

import { RenderItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";
import type { CSSProperties } from "react";

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

export const TreeView = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  const nodes = useAppTree(useCallback((s) => s.nodes, [])) as PlainNode[];

  const data = useMemo(() => flattenNode(nodes), [nodes]);

  const { width, height } = useDomSize({ ref });

  const lastIndentSizeRef = useRef(12);

  const lastContainerWidthRef = useRef(width);

  const render = useCallbackRef(({ index, style }: { index: number; style: CSSProperties }) => {
    const node = data[index];
    return <RenderItem node={node} width={width} style={style} />;
  });

  const onScroll = useCallback(() => {
    if (ref.current) {
      updateIndentationSizeVar(ref.current as HTMLDivElement, lastIndentSizeRef, lastContainerWidthRef);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    onScroll();
  }, [width, height]);

  return (
    <div className="tree-view h-full border rounded-sm border-gray-100 group" ref={ref}>
      <FixedSizeList height={height} width={width} onScroll={onScroll} overscanCount={30} itemCount={data.length} itemSize={20}>
        {render}
      </FixedSizeList>
    </div>
  );
});

TreeView.displayName = "TreeView";
