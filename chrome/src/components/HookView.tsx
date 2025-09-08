import { Chip, Divider, Spacer } from "@heroui/react";
import { Allotment } from "allotment";
import { Play } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useSelectNode } from "@/hooks/useSelectNode";
import { useTriggerHover, useTriggerLayout } from "@/hooks/useTriggerState";

import { AutoHeight } from "./AutoHeight";
import { TriggerView } from "./ExtendView";
import { NodeValue } from "./NodeValue";

import type { HOOKTree } from "@my-react-devtool/core";
import type { RefObject } from "react";

const HookViewTree = ({ item, enableEdit, hoverKeys }: { item: HOOKTree; enableEdit?: boolean; hoverKeys?: Array<string | number> }) => {
  const [expand, setExpand] = useState(false);

  const currentIsHookNode = item.h;

  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  const isHover = useMemo(() => {
    return hoverKeys?.some((key) => item.keys.includes(key));
  }, [hoverKeys, item.keys]);

  if (currentIsHookNode) {
    return (
      <div data-hover-state-wrapper className={isHover ? "hook-hover" : ""}>
        <NodeValue
          name={item.n}
          item={item.v}
          editable={item.e && enableEdit}
          hookIndex={item.i}
          type="hook"
          prefix={
            <Chip
              classNames={{ content: "p-0" }}
              size="sm"
              className="rounded-sm text-center mr-1 flex-shrink-0 font-[300] !px-1 text-gray-800 dark:text-gray-200 !h-[1.4em] !max-w-[initial] !min-w-[initial]"
            >
              {item.i}
            </Chip>
          }
        />
      </div>
    );
  } else {
    return (
      <div data-hover-state-wrapper className={!expand && isHover ? "hook-hover" : ""}>
        <div className="hook-stack-view">
          <div className="flex w-full my-0.5">
            <span
              className={"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700"}
              onClick={() => setExpand(!expand)}
            >
              {StateIcon}
            </span>
            <div className={`max-w-full line-clamp-1 cursor-pointer ${item.n === 'Anonymous' ? 'opacity-20' : 'opacity-40'}`} onClick={() => setExpand(!expand)}>
              {item.n}
            </div>
            {item.n === "Anonymous" ? null : ":"}
          </div>
          <div className={`${expand ? "block" : "hidden"} ml-4 my-0.5`}>
            {item.c?.map((i, index) => <HookViewTree key={i.n + "-" + index} item={i} enableEdit={enableEdit} hoverKeys={hoverKeys} />)}
          </div>
        </div>
      </div>
    );
  }
};

const InternalHookView = ({ mode = "vertical" }: { mode?: "horizontal" | "vertical" }) => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const enableEdit = useConfig((s) => s.state.enableEdit);

  const hoverKeys = useTriggerHover((s) => s.keys) as Array<string | number>;

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const id = currentSelectDetail?.i;

  const hookList = currentSelectDetail?._h || [];

  const hasHook = hookList.length > 0;

  if (hasHook) {
    return (
      <>
        <div className="node-hooks p-2 pb-0">
          <div className="flex items-center justify-between">
            <span>hooks</span>
          </div>
          <Spacer y={1} />
          <div className={`w-full font-code font-sm`}>
            {hookList.map((item, index) => (
              <div className="tree-wrapper" key={id + "-" + index}>
                <HookViewTree item={item as HOOKTree} enableEdit={enableEdit} hoverKeys={hoverKeys} />
              </div>
            ))}
          </div>
        </div>
        {mode === "vertical" && <Divider />}
      </>
    );
  } else {
    return null;
  }
};

export const HookView = () => {
  const ref = useRef<HTMLDivElement>(null);

  const elementRefS = useRef<Array<RefObject<HTMLDivElement>>>();

  const layout = useTriggerLayout((s) => s.layout);

  const enable = useDetailNodeExt((s) => s.enable);

  const onAutoUpdateHeight = () => {
    if (ref.current) {
      const maxHeight = Math.max(...(elementRefS.current?.map((i) => i.current?.clientHeight || 0) || []));
      ref.current.style.height = `${maxHeight + 2}px`;
    }
  };

  const onCreateRef = useCallback((ref: RefObject<HTMLDivElement>) => {
    if (!elementRefS.current) {
      elementRefS.current = [];
    }
    elementRefS.current.push(ref);
  }, []);

  if (enable && layout === "horizontal") {
    return (
      <div ref={ref}>
        <Allotment>
          <AutoHeight onHeightChange={onAutoUpdateHeight} onAttachRef={onCreateRef}>
            <InternalHookView mode="horizontal" />
          </AutoHeight>
          <AutoHeight onHeightChange={onAutoUpdateHeight} onAttachRef={onCreateRef}>
            <TriggerView mode="horizontal" />
          </AutoHeight>
        </Allotment>
        <Divider />
      </div>
    );
  } else {
    return <InternalHookView />;
  }
};
