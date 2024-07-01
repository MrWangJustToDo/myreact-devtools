import { DevToolSource } from "./type";

export const generatePostMessageWithSource =
  (from?: string) =>
  <T = any>(message: T) => {
    window.postMessage({ from, ...message, source: DevToolSource }, "*");
  };
