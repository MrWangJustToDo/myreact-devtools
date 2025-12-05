import { Chip, Spacer, Tooltip } from "@heroui/react";
import { getFiberTag } from "@my-react-devtool/core";
import { Play } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useRunningCount } from "@/hooks/useRunningCount";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import type { PlainNode } from "@my-react-devtool/core";

const { setSelect, setClose, setHover } = useSelectNode.getActions();

const RenderTag = memo(({ node }: { node: PlainNode }) => {
  const tag = getFiberTag(node);

  if (tag?.length) {
    return (
      <>
        <Spacer x={1} />
        <div className="gap-x-[2px] flex items-center">
          {tag.map((tag) => (
            <Chip
              key={tag}
              size="sm"
              color={tag.includes("compiler") ? "primary" : undefined}
              radius="none"
              className="rounded-md capitalize text-[8px] h-[14px]"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
});

RenderTag.displayName = "RenderTag";

const RenderKey = memo(({ node }: { node: PlainNode }) => {
  const finalKey = useNodeName(useCallback((s) => s.map?.[node.k!], [node.k]));

  return (
    <>
      <Spacer x={1} />
      <div data-key className="flex items-center gap-x-[1px] text-[11px]">
        <div className=" text-[#40af2c]">key</div>
        <div className=" text-gray-400">=</div>
        <div className="flex">
          {'"'}
          <Tooltip
            content={<div className="max-w-[300px] max-h-[400px] overflow-y-auto whitespace-pre-wrap break-words">{finalKey}</div>}
            delay={800}
            showArrow
            color="foreground"
          >
            <div className="text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">{finalKey}</div>
          </Tooltip>
          {'"'}
        </div>
      </div>
    </>
  );
});

RenderKey.displayName = "RenderKey";

const RenderTrigger = memo(({ node }: { node: PlainNode }) => {
  const triggerCount = useTriggerNode(useCallback((s) => s.state?.[node.i], [node.i]));

  if (!triggerCount) return null;

  return (
    <>
      <Spacer x={1} />
      <Tooltip content="trigger update" showArrow color="primary">
        <Chip size="sm" radius="none" color="primary" className="rounded-md capitalize text-[8px] h-[14px]">
          {triggerCount}
        </Chip>
      </Tooltip>
    </>
  );
});

RenderTrigger.displayName = "RenderTrigger";

const RenderHMR = memo(({ node }: { node: PlainNode }) => {
  const hmrCount = useHMRNode(useCallback((s) => s.state?.[node.i], [node.i]));

  if (!hmrCount) return null;

  return (
    <>
      <Spacer x={1} />
      <Tooltip content="hmr update" showArrow color="success">
        <Chip size="sm" radius="none" color="success" className="rounded-md capitalize text-[8px] h-[14px]">
          {hmrCount}
        </Chip>
      </Tooltip>
    </>
  );
});

RenderHMR.displayName = "RenderHMR";

export const RenderRunningCount = memo(({ node }: { node: PlainNode }) => {
  const runningCount = useRunningCount(useCallback((s) => s.state?.[node.i], [node.i]));

  if (!runningCount) return null;

  return (
    <>
      <Spacer x={1} />
      <Tooltip content="running count" showArrow color="secondary">
        <Chip size="sm" radius="none" color="secondary" className="rounded-md capitalize text-[8px] h-[14px]">
          {runningCount}
        </Chip>
      </Tooltip>
    </>
  );
});

RenderRunningCount.displayName = "RenderRunningCount";

const RenderHighlightType = memo(({ node }: { node: PlainNode }) => {
  const highlightType = useHighlightNode(useCallback((s) => s.state?.[node.i], [node.i]));

  if (!highlightType) return null;

  return (
    <>
      <Spacer x={1} />
      <Chip size="sm" radius="none" color="warning" className="rounded-md capitalize text-[8px] h-[14px]">
        {highlightType}
      </Chip>
    </>
  );
});

RenderHighlightType.displayName = "RenderHighlightType";

// const RenderIndent = memo(({ node }: { node: PlainNode }) => {
//   const ele: ReactNode[] = [];
//   let p = node.r;

//   while (p && p._d && p._d >= 0) {
//     const n = p.l;

//     if (n) {
//       ele.unshift(
//         <div
//           key={n.i}
//           data-indent={p.i}
//           data-indent-next={n.i}
//           className={`absolute top-[50%] hidden z-[1] h-[110%] translate-y-[-50%] border-l border-gray-400`}
//           style={{
//             left: `calc(calc(var(--indentation-size) * ${p._d ?? 0}) + 6px)`,
//           }}
//         />
//       );
//     }

//     p = p.r;
//   }

//   return <>{Children.map(ele, (v) => v)}</>;
// });

// RenderIndent.displayName = "RenderIndent";

export const TreeItem = memo(
  ({
    node,
    className,
    withKey = true,
    withTag = true,
    withHMR = true,
    withSelect = true,
    withTrigger = true,
    withCollapse = true,
    withRunningCount = false,
    withHighlightType = true,
  }: {
    width?: number;
    node: PlainNode;
    className?: string;
    withCollapse?: boolean;
    withTrigger?: boolean;
    withSelect?: boolean;
    withHMR?: boolean;
    withTag?: boolean;
    withKey?: boolean;
    withRunningCount?: boolean;
    withHighlightType?: boolean;
  }) => {
    const current = node;

    const { error, warn } = useHighlightNode.useShallowSelector(
      (s) => ({ error: s.error?.[node.i], warn: s.warn?.[node.i] }),
      (p, c) => p.error === c.error && p.warn === c.warn
    );

    const finalName = useNodeName(useCallback((s) => s.map[current.n], [current.n]));

    const { select, hasClose, hasSelect } = useSelectNode.useShallowSelector(
      (s) => ({
        select: s.select,
        hasClose: s.closeList?.[node?.i],
        hasSelect: s.selectList?.[node?.i],
      }),
      (p, c) => p.select === c.select && p.hasClose === c.hasClose && p.hasSelect === c.hasSelect
    );

    const currentIsSelect = withSelect && node.i === select;

    const currentIsClose = withCollapse && hasClose;

    const currentHasSelect = useMemo(() => withSelect && select && !currentIsSelect && hasSelect, [withSelect, select, currentIsSelect, hasSelect]);

    const hasChild = Array.isArray(current?.c);

    const StateIcon = hasChild ? (
      <Play fill="currentColor" className={`origin-center ${!currentIsClose ? "rotate-90" : ""}`} width="0.7em" height="0.7em" />
    ) : null;

    const deep = current._d || 0;

    return (
      <div
        id={"node-" + current.i.toString()}
        data-depth={deep}
        onClick={() => {
          if (withSelect) {
            setSelect(node.i);
          }
        }}
        onMouseEnter={() => {
          if (withSelect) {
            setHover(node.i);
          }
        }}
        onMouseLeave={() => {
          if (withSelect) {
            setHover("");
          }
        }}
        className={
          "node-item w-full h-full cursor-pointer transition-transform-background rounded-sm select-none " +
          (className || "") +
          `${withSelect ? (currentHasSelect ? " node-item-select-hover" : " node-item-hover") : ""}` +
          `${currentHasSelect ? " node-item-select" : ""}` +
          `${currentIsSelect ? " node-item-selected" : ""}`
        }
      >
        <div className="flex items-center h-full w-full px-[2px] relative">
          {currentIsSelect && <div className="absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none" />}
          {/* {withIndent && <RenderIndent node={current} />} */}
          <div
            className="flex-grow"
            style={{
              transform: `translateX(calc(${deep} * var(--indentation-size))`,
              // width: `calc(100%-calc(${deep}*var(--indentation-size)))`,
              // marginLeft: `calc(${deep} * var(--indentation-size)`,
            }}
          >
            <div data-content className="flex items-center w-fit">
              {withCollapse && (
                <span
                  className={"text-gray-400 w-[1em]" + (hasChild ? " hover:text-gray-700" : "")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setClose(node.i);
                  }}
                >
                  {hasChild && (
                    <Tooltip content={!currentIsClose ? "Toggle to close" : "Toggle to open"} delay={800} showArrow color="foreground">
                      {StateIcon}
                    </Tooltip>
                  )}
                </span>
              )}
              <p className="node-name line-clamp-1">{finalName}</p>
              {withTag && <RenderTag node={current} />}
              {withTrigger && <RenderTrigger node={current} />}
              {withHMR && <RenderHMR node={current} />}
              {withRunningCount && <RenderRunningCount node={current} />}
              {withHighlightType && <RenderHighlightType node={current} />}
              {warn && (
                <>
                  <Spacer x={1} />
                  <Chip size="sm" radius="none" color="warning" className="rounded-md capitalize text-[8px] h-[14px]">
                    {warn}
                  </Chip>
                </>
              )}
              {error && (
                <>
                  <Spacer x={1} />
                  <Chip size="sm" radius="none" color="danger" className="rounded-md capitalize text-[8px] h-[14px]">
                    {error}
                  </Chip>
                </>
              )}
              {withKey && current.k && <RenderKey node={current} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TreeItem.displayName = "TreeItem";

export const TreeItemWithId = ({
  i,
  n,
  className,
  withKey = true,
  withTag = true,
  withHMR = true,
  withSelect = true,
  withTrigger = true,
  withCollapse = true,
  withFallback = false,
}: {
  i: number | string;
  n: string;
  className?: string;
  withCollapse?: boolean;
  withTrigger?: boolean;
  withSelect?: boolean;
  withHMR?: boolean;
  withTag?: boolean;
  withKey?: boolean;
  withFallback?: boolean;
}) => {
  const nodeList = useDetailNode((s) => s.nodes);

  const map = useNodeName((s) => s.map);

  const currentSelectDetail = nodeList.find((_i) => _i.i === i) as PlainNode;

  if (currentSelectDetail) {
    return (
      <TreeItem
        node={currentSelectDetail}
        className={className}
        withCollapse={withCollapse}
        withTrigger={withTrigger}
        withSelect={withSelect}
        withHMR={withHMR}
        withTag={withTag}
        withKey={withKey}
      />
    );
  }

  if (withFallback) {
    return (
      <div className="node-item w-full h-full cursor-pointer transition-transform-background rounded-sm select-none">
        <div className="node-name line-clamp-1">{map[n]}</div>
      </div>
    );
  }

  return null;
};
