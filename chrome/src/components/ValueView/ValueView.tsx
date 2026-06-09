import { Spinner } from "@heroui/react";
import { Ellipsis, Play } from "lucide-react";
import { useState, useRef, type ReactNode } from "react";

import { useContextMenu } from "@/hooks/useContextMenu";

import { ValueChange } from "./ValueChange";
import { useChunkExpandEffects, useNodeValueData, usePagedChildEntries, ValueHiddenItemsRow } from "./valueViewShared";

import type { NodeValue as NodeValueType } from "@my-react-devtool/core";

const { open: contextOpen, setId, setType, setSource, clear, setOpenCallback } = useContextMenu.getActions();

// core component to view any typeof data with incremental loading
export const ValueView = ({
  name,
  item,
  rootItem,
  parentItem,
  prefix,
  // for edit update on fiber
  editable,
  type,
  // for hook prev view
  hookIndex,
  // for incremental loading
  chunkId,
  // auto expand
  expandCount,
}: {
  name: string;
  item?: NodeValueType;
  rootItem?: NodeValueType;
  parentItem?: NodeValueType;
  prefix?: ReactNode;
  editable?: boolean;
  type?: string;
  hookIndex?: number;
  chunkId?: number;
  expandCount?: number;
}) => {
  const [expand, setExpand] = useState(() => !!expandCount);
  const [count, setCount] = useState(0);
  const hasOpenRef = useRef(false);

  const { chunkData, cData, data, n, _t, id, text } = useNodeValueData(item);

  const { entries, hiddenCount, showMore, visibleCount } = usePagedChildEntries(data, id);

  useChunkExpandEffects({ expand, item, chunkData, cData, hasOpenRef, visibleCount });

  const onContextClick = (e: React.MouseEvent) => {
    // if the data not loaded, do not show context menu
    if (!data || !item) return;

    e.preventDefault();

    contextOpen({ x: e.clientX, y: e.clientY });

    setId(item.i);

    setType(item.t);

    setOpenCallback(() => {
      setExpand(true);
      setCount(4);
    });
  };

  const finalOpenCount = count || (typeof expandCount === "number" ? expandCount : 0);

  if (!item) return null;

  const isChunk = item.l === false;
  const currentIsExpandable = item.e;
  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  if (!currentIsExpandable) {
    const textContent =
      item.t === "String" ? `"${String(item.v)}"` : item.t === "BigInt" && typeof item.v === "string" && !item.v.endsWith("n") ? `${item.v}n` : String(item.v);
    const isReadError = item.t === "ReadError";
    const isElement = item.t === "Element";
    const isFunction = item.t === "Function" || item.t === "AsyncFunction" || item.t === "GeneratorFunction";

    const element = (
      <span className={`hook-${item.t} pl-1 ${isReadError ? "text-red-300" : ""} ${isElement || isFunction ? "text-teal-600" : ""}`}>{textContent}</span>
    );

    const currentIsEditable = editable && item._t !== "Readonly" && (item?.t === "String" || item?.t === "Number" || item?.t === "Boolean");

    return (
      <div data-id={id} data-chunk={isChunk} className="node-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span className="text-transparent w-[1.5em] h-[1.5em] inline-block shrink-0">{StateIcon}</span>
          {prefix}
          <div className={`w-full relative flex pr-2 line-clamp-1 break-all`}>
            {name && (
              <>
                <span className="flex-shrink-0 cursor-pointer whitespace-nowrap" onContextMenu={onContextClick}>
                  {name}
                </span>
                <span className="flex-shrink-0">:</span>
              </>
            )}
            {currentIsEditable ? (
              <span className="node-value-placeholder relative line-clamp-1 break-all" title={textContent}>
                <ValueChange item={item} chunkId={chunkId} hookIndex={hookIndex} path={name} type={type || ""} rootItem={rootItem} parentItem={parentItem}>
                  {element}
                </ValueChange>
              </span>
            ) : (
              <span
                className={
                  "node-value-placeholder flex-grow line-clamp-1 break-all" +
                  (isFunction || isElement ? " cursor-pointer node-item-hover rounded-[2px] overflow-hidden" : "")
                }
                onClick={async () => {
                  if ((isFunction || isElement) && id) {
                    setId(id);
                    setSource();
                    await new Promise((r) => setTimeout(r, 100));
                    clear();
                  }
                }}
                title={textContent}
              >
                {element}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div data-id={id} data-chunk={isChunk} className="node-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span
            className={"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700 shrink-0"}
            onClick={() => setExpand(!expand)}
          >
            {StateIcon}
          </span>
          {prefix}
          <div className="max-w-full flex line-clamp-1 break-all">
            <span className="flex-shrink-0 cursor-pointer whitespace-nowrap" onClick={() => setExpand(!expand)} onContextMenu={onContextClick}>
              {name}
            </span>
            <span className="flex-shrink-0 pr-1">:</span>
            <span className="node-value-placeholder line-clamp-1 break-all">
              {data ? text : <Ellipsis className="inline-block font-sm" width="1em" height="1em" />}
            </span>
          </div>
        </div>
        {(hasOpenRef.current || expand) && (
          <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`} key={count}>
            {data ? (
              <>
                {entries.map(({ name: childName, item: childItem }) => (
                  <ValueView
                    key={childName}
                    name={childName}
                    item={childItem}
                    type={type}
                    rootItem={rootItem || item}
                    editable={editable && _t !== "Readonly" && typeof n !== "string"}
                    chunkId={isChunk ? id : chunkId}
                    parentItem={item}
                    hookIndex={hookIndex}
                    expandCount={finalOpenCount ? finalOpenCount - 1 : 0}
                  />
                ))}
                <ValueHiddenItemsRow hiddenCount={hiddenCount} onShowMore={showMore} />
              </>
            ) : (
              <Spinner size="sm" />
            )}
          </div>
        )}
      </div>
    </>
  );
};
