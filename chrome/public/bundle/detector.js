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
    var DevToolSource = "@my-react/devtool";

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

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var windowPostMessageWithSource = function (message) {
        window.postMessage(__assign(__assign({}, message), { source: DevToolSource }), "*");
    };

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
        var _a, _b, _c;
        if (message.source !== window)
            return;
        if (((_a = message.data) === null || _a === void 0 ? void 0 : _a.source) !== DevToolSource)
            return;
        if (!hookReady && ((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === MessageHookType.init) {
            {
                console.log("[@my-react-devtool/detector] hook init");
            }
            hookReady = true;
            windowPostMessageWithSource({ type: MessageDetectorType.init });
        }
        if (((_c = message.data) === null || _c === void 0 ? void 0 : _c.type) === MessageHookType.mount) {
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
