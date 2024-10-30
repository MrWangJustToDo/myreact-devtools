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
};

export type NodeValue = {
  // id
  i?: number;
  // type
  t: keyof typeof KnownType;
  // deep
  d: number;
  // value
  v: any;
  // expandable
  e: boolean;
  // loaded
  l?: boolean;
  // name
  n?: string;
};

const isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

const emptyConstructor = {}.constructor;

let id = 1;

const valueMap = new Map<number, any>();

const deepMap = new Map<number, number>();

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
    value === "Error" ||
    value === "WeakMap" ||
    value === "WeakSet" ||
    value === "Array" ||
    value === "Iterable" ||
    value === "Map" ||
    value === "Promise" ||
    value === "Set"
  );
};

export const getNode = (value: any, parentDeep: number, deep = 3): NodeValue => {
  const type = getType(value);

  const expandable = isObject(type);

  if (expandable) {
    // full deep to load
    if (deep === 0) {
      const currentId = id++;
      valueMap.set(currentId, value);
      deepMap.set(currentId, parentDeep);
      return {
        i: currentId,
        t: type,
        d: parentDeep + 1,
        v: undefined,
        e: expandable,
        l: false,
      };
    } else {
      if (type === "Array") {
        return {
          t: type,
          d: parentDeep + 1,
          v: value.map((val: any) => getNode(val, parentDeep + 1, deep - 1)),
          e: expandable,
        };
      } else if (type === "Iterable") {
        return {
          t: type,
          d: parentDeep + 1,
          v: Array.from(value).map((val: any) => getNode(val, parentDeep + 1, deep - 1)),
          e: expandable,
        };
      } else if (type === "Error") {
        return {
          t: type,
          d: parentDeep + 1,
          v: value.message,
          e: false,
        };
      } else if (type === "Map") {
        return {
          t: type,
          d: parentDeep + 1,
          v: Array.from(value).map(([key, val]) => ({
            k: getNode(key, parentDeep + 1, deep - 1),
            v: getNode(val, parentDeep + 1, deep - 1),
          })),
          e: expandable,
        };
      } else if (type === "Set") {
        return {
          t: type,
          d: parentDeep + 1,
          v: Array.from(value).map((val: any) => getNode(val, parentDeep + 1, deep - 1)),
          e: expandable,
        };
      } else if (type === "Object") {
        if (typeof value?.constructor === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
          return {
            t: type,
            d: parentDeep + 1,
            n: value.constructor.name,
            v: Object.keys(value).reduce((acc, key) => {
              acc[key] = getNode(value[key], parentDeep + 1, deep - 1);
              return acc;
            }, {}),
            e: expandable,
          };
        }
        return {
          t: type,
          d: parentDeep + 1,
          v: Object.keys(value).reduce((acc, key) => {
            acc[key] = getNode(value[key], parentDeep + 1, deep - 1);
            return acc;
          }, {}),
          e: expandable,
        };
      } else if (type === "Promise") {
        // TODO
        return {
          t: type,
          d: parentDeep + 1,
          v: "Promise",
          e: false,
        };
      } else {
        return {
          t: type,
          d: parentDeep + 1,
          v: "WeakObject",
          e: false,
        };
      }
    }
  } else {
    return {
      t: type,
      d: parentDeep + 1,
      v: type === "Element" ? `<${value.tagName.toLowerCase()} />` : String(value),
      e: expandable,
    };
  }
};

export const getNodeFromId = (id: number) => {
  const value = valueMap.get(id);
  const deep = deepMap.get(id);
  if (value) {
    return getNode(value, deep);
  }
};
