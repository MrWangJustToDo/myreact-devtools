(function () {
    'use strict';

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

    var generatePostMessageWithSource = function (from) {
        return function (message) {
            if (typeof window === "undefined")
                return;
            var _message = __assign({}, message);
            if (_message.from && _message.forward) {
                _message.forward += "->".concat(from);
            }
            else if (_message.from) {
                if (_message.from !== from) {
                    _message.forward = from;
                }
            }
            else {
                _message.from = from;
            }
            window.postMessage(__assign(__assign({}, _message), { source: eventExports.DevToolSource }), "*");
        };
    };

    var hookReady = false;
    var detectorPostMessageWithSource = generatePostMessageWithSource(sourceFrom.detector);
    var id = null;
    var runWhenHookReady = function (fn, count) {
        clearTimeout(id);
        if (hookReady) {
            fn();
        }
        else {
            if (count && count > 10) {
                return;
            }
            id = setTimeout(function () { return runWhenHookReady(fn, count ? count + 1 : 1); }, 1000);
        }
    };
    // message from hook
    var onMessageFromHook = function (message) {
        var _a, _b, _c;
        if (message.source !== window)
            return;
        if (((_a = message.data) === null || _a === void 0 ? void 0 : _a.source) !== eventExports.DevToolSource)
            return;
        if (message.data.to !== sourceFrom.detector)
            return;
        if (!hookReady && ((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === eventExports.MessageHookType.init) {
            hookReady = true;
            detectorPostMessageWithSource({ type: eventExports.MessageDetectorType.init, to: sourceFrom.hook });
        }
        if (((_c = message.data) === null || _c === void 0 ? void 0 : _c.type) === eventExports.MessageHookType.mount) {
            runWhenHookReady(function () {
                var _a;
                // to background worker
                chrome.runtime.sendMessage({
                    type: message.data.type,
                    source: eventExports.DevToolSource,
                    from: sourceFrom.detector,
                    data: (_a = message.data) === null || _a === void 0 ? void 0 : _a.data,
                    to: sourceFrom.worker,
                });
            });
        }
    };
    if (typeof window !== "undefined") {
        window.addEventListener("message", onMessageFromHook);
    }

})();
