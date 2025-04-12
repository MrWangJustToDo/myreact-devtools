/* eslint-disable @typescript-eslint/no-empty-object-type */
import { escapeHtml } from "./escapeHtml";

import type { HOOKTree } from "@my-react-devtool/core";

function isIterable(obj: any) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj) && typeof obj[window.Symbol.iterator] === "function";
}

const getShortTextFromHookValue = (item: HOOKTree["v"]) => {
  const val = item?.v;
  const type = item?.t;
  if (type === "Element") {
    return `<span class='text-teal-600'>${escapeHtml(val || "")}</span>`;
  }
  if (type === "Date" || type === "Boolean" || type === "Error" || type === "Number" || type === "Symbol") {
    return escapeHtml(val);
  }
  if (item?.n) {
    return escapeHtml(item.n);
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
    return escapeHtml(Object.keys(val as {}).length > 0 ? "{…}" : "{}");
  } else if (type === "Function") {
    return escapeHtml(`${val.substr(0, 10) + (val.length > 10 ? "…" : "")}`);
  } else if (typeof val === "string") {
    if (type === "String") {
      return escapeHtml(`"${val.substr(0, 10) + (val.length > 10 ? "…" : "")}"`);
    } else {
      return escapeHtml(`${val.substr(0, 10) + (val.length > 10 ? "…" : "")}`);
    }
  } else {
    return escapeHtml(val);
  }
};

export function getText(type: string, data: any) {
  if (type === "Object") {
    const keys = Object.keys(data as {});

    const str = keys
      ?.slice(0, 3)
      ?.map((key) => `${key}: ${getShortTextFromHookValue(data[key])}`)
      ?.concat(keys.length > 3 ? ["…"] : [])
      ?.join(", ");

    return `{ ${str} }`;
  } else if (type === "Array") {
    const str = data
      ?.slice(0, 4)
      ?.map((val: any) => getShortTextFromHookValue(val))
      ?.concat(data.length > 4 ? ["…"] : [])
      ?.join(", ");

    return `[${str as string}]`;
  } else {
    return type;
  }
}
