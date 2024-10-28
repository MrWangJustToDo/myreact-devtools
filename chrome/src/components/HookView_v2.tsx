import { Chip, Divider, Spacer } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";
import { getText } from "@/utils/treeValue";

import type { HOOKTree } from "@my-react-devtool/core";
import type { ReactNode } from "react";

const HookViewTree = ({ item }: { item: HOOKTree }) => {
  const [expand, setExpand] = useState(false);

  const currentIsExpand = item.h;

  const StateIcon = expand ? <TriangleDownIcon width="16" height="16" /> : <TriangleRightIcon width="16" height="16" />;

  if (currentIsExpand) {
    return (
      <ValueViewTree
        name={item.n}
        item={item.v}
        prefix={
          <Chip
            classNames={{ content: "p-0" }}
            size="sm"
            className="rounded-sm text-center mr-1 flex-shrink-0 !w-[calc(var(--index-width)*1)] !h-[calc(var(--index-width)*1)] !p-0 !max-w-[initial] !min-w-[initial]"
          >
            {item.i}
          </Chip>
        }
      />
    );
  } else {
    return (
      <>
        <div className="hook-stack-view">
          <div className="flex w-full my-0.5">
            <span className={"text-gray-400 hover:text-gray-700"} onClick={() => setExpand(!expand)}>
              {StateIcon}
            </span>
            <div className="max-w-full line-clamp-1">{item.n}:</div>
          </div>
          <div className={`${expand ? "block" : "hidden"} ml-4 my-0.5`}>{item.c?.map((i) => <HookViewTree key={i.n} item={i} />)}</div>
        </div>
      </>
    );
  }
};

const ValueViewTree = ({ name, item, prefix }: { name: string; item: HOOKTree["v"]; prefix?: ReactNode }) => {
  const [expand, setExpand] = useState(false);

  const text = useMemo(() => {
    if (item?.t === "Array" || item?.t === "Set") {
      return getText("Array", item.v, "new");
    }
    if (item?.t === "Iterable" || item?.t === "Map" || item?.t === "Object") {
      return getText("Object", item.v, "new");
    }
  }, [item]);

  if (!item) return null;

  const currentIsExpand = item.e;

  const StateIcon = expand ? <TriangleDownIcon width="16" height="16" /> : <TriangleRightIcon width="16" height="16" />;

  if (!currentIsExpand) {
    let element = null;
    if (item.t === "Element") {
      element = <span className="node-element">{item.v as string}</span>;
    }
    if (item.t === "String") {
      element = <span className="node-string">{`"${item.v as string}"`}</span>;
    }
    if (item.t === "Boolean") {
      element = <span className="node-boolean">{item.v as string}</span>;
    }
    if (item.t === "Date") {
      element = <span className="node-date">{item.v as string}</span>;
    }
    if (item.t === "Error") {
      element = <span className="node-error">{item.v as string}</span>;
    }
    if (item.t === "Function") {
      element = <span className="node-function">{item.v as string}</span>;
    }
    if (item.t === "Undefined") {
      element = <span className="node-undefined">{item.v as string}</span>;
    }
    if (item.t === "Null") {
      element = <span className="node-null">{item.v as string}</span>;
    }
    if (item.t === "Number") {
      element = <span className="node-number">{item.v as string}</span>;
    }
    if (item.t === "Promise") {
      element = <span className="node-promise">{item.v as string}</span>;
    }
    if (item.t === "WeakMap" || item.t === "WeakSet") {
      element = <span className="node-weak">{item.v as string}</span>;
    }
    if (item.t === "RegExp") {
      element = <span className="node-regexp">{item.v as string}</span>;
    }
    if (item.t === "Symbol") {
      element = <span className="node-symbol">{item.v as string}</span>;
    }
    return (
      <div className="hook-value-view">
        <div className="flex w-full my-0.5">
          <span className="text-transparent">{StateIcon}</span>
          {prefix}
          <div className="max-w-full line-clamp-1">
            {name}: <span className="hook-value-placeholder">{element}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="hook-value-view">
          <div className="flex w-full my-0.5">
            <span className={"text-gray-400 hover:text-gray-700"} onClick={() => setExpand(!expand)}>
              {StateIcon}
            </span>
            {prefix}
            <div className="max-w-full line-clamp-1">
              {name}: <span className="hook-value-placeholder">{text}</span>
            </div>
          </div>
          <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`}>
            {Array.isArray(item.v) ? (
              <>
                {item.v.map((i: HOOKTree["v"], index: number) => (
                  <ValueViewTree key={index} name={index.toString()} item={i} />
                ))}
              </>
            ) : (
              <>
                {Object.keys(item.v).map((key) => (
                  <ValueViewTree key={key} name={key} item={item.v[key]} />
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};

export const HookView_v2 = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const id = currentSelectDetail?.i;

  const hookList = currentSelectDetail?._h || [];

  const maxLength = currentSelectDetail?.hook?.length;

  const hasHook = hookList.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  if (hasHook) {
    return (
      <div className="p-2">
        <div>hooks_v2</div>
        <Spacer y={1} />
        <div
          className={`w-full ${sizeClass} font-mono tree-wrapper`}
          // @ts-expect-error css 变量
          style={{ ["--index-width"]: `${Math.max(maxLength?.toString()?.length || 0, 2) * 0.8}em` }}
        >
          {hookList.map((item, index) => (
            <HookViewTree item={item as HOOKTree} key={id + "-" + index} />
          ))}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
