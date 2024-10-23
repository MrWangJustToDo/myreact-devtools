import { Divider, Spacer } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import type { HOOKTree } from "@my-react-devtool/core";

const HookViewTree = ({ item }: { item: HOOKTree }) => {
  const [expand, setExpand] = useState(false);

  const currentIsExpand = !item.isHook;

  const StateIcon = expand ? <TriangleDownIcon width="16" height="16" /> : <TriangleRightIcon width="16" height="16" />;

  if (!currentIsExpand) {
    return (
      <div className="text-[#427af5] flex items-center" style={{ paddingLeft: `${item.deep * 18}px` }}>
        <span className="rounded-sm w-[var(--index-width)] border border-solid">{item.index}</span> {item.name}: {item.value as string}
      </div>
    );
  } else {
    return (
      <>
        <div className="flex text-[#427af5]" style={{ paddingLeft: `${item.deep * 18}px`, marginLeft: "-6px" }}>
          <span
            className={"text-gray-400 min-w-[18px] hover:text-gray-700"}
            onClick={(e) => {
              e.stopPropagation();
              setExpand(!expand);
            }}
          >
            {StateIcon}
          </span>
          {item.name}: {item.children?.length}
        </div>
        {expand && item.children?.map((i) => <HookViewTree key={i.name} item={i} />)}
      </>
    );
  }
};

export const HookView_v2 = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.id === select);

  const hookList = currentSelectDetail?.hook_v2 || [];

  const maxLength = currentSelectDetail?.hook?.length;

  const hasHook = hookList.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  if (hasHook) {
    return (
      <div className="p-2">
        <div>hooks_v2</div>
        <Spacer y={1} />
        {/* @ts-expect-error css变量 */}
        <div className={`w-full ${sizeClass} ml-2 font-mono tree-wrapper`} style={{ ["--index-width"]: `${(maxLength?.toString()?.length || 0) * 0.8}em` }}>
          {hookList.map((item, index) => (
            <HookViewTree item={item as HOOKTree} key={index} />
          ))}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
