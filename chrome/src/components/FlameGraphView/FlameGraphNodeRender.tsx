import { memo } from "react";

import { FlameGraphNode } from "./FlameGraphNode";

import type { SafeStackItemType } from "./FlameGraphContainer";

export const FlameGraphNodeRender = memo(
  ({ list, item }: { list: Array<{ stack: SafeStackItemType; id?: string; mode: "legacy" | "concurrent" }>; item: SafeStackItemType }) => {
    const itemFull = list.find((i) => i.stack === item);

    if (item) {
      return (
        <FlameGraphNode
          isRoot={true}
          parent={undefined}
          previous={undefined}
          current={item}
          isLegacy={itemFull && itemFull.mode === "legacy"}
          isConCurrent={itemFull && itemFull.mode === "concurrent"}
        />
      );
    }

    return (
      <>
        {list.map((item, index) => {
          const prev = index > 0 ? list[index - 1] : undefined;
          return (
            <FlameGraphNode
              key={index}
              isRoot={true}
              parent={undefined}
              isLegacy={item.mode === "legacy"}
              isConCurrent={item.mode === "concurrent"}
              previous={prev ? (prev.stack as SafeStackItemType) : undefined}
              current={item.stack as SafeStackItemType}
            />
          );
        })}
      </>
    );
  }
);

FlameGraphNodeRender.displayName = "FlameGraphNodeRender";
