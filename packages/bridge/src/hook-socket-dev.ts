import io from "socket.io-client/dist/socket.io.js";

import { core } from "./core";
import { initNODE_DEV } from "./node-dev";
import { initWEB_DEV } from "./web-dev";

import type { CustomRenderDispatch } from "@my-react/react-reconciler";

globalThis.io = io;

const set = new Set<CustomRenderDispatch>();

const globalHook = (dispatch: CustomRenderDispatch) => {
  set.add(dispatch);

  core.addDispatch(dispatch);
};

if (!globalThis["__MY_REACT_DEVTOOL_INTERNAL__"]) {
  globalThis["__MY_REACT_DEVTOOL_INTERNAL__"] = core;

  globalThis["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;

  globalThis["__@my-react/react-devtool-inject__"] = globalHook;

  if (typeof window !== "undefined") {
    // support web dev
    globalThis["__MY_REACT_DEVTOOL_WEB__"] = initWEB_DEV;
  }

  if (typeof process !== "undefined") {
    // support node dev
    globalThis["__MY_REACT_DEVTOOL_NODE__"] = initNODE_DEV;
  }

  if (typeof globalThis["__@my-react/react-devtool-inject-pending__"] === "function") {
    globalThis["__@my-react/react-devtool-inject-pending__"]?.();
  } else {
    if (Array.isArray(globalThis["__@my-react/dispatch__"])) {
      globalThis["__@my-react/dispatch__"].forEach((dispatch: CustomRenderDispatch) => {
        globalHook(dispatch);
      });
    }
  }
} else {
  if (__DEV__) {
    console.warn("[@my-react-devtool/hook] current file should only be loaded once");
  }
}

