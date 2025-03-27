import { Divider, Spacer } from "@heroui/react";
import { useMemo } from "react";
// import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useSelectNode } from "@/hooks/useSelectNode";
import { checkHasInclude } from "@/utils/node";

import { TreeItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

const { scrollIntoView } = useSelectNode.getActions();

export const RenderView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const t = currentSelectDetail?.["_t"];

  let renderTree = currentSelectDetail?.["_t"];

  const filterType = useFilterNode((s) => s.filter);

  const typeArray = useMemo(() => Array.from(filterType).map((i) => +i), [filterType]);

  const allTreeNode = useAppTree((s) => s.list);

  let last = renderTree?.[renderTree?.length - 1];

  if (last?.startsWith("@my-react")) {
    renderTree = renderTree?.slice(0, -1);
  } else {
    last = undefined;
  }

  let mode = renderTree?.[renderTree?.length - 1];

  if (mode?.startsWith("@my-react")) {
    renderTree = renderTree?.slice(0, -1);
  } else {
    mode = undefined;
  }

  const renderTreeNode = useMemo(() => renderTree?.map((item) => allTreeNode.find((i) => i.i === item)), [allTreeNode, renderTree]) as PlainNode[];

  const data = useMemo(() => renderTreeNode?.filter((item) => !checkHasInclude(item, typeArray)), [typeArray, renderTreeNode]);

  const render = useCallbackRef((index: number) => {
    const node = data?.[index];

    if (!node) return null;

    return (
      <div className={`ml-2`} key={node.i} onClick={scrollIntoView}>
        <TreeItem node={node} withCollapse={false} />
      </div>
    );
  });

  if (t?.length) {
    return (
      <>
        <div className="node-renders p-2 pb-0">
          <div>renders</div>
          <Spacer y={1} />
          <div className="w-full font-code font-sm">
            {data.map((_, index) => render(index))}
            {mode && <div className={`ml-2 px-[2px]`}>{mode}</div>}
            <div className={`ml-2 px-[2px]`}>{last || "@my-react"}</div>
            {/* <Virtuoso overscan={20} isScrolling={setIsScrolling} context={{ isScrolling }} totalCount={data?.length} itemContent={render} /> */}
          </div>
        </div>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};
