import { Divider, Skeleton, Spacer } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";
// import { Virtuoso } from "react-virtuoso";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

import { theme } from "./HookView";

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
      <div className="text-[11px] ml-2 font-mono tree-wrapper" key={index}>
        <JSONTree data={currentSelectDetail?.props?.[key]} theme={theme} keyPath={[key]} shouldExpandNodeInitially={() => false} />
      </div>
    );
  });

  if (isLoading) {
    return (
      <div className="p-2">
        <div className="w-full h-[100px]">
          <Skeleton className="w-full" />
        </div>
        <Divider />
      </div>
    );
  }

  if (hasProps) {
    return (
      <div className="p-2">
        <div>props</div>
        <Spacer y={1} />
        <div className="w-full">
          {propsKey.map((key, index) => render(index))}
          {/* <Virtuoso key={currentSelectDetail?.id} overscan={20} totalCount={propsKey.length} itemContent={render} /> */}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
