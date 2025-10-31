import { Divider, Spacer } from "@heroui/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useConfig } from "@/hooks/useConfig";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { NodeValue } from "../NodeValue";

export const PropsView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const enableEdit = useConfig(s => s.state.enableEdit);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const propsKeys = Object.keys(currentSelectDetail?.p?.v || {});

  const id = currentSelectDetail?.i;

  const hasProps = propsKeys.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKeys[index];
    return (
      <div className={`tree-wrapper`} key={id + "-" + index}>
        <NodeValue name={key} type="props" editable={enableEdit} item={currentSelectDetail?.p?.v?.[key]} />
      </div>
    );
  });

  if (hasProps) {
    return (
      <>
        <div className="node-props p-2 pb-0">
          <div className="flex items-center justify-between">
            <span>props</span>
          </div>
          <Spacer y={1} />
          <div className="w-full font-code font-sm">{propsKeys.map((key, index) => render(index))}</div>
        </div>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};
