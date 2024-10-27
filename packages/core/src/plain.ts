import type { NodeValue } from "./data";
import type { MyReactElement } from "@my-react/react";
import type { MyReactFiberNode, NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

export type HOOK = {
  name: string;
  value: any;
  deps: any;
};

export type HOOKTree = {
  // index
  i?: number;
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
};

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  p: MyReactFiberNode["pendingProps"];
  // props: MyReactFiberNode["pendingProps"];

  s: MyReactFiberNode["pendingState"];
  // state: MyReactFiberNode["pendingState"];

  k: MyReactElement["key"];
  // key: MyReactElement["key"];

  n: string;
  // name: string;

  c: PlainNode[];
  // children: PlainNode[];

  d?: number;
  // deep?: number;

  t: NODE_TYPE
  // type: NODE_TYPE;

  i: string;
  // id: string;

  _t: string[];
  // tree: string[];

  _s: MyReactElement["_source"];
  // source: MyReactElement["_source"];

  _d?: number;
  // deep?: number;

  hook: HOOK[];

  _h: HOOKTree[];

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
