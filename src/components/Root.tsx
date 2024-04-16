import { useMemo, useState } from "react";

import { getChildArrayFromFiber } from "@/utils/getChildArrayFromFiber";
import { getFiberName } from "@/utils/getNodeName";

import { Node } from "./Node";

import type { MyReactFiberNode } from "@my-react/react-reconciler";

export const Root = ({ fiber }: { fiber: MyReactFiberNode }) => {
  const [expand, setExpand] = useState(true);

  const elementName = useMemo(() => getFiberName(fiber), [fiber]);

  const children = useMemo(() => getChildArrayFromFiber(fiber), [fiber]);

  return (
    <div
      className=" select-none cursor-pointer"
      onClick={() => setExpand(!expand)}
    >
      <span className=" inline-block w-[1em] mr-[5px]">
        {expand ? "+" : "-"}
      </span>
      {elementName}
      {expand &&
        children.map((item, index) => (
          <Node key={index} fiber={item} left={10} depth={1} />
        ))}
    </div>
  );
};
