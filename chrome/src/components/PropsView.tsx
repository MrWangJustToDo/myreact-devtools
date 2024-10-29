import { Divider, Spacer } from "@nextui-org/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { ValueViewTree } from "./HookView";

export const PropsView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const propsKeys = Object.keys(currentSelectDetail?.p?.v || {});

  const hasProps = propsKeys.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number) => {
    const key = propsKeys[index];
    return (
      <div className={`${sizeClass} font-mono tree-wrapper`} key={index}>
        <ValueViewTree name={key} item={currentSelectDetail?.p?.v?.[key]} />
      </div>
    );
  });

  if (hasProps) {
    return (
      <div className="p-2">
        <div>props</div>
        <Spacer y={1} />
        <div className="w-full">
          {propsKeys.map((key, index) => render(index))}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
