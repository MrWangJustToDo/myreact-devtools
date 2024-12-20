import { Spacer, Divider } from "@nextui-org/react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

import { ValueViewTree } from "./HookView";

import type { NodeValue } from "@my-react-devtool/core";

const Warn = ({ select }: { select: string | null }) => {
  const warn = useHighlightNode((s) => s.warn?.[select || ""]);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number, item: NodeValue) => {
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={index}>
        <ValueViewTree name={index.toString()} item={item} />
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

const Error = ({ select }: { select: string | null }) => {
  const error = useHighlightNode((s) => s.error?.[select || ""]);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number, item: NodeValue) => {
    return (
      <div className={`${sizeClass}  tree-wrapper`} key={index}>
        <ValueViewTree name={index.toString()} item={item} />
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
  const select = useTreeNode((s) => s.select);

  return (
    <>
      <Warn select={select} key={select} />
      <Error select={select} key={select} />
    </>
  );
};
