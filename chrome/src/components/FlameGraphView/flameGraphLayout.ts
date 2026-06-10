import type { RootStack, SafeStackItemType } from "./types";
import type { StackRecordItem } from "@/hooks/useRecordStack";

export type FlameLayoutItem = {
  id: string;
  frameId: string | number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isRoot: boolean;
  isSelected: boolean;
  isLegacy: boolean;
  isConcurrent: boolean;
  hasUnmount: boolean;
  durationMs: number;
  rootDurationMs?: number;
  retryCount?: number;
  rootStack?: StackRecordItem;
  stackItem: SafeStackItemType;
  title: string;
};

export type FlameLayoutResult = {
  items: FlameLayoutItem[];
  totalWidth: number;
  totalHeight: number;
};

type BuildFlameLayoutOptions = {
  pxPerMs: number;
  rowHeight: number;
  getName: (n: string) => string;
  hasUnmount: (id: string | number) => boolean;
};

const getDuration = (current: SafeStackItemType): number => {
  const end = current.e2 ?? current.e1;
  if (current.s === undefined || end === undefined) return 0;

  let duration = Math.floor(end - current.s);
  if (duration === 0) duration = 1;

  return duration;
};

const getOffsetFromParent = (current: SafeStackItemType, parent: SafeStackItemType): number => {
  let left = Math.floor(current.s - parent.s);

  const end = current.e2 ?? current.e1;
  const width = end !== undefined ? Math.floor(end - current.s) : 0;
  if (width === 0) left -= 1;

  return Math.max(0, left);
};

const layoutNode = (
  current: SafeStackItemType,
  rootOrigin: SafeStackItemType,
  columnX: number,
  parent: SafeStackItemType | undefined,
  parentX: number,
  depth: number,
  y: number,
  rootStack: StackRecordItem | undefined,
  rootMeta: { isLegacy: boolean; isConcurrent: boolean; isSelected: boolean },
  opts: BuildFlameLayoutOptions,
  items: FlameLayoutItem[]
): number => {
  const end = current?.e2 ?? current?.e1;
  if (!current?.s || end === undefined || rootOrigin.s === undefined) return parentX;

  const duration = getDuration(current);
  const barWidth = Math.max(1, duration * opts.pxPerMs);

  const itemX = parent ? parentX + getOffsetFromParent(current, parent) * opts.pxPerMs : columnX + Math.max(0, current.s - rootOrigin.s) * opts.pxPerMs;

  const name = opts.getName(current.n) || " ";
  const durationMs = Math.ceil(end - current.s);
  const isRootBar = depth === 0;

  const itemIndex = items.length;

  items.push({
    id: `flameGraph-node-${current.i}`,
    frameId: current.i,
    name,
    x: itemX,
    y,
    width: barWidth,
    height: opts.rowHeight,
    isRoot: isRootBar,
    isSelected: isRootBar && rootMeta.isSelected,
    isLegacy: rootMeta.isLegacy,
    isConcurrent: rootMeta.isConcurrent,
    hasUnmount: !!opts.hasUnmount(current.i),
    durationMs,
    rootDurationMs: isRootBar && current.e1 !== undefined ? Math.ceil(current.e1 - current.s) : undefined,
    retryCount: current.r,
    rootStack,
    stackItem: current,
    title: `${name}${current.r ? ` +${current.r}` : ""}${rootMeta.isLegacy ? " | Legacy update" : ""}${rootMeta.isConcurrent ? " | Concurrent update" : ""} | Duration: ${durationMs / 1000} ms`,
  });

  let maxRight = itemX + barWidth;

  const children = (current.c ?? []).filter((child) => child && (child.e2 ?? child.e1)) as SafeStackItemType[];

  for (let i = 0; i < children.length; i++) {
    const childRight = layoutNode(children[i], rootOrigin, columnX, current, itemX, depth + 1, y + opts.rowHeight, rootStack, rootMeta, opts, items);

    maxRight = Math.max(maxRight, childRight);
  }

  if (depth > 0) {
    items[itemIndex].width = Math.max(barWidth, maxRight - itemX);
  }

  return maxRight;
};

const getRootColumnWidth = (root: SafeStackItemType, pxPerMs: number): number => {
  const end = root.e2 ?? root.e1;
  if (root.s === undefined || end === undefined) return 0;

  return Math.max(1, Math.floor(end - root.s) * pxPerMs);
};

const layoutRoot = (
  root: SafeStackItemType,
  columnX: number,
  rootStack: StackRecordItem | undefined,
  rootMeta: { isLegacy: boolean; isConcurrent: boolean; isSelected: boolean },
  opts: BuildFlameLayoutOptions,
  items: FlameLayoutItem[]
): number => {
  layoutNode(root, root, columnX, undefined, columnX, 0, 0, rootStack, rootMeta, opts, items);
  return getRootColumnWidth(root, opts.pxPerMs);
};

export const buildFlameLayout = (
  roots: RootStack,
  selectedStack: SafeStackItemType | undefined,
  selectedRoot: StackRecordItem | undefined,
  opts: BuildFlameLayoutOptions
): FlameLayoutResult => {
  const items: FlameLayoutItem[] = [];
  let columnX = 0;

  if (selectedStack) {
    const itemFull = roots.find((entry) => entry.stack === selectedStack);
    layoutRoot(
      selectedStack,
      0,
      itemFull,
      {
        isLegacy: itemFull?.mode === "legacy",
        isConcurrent: itemFull?.mode === "concurrent",
        isSelected: false,
      },
      opts,
      items
    );
    columnX = getRootColumnWidth(selectedStack, opts.pxPerMs);
  } else {
    for (let i = 0; i < roots.length; i++) {
      const entry = roots[i];

      if (i > 0) columnX += 1;

      const columnWidth = layoutRoot(
        entry.stack as SafeStackItemType,
        columnX,
        entry,
        {
          isLegacy: entry.mode === "legacy",
          isConcurrent: entry.mode === "concurrent",
          isSelected: !!selectedRoot && selectedRoot === entry,
        },
        opts,
        items
      );

      columnX += columnWidth;
    }
  }

  const totalWidth = columnX;
  const totalHeight = items.reduce((max, item) => Math.max(max, item.y + item.height), opts.rowHeight);

  return { items, totalWidth, totalHeight };
};
