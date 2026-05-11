import { throttle } from "./utils";

import type { DevToolCore } from "./instance";

const CONSOLE_METHODS = ["log", "info", "warn", "error", "debug"] as const;

type ConsoleMethod = (typeof CONSOLE_METHODS)[number];

const MAX_CONSOLE_ENTRIES = 1000;

let originalMethods: Record<ConsoleMethod, (...args: any[]) => void> | null = null;

let patched = false;

export function patchConsole(runtime: DevToolCore): void {
  if (patched) return;

  patched = true;

  originalMethods = {} as Record<ConsoleMethod, (...args: any[]) => void>;

  const notifyWithThrottle = throttle(() => runtime.notifyConsole(), 200);

  for (const method of CONSOLE_METHODS) {
    const original = console[method];

    originalMethods[method] = original;

    console[method] = (...args: any[]) => {
      if (runtime._console.length >= MAX_CONSOLE_ENTRIES) {
        const keep = Math.floor(MAX_CONSOLE_ENTRIES / 2);
        const removed = runtime._console.length - keep;
        runtime._console = runtime._console.slice(-keep);
        runtime._consoleSentIndex = Math.max(0, runtime._consoleSentIndex - removed);
      }

      runtime._console.push({ type: method, args });

      notifyWithThrottle();

      original.apply(console, args);
    };
  }
}

export function unpatchConsole(): void {
  if (!patched || !originalMethods) return;

  for (const method of CONSOLE_METHODS) {
    console[method] = originalMethods[method];
  }

  originalMethods = null;

  patched = false;
}
