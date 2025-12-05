import { Divider, Spacer } from "@heroui/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useConfig } from "@/hooks/useConfig";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { ValueView } from "../ValueView";

import type { NodeValue } from "@my-react-devtool/core";

export const PropsView = () => {
  const select = useSelectNode((s) => s.select);

  const enableEdit = useConfig((s) => s.state.enableEdit);

  const detailNode = useDetailNode((s) => s.nodes.find((i) => i.i === select));

  const propsKeys = Object.keys(detailNode?.p?.v || {});

  const id = detailNode?.i;

  const hasProps = propsKeys.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKeys[index];

    const nextItem = detailNode?.p?.v?.[key] as NodeValue | undefined;

    return (
      <div className={`tree-wrapper`} key={id + "-" + index}>
        <ValueView name={key} type="props" editable={enableEdit} item={nextItem} />
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
