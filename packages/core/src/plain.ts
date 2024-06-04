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

  id: string | number;

  source: MyReactElement["_source"] | null;

  fiberTree: string[];

  fiberType: string[];

  hookTree: string[];

  constructor() {
    this.id = `${id++}`;

    this.uuid = `${this.id}--fiber`;
  }
}
