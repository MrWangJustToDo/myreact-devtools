import { Spacer } from "@heroui/react";

import type { PlainNode } from "@my-react-devtool/core";

export const SourceView = ({ node }: { node?: PlainNode }) => {
  const currentSelectDetail = node;

  const renderSource = currentSelectDetail?.["_s"];

  if (renderSource?.value) {
    return (
      <div className="node-source p-2 pb-0">
        <div>source</div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">
          <div className={`ml-2 px-[2px] text-gray-600`}>{renderSource.value}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
