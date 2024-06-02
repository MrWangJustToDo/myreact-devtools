(function () {
    'use strict';

    var MessageHookType;
    (function (MessageHookType) {
        MessageHookType["init"] = "hook-init";
        MessageHookType["mount"] = "hook-mount";
        MessageHookType["render"] = "hook-render";
    })(MessageHookType || (MessageHookType = {}));
    var MessageDetectorType;
    (function (MessageDetectorType) {
        MessageDetectorType["init"] = "detector-init";
    })(MessageDetectorType || (MessageDetectorType = {}));
    var MessageProxyType;
    (function (MessageProxyType) {
        MessageProxyType["ready"] = "proxy-ready";
        MessageProxyType["unmount"] = "proxy-unmount";
        MessageProxyType["forward"] = "proxy-forward";
    })(MessageProxyType || (MessageProxyType = {}));
    var MessagePanelType;
    (function (MessagePanelType) {
        MessagePanelType["show"] = "panel-show";
        MessagePanelType["hide"] = "panel-hide";
    })(MessagePanelType || (MessagePanelType = {}));
    var MessageWorkerType;
    (function (MessageWorkerType) {
        MessageWorkerType["forward"] = "worker-forward";
    })(MessageWorkerType || (MessageWorkerType = {}));
    var PortName;
    (function (PortName) {
        PortName["proxy"] = "dev-tool/proxy";
        PortName["panel"] = "dev-tool/panel";
    })(PortName || (PortName = {}));

    var hookReady = false;
    var id = null;
    var runWhenHookReady = function (fn, count) {
        clearTimeout(id);
        if (hookReady) {
            fn();
        }
        else {
            if (count && count > 10) {
                {
                    console.error("[@my-react-devtool/detector] hook not ready");
                }
            }
            id = setTimeout(function () { return runWhenHookReady(fn, count ? count + 1 : 1); }, 2000);
        }
    };
    var onMessage = function (message) {
        var _a, _b;
        if (message.source !== window)
            return;
        if (!hookReady && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.type) === MessageHookType.init) {
            {
                console.log("[@my-react-devtool/detector] hook init");
            }
            hookReady = true;
            window.postMessage({ type: MessageDetectorType.init }, "*");
        }
        if (((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === MessageHookType.mount) {
            runWhenHookReady(function () {
                {
                    console.log("[@my-react-devtool/detector] hook mount");
                }
                chrome.runtime.sendMessage({ type: MessageHookType.mount });
            });
        }
    };
    window.addEventListener("message", onMessage);

})();
//# sourceMappingURL=detector.development.js.map
