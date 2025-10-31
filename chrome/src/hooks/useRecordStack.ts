import { createState } from "reactivity-store";

import type { StackItemType } from "@my-react-devtool/core";

export const useRecordStack = createState(
  () => ({ state: [] as Array<{ stack: StackItemType; id?: string }>, loading: false, processing: false, select: undefined as StackItemType | undefined }),
  {
    withActions: (s) => ({
      pushStack(data: { stack: StackItemType; id?: string }) {
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
        s.select = undefined;
      },
      setSelect(stack: StackItemType | undefined) {
        s.select = stack;
      },
      clearSelect() {
        s.select = undefined;
      },
      processStack() {
        s.state = s.state.filter((i) => i.stack.e);
      },
    }),
    withDeepSelector: false,
    withStableSelector: true,
  }
);
