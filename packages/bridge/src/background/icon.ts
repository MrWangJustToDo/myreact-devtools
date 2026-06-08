import { applyExtensionIconForTab, resetExtensionIconForTab as applyResetExtensionIconForTab } from "../icon";
import { consumeRuntimeLastError } from "../utils";

export const setExtensionIconForTab = (tabId: number, data?: { mode?: string } | string) => {
  applyExtensionIconForTab(tabId, data, chrome.runtime.getURL, chrome.action, consumeRuntimeLastError);
};

export const resetExtensionIconForTab = (tabId: number) => {
  applyResetExtensionIconForTab(tabId, chrome.runtime.getURL, chrome.action, consumeRuntimeLastError);
};
