import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useConnect = createState(
  () => ({ state: false, render: undefined, error: undefined, cb: null }) as { state: boolean; render?: boolean; error?: string; cb: (() => void) | null },
  {
    withActions: (s) => ({
      connect() {
        s.state = true;
      },
      setRender(render?: boolean) {
        s.render = render;
      },
      setError(error?: string) {
        s.error = error;
      },
      disconnect() {
        s.state = false;
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
