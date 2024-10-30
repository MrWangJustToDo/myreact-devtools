/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Divider, Spacer } from "@nextui-org/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { ValueViewTree } from "./HookView";

export const StateView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const stateKeys = Object.keys(currentSelectDetail?.s?.v || {});

  const id = currentSelectDetail?.i;

  const hasStates = stateKeys.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number) => {
    const key = stateKeys[index];
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={id + "-" + index}>
        {/* @ts-ignore */}
        <ValueViewTree name={key} item={currentSelectDetail?.s?.v?.[key]} />
      </div>
    );
  });

  if (hasStates) {
    return (
      <div className="p-2">
        <div>states</div>
        <Spacer y={1} />
        <div className="w-full">{stateKeys.map((key, index) => render(index))}</div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
