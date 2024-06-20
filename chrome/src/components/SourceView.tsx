import { Spacer } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

export const SourceView = () => {
  const select = useTreeNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const renderSource = currentSelectDetail?.["source"];

  if (renderSource?.fileName) {
    return (
      <div className="p-2">
        <div>source</div>
        <Spacer y={1} />
        <div className="w-full">
          <div className="text-[11px] ml-2 font-mono">
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
