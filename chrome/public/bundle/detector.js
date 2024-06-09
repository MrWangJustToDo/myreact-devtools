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
    var MessagePanelType;
    (function (MessagePanelType) {
        MessagePanelType["show"] = "panel-show";
        MessagePanelType["hide"] = "panel-hide";
        MessagePanelType["nodeHover"] = "panel-hover";
        MessagePanelType["nodeSelect"] = "panel-select";
    })(MessagePanelType || (MessagePanelType = {}));
    var MessageWorkerType;
    (function (MessageWorkerType) {
        MessageWorkerType["init"] = "worker-init";
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
                return;
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
