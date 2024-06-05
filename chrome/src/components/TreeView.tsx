import { useIsomorphicLayoutEffect } from "framer-motion";
import { memo, useCallback, useMemo, useRef } from "react";
import { FixedSizeList } from "react-window";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useDomSize } from "@/hooks/useSize";
import { useTreeNode } from "@/hooks/useTreeNode";
import { flattenNode } from "@/utils/flattenTree";
import { checkHasInclude, currentHasCloseList } from "@/utils/node";

import { RenderItem } from "./TreeItem";
import { TreeViewSetting } from "./TreeViewSetting";

import type { TreeNode} from "@/utils/node";
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

  const _data = useMemo(() => flattenNode(nodes), [nodes]);

  const filterType = useFilterNode((s) => s.filter);

  const closeList = useTreeNode((s) => s.closeList) as TreeNode[];

  const typeArray = useMemo(() => Array.from(filterType).map((i) => +i), [filterType]);

  const __data = useMemo(() => _data.filter((item) => !checkHasInclude(item, typeArray)), [typeArray, _data]);

  const data = useMemo(() => __data.filter((item) => !currentHasCloseList(item, closeList)), [__data, closeList]);

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
  }, [width, height, data]);

  return (
    <div className="tree-view h-full border rounded-md border-gray-200 group transform-cpu" ref={ref}>
      <FixedSizeList height={height} width={width} className=" overflow-x-hidden" onScroll={onScroll} overscanCount={30} itemCount={data.length} itemSize={22}>
        {render}
      </FixedSizeList>
      <TreeViewSetting />
    </div>
  );
});

TreeView.displayName = "TreeView";
