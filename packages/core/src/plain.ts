import type { MyReactElement } from "@my-react/react";
import type { NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  props: MyReactElement["props"];

  name: string;

  tag: string[];

  ref: MyReactElement["ref"];

  key: MyReactElement["key"];

  children: PlainNode[];

  deep?: number;

  content: string;

  type: NODE_TYPE;

  uuid: string;

  id: string;

  source: MyReactElement["_source"] | null;

  fiberType: string[];

  renderTree: { name: string; type: number; id: string }[];

  hookTree: string[];

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
