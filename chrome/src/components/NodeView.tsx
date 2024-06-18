import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";

export const NodeView = () => {
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
