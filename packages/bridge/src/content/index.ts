import { initIFRAME_DEV } from "../entry/iframe-dev";
import { initNODE_DEV } from "../entry/node-dev";
import { initWEB_DEV } from "../entry/web-dev";

import { globalHook, core } from "./shared";

if (!globalThis["__MY_REACT_DEVTOOL_INTERNAL__"]) {
  globalThis["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

  globalThis["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;

  globalThis["__@my-react/react-devtool-inject__"] = globalHook;

  if (typeof window !== "undefined") {
    globalThis["__MY_REACT_DEVTOOL_WEB__"] = initWEB_DEV;

    globalThis["__MY_REACT_DEVTOOL_IFRAME__"] = initIFRAME_DEV;
  }

  if (typeof process !== "undefined") {
    globalThis["__MY_REACT_DEVTOOL_NODE__"] = initNODE_DEV;
  }

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__.prepare?.();

  globalThis.__MY_REACT_DEVTOOL_RUNTIME__.init?.();
} else {
  if (__DEV__) {
    console.warn("[@my-react-devtool/hook] current file should only be loaded once");
  }
}
