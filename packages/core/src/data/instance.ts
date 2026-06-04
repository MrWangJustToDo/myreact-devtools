export const KnownType = {
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
  BigInt: true,
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
} as const;

export const nodeValueSymbol = "d::n::v" as const;

export type NodeValue = {
  $$s: typeof nodeValueSymbol;
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
