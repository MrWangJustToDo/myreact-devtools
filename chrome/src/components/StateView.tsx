import { Divider, Spacer } from "@heroui/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useUISize } from "@/hooks/useUISize";

import { NodeValue } from "./NodeValue";

export const StateView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const hasState = currentSelectDetail?.s?.t !== "Null" && currentSelectDetail?.s?.t !== "Undefined";

  const stateKeys = Object.keys(hasState ? currentSelectDetail?.s?.v || {} : {});

  const id = currentSelectDetail?.i;

  const hasStates = stateKeys.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number) => {
    const key = stateKeys[index];
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={id + "-" + index}>
        <NodeValue name={key} item={currentSelectDetail?.s?.v?.[key]} />
      </div>
    );
  });

  if (hasStates) {
    return (
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span>states</span>
        </div>
        <Spacer y={1} />
        <div className="w-full">{stateKeys.map((key, index) => render(index))}</div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
