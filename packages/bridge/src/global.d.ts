import { PlainNode } from "@my-react-devtool/core";
import { UseSelectorWithState } from "reactivity-store";

declare global {
  const __DEV__: boolean;
  const __VERSION__: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }

  interface Window {
    useAppTree: UseSelectorWithState<{ nodes: PlainNode[] }, { addNode: (node: PlainNode) => void; delNode: (node: PlainNode) => void }>;
  }
}

export {};
