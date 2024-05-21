import { useMemo, useState } from "react";

import { useForceUpdate } from "@/hooks/useForceUpdate";
import { getChildArrayFromFiber } from "@/utils/getChildArrayFromFiber";
import { getFiberName } from "@/utils/getNodeName";

import type {
  MyReactFiberNode,
  MyReactFiberNodeDev,
} from "@my-react/react-reconciler";

const forceUpdate = useForceUpdate.getActions().increment

export const Node = ({
  left,
  fiber,
  depth,
}: {
  left: number;
  fiber: MyReactFiberNode | MyReactFiberNodeDev;
  depth: number;
}) => {
  const [expand, setExpand] = useState(true);

  const elementName = useMemo(() => getFiberName(fiber), [fiber]);

  const children = useMemo(() => getChildArrayFromFiber(fiber), [fiber]);

  if (depth > 10) return null;

  return (
    <div
      style={{ paddingLeft: left + "px" }}
      className=" select-none cursor-pointer border border-b-0"
      onClick={(e) => {
        e.stopPropagation();
        setExpand(!expand);
        forceUpdate();
      }}
    >
      <span className=" inline-block w-[1em] mr-[5px]">
        {expand ? "+" : "-"}
      </span>
      {elementName}
      {expand &&
        children.map((item, index) => (
          <Node key={index} fiber={item} left={left} depth={depth + 1} />
        ))}
    </div>
  );
};
