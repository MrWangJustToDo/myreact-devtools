import { MessageHookType } from "./type";

import type { MessageHookDataType} from "./type";

chrome.runtime.onConnect.addListener((port) => {
  console.log(`[@my-react-devtool/backend] connected: ${port.name}`);

  port.onMessage.addListener((message: MessageHookDataType) => {
    if (message.type === MessageHookType.mount) {
      const tabId = port.sender?.tab?.id;
      if (tabId) {
        chrome.action.setPopup({ tabId, popup: "enablePopup.html" });
      }
    }
  });
});
