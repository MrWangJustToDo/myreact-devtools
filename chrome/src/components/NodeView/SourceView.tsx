import { Spacer } from "@heroui/react";
import { useCallback } from "react";

import type { PlainNode } from "@my-react-devtool/core";

export const SourceView = ({ node }: { node?: PlainNode }) => {
  const currentSelectDetail = node;

  const renderSource = currentSelectDetail?.["_s"];

  const handleOpenSource = useCallback(() => {
    if (!renderSource?.value) return;

    // Log to the inspected page's console - the source location will be clickable there
    // This works because Chrome's console has source-map integration that openResource lacks
    if (typeof chrome !== "undefined" && chrome?.devtools?.inspectedWindow?.eval) {
      // Use eval to log in the inspected page's console context
      // The browser will automatically make the source location clickable
      const sourceValue = renderSource.value.replace(/'/g, "\\'");
      chrome.devtools.inspectedWindow.eval(`console.log('${sourceValue}')`);
    } else {
      // Fallback for non-extension context
      console.log(renderSource.value);
    }
  }, [renderSource?.value]);

  if (renderSource?.value) {
    return (
      <div className="node-source p-2 pb-0">
        <div>source</div>
        <Spacer y={1} />
        <div className="w-full font-code font-sm">
          <div
            className="ml-2 px-[2px] text-blue-500 hover:text-blue-700 cursor-pointer hover:underline"
            onClick={handleOpenSource}
            title="Click to open source location"
          >
            {renderSource.value}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
