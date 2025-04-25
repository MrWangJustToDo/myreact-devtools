import { DevToolSource } from "@my-react-devtool/core/event";

export const generatePostMessageWithSource =
  (from?: string) =>
  <T = any>(message: T) => {
    if (typeof window === 'undefined') return;
    
    window.postMessage({ from, ...message, source: DevToolSource }, "*");
  };
