import { NODE_TYPE } from "@my-react/react-reconciler";
import { Tooltip } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

import { useTreeNode } from "@/hooks/useTreeNode";
import { currentHasSelect, type TreeNode } from "@/utils/node";

import type { CSSProperties } from "react";

const { setSelect } = useTreeNode.getActions();

export const RenderItem = ({ node, width, style }: { width?: number; node: TreeNode; style: CSSProperties }) => {
  const current = node.current;

  const select = useTreeNode((s) => s.select) as TreeNode;

  const currentIsSelect = node.current.id === select?.current?.id;

  const hasSelect = useMemo(() => currentHasSelect(node, select), [select, node]);

  const Ele = useMemo(() => {
    if (current.type & NODE_TYPE.__text__ && current.content) {
      return (
        <Tooltip
          content={
            <p className="text-wrap" style={{ maxWidth: `calc(${width}px / 2)` }}>
              {current.content}
            </p>
          }
        >
          <p>{current.name}</p>
        </Tooltip>
      );
    }
    return <p>{current.name}</p>;
  }, [current.content, current.name, current.type, width]);

  const hasChild = Array.isArray(current.children);

  return (
    <div
      id={current.id.toString()}
      style={style}
      data-depth={current.deep}
      onClick={() => setSelect(node)}
      className={
        "w-full h-full whitespace-nowrap cursor-pointer rounded-sm transition-background hover:bg-blue-50" +
        `${hasSelect ? " bg-blue-50" : ""}` +
        `${currentIsSelect ? " !bg-blue-200" : ""}`
      }
    >
      <div className="flex items-center h-full px-[2px]">
        {current.id === select?.current?.id && <div className="absolute top-0 left-[1px] h-full border-l-2 border-blue-400 rounded-sm pointer-events-none" />}
        <div data-content className="flex items-center" style={{ transform: `translateX(calc(${current.deep} * var(--indentation-size))` }}>
          {hasChild ? node.isOpen ? <TriangleDownIcon /> : <TriangleRightIcon /> : null}
          <div className="ml-[2px]">{Ele}</div>
        </div>
      </div>
    </div>
  );
};
