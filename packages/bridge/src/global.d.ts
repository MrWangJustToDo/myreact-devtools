import { PlainNode, Tree } from "@my-react-devtool/core";
import { UseSelectorWithState } from "reactivity-store";
import { io } from "socket.io-client";

declare global {
  const __DEV__: boolean;
  const __VERSION__: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }

  interface Window {
    useAppTree: UseSelectorWithState<{ nodes: Tree[] }, { addNode: (node: Tree) => void }>;

    useTreeNode: UseSelectorWithState<{ select: string | null; hover: string | null }, {}>;

    useDetailNode: UseSelectorWithState<
      { nodes: PlainNode[]; loading: boolean; error: Error | null },
      { addNode: (node: PlainNode) => void; setLoading: (loading: boolean) => void; setError: (e: Error | null) => void }
    >;

    useConnect: UseSelectorWithState<
      { state: boolean },
      {
        connect: () => void;
        disconnect: () => void;
        setError: (r?: string) => void;
        setRender: (r?: boolean) => void;
        setConnectHandler: (cb: () => void) => void;
      }
    >;

    useTriggerNode: UseSelectorWithState<{ state: Record<string, number> }, { update: (state: Record<string, number>) => void }>;

    useHMRNode: UseSelectorWithState<{ state: Record<string, number> }, { update: (state: Record<string, number>) => void }>;

    useNodeName: UseSelectorWithState<{ state: Record<string, string> }, { set: (s: Record<string, string>) => void }>;

    useHighlightNode: UseSelectorWithState<{}, { highlightNode: (id: string, type: string) => void }>;

    io: typeof io;
  }
}

export {};
