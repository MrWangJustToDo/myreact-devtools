import { getFiberNodeById } from "../tree";

import type { DevToolCore } from "../instance";

// browser platform inspect

export const inspectSource = (core: DevToolCore) => {
  if (!core.hasEnable) return;

  if (typeof globalThis["inspect"] !== "function") {
    core.notifyMessage(`current platform not support inspect`, "warning");

    return;
  }

  if (typeof core._source === "function" && typeof globalThis["inspect"] === "function") {
    const s = core._source;

    core._source = null;

    globalThis["inspect"](s);

    return;
  }

  if (core._source && typeof HTMLElement !== "undefined" && core._source instanceof HTMLElement && typeof globalThis["inspect"] === "function") {
    const s = core._source;

    core._source = null;

    globalThis["inspect"](s);

    window["$$$$0"] = s;

    return;
  }

  core.notifyMessage(`can not view source for current item`, "warning");
};

export const inspectCom = (core: DevToolCore) => {
  if (!core.hasEnable) return;

  const id = core._selectId;

  if (!id) return;

  if (typeof globalThis["inspect"] !== "function") {
    core.notifyMessage(`current platform not support inspect`, "warning");

    return;
  }

  const fiber = getFiberNodeById(id);

  if (fiber) {
    const elementType = fiber.elementType;

    if (typeof globalThis["inspect"] === "function" && elementType) {
      globalThis["inspect"](elementType);

      return;
    }
  }

  core.notifyMessage(`current id: ${id} of fiber can not inspect`, "warning");
};

export const inspectDom = (core: DevToolCore) => {
  if (!core.hasEnable) return;

  const dom = core._selectDom;

  if (typeof globalThis["inspect"] !== "function") {
    core.notifyMessage(`current platform not support inspect`, "warning");

    return;
  }

  if (typeof globalThis["inspect"] === "function" && dom) {
    globalThis["inspect"](dom);

    window["$$$$0"] = dom;

    return;
  }

  core.notifyMessage(`current id: ${core._selectId} of fiber not contain dom node`, "warning");
};
