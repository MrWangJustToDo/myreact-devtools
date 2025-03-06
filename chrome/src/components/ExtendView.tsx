import { Spacer, Divider } from "@heroui/react";
import { type NodeValue as NodeValueType } from "@my-react-devtool/core";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useUISize } from "@/hooks/useUISize";

import { NodeValue } from "./NodeValue";

const Trigger = () => {
  const trigger = useDetailNodeExt((s) => s.triggerStatus);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const hasTrigger = trigger?.length > 0;

  return hasTrigger ? (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <span>trigger</span>
      </div>
      <Spacer y={1} />
      <div className="w-full">{trigger?.map((w, index) => render(index, w))}</div>
      <Divider />
    </div>
  ) : null;
};

const Warn = () => {
  const warn = useDetailNodeExt((s) => s.warnStatus);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const hasWarn = warn?.length > 0;

  return hasWarn ? (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <span>warn</span>
      </div>
      <Spacer y={1} />
      <div className="w-full">{warn?.map((w, index) => render(index, w))}</div>
      <Divider />
    </div>
  ) : null;
};

const Error = () => {
  const error = useDetailNodeExt((s) => s.errorStatus);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const hasError = error?.length > 0;

  return hasError ? (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <span>error</span>
      </div>
      <Spacer y={1} />
      <div className="w-full">{error?.map((w, index) => render(index, w))}</div>
      <Divider />
    </div>
  ) : null;
};

export const ExtendView = () => {
  const select = useSelectNode((s) => s.select);

  const enable = useDetailNodeExt((s) => s.enable);

  if (!enable || !select) return null;

  return (
    <>
      <Trigger />
      <Warn />
      <Error />
    </>
  );
};
