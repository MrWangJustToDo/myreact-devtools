function isIterable(obj: any) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj) && typeof obj[window.Symbol.iterator] === "function";
}

function getShortTypeString(val: any) {
  if (isIterable(val)) {
    return "(…)";
  } else if (Array.isArray(val)) {
    return val.length > 0 ? "[…]" : "[]";
  } else if (val === null) {
    return "null";
  } else if (val === undefined) {
    return "undef";
  } else if (typeof val === "object") {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return Object.keys(val as {}).length > 0 ? "{…}" : "{}";
  } else if (typeof val === "function") {
    return "fn";
  } else if (typeof val === "string") {
    return `"${val.substr(0, 10) + (val.length > 10 ? "…" : "")}"`;
  } else if (typeof val === "symbol") {
    return "symbol";
  } else {
    return val;
  }
}

export function getText(type: string, data: any, mode = "old") {
  if (type === "Object") {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const keys = Object.keys(data as {});

    const str = keys
      .slice(0, 3)
      .map((key) => `${key}: ${getShortTypeString(mode === "old" ? data[key] : data[key].v) as string}`)
      .concat(keys.length > 3 ? ["…"] : [])
      .join(", ");

    return `{ ${str} }`;
  } else if (type === "Array") {
    const str = data
      .slice(0, 4)
      .map((val: any) => getShortTypeString(mode === "old" ? val : val.v))
      .concat(data.length > 4 ? ["…"] : [])
      .join(", ");

    return `[${str as string}]`;
  } else {
    return type;
  }
}
