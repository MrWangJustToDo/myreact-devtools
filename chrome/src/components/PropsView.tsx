import { Divider, Spacer } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";
// import { Virtuoso } from "react-virtuoso";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { getText } from "@/utils/treeValue";

import { theme } from "./HookView";

export const PropsView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const propsKey = Object.keys(currentSelectDetail?.props || {});

  const hasProps = propsKey.length > 0;

  const render = useCallbackRef((index: number) => {
    const key = propsKey[index];
    return (
      <div className="text-[11px] ml-2 font-mono tree-wrapper" key={index}>
        <JSONTree
          data={currentSelectDetail?.props?.[key]}
          theme={theme}
          keyPath={[key]}
          shouldExpandNodeInitially={() => false}
          isCustomNode={(v: any) => v?.type === "nativeNode"}
          getItemString={(nodeType, data, itemType, itemString) => {
            return (
              <span>
                {getText(nodeType, data)} {itemString}
              </span>
            );
          }}
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
