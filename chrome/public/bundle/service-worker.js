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
        MessageWorkerType["close"] = "worker-close";
    })(MessageWorkerType || (MessageWorkerType = {}));
    var PortName;
    (function (PortName) {
        PortName["proxy"] = "dev-tool/proxy";
        PortName["panel"] = "dev-tool/panel";
    })(PortName || (PortName = {}));
    var sourceFrom;
    (function (sourceFrom) {
        sourceFrom["hook"] = "hook";
        sourceFrom["proxy"] = "proxy";
        sourceFrom["panel"] = "panel";
        sourceFrom["worker"] = "worker";
        sourceFrom["detector"] = "detector";
    })(sourceFrom || (sourceFrom = {}));

    var hub = {};
    function isNumeric(str) {
        return "".concat(+str) === str;
    }
    var installProxy = function (tabId) {
        chrome.scripting.executeScript({ target: { tabId: tabId }, files: ["bundle/proxy.js"] }).then(function (res) {
            if (res && true) {
                console.log("[@my-react-devtool/worker] install proxy success for tab: ".concat(tabId));
            }
        });
    };
    var portPip = function (id, port1, port2) {
        var onMessagePort1 = function (message) {
            if (message.from === sourceFrom.panel)
                return;
            {
                console.log("[@my-react-devtool/worker] message from hook: ".concat(id), message);
            }
            port2.postMessage(message);
        };
        var onMessagePort2 = function (message) {
            if (message.from === sourceFrom.hook)
                return;
            {
                console.log("[@my-react-devtool/worker] message from panel: ".concat(id), message);
            }
            port1.postMessage(message);
        };
        function shutdown() {
            port1.onMessage.removeListener(onMessagePort1);
            port2.onMessage.removeListener(onMessagePort2);
            port1.disconnect();
            port2.disconnect();
            hub[id] = null;
        }
        port1.onMessage.addListener(onMessagePort1);
        port2.onMessage.addListener(onMessagePort2);
        port1.onDisconnect.addListener(shutdown);
        port2.onDisconnect.addListener(shutdown);
        port1.postMessage({ type: MessageWorkerType.init });
        port2.postMessage({ type: MessageWorkerType.init });
        {
            console.log("[@my-react-devtool/worker] connected: ".concat(id));
        }
    };
    // forward message devtool -> proxy -> page
    // or page -> proxy -> devtool
    chrome.runtime.onConnect.addListener(function (port) {
        var _a, _b, _c;
        var portName = port.name;
        var type = "proxy";
        if (isNumeric(portName)) {
            type = "devtool";
            installProxy(+portName);
        }
        else {
            portName = (_c = (_b = (_a = port.sender) === null || _a === void 0 ? void 0 : _a.tab) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString();
            type = "proxy";
        }
        {
            console.log("[@my-react-devtool/worker] pre connect: ".concat(portName));
        }
        if (!hub[portName]) {
            hub[portName] = { proxy: null, devtool: null };
        }
        hub[portName][type] = port;
        if (hub[portName].proxy && hub[portName].devtool) {
            portPip(portName, hub[portName].proxy, hub[portName].devtool);
        }
    });
    chrome.runtime.onMessage.addListener(function (message, sender) {
        var _a;
        if (((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id) && message.type === MessageHookType.mount) {
            chrome.action.setPopup({ tabId: sender.tab.id, popup: "enablePopup.html" });
        }
    });

})();
//# sourceMappingURL=service-worker.development.js.map
