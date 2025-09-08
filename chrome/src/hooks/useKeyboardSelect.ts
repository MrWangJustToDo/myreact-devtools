import { useEffect, useRef } from "react";

import { useAppTree } from "./useAppTree";
import { useSelectNode } from "./useSelectNode";

export const useKeyboardSelect = () => {
  const nextRef = useRef<string>();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const select = useSelectNode.getReadonlyState().select;

      if (!select) return null;

      if (e.key === "ArrowDown") {
        const list = useAppTree.getReadonlyState().list;

        const index = list.findIndex((i) => i.i === select);

        if (index !== -1 && index < list.length - 1) {
          nextRef.current = list[index + 1].i;

          e.preventDefault();

          e.stopPropagation();
        }

        return false;
      } else if (e.key === "ArrowUp") {
        const list = useAppTree.getReadonlyState().list;

        const index = list.findIndex((i) => i.i === select);

        if (index > 0) {
          nextRef.current = list[index - 1].i;

          e.preventDefault();

          e.stopPropagation();
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
