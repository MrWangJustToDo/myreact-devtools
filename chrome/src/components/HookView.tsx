import { Chip, Divider, Spacer } from "@heroui/react";
import { Play } from "lucide-react";
import { useState } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useUISize } from "@/hooks/useUISize";

import { NodeValue } from "./NodeValue";

import type { HOOKTree } from "@my-react-devtool/core";

const HookViewTree = ({ item }: { item: HOOKTree }) => {
  const [expand, setExpand] = useState(false);

  const currentIsExpand = item.h;

  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  if (currentIsExpand) {
    return (
      <NodeValue
        name={item.n}
        item={item.v}
        editable={item.e}
        hookIndex={item.i}
        type="hook"
        prefix={
          <Chip
            classNames={{ content: "p-0" }}
            size="sm"
            className="rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]"
          >
            {item.i}
          </Chip>
        }
      />
    );
  } else {
    return (
      <>
        <div className="hook-stack-view">
          <div className="flex w-full my-0.5">
            <span
              className={"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700"}
              onClick={() => setExpand(!expand)}
            >
              {StateIcon}
            </span>
            <div className="max-w-full line-clamp-1 cursor-pointer" onClick={() => setExpand(!expand)}>
              {item.n}
            </div>
            {item.n === "Anonymous" ? null : ":"}
          </div>
          <div className={`${expand ? "block" : "hidden"} ml-4 my-0.5`}>{item.c?.map((i, index) => <HookViewTree key={i.n + "-" + index} item={i} />)}</div>
        </div>
      </>
    );
  }
};

export const HookView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const id = currentSelectDetail?.i;

  const hookList = currentSelectDetail?._h || [];

  const hasHook = hookList.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  if (hasHook) {
    return (
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span>hooks</span>
        </div>
        <Spacer y={1} />
        <div className={`w-full ${sizeClass} tree-wrapper`}>
          {hookList.map((item, index) => (
            <HookViewTree item={item as HOOKTree} key={id + "-" + index} />
          ))}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
