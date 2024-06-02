import type { MessageWorkerDataType } from "./type";

let port: chrome.runtime.Port | null = null;

const showPanel = (id: number): Promise<{ window: Window; panel: chrome.devtools.panels.ExtensionPanel }> => {
  return new Promise((resolve) => {
    if (__DEV__) {
      console.log("[@my-react-devtool/panel] create panel", id);
    }
    chrome.devtools.panels.create(`@my-react`, "", "devTool.html", (panel) => {
      const fn = (window: Window) => {
        resolve({ window, panel });
        panel.onShown.removeListener(fn);
      };
      panel.onShown.addListener(fn);
    });
  });
};

const init = async (id: number) => {
  if (id) {
    const { window } = await showPanel(id);

    console.log(window.useAppTree);

    port = chrome.runtime.connect({ name: id.toString() });

    port.onMessage.addListener((message: MessageWorkerDataType) => {
      console.log("panel message from port", message);
    });
  }
};

init(chrome.devtools.inspectedWindow.tabId);
