import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import type { ReactNode } from "react";

export const Layout = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
  return (
    <PanelGroup direction="horizontal">
      <Panel minSize={10} defaultSize={50}>
        {left}
      </Panel>
      <PanelResizeHandle style={{ overflow: "clip" }}>
        <div className="w-2 h-full">
          <div className=" sticky h-[96vh] w-full rounded-sm bg-[rgba(100,100,100,0.1)] transition-background hover:bg-[rgba(100,100,100,0.2)] active:bg-[rgba(100,100,100,0.3)] top-[10px] z-10" />
        </div>
      </PanelResizeHandle>
      <Panel minSize={20} style={{ overflow: "clip" }}>
        {right}
      </Panel>
    </PanelGroup>
  );
};
