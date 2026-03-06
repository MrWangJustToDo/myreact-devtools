import { core } from "../core";
import { MessageHookType, sourceFrom } from "../type";
import { generatePostMessageWithSource } from "../utils";

const forwardPostMessageWithSource = generatePostMessageWithSource(sourceFrom.forward);

export const initForward_DEV = async () => {
  globalThis.__MY_REACT_DEVTOOL_RUNTIME__?.prepare?.();

  forwardPostMessageWithSource({ type: MessageHookType.init, to: sourceFrom.hook });
};

initForward_DEV.close = () => {
  core.disconnect();
};
