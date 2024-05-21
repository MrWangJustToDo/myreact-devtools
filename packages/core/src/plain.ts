import type { MyReactElement, MyReactElementType } from "@my-react/react";
import type { NODE_TYPE } from "@my-react/react-reconciler";


// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  props: MyReactElement['props'];

  ref: MyReactElement["ref"];

  key: MyReactElement["key"];

  child: PlainNode;

  parent: PlainNode;

  sibling: PlainNode;

  type: NODE_TYPE;

  elementType: MyReactElementType | null;

  uuid: string;
}
