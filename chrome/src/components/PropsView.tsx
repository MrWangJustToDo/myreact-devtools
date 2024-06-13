import { Skeleton, Spacer } from "@nextui-org/react";
import { Fragment } from "react";
import { Virtuoso } from "react-virtuoso";
import JsonView from "react18-json-view";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";


export const PropsView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList, loading } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const isLoading = !currentSelectDetail && loading;

  const propsKey = Object.keys(currentSelectDetail?.props || {});

  const hasProps = propsKey.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKey[index];
    return (
      <Fragment key={index}>
        <div className="flex items-start">
          <div className="flex ml-4 items-center">
            <div className="text-[12px] text-gray-500">{key}</div>
          </div>
          <JsonView src={currentSelectDetail?.props?.[key]} className="ml-1" collapsed displaySize enableClipboard={false} theme="github" editable={false} />
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

  if (hasProps) {
    return (
      <div className="p-2">
        <div>props</div>
        <Spacer y={1} />
        <div className="w-full h-[200px]">
          <Virtuoso overscan={20} totalCount={propsKey.length} itemContent={render} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
