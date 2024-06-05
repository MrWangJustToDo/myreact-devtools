import { Divider } from "@nextui-org/react";

import { HookView } from "./HookView";
import { RenderView } from "./RenderView";
import { StackView } from "./StackView";

export const NodeView = () => {
  return (
    <div className="node-view h-full border rounded-md border-gray-200 group">
      <StackView splitNode={<Divider />}>
        <HookView />
        <RenderView />
      </StackView>
    </div>
  );
};
