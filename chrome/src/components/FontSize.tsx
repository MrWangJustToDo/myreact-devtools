import { memo } from "react";

import { UISize, useUISize } from "@/hooks/useUISize";

export const FontSize = memo(() => {
  const state = useUISize((s) => s.state);

  const size = state === UISize.sm ? "13px" : state === UISize.md ? "14.5px" : "16px";

  const lgSize = state === UISize.sm ? "15px" : state === UISize.md ? "17.5px" : "20px";

  const smSize = state === UISize.sm ? "12px" : state === UISize.md ? "13.5px" : "15px";

  const ssmSize = state === UISize.sm ? "11px" : state === UISize.md ? "12.5px" : "14px";

  return (
    <style jsx global>{`
      html {
        font-size: ${size};
      }

      .font-lg {
        font-size: ${lgSize};
      }
      
      .font-sm {
        font-size: ${smSize};
      }

      .font-ssm {
        font-size: ${ssmSize};
      }
    `}</style>
  );
});

FontSize.displayName = "FontSize";
