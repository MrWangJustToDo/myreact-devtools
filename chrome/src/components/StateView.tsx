import { Divider, Spacer } from "@heroui/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useConfig } from "@/hooks/useConfig";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { NodeValue } from "./NodeValue";

export const StateView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const enableEdit = useConfig((s) => s.state.enableEdit);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const hasState = currentSelectDetail?.s?.t !== "Null" && currentSelectDetail?.s?.t !== "Undefined";

  const stateKeys = Object.keys(hasState ? currentSelectDetail?.s?.v || {} : {});

  const id = currentSelectDetail?.i;

  const hasStates = stateKeys.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = stateKeys[index];
    return (
      <div className={`tree-wrapper`} key={id + "-" + index}>
        <NodeValue name={key} type="state" editable={enableEdit} item={currentSelectDetail?.s?.v?.[key]} />
      </div>
    );
  });

  if (hasStates) {
    return (
      <>
        <div className="node-states p-2 pb-0">
          <div className="flex items-center justify-between">
            <span>states</span>
          </div>
          <Spacer y={1} />
          <div className="w-full font-code font-sm">{stateKeys.map((key, index) => render(index))}</div>
        </div>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};
