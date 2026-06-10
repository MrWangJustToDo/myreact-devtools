import { memo } from "react";

import { useRecordStack } from "@/hooks/useRecordStack";
import { useSelectNode } from "@/hooks/useSelectNode";

import type { FlameLayoutItem } from "./flameGraphLayout";

const { setSelect } = useSelectNode.getActions();
const { setSelect: setRecordNode, setRoot: setRootNode } = useRecordStack.getActions();

export const FlameGraphBars = memo(({ items }: { items: FlameLayoutItem[] }) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          data-id={item.id}
          title={item.title}
          className={`absolute cursor-pointer rounded-sm opacity-50 hover:opacity-100 shadow-[inset_0_0_0_1px_rgb(142,192,254)] dark:shadow-[inset_0_0_0_1px_rgb(52,80,164)] line-clamp-1 font-ssm font-code py-0.5 overflow-hidden whitespace-nowrap bg-blue-200 dark:bg-blue-950 ${item.isLegacy ? "bg-orange-200 dark:bg-orange-800" : ""} ${item.hasUnmount ? "bg-red-200 dark:bg-red-950" : ""} ${item.isSelected ? "relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:border-blue-400 after:rounded-sm after:pointer-events-none" : ""}`}
          style={{
            left: item.x,
            top: item.y,
            width: item.width,
            height: item.height,
          }}
          onClick={() => {
            setSelect(item.frameId);
            setRootNode(item.rootStack);
          }}
          onDoubleClick={() => {
            setSelect(item.frameId);
            setRecordNode(item.stackItem);
            setRootNode(item.rootStack);
          }}
        >
          {item.name}
          {item.isRoot && item.rootDurationMs !== undefined && <small> {item.rootDurationMs / 1000}ms</small>}
          {item.retryCount ? ` +${item.retryCount}` : ""}
        </div>
      ))}
    </>
  );
});

FlameGraphBars.displayName = "FlameGraphBars";
