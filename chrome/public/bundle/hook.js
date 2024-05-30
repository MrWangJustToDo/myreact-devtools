(function (exports) {
    'use strict';

    var core$1 = {exports: {}};

    var index_development = {};

    var hasRequiredIndex_development;

    function requireIndex_development () {
    	if (hasRequiredIndex_development) return index_development;
    	hasRequiredIndex_development = 1;

    	var id = 0;
    	// PlainNode is a simplified version of FiberNode just for show the structure
    	var PlainNode = /** @class */ (function () {
    	    function PlainNode() {
    	        this.uuid = "".concat(id++, "--fiber");
    	    }
    	    return PlainNode;
    	}());

    	var NODE_TYPE;
    	(function (NODE_TYPE) {
    	    NODE_TYPE[NODE_TYPE["__initial__"] = 0] = "__initial__";
    	    NODE_TYPE[NODE_TYPE["__class__"] = 1] = "__class__";
    	    NODE_TYPE[NODE_TYPE["__function__"] = 2] = "__function__";
    	    NODE_TYPE[NODE_TYPE["__lazy__"] = 4] = "__lazy__";
    	    NODE_TYPE[NODE_TYPE["__memo__"] = 8] = "__memo__";
    	    NODE_TYPE[NODE_TYPE["__forwardRef__"] = 16] = "__forwardRef__";
    	    NODE_TYPE[NODE_TYPE["__provider__"] = 32] = "__provider__";
    	    NODE_TYPE[NODE_TYPE["__consumer__"] = 64] = "__consumer__";
    	    NODE_TYPE[NODE_TYPE["__portal__"] = 128] = "__portal__";
    	    NODE_TYPE[NODE_TYPE["__null__"] = 256] = "__null__";
    	    NODE_TYPE[NODE_TYPE["__text__"] = 512] = "__text__";
    	    NODE_TYPE[NODE_TYPE["__empty__"] = 1024] = "__empty__";
    	    NODE_TYPE[NODE_TYPE["__plain__"] = 2048] = "__plain__";
    	    NODE_TYPE[NODE_TYPE["__strict__"] = 4096] = "__strict__";
    	    NODE_TYPE[NODE_TYPE["__suspense__"] = 8192] = "__suspense__";
    	    NODE_TYPE[NODE_TYPE["__fragment__"] = 16384] = "__fragment__";
    	    NODE_TYPE[NODE_TYPE["__keepLive__"] = 32768] = "__keepLive__";
    	    NODE_TYPE[NODE_TYPE["__scope__"] = 65536] = "__scope__";
    	    NODE_TYPE[NODE_TYPE["__comment__"] = 131072] = "__comment__";
    	    NODE_TYPE[NODE_TYPE["__profiler__"] = 262144] = "__profiler__";
    	})(NODE_TYPE || (NODE_TYPE = {}));

    	var getFiberName = function (fiber) {
    	    var _a, _b;
    	    var typedFiber = fiber;
    	    if (fiber.type & NODE_TYPE.__memo__) {
    	        var targetRender = fiber.elementType;
    	        var name_1 = "";
    	        var res = "memo";
    	        if (fiber.type & NODE_TYPE.__provider__) {
    	            var typedTargetRender = fiber.elementType;
    	            name_1 = typedTargetRender.Context.displayName || "anonymous" + "-" + typedTargetRender.Context.contextId;
    	            res += "-provider";
    	        }
    	        else if (fiber.type & NODE_TYPE.__consumer__) {
    	            var typedTargetRender = fiber.elementType;
    	            name_1 = typedTargetRender.Context.displayName || "anonymous" + "-" + typedTargetRender.Context.contextId;
    	            res += "-consumer";
    	        }
    	        else if (typeof targetRender === "function") {
    	            name_1 = (targetRender === null || targetRender === void 0 ? void 0 : targetRender.displayName) || (targetRender === null || targetRender === void 0 ? void 0 : targetRender.name) || name_1;
    	        }
    	        if (typedFiber._debugElement) {
    	            var element = typedFiber._debugElement;
    	            var type = element.type;
    	            name_1 = type.displayName || name_1;
    	        }
    	        if (fiber.type & NODE_TYPE.__forwardRef__) {
    	            res += "-forwardRef";
    	        }
    	        return "".concat(name_1 ? name_1 : "anonymous", " - (").concat(res, ")");
    	    }
    	    if (fiber.type & NODE_TYPE.__lazy__) {
    	        var typedElementType = fiber.elementType;
    	        var typedRender = typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.render;
    	        var name_2 = (typedRender === null || typedRender === void 0 ? void 0 : typedRender.displayName) || (typedRender === null || typedRender === void 0 ? void 0 : typedRender.name) || "";
    	        if (typedFiber._debugElement) {
    	            var element = typedFiber._debugElement;
    	            var type = element.type;
    	            name_2 = type.displayName || name_2;
    	        }
    	        return "".concat(name_2 ? name_2 : "anonymous", " - (lazy)");
    	    }
    	    if (fiber.type & NODE_TYPE.__portal__)
    	        return "Portal";
    	    if (fiber.type & NODE_TYPE.__null__)
    	        return "Null";
    	    if (fiber.type & NODE_TYPE.__empty__)
    	        return "Empty";
    	    if (fiber.type & NODE_TYPE.__scope__)
    	        return "Scope";
    	    if (fiber.type & NODE_TYPE.__strict__)
    	        return "Strict";
    	    if (fiber.type & NODE_TYPE.__profiler__)
    	        return "Profiler";
    	    if (fiber.type & NODE_TYPE.__suspense__)
    	        return "Suspense";
    	    if (fiber.type & NODE_TYPE.__fragment__) {
    	        if (fiber.pendingProps["wrap"])
    	            return "Fragment - (auto-wrap)";
    	        return "Fragment";
    	    }
    	    if (fiber.type & NODE_TYPE.__keepLive__)
    	        return "KeepAlive";
    	    if (fiber.type & NODE_TYPE.__provider__) {
    	        var typedElementType = fiber.elementType;
    	        var name_3 = typedElementType.Context.displayName;
    	        return "".concat(name_3 ? name_3 : "anonymous" + "-" + typedElementType.Context.contextId, " - (provider)");
    	    }
    	    if (fiber.type & NODE_TYPE.__consumer__) {
    	        var typedElementType = fiber.elementType;
    	        var name_4 = typedElementType.Context.displayName;
    	        return "".concat(name_4 ? name_4 : "anonymous" + "-" + typedElementType.Context.contextId, " - (consumer)");
    	    }
    	    if (fiber.type & NODE_TYPE.__comment__)
    	        return "Comment";
    	    if (fiber.type & NODE_TYPE.__forwardRef__) {
    	        var targetRender = fiber.elementType;
    	        var name_5 = (targetRender === null || targetRender === void 0 ? void 0 : targetRender.displayName) || (targetRender === null || targetRender === void 0 ? void 0 : targetRender.name) || "";
    	        if (typedFiber._debugElement) {
    	            var element = typedFiber._debugElement;
    	            var type = element.type;
    	            name_5 = type.displayName || name_5;
    	        }
    	        return "".concat(name_5 ? name_5 : "anonymous", " - (forwardRef)");
    	    }
    	    if (typeof fiber.elementType === "function") {
    	        var typedElementType = fiber.elementType;
    	        var name_6 = typedElementType.displayName || typedElementType.name || "anonymous";
    	        return "".concat(name_6);
    	    }
    	    if (fiber.type & NODE_TYPE.__text__)
    	        return "text (".concat((_a = fiber.elementType) === null || _a === void 0 ? void 0 : _a.toString(), ")");
    	    if (typeof fiber.elementType === "string")
    	        return "".concat(fiber.elementType);
    	    return "unknown (".concat((_b = fiber.elementType) === null || _b === void 0 ? void 0 : _b.toString(), ")");
    	};

    	var map = new Map();
    	var store = new Map();
    	var assignFiber = function (plain, fiber) {
    	    plain.name = getFiberName(fiber);
    	    plain.key = fiber.key;
    	    plain.type = fiber.type;
    	    // plain.ref = safeCloneRef(fiber.ref);
    	    // plain.props = safeClone(fiber.pendingProps);
    	};
    	var loopFiber = function (fiber, parent, previous) {
    	    if (!fiber)
    	        return null;
    	    var exist = map.get(fiber);
    	    var current = exist || new PlainNode();
    	    if (parent) {
    	        parent.child = parent.child || current;
    	    }
    	    if (previous) {
    	        previous.sibling = current;
    	    }
    	    assignFiber(current, fiber);
    	    map.set(fiber, current);
    	    store.set(current.uuid, fiber);
    	    if (fiber.child) {
    	        loopFiber(fiber.child, current);
    	    }
    	    if (fiber.sibling) {
    	        loopFiber(fiber.sibling, parent, current);
    	    }
    	    return current;
    	};
    	var generateFiberTreeToPlainTree = function (dispatch) {
    	    var rootFiber = dispatch.rootFiber;
    	    var rootPlain = loopFiber(rootFiber);
    	    return rootPlain;
    	};
    	var unmountPlainNode = function (fiber) {
    	    var plain = map.get(fiber);
    	    if (plain) {
    	        plain.child = null;
    	        plain.sibling = null;
    	        store.delete(plain.uuid);
    	    }
    	    map.delete(fiber);
    	};

    	function overridePatchToFiberUnmount(dispatch) {
    	    var originalPatchUnmount = dispatch.patchToFiberUnmount;
    	    dispatch.patchToFiberUnmount = function (fiber) {
    	        originalPatchUnmount.call(this, fiber);
    	        unmountPlainNode(fiber);
    	    };
    	}
    	var setupDispatch = function (dispatch) {
    	    if (dispatch.hasInject)
    	        return;
    	    dispatch.hasInject = true;
    	    overridePatchToFiberUnmount(dispatch);
    	};

    	var MessageType;
    	(function (MessageType) {
    	    MessageType["init"] = "init";
    	    MessageType["update"] = "update";
    	    MessageType["detail"] = "detail";
    	    MessageType["unmount"] = "unmount";
    	})(MessageType || (MessageType = {}));
    	var DevToolCore = /** @class */ (function () {
    	    function DevToolCore() {
    	        this._dispatch = new Set();
    	        this._map = new Map();
    	        this._listeners = new Set();
    	    }
    	    DevToolCore.prototype.getDispatch = function () {
    	        return Array.from(this._dispatch);
    	    };
    	    DevToolCore.prototype.addDispatch = function (dispatch) {
    	        var _this = this;
    	        setupDispatch(dispatch);
    	        this._dispatch.add(dispatch);
    	        var originalAfterCommit = dispatch.afterCommit;
    	        var onLoad = function () {
    	            var tree = generateFiberTreeToPlainTree(dispatch);
    	            _this._map.set(dispatch, tree);
    	            _this.notify({ type: MessageType.init, data: tree });
    	        };
    	        dispatch.afterCommit = function () {
    	            var _a;
    	            (_a = originalAfterCommit === null || originalAfterCommit === void 0 ? void 0 : originalAfterCommit.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterCommit, this);
    	            onLoad();
    	        };
    	    };
    	    DevToolCore.prototype.hasDispatch = function (dispatch) {
    	        return this._dispatch.has(dispatch);
    	    };
    	    DevToolCore.prototype.delDispatch = function (dispatch) {
    	        var tree = this._map.get(dispatch);
    	        this._map.delete(dispatch);
    	        this._dispatch.delete(dispatch);
    	        this.notify({ type: MessageType.unmount, data: tree });
    	    };
    	    DevToolCore.prototype.subscribe = function (listener) {
    	        var _this = this;
    	        this._listeners.add(listener);
    	        return function () { return _this._listeners.delete(listener); };
    	    };
    	    DevToolCore.prototype.unSubscribe = function (listener) {
    	        this._listeners.delete(listener);
    	    };
    	    DevToolCore.prototype.notify = function (data) {
    	        this._listeners.forEach(function (listener) { return listener(data); });
    	    };
    	    DevToolCore.prototype.getTree = function (dispatch) {
    	        var tree = generateFiberTreeToPlainTree(dispatch);
    	        this._map.set(dispatch, tree);
    	        return tree;
    	    };
    	    return DevToolCore;
    	}());

    	index_development.DevToolCore = DevToolCore;
    	
    	return index_development;
    }

    {
      core$1.exports = requireIndex_development();
    }

    var coreExports = core$1.exports;

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

    var core = new coreExports.DevToolCore();
    var proxyReady = false;
    var onMessage = function (message) {
        if (!proxyReady && message.data.type === MessageProxyType.ready) {
            console.log("[@my-react-devtool/hook] proxy ready");
            proxyReady = true;
        }
    };
    window.addEventListener("message", onMessage);
    var set = new Set();
    var id = null;
    var runWhenProxyReady = function (fn, count) {
        if (proxyReady) {
            fn();
        }
        else {
            if (count > 10) {
                console.error("[@my-react-devtool/hook] proxy is not ready");
                return;
            }
            clearTimeout(id);
            id = setTimeout(function () {
                runWhenProxyReady(fn, count + 1);
            }, 2000);
        }
    };
    core.subscribe(function (message) {
        window.postMessage({ type: MessageHookType.render, data: message }, "*");
    });
    var globalHook = function (dispatch) {
        set.add(dispatch);
        runWhenProxyReady(function () {
            // current site is render by @my-react
            window.postMessage({ type: MessageHookType.mount }, "*");
            console.log("[@my-react-devtool/hook] render", set);
            set.forEach(function (dispatch) {
                if (!core.hasDispatch(dispatch)) {
                    core.addDispatch(dispatch);
                }
            });
        }, 1);
    };
    if (window.parent && window.parent !== window) {
        console.warn("[@my-react-devtool/hook] currently the @my-react extension does not support iframe.");
    }
    else {
        window["__MY_REACT_DEVTOOL_INTERNAL__"] = core;
        window["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
        window.postMessage({ type: MessageHookType.init }, "*");
    }

    exports.globalHook = globalHook;

    return exports;

})({});
//# sourceMappingURL=hook.development.js.map
