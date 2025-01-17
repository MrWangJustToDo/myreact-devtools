import { DevToolSource } from "@my-react-devtool/core";

export const generatePostMessageWithSource =
  (from?: string) =>
  <T = any>(message: T) => {
    window.postMessage({ from, ...message, source: DevToolSource }, "*");
  };
