import { Chip, Skeleton, Spacer } from "@nextui-org/react";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import JsonView from "react18-json-view";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

export const HookView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList, loading } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const hookList = currentSelectDetail?.hook || [];

  const hasHook = hookList.length > 0;

  const isLoading = !currentSelectDetail && loading;

  const render = useCallbackRef((index: number) => {
    const node = hookList[index];
    return (
      <Fragment key={index}>
        <div className="flex items-start">
          <div className="flex ml-4 items-center">
            <Chip size="sm" radius="none" className=" rounded-sm mr-1 text-[8px] w-[12px] h-[12px]">
              {index + 1}
            </Chip>
            <div className="text-[12px] text-gray-500">{node.name}</div>
          </div>
          {node.value && <JsonView src={node.value} className="ml-1" theme="github" collapsed={true} />}
        </div>
      </Fragment>
    );
  });

  if (isLoading) {
    return (
      <div className="p-2">
        <div className="w-full h-[100px]">
          <Skeleton className="w-full" />
        </div>
      </div>
    );
  }

  if (hasHook) {
    return (
      <div className="p-2">
        <div>hooks</div>
        <Spacer y={1} />
        <div className="w-full h-[200px]">
          <Virtuoso overscan={20} totalCount={hookList.length} itemContent={render} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
