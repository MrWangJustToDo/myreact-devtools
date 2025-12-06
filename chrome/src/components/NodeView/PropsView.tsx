import { Divider, Spacer } from "@heroui/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useConfig } from "@/hooks/useConfig";

import { SimpleValueView, ValueView } from "../ValueView";

import type { NodeValue, PlainNode } from "@my-react-devtool/core";

export const PropsView = ({ node, editable = true }: { node?: PlainNode; editable?: boolean }) => {
  const enableEdit = useConfig((s) => s.state.enableEdit);

  const detailNode = node;

  const propsKeys = Object.keys(detailNode?.p?.v || {});

  const id = detailNode?.i;

  const hasProps = propsKeys.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKeys[index];

    const item = detailNode?.p?.v?.[key] as NodeValue | undefined;

    return (
      <div className={`tree-wrapper`} key={id + "-" + index}>
        <ValueView name={key} type="props" editable={editable && enableEdit} item={item} />
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

export const ControlPropsView = ({ node, side }: { node?: PlainNode; side: "l" | "r" }) => {
  const detailNode = node;

  const propsKeys = Object.keys(detailNode?.p?.v || {});

  const id = detailNode?.i;

  const hasProps = propsKeys.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKeys[index];

    const item = detailNode?.p?.v?.[key] as NodeValue | undefined;

    return (
      <div className={`tree-wrapper`} key={id + "-" + index}>
        <SimpleValueView name={key} side={side} prevName="props" item={item} />
      </div>
    );
  });

  if (hasProps) {
    return (
      <div className="node-props p-2 pb-0">
        <div className="flex items-center justify-between">
          <span>props</span>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">{propsKeys.map((key, index) => render(index))}</div>
      </div>
    );
  } else {
    return null;
  }
};
