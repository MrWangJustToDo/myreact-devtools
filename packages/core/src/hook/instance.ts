import type { NodeValue } from "../data";

export type HOOK = {
  name: string;
  value: any;
  deps: any;
};

export const hookValueSymbol = "d::h::v" as const;

export type HOOKTree = {
  $$s: typeof hookValueSymbol;
  // key
  k: string;
  // index
  i?: number;
  // editable
  e?: boolean;
  // isHook
  h?: boolean;
  // deep
  d: number;
  // name
  n: string;
  // value
  v?: NodeValue;
  // used for stack
  // children
  c?: HOOKTree[];
  // all hook keys
  keys: Array<string | number>;
};
