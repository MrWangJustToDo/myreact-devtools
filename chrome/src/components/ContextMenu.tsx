import { AnimatePresence, motion } from "framer-motion";
import { Bug, Eye, Package } from "lucide-react";
import { memo } from "react";

import { useContextMenu } from "@/hooks/useContextMenu";

const { close: contextMenuClose, setStore, setSource } = useContextMenu.getActions();

export const ContextMenu = memo(() => {
  const { state, position, type } = useContextMenu((s) => s);

  return (
    <>
      <div
        data-context-cover
        className="fixed w-screen h-screen top-0 left-0"
        onContextMenu={(e) => {
          e.preventDefault();
          contextMenuClose();
        }}
        style={{ display: state ? "block" : "none" }}
        onClick={contextMenuClose}
      />
      <div data-context-content className={`fixed z-10 font-sans`} style={{ top: position.y + 4, left: position.x + 4 }}>
        <AnimatePresence initial={false} mode="wait">
          {state && (
            <motion.div
              key="context-menu"
              className="context-menu font-sm bg-content1 border rounded shadow-md py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="context-menu-item px-2 cursor-pointer select-none flex justify-center items-center node-item-hover"
                onClick={async () => {
                  setStore();
                  await new Promise((r) => setTimeout(r, 100));
                  contextMenuClose();
                }}
              >
                <Package className="mr-2 w-[1em]" />
                <span className="flex-grow">Store as global variable</span>
              </div>
              {(type === "Function" || type === "Element") && (
                <div
                  className="context-menu-item px-2 cursor-pointer select-none flex justify-center items-center node-item-hover"
                  onClick={async () => {
                    setSource();
                    await new Promise((r) => setTimeout(r, 100));
                    contextMenuClose();
                  }}
                >
                  {type === "Function" && (
                    <>
                      <Bug className="mr-2 w-[1em]" />
                      <span className="flex-grow">Inspect Function source</span>
                    </>
                  )}
                  {type === "Element" && (
                    <>
                      <Eye className="mr-2 w-[1em]" />
                      <span className="flex-grow">Inspect Element node</span>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
});

ContextMenu.displayName = "ContextMenu";
