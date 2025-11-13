import { memo } from "react";
import { toRaw } from "reactivity-store";

import { useRecordStack } from "@/hooks/useRecordStack";

import { FlameGraphNode } from "./FlameGraphNode";

import type { RootStack, SafeStackItemType } from "./FlameGraphContainer";

export const FlameGraphNodeRender = memo(({ list, item }: { list: RootStack; item: SafeStackItemType }) => {
  const itemFull = list.find((i) => i.stack === item);

  const root = toRaw(useRecordStack((s) => s.root));

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
        const hasSelect = root && root === toRaw(item);
        return (
          <FlameGraphNode
            key={index}
            isRoot={true}
            parent={undefined}
            isSelect={hasSelect}
            isLegacy={item.mode === "legacy"}
            isConCurrent={item.mode === "concurrent"}
            previous={prev ? (prev.stack as SafeStackItemType) : undefined}
            current={item.stack as SafeStackItemType}
            rootStack={item}
          />
        );
      })}
    </>
  );
});

FlameGraphNodeRender.displayName = "FlameGraphNodeRender";
