import { Spinner } from "@nextui-org/react";
import { TriangleDownIcon, TriangleRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState, useRef, useMemo, useEffect } from "react";

import { useChunk } from "@/hooks/useChunk";
import { getText } from "@/utils/treeValue";

import type { HOOKTree, NodeValue } from "@my-react-devtool/core";
import type { ReactNode} from "react";

export const TreeValueView = ({ name, item, prefix }: { name: string; item?: NodeValue; prefix?: ReactNode }) => {
  const [expand, setExpand] = useState(false);

  const hasOpenRef = useRef(false);

  const chunkData = useChunk.useShallowStableSelector((s) => s.data?.[item?.i || ""]?.loaded);

  const data = chunkData?.v ?? item?.v;

  const n = chunkData?.n ?? item?.n;

  const t = chunkData?.t ?? item?.t;

  const isCache = chunkData?.c ?? item?.c;

  const text = useMemo(() => {
    if (n) {
      return n;
    }
    if (t === "Array" || t === "Set" || t === "Map") {
      const re = getText("Array", data ?? []);
      if (t === "Set" || t === "Map") {
        return `${t}(${re})`;
      } else {
        return re;
      }
    }
    if (t === "Iterable" || t === "Object") {
      return getText("Object", data ?? {});
    }
  }, [t, n, data]);

  useEffect(() => {
    if (expand && item?.l === false && item.i && !chunkData) {
      useChunk.getActions().setLoading(item.i);
    }
    if (expand) {
      hasOpenRef.current = true;
    }
  }, [chunkData, expand, item?.i, item?.l]);

  if (!item) return null;

  const currentIsExpand = item.e;

  const StateIcon = expand ? <TriangleDownIcon width="16" height="16" /> : <TriangleRightIcon width="16" height="16" />;

  if (!currentIsExpand) {
    const textContent = item.t === "String" ? `"${String(item.v)}"` : String(item.v);

    const isReadError = item.t === "ReadError";

    const element = <span className={`hook-${item.t} ${isReadError ? "text-red-300" : ""}`}>{textContent}</span>;

    return (
      <div className="hook-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span className="text-transparent">{StateIcon}</span>
          {prefix}
          <div className="max-w-full line-clamp-1 break-all">
            <span className="cursor-pointer">{name}</span>: <span className="hook-value-placeholder">{element}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="hook-value-view">
          <div className="flex w-full my-0.5 items-center">
            <span className={"text-gray-400 hover:text-gray-700"} onClick={() => setExpand(!expand)}>
              {StateIcon}
            </span>
            {prefix}
            <div className="max-w-full line-clamp-1 break-all">
              <span className="cursor-pointer" onClick={() => setExpand(!expand)}>
                {name}
              </span>
              : <span className="hook-value-placeholder">{data ? text : <DotsHorizontalIcon className="inline-block" />}</span>
            </div>
          </div>
          {(isCache ? expand : hasOpenRef.current || expand) && (
            <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`}>
              {data ? (
                Array.isArray(data) ? (
                  <>
                    {data.map((i: HOOKTree["v"], index: number) => (
                      <TreeValueView key={index} name={index.toString()} item={i} />
                    ))}
                  </>
                ) : (
                  <>
                    {Object.keys(data)
                      .sort()
                      .reverse()
                      .map((key) => (
                        <TreeValueView key={key} name={key} item={data[key]} />
                      ))}
                  </>
                )
              ) : (
                <Spinner size="sm" />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
};
