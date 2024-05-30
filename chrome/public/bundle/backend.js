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

    chrome.runtime.onConnect.addListener(function (port) {
        console.log("[@my-react-devtool/backend] connected: ".concat(port.name));
        port.onMessage.addListener(function (message) {
            var _a, _b;
            if (message.type === MessageHookType.mount) {
                var tabId = (_b = (_a = port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id;
                if (tabId) {
                    chrome.action.setPopup({ tabId: tabId, popup: "enablePopup.html" });
                }
            }
        });
    });

})();
//# sourceMappingURL=backend.development.js.map
