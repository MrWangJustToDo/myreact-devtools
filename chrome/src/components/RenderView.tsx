import { Divider, Spacer } from "@nextui-org/react";
import { useMemo } from "react";
// import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { checkHasInclude } from "@/utils/node";

import { RenderItem } from "./TreeItem";

import type { PlainNode } from "@my-react-devtool/core";

export const RenderView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.id === select);

  let renderTree = currentSelectDetail?.["tree"];

  // const [isScrolling, setIsScrolling] = useState(false);

  const filterType = useFilterNode((s) => s.filter);

  const typeArray = useMemo(() => Array.from(filterType).map((i) => +i), [filterType]);

  const allTreeNode = useAppTree((s) => s.list);

  let last = renderTree?.[renderTree?.length - 1];

  if (last?.startsWith("@my-react")) {
    renderTree = renderTree?.slice(0, -1);
  } else {
    last = undefined;
  }

  const renderTreeNode = useMemo(() => renderTree?.map((item) => allTreeNode.find((i) => i.id === item)), [allTreeNode, renderTree]) as PlainNode[];

  const data = useMemo(() => renderTreeNode?.filter((item) => !checkHasInclude(item, typeArray)), [typeArray, renderTreeNode]);

  const render = useCallbackRef((index: number) => {
    const node = data?.[index];

    if (!node) return null;

    return (
      <div className="text-[11px] ml-2 font-mono" key={node.id}>
        <RenderItem node={node} withCollapse={false} />
      </div>
    );
  });

  if (data?.length) {
    return (
      <div className="p-2">
        <div>renders</div>
        <Spacer y={1} />
        <div className="w-full">
          {data.map((_, index) => render(index))}
          <div className="text-[11px] ml-2 font-mono px-[2px]">{last || "@my-react"}</div>
          {/* <Virtuoso overscan={20} isScrolling={setIsScrolling} context={{ isScrolling }} totalCount={data?.length} itemContent={render} /> */}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
