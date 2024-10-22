import { Divider, Spacer } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useDetailNode } from "@/hooks/useDetailNode";
import { useJsonTheme } from "@/hooks/useJsonTheme";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";
import { getText } from "@/utils/treeValue";

export const HookView = () => {
  const select = useTreeNode((s) => s.select);

  const theme = useJsonTheme();

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.id === select);

  const hookList = currentSelectDetail?.hook || [];

  const hasHook = hookList.length > 0;

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  const render = useCallbackRef((index: number) => {
    const node = hookList[index];
    return (
      <div className={`${sizeClass} ml-2 font-mono tree-wrapper`} key={index}>
        <JSONTree
          data={node.value}
          theme={{
            extend: theme,
            arrowContainer: ({ style }, arrowStyle) => ({ style: { ...style, width: "1.125em", paddingRight: arrowStyle === "double" ? "1em" : "0.5em" } }),
            tree: { marginLeft: 0 },
          }}
          keyPath={[node.name]}
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
