import { Divider } from "@nextui-org/react";

import { HookView } from "./HookView";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { StackView } from "./StackView";

export const NodeView = () => {
  return (
    <div className="node-view h-full border rounded-md border-gray-200 group">
      <StackView splitNode={<Divider />}>
        <NameView />
        <PropsView />
        <HookView />
        <RenderView />
      </StackView>
    </div>
  );
};
