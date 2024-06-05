import { Virtuoso } from "react-virtuoso";

import { useCallbackRef } from "@/hooks/useCallbackRef";
import { useTreeNode } from "@/hooks/useTreeNode";

export const RenderView = () => {
  const select = useTreeNode((s) => s.select);

  const plainNode = select?.current;

  const render = useCallbackRef((index: number) => {
    const item = plainNode!["renderTree"][index];
    return (
      <div key={index} className="flex items-center ml-4">
        <div className="text-[12px] text-gray-500">{item.name}</div>
      </div>
    );
  });

  if (plainNode) {
    return (
      <div className="p-2">
        <div>renders</div>
        <div className="w-full h-[300px]">
          <Virtuoso overscan={20} totalCount={plainNode["renderTree"]?.length} itemContent={render} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
