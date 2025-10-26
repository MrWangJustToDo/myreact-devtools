import { getComponentFiberByDom, getFiberNodeById, getPlainNodeIdByFiber } from "../tree";
import { debounce } from "../utils";

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

let cb = () => {};

export const enableBrowserHover = (core: DevToolCore) => {
  if (!core.hasEnable) return;

  if (core._enableHoverOnBrowser) return;

  if (typeof document === "undefined") {
    if (__DEV__) {
      console.warn("[@my-react-devtool/core] current env not support");
    }
    return;
  }

  core._enableHoverOnBrowser = true;

  core.select.remove();

  const debounceNotifyDomHover = debounce(() => {
    core.notifyDomHover();
    core.disableBrowserHover();
    core.notifyConfig();
  }, 100);

  const onMouseEnter = debounce((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    core.select.remove();

    if (!core.hasEnable) return;

    if (target.nodeType === Node.ELEMENT_NODE) {
      const fiber = getComponentFiberByDom(target);

      if (fiber) {
        core.select.remove();

        core.select.inspect(fiber);

        const id = getPlainNodeIdByFiber(fiber);

        core._tempDomHoverId = id;
      }
    }
  }, 16);

  const onClick = (e: MouseEvent) => {
    if (!core.hasEnable) return;

    core._domHoverId = core._tempDomHoverId;

    debounceNotifyDomHover();

    e.stopPropagation();

    e.preventDefault();
  };

  document.addEventListener("mouseenter", onMouseEnter, true);

  document.addEventListener("click", onClick, true);

  document.addEventListener("mousedown", onClick, true);

  document.addEventListener("pointerdown", onClick, true);

  cb = () => {
    core._enableHoverOnBrowser = false;

    core.select.remove();

    document.removeEventListener("mouseenter", onMouseEnter, true);

    document.removeEventListener("click", onClick, true);

    document.removeEventListener("mousedown", onClick, true);

    document.removeEventListener("pointerdown", onClick, true);
  };
};

export const disableBrowserHover = (core: DevToolCore) => {
  if (!core._enableHoverOnBrowser) return;

  cb();
}
