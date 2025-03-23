import { Spacer, Divider } from "@heroui/react";
import { type NodeValue as NodeValueType } from "@my-react-devtool/core";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";

import { NodeValue } from "./NodeValue";

const Trigger = ({ select }: { select: string }) => {
  const trigger = useDetailNodeExt((s) => s.triggerStatus);

  const triggerCount = useTriggerNode.useShallowSelector((s) => s.state?.[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const startCount = triggerCount - 9 >= 0 ? triggerCount - 9 : 0;

  const hasTrigger = trigger?.length > 0;

  return hasTrigger ? (
    <>
      <div className="node-trigger p-2 pb-0">
        <div className="flex items-center justify-between">
          <span>trigger</span>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">{trigger?.map((w, index) => render(startCount + index, w))}</div>
      </div>
      <Divider />
    </>
  ) : null;
};

const Warn = ({ select }: { select: string }) => {
  const warn = useDetailNodeExt((s) => s.warnStatus);

  const warnCount = useHighlightNode.useShallowSelector((s) => s.warn[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const startCount = warnCount - 9 >= 0 ? warnCount - 9 : 0;

  const hasWarn = warn?.length > 0;

  return hasWarn ? (
    <>
      <div className="node-warn p-2 pb-0">
        <div className="flex items-center justify-between">
          <span>warn</span>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">{warn?.map((w, index) => render(startCount + index, w))}</div>
      </div>
      <Divider />
    </>
  ) : null;
};

const Error = ({ select }: { select: string }) => {
  const error = useDetailNodeExt((s) => s.errorStatus);

  const errorCount = useHighlightNode.useShallowSelector((s) => s.error[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`tree-wrapper`} key={index}>
        <NodeValue name={index.toString()} item={item} />
      </div>
    );
  });

  const startCount = errorCount - 9 >= 0 ? errorCount - 9 : 0;

  const hasError = error?.length > 0;

  return hasError ? (
    <>
      <div className="node-error p-2 pb-0">
        <div className="flex items-center justify-between">
          <span>error</span>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">{error?.map((w, index) => render(startCount + index, w))}</div>
      </div>
      <Divider />
    </>
  ) : null;
};

export const ExtendView = () => {
  const select = useSelectNode((s) => s.select);

  const enable = useDetailNodeExt((s) => s.enable);

  if (!enable || !select) return null;

  return (
    <>
      <Trigger select={select} />
      <Warn select={select} />
      <Error select={select} />
    </>
  );
};
