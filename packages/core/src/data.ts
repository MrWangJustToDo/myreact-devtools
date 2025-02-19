// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KnownType = {
  Object: true,
  Error: true,
  WeakMap: true,
  WeakSet: true,
  Array: true,
  Iterable: true,
  Map: true,
  Set: true,
  String: true,
  Number: true,
  Boolean: true,
  Date: true,
  Null: true,
  Undefined: true,
  Function: true,
  Symbol: true,
  Promise: true,
  RegExp: true,
  Element: true,
  ReadError: true,
};

export type NodeValue = {
  // id
  i: number;
  // type
  t: keyof typeof KnownType;
  // value
  v: any;
  // expandable
  e: boolean;
  // loaded
  l?: boolean;
  // cache
  c?: boolean;
  // name
  n?: string;
};

const isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

const emptyConstructor = {}.constructor;

let id = 1;

let loadById = false;

const idToValueMap = new Map<number, any>();

const valueToIdMap = new Map<any, number>();

let cacheMap = new WeakMap<any, NodeValue>();

const getType = (value: any): NodeValue["t"] => {
  if (isInBrowser && value && value instanceof Element) {
    return "Element";
  }

  const type = Object.prototype.toString.call(value).slice(8, -1);

  if (type === "Object" && typeof value[Symbol.iterator] === "function") {
    return "Iterable";
  }

  if (type === "Custom" && value.constructor !== Object && value instanceof Object) {
    // For projects implementing objects overriding `.prototype[Symbol.toStringTag]`
    return "Object";
  }

  return type;
};

const isObject = (value: NodeValue["t"]) => {
  return (
    value === "Object" ||
    // value === "Error" ||
    // value === "WeakMap" ||
    // value === "WeakSet" ||
    value === "Array" ||
    value === "Iterable" ||
    value === "Map" ||
    // value === "Promise" ||
    value === "Set"
  );
};

const getTargetNode = (value: any, type: NodeValue["t"], deep = 3): NodeValue => {
  const existId = valueToIdMap.get(value);

  const currentId = existId || id++;

  idToValueMap.set(currentId, value);

  valueToIdMap.set(value, currentId);
  // full deep to load
  if (deep === 0) {
    return {
      i: currentId,
      t: type,
      v: undefined,
      e: true,
      l: false,
    };
  } else {
    if (type === "Array") {
      return {
        i: currentId,
        t: type,
        v: value.map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Iterable") {
      return {
        i: currentId,
        t: type,
        v: Array.from(value).map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Map") {
      return {
        i: currentId,
        t: type,
        v: Array.from((value as Map<any, any>).entries()).map(([key, val]) => ({
          t: "Array",
          e: true,
          v: [getNode(key, deep - 1), getNode(val, deep - 1)],
        })),
        e: true,
      };
    } else if (type === "Set") {
      return {
        i: currentId,
        t: type,
        v: Array.from(value).map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Object") {
      if (typeof value?.constructor === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
        return {
          i: currentId,
          t: type,
          n: value.constructor.name,
          v: Object.keys(value).reduce((acc, key) => {
            acc[key] = getNode(value[key], deep - 1);
            return acc;
          }, {}),
          e: true,
        };
      }
      return {
        i: currentId,
        t: type,
        v: Object.keys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
      };
    }
  }
};

const getNodeWithCache = (value: any, type: NodeValue["t"], deep = 3): NodeValue => {
  if (loadById) {
    const cache = cacheMap.get(value);
    if (cache) {
      return {
        ...cache,
        c: true,
      };
    }
  }

  const v = getTargetNode(value, type, deep);

  if (v?.l === false) {
    return v;
  }

  cacheMap.set(value, v);

  return v;
};

export const getNode = (value: any, deep = 3): NodeValue => {
  try {
    const type = getType(value);

    const expandable = isObject(type);

    if (expandable) {
      // full deep to load
      return getNodeWithCache(value, type, deep);
    } else {
      const existId = valueToIdMap.get(value);

      const currentId = existId || id++;

      idToValueMap.set(currentId, value);

      valueToIdMap.set(value, currentId);

      if (type === "Element") {
        return {
          i: currentId,
          t: type,
          v: `<${value.tagName.toLowerCase()} />`,
          e: expandable,
        };
      }
      if (type === "Error") {
        return {
          i: currentId,
          t: type,
          v: value.message,
          e: expandable,
        };
      }
      if (typeof value === "object" && value !== null) {
        return {
          i: currentId,
          t: type,
          v: Object.prototype.toString.call(value),
          e: expandable,
        };
      } else {
        return {
          i: currentId,
          t: type,
          v: String(value),
          e: expandable,
        };
      }
    }
  } catch (e) {
    return {
      i: NaN,
      t: "ReadError",
      v: "Read data error: " + e.message,
      e: false,
    };
  }
};

export const getNodeForce = (value: any, deep = 3): NodeValue => {
  cacheMap = new WeakMap();

  return getNode(value, deep);
};

export const getNodeFromId = (id: number) => {
  const value = idToValueMap.get(id);
  if (value) {
    loadById = true;
    const res = getNode(value);
    loadById = false;
    return res;
  }
};

export const getValueById = (id: number) => {
  if (id && !Number.isNaN(id)) {
    return { v: idToValueMap.get(id), f: true };
  } else {
    return { v: undefined, f: false };
  }
};
