import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T, needSet: (v?: T) => boolean): T | undefined => {
  const ref = useRef<T>(value);

  useEffect(() => {
    if (needSet(value)) {
      ref.current = value;
    }
  }, [needSet, value]);

  return ref.current;
};