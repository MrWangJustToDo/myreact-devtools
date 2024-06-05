import { NODE_TYPE } from "@my-react/react-reconciler";
import { Chip, Spacer, Tooltip } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useMemo } from "react";

import { useTreeNode } from "@/hooks/useTreeNode";
import { currentHasSelect, type TreeNode } from "@/utils/node";

import type { PlainNode } from "@my-react-devtool/core";
import type { CSSProperties } from "react";

const { setSelect, setClose } = useTreeNode.getActions();

const RenderTag = memo(({ node }: { node: PlainNode }) => {
  if (node.tag?.length) {
    return (
      <div className=" gap-x-[2px] flex items-center">
        {node.tag.map((tag) => (
          <Chip key={tag} size="sm" radius="none" className="rounded-md capitalize text-[8px] h-[18px]">
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
  if (node.key) {
    return (
      <div className="flex items-center gap-x-[1px] text-[12px]">
        <div className=" text-teal-500">key</div>
        <div className=" text-gray-400">=</div>
        <div className="flex">
          {'"'}
          <Tooltip content={node.key} delay={800}>
            <div className="text-gray-600 max-w-[40px] text-ellipsis overflow-hidden whitespace-nowrap">{node.key}</div>
          </Tooltip>
          {'"'}
        </div>
      </div>
    );
  } else {
    return null;
  }
});

RenderKey.displayName = "RenderKey";

export const RenderItem = ({ node, width, style }: { width?: number; node: TreeNode; style: CSSProperties }) => {
  const current = node.current;

  const { select: _select, closeList: _closeList } = useTreeNode(useCallback((s) => ({ select: s.select, closeList: s.closeList }), []));

  const select = _select as TreeNode;

  const closeList = _closeList as TreeNode[];

  const currentIsSelect = node.current.id === select?.current?.id;

  const currentIsClose = closeList.some((item) => item.current.id === node.current.id);

  const hasSelect = useMemo(() => currentHasSelect(node, select), [select, node]);

  const Ele = useMemo(() => {
    const isNativeNode = current.type & NODE_TYPE.__plain__ || current.type & NODE_TYPE.__text__;

    if (current.type & NODE_TYPE.__text__ && current.content) {
      return (
        <Tooltip
          content={
            <p className="text-wrap" style={{ maxWidth: `calc(${width}px / 2)` }}>
              {current.content}
            </p>
          }
        >
          <p className={" text-orange-600"}>{current.name}</p>
        </Tooltip>
      );
    }
    return <p className={isNativeNode ? " text-orange-600" : "text-violet-600"}>{current.name}</p>;
  }, [current.content, current.name, current.type, width]);

  const hasChild = Array.isArray(current.children);

  return (
    <div
      id={current.id.toString()}
      style={style}
      data-depth={current.deep}
      onClick={() => setSelect(node)}
      className={
        "w-full h-full whitespace-nowrap cursor-pointer rounded-sm select-none transition-background hover:bg-blue-50" +
        `${hasSelect ? " bg-blue-50" : ""}` +
        `${currentIsSelect ? " !bg-blue-200" : ""}`
      }
    >
      <div className="flex items-center h-full px-[2px]">
        {current.id === select?.current?.id && <div className="absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none" />}
        <div data-content className="flex items-center" style={{ transform: `translateX(calc(${current.deep} * var(--indentation-size))` }}>
          <span
            className={" text-gray-400 min-w-[18px]" + (hasChild ? " hover:text-gray-700" : "")}
            onClick={(e) => {
              e.stopPropagation();
              setClose(node);
            }}
          >
            {hasChild ? (
              <Tooltip content={!currentIsClose ? "Toggle to close" : "Toggle to open"} delay={800}>
                {!currentIsClose ? <TriangleDownIcon width={16} height={16} /> : <TriangleRightIcon width={16} height={16} />}
              </Tooltip>
            ) : null}
          </span>
          <div>{Ele}</div>
          <Spacer x={1} />
          <RenderTag node={current} />
          <Spacer x={1} />
          <RenderKey node={current} />
        </div>
      </div>
    </div>
  );
};
