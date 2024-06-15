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

    var port = chrome.runtime.connect({ name: PortName.proxy });
    var sendMessageToBackend = function (message) {
        window.postMessage(message, "*");
    };
    var sendMessageToPanel = function (message) {
        var _a, _b, _c;
        if (message.source !== window)
            return;
        if (((_a = message.data) === null || _a === void 0 ? void 0 : _a.type) === MessageHookType.mount || ((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === MessageHookType.render || ((_c = message.data) === null || _c === void 0 ? void 0 : _c.type) === MessageHookType.init) {
            port.postMessage(message.data);
        }
    };
    var handleDisconnect = function () {
        port.onMessage.removeListener(sendMessageToBackend);
        window.removeEventListener("message", sendMessageToPanel);
    };
    port.onMessage.addListener(sendMessageToBackend);
    port.onDisconnect.addListener(handleDisconnect);
    window.addEventListener("message", sendMessageToPanel);

})();
//# sourceMappingURL=proxy.development.js.map
