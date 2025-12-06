import { ControlHookView } from "./HookView";
import { ControlPropsView } from "./PropsView";
import { ControlStateView } from "./StateView";

import type { PlainNode } from "@my-react-devtool/core";

export const CompareView = ({ node }: { node?: PlainNode }) => {
  return (
    <div className="group h-full overflow-auto w-[50%]">
      <ControlPropsView key={node?.i} node={node} />
      <ControlStateView key={node?.i} node={node} />
      <ControlHookView key={node?.i} node={node} />
    </div>
  );
};
