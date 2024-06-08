import type { MyReactElement } from "@my-react/react";
import type { NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

export type HOOK = {
  name: string;
  value: any;
  deps: any;
}

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  props: MyReactElement["props"];

  key: MyReactElement["key"];

  source: MyReactElement["_source"];

  name: string;

  children: PlainNode[];

  deep?: number;

  type: NODE_TYPE;

  id: string;

  tree: string[];

  hook: HOOK[];

  constructor() {
    this.id = `${id++}`;
  }
}

if (__DEV__) {
  Object.defineProperty(PlainNode.prototype, "__debugToString", {
    value: function () {
      return JSON.stringify(this);
    },
  });
}
