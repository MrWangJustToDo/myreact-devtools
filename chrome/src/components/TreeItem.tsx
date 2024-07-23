import { NODE_TYPE } from "@my-react/react-reconciler";
import { getFiberTag } from "@my-react-devtool/core";
import { Chip, Spacer, Tooltip } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useMemo } from "react";

import { useTreeNode } from "@/hooks/useTreeNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import type { PlainNode } from "@my-react-devtool/core";

const { setSelect, setClose } = useTreeNode.getActions();

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
  if (node.key) {
    return (
      <div className="flex items-center gap-x-[1px] text-[12px]">
        <div className=" text-[#40af2c]">key</div>
        <div className=" text-gray-400">=</div>
        <div className="flex">
          {'"'}
          {isScrolling ? (
            <div className="text-gray-600 max-w-[40px] text-ellipsis overflow-hidden whitespace-nowrap">{node.key}</div>
          ) : (
            <Tooltip content={node.key} delay={800}>
              <div className="text-gray-600 max-w-[40px] text-ellipsis overflow-hidden whitespace-nowrap">{node.key}</div>
            </Tooltip>
          )}
          {'"'}
        </div>
      </div>
    );
  } else {
    return null;
  }
});

RenderKey.displayName = "RenderKey";

export const RenderItem = ({
  node,
  isScrolling,
  className,
  withKey = true,
  withTag = true,
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
  withTag?: boolean;
  withKey?: boolean;
}) => {
  const current = node;

  const count = useTriggerNode(useCallback((s) => s.state?.[node.id], [node.id]));

  const { select, closeList, selectList } = useTreeNode(useCallback((s) => ({ select: s.select, closeList: s.closeList, selectList: s.selectList }), []));

  const currentIsSelect = withSelect && node.id === select;

  const currentIsClose = withCollapse && closeList?.[node.id];

  const hasSelect = useMemo(
    () => withSelect && select && !currentIsSelect && selectList?.[node.id],
    [withSelect, select, currentIsSelect, selectList, node.id]
  );

  const isNativeNode = current.type & NODE_TYPE.__plain__ || current.type & NODE_TYPE.__text__;

  const hasChild = Array.isArray(current?.children);

  const StateIcon = hasChild ? !currentIsClose ? <TriangleDownIcon width={16} height={16} /> : <TriangleRightIcon width={16} height={16} /> : null;

  return (
    <div
      id={current.id.toString()}
      data-depth={current.deep}
      onClick={() => {
        withSelect && setSelect(node.id);
      }}
      className={
        "w-full h-full whitespace-nowrap cursor-pointer rounded-sm select-none transition-background" +
        (className || "") +
        `${withSelect ? " hover:bg-blue-50" : ""}` +
        `${hasSelect ? " bg-blue-50" : ""}` +
        `${currentIsSelect ? " !bg-blue-200" : ""}`
      }
    >
      <div className="flex items-center h-full px-[2px] relative">
        {currentIsSelect && <div className="absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none" />}
        <div data-content className="flex items-center" style={{ transform: `translateX(calc(${current.deep} * var(--indentation-size))` }}>
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
                  <Tooltip content={!currentIsClose ? "Toggle to close" : "Toggle to open"} delay={800}>
                    {StateIcon}
                  </Tooltip>
                ) : (
                  StateIcon
                )
              ) : null}
            </span>
          )}
          <p className={isNativeNode ? " text-[#f15950]" : "text-[#427af5]"}>{current.name}</p>
          {withTag && (
            <>
              <Spacer x={1} />
              <RenderTag node={current} />
            </>
          )}
          {withKey && (
            <>
              <Spacer x={1} />
              <RenderKey node={current} isScrolling={isScrolling} />
            </>
          )}
          {withTrigger && count > 0 && (
            <>
              <Spacer x={1} />
              <Chip size="sm" radius="none" color="success" className="rounded-md capitalize text-[8px] h-[14px]">
                {count}
              </Chip>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
