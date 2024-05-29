import { memo } from "react";

export const Memo = memo(() => {
  // if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     console.log("request", request);
  //     console.log("sender", sender);
  //     console.log("sendResponse", sendResponse);
  //   });
  // }
  return null;
});

Memo.displayName = "Memo";
