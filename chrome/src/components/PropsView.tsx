import { Spacer } from "@nextui-org/react";
import JsonView from "react18-json-view";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

export const PropsView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  if (!currentSelectDetail) return null;

  return (
    <div className="p-2">
      <div>props</div>
      <Spacer y={1} />
      <div className="w-full h-[200px] overflow-auto">
        <JsonView src={currentSelectDetail?.props} className="ml-1" theme="github" collapsed={true} />
      </div>
    </div>
  );
};
