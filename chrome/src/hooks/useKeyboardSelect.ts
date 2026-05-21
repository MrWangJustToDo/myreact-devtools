import { useEffect, useRef } from "react";

import { getTreeElementAtIndex, getTreeIndexOfElement } from "./useAppTree";
import { useSelectNode } from "./useSelectNode";

export const useKeyboardSelect = () => {
  const nextRef = useRef<string>();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const select = useSelectNode.getReadonlyState().select;

      if (!select) return null;

      if (e.key === "ArrowDown") {
        const index = getTreeIndexOfElement(select);

        if (index !== -1) {
          const next = getTreeElementAtIndex(index + 1);
          if (next) {
            nextRef.current = next.i;
            e.preventDefault();
            e.stopPropagation();
          }
        }

        return false;
      } else if (e.key === "ArrowUp") {
        const index = getTreeIndexOfElement(select);

        if (index > 0) {
          const prev = getTreeElementAtIndex(index - 1);
          if (prev) {
            nextRef.current = prev.i;
            e.preventDefault();
            e.stopPropagation();
          }
        }

        return false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (nextRef.current) {
          useSelectNode.getActions().setSelect(nextRef.current);

          useSelectNode.getActions().scrollIntoView();

          nextRef.current = undefined;

          e.preventDefault();

          e.stopPropagation();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);
};
