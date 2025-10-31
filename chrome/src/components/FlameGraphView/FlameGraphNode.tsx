import { useMemo } from "react";

import { useNodeName } from "@/hooks/useNodeName";
import { useRecordStack } from "@/hooks/useRecordStack";
import { useSelectNode } from "@/hooks/useSelectNode";

import type { SafeStackItemType } from "./FlameGraphContainer";

export const FlameGraphNode = ({
  parent,
  previous,
  current,
  isRoot,
}: {
  parent?: SafeStackItemType;
  previous?: SafeStackItemType;
  current: SafeStackItemType;
  isRoot?: boolean;
}) => {
  const { setHover, setSelect } = useSelectNode.getActions();

  const { setSelect: setRecordNode } = useRecordStack.getActions();

  // const name = useNodeName.getReadonlyState()
  const name = useMemo(() => useNodeName.getReadonlyState().map[current.n], [current.n]);

  const prev = previous || parent;

  let width = Math.floor(current.e - current.s);

  let left = Math.floor(previous ? current.s - previous.e : parent ? current.s - parent.s : 0);

  left = width === 0 ? left - 1 : left;

  width = width === 0 ? 1 : width;

  const hasGap = !!prev;

  // const hasSelect = selectId === current.i;

  return (
    <>
      {hasGap && (
        <div
          className="flameGraph-gap"
          style={{ width: isRoot ? "1px" : `calc(calc(var(--flameGraph-width-step)*${left}))`, height: `var(--flameGraph-height-step)` }}
        />
      )}
      <div
        className="flameGraph-node-container cursor-pointer"
        style={{
          width: `calc(calc(var(--flameGraph-width-step)*${width}))`,
          height: `var(--flameGraph-height-step)`,
        }}
        onMouseEnter={() => {
          setHover(current.i);
        }}
        onMouseLeave={() => {
          setHover("");
        }}
      >
        <div
          id={`flameGraph-node-${current.i}`}
          onClick={() => setSelect(current.i)}
          onDoubleClick={() => {
            setSelect(current.i);
            setRecordNode(current);
          }}
          title={`${name}${current.r ? ` +${current.r}` : ""} Duration: ${Math.ceil(current.e - current.s) / 1000} ms`}
          className={`flameGraph-node-view rounded-sm opacity-40 hover:opacity-100 shadow-[inset_0_0_0_1px_rgb(142,192,254)] dark:shadow-[inset_0_0_0_1px_rgb(52,80,164)] line-clamp-1 font-ssm bg-blue-200 dark:bg-blue-950`}
        >
          {name}
          {current.r ? ` +${current.r}` : ""}
        </div>
        <div className="flex">
          {current.c &&
            current.c.length > 0 &&
            current.c.map((child, index) => {
              if (!child || !child.e) return;
              const previousChild = index > 0 ? current.c[index - 1] : undefined;
              return (
                <FlameGraphNode key={child.i} parent={current} previous={previousChild as SafeStackItemType | undefined} current={child as SafeStackItemType} />
              );
            })}
        </div>
      </div>
    </>
  );
};
