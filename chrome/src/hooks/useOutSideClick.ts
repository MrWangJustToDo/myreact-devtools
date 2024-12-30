import { useEffect, type RefObject } from "react";

import { useCallbackRef } from "./useCallbackRef";

export const useOutSideClick = (ref: RefObject<HTMLElement>, callback: (e: MouseEvent | TouchEvent) => void) => {
  const memoCallback = useCallbackRef(callback);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        memoCallback(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [memoCallback, ref]);
};
