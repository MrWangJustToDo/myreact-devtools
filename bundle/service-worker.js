(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var event$1 = {};

    var hasRequiredEvent$1;

    function requireEvent$1 () {
    	if (hasRequiredEvent$1) return event$1;
    	hasRequiredEvent$1 = 1;
    	(function (exports$1) {

    		exports$1.MessageHookType = void 0;
    		(function (MessageHookType) {
    		    MessageHookType["init"] = "hook-init";
    		    MessageHookType["mount"] = "hook-mount";
    		    MessageHookType["render"] = "hook-render";
    		    MessageHookType["origin"] = "hook-origin";
    		    MessageHookType["clear"] = "hook-clear";
    		})(exports$1.MessageHookType || (exports$1.MessageHookType = {}));
    		exports$1.MessageDetectorType = void 0;
    		(function (MessageDetectorType) {
    		    MessageDetectorType["init"] = "detector-init";
    		})(exports$1.MessageDetectorType || (exports$1.MessageDetectorType = {}));
    		exports$1.MessageProxyType = void 0;
    		(function (MessageProxyType) {
    		    MessageProxyType["init"] = "proxy-init";
    		})(exports$1.MessageProxyType || (exports$1.MessageProxyType = {}));
    		exports$1.MessagePanelType = void 0;
    		(function (MessagePanelType) {
    		    MessagePanelType["show"] = "panel-show";
    		    MessagePanelType["hide"] = "panel-hide";
    		    MessagePanelType["varStore"] = "panel-var-store";
    		    MessagePanelType["varSource"] = "panel-var-source";
    		    MessagePanelType["enableHover"] = "panel-enable-hover";
    		    MessagePanelType["enableUpdate"] = "panel-enable-update";
    		    MessagePanelType["enableRetrigger"] = "panel-enable-retrigger";
    		    MessagePanelType["enableHoverOnBrowser"] = "panel-enable-hover-on-browser";
    		    MessagePanelType["enableRecord"] = "panel-enable-record";
    		    MessagePanelType["nodeHover"] = "panel-hover";
    		    MessagePanelType["nodeSelect"] = "panel-select";
    		    MessagePanelType["nodeStore"] = "panel-store";
    		    MessagePanelType["nodeEditor"] = "panel-editor";
    		    MessagePanelType["nodeTrigger"] = "panel-trigger";
    		    MessagePanelType["nodeInspect"] = "panel-inspect";
    		    MessagePanelType["chunks"] = "panel-chunks";
    		    MessagePanelType["global"] = "panel-global";
    		    MessagePanelType["clear"] = "panel-clear";
    		    MessagePanelType["clearHMR"] = "panel-clear-hmr";
    		    MessagePanelType["clearMessage"] = "panel-clear-message";
    		    MessagePanelType["clearTrigger"] = "panel-clear-trigger";
    		    MessagePanelType["clearConsole"] = "panel-clear-console";
    		})(exports$1.MessagePanelType || (exports$1.MessagePanelType = {}));
    		exports$1.MessageWorkerType = void 0;
    		(function (MessageWorkerType) {
    		    MessageWorkerType["init"] = "worker-init";
    		    MessageWorkerType["close"] = "worker-close";
    		})(exports$1.MessageWorkerType || (exports$1.MessageWorkerType = {}));
    		exports$1.DevToolMessageEnum = void 0;
    		(function (DevToolMessageEnum) {
    		    // 初始化，判断是否用@my-react进行页面渲染
    		    DevToolMessageEnum["init"] = "init";
    		    DevToolMessageEnum["dir"] = "dir";
    		    DevToolMessageEnum["config"] = "config";
    		    // tree ready
    		    DevToolMessageEnum["ready"] = "ready";
    		    // tree update
    		    DevToolMessageEnum["update"] = "update";
    		    DevToolMessageEnum["changed"] = "changed";
    		    DevToolMessageEnum["highlight"] = "highlight";
    		    DevToolMessageEnum["trigger"] = "trigger";
    		    DevToolMessageEnum["running"] = "running";
    		    DevToolMessageEnum["triggerStatus"] = "triggerStatus";
    		    DevToolMessageEnum["hmr"] = "hmr";
    		    DevToolMessageEnum["hmrStatus"] = "hmrStatus";
    		    DevToolMessageEnum["hmrInternal"] = "hmrInternal";
    		    DevToolMessageEnum["source"] = "source";
    		    DevToolMessageEnum["detail"] = "detail";
    		    DevToolMessageEnum["unmount"] = "unmount";
    		    DevToolMessageEnum["unmountNode"] = "unmount-node";
    		    DevToolMessageEnum["selectSync"] = "select-sync";
    		    DevToolMessageEnum["message"] = "message";
    		    DevToolMessageEnum["warn"] = "warn";
    		    DevToolMessageEnum["warnStatus"] = "warnStatus";
    		    DevToolMessageEnum["error"] = "error";
    		    DevToolMessageEnum["errorStatus"] = "errorStatus";
    		    DevToolMessageEnum["chunks"] = "chunks";
    		    DevToolMessageEnum["global"] = "global";
    		    DevToolMessageEnum["record"] = "record";
    		    DevToolMessageEnum["console"] = "console";
    		    DevToolMessageEnum["domHover"] = "dom-hover";
    		    DevToolMessageEnum["operations"] = "operations";
    		})(exports$1.DevToolMessageEnum || (exports$1.DevToolMessageEnum = {}));
    		exports$1.HMRStatus = void 0;
    		(function (HMRStatus) {
    		    HMRStatus[HMRStatus["none"] = 0] = "none";
    		    HMRStatus[HMRStatus["refresh"] = 1] = "refresh";
    		    HMRStatus[HMRStatus["remount"] = 2] = "remount";
    		})(exports$1.HMRStatus || (exports$1.HMRStatus = {}));
    		var DevToolSource = "@my-react/devtool";

    		exports$1.DevToolSource = DevToolSource; 
    	} (event$1));
    	return event$1;
    }

    var event;
    var hasRequiredEvent;

    function requireEvent () {
    	if (hasRequiredEvent) return event;
    	hasRequiredEvent = 1;
    	event = requireEvent$1();
    	return event;
    }

    var eventExports = requireEvent();

    var PortName;
    (function (PortName) {
        PortName["proxy"] = "dev-tool/proxy";
    })(PortName || (PortName = {}));
    var sourceFrom;
    (function (sourceFrom) {
        // message from hook script, `content` dir
        sourceFrom["hook"] = "hook";
        // message from proxy script, `backend` dir
        sourceFrom["proxy"] = "proxy";
        // message from devtool panel, `panel` dir
        sourceFrom["panel"] = "panel";
        // message from background worker, `background` dir
        sourceFrom["worker"] = "worker";
        // message from iframe, chrome/src/hooks/useBridgeForward.ts (local dev bridge)
        sourceFrom["iframe"] = "iframe";
        // message from socket, chrome/src/hooks/useWebDev.ts
        sourceFrom["socket"] = "socket";
        // message from detector, `popover` dir
        sourceFrom["detector"] = "detector";
    })(sourceFrom || (sourceFrom = {}));

    var resolveIconAssets = function (data) {
        var mode = typeof data === "string" ? data : data === null || data === void 0 ? void 0 : data.mode;
        var popup = "enablePopup.html";
        var icon48 = "icons/48-s.png";
        var icon128 = "icons/128-s.png";
        if (mode === "develop") {
            popup = "enablePopupDev.html";
            icon48 = "icons/48-s-d.png";
            icon128 = "icons/128-s-d.png";
        }
        else if (mode === "product") {
            popup = "enablePopupPro.html";
        }
        return { popup: popup, icon48: icon48, icon128: icon128 };
    };
    var applyExtensionIconForTab = function (tabId, data, getURL, action, onCallback) {
        var _a = resolveIconAssets(data), popup = _a.popup, icon48 = _a.icon48, icon128 = _a.icon128;
        var done = onCallback !== null && onCallback !== void 0 ? onCallback : (function () { });
        action.setPopup({ tabId: tabId, popup: getURL(popup) }, done);
        action.setIcon({
            tabId: tabId,
            path: {
                48: getURL(icon48),
                128: getURL(icon128),
            },
        }, done);
    };

    var getExtensionRuntime = function () {
        var _a, _b, _c;
        var g = globalThis;
        return (_b = (_a = g.chrome) === null || _a === void 0 ? void 0 : _a.runtime) !== null && _b !== void 0 ? _b : (_c = g.browser) === null || _c === void 0 ? void 0 : _c.runtime;
    };
    /** Consume chrome.runtime.lastError after a port disconnect (required by Chrome). */
    var consumeRuntimeLastError = function () {
        var _a;
        void ((_a = getExtensionRuntime()) === null || _a === void 0 ? void 0 : _a.lastError);
    };

    var setExtensionIconForTab = function (tabId, data) {
        applyExtensionIconForTab(tabId, data, chrome.runtime.getURL, chrome.action, consumeRuntimeLastError);
    };

    var hub = {};
    function isNumeric(str) {
        return "".concat(+str) === str;
    }
    var installProxy = function (tabId) {
        chrome.scripting
            .executeScript({ target: { tabId: tabId }, files: ["bundle/proxy.js"] })
            .then(function (res) {
        })
            .catch(function (err) {
        });
    };
    var portPip = function (id, port1, port2) {
        var onMessagePort1 = function (message) {
            port2.postMessage(__assign({}, message));
        };
        var onMessagePort2 = function (message) {
            port1.postMessage(__assign({}, message));
        };
        var isShutdown = false;
        function shutdown() {
            if (isShutdown)
                return;
            isShutdown = true;
            try {
                port1.onMessage.removeListener(onMessagePort1);
            }
            catch (_a) {
                /* already disconnected */
            }
            try {
                port2.onMessage.removeListener(onMessagePort2);
            }
            catch (_b) {
                /* already disconnected */
            }
            try {
                port1.disconnect();
            }
            catch (_c) {
                /* already disconnected */
            }
            try {
                port2.disconnect();
            }
            catch (_d) {
                /* already disconnected */
            }
            hub[id] = null;
        }
        port1.onMessage.addListener(onMessagePort1);
        port2.onMessage.addListener(onMessagePort2);
        port1.onDisconnect.addListener(shutdown);
        port2.onDisconnect.addListener(shutdown);
        port1.postMessage({ type: eventExports.MessageWorkerType.init, from: sourceFrom.worker, to: sourceFrom.hook, source: eventExports.DevToolSource });
        port2.postMessage({ type: eventExports.MessageWorkerType.init, from: sourceFrom.worker, to: sourceFrom.panel, source: eventExports.DevToolSource });
    };
    // forward message devtool -> worker -> proxy -> page
    // or page -> proxy -> worker -> devtool
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
        if (!hub[portName]) {
            hub[portName] = { proxy: null, devtool: null };
        }
        hub[portName][type] = port;
        if (hub[portName].proxy && hub[portName].devtool) {
            portPip(portName, hub[portName].proxy, hub[portName].devtool);
        }
    });
    // Reset the icon to default (disabled) state when a tab navigates,
    // before the detector has a chance to re-detect @my-react on the new page.
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
        if (changeInfo.status === "loading") {
            try {
                chrome.action.setPopup({
                    tabId: tabId,
                    popup: chrome.runtime.getURL("disablePopup.html"),
                });
                chrome.action.setIcon({
                    tabId: tabId,
                    path: {
                        48: chrome.runtime.getURL("icons/48.png"),
                        128: chrome.runtime.getURL("icons/128.png"),
                    },
                });
            }
            catch (_a) {
                // tab may have been closed
            }
        }
    });
    // from detector, change the extension icon and popup page
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        var _a;
        if (message.from !== sourceFrom.detector)
            return;
        if (message.to !== sourceFrom.worker) {
            return;
        }
        if (((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id) && message.type === eventExports.MessageHookType.mount) {
            setExtensionIconForTab(sender.tab.id, message.data);
        }
        sendResponse({ ok: true });
    });

})();
