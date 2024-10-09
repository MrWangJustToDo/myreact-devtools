import { createState } from "reactivity-store";

import { isServer } from "@/utils/isServer";

export const useConnect = createState(
  () =>
    ({ state: false, render: undefined, error: undefined, cb: null }) as {
      state: boolean;
      render?: boolean;
      error?: string;
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
