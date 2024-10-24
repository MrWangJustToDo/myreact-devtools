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
};

type NodeValue = {
  type: keyof typeof KnownType;
  value: any;
  expandable: boolean;
};

export const getType = (value: any): NodeValue["type"] => {
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

