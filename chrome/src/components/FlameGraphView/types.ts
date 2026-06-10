import type { StackRecordItem } from "@/hooks/useRecordStack";
import type { StackItemType } from "@my-react-devtool/core";

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type SafeStackItemType = DeepRequired<StackItemType>;

export type RootStack = Array<StackRecordItem>;
