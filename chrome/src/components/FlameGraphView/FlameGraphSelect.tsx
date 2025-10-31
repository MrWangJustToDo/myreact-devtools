import { useEffect } from "react";

import { useSelectNode } from "@/hooks/useSelectNode";

export const FlameGraphSelect = () => {
  const select = useSelectNode((s) => s.select);

  useEffect(() => {
    if (select) {
      useSelectNode.getActions().scrollIntoView();
    }
  }, [select]);

  return (
    <style jsx global>{`
      #flameGraph-node-${select} {
        opacity: 1;
      }
    `}</style>
  );
};
