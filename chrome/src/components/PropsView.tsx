import { Skeleton, Spacer } from "@nextui-org/react";
import { Fragment, lazy } from "react";
import { Virtuoso } from "react-virtuoso";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

const LazyJsonView = lazy(() => import("@microlink/react-json-view"));

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
        <div className="flex items-center text-[11px]">
          <LazyJsonView
            src={currentSelectDetail?.props?.[key]}
            name={<span className="text-[11px] text-gray-500">{key}</span>}
            indentWidth={2}
            collapsed
            displayObjectSize
            enableClipboard={false}
            iconStyle="triangle"
            quotesOnKeys={false}
            displayDataTypes={false}
          />
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
          <Virtuoso key={currentSelectDetail?.id} overscan={20} totalCount={propsKey.length} itemContent={render} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
