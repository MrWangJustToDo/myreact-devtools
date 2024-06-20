import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";

export const NodeView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList, loading } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select?.id);

  const isLoading = !currentSelectDetail && loading;

  if (isLoading) {
    return (
      <div className="node-view h-full border rounded-md border-gray-200 group overflow-auto flex items-center justify-center">
        <div>loading ...</div>
      </div>
    );
  }

  return (
    <div className="node-view h-full border rounded-md border-gray-200 group overflow-auto">
      <NameView />
      <PropsView />
      <HookView />
      <RenderView />
      <SourceView />
    </div>
  );
};
