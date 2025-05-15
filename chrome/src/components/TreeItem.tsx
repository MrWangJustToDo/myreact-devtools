import { Chip, Spacer, Tooltip } from "@heroui/react";
import { getFiberTag } from "@my-react-devtool/core";
import { Play } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import type { PlainNode } from "@my-react-devtool/core";

const { setSelect, setClose, setHover } = useSelectNode.getActions();

const RenderTag = memo(({ node }: { node: PlainNode }) => {
  const tag = getFiberTag(node);

  if (tag?.length) {
    return (
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
    );
  } else {
    return null;
  }
});

RenderTag.displayName = "RenderTag";

const RenderKey = memo(({ node }: { node: PlainNode }) => {
  const finalKey = useNodeName(useCallback((s) => s.map?.[node.k!], [node.k]));

  return (
    <div data-key className="flex items-center gap-x-[1px] text-[11px]">
      <div className=" text-[#40af2c]">key</div>
      <div className=" text-gray-400">=</div>
      <div className="flex">
        {'"'}
        <Tooltip content={finalKey} delay={800} showArrow color="foreground">
          <div className="text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">{finalKey}</div>
        </Tooltip>
        {'"'}
      </div>
    </div>
  );
});

RenderKey.displayName = "RenderKey";

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

export const TreeItem = ({
  node,
  className,
  withKey = true,
  withTag = true,
  withHMR = true,
  withSelect = true,
  withTrigger = true,
  withCollapse = true,
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
}) => {
  const current = node;

  const triggerCount = useTriggerNode(useCallback((s) => s.state?.[node.i], [node.i]));

  const hmrCount = useHMRNode(useCallback((s) => s.state?.[node.i], [node.i]));

  const highlightType = useHighlightNode(useCallback((s) => s.state?.[node.i], [node.i]));

  const { error, warn } = useHighlightNode.useShallowSelector(
    (s) => ({ error: s.error?.[node.i], warn: s.warn?.[node.i] }),
    (p, c) => p.error === c.error && p.warn === c.warn
  );

  const finalName = useNodeName(useCallback((s) => s.map[current.n], [current.n]));

  const { select, closeList, selectList } = useSelectNode.useShallowStableSelector((s) => ({
    select: s.select,
    closeList: s.closeList,
    selectList: s.selectList,
  }));

  const currentIsSelect = withSelect && node.i === select;

  const currentIsClose = withCollapse && closeList?.[node.i];

  const hasSelect = useMemo(() => withSelect && select && !currentIsSelect && selectList?.[node.i], [withSelect, select, currentIsSelect, selectList, node.i]);

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
        `${withSelect ? (hasSelect ? " node-item-select-hover" : " node-item-hover") : ""}` +
        `${hasSelect ? " node-item-select" : ""}` +
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
            {withTag && (
              <>
                <Spacer x={1} />
                <RenderTag node={current} />
              </>
            )}
            {withTrigger && triggerCount > 0 && (
              <>
                <Spacer x={1} />
                <Tooltip content="trigger update" showArrow color="primary">
                  <Chip size="sm" radius="none" color="primary" className="rounded-md capitalize text-[8px] h-[14px]">
                    {triggerCount}
                  </Chip>
                </Tooltip>
              </>
            )}
            {withHMR && hmrCount > 0 && (
              <>
                <Spacer x={1} />
                <Tooltip content="hmr update" showArrow color="success">
                  <Chip size="sm" radius="none" color="success" className="rounded-md capitalize text-[8px] h-[14px]">
                    {hmrCount}
                  </Chip>
                </Tooltip>
              </>
            )}
            {highlightType && (
              <>
                <Spacer x={1} />
                <Chip size="sm" radius="none" color="warning" className="rounded-md capitalize text-[8px] h-[14px]">
                  {highlightType}
                </Chip>
              </>
            )}
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
            {withKey && current.k && (
              <>
                <Spacer x={1} />
                <RenderKey node={current} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
