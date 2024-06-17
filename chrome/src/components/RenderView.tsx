import { Divider, Skeleton } from "@nextui-org/react";
import { useMemo } from "react";
// import { Virtuoso } from "react-virtuoso";

import { useAppTree } from "@/hooks/useAppTree";
import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { checkHasInclude, type TreeNode } from "@/utils/node";

import { RenderItem } from "./TreeItem";

export const RenderView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList, loading } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const renderTree = currentSelectDetail?.["tree"];

  const isLoading = !currentSelectDetail && loading;

  // const [isScrolling, setIsScrolling] = useState(false);

  const filterType = useFilterNode((s) => s.filter);

  const typeArray = useMemo(() => Array.from(filterType).map((i) => +i), [filterType]);

  const allTreeNode = useAppTree((s) => s.flattenNodes);

  const renderTreeNode = useMemo(() => renderTree?.map((item) => allTreeNode.find((i) => i.id === item)), [allTreeNode, renderTree]);

  const data = useMemo(() => renderTreeNode?.filter((item) => !checkHasInclude(item as TreeNode, typeArray)), [typeArray, renderTreeNode]);

  const render = useCallbackRef((index: number) => {
    const node = data![index]! as TreeNode;

    return (
      <div className="text-[11px] ml-2 font-mono">
        <RenderItem node={node} withCollapse={false} />
      </div>
    );
  });

  if (isLoading) {
    return (
      <div className="p-2">
        <div className="w-full h-[100px]">
          <Skeleton className="w-full h-[99%]" />
        </div>
        <Divider />
      </div>
    );
  }

  if (data?.length) {
    return (
      <div className="p-2">
        <div>renders</div>
        <div className="w-full h-[300px]">
          {data.map((_, index) => render(index))}
          {/* <Virtuoso overscan={20} isScrolling={setIsScrolling} context={{ isScrolling }} totalCount={data?.length} itemContent={render} /> */}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
