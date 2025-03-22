import { Spinner } from "@heroui/react";
import { Ellipsis, Play } from "lucide-react";
import { useState, useRef, useMemo, useEffect } from "react";

import { useChunk } from "@/hooks/useChunk";
import { useContextMenu } from "@/hooks/useContextMenu";
import { usePrevious } from "@/hooks/usePrevious";
import { getText } from "@/utils/treeValue";

import { NodeValueChange } from "./NodeValueChange";

import type { HOOKTree, NodeValue as NodeValueType } from "@my-react-devtool/core";
import type { ReactNode } from "react";

const { open: contextOpen, setId, setType } = useContextMenu.getActions();

export const NodeValue = ({
  name,
  item,
  rootItem,
  parentItem,
  prefix,
  editable,
  hookIndex,
  type,
  chunkId,
}: {
  name: string;
  item?: NodeValueType;
  rootItem?: NodeValueType;
  parentItem?: NodeValueType;
  prefix?: ReactNode;
  editable?: boolean;
  hookIndex?: number;
  type?: string;
  chunkId?: number;
}) => {
  const [expand, setExpand] = useState(false);

  const hasOpenRef = useRef(false);

  const chunkData = useChunk.useShallowSelector((s) => s.data?.[item?.i || ""]?.loaded);

  const cData = item?.v ?? chunkData?.v;

  const pData = usePrevious(cData, (c) => !!c);

  const data = cData ?? pData;

  const n = chunkData?.n ?? item?.n;

  const t = chunkData?.t ?? item?.t;

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
    if (expand && item?.l === false && item.i && (!chunkData || chunkData.i !== item.i)) {
      useChunk.getActions().setLoading(item.i);
    }
    if (expand) {
      hasOpenRef.current = true;
    }
  }, [chunkData, expand, item?.i, item?.l]);

  // preload expandable data
  useEffect(() => {
    if (expand && cData) {
      if (Array.isArray(cData)) {
        cData.forEach((i) => {
          if (i.e && i.i && !i.l && !useChunk.getReadonlyState().data?.[i.i]?.loaded) {
            useChunk.getActions().setLoading(i.i);
          }
        });
      } else {
        Object.values(cData).forEach((i: any) => {
          if (i.e && i.i && !i.l && !useChunk.getReadonlyState().data?.[i.i]?.loaded) {
            useChunk.getActions().setLoading(i.i);
          }
        });
      }
    }
  }, [cData, expand]);

  const onContextClick = (e: React.MouseEvent) => {
    // if the data not loaded, do not show context menu
    if (!data || !item) return;

    e.preventDefault();

    contextOpen({ x: e.clientX, y: e.clientY });

    setId(item.i);

    setType(item.t);
  };

  if (!item) return null;

  const isChunk = item.l === false;

  const id = chunkData?.i || item.i;

  const currentIsExpandable = item.e;

  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  if (!currentIsExpandable) {
    const textContent = item.t === "String" ? `"${String(item.v)}"` : String(item.v);

    const isReadError = item.t === "ReadError";

    const element = <span className={`hook-${item.t} ${isReadError ? "text-red-300" : ""}`}>{textContent}</span>;

    const currentIsEditable = editable && (item?.t === "String" || item?.t === "Number" || item?.t === "Boolean");

    return (
      <div data-id={id} data-chunk={isChunk} className="hook-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span className="text-transparent w-[1.5em] h-[1.5em] inline-block">{StateIcon}</span>
          {prefix}
          <div className={`w-full relative line-clamp-1 break-all pr-2`}>
            <span className="cursor-pointer select-none" onContextMenu={onContextClick}>
              {name}
            </span>
            :{" "}
            {currentIsEditable ? (
              <NodeValueChange item={item} chunkId={chunkId} hookIndex={hookIndex} path={name} type={type || ""} rootItem={rootItem} parentItem={parentItem}>
                <span className="hook-value-placeholder">{element}</span>
              </NodeValueChange>
            ) : (
              <span className="hook-value-placeholder">{element}</span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div data-id={id} data-chunk={isChunk} className="hook-value-view">
          <div className="flex w-full my-0.5 items-center">
            <span
              className={"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700"}
              onClick={() => setExpand(!expand)}
            >
              {StateIcon}
            </span>
            {prefix}
            <div className="max-w-full line-clamp-1 break-all">
              <span className="cursor-pointer select-none" onClick={() => setExpand(!expand)} onContextMenu={onContextClick}>
                {name}
              </span>
              : <span className="hook-value-placeholder">{data ? text : <Ellipsis className="inline-block" />}</span>
            </div>
          </div>
          {(hasOpenRef.current || expand) && (
            <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`}>
              {data ? (
                Array.isArray(data) ? (
                  <>
                    {data.map((i: HOOKTree["v"], index: number) => (
                      <NodeValue
                        key={index}
                        name={index.toString()}
                        item={i}
                        type={type}
                        rootItem={rootItem || item}
                        editable={editable && typeof n !== "string"}
                        chunkId={isChunk ? id : chunkId}
                        parentItem={item}
                        hookIndex={hookIndex}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {Object.keys(data)
                      .sort()
                      .reverse()
                      .map((key) => (
                        <NodeValue
                          key={key}
                          name={key}
                          item={data[key]}
                          type={type}
                          rootItem={rootItem || item}
                          parentItem={item}
                          editable={editable && typeof n !== "string"}
                          chunkId={isChunk ? id : chunkId}
                          hookIndex={hookIndex}
                        />
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
