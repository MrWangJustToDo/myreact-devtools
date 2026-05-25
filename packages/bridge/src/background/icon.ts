import { applyExtensionIconForTab } from "../icon";
import { consumeRuntimeLastError } from "../utils";

export const setExtensionIconForTab = (tabId: number, data?: { mode?: string } | string) => {
  applyExtensionIconForTab(tabId, data, chrome.runtime.getURL, chrome.action, consumeRuntimeLastError);
};
