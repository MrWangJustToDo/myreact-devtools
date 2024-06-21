import { DevToolSource } from "./type";

export const windowPostMessageWithSource = <T = any>(message: T) => {
  window.postMessage({ ...message, source: DevToolSource }, "*");
};
