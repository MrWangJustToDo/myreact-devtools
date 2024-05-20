const port = chrome.runtime.connect({ name: "content-script" });

const messageKeyToContent = "__@my-react/dev/content__";

const messageKeyToExtension = "__@my-react/dev/extension__";

console.log("proxy.js run");

const onMessage = (_data) => {
  const data = _data.data;
  if (data?.key === messageKeyToExtension) {
    console.log("content", data);
    port.postMessage(data.data);
  }
};

window.addEventListener("message", onMessage);
