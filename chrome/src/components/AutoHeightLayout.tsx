import { Allotment } from "allotment";
import { useCallback, useRef } from "react";

import { AutoHeight } from "./AutoHeight";

import type { ReactNode, RefObject } from "react";

export const AutoHeightLayout = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const elementRefS = useRef<Array<RefObject<HTMLDivElement>>>();

  const onAutoUpdateHeight = () => {
    if (ref.current) {
      const maxHeight = Math.max(...(elementRefS.current?.map((i) => i.current?.clientHeight || 0) || []));
      ref.current.style.height = `${maxHeight + 2}px`;
    }
  };

  const onCreateRef = useCallback((ref: RefObject<HTMLDivElement>) => {
    if (!elementRefS.current) {
      elementRefS.current = [];
    }
    elementRefS.current.push(ref);
  }, []);

  return (
    <div ref={ref}>
      <Allotment>
        <AutoHeight onHeightChange={onAutoUpdateHeight} onAttachRef={onCreateRef}>
          {left}
        </AutoHeight>
        <AutoHeight onHeightChange={onAutoUpdateHeight} onAttachRef={onCreateRef}>
          {right}
        </AutoHeight>
      </Allotment>
    </div>
  );
};
