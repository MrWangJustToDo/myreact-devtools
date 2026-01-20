import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";
import { clearNodeCache } from "@/utils/node";

export const useConnect = createState(
  () =>
    ({ state: false, render: undefined, error: undefined, cb: null, agentID: undefined }) as {
      state: boolean;
      render?: boolean;
      error?: string;
      agentID?: string;
      cb: (() => void) | null;
      // used for web dev
      name?: string;
      url?: string;
    },
  {
    withActions: (s) => ({
      connect() {
        s.state = true;
      },
      setRender(render?: boolean) {
        s.render = render;
      },
      setAgentID(id: string) {
        s.agentID = id;
      },
      setError(error?: string) {
        s.error = error;
      },
      setWebDev(name: string, url: string) {
        s.name = name;
        s.url = url;
      },
      disconnect() {
        s.state = false;
        s.url = undefined;
        s.name = undefined;
        s.agentID = undefined;
        clearNodeCache();
      },
      setConnectHandler(cb: () => void) {
        s.cb = cb;
      },
    }),
    withDeepSelector: false,
  }
);

if (!isServer) {
  window.useConnect = useConnect;
}
