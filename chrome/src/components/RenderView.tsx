import { useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { checkHasInclude, type TreeNode } from "@/utils/node";

import { RenderItem } from "./TreeItem";

export const RenderView = () => {
  const select = useTreeNode((s) => s.select);

  const renderTree = select?.current?.["tree"];

  const [isScrolling, setIsScrolling] = useState(false);

  const filterType = useFilterNode((s) => s.filter);

  const typeArray = useMemo(() => Array.from(filterType).map((i) => +i), [filterType]);

  const allTreeNode = useAppTree((s) => s.flattenNodes);

  const renderTreeNode = useMemo(() => renderTree?.map((item) => allTreeNode.find((i) => i.id === item)), [allTreeNode, renderTree]);

  const data = useMemo(() => renderTreeNode?.filter((item) => !checkHasInclude(item as TreeNode, typeArray)), [typeArray, renderTreeNode]);

  const render = useCallbackRef((index: number, _: unknown, { isScrolling }: { isScrolling?: boolean }) => {
    const node = data![index]! as TreeNode;

    return <RenderItem node={node} isScrolling={isScrolling} withCollapse={false} />;
  });

  if (data?.length) {
    return (
      <div className="p-2">
        <div>renders</div>
        <div className="w-full h-[300px]">
          <Virtuoso overscan={20} isScrolling={setIsScrolling} context={{ isScrolling }} totalCount={data?.length} itemContent={render} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
