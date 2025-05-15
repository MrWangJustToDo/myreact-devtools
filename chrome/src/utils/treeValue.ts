/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createElement, Fragment, isValidElement } from "react";

import type { HOOKTree } from "@my-react-devtool/core";
import type { ReactNode } from "react";

function isIterable(obj: any) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj) && typeof obj[window.Symbol.iterator] === "function";
}

const getShortTextFromHookValue = (item: HOOKTree["v"]) => {
  const val = item?.v;
  const type = item?.t;
  if (type === "Element") {
    return createElement('span', { className: "text-teal-600" }, val);
  }
  if (type === "Date" || type === "Boolean" || type === "Error" || type === "Number" || type === "Symbol") {
    return val;
  }
  if (item?.n) {
    return item.n;
  }
  if (item?.l === false) {
    if (item.t === "Array" || item.t === "Set") {
      return "[…]";
    }
    if (item.t === "Map" || item.t === "Object") {
      return "{…}";
    }
    return "…";
  }
  if (isIterable(val)) {
    return "(…)";
  } else if (Array.isArray(val)) {
    return val.length > 0 ? "[…]" : "[]";
  } else if (type === "Null") {
    return "null";
  } else if (type === "Undefined") {
    return "undef";
  } else if (typeof val === "object") {
    return Object.keys(val as {}).length > 0 ? "{…}" : "{}";
  } else if (type === "Function") {
    return createElement('span', { className: "text-teal-600" }, `${val.substr(0, 10) + (val.length > 10 ? "…" : "")}`);
    // return `${val.substr(0, 10) + (val.length > 10 ? "…" : "")}`;
  } else if (typeof val === "string") {
    if (type === "String") {
      return `"${val.substr(0, 10) + (val.length > 10 ? "…" : "")}"`;
    } else {
      return `${val.substr(0, 10) + (val.length > 10 ? "…" : "")}`;
    }
  } else {
    return val;
  }
};

export function getText(type: string, data: any) {
  let onlyStr = true;
  if (type === "Object") {
    const eleArr: ReactNode[] = [];
    const keys = Object.keys(data as {});

    keys?.slice(0, 3)?.forEach?.((key) => {
      const val = getShortTextFromHookValue(data[key]);
      if (isValidElement(val)) {
        onlyStr = false;
        eleArr.push(createElement(Fragment, { key: key }, `${key}: `, val));
      } else {
        eleArr.push(`${key}: ${val}`);
      }
    });

    if (keys.length > 3) {
      eleArr.push("…");
    }

    if (onlyStr) {
      return eleArr.join(", ");
      // return `{ ${eleArr.join(', ')} }`
    } else {
      return eleArr;
    }
  } else if (type === "Array") {
    const eleArr: ReactNode[] = [];

    data?.slice(0, 4)?.forEach?.((val: any) => {
      const text = getShortTextFromHookValue(val);
      if (isValidElement(text)) {
        onlyStr = false;
      }
      eleArr.push(text);
    });
    
    if (data.length > 4) {
      eleArr.push("…");
    }

    if (onlyStr) {
      return eleArr.join(", ");
      // return `[ ${eleArr.join(', ')} ]`
    } else {
      return eleArr;
    }
  } else {
    return type;
  }
}
