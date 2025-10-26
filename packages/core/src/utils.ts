/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export const debounce = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    clearTimeout(id);
    id = setTimeout(() => {
      callback.call(null, ...args);
    }, time || 40);
  }) as unknown as T;
};

export const throttle = <T extends Function>(callback: T, time?: number): T => {
  let id = null;
  return ((...args) => {
    if (id) return;
    id = setTimeout(() => {
      callback.call(null, ...args);
      id = null;
    }, time || 40);
  }) as unknown as T;
};
