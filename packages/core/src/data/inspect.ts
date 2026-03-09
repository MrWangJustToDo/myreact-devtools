import { getElementName, isValidElement } from "../fiber";

import { isReactive, isReadonly, isRef, isShallow } from "./reactive";

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

const nodeValueSymbol = 'd::n::v';

export type NodeValue = {
  $$s: 'd::n::v';
  // id
  i: number;
  // type
  t: keyof typeof KnownType;
  // wrapper
  _t?: "Reactive" | "Readonly" | "Shallow" | "Ref" | "Object";
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

const getWrapperType = (value: any): NodeValue["_t"] => {
  if (isReadonly(value)) {
    return "Readonly";
  }

  if (isShallow(value)) {
    return "Shallow";
  }

  if (isReactive(value)) {
    return "Reactive";
  }

  if (isRef(value)) {
    return "Ref";
  }
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

// serialized any obj to devtool protocol obj
const getTargetNode = (value: any, type: NodeValue["t"], deep = 3): NodeValue => {
  const existId = valueToIdMap.get(value);

  const wrapperType = getWrapperType(value);

  const currentId = existId || id++;

  let n = undefined;

  if (type === "Object" && typeof value?.constructor === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
    n = value.constructor.name;

    if (n === "Object") {
      n = undefined;
    }
  }

  if (type === "ReactElement") {
    n = getElementName(value);
  }

  idToValueMap.set(currentId, value);

  valueToIdMap.set(value, currentId);
  // full deep to load
  if (deep === 0) {
    return {
      $$s: nodeValueSymbol,
      i: currentId,
      t: type,
      _t: wrapperType,
      n,
      v: undefined,
      e: true,
      l: false,
    };
  } else {
    if (type === "Array") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        v: value.map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Iterable") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        v: Array.from(value).map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Map") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        v: Array.from((value as Map<any, any>).entries()).map(([key, val]) => ({
          t: "Array",
          e: true,
          v: [getNode(key, deep - 1), getNode(val, deep - 1)],
        })),
        e: true,
      };
    } else if (type === "Set") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        v: Array.from(value).map((val: any) => getNode(val, deep - 1)),
        e: true,
      };
    } else if (type === "Object") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        n,
        v: Object.keys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
      };
    } else if (type === "ReactElement") {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType,
        n,
        v: Object.keys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
      };
    } else {
      return {
        $$s: nodeValueSymbol,
        i: currentId,
        t: type,
        _t: wrapperType || "Object",
        n,
        v: getAllKeys(value).reduce((acc, key) => {
          acc[key] = getNode(value[key], deep - 1);
          return acc;
        }, {}),
        e: true,
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
      const wrapperType = getWrapperType(value);

      const existId = valueToIdMap.get(value);

      const currentId = existId || id++;

      idToValueMap.set(currentId, value);

      valueToIdMap.set(value, currentId);

      if (type === "Element") {
        return {
          $$s: nodeValueSymbol,
          i: currentId,
          t: type,
          _t: wrapperType,
          v: `<${value.tagName.toLowerCase()} />`,
          e: expandable,
        };
      }
      if (type === "Error") {
        return {
          $$s: nodeValueSymbol,
          i: currentId,
          t: type,
          _t: wrapperType,
          v: value.message,
          e: expandable,
        };
      }
      if (typeof value === "object" && value !== null) {
        return {
          $$s: nodeValueSymbol,
          i: currentId,
          t: type,
          _t: wrapperType,
          v: Object.prototype.toString.call(value),
          e: expandable,
        };
      } else {
        return {
          $$s: nodeValueSymbol,
          i: currentId,
          t: type,
          _t: wrapperType,
          v: String(value),
          e: expandable,
        };
      }
    }
  } catch (e) {
    return {
      $$s: nodeValueSymbol,
      i: NaN,
      t: "ReadError",
      v: "Read data error: " + e.message,
      e: false,
    };
  }
};

export const getObj = (value: NodeValue): any => {
  const { t, v, $$s } = value || {};

  if (!$$s || $$s !== nodeValueSymbol) {
    return value;
  }

  // If we have the original object cached, return it
  // if (idToValueMap.has(i)) {
  //   return idToValueMap.get(i);
  // }

  switch (t) {
    case "Array":
      return (v as NodeValue[]).map(getObj);
    case "Iterable":
      return (v as NodeValue[]).map(getObj);
    case "Map": {
      const map = new Map();
      (v as { t: string; v: NodeValue[] }[]).forEach((entry) => {
        const [key, val] = entry.v;
        map.set(getObj(key), getObj(val));
      });
      return map;
    }
    case "Set": {
      const set = new Set();
      (v as NodeValue[]).forEach((item) => {
        set.add(getObj(item));
      });
      return set;
    }
    case "Object":
    case "ReactElement":
    case "Module": {
      const obj: Record<string, any> = {};
      Object.keys(v).forEach((key) => {
        obj[key] = getObj(v[key]);
      });
      return obj;
    }
    case "String":
      return v;
    case "Number":
      return Number(v);
    case "Boolean":
      return v === "true" || v === true;
    case "Date":
      return new Date(v);
    case "Null":
      return null;
    case "Undefined":
      return undefined;
    case "Function":
    case "AsyncFunction":
    case "GeneratorFunction":
      // Cannot reconstruct functions, return a placeholder or the string representation
      return v;
    case "Symbol":
      return Symbol(v);
    case "RegExp": {
      // v is like "/pattern/flags"
      const match = String(v).match(/^\/(.*)\/([gimsuy]*)$/);
      if (match) {
        return new RegExp(match[1], match[2]);
      }
      return new RegExp(v);
    }
    case "Promise":
      // Cannot reconstruct promises, return the value representation
      return v;
    case "Element":
      // DOM elements cannot be reconstructed from string, return the string representation
      return v;
    case "Error":
      return new Error(v);
    case "WeakMap":
    case "WeakSet":
      // WeakMap/WeakSet cannot be reconstructed
      return v;
    case "ReadError":
      return new Error(v);
    default:
      return v;
  }
};

export const getNodeFromId = (id: number) => {
  const value = idToValueMap.get(id);
  if (value) {
    return getNode(value);
  }
};

export const getValueFromId = (id: number) => {
  if (id && !Number.isNaN(id)) {
    return { v: idToValueMap.get(id), f: true };
  } else {
    return { v: undefined, f: false };
  }
};
