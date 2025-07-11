import { useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

import { useCallbackRef } from "@/hooks/useCallbackRef";

import type { RefObject } from "react";

export const AutoHeight = ({
  children,
  onHeightChange,
  onAttachRef,
}: {
  children: React.ReactNode;
  onHeightChange?: (h: number) => void;
  onAttachRef?: (ref: RefObject<HTMLDivElement>) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const memoOnHeightChange = useCallbackRef(onHeightChange);

  const memoOnAttachRef = useCallbackRef(onAttachRef);

  useIsomorphicLayoutEffect(() => {
    const callback = () => {
      if (ref.current) {
        const height = ref.current.clientHeight;
        memoOnHeightChange(height);
      }
    };

    const instance = new ResizeObserver(callback);

    callback();

    memoOnAttachRef(ref);

    if (ref.current) {
      instance.observe(ref.current);
    }

    return () => {
      instance.disconnect();
    };
  }, []);

  return (
    <div data-auto-height-wrapper ref={ref}>
      {children}
    </div>
  );
};
