import { Spinner } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";

import { ContextMenu } from "./ContextMenu";
import { ExtendView } from "./ExtendView";
import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";
import { StateView } from "./StateView";

export const NodeView = () => {

  const { loading } = useDetailNode.useShallowStableSelector((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="node-view h-full p-1 flex items-center justify-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="node-view h-full p-1">
      <div className="group h-full overflow-auto">
        <NameView />
        <PropsView />
        <StateView />
        <HookView />
        <ExtendView />
        <RenderView />
        <SourceView />
        <ContextMenu />
      </div>
    </div>
  );
};
