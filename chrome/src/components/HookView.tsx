import { Chip, Divider, Spacer } from "@heroui/react";
import { Play } from "lucide-react";
import { useState } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { NodeValue } from "./NodeValue";

import type { HOOKTree } from "@my-react-devtool/core";

const HookViewTree = ({ item, enableEdit }: { item: HOOKTree; enableEdit?: boolean }) => {
  const [expand, setExpand] = useState(false);

  const currentIsExpand = item.h;

  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  if (currentIsExpand) {
    return (
      <NodeValue
        name={item.n}
        item={item.v}
        editable={item.e && enableEdit}
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

  const enableEdit = useConfig((s) => s.state.enableEdit);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const id = currentSelectDetail?.i;

  const hookList = currentSelectDetail?._h || [];

  const hasHook = hookList.length > 0;

  if (hasHook) {
    return (
      <>
        <div className="node-hooks p-2 pb-0">
          <div className="flex items-center justify-between">
            <span>hooks</span>
          </div>
          <Spacer y={1} />
          <div className={`w-full font-code font-sm`}>
            {hookList.map((item, index) => (
              <div className="tree-wrapper" key={id + "-" + index}>
                <HookViewTree item={item as HOOKTree} enableEdit={enableEdit} />
              </div>
            ))}
          </div>
        </div>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};
