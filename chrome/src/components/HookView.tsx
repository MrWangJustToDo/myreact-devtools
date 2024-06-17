import { Divider, Skeleton, Spacer } from "@nextui-org/react";
import { getBase16Theme } from "react-base16-styling";
import { JSONTree } from "react-json-tree";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

export const theme = getBase16Theme("google:inverted");

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
      <div className="text-[11px] ml-2 font-mono tree-wrapper" key={index}>
        <JSONTree
          data={node.value}
          theme={theme}
          keyPath={[node.name]}
          shouldExpandNodeInitially={() => false}
          isCustomNode={(v: any) => v?.type === "nativeNode"}
          valueRenderer={(_v: any, v: any) => {
            if (v?.type === "nativeNode") {
              return <span className="text-[#f15950]">{v.value}</span>;
            }
            return _v;
          }}
        />
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

  if (hasHook) {
    return (
      <div className="p-2">
        <div>hooks</div>
        <Spacer y={1} />
        <div className="w-full">
          {hookList.map((_, index) => render(index))}
          {/* <Virtuoso key={currentSelectDetail?.id} overscan={20} totalCount={hookList.length} itemContent={render} /> */}
        </div>
        <Divider />
      </div>
    );
  } else {
    return null;
  }
};
