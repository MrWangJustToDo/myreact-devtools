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

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var event$1 = {};

    var hasRequiredEvent$1;

    function requireEvent$1 () {
    	if (hasRequiredEvent$1) return event$1;
    	hasRequiredEvent$1 = 1;
    	(function (exports) {

    		exports.MessageHookType = void 0;
    		(function (MessageHookType) {
    		    MessageHookType["init"] = "hook-init";
    		    MessageHookType["mount"] = "hook-mount";
    		    MessageHookType["render"] = "hook-render";
    		    MessageHookType["origin"] = "hook-origin";
    		    MessageHookType["clear"] = "hook-clear";
    		})(exports.MessageHookType || (exports.MessageHookType = {}));
    		exports.MessageDetectorType = void 0;
    		(function (MessageDetectorType) {
    		    MessageDetectorType["init"] = "detector-init";
    		})(exports.MessageDetectorType || (exports.MessageDetectorType = {}));
    		exports.MessageProxyType = void 0;
    		(function (MessageProxyType) {
    		    MessageProxyType["init"] = "proxy-init";
    		})(exports.MessageProxyType || (exports.MessageProxyType = {}));
    		exports.MessagePanelType = void 0;
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
    		    MessagePanelType["clear"] = "panel-clear";
    		    MessagePanelType["clearHMR"] = "panel-clear-hmr";
    		    MessagePanelType["clearMessage"] = "panel-clear-message";
    		    MessagePanelType["clearTrigger"] = "panel-clear-trigger";
    		})(exports.MessagePanelType || (exports.MessagePanelType = {}));
    		exports.MessageWorkerType = void 0;
    		(function (MessageWorkerType) {
    		    MessageWorkerType["init"] = "worker-init";
    		    MessageWorkerType["close"] = "worker-close";
    		})(exports.MessageWorkerType || (exports.MessageWorkerType = {}));
    		exports.DevToolMessageEnum = void 0;
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
    		    DevToolMessageEnum["record"] = "record";
    		    DevToolMessageEnum["domHover"] = "dom-hover";
    		})(exports.DevToolMessageEnum || (exports.DevToolMessageEnum = {}));
    		exports.HMRStatus = void 0;
    		(function (HMRStatus) {
    		    HMRStatus[HMRStatus["none"] = 0] = "none";
    		    HMRStatus[HMRStatus["refresh"] = 1] = "refresh";
    		    HMRStatus[HMRStatus["remount"] = 2] = "remount";
    		})(exports.HMRStatus || (exports.HMRStatus = {}));
    		var DevToolSource = "@my-react/devtool";

    		exports.DevToolSource = DevToolSource; 
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
        PortName["panel"] = "dev-tool/panel";
    })(PortName || (PortName = {}));
    var sourceFrom;
    (function (sourceFrom) {
        // message from hook script
        sourceFrom["hook"] = "hook";
        // message from proxy script
        sourceFrom["proxy"] = "proxy";
        // message from devtool panel
        sourceFrom["panel"] = "panel";
        // message from background worker
        sourceFrom["worker"] = "worker";
        // message from iframe 
        sourceFrom["iframe"] = "iframe";
        // message from socket
        sourceFrom["socket"] = "socket";
        // message from detector
        sourceFrom["detector"] = "detector";
        // message from another runtime engine
        sourceFrom["forward"] = "forward";
    })(sourceFrom || (sourceFrom = {}));

    var port = null;
    // TODO avoid using window
    var panelWindow = window;
    var workerReady = false;
    var workerConnecting = false;
    // TODO use messageId to sync message
    var messageId = 0;
    var id = null;
    var hasShow = false;
    var getTabId = function () { return chrome.devtools.inspectedWindow.tabId; };
    var agentIdMap = new Map();
    var runWhenWorkerReady = function (fn, count) {
        clearTimeout(id);
        if (workerReady) {
            fn();
        }
        else {
            if (!workerConnecting) {
                initPort();
            }
            if (count && count > 10) {
                return;
            }
            id = setTimeout(function () { return runWhenWorkerReady(fn, count ? count + 1 : 1); }, 1000);
        }
    };
    var showPanel = function (onShow, onHide) {
        return new Promise(function (resolve) {
            chrome.devtools.panels.create("@my-react", "", "devTool.html", function (panel) {
                var f1 = function (_window) {
                    onShow(_window);
                    resolve({ window: _window, panel: panel });
                };
                panel.onShown.addListener(f1);
                var f2 = function () {
                    onHide();
                };
                panel.onHidden.addListener(f2);
            });
        });
    };
    var sendMessage = function (data, withAgentId) {
        if (withAgentId === void 0) { withAgentId = true; }
        runWhenWorkerReady(function () {
            port === null || port === void 0 ? void 0 : port.postMessage(__assign(__assign({}, data), { _messageId: messageId++, from: sourceFrom.panel, to: sourceFrom.hook, agentId: withAgentId ? agentIdMap.get(getTabId()) : undefined }));
        });
    };
    var onRender = function (data, _window) {
        var _a;
        if (!hasShow)
            return;
        (_a = _window.onRender) === null || _a === void 0 ? void 0 : _a.call(_window, data);
    };
    var initPort = function () {
        if (!panelWindow || !panelWindow.useConnect || typeof panelWindow.useConnect.getActions !== "function") {
            return;
        }
        workerConnecting = true;
        var _a = panelWindow.useConnect.getActions(), disconnect = _a.disconnect, setConnectHandler = _a.setConnectHandler;
        setConnectHandler(function () { return initPort(); });
        port = chrome.runtime.connect({ name: getTabId().toString() });
        var onMessage = function (message) {
            var _a, _b, _c, _d, _e;
            if (!hasShow)
                return;
            if (message.to !== sourceFrom.panel)
                return;
            workerConnecting = false;
            if (!workerReady && message.type === eventExports.MessageWorkerType.init) {
                workerReady = true;
                panelWindow.useConnect.getActions().connect();
            }
            if ((message === null || message === void 0 ? void 0 : message.type) === eventExports.MessageHookType.clear) {
                var currentAgentId = agentIdMap.get(getTabId());
                if (currentAgentId && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.agentId) === currentAgentId)
                    return;
                if (currentAgentId && ((_b = message.data) === null || _b === void 0 ? void 0 : _b.agentId) && ((_c = message.data) === null || _c === void 0 ? void 0 : _c.force)) {
                    agentIdMap.set(getTabId(), message.data.agentId);
                }
                else if ((_d = message.data) === null || _d === void 0 ? void 0 : _d.agentId) {
                    agentIdMap.set(getTabId(), message.data.agentId);
                }
                clear === null || clear === void 0 ? void 0 : clear();
                return;
            }
            if ((message === null || message === void 0 ? void 0 : message.type) === eventExports.MessageHookType.render) {
                var currentAgentId = agentIdMap.get(getTabId());
                if (!currentAgentId && ((_e = message.data) === null || _e === void 0 ? void 0 : _e.agentId)) {
                    agentIdMap.set(getTabId(), message.data.agentId);
                }
                if (currentAgentId && message.data.agentId !== currentAgentId)
                    return;
                onRender(message.data, panelWindow);
            }
        };
        var onDisconnect = function () {
            var _a, _b;
            (_b = (_a = port === null || port === void 0 ? void 0 : port.onMessage) === null || _a === void 0 ? void 0 : _a.removeListener) === null || _b === void 0 ? void 0 : _b.call(_a, onMessage);
            disconnect();
            port = null;
            workerReady = false;
            workerConnecting = false;
        };
        sendMessage({ type: eventExports.MessagePanelType.show }, false);
        port.onMessage.addListener(onMessage);
        port.onDisconnect.addListener(onDisconnect);
    };
    var init = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var unsubscribe_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    unsubscribe_1 = function () { };
                    return [4 /*yield*/, showPanel(function (window) {
                            hasShow = true;
                            panelWindow = window;
                            sendMessage({ type: eventExports.MessagePanelType.show }, false);
                            unsubscribe_1 = panelWindow.onListener(sendMessage);
                        }, function () {
                            sendMessage({ type: eventExports.MessagePanelType.hide });
                            unsubscribe_1();
                            hasShow = false;
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var clear = function () {
        var _a;
        (_a = panelWindow === null || panelWindow === void 0 ? void 0 : panelWindow.onClear) === null || _a === void 0 ? void 0 : _a.call(panelWindow);
    };
    init(getTabId());
    chrome.devtools.network.onNavigated.addListener(function () {
        clear();
        // 不会触发onShow事件 ？
        init(getTabId());
        // TODO! fix this
        setTimeout(function () {
            sendMessage({ type: eventExports.MessagePanelType.clear });
            if (hasShow)
                sendMessage({ type: eventExports.MessagePanelType.show }, false);
        }, 60);
    });

})();
