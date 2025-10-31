import { useDetailMode } from "@/hooks/useDetailMode";

import { FlameGraphView } from "../FlameGraphView";
import { NodeView } from "../NodeView";

export const DetailView = () => {
  const mode = useDetailMode((s) => s.mode);

  return (
    <div className="detail-view h-full transform-gpu p-1">
      {mode === "node" && <NodeView />}
      {mode === "flameGraph" && <FlameGraphView />}
    </div>
  );
};
