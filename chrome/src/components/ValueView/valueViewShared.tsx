import { type NodeValue as NodeValueType } from "@my-react-devtool/core";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { Fragment, useEffect, useMemo, useState, type MutableRefObject, type ReactNode } from "react";

import { useChunk } from "@/hooks/useChunk";
import { usePrevious } from "@/hooks/usePrevious";
import { getText } from "@/utils/treeValue";

/** Max children rendered per expand level (Chrome DevTools-style paging). */
export const VALUE_CHILD_PAGE_SIZE = 120;

export const VALUE_PATH_SEP = "_$_$_";

export const buildValuePathKey = (prevName: string, name: string) => `${prevName}${VALUE_PATH_SEP}${name}`;

export type FormatNodeValueTextParams = {
  n?: string;
  t?: string;
  _t?: string;
  data: unknown;
};

export function formatNodeValueText({ n, t, _t, data }: FormatNodeValueTextParams): ReactNode {
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
      }
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
    if (t === "Iterable" || t === "Object" || t === "Promise" || t === "DataView" || _t === "Object") {
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
    }
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

  return getTextElement();
}

export function useNodeValueData(item?: NodeValueType) {
  const chunkData = useChunk.useShallowSelector((s) => s.data?.[item?.i || ""]?.loaded);

  const cData = item?.v ?? chunkData?.v;
  const pData = usePrevious(cData, (c) => !!c);
  const data = cData ?? pData;

  const n = chunkData?.n ?? item?.n;
  const t = chunkData?.t ?? item?.t;
  const _t = chunkData?._t ?? item?._t;
  const id = chunkData?.i || item?.i;

  const text = useMemo(() => formatNodeValueText({ n, t, _t, data }), [t, n, data, _t]);

  return { chunkData, cData, data, n, t, _t, id, text };
}

export type PagedChildEntry = {
  name: string;
  item: NodeValueType;
};

const getChildEntries = (data: unknown, limit: number): { entries: PagedChildEntry[]; total: number } | null => {
  if (Array.isArray(data)) {
    const total = data.length;
    const entries: PagedChildEntry[] = [];

    for (let index = 0; index < Math.min(total, limit); index++) {
      const child = data[index] as NodeValueType | undefined;
      if (child) {
        entries.push({ name: index.toString(), item: child });
      }
    }

    return { entries, total };
  }

  if (data && typeof data === "object") {
    const keys = Object.keys(data).sort().reverse();
    const total = keys.length;
    const entries: PagedChildEntry[] = [];

    for (let i = 0; i < Math.min(total, limit); i++) {
      const key = keys[i];
      const child = (data as Record<string, NodeValueType>)[key];
      if (child) {
        entries.push({ name: key, item: child });
      }
    }

    return { entries, total };
  }

  return null;
};

const preloadExpandableChildren = (data: unknown, limit: number) => {
  const slice = getChildEntries(data, limit);
  if (!slice) return;

  slice.entries.forEach(({ item: child }) => {
    if (child?.e && child.i && !child.l && !useChunk.getReadonlyState().data?.[child.i]?.loaded) {
      useChunk.getActions().setLoading(child.i);
    }
  });
};

export function usePagedChildEntries(data: unknown, resetKey?: string | number) {
  const [visibleCount, setVisibleCount] = useState(VALUE_CHILD_PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(VALUE_CHILD_PAGE_SIZE);
  }, [resetKey]);

  const paged = useMemo(() => getChildEntries(data, visibleCount), [data, visibleCount]);

  const hiddenCount = paged ? Math.max(0, paged.total - paged.entries.length) : 0;

  const showMore = () => {
    if (!paged) return;
    setVisibleCount((c) => Math.min(c + VALUE_CHILD_PAGE_SIZE, paged.total));
  };

  return {
    entries: paged?.entries ?? [],
    total: paged?.total ?? 0,
    hiddenCount,
    hasMore: hiddenCount > 0,
    showMore,
    visibleCount,
  };
}

export const ValueHiddenItemsRow = ({ hiddenCount, onShowMore }: { hiddenCount: number; onShowMore: () => void }) => {
  if (hiddenCount <= 0) return null;

  const next = Math.min(VALUE_CHILD_PAGE_SIZE, hiddenCount);

  return (
    <div className="text-gray-500 text-sm my-0.5 pl-1 cursor-pointer select-none hover:text-gray-700 node-item-hover rounded-[2px]" onClick={onShowMore}>
      … {hiddenCount} {hiddenCount === 1 ? "item" : "items"} hidden (show next {next})
    </div>
  );
};

export function useChunkExpandEffects({
  expand,
  item,
  chunkData,
  cData,
  hasOpenRef,
  visibleCount = VALUE_CHILD_PAGE_SIZE,
}: {
  expand: boolean;
  item?: NodeValueType;
  chunkData?: NodeValueType;
  cData: unknown;
  hasOpenRef: MutableRefObject<boolean>;
  visibleCount?: number;
}) {
  useEffect(() => {
    if (expand && item?.l === false && item.i && (!chunkData || chunkData.i !== item.i)) {
      useChunk.getActions().setLoading(item.i);
    }
    if (expand) {
      hasOpenRef.current = true;
    }
  }, [chunkData, expand, item?.i, item?.l, hasOpenRef]);

  // preload expandable data (only for the visible page — avoids OOM on huge arrays)
  useEffect(() => {
    if (expand && cData) {
      preloadExpandableChildren(cData, visibleCount);
    }
  }, [cData, expand, visibleCount]);
}
