import type { PlainNode } from "./instance";

export enum TreeOpType {
  ADD = 1,
  REMOVE = 2,
  UPDATE_META = 3,
}

export type TreeOpAdd = { op: TreeOpType.ADD; id: string; parentId: string | null; afterId: string | null; node: PlainNode };
export type TreeOpRemove = { op: TreeOpType.REMOVE; id: string };
export type TreeOpUpdateMeta = { op: TreeOpType.UPDATE_META; id: string; n?: string; t?: number; k?: string | number; m?: boolean };

export type TreeOp = TreeOpAdd | TreeOpRemove | TreeOpUpdateMeta;
