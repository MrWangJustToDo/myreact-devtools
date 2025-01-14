import { NodeValue, PlainNode, Tree } from "@my-react-devtool/core";
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
    useAppTree: UseSelectorWithState<{ nodes: Tree[] }, { addNode: (node: Tree) => void; clear: () => void }>;

    useTreeNode: UseSelectorWithState<
      { select: string | null; hover: string | null; reload: number, store: number, trigger: number },
      {
        clear: () => void;
      }
    >;

    useDetailNode: UseSelectorWithState<
      { nodes: PlainNode[]; loading: boolean; error: Error | null },
      { addNode: (node: PlainNode) => void; setLoading: (loading: boolean) => void; setError: (e: Error | null) => void; clear: () => void }
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

    useActiveNode: UseSelectorWithState<{ state: Record<string, number> }, { clear: () => void }>;

    useRunNode: UseSelectorWithState<
      { state: Record<string, { c: number; t?: number }> },
      { update: (state: Record<string, { c: number; t?: number }>) => void; clear: () => void }
    >;

    useTriggerNode: UseSelectorWithState<{ state: Record<string, number> }, { update: (state: Record<string, number>) => void; clear: () => void }>;

    useHMRNode: UseSelectorWithState<{ state: Record<string, number> }, { update: (state: Record<string, number>) => void; clear: () => void }>;

    useNodeName: UseSelectorWithState<{ state: Record<string, string> }, { set: (s: Record<string, string>) => void; clear: () => void }>;

    useContextMenu: UseSelectorWithState<{ store?: number }, { clear: () => void }>;

    useHighlightNode: UseSelectorWithState<
      {},
      {
        highlightNode: (id: string, type: string) => void;
        setError: (state: Record<string, Array<NodeValue>>) => void;
        setWarn: (state: Record<string, Array<NodeValue>>) => void;
        clear: () => void;
      }
    >;

    useConfig: UseSelectorWithState<
      { state: { enableHover: boolean; enableUpdate: boolean } },
      { setEnableHover: (b: boolean) => void; setEnableUpdate: (b: boolean) => void }
    >;

    useChunk: UseSelectorWithState<
      { id: number | string | null; data: Record<number | string, { loaded: any }> },
      {
        clear: () => void;
        setLoaded: () => void;
        setChunk: (data: Record<number | string, { loaded: any }>) => void;
      }
    >;

    io: typeof io;
  }
}

export {};
