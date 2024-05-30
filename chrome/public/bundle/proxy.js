(function () {
    'use strict';

    var MessageHookType;
    (function (MessageHookType) {
        MessageHookType["init"] = "hook-init";
        MessageHookType["mount"] = "hook-mount";
        MessageHookType["render"] = "hook-render";
    })(MessageHookType || (MessageHookType = {}));
    var MessageProxyType;
    (function (MessageProxyType) {
        MessageProxyType["ready"] = "proxy-ready";
    })(MessageProxyType || (MessageProxyType = {}));
    var MessagePortType;
    (function (MessagePortType) {
        MessagePortType["init"] = "port-init";
    })(MessagePortType || (MessagePortType = {}));

    var hookReady = false;
    var port = null;
    var id = null;
    var runWhenHookReady = function (fn, count) {
        if (hookReady) {
            fn();
        }
        else {
            if (count > 10) {
                console.error("[@my-react-devtool/proxy] hook is not ready");
                return;
            }
            clearTimeout(id);
            id = setTimeout(function () {
                runWhenHookReady(fn, count + 1);
            }, 2000);
        }
    };
    var onMessage = function (message) {
        var _a, _b, _c;
        if (message.source !== window)
            return;
        if (!hookReady && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.type) === MessageHookType.init) {
            console.log("[@my-react-devtool/proxy] hook ready");
            hookReady = true;
            window.postMessage({ type: MessageProxyType.ready }, "*");
            port = chrome.runtime.connect({ name: "devtool" });
        }
        if (((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === MessageHookType.mount) {
            console.log("[@my-react-devtool/proxy] hook mount");
            runWhenHookReady(function () {
                port.postMessage(message.data);
            }, 1);
        }
        if (((_c = message.data) === null || _c === void 0 ? void 0 : _c.type) === MessageHookType.render) {
            console.log("[@my-react-devtool/proxy] hook render");
            runWhenHookReady(function () {
                var dataSet = message.data.data;
                // TODO
                console.log("[@my-react-devtool/proxy] render", dataSet);
            }, 1);
        }
    };
    window.addEventListener("message", onMessage);

})();
//# sourceMappingURL=proxy.development.js.map
