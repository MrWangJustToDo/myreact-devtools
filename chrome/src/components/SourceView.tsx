import { Spacer } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";
import { useUISize } from "@/hooks/useUISize";

export const SourceView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const currentSelectDetail = nodeList.find((i) => i.id === select);

  const renderSource = currentSelectDetail?.["source"];

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  if (renderSource?.fileName) {
    return (
      <div className="p-2">
        <div>source</div>
        <Spacer y={1} />
        <div className="w-full">
          <div className={`${sizeClass} ml-2 font-mono px-[2px] text-gray-600`}>
            {renderSource?.fileName +
              `${renderSource?.lineNumber ? ":" + renderSource?.lineNumber : ""}` +
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              `${renderSource?.columnNumber ? ":" + renderSource?.columnNumber : ""}`}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
