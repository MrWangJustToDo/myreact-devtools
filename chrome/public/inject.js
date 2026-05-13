const script = document.createElement("script");

const runtime = (typeof browser !== "undefined" && browser.runtime) || chrome.runtime;

script.src = runtime.getURL("bundle/hook.js");

script.onload = () => {
  script.remove();
};

if (!window["__MY_REACT_DEVTOOL_RUNTIME__"]) {
  (document.head || document.documentElement).appendChild(script);
}
