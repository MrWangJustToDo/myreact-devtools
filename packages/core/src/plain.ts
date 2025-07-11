import type { NodeValue } from "./data";
import type { MyReactElement } from "@my-react/react";
import type { NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

export type HOOK = {
  name: string;
  value: any;
  deps: any;
};

export type HOOKTree = {
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

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  p: NodeValue;
  // props: fiber props;

  s: NodeValue;
  // state: fiber state

  k: MyReactElement["key"];
  // key: MyReactElement["key"];

  n: string;
  // name: string;

  c: PlainNode[];
  // children: PlainNode[];

  r: PlainNode | null;
  // parent: PlainNode | null;

  d?: number;
  // deep?: number;

  t: NODE_TYPE;
  // type: NODE_TYPE;

  i: string;
  // id: string;

  m?: boolean;
  // react compiler

  _t: string[];
  // tree: string[];

  _s: MyReactElement["_source"];
  // source: MyReactElement["_source"];

  _d?: number;
  // deep?: number;

  _h: HOOKTree[];
  // hooks: HOOKTree[];

  constructor(_id?: string) {
    this.i = _id || `${id++}`;
  }
}

if (__DEV__) {
  Object.defineProperty(PlainNode.prototype, "__debugToString", {
    value: function () {
      return JSON.stringify(this);
    },
  });
}
