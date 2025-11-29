import { Spinner } from "@heroui/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { ContextMenu } from "./ContextMenu";
import { ExtendView } from "./ExtendView";
import { HookCompare } from "./HookCompare";
import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";
import { StateView } from "./StateView";

export const NodeView = () => {
  const { loading } = useDetailNode.useShallowStableSelector((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const select = useSelectNode.useShallowStableSelector((s) => s.select);

  const isLoading = loading;

  if (isLoading) {
    return (
      <div className="node-view h-full flex items-center justify-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="node-view h-full">
      <div className="group h-full overflow-auto">
        <NameView key={select} />
        <PropsView key={select} />
        <StateView key={select} />
        <HookView key={select} />
        <ExtendView key={select} />
        <RenderView key={select} />
        <SourceView key={select} />
        <ContextMenu key={select} />
      </div>
      <HookCompare />
    </div>
  );
};
