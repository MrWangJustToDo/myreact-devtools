import { initBundleWS_DEV } from "../entry/bundle-ws-dev";

import { globalHook, core } from "./shared";

if (!globalThis["__MY_REACT_DEVTOOL_INTERNAL__"]) {
  globalThis["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

  globalThis["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;

  globalThis["__@my-react/react-devtool-inject__"] = globalHook;

  globalThis["__MY_REACT_DEVTOOL_BUNDLE_WS__"] = initBundleWS_DEV;
} else {
  if (__DEV__) {
    console.warn("[@my-react-devtool/hook] current file should only be loaded once");
  }
}
