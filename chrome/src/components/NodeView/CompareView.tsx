import { InternalHookView } from "./HookView";
import { PropsView } from "./PropsView";
import { StateView } from "./StateView";

import type { PlainNode } from "@my-react-devtool/core";

export const CompareView = ({ node }: { node?: PlainNode }) => {
  return (
    <div className="group h-full overflow-auto w-[50%]">
      <PropsView key={node?.i} node={node} editable={false} />
      <StateView key={node?.i} node={node} editable={false} />
      <InternalHookView mode="horizontal" key={node?.i} node={node} editable={false} />
    </div>
  );
};
