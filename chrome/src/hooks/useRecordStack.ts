import { createState } from "reactivity-store";

import type { NodeValue, StackItemType } from "@my-react-devtool/core";

export type StackRecordItem = { stack: StackItemType; id?: string; mode: "legacy" | "concurrent"; list?: Array<{ n: string; i: string; updater: NodeValue[] }> };

export const useRecordStack = createState(
  () => ({
    state: [] as Array<StackRecordItem>,
    loading: false,
    processing: false,
    root: undefined as StackRecordItem | undefined,
    select: undefined as StackItemType | undefined,
  }),
  {
    withActions: (s) => ({
      pushStack(data: StackRecordItem) {
        s.state.push(data);
      },
      startLoading() {
        s.loading = true;
      },
      stopLoading() {
        s.loading = false;
      },
      startProcessing() {
        s.processing = true;
      },
      stopProcessing() {
        s.processing = false;
      },
      clearStack() {
        s.state = [];
        s.root = undefined;
        s.select = undefined;
      },
      setSelect(stack: StackItemType | undefined) {
        s.select = stack;
      },
      clearSelect() {
        s.select = undefined;
      },
      setRoot(root: StackRecordItem | undefined) {
        s.root = root;
      },
      clearRoot() {
        s.root = undefined;
      },
      processStack() {
        s.state = s.state.filter((i) => i.stack.e);
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
