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
    /* global Reflect, Promise, SuppressedError, Symbol */


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
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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

    var port = null;
    var workerReady = false;
    var messageId = 0;
    var id = null;
    var runWhenWorkerReady = function (fn, count) {
        clearTimeout(id);
        if (workerReady) {
            fn();
        }
        else {
            if (count && count > 10) {
                {
                    console.error("[@my-react-devtool/panel] worker not ready");
                }
                return;
            }
            id = setTimeout(function () { return runWhenWorkerReady(fn, count ? count + 1 : 1); }, 2000);
        }
    };
    var showPanel = function (id) {
        return new Promise(function (resolve) {
            {
                console.log("[@my-react-devtool/panel] create panel", id);
            }
            chrome.devtools.panels.create("@my-react", "", "devTool.html", function (panel) {
                var f1 = function (window) {
                    resolve({ window: window, panel: panel });
                    panel.onShown.removeListener(f1);
                };
                panel.onShown.addListener(f1);
                var f2 = function () {
                    workerReady = false;
                    panel.onHidden.removeListener(f2);
                };
                panel.onHidden.addListener(f2);
            });
        });
    };
    var sendMessage = function (data) {
        runWhenWorkerReady(function () {
            port === null || port === void 0 ? void 0 : port.postMessage(__assign(__assign({}, data), { _messageId: messageId++ }));
        });
    };
    var onMessage = function (message) {
        var _a;
        {
            console.log("[@my-react-devtool/panel] message from port", message);
        }
        if (!workerReady && message.type === MessageWorkerType.init) {
            workerReady = true;
        }
        if ((message === null || message === void 0 ? void 0 : message.type) === MessageHookType.render) {
            var data = (_a = message.data) === null || _a === void 0 ? void 0 : _a.data;
            var addNode = window.useAppTree.getActions().addNode;
            if (data) {
                addNode(data);
            }
        }
    };
    // const onRender = ()
    var init = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var onDisconnect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, showPanel(id)];
                case 1:
                    (_a.sent()).window;
                    port = chrome.runtime.connect({ name: id.toString() });
                    onDisconnect = function () {
                        port.onMessage.removeListener(onMessage);
                    };
                    port.onMessage.addListener(onMessage);
                    port.onDisconnect.addListener(onDisconnect);
                    sendMessage({ type: MessagePanelType.show });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    init(chrome.devtools.inspectedWindow.tabId);

})();
//# sourceMappingURL=panel.development.js.map
