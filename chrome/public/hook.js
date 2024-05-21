const dispatchArray = new Set();

const currentExtensionId = {
  current: "",
};

const version = "0.0.1";

const messageKeyToContent = "__@my-react/dev/content__";

const messageKeyToExtension = "__@my-react/dev/extension__";

const postDispatchToContentScript = (data) => {
  window.postMessage({ key: messageKeyToContent, data }, "*");
};

const postDispatchToExtension = (data) => {
  window.postMessage({ key: messageKeyToExtension, data }, "*");
};

const globalHook = (_dispatch) => {
};

globalHook.version = version;

if (window.parent && window.parent !== window) {
  console.warn("currently the @my-react extension does not support iframes.");
} else {
  window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
  postDispatchToContentScript({ type: "init", data: { version } });
}
