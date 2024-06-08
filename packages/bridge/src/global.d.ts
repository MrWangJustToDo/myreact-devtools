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
    useTreeNode: UseSelectorWithState<{ select: { current: PlainNode } | null; hover: { current: PlainNode } | null }, {}>;
    useDetailNode: UseSelectorWithState<
      { nodes: PlainNode[]; loading: boolean; error: Error | null },
      { addNode: (node: PlainNode) => void; setLoading: (loading: boolean) => void; setError: (e: Error | null) => void }
    >;
  }
}

export {};
