import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useIsMounted } from "@/hooks/useIsMounted";

import type { ReactNode } from "react";

const isLegacyBrowser = () => {
  if (typeof window !== "undefined") {
    if (navigator?.userAgent?.includes?.("Firefox")) {
      return true;
    }
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      return !CSS.supports("overflow", "clip");
    }
  }
  return true;
};

export const Layout = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
  const isMounted = useIsMounted();

  // https://github.com/brimdata/react-arborist/issues/230
  if (!isMounted) return null;

  if (isLegacyBrowser()) {
    return (
      <div className="flex gap-x-2">
        <div className="w-[300px]">{left}</div>
        <div>
          <div>
            <div />
          </div>
        </div>
        <div style={{ width: "calc(100% - 270px)" }}>{right}</div>
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal" style={{ overflow: "clip" }}>
      <Panel minSize={10} defaultSize={50} style={{ overflow: "clip" }}>
        {left}
      </Panel>
      <PanelResizeHandle style={{ overflow: "clip" }}>
        <div className="mx-1 w-2 h-full">
          <div className=" sticky h-[96vh] w-full rounded-sm bg-[rgba(100,100,100,0.1)] transition-background hover:bg-[rgba(100,100,100,0.2)] active:bg-[rgba(100,100,100,0.3)] top-[10px] z-10" />
        </div>
      </PanelResizeHandle>
      <Panel minSize={20} style={{ overflow: "clip" }}>
        {right}
      </Panel>
    </PanelGroup>
  );
};
