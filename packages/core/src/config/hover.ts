import { getComponentFiberByDom, getPlainNodeIdByFiber } from "../tree";
import { debounce } from "../utils";

import type { DevToolCore } from "../instance";

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

  const debounceNotifyDomClick = debounce(() => {
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

    debounceNotifyDomClick();

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
};

export const setHoverStatus = (core: DevToolCore, d: boolean) => {
  if (!core.hasEnable) return;

  if (__DEV__) {
    console.log(`[@my-react-devtool/core] hoverStatus ${d ? "enable" : "disable"}`);
  }

  core._enableHover = d;
};
