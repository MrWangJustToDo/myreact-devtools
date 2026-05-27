import type { NodeValue } from "../data";
import type { HOOKTree } from "../hook";
import type { MyReactElement } from "@my-react/react/type";
import type { NODE_TYPE } from "@my-react/react-reconciler";

let id = 0;

const fiberValueSymbol = "d::f::v" as const;

// PlainNode is a simplified version of FiberNode just for show the structure
export class PlainNode {
  $$S: typeof fiberValueSymbol;

  // only for detail node, not for tree indexing
  p: NodeValue;
  // props: fiber props;

  // only for detail node, not for tree indexing
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

  /**
   * @deprecated
   */
  d?: number;
  // deep?: number; for flatten base deep count
  // no need this for weight based tree indexing

  t: NODE_TYPE;
  // type: NODE_TYPE;

  i: string;
  // id: string;

  m?: boolean;
  // react compiler

  _t: string[];
  // tree: string[];

  _s?: { type: "stack" | "source"; value: string } | null;
  // source: MyReactElement["_source"];

  _d?: number;
  // final deep?: number; rewrite for node filter

  // only for detail node, not for tree indexing
  _h: HOOKTree[];
  // hooks: HOOKTree[];

  _r: number;
  // running count for fiber node

  _w?: number;
  // weight of node, for weight based tree indexing

  _$f?: boolean;
  // inspect node

  _$n?: string;
  // real name of fiber node, debug only

  _ci: string[];
  // snapshot: children ids

  _pi: string | null;
  // snapshot: parent id

  constructor(_id?: string) {
    this.$$S = fiberValueSymbol;

    this.i = _id || `${id++}`;
  }

  clone(parentId: string | null): PlainNode {
    const cloned = new PlainNode(this.i);
    cloned.n = this.n;
    cloned.t = this.t;
    cloned.k = this.k;
    cloned.m = this.m;
    cloned._ci = this.c ? this.c.map((c) => c.i) : [];
    cloned._pi = parentId;
    return cloned;
  }
}

if (__DEV__) {
  Object.defineProperty(PlainNode.prototype, "__debugToString", {
    value: function () {
      return JSON.stringify(this);
    },
  });
}
