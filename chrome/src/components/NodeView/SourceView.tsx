import { Spacer } from "@heroui/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

export const SourceView = () => {
  const select = useSelectNode((s) => s.select);

  const nodeList = useDetailNode((s) => s.nodes);

  const currentSelectDetail = nodeList.find((i) => i.i === select);

  const renderSource = currentSelectDetail?.["_s"];

  if (renderSource?.value) {
    return (
      <div className="node-source p-2 pb-0">
        <div>source</div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">
          <div
            className={`ml-2 px-[2px] text-gray-600`}
          >
            {renderSource.value}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
