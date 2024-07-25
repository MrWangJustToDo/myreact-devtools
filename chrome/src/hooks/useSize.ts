import { useIsomorphicLayoutEffect } from "framer-motion";
import { useRef, type RefObject } from "react";

import { useDebouncedState } from "./useDebouncedState";

const temp: any[] = [];

export type DOMRectType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

const INITIAL_RECT: DOMRectType = {
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  x: 0,
  y: 0,
};

export function useDomSize({
  ref,
  cssSelector,
  getEle,
  deps,
}: {
  ref?: RefObject<HTMLElement> | null;
  cssSelector?: string;
  getEle?: () => HTMLElement;
  deps?: any[];
}): DOMRectType {
  const getEleRef = useRef(getEle);

  getEleRef.current = getEle;

  const [rect, setRect] = useDebouncedState<DOMRectType>(INITIAL_RECT, 100);

  useIsomorphicLayoutEffect(() => {
    const domElement = ref ? ref.current : cssSelector ? document.querySelector(cssSelector) : getEleRef.current?.() || null;
    if (domElement) {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
          setRect(domElement.getBoundingClientRect());
        });

        resizeObserver.observe(domElement);

        return () => resizeObserver.disconnect();
      } else {
        const handleResize = () => setRect(domElement.getBoundingClientRect());

        handleResize();

        window.addEventListener("resize", handleResize, { passive: true });

        return () => window.removeEventListener("resize", handleResize);
      }
    }
  }, [ref, cssSelector, setRect, ...(deps || temp)]);

  return rect;
}