import { Spinner } from "@heroui/react";
import { DiffIcon, Ellipsis, Play } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { useCompare } from "@/hooks/useCompare";
import { useContextMenu } from "@/hooks/useContextMenu";

import { buildValuePathKey, useChunkExpandEffects, useNodeValueData, usePagedChildEntries, ValueHiddenItemsRow } from "./valueViewShared";

import type { NodeValue as NodeValueType } from "@my-react-devtool/core";

const { open: contextOpen, setId, setType, setSource, clear } = useContextMenu.getActions();

const { toggleExpand, setLId, setRId } = useCompare.getActions();

export const CompareValueView = ({
  prevName,
  name,
  item,
  side,
  prefix,
  chunkId,
}: {
  prevName: string;
  name: string;
  side: "l" | "r";
  item?: NodeValueType;
  prefix?: ReactNode;
  chunkId?: number;
}) => {
  const pathKey = buildValuePathKey(prevName, name);

  const { expand, lId, rId } = useCompare.useShallowSelector((s) => ({
    expand: !!s.expand[pathKey],
    lId: s.lIds[pathKey],
    rId: s.rIds[pathKey],
  }));

  const hasOpenRef = useRef(false);

  const { chunkData, cData, data, id, text } = useNodeValueData(item);

  const { entries, hiddenCount, showMore, visibleCount } = usePagedChildEntries(data, id);

  useChunkExpandEffects({ expand, item, chunkData, cData, hasOpenRef, visibleCount });

  useEffect(() => {
    if (!id) return;

    if (side === "l") {
      setLId(pathKey, id);
    } else {
      setRId(pathKey, id);
    }
  }, [id, side, pathKey]);

  const onContextClick = (e: React.MouseEvent) => {
    // if the data not loaded, do not show context menu
    if (!data || !item) return;

    e.preventDefault();

    contextOpen({ x: e.clientX, y: e.clientY });

    setId(item.i);

    setType(item.t);
  };

  const hasDiff = !!(lId && rId && lId !== rId);

  if (!item || !id) return null;

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

    return (
      <div data-id={id} data-chunk={isChunk} className="node-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span className="text-transparent w-[1.5em] h-[1.5em] inline-block shrink-0">{StateIcon}</span>
          {prefix}
          {hasDiff && <DiffIcon size="1em" className="mr-0.5 shrink-0 text-red-400" />}
          <div className={`w-full relative flex pr-2 line-clamp-1 break-all`}>
            <span className="flex-shrink-0 cursor-pointer whitespace-nowrap" onContextMenu={onContextClick}>
              {name}
            </span>
            <span className="flex-shrink-0">:</span>
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
            onClick={() => toggleExpand(pathKey)}
          >
            {StateIcon}
          </span>
          {prefix}
          {hasDiff && <DiffIcon size="1em" className="mr-0.5 shrink-0 text-red-400" />}
          <div className="max-w-full flex line-clamp-1 break-all">
            <span className="flex-shrink-0 cursor-pointer whitespace-nowrap" onClick={() => toggleExpand(pathKey)} onContextMenu={onContextClick}>
              {name}
            </span>
            <span className="flex-shrink-0 pr-1">:</span>
            <span className="node-value-placeholder line-clamp-1 break-all">
              {data ? text : <Ellipsis className="inline-block font-sm" width="1em" height="1em" />}
            </span>
          </div>
        </div>
        {(hasOpenRef.current || expand) && (
          <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`}>
            {data ? (
              <>
                {entries.map(({ name: childName, item: childItem }) => (
                  <CompareValueView key={childName} side={side} prevName={pathKey} name={childName} item={childItem} chunkId={isChunk ? id : chunkId} />
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
