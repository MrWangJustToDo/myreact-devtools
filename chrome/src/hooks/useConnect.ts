import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useConnect = createState(() => ({ state: false, cb: null } as {state: boolean, cb: (() => void) | null}), {
  withActions: (s) => ({
    connect() {
      s.state = true;
    },
    disconnect() {
      s.state = false;
    },
    setConnectHandler(cb: () => void) {
      s.cb = cb
    }
  }),
  withDeepSelector: false,
});

if (!isServer) {
  window.useConnect = useConnect;
}
