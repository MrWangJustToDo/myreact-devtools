import { Spinner } from "@heroui/react";
import { DiffIcon, Ellipsis, MinusCircleIcon, Play, PlusCircleIcon } from "lucide-react";
import { useRef, useMemo, useEffect, Fragment } from "react";

import { useChunk } from "@/hooks/useChunk";
import { useCompare } from "@/hooks/useCompare";
import { useContextMenu } from "@/hooks/useContextMenu";
import { usePrevious } from "@/hooks/usePrevious";
import { getText } from "@/utils/treeValue";

import type { HOOKTree, NodeValue as NodeValueType } from "@my-react-devtool/core";
import type { ReactNode } from "react";

const { open: contextOpen, setId, setType, setSource, clear } = useContextMenu.getActions();

const { toggleExpand, setLId, setRId } = useCompare.getActions();

export const SimpleValueView = ({
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
  const currentName = prevName + "_$_$_" + name;

  const { expand, lId, rId } = useCompare.useShallowSelector((s) => ({ expand: s.expand[currentName], lId: s.lIds[currentName], rId: s.rIds[currentName] }));

  const hasOpenRef = useRef(false);

  const chunkData = useChunk.useShallowSelector((s) => s.data?.[item?.i || ""]?.loaded);

  const cData = item?.v ?? chunkData?.v;

  const pData = usePrevious(cData, (c) => !!c);

  const data = cData ?? pData;

  const n = chunkData?.n ?? item?.n;

  const t = chunkData?.t ?? item?.t;

  const _t = chunkData?._t ?? item?._t;

  const id = chunkData?.i || item?.i;

  const text = useMemo(() => {
    const getTextElement = () => {
      if (n) {
        return n;
      }
      if (t === "Array" || t === "Set" || t === "Map") {
        const re = getText("Array", data ?? []);
        if (t === "Set" || t === "Map") {
          if (Array.isArray(re)) {
            return (
              <>
                {t}
                {"(["}
                {re.map((i, index) => (
                  <Fragment key={index}>
                    {i}
                    {index < re.length - 1 ? ", " : ""}
                  </Fragment>
                ))}
                {"])"}
              </>
            );
          }
          return `${t}([${re}])`;
        } else {
          if (Array.isArray(re)) {
            return (
              <>
                {"["}
                {re.map((i, index) => (
                  <Fragment key={index}>
                    {i}
                    {index < re.length - 1 ? ", " : ""}
                  </Fragment>
                ))}
                {"]"}
              </>
            );
          }
          return `[${re}]`;
        }
      }
      if (t === "Iterable" || t === "Object" || _t === "Object") {
        const re = getText("Object", data ?? {});
        if (Array.isArray(re)) {
          return (
            <>
              {"{"}
              {re.map((i, index) => (
                <Fragment key={index}>
                  {i}
                  {index < re.length - 1 ? ", " : ""}
                </Fragment>
              ))}
              {"}"}
            </>
          );
        }
        return `{${re}}`;
      }
    };

    if (_t && !n) {
      // original object
      if (_t === "Object") {
        return (
          <>
            [object {t} {getTextElement()}]
          </>
        );
      } else {
        // reactivity-store data
        return (
          <>
            <span className="pr-1" title="reactivity-store, see https://github.com/MrWangJustToDo/reactivity-store">
              {_t === "Readonly" ? (
                <MinusCircleIcon className="text-red-400 inline" width="1em" height="1em" />
              ) : (
                <PlusCircleIcon className="text-green-400 inline" width="1em" height="1em" />
              )}{" "}
              {_t}
            </span>
            {getTextElement()}
          </>
        );
      }
    }

    return getTextElement();
  }, [t, n, data, _t]);

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
          if (i && i.e && i.i && !i.l && !useChunk.getReadonlyState().data?.[i.i]?.loaded) {
            useChunk.getActions().setLoading(i.i);
          }
        });
      } else {
        Object.values(cData).forEach((i: any) => {
          if (i && i.e && i.i && !i.l && !useChunk.getReadonlyState().data?.[i.i]?.loaded) {
            useChunk.getActions().setLoading(i.i);
          }
        });
      }
    }
  }, [cData, expand]);

  useEffect(() => {
    if (side === "l") {
      setLId(currentName, id || "");
    } else {
      setRId(currentName, id || "");
    }
  }, [id, side, currentName]);

  const onContextClick = (e: React.MouseEvent) => {
    // if the data not loaded, do not show context menu
    if (!data || !item) return;

    e.preventDefault();

    contextOpen({ x: e.clientX, y: e.clientY });

    setId(item.i);

    setType(item.t);
  };

  const hasDiff = lId && rId && lId !== rId;

  if (!item || !id) return null;

  const isChunk = item.l === false;

  const currentIsExpandable = item.e;

  const StateIcon = <Play fill="currentColor" className={`origin-center ${expand ? "rotate-90" : ""}`} width="0.6em" height="0.6em" />;

  if (!currentIsExpandable) {
    const textContent = item.t === "String" ? `"${String(item.v)}"` : String(item.v);

    const isReadError = item.t === "ReadError";

    const isElement = item.t === "Element";

    const isFunction = item.t === "Function" || item.t === "AsyncFunction" || item.t === "GeneratorFunction";

    const element = (
      <span className={`hook-${item.t} pl-1 ${isReadError ? "text-red-300" : ""} ${isElement || isFunction ? "text-teal-600" : ""}`}>{textContent}</span>
    );

    return (
      <div data-id={id} data-chunk={isChunk} className="hook-value-view">
        <div className="flex w-full my-0.5 items-center">
          <span className="text-transparent w-[1.5em] h-[1.5em] inline-block shrink-0">{StateIcon}</span>
          {prefix}
          {hasDiff && <DiffIcon size="1em" className="mr-0.5 shrink-0 text-red-400" />}
          <div className={`w-full relative flex pr-2 line-clamp-1 break-all`}>
            <span className="flex-shrink-0 cursor-pointer select-none whitespace-nowrap" onContextMenu={onContextClick}>
              {name}
            </span>
            <span className="flex-shrink-0">:</span>
            <span
              className={
                "hook-value-placeholder flex-grow line-clamp-1 break-all" +
                (isFunction || isElement ? " cursor-pointer node-item-hover rounded-[2px] overflow-hidden" : "")
              }
              onClick={async () => {
                if (isFunction || isElement) {
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
  } else {
    return (
      <>
        <div data-id={id} data-chunk={isChunk} className="hook-value-view">
          <div className="flex w-full my-0.5 items-center">
            <span
              className={"text-gray-400 w-[1.5em] h-[1.5em] cursor-pointer inline-flex justify-center items-center hover:text-gray-700 shrink-0"}
              onClick={() => toggleExpand(currentName)}
            >
              {StateIcon}
            </span>
            {prefix}
            {hasDiff && <DiffIcon size="1em" className="mr-0.5 shrink-0 text-red-400" />}
            <div className="max-w-full flex line-clamp-1 break-all">
              <span
                className="flex-shrink-0 cursor-pointer select-none whitespace-nowrap"
                onClick={() => toggleExpand(currentName)}
                onContextMenu={onContextClick}
              >
                {name}
              </span>
              <span className="flex-shrink-0 pr-1">:</span>
              <span className="hook-value-placeholder line-clamp-1 break-all">
                {data ? text : <Ellipsis className="inline-block font-sm" width="1em" height="1em" />}
              </span>
            </div>
          </div>
          {(hasOpenRef.current || expand) && (
            <div className={`${expand ? "block" : "hidden"} ml-6 my-0.5`}>
              {data ? (
                Array.isArray(data) ? (
                  <>
                    {data.map((i: HOOKTree["v"], index: number) => (
                      <SimpleValueView key={index} side={side} prevName={currentName} name={index.toString()} item={i} chunkId={isChunk ? id : chunkId} />
                    ))}
                  </>
                ) : (
                  <>
                    {Object.keys(data)
                      .sort()
                      .reverse()
                      .map((key) => (
                        <SimpleValueView key={key} side={side} prevName={currentName} name={key} item={data[key]} chunkId={isChunk ? id : chunkId} />
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
