import type { MyReactElement } from "@my-react/react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const safeClone = (obj: Object) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return (e as Error).message;
  }
};

export const safeCloneRef = (ref: MyReactElement['ref']) => {
  if (ref) {
    if (typeof ref === 'function') {
      return ref.toString();
    } else {
      return safeClone(ref);
    }
  } else {
    return null;
  }
}
