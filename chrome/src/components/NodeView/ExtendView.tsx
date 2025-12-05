import { Spacer, Divider, Button } from "@heroui/react";
import { type NodeValue as NodeValueType } from "@my-react-devtool/core";
import { SquareSplitHorizontalIcon, SquareSplitVerticalIcon } from "lucide-react";
import { useEffect } from "react";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";
import { useTriggerHover, useTriggerLayout } from "@/hooks/useTriggerState";

import { ValueView } from "../ValueView";

const { setKeys: setHoverKeys, clear } = useTriggerHover.getActions();

const Trigger = ({ select, mode = "vertical" }: { select: string | number; mode?: "horizontal" | "vertical" }) => {
  const trigger = useDetailNodeExt((s) => s.triggerStatus);

  const { layout, setLayout } = useTriggerLayout();

  const triggerCount = useTriggerNode.useShallowSelector((s) => s.state?.[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    const { _keysToLinkHook, ...itemToDisplay } = item;

    return (
      // SEE DevToolCore/instance.ts notifyTriggerStatus:574
      <div className="tree-wrapper cursor-pointer" key={index} onMouseEnter={() => setHoverKeys(_keysToLinkHook || [])} onMouseLeave={() => setHoverKeys([])}>
        <ValueView name={index.toString()} item={itemToDisplay} />
      </div>
    );
  });

  const startCount = triggerCount - 9 >= 0 ? triggerCount - 9 : 0;

  const hasTrigger = trigger?.length > 0;

  useEffect(() => clear, []);

  if (layout !== mode) return null;

  return hasTrigger ? (
    <>
      <div className="node-trigger p-2 pb-0">
        <div className="flex items-center ">
          <span>trigger</span>
          <Button size="sm" isIconOnly className="ml-4" variant="flat" onPress={() => setLayout(layout === "horizontal" ? "vertical" : "horizontal")}>
            {layout === "horizontal" ? <SquareSplitVerticalIcon className="w-[1.1em]" /> : <SquareSplitHorizontalIcon className="w-[1.1em]" />}
          </Button>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">{trigger?.map((w, index) => render(startCount + index, w))}</div>
      </div>
      {mode === "vertical" && <Divider />}
    </>
  ) : null;
};

const HMR = ({ select: _select }: { select: string | number }) => {
  const hmrInternal = useDetailNodeExt((s) => s.hmrInternal);

  if (!hmrInternal) return null;

  return (
    <>
      <div className="node-hmr p-2 pb-0">
        <div className="flex items-center justify-between">
          <span>hmr internal</span>
        </div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">
          <ValueView name="signature" item={hmrInternal} />
        </div>
      </div>
      <Divider />
    </>
  );
};

const Warn = ({ select }: { select: string | number }) => {
  const warn = useDetailNodeExt((s) => s.warnStatus);

  const warnCount = useHighlightNode.useShallowSelector((s) => s.warn[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`tree-wrapper`} key={index}>
        <ValueView name={index.toString()} item={item} />
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

const Error = ({ select }: { select: string | number }) => {
  const error = useDetailNodeExt((s) => s.errorStatus);

  const errorCount = useHighlightNode.useShallowSelector((s) => s.error[select]);

  const render = useCallbackRef((index: number, item: NodeValueType) => {
    return (
      <div className={`tree-wrapper`} key={index}>
        <ValueView name={index.toString()} item={item} />
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
      <HMR select={select} />
      <Warn select={select} />
      <Error select={select} />
    </>
  );
};

export const TriggerView = ({ mode }: { mode?: "horizontal" | "vertical" }) => {
  const select = useSelectNode((s) => s.select);

  if (!select) return null;

  return <Trigger select={select} mode={mode} />;
};
