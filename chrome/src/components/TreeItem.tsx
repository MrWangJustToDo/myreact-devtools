// import { NODE_TYPE } from "@my-react/react-reconciler";
import { getFiberTag } from "@my-react-devtool/core";
import { Chip, Spacer, Tooltip } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useLayoutEffect, useMemo } from "react";

import { useActiveNode } from "@/hooks/useActiveNode";
import { useConfig } from "@/hooks/useConfig";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useNodeName } from "@/hooks/useNodeName";
import { useRunNode } from "@/hooks/useRunNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import type { PlainNode } from "@my-react-devtool/core";

const { setSelect, setClose, setHover } = useTreeNode.getActions();

const { add, remove } = useActiveNode.getActions();

const RenderTag = memo(({ node }: { node: PlainNode }) => {
  const tag = getFiberTag(node.type);

  if (tag?.length) {
    return (
      <div className=" gap-x-[2px] flex items-center">
        {tag.map((tag) => (
          <Chip key={tag} size="sm" radius="none" className="rounded-md capitalize text-[8px] h-[14px]">
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

const RenderKey = memo(({ node, isScrolling }: { node: PlainNode; isScrolling?: boolean }) => {
  const finalKey = useNodeName(useCallback((s) => s.map?.[node.key!], [node.key]));

  return (
    <div data-key className="flex items-center gap-x-[1px] text-[12px]">
      <div className=" text-[#40af2c]">key</div>
      <div className=" text-gray-400">=</div>
      <div className="flex">
        {'"'}
        {isScrolling ? (
          <div className="text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">{finalKey}</div>
        ) : (
          <Tooltip content={finalKey} delay={800} showArrow color="foreground">
            <div className="text-gray-600 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">{finalKey}</div>
          </Tooltip>
        )}
        {'"'}
      </div>
    </div>
  );
});

RenderKey.displayName = "RenderKey";

export const RenderItem = ({
  node,
  isScrolling,
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
  isScrolling?: boolean;
  withCollapse?: boolean;
  withTrigger?: boolean;
  withSelect?: boolean;
  withHMR?: boolean;
  withTag?: boolean;
  withKey?: boolean;
}) => {
  const current = node;

  const { enableCount, enableMis } = useConfig.useShallowStableSelector((s) => ({
    enableCount: s.state.enableRuntimeCount,
    enableMis: s.state.enableRuntimeMis,
  }));

  useLayoutEffect(() => {
    if (!enableCount) {
      return () => {
        remove(current.id);
      };
    }

    add(current.id);

    return () => {
      remove(current.id);
    };
  }, [current, enableCount]);

  const { c, t } = useRunNode.useShallowStableSelector((s) => (enableCount ? s.state?.[node.id] || {} : {}) as { c: number; t?: number });

  const triggerCount = useTriggerNode(useCallback((s) => s.state?.[node.id], [node.id]));

  const hmrCount = useHMRNode(useCallback((s) => s.state?.[node.id], [node.id]));

  const highlightType = useHighlightNode(useCallback((s) => s.state?.[node.id], [node.id]));

  const finalName = useNodeName(useCallback((s) => s.map[current.name], [current.name]));

  const { select, closeList, selectList } = useTreeNode(useCallback((s) => ({ select: s.select, closeList: s.closeList, selectList: s.selectList }), []));

  const currentIsSelect = withSelect && node.id === select;

  const currentIsClose = withCollapse && closeList?.[node.id];

  const hasSelect = useMemo(
    () => withSelect && select && !currentIsSelect && selectList?.[node.id],
    [withSelect, select, currentIsSelect, selectList, node.id]
  );

  // const isNativeNode = current.type & NODE_TYPE.__plain__ || current.type & NODE_TYPE.__text__;

  const hasChild = Array.isArray(current?.children);

  const StateIcon = hasChild ? !currentIsClose ? <TriangleDownIcon width={16} height={16} /> : <TriangleRightIcon width={16} height={16} /> : null;

  return (
    <div
      id={"node-" + current.id.toString()}
      data-depth={current.deep}
      onClick={() => {
        withSelect && setSelect(node.id);
      }}
      onMouseEnter={() => {
        withSelect && setHover(node.id);
      }}
      onMouseOut={() => {
        withSelect && setHover("");
      }}
      className={
        "w-full h-full node-item cursor-pointer rounded-sm select-none transition-background " +
        (className || "") +
        `${withSelect ? " node-item-hover" : ""}` +
        `${hasSelect ? " node-item-select" : ""}` +
        `${currentIsSelect ? " node-item-selected" : ""}`
      }
    >
      <div className="flex items-center h-full w-full px-[2px] relative">
        {currentIsSelect && <div className="absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none" />}
        <div
          className="flex-grow"
          style={{
            width: `calc(100%-calc(${current.deep}*var(--indentation-size)))`,
            marginLeft: `calc(${current.deep} * var(--indentation-size)`,
          }}
        >
          <div data-content className="flex items-center w-fit">
            {withCollapse && (
              <span
                className={" text-gray-400 min-w-[18px]" + (hasChild ? " hover:text-gray-700" : "")}
                onClick={(e) => {
                  e.stopPropagation();
                  setClose(node.id);
                }}
              >
                {hasChild ? (
                  !isScrolling ? (
                    <Tooltip content={!currentIsClose ? "Toggle to close" : "Toggle to open"} delay={800} showArrow color="foreground">
                      {StateIcon}
                    </Tooltip>
                  ) : (
                    StateIcon
                  )
                ) : null}
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
            {enableCount && c && c > 0 && (
              <>
                <Spacer x={1} />
                <Tooltip content="run count" showArrow color="secondary">
                  <Chip size="sm" radius="none" color="secondary" className="rounded-md capitalize text-[8px] h-[14px]">
                    {c}
                    {enableMis && t ? ` (${t}ms)` : ""}
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
            {withKey && current.key && (
              <>
                <Spacer x={1} />
                <RenderKey node={current} isScrolling={isScrolling} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
