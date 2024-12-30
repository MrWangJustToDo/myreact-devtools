import { Pencil2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import { useContextMenu } from "@/hooks/useContextMenu";
import { useUISize } from "@/hooks/useUISize";

const contextMenuClose = useContextMenu.getActions().close;

export const ContextMenu = memo(() => {
  const { state, position } = useContextMenu((s) => s);

  const size = useUISize.useShallowStableSelector((s) => s.state);

  const sizeClass = size === "sm" ? "text-[11px]" : size === "md" ? "text-[12px]" : "text-[13px]";

  return (
    <>
      <div
        className="fixed w-screen h-screen top-0 left-0"
        onContextMenu={(e) => {
          e.preventDefault();
          contextMenuClose();
        }}
        style={{ display: state ? "block" : "none" }}
        onClick={contextMenuClose}
      />
      <div className={`fixed z-10 ${sizeClass}`} style={{ top: position.y + 4, left: position.x + 4 }}>
        <AnimatePresence initial={false} mode="wait">
          {state && (
            <motion.div
              key="context-menu"
              className="context-menu bg-white border border-gray-200 rounded shadow-md py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="context-menu-item px-3 py-1 cursor-pointer select-none flex justify-center items-center node-item-hover">
                <Pencil2Icon className="mr-2" />
                <span>Store as global variable</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
});

ContextMenu.displayName = "ContextMenu";
