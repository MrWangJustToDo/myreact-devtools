import type { MyReactElement } from "@my-react/react";
import type { MyReactFiberNode, NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

export type HOOK = {
  name: string;
  value: any;
  deps: any;
};

export type HOOKTree = {
  index?: number;
  isHook?: boolean;
  deep: number;
  path?: string;
  name: string;
  value?: unknown;
  // used for stack
  children?: HOOKTree[];
};

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  props: MyReactFiberNode["pendingProps"];

  state: MyReactFiberNode["pendingState"];

  key: MyReactElement["key"];

  source: MyReactElement["_source"];

  name: string;

  children: PlainNode[];

  deep?: number;

  type: NODE_TYPE;

  id: string;

  tree: string[];

  hook: HOOK[];

  hook_v2: HOOKTree[];

  constructor(_id?: string) {
    this.id = _id || `${id++}`;
  }
}

if (__DEV__) {
  Object.defineProperty(PlainNode.prototype, "__debugToString", {
    value: function () {
      return JSON.stringify(this);
    },
  });
}
