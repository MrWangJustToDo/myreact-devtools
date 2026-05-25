import { DevToolSource } from "@my-react-devtool/core/event";

import { applyExtensionIconForTab } from "./icon";
import { loadRemoteModule } from "./polyfill";

let varId = 0;

export const getValidGlobalVarName = () => {
  let varName = `$my-react-var-${varId++}`;

  while (globalThis[varName]) {
    varName = `$my-react-var-${varId++}`;
  }

  return varName;
};

export const loadScript = (url: string) => loadRemoteModule(url, { context: globalThis, useEval: true });

export const loadIframe = (url: string, token: string) => {
  return new Promise<HTMLIFrameElement>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("[@my-react-devtool/hook] document not found, current environment not support"));

      return;
    }

    const exist = document.getElementById(`my-react-devtool-bridge-${token}`);

    if (exist) {
      resolve(exist as HTMLIFrameElement);

      return;
    }

    const iframe = document.createElement("iframe");

    iframe.src = url;

    iframe.classList.add("my-react-devtool-bridge");

    iframe.id = `my-react-devtool-bridge-${token}`;

    iframe.style.display = "none";

    iframe.onload = () => resolve(iframe);

    iframe.onerror = reject;

    document.body.appendChild(iframe);
  });
};

export const generatePostMessageWithSource =
  (from?: string) =>
  <T = any>(message: T) => {
    if (typeof window === "undefined") return;

    const _message = { ...message } as any;

    if (!_message.from) {
      _message.from = from;
    }

    window.postMessage({ ..._message, source: DevToolSource }, "*");
  };

type RuntimeLike = {
  id?: string;
  lastError?: { message?: string };
  sendMessage: (message: unknown, responseCallback?: () => void) => Promise<unknown> | void;
};

const getExtensionRuntime = (): RuntimeLike | undefined => {
  const g = globalThis as { chrome?: { runtime?: RuntimeLike }; browser?: { runtime?: RuntimeLike } };
  return g.chrome?.runtime ?? g.browser?.runtime;
};

/**
 * Send a one-shot message to the extension background without leaving
 * "Unchecked runtime.lastError" in the console when the receiver is missing
 * (e.g. MV3 service worker still waking up after navigation / HMR).
 */
export const safeRuntimeSendMessage = (message: Record<string, unknown>): void => {
  const runtime = getExtensionRuntime();
  // Skip when extension context is invalidated (e.g. extension reload during HMR).
  if (!runtime?.sendMessage || !runtime.id) return;

  try {
    // Callback form only — Chrome requires reading runtime.lastError in the callback.
    // Do not chain .catch() on the returned promise; that can still log unchecked lastError.
    runtime.sendMessage(message, () => {
      if (runtime.lastError) {
        /* consumed — receiver may be unavailable while the service worker is starting */
      }
    });
  } catch {
    if (runtime.lastError) {
      /* consumed */
    }
  }
};

/** Consume chrome.runtime.lastError after a port disconnect (required by Chrome). */
export const consumeRuntimeLastError = (): void => {
  void getExtensionRuntime()?.lastError;
};

type TabsLike = {
  getCurrent: (callback: (tab: { id?: number } | undefined) => void) => void;
};

type ActionLike = {
  setPopup: (details: { tabId: number; popup: string }, callback?: () => void) => void;
  setIcon: (details: { tabId: number; path: Record<number, string> }, callback?: () => void) => void;
};

/**
 * Update extension icon for the tab this content script runs in.
 * Uses chrome.action directly when available (Chrome 121+), otherwise falls back
 * to messaging the background (reliable in all extension contexts).
 */
export const updateExtensionIconForCurrentTab = (data?: { mode?: string } | string, onFallback?: () => void): void => {
  const g = globalThis as {
    chrome?: { runtime?: RuntimeLike & { getURL: (path: string) => string }; tabs?: TabsLike; action?: ActionLike };
    browser?: {
      runtime?: RuntimeLike & { getURL: (path: string) => string };
      tabs?: TabsLike;
      action?: ActionLike;
      browserAction?: ActionLike;
    };
  };

  const runtime = g.chrome?.runtime ?? g.browser?.runtime;
  const tabs = g.chrome?.tabs ?? g.browser?.tabs;
  const action = g.chrome?.action ?? g.browser?.action ?? g.browser?.browserAction;

  if (!runtime?.getURL) {
    onFallback?.();
    return;
  }

  // chrome.action is often unavailable in content scripts — use background fallback.
  if (!action?.setPopup || !action?.setIcon || !tabs?.getCurrent) {
    onFallback?.();
    return;
  }

  tabs.getCurrent((tab) => {
    if (runtime.lastError) {
      /* consumed */
    }

    if (tab?.id) {
      applyExtensionIconForTab(tab.id, data, runtime.getURL, action, consumeRuntimeLastError);
    } else {
      onFallback?.();
    }
  });
};
