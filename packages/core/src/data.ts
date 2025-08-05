import { getElementName, isValidElement } from "./utils";

import type { PromiseWithState } from "@my-react/react-reconciler";

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
  AsyncFunction: true,
  GeneratorFunction: true,
  Symbol: true,
  Promise: true,
  RegExp: true,
  Element: true,
  ReadError: true,
  ReactElement: true,
  Module: true,
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
  // name
  n?: string;

  // extend props;
  [p: string]: any;
};

const isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

const emptyConstructor = {}.constructor;

let id = 1;

const idToValueMap = new Map<number, any>();

const valueToIdMap = new Map<any, number>();

const getType = (value: any): NodeValue["t"] => {
  if (isValidElement(value)) {
    return "ReactElement";
  }

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
    value !== "String" &&
    value !== "Number" &&
    value !== "Boolean" &&
    value !== "Null" &&
    value !== "Undefined" &&
    value !== "Function" &&
    value !== "AsyncFunction" &&
    value !== "GeneratorFunction" &&
    value !== "Symbol" &&
    value !== "RegExp" &&
    value !== "Promise" &&
    value !== "Element" && 
    value !== "WeakMap" &&
    value !== "WeakSet"
  );
};

const getTargetNode = (value: any, type: NodeValue["t"], deep = 3): NodeValue => {
  const existId = valueToIdMap.get(value);

  const currentId = existId || id++;

  let n = undefined;

  if (type === "Object" && typeof value?.constructor === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
    n = value.constructor.name;
  }

  if (type === "ReactElement") {
    n = getElementName(value);
  }

  idToValueMap.set(currentId, value);

  valueToIdMap.set(value, currentId);
  // full deep to load
  if (deep === 0) {
    return {
      i: currentId,
      t: type,
      n,
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
      return {
        i: currentId,
        t: type,
        n,
        v: Object.keys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
      };
    } else if (type === "ReactElement") {
      return {
        i: currentId,
        t: type,
        n,
        v: Object.keys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
      };
    } else {
      return {
        i: currentId,
        t: type,
        n,
        v: getAllKeys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
        _t: "Object",
      };
    }
  }
};

const getAllKeys = (data: any): string[] => {
  if (!data) return [];

  const keys: string[] = [];

  for (const key in data) {
    keys.push(key);
  }

  return keys;
};

export const getNode = (value: any, deep = 3): NodeValue => {
  try {
    const type = getType(value);

    let expandable = isObject(type);

    if (type === "Promise" && ((value as PromiseWithState<any>).status === "fulfilled" || (value as PromiseWithState<any>).status === "rejected")) {
      expandable = true;
    }

    if (expandable) {
      // full deep to load
      return getTargetNode(value, type, deep);
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

export const getNodeFromId = (id: number) => {
  const value = idToValueMap.get(id);
  if (value) {
    return getNode(value);
  }
};

export const getValueById = (id: number) => {
  if (id && !Number.isNaN(id)) {
    return { v: idToValueMap.get(id), f: true };
  } else {
    return { v: undefined, f: false };
  }
};
