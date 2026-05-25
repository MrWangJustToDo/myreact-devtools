export type ExtensionIconData = { mode?: string } | string | undefined;

export type ExtensionActionApi = {
  setPopup: (details: { tabId: number; popup: string }, callback?: () => void) => void;
  setIcon: (details: { tabId: number; path: Record<number, string> }, callback?: () => void) => void;
};

export const resolveIconAssets = (data?: ExtensionIconData) => {
  const mode = typeof data === "string" ? data : data?.mode;

  let popup = "enablePopup.html";
  let icon48 = "icons/48-s.png";
  let icon128 = "icons/128-s.png";

  if (mode === "develop") {
    popup = "enablePopupDev.html";
    icon48 = "icons/48-s-d.png";
    icon128 = "icons/128-s-d.png";
  } else if (mode === "product") {
    popup = "enablePopupPro.html";
  }

  return { popup, icon48, icon128 };
};

export const applyExtensionIconForTab = (
  tabId: number,
  data: ExtensionIconData,
  getURL: (path: string) => string,
  action: ExtensionActionApi,
  onCallback?: () => void
) => {
  const { popup, icon48, icon128 } = resolveIconAssets(data);
  const done = onCallback ?? (() => {});

  action.setPopup({ tabId, popup: getURL(popup) }, done);
  action.setIcon(
    {
      tabId,
      path: {
        48: getURL(icon48),
        128: getURL(icon128),
      },
    },
    done
  );
};
