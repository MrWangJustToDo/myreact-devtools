import { Spinner } from "@heroui/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useSelectNode } from "@/hooks/useSelectNode";

import { ContextMenu } from "./ContextMenu";
import { ExtendView } from "./ExtendView";
import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";
import { StateView } from "./StateView";

import type { PlainNode } from "@my-react-devtool/core";

export const NodeView = () => {
  const select = useSelectNode.useShallowStableSelector((s) => s.select);

  const { loading, node: _node } = useDetailNode.useShallowSelector((s) => ({ node: s.nodes?.find((i) => i.i === select), loading: s.loading }));

  const isLoading = loading;

  const node = _node as PlainNode;

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
        <NameView key={select} node={node} />
        <PropsView key={select} node={node} />
        <StateView key={select} node={node} />
        <HookView key={select} node={node} />
        <ExtendView key={select} />
        <RenderView key={select} node={node} />
        <SourceView key={select} node={node} />
        <ContextMenu key={select} />
      </div>
    </div>
  );
};
