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

    var core = {exports: {}};

    var reactShared = {exports: {}};

    var index_development$1 = {};

    var hasRequiredIndex_development$1;

    function requireIndex_development$1 () {
    	if (hasRequiredIndex_development$1) return index_development$1;
    	hasRequiredIndex_development$1 = 1;
    	(function (exports) {

    		var merge = function (src, rest) {
    		    return src | rest;
    		};
    		var remove = function (src, rest) {
    		    if (src & rest) {
    		        return src ^ rest;
    		    }
    		    else {
    		        return src;
    		    }
    		};
    		var include = function (src, rest) {
    		    return src & rest;
    		};
    		var exclude = function (src, rest) {
    		    return !(src & rest);
    		};

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


    		function __spreadArray(to, from, pack) {
    		    if (arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    		        if (ar || !(i in from)) {
    		            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
    		            ar[i] = from[i];
    		        }
    		    }
    		    return to.concat(ar || Array.prototype.slice.call(from));
    		}

    		typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    		    var e = new Error(message);
    		    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    		};

    		var once = function (action) {
    		    var called = false;
    		    return function () {
    		        var args = [];
    		        for (var _i = 0; _i < arguments.length; _i++) {
    		            args[_i] = arguments[_i];
    		        }
    		        if (called)
    		            return;
    		        called = true;
    		        if (typeof action === "function")
    		            action.call.apply(action, __spreadArray([null], args, false));
    		    };
    		};

    		var TYPEKEY = "$$typeof";
    		var Element = Symbol.for("react.element");
    		var Memo = Symbol.for("react.memo");
    		var ForwardRef = Symbol.for("react.forward_ref");
    		var Portal = Symbol.for("react.portal");
    		var Fragment = Symbol.for("react.fragment");
    		var Context = Symbol.for("react.context");
    		var Provider = Symbol.for("react.provider");
    		var Consumer = Symbol.for("react.consumer");
    		var Lazy = Symbol.for("react.lazy");
    		var Suspense = Symbol.for("react.suspense");
    		var Strict = Symbol.for("react.strict_mode");
    		// TODO
    		var KeepLive = Symbol.for("react.keep_live");
    		var Scope = Symbol.for("react.scope");
    		var Comment = Symbol.for("react.comment");
    		var Offscreen = Symbol.for("react.offscreen");
    		var Profiler = Symbol.for("react.profiler");

    		function isObject(target) {
    		    return typeof target === "object" && target !== null;
    		}
    		function isFunction(target) {
    		    return typeof target === "function";
    		}
    		function isArray(target) {
    		    return Array.isArray(target);
    		}
    		function isSymbol(target) {
    		    return typeof target === "symbol";
    		}
    		function isString(target) {
    		    return typeof target === "string";
    		}
    		function isInteger(target) {
    		    return Number.isInteger(Number(target));
    		}
    		function isNumber(target) {
    		    return typeof target === "number";
    		}
    		function isCollection(target) {
    		    return target instanceof Map || target instanceof Set || target instanceof WeakMap || target instanceof WeakSet;
    		}
    		var isPromise = function (val) {
    		    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
    		};

    		var UniqueArray = /** @class */ (function () {
    		    function UniqueArray() {
    		        this.set = new Set();
    		        this.arr = new Array();
    		        this.length = 0;
    		    }
    		    UniqueArray.prototype.uniPop = function () {
    		        var v = this.arr.pop();
    		        this.set.delete(v);
    		        this.length--;
    		        return v;
    		    };
    		    UniqueArray.prototype.uniPush = function (v) {
    		        if (this.set.has(v))
    		            return 0;
    		        this.set.add(v);
    		        this.arr.push(v);
    		        this.length++;
    		    };
    		    UniqueArray.prototype.uniShift = function () {
    		        var v = this.arr.shift();
    		        this.set.delete(v);
    		        this.length--;
    		        return v;
    		    };
    		    UniqueArray.prototype.uniUnshift = function (v) {
    		        if (this.set.has(v))
    		            return 0;
    		        this.set.add(v);
    		        this.arr.unshift(v);
    		        this.length++;
    		    };
    		    UniqueArray.prototype.uniDelete = function (v) {
    		        if (this.set.has(v)) {
    		            this.set.delete(v);
    		            this.arr = this.arr.filter(function (i) { return i !== v; });
    		            this.length--;
    		        }
    		    };
    		    UniqueArray.prototype.clear = function () {
    		        this.length = 0;
    		        this.set.clear();
    		        this.arr.length = 0;
    		    };
    		    UniqueArray.prototype.getAll = function () {
    		        return this.arr;
    		    };
    		    return UniqueArray;
    		}());

    		exports.HOOK_TYPE = void 0;
    		(function (HOOK_TYPE) {
    		    HOOK_TYPE[HOOK_TYPE["useId"] = 0] = "useId";
    		    HOOK_TYPE[HOOK_TYPE["useRef"] = 1] = "useRef";
    		    HOOK_TYPE[HOOK_TYPE["useMemo"] = 2] = "useMemo";
    		    HOOK_TYPE[HOOK_TYPE["useState"] = 3] = "useState";
    		    HOOK_TYPE[HOOK_TYPE["useSignal"] = 4] = "useSignal";
    		    HOOK_TYPE[HOOK_TYPE["useEffect"] = 5] = "useEffect";
    		    HOOK_TYPE[HOOK_TYPE["useContext"] = 6] = "useContext";
    		    HOOK_TYPE[HOOK_TYPE["useReducer"] = 7] = "useReducer";
    		    HOOK_TYPE[HOOK_TYPE["useCallback"] = 8] = "useCallback";
    		    HOOK_TYPE[HOOK_TYPE["useTransition"] = 9] = "useTransition";
    		    HOOK_TYPE[HOOK_TYPE["useDebugValue"] = 10] = "useDebugValue";
    		    HOOK_TYPE[HOOK_TYPE["useLayoutEffect"] = 11] = "useLayoutEffect";
    		    HOOK_TYPE[HOOK_TYPE["useDeferredValue"] = 12] = "useDeferredValue";
    		    HOOK_TYPE[HOOK_TYPE["useInsertionEffect"] = 13] = "useInsertionEffect";
    		    HOOK_TYPE[HOOK_TYPE["useImperativeHandle"] = 14] = "useImperativeHandle";
    		    HOOK_TYPE[HOOK_TYPE["useSyncExternalStore"] = 15] = "useSyncExternalStore";
    		})(exports.HOOK_TYPE || (exports.HOOK_TYPE = {}));

    		exports.UpdateQueueType = void 0;
    		(function (UpdateQueueType) {
    		    UpdateQueueType[UpdateQueueType["hook"] = 2] = "hook";
    		    UpdateQueueType[UpdateQueueType["component"] = 1] = "component";
    		    UpdateQueueType[UpdateQueueType["lazy"] = 3] = "lazy";
    		    UpdateQueueType[UpdateQueueType["context"] = 4] = "context";
    		})(exports.UpdateQueueType || (exports.UpdateQueueType = {}));

    		exports.MODE_TYPE = void 0;
    		(function (MODE_TYPE) {
    		    MODE_TYPE[MODE_TYPE["__initial__"] = 0] = "__initial__";
    		    MODE_TYPE[MODE_TYPE["__stable__"] = 1] = "__stable__";
    		})(exports.MODE_TYPE || (exports.MODE_TYPE = {}));

    		exports.STATE_TYPE = void 0;
    		(function (STATE_TYPE) {
    		    STATE_TYPE[STATE_TYPE["__initial__"] = 0] = "__initial__";
    		    STATE_TYPE[STATE_TYPE["__create__"] = 1] = "__create__";
    		    STATE_TYPE[STATE_TYPE["__stable__"] = 2] = "__stable__";
    		    STATE_TYPE[STATE_TYPE["__skippedConcurrent__"] = 4] = "__skippedConcurrent__";
    		    STATE_TYPE[STATE_TYPE["__skippedSync__"] = 8] = "__skippedSync__";
    		    STATE_TYPE[STATE_TYPE["__inherit__"] = 16] = "__inherit__";
    		    STATE_TYPE[STATE_TYPE["__triggerConcurrent__"] = 32] = "__triggerConcurrent__";
    		    STATE_TYPE[STATE_TYPE["__triggerConcurrentForce__"] = 64] = "__triggerConcurrentForce__";
    		    STATE_TYPE[STATE_TYPE["__triggerSync__"] = 128] = "__triggerSync__";
    		    STATE_TYPE[STATE_TYPE["__triggerSyncForce__"] = 256] = "__triggerSyncForce__";
    		    STATE_TYPE[STATE_TYPE["__unmount__"] = 512] = "__unmount__";
    		    STATE_TYPE[STATE_TYPE["__hmr__"] = 1024] = "__hmr__";
    		})(exports.STATE_TYPE || (exports.STATE_TYPE = {}));

    		exports.PATCH_TYPE = void 0;
    		(function (PATCH_TYPE) {
    		    PATCH_TYPE[PATCH_TYPE["__initial__"] = 0] = "__initial__";
    		    PATCH_TYPE[PATCH_TYPE["__create__"] = 1] = "__create__";
    		    PATCH_TYPE[PATCH_TYPE["__update__"] = 2] = "__update__";
    		    PATCH_TYPE[PATCH_TYPE["__append__"] = 4] = "__append__";
    		    PATCH_TYPE[PATCH_TYPE["__position__"] = 8] = "__position__";
    		    PATCH_TYPE[PATCH_TYPE["__effect__"] = 16] = "__effect__";
    		    PATCH_TYPE[PATCH_TYPE["__layoutEffect__"] = 32] = "__layoutEffect__";
    		    PATCH_TYPE[PATCH_TYPE["__insertionEffect__"] = 64] = "__insertionEffect__";
    		    PATCH_TYPE[PATCH_TYPE["__unmount__"] = 128] = "__unmount__";
    		    PATCH_TYPE[PATCH_TYPE["__ref__"] = 256] = "__ref__";
    		})(exports.PATCH_TYPE || (exports.PATCH_TYPE = {}));

    		exports.Effect_TYPE = void 0;
    		(function (Effect_TYPE) {
    		    Effect_TYPE[Effect_TYPE["__initial__"] = 0] = "__initial__";
    		    Effect_TYPE[Effect_TYPE["__effect__"] = 1] = "__effect__";
    		    Effect_TYPE[Effect_TYPE["__unmount__"] = 2] = "__unmount__";
    		})(exports.Effect_TYPE || (exports.Effect_TYPE = {}));

    		var compareVersion = function (version1, version2) {
    		    var compare = function (arr1, arr2) {
    		        if (arr1.length && arr2.length) {
    		            var v1 = arr1[0];
    		            var v2 = arr2[0];
    		            if (v1 > v2)
    		                return true;
    		            if (v2 > v1)
    		                return false;
    		            return compare(arr1.slice(1), arr2.slice(1));
    		        }
    		        if (arr1.length)
    		            return true;
    		        if (arr2.length)
    		            return false;
    		        return true;
    		    };
    		    return compare(version1.split(".").map(Number), version2.split(".").map(Number));
    		};

    		var isNormalEquals = function (src, target, isSkipKey) {
    		    var isEquals = Object.is(src, target);
    		    if (isEquals)
    		        return true;
    		    var hasSkipKeyFunction = typeof isSkipKey === "function";
    		    if (typeof src === "object" && typeof target === "object" && src !== null && target !== null) {
    		        var srcKeys = Object.keys(src);
    		        var targetKeys = Object.keys(target);
    		        if (srcKeys.length !== targetKeys.length)
    		            return false;
    		        var res = true;
    		        if (hasSkipKeyFunction) {
    		            for (var _i = 0, srcKeys_1 = srcKeys; _i < srcKeys_1.length; _i++) {
    		                var key = srcKeys_1[_i];
    		                if (isSkipKey(key) && key in target) {
    		                    continue;
    		                }
    		                else {
    		                    res = res && Object.is(src[key], target[key]);
    		                }
    		                if (!res)
    		                    return res;
    		            }
    		        }
    		        else {
    		            for (var _a = 0, srcKeys_2 = srcKeys; _a < srcKeys_2.length; _a++) {
    		                var key = srcKeys_2[_a];
    		                res = res && Object.is(src[key], target[key]);
    		                if (!res)
    		                    return res;
    		            }
    		        }
    		        return res;
    		    }
    		    return false;
    		};
    		var isArrayEquals = function (src, target) {
    		    var isEquals = Object.is(src, target);
    		    if (isEquals)
    		        return true;
    		    if (Array.isArray(src) && Array.isArray(target) && src.length === target.length) {
    		        var re = true;
    		        for (var key in src) {
    		            re = re && Object.is(src[key], target[key]);
    		            if (!re)
    		                return re;
    		        }
    		        return re;
    		    }
    		    return false;
    		};

    		var ListTreeNode = /** @class */ (function () {
    		    function ListTreeNode(value) {
    		        this.prev = null;
    		        this.next = null;
    		        this.value = value;
    		    }
    		    return ListTreeNode;
    		}());
    		var ListTree = /** @class */ (function () {
    		    function ListTree() {
    		        this.length = 0;
    		        var _stickyHead = null;
    		        Object.defineProperty(this, "stickyHead", {
    		            get: function () {
    		                return _stickyHead;
    		            },
    		            set: function (v) {
    		                _stickyHead = v;
    		            },
    		        });
    		        var _stickyFoot = null;
    		        Object.defineProperty(this, "stickyFoot", {
    		            get: function () {
    		                return _stickyFoot;
    		            },
    		            set: function (v) {
    		                _stickyFoot = v;
    		            },
    		        });
    		        var _head = null;
    		        Object.defineProperty(this, "head", {
    		            get: function () {
    		                return _head;
    		            },
    		            set: function (v) {
    		                _head = v;
    		            },
    		        });
    		        var _foot = null;
    		        Object.defineProperty(this, "foot", {
    		            get: function () {
    		                return _foot;
    		            },
    		            set: function (v) {
    		                _foot = v;
    		            },
    		        });
    		    }
    		    ListTree.prototype.push = function (node) {
    		        var listNode = new ListTreeNode(node);
    		        this.length++;
    		        if (!this.foot) {
    		            this.head = listNode;
    		            this.foot = listNode;
    		        }
    		        else {
    		            this.foot.next = listNode;
    		            listNode.prev = this.foot;
    		            this.foot = listNode;
    		        }
    		    };
    		    ListTree.prototype.pushToLast = function (node) {
    		        if (this.stickyFoot) {
    		            var node_1 = this.stickyFoot;
    		            this.push(node_1.value);
    		            this.stickyFoot = null;
    		        }
    		        var listNode = new ListTreeNode(node);
    		        this.stickyFoot = listNode;
    		        this.length++;
    		    };
    		    ListTree.prototype.pushToHead = function (node) {
    		        if (this.stickyHead) {
    		            var node_2 = this.stickyHead;
    		            this.unshift(node_2.value);
    		            this.stickyHead = null;
    		        }
    		        var listNode = new ListTreeNode(node);
    		        this.stickyHead = listNode;
    		        this.length++;
    		    };
    		    ListTree.prototype.pop = function () {
    		        var foot = this.stickyFoot || this.foot;
    		        if (foot) {
    		            this.delete(foot);
    		            return foot.value;
    		        }
    		        else {
    		            return null;
    		        }
    		    };
    		    ListTree.prototype.unshift = function (node) {
    		        var listNode = new ListTreeNode(node);
    		        this.length++;
    		        if (!this.head) {
    		            this.head = listNode;
    		            this.foot = listNode;
    		        }
    		        else {
    		            this.head.prev = listNode;
    		            listNode.next = this.head;
    		            this.head = listNode;
    		        }
    		    };
    		    ListTree.prototype.unshiftToHead = function (node) {
    		        if (this.stickyHead) {
    		            var node_3 = this.stickyHead;
    		            this.unshift(node_3.value);
    		            this.stickyHead = null;
    		        }
    		        var listNode = new ListTreeNode(node);
    		        this.stickyHead = listNode;
    		    };
    		    ListTree.prototype.unshiftToFoot = function (node) {
    		        if (this.stickyFoot) {
    		            var node_4 = this.stickyFoot;
    		            this.push(node_4.value);
    		            this.stickyFoot = null;
    		        }
    		        var listNode = new ListTreeNode(node);
    		        this.stickyFoot = listNode;
    		    };
    		    ListTree.prototype.shift = function () {
    		        var head = this.stickyHead || this.head;
    		        if (head) {
    		            this.delete(head);
    		            return head.value;
    		        }
    		        else {
    		            return null;
    		        }
    		    };
    		    ListTree.prototype.pickHead = function () {
    		        var _a, _b;
    		        return ((_a = this.stickyHead) === null || _a === void 0 ? void 0 : _a.value) || ((_b = this.head) === null || _b === void 0 ? void 0 : _b.value);
    		    };
    		    ListTree.prototype.pickFoot = function () {
    		        var _a, _b;
    		        return ((_a = this.stickyFoot) === null || _a === void 0 ? void 0 : _a.value) || ((_b = this.foot) === null || _b === void 0 ? void 0 : _b.value);
    		    };
    		    ListTree.prototype.listToFoot = function (action) {
    		        if (this.stickyHead) {
    		            action(this.stickyHead.value);
    		        }
    		        var node = this.head;
    		        while (node) {
    		            action(node.value);
    		            node = node.next;
    		        }
    		        if (this.stickyFoot) {
    		            action(this.stickyFoot.value);
    		        }
    		    };
    		    ListTree.prototype.listToHead = function (action) {
    		        if (this.stickyFoot) {
    		            action(this.stickyFoot.value);
    		        }
    		        var node = this.foot;
    		        while (node) {
    		            action(node.value);
    		            node = node.prev;
    		        }
    		        if (this.stickyHead) {
    		            action(this.stickyHead.value);
    		        }
    		    };
    		    ListTree.prototype.toArray = function () {
    		        var re = [];
    		        this.listToFoot(function (v) { return re.push(v); });
    		        return re;
    		    };
    		    ListTree.prototype.delete = function (node) {
    		        if (this.stickyHead === node) {
    		            this.stickyHead = null;
    		            this.length--;
    		        }
    		        else if (this.stickyFoot === node) {
    		            this.stickyFoot = null;
    		            this.length--;
    		        }
    		        else if (this.head === node) {
    		            var next = node.next;
    		            node.next = null;
    		            if (next) {
    		                this.head = next;
    		                next.prev = null;
    		            }
    		            else {
    		                this.head = null;
    		                this.foot = null;
    		            }
    		            this.length--;
    		        }
    		        else if (this.foot === node) {
    		            var prev = node.prev;
    		            node.prev = null;
    		            if (prev) {
    		                this.foot = prev;
    		                prev.next = null;
    		            }
    		            else {
    		                this.head = null;
    		                this.foot = null;
    		            }
    		            this.length--;
    		        }
    		        else if (this.hasNode(node)) {
    		            var prev = node.prev;
    		            var next = node.next;
    		            node.prev = null;
    		            node.next = null;
    		            prev.next = next;
    		            next.prev = prev;
    		            this.length--;
    		        }
    		    };
    		    ListTree.prototype.size = function () {
    		        return this.length;
    		    };
    		    ListTree.prototype.hasNode = function (node) {
    		        if (this.stickyHead && Object.is(this.stickyHead, node))
    		            return true;
    		        if (this.stickyFoot && Object.is(this.stickyFoot, node))
    		            return true;
    		        var listNode = this.head;
    		        while (listNode) {
    		            if (Object.is(listNode, node))
    		                return true;
    		            listNode = listNode.next;
    		        }
    		        return false;
    		    };
    		    ListTree.prototype.hasValue = function (node) {
    		        if (this.stickyHead && Object.is(this.stickyHead.value, node))
    		            return true;
    		        if (this.stickyFoot && Object.is(this.stickyFoot.value, node))
    		            return true;
    		        var listNode = this.head;
    		        while (listNode) {
    		            if (Object.is(listNode.value, node))
    		                return true;
    		            listNode = listNode.next;
    		        }
    		        return false;
    		    };
    		    ListTree.prototype.some = function (iterator) {
    		        var re = false;
    		        this.listToFoot(function (node) {
    		            re = re || iterator(node);
    		        });
    		        return re;
    		    };
    		    ListTree.prototype.every = function (iterator) {
    		        var re = true;
    		        this.listToFoot(function (node) {
    		            re = re && iterator(node);
    		        });
    		        return re;
    		    };
    		    ListTree.prototype.concat = function (list) {
    		        var newList = new ListTree();
    		        this.listToFoot(function (node) { return newList.push(node); });
    		        list.listToFoot(function (node) { return newList.push(node); });
    		        return newList;
    		    };
    		    ListTree.prototype.clone = function () {
    		        var newList = new ListTree();
    		        this.listToFoot(function (v) { return newList.push(v); });
    		        return newList;
    		    };
    		    ListTree.prototype.clear = function () {
    		        this.length = 0;
    		        this.head = null;
    		        this.foot = null;
    		        this.stickyHead = null;
    		        this.stickyFoot = null;
    		    };
    		    return ListTree;
    		}());
    		{
    		    Object.defineProperty(ListTree.prototype, "_debugToArray", {
    		        get: function () {
    		            return this.toArray();
    		        },
    		    });
    		}

    		exports.Comment = Comment;
    		exports.Consumer = Consumer;
    		exports.Context = Context;
    		exports.Element = Element;
    		exports.ForwardRef = ForwardRef;
    		exports.Fragment = Fragment;
    		exports.KeepLive = KeepLive;
    		exports.Lazy = Lazy;
    		exports.ListTree = ListTree;
    		exports.ListTreeNode = ListTreeNode;
    		exports.Memo = Memo;
    		exports.Offscreen = Offscreen;
    		exports.Portal = Portal;
    		exports.Profiler = Profiler;
    		exports.Provider = Provider;
    		exports.Scope = Scope;
    		exports.Strict = Strict;
    		exports.Suspense = Suspense;
    		exports.TYPEKEY = TYPEKEY;
    		exports.UniqueArray = UniqueArray;
    		exports.compareVersion = compareVersion;
    		exports.exclude = exclude;
    		exports.include = include;
    		exports.isArray = isArray;
    		exports.isArrayEquals = isArrayEquals;
    		exports.isCollection = isCollection;
    		exports.isFunction = isFunction;
    		exports.isInteger = isInteger;
    		exports.isNormalEquals = isNormalEquals;
    		exports.isNumber = isNumber;
    		exports.isObject = isObject;
    		exports.isPromise = isPromise;
    		exports.isString = isString;
    		exports.isSymbol = isSymbol;
    		exports.merge = merge;
    		exports.once = once;
    		exports.remove = remove;
    		
    	} (index_development$1));
    	return index_development$1;
    }

    var hasRequiredReactShared;

    function requireReactShared () {
    	if (hasRequiredReactShared) return reactShared.exports;
    	hasRequiredReactShared = 1;

    	{
    	  reactShared.exports = requireIndex_development$1();
    	}
    	return reactShared.exports;
    }

    var lib = {};

    var cycle = {};

    var pathGetter_1;
    var hasRequiredPathGetter;

    function requirePathGetter () {
    	if (hasRequiredPathGetter) return pathGetter_1;
    	hasRequiredPathGetter = 1;
    	pathGetter_1 = pathGetter;

    	function pathGetter(obj, path) {
    	  if (path !== '$') {
    	    var paths = getPaths(path);
    	    for (var i = 0; i < paths.length; i++) {
    	      path = paths[i].toString().replace(/\\"/g, '"');
    	      if (typeof obj[path] === 'undefined' && i !== paths.length - 1) continue;
    	      obj = obj[path];
    	    }
    	  }
    	  return obj;
    	}

    	function getPaths(pathString) {
    	  var regex = /(?:\.(\w+))|(?:\[(\d+)\])|(?:\["((?:[^\\"]|\\.)*)"\])/g;
    	  var matches = [];
    	  var match;
    	  while (match = regex.exec(pathString)) {
    	    matches.push( match[1] || match[2] || match[3] );
    	  }
    	  return matches;
    	}
    	return pathGetter_1;
    }

    var utils = {};

    var hasRequiredUtils;

    function requireUtils () {
    	if (hasRequiredUtils) return utils;
    	hasRequiredUtils = 1;
    	var pathGetter = requirePathGetter();
    	var jsan = requireLib();

    	utils.getRegexFlags = function getRegexFlags(regex) {
    	  var flags = '';
    	  if (regex.ignoreCase) flags += 'i';
    	  if (regex.global) flags += 'g';
    	  if (regex.multiline) flags += 'm';
    	  return flags;
    	};

    	utils.stringifyFunction = function stringifyFunction(fn, customToString) {
    	  if (typeof customToString === 'function') {
    	    return customToString(fn);
    	  }
    	  var str = fn.toString();
    	  var match = str.match(/^[^{]*{|^[^=]*=>/);
    	  var start = match ? match[0] : '<function> ';
    	  var end = str[str.length - 1] === '}' ? '}' : '';
    	  return start.replace(/\r\n|\n/g, ' ').replace(/\s+/g, ' ') + ' /* ... */ ' + end;
    	};

    	utils.restore = function restore(obj, root) {
    	  var type = obj[0];
    	  var rest = obj.slice(1);
    	  switch(type) {
    	    case '$':
    	      return pathGetter(root, obj);
    	    case 'r':
    	      var comma = rest.indexOf(',');
    	      var flags = rest.slice(0, comma);
    	      var source = rest.slice(comma + 1);
    	      return RegExp(source, flags);
    	    case 'd':
    	      return new Date(+rest);
    	    case 'f':
    	      var fn = function() { throw new Error("can't run jsan parsed function") };
    	      fn.toString = function() { return rest; };
    	      return fn;
    	    case 'u':
    	      return undefined;
    	    case 'e':
    	      var error = new Error(rest);
    	      error.stack = 'Stack is unavailable for jsan parsed errors';
    	      return error;
    	    case 's':
    	      return Symbol(rest);
    	    case 'g':
    	      return Symbol.for(rest);
    	    case 'm':
    	      return new Map(jsan.parse(rest));
    	    case 'l':
    	      return new Set(jsan.parse(rest));
    	    case 'n':
    	      return NaN;
    	    case 'i':
    	      return Infinity;
    	    case 'y':
    	      return -Infinity;
    	    default:
    	      console.warn('unknown type', obj);
    	      return obj;
    	  }
    	};
    	return utils;
    }

    var hasRequiredCycle;

    function requireCycle () {
    	if (hasRequiredCycle) return cycle;
    	hasRequiredCycle = 1;
    	requirePathGetter();
    	var utils = requireUtils();

    	var WMap = typeof WeakMap !== 'undefined'?
    	  WeakMap:
    	  function() {
    	    var keys = [];
    	    var values = [];
    	    return {
    	      set: function(key, value) {
    	        keys.push(key);
    	        values.push(value);
    	      },
    	      get: function(key) {
    	        for (var i = 0; i < keys.length; i++) {
    	          if (keys[i] === key) {
    	            return values[i];
    	          }
    	        }
    	      }
    	    }
    	  };

    	// Based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

    	cycle.decycle = function decycle(object, options, replacer, map) {

    	  map = map || new WMap();

    	  var noCircularOption = !Object.prototype.hasOwnProperty.call(options, 'circular');
    	  var withRefs = options.refs !== false;

    	  return (function derez(_value, path, key) {

    	    // The derez recurses through the object, producing the deep copy.

    	    var i,        // The loop counter
    	      name,       // Property name
    	      nu;         // The new object or array

    	    // typeof null === 'object', so go on if this value is really an object but not
    	    // one of the weird builtin objects.

    	    var value = typeof replacer === 'function' ? replacer(key || '', _value) : _value;

    	    if (options.date && value instanceof Date) {
    	      return {$jsan: 'd' + value.getTime()};
    	    }
    	    if (options.regex && value instanceof RegExp) {
    	      return {$jsan: 'r' + utils.getRegexFlags(value) + ',' + value.source};
    	    }
    	    if (options['function'] && typeof value === 'function') {
    	      return {$jsan: 'f' + utils.stringifyFunction(value, options['function'])}
    	    }
    	    if (options['nan'] && typeof value === 'number' && isNaN(value)) {
    	      return {$jsan: 'n'}
    	    }
    	    if (options['infinity']) {
    	      if (Number.POSITIVE_INFINITY === value) return {$jsan: 'i'}
    	      if (Number.NEGATIVE_INFINITY === value) return {$jsan: 'y'}
    	    }
    	    if (options['undefined'] && value === undefined) {
    	      return {$jsan: 'u'}
    	    }
    	    if (options['error'] && value instanceof Error) {
    	      return {$jsan: 'e' + value.message}
    	    }
    	    if (options['symbol'] && typeof value === 'symbol') {
    	      var symbolKey = Symbol.keyFor(value);
    	      if (symbolKey !== undefined) {
    	        return {$jsan: 'g' + symbolKey}
    	      }

    	      // 'Symbol(foo)'.slice(7, -1) === 'foo'
    	      return {$jsan: 's' + value.toString().slice(7, -1)}
    	    }

    	    if (options['map'] && typeof Map === 'function' && value instanceof Map && typeof Array.from === 'function') {
    	      return {$jsan: 'm' + JSON.stringify(decycle(Array.from(value), options, replacer, map))}
    	    }

    	    if (options['set'] && typeof Set === 'function' && value instanceof Set && typeof Array.from === 'function') {
    	      return {$jsan: 'l' + JSON.stringify(decycle(Array.from(value), options, replacer, map))}
    	    }

    	    if (value && typeof value.toJSON === 'function') {
    	      try {
    	        value = value.toJSON(key);
    	      } catch (error) {
    	        var keyString = (key || '$');
    	        return "toJSON failed for '" + (map.get(value) || keyString) + "'";
    	      }
    	    }

    	    if (typeof value === 'object' && value !== null &&
    	      !(value instanceof Boolean) &&
    	      !(value instanceof Date)    &&
    	      !(value instanceof Number)  &&
    	      !(value instanceof RegExp)  &&
    	      !(value instanceof String)  &&
    	      !(typeof value === 'symbol')  &&
    	      !(value instanceof Error)) {

    	        // If the value is an object or array, look to see if we have already
    	        // encountered it. If so, return a $ref/path object.

    	      if (typeof value === 'object') {
    	        var foundPath = map.get(value);
    	        if (foundPath) {
    	          if (noCircularOption && withRefs) {
    	            return {$jsan: foundPath};
    	          }
    	          
    	          // This is only a true circular reference if the parent path is inside of foundPath
    	          // drop the last component of the current path and check if it starts with foundPath
    	          var parentPath = path.split('.').slice(0, -1).join('.');
    	          if (parentPath.indexOf(foundPath) === 0) {
    	            if (!noCircularOption) {
    	              return typeof options.circular === 'function'?
    	              options.circular(value, path, foundPath):
    	              options.circular;
    	            }
    	            return {$jsan: foundPath};
    	          }
    	          if (withRefs) return {$jsan: foundPath};
    	        }
    	        map.set(value, path);
    	      }


    	      // If it is an array, replicate the array.

    	      if (Object.prototype.toString.apply(value) === '[object Array]') {
    	          nu = [];
    	          for (i = 0; i < value.length; i += 1) {
    	              nu[i] = derez(value[i], path + '[' + i + ']', i);
    	          }
    	      } else {

    	        // If it is an object, replicate the object.

    	        nu = {};
    	        for (name in value) {
    	          if (Object.prototype.hasOwnProperty.call(value, name)) {
    	            var nextPath = /^\w+$/.test(name) ?
    	              '.' + name :
    	              '[' + JSON.stringify(name) + ']';
    	            nu[name] = name === '$jsan' ? [derez(value[name], path + nextPath)] : derez(value[name], path + nextPath, name);
    	          }
    	        }
    	      }
    	      return nu;
    	    }
    	    return value;
    	  }(object, '$'));
    	};


    	cycle.retrocycle = function retrocycle($) {


    	  return (function rez(value) {

    	    // The rez function walks recursively through the object looking for $jsan
    	    // properties. When it finds one that has a value that is a path, then it
    	    // replaces the $jsan object with a reference to the value that is found by
    	    // the path.

    	    var i, item, name;

    	    if (value && typeof value === 'object') {
    	      if (Object.prototype.toString.apply(value) === '[object Array]') {
    	        for (i = 0; i < value.length; i += 1) {
    	          item = value[i];
    	          if (item && typeof item === 'object') {
    	            if (item.$jsan) {
    	              value[i] = utils.restore(item.$jsan, $);
    	            } else {
    	              rez(item);
    	            }
    	          }
    	        }
    	      } else {
    	        for (name in value) {
    	          // base case passed raw object
    	          if(typeof value[name] === 'string' && name === '$jsan'){
    	            return utils.restore(value.$jsan, $);
    	          }
    	          else {
    	            if (name === '$jsan') {
    	              value[name] = value[name][0];
    	            }
    	            if (typeof value[name] === 'object') {
    	              item = value[name];
    	              if (item && typeof item === 'object') {
    	                if (item.$jsan) {
    	                  value[name] = utils.restore(item.$jsan, $);
    	                } else {
    	                  rez(item);
    	                }
    	              }
    	            }
    	          }
    	        }
    	      }
    	    }
    	    return value;
    	  }($));
    	};
    	return cycle;
    }

    var hasRequiredLib;

    function requireLib () {
    	if (hasRequiredLib) return lib;
    	hasRequiredLib = 1;
    	var cycle = requireCycle();

    	lib.stringify = function stringify(value, replacer, space, _options) {

    	  if (arguments.length < 4) {
    	    try {
    	      if (arguments.length === 1) {
    	        return JSON.stringify(value);
    	      } else {
    	        return JSON.stringify.apply(JSON, arguments);
    	      }
    	    } catch (e) {}
    	  }

    	  var options = _options || false;
    	  if (typeof options === 'boolean') {
    	    options = {
    	      'date': options,
    	      'function': options,
    	      'regex': options,
    	      'undefined': options,
    	      'error': options,
    	      'symbol': options,
    	      'map': options,
    	      'set': options,
    	      'nan': options,
    	      'infinity': options
    	    };
    	  }

    	  var decycled = cycle.decycle(value, options, replacer);
    	  if (arguments.length === 1) {
    	    return JSON.stringify(decycled);
    	  } else {
    	    // decycle already handles when replacer is a function.
    	    return JSON.stringify(decycled, Array.isArray(replacer) ? replacer : null, space);
    	  }
    	};

    	lib.parse = function parse(text, reviver) {
    	  var needsRetrocycle = /"\$jsan"/.test(text);
    	  var parsed;
    	  if (arguments.length === 1) {
    	    parsed = JSON.parse(text);
    	  } else {
    	    parsed = JSON.parse(text, reviver);
    	  }
    	  if (needsRetrocycle) {
    	    parsed = cycle.retrocycle(parsed);
    	  }
    	  return parsed;
    	};
    	return lib;
    }

    var jsan;
    var hasRequiredJsan;

    function requireJsan () {
    	if (hasRequiredJsan) return jsan;
    	hasRequiredJsan = 1;
    	jsan = requireLib();
    	return jsan;
    }

    var index_development = {};

    var hasRequiredIndex_development;

    function requireIndex_development () {
    	if (hasRequiredIndex_development) return index_development;
    	hasRequiredIndex_development = 1;
    	(function (exports) {

    		var reactShared = requireReactShared();
    		var Jsan = requireJsan();

    		function _interopNamespaceDefault(e) {
    		    var n = Object.create(null);
    		    if (e) {
    		        Object.keys(e).forEach(function (k) {
    		            if (k !== 'default') {
    		                var d = Object.getOwnPropertyDescriptor(e, k);
    		                Object.defineProperty(n, k, d.get ? d : {
    		                    enumerable: true,
    		                    get: function () { return e[k]; }
    		                });
    		            }
    		        });
    		    }
    		    n.default = e;
    		    return Object.freeze(n);
    		}

    		var Jsan__namespace = /*#__PURE__*/_interopNamespaceDefault(Jsan);

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

    		function __spreadArray(to, from, pack) {
    		    if (arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    		        if (ar || !(i in from)) {
    		            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
    		            ar[i] = from[i];
    		        }
    		    }
    		    return to.concat(ar || Array.prototype.slice.call(from));
    		}

    		typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    		    var e = new Error(message);
    		    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    		};

    		var id = 0;
    		// PlainNode is a simplified version of FiberNode just for show the structure
    		var PlainNode = /** @class */ (function () {
    		    function PlainNode(_id) {
    		        this.id = _id || "".concat(id++);
    		    }
    		    return PlainNode;
    		}());
    		{
    		    Object.defineProperty(PlainNode.prototype, "__debugToString", {
    		        value: function () {
    		            return JSON.stringify(this);
    		        },
    		    });
    		}

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

    		var replacer = function (key, value) {
    		    if (key === "_owner" || key === "__fiber__" || key === "__props__") {
    		        return null;
    		    }
    		    if (typeof document !== "undefined" && typeof HTMLElement !== "undefined" && value instanceof HTMLElement) {
    		        return { type: "nativeNode", value: "<".concat(value.tagName.toLowerCase(), " />") };
    		    }
    		    return value;
    		};
    		var options = {
    		    refs: false, // references can't be resolved on the original Immutable structure
    		    date: true,
    		    function: true,
    		    regex: true,
    		    undefined: true,
    		    error: true,
    		    symbol: true,
    		    map: true,
    		    set: true,
    		    nan: true,
    		    infinity: true,
    		};
    		var typeKeys = [];
    		Object.keys(NODE_TYPE).forEach(function (key) {
    		    if (!key.startsWith("__")) {
    		        typeKeys.push(+key);
    		    }
    		});
    		// eslint-disable-next-line @typescript-eslint/ban-types
    		var safeStringify = function (obj) {
    		    try {
    		        if (typeof obj === "function") {
    		            return { type: "function", name: obj.name, value: Jsan__namespace.stringify(obj, replacer, undefined, options) };
    		        }
    		        else {
    		            return { type: "object", name: "object", value: Jsan__namespace.stringify(obj, replacer, undefined, options) };
    		        }
    		    }
    		    catch (e) {
    		        console.log(e.message);
    		    }
    		};
    		var safeParse = function (val) {
    		    try {
    		        if (val.type === "function") {
    		            var re = Jsan__namespace.parse(val.value);
    		            Object.defineProperty(re, "name", {
    		                value: val.name,
    		            });
    		            Object.defineProperty(re, "displayName", {
    		                value: val.name,
    		            });
    		            return re;
    		        }
    		        else {
    		            return Jsan__namespace.parse(val.value);
    		        }
    		    }
    		    catch (e) {
    		        console.log(e.message);
    		    }
    		};
    		var getTypeName = function (type) {
    		    switch (type) {
    		        case NODE_TYPE.__keepLive__:
    		            return "KeepAlive";
    		        case NODE_TYPE.__memo__:
    		            return "Memo";
    		        case NODE_TYPE.__forwardRef__:
    		            return "ForwardRef";
    		        case NODE_TYPE.__lazy__:
    		            return "Lazy";
    		        case NODE_TYPE.__provider__:
    		            return "Provider";
    		        case NODE_TYPE.__consumer__:
    		            return "Consumer";
    		        case NODE_TYPE.__fragment__:
    		            return "Fragment";
    		        case NODE_TYPE.__scope__:
    		            return "Scope";
    		        case NODE_TYPE.__strict__:
    		            return "Strict";
    		        case NODE_TYPE.__profiler__:
    		            return "Profiler";
    		        case NODE_TYPE.__suspense__:
    		            return "Suspense";
    		        case NODE_TYPE.__portal__:
    		            return "Portal";
    		        case NODE_TYPE.__comment__:
    		            return "Comment";
    		        case NODE_TYPE.__empty__:
    		            return "Empty";
    		        case NODE_TYPE.__null__:
    		            return "Null";
    		        case NODE_TYPE.__text__:
    		            return "Text";
    		        case NODE_TYPE.__function__:
    		            return "Function";
    		        case NODE_TYPE.__class__:
    		            return "Class";
    		        case NODE_TYPE.__plain__:
    		            return "Plain";
    		        case NODE_TYPE.__initial__:
    		            return "Initial";
    		        default:
    		            return "";
    		    }
    		};
    		var getFiberType = function (t) {
    		    var type = [];
    		    typeKeys.forEach(function (key) {
    		        if (t & key) {
    		            var name_1 = getTypeName(key);
    		            name_1 && type.push(name_1);
    		        }
    		    });
    		    return type;
    		};
    		var getFiberTag = function (t) {
    		    var tag = [];
    		    if (t & NODE_TYPE.__memo__) {
    		        tag.push("memo");
    		    }
    		    if (t & NODE_TYPE.__forwardRef__) {
    		        tag.push("forwardRef");
    		    }
    		    if (t & NODE_TYPE.__lazy__) {
    		        tag.push("lazy");
    		    }
    		    return tag;
    		};
    		var getFiberName = function (fiber) {
    		    var typedFiber = fiber;
    		    if (fiber.type & NODE_TYPE.__provider__) {
    		        var typedElementType = fiber.elementType;
    		        var name_2 = typedElementType.Context.displayName;
    		        return "".concat(name_2 || "Context", ".Provider");
    		    }
    		    if (fiber.type & NODE_TYPE.__consumer__) {
    		        var typedElementType = fiber.elementType;
    		        var name_3 = typedElementType.Context.displayName;
    		        return "".concat(name_3 || "Context", ".Consumer");
    		    }
    		    if (fiber.type & NODE_TYPE.__lazy__) {
    		        var typedElementType = fiber.elementType;
    		        var typedRender = typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.render;
    		        var name_4 = (typedRender === null || typedRender === void 0 ? void 0 : typedRender.displayName) || (typedRender === null || typedRender === void 0 ? void 0 : typedRender.name) || "";
    		        {
    		            var element = typedFiber._debugElement;
    		            var type = element === null || element === void 0 ? void 0 : element.type;
    		            name_4 = (type === null || type === void 0 ? void 0 : type.displayName) || name_4;
    		        }
    		        return "".concat(name_4 || "anonymous");
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
    		    if (fiber.type & NODE_TYPE.__comment__)
    		        return "Comment";
    		    if (fiber.type & NODE_TYPE.__keepLive__)
    		        return "KeepAlive";
    		    if (fiber.type & NODE_TYPE.__fragment__)
    		        return "Fragment";
    		    if (fiber.type & NODE_TYPE.__text__)
    		        return "text";
    		    if (typeof fiber.elementType === "string")
    		        return "".concat(fiber.elementType);
    		    if (typeof fiber.elementType === "function") {
    		        var typedElementType = fiber.elementType;
    		        var name_5 = typedElementType.displayName || typedElementType.name || "anonymous";
    		        {
    		            var element = typedFiber._debugElement;
    		            // may be a Suspense element
    		            var type = element === null || element === void 0 ? void 0 : element.type;
    		            name_5 = (type === null || type === void 0 ? void 0 : type.displayName) || name_5;
    		        }
    		        return "".concat(name_5);
    		    }
    		    return "unknown";
    		};
    		var getHookName = function (type) {
    		    switch (type) {
    		        case reactShared.HOOK_TYPE.useReducer:
    		            return "Reducer";
    		        case reactShared.HOOK_TYPE.useEffect:
    		            return "Effect";
    		        case reactShared.HOOK_TYPE.useLayoutEffect:
    		            return "LayoutEffect";
    		        case reactShared.HOOK_TYPE.useMemo:
    		            return "Memo";
    		        case reactShared.HOOK_TYPE.useCallback:
    		            return "Callback";
    		        case reactShared.HOOK_TYPE.useRef:
    		            return "Ref";
    		        case reactShared.HOOK_TYPE.useImperativeHandle:
    		            return "ImperativeHandle";
    		        case reactShared.HOOK_TYPE.useDebugValue:
    		            return "DebugValue";
    		        case reactShared.HOOK_TYPE.useContext:
    		            return "Context";
    		        case reactShared.HOOK_TYPE.useDeferredValue:
    		            return "DeferredValue";
    		        case reactShared.HOOK_TYPE.useTransition:
    		            return "Transition";
    		        case reactShared.HOOK_TYPE.useId:
    		            return "Id";
    		        case reactShared.HOOK_TYPE.useSyncExternalStore:
    		            return "SyncExternalStore";
    		        case reactShared.HOOK_TYPE.useInsertionEffect:
    		            return "InsertionEffect";
    		        case reactShared.HOOK_TYPE.useState:
    		            return "State";
    		        case reactShared.HOOK_TYPE.useSignal:
    		            return "Signal";
    		    }
    		};
    		var getContextName = function (value) {
    		    return value.displayName || "Context";
    		};
    		var getSource = function (fiber) {
    		    if (fiber._debugElement) {
    		        var element = fiber._debugElement;
    		        return element._source;
    		    }
    		    return null;
    		};
    		var getTree = function (fiber) {
    		    var tree = [];
    		    var parent = fiber === null || fiber === void 0 ? void 0 : fiber.parent;
    		    while (parent) {
    		        var plain = getPlainNodeByFiber(parent);
    		        var id = plain.id;
    		        tree.push(id);
    		        parent = parent.parent;
    		    }
    		    return tree;
    		};
    		var getHook = function (fiber) {
    		    var _a;
    		    var tree = [];
    		    var hookList = fiber.hookList;
    		    var parseHook = function (hook) {
    		        var name = hook.type === reactShared.HOOK_TYPE.useContext ? getContextName(hook.value) : getHookName(hook.type);
    		        var isEffect = hook.type === reactShared.HOOK_TYPE.useEffect || hook.type === reactShared.HOOK_TYPE.useLayoutEffect || hook.type === reactShared.HOOK_TYPE.useInsertionEffect;
    		        var value = safeStringify(isEffect ? hook.value : hook.result);
    		        var deps = safeStringify(hook.deps);
    		        return { name: name, value: value, deps: deps };
    		    };
    		    (_a = hookList === null || hookList === void 0 ? void 0 : hookList.listToFoot) === null || _a === void 0 ? void 0 : _a.call(hookList, function (h) { return tree.push(parseHook(h)); });
    		    return tree;
    		};
    		var parseHook = function (plain) {
    		    var hook = plain.hook;
    		    if (!hook || hook.length === 0)
    		        return [];
    		    return hook.map(function (item) { return (__assign(__assign({}, item), { value: safeParse(item.value), deps: safeParse(item.deps) })); });
    		};
    		var getObj = function (obj) {
    		    return safeStringify(obj);
    		};
    		var parseObj = function (plain) {
    		    var obj = plain.props;
    		    return safeParse(obj);
    		};

    		var treeMap = new Map();
    		var detailMap = new Map();
    		var fiberStore = new Map();
    		var plainStore = new Map();
    		var shallowAssignFiber = function (plain, fiber) {
    		    plain.key = fiber.key;
    		    plain.type = fiber.type;
    		    plain.name = getFiberName(fiber);
    		    // plain.source = getFiberSource(fiber as MyReactFiberNodeDev);
    		    // plain.renderTree = getRenderTree(fiber as MyReactFiberNodeDev);
    		    // plain.fiberType = getFiberType(fiber as MyReactFiberNodeDev);
    		    // plain.hookTree = getHookTree(fiber as MyReactFiberNodeDev);
    		    // plain.ref = safeCloneRef(fiber.ref);
    		    // plain.props = safeClone(fiber.pendingProps);
    		};
    		var assignFiber = function (plain, fiber) {
    		    shallowAssignFiber(plain, fiber);
    		    plain.source = getSource(fiber);
    		    plain.hook = getHook(fiber);
    		    plain.props = getObj(fiber.pendingProps);
    		    plain.tree = getTree(fiber);
    		};
    		var loopTree = function (fiber, parent) {
    		    if (!fiber)
    		        return null;
    		    var exist = treeMap.get(fiber);
    		    var current = exist || new PlainNode();
    		    current.children = null;
    		    if (parent) {
    		        parent.children = parent.children || [];
    		        parent.children.push(current);
    		        current.deep = parent.deep + 1;
    		    }
    		    else {
    		        current.deep = 0;
    		    }
    		    if (!exist) {
    		        shallowAssignFiber(current, fiber);
    		        treeMap.set(fiber, current);
    		        fiberStore.set(current.id, fiber);
    		        plainStore.set(current.id, current);
    		    }
    		    if (fiber.child) {
    		        loopTree(fiber.child, current);
    		    }
    		    if (fiber.sibling) {
    		        loopTree(fiber.sibling, parent);
    		    }
    		    return current;
    		};
    		var generateFiberTreeToPlainTree = function (dispatch) {
    		    var rootFiber = dispatch.rootFiber;
    		    var rootPlain = loopTree(rootFiber);
    		    return rootPlain;
    		};
    		var unmountPlainNode = function (fiber) {
    		    var plain = treeMap.get(fiber);
    		    if (plain) {
    		        fiberStore.delete(plain.id);
    		        plainStore.delete(plain.id);
    		    }
    		    treeMap.delete(fiber);
    		    detailMap.delete(fiber);
    		};
    		var getPlainNodeByFiber = function (fiber) {
    		    return treeMap.get(fiber);
    		};
    		var getDetailNodeByFiber = function (fiber) {
    		    var plainNode = getPlainNodeByFiber(fiber);
    		    if (!plainNode) {
    		        throw new Error("plainNode not found, look like a @my-react/devtools bug");
    		    }
    		    var exist = detailMap.get(fiber);
    		    if (exist) {
    		        assignFiber(exist, fiber);
    		        return exist;
    		    }
    		    else {
    		        var created = new PlainNode(plainNode.id);
    		        assignFiber(created, fiber);
    		        detailMap.set(fiber, created);
    		        return created;
    		    }
    		};
    		var getDetailNodeById = function (id) {
    		    var fiber = fiberStore.get(id);
    		    if (fiber) {
    		        return getDetailNodeByFiber(fiber);
    		    }
    		};
    		var parseDetailNode = function (plain) {
    		    plain.hook = parseHook(plain);
    		    plain.props = parseObj(plain);
    		    return plain;
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

    		exports.DevToolMessageEnum = void 0;
    		(function (DevToolMessageEnum) {
    		    // 初始化，判断是否用@my-react进行页面渲染
    		    DevToolMessageEnum["init"] = "init";
    		    DevToolMessageEnum["ready"] = "ready";
    		    DevToolMessageEnum["update"] = "update";
    		    DevToolMessageEnum["detail"] = "detail";
    		    DevToolMessageEnum["unmount"] = "unmount";
    		})(exports.DevToolMessageEnum || (exports.DevToolMessageEnum = {}));
    		var debounce = function (callback, time) {
    		    var id = null;
    		    return (function () {
    		        var args = [];
    		        for (var _i = 0; _i < arguments.length; _i++) {
    		            args[_i] = arguments[_i];
    		        }
    		        clearTimeout(id);
    		        id = setTimeout(function () {
    		            callback.call.apply(callback, __spreadArray([null], args, false));
    		        }, time || 40);
    		    });
    		};
    		var throttle = function (callback, time) {
    		    var id = null;
    		    return (function () {
    		        var args = [];
    		        for (var _i = 0; _i < arguments.length; _i++) {
    		            args[_i] = arguments[_i];
    		        }
    		        if (id)
    		            return;
    		        id = setTimeout(function () {
    		            callback.call.apply(callback, __spreadArray([null], args, false));
    		            id = null;
    		        }, time || 40);
    		    });
    		};
    		var DevToolCore = /** @class */ (function () {
    		    function DevToolCore() {
    		        var _this = this;
    		        this._dispatch = new Set();
    		        // 是否存在 @my-react
    		        this._detector = false;
    		        this._map = new Map();
    		        this._hoverId = "";
    		        this._selectId = "";
    		        this._enabled = false;
    		        this._listeners = new Set();
    		        this.notifyAll = debounce(function () {
    		            _this.notifyDetector();
    		            _this._dispatch.forEach(function (dispatch) {
    		                _this.notifyDispatch(dispatch);
    		            });
    		            _this.notifyHover();
    		            _this.notifySelect();
    		        }, 200);
    		    }
    		    DevToolCore.prototype.getDispatch = function () {
    		        return Array.from(this._dispatch);
    		    };
    		    DevToolCore.prototype.addDispatch = function (dispatch) {
    		        if (dispatch)
    		            this._detector = true;
    		        if (this.hasDispatch(dispatch))
    		            return;
    		        setupDispatch(dispatch);
    		        this._dispatch.add(dispatch);
    		        this.patchDispatch(dispatch);
    		    };
    		    DevToolCore.prototype.patchDispatch = function (dispatch) {
    		        var _this = this;
    		        if (dispatch.hasPatch)
    		            return;
    		        dispatch.hasPatch = true;
    		        var originalAfterCommit = dispatch.afterCommit;
    		        var originalAfterUpdate = dispatch.afterUpdate;
    		        var onLoad = throttle(function () {
    		            if (!_this._enabled)
    		                return;
    		            _this.notifyDispatch(dispatch);
    		            _this.notifySelect();
    		        }, 200);
    		        dispatch.afterCommit = function () {
    		            var _a;
    		            (_a = originalAfterCommit === null || originalAfterCommit === void 0 ? void 0 : originalAfterCommit.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterCommit, this);
    		            onLoad();
    		        };
    		        dispatch.afterUpdate = function () {
    		            var _a;
    		            (_a = originalAfterUpdate === null || originalAfterUpdate === void 0 ? void 0 : originalAfterUpdate.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterUpdate, this);
    		            onLoad();
    		        };
    		    };
    		    DevToolCore.prototype.hasDispatch = function (dispatch) {
    		        return this._dispatch.has(dispatch);
    		    };
    		    DevToolCore.prototype.delDispatch = function (dispatch) {
    		        this._map.delete(dispatch);
    		        this._dispatch.delete(dispatch);
    		        this.notifyAll();
    		    };
    		    DevToolCore.prototype.subscribe = function (listener) {
    		        var _this = this;
    		        this._listeners.add(listener);
    		        return function () { return _this._listeners.delete(listener); };
    		    };
    		    DevToolCore.prototype.unSubscribe = function (listener) {
    		        this._listeners.delete(listener);
    		    };
    		    DevToolCore.prototype._notify = function (data) {
    		        this._listeners.forEach(function (listener) { return listener(data); });
    		    };
    		    DevToolCore.prototype.getTree = function (dispatch) {
    		        var tree = generateFiberTreeToPlainTree(dispatch);
    		        this._map.set(dispatch, tree);
    		        return tree;
    		    };
    		    DevToolCore.prototype.setSelect = function (id) {
    		        this._selectId = id;
    		    };
    		    DevToolCore.prototype.setHover = function (id) {
    		        this._hoverId = id;
    		    };
    		    DevToolCore.prototype.notifyDetector = function () {
    		        if (!this._enabled)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.init, data: this._detector });
    		    };
    		    DevToolCore.prototype.notifySelect = function () {
    		        if (!this._enabled)
    		            return;
    		        var id = this._selectId;
    		        if (!id) {
    		            {
    		                console.log("[@my-react-devtool/core] select id is empty");
    		            }
    		            return;
    		        }
    		        this._notify({ type: exports.DevToolMessageEnum.detail, data: getDetailNodeById(id) });
    		    };
    		    DevToolCore.prototype.notifyHover = function () {
    		        if (!this._enabled)
    		            return;
    		        var id = this._hoverId;
    		        if (!id) {
    		            {
    		                console.log("[@my-react-devtool/core] hover id is empty");
    		            }
    		            return;
    		        }
    		        this._notify({ type: exports.DevToolMessageEnum.detail, data: getDetailNodeById(id) });
    		    };
    		    DevToolCore.prototype.notifyDispatch = function (dispatch) {
    		        if (!this._enabled)
    		            return;
    		        if (this._dispatch.has(dispatch)) {
    		            var tree = this.getTree(dispatch);
    		            this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
    		        }
    		    };
    		    DevToolCore.prototype.connect = function () {
    		        this._enabled = true;
    		    };
    		    DevToolCore.prototype.disconnect = function () {
    		        this._enabled = false;
    		    };
    		    return DevToolCore;
    		}());

    		exports.DevToolCore = DevToolCore;
    		exports.PlainNode = PlainNode;
    		exports.assignFiber = assignFiber;
    		exports.debounce = debounce;
    		exports.generateFiberTreeToPlainTree = generateFiberTreeToPlainTree;
    		exports.getContextName = getContextName;
    		exports.getDetailNodeByFiber = getDetailNodeByFiber;
    		exports.getDetailNodeById = getDetailNodeById;
    		exports.getFiberName = getFiberName;
    		exports.getFiberTag = getFiberTag;
    		exports.getFiberType = getFiberType;
    		exports.getHook = getHook;
    		exports.getHookName = getHookName;
    		exports.getObj = getObj;
    		exports.getPlainNodeByFiber = getPlainNodeByFiber;
    		exports.getSource = getSource;
    		exports.getTree = getTree;
    		exports.getTypeName = getTypeName;
    		exports.loopTree = loopTree;
    		exports.parseDetailNode = parseDetailNode;
    		exports.parseHook = parseHook;
    		exports.parseObj = parseObj;
    		exports.safeParse = safeParse;
    		exports.safeStringify = safeStringify;
    		exports.shallowAssignFiber = shallowAssignFiber;
    		exports.throttle = throttle;
    		exports.typeKeys = typeKeys;
    		exports.unmountPlainNode = unmountPlainNode;
    		
    	} (index_development));
    	return index_development;
    }

    {
      core.exports = requireIndex_development();
    }

    var coreExports = core.exports;

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

    var port = null;
    var panelWindow = window;
    var workerReady = false;
    var workerConnecting = false;
    // TODO use messageId to sync message
    var messageId = 0;
    var id = null;
    var tabId = chrome.devtools.inspectedWindow.tabId;
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
                {
                    console.error("[@my-react-devtool/panel] worker not ready");
                }
                return;
            }
            id = setTimeout(function () { return runWhenWorkerReady(fn, count ? count + 1 : 1); }, 2000);
        }
    };
    var showPanel = function (onShow, onHide) {
        return new Promise(function (resolve) {
            {
                console.log("[@my-react-devtool/panel] create panel", tabId);
            }
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
    var sendMessage = function (data) {
        runWhenWorkerReady(function () {
            port === null || port === void 0 ? void 0 : port.postMessage(__assign(__assign({}, data), { _messageId: messageId++ }));
        });
    };
    var onRender = function (data, _window) {
        if (data.type === coreExports.DevToolMessageEnum.init) {
            {
                console.log("[@my-react-devtool/panel] init", data.data);
            }
            var detector = data.data;
            try {
                var setRender = _window.useConnect.getActions().setRender;
                setRender(detector);
            }
            catch (e) {
                var typedE = e;
                _window.useConnect.getActions().setError(typedE.message);
            }
        }
        if (data.type === coreExports.DevToolMessageEnum.ready) {
            {
                console.log("[@my-react-devtool/panel] init", data.data);
            }
            var node = data.data;
            try {
                var addNode = _window.useAppTree.getActions().addNode;
                if (node) {
                    addNode(node);
                }
            }
            catch (e) {
                var typedE = e;
                _window.useConnect.getActions().setError(typedE.message);
            }
        }
        if (data.type === coreExports.DevToolMessageEnum.detail) {
            {
                console.log("[@my-react-devtool/panel] detail", data.data);
            }
            var node = data.data;
            try {
                var _a = _window.useDetailNode.getActions(), addNode = _a.addNode, setLoading = _a.setLoading;
                if (node) {
                    if (true) {
                        console.log("[@my-react-devtool/panel] before parse detail node", node);
                    }
                    coreExports.parseDetailNode(node);
                    if (true) {
                        console.log("[@my-react-devtool/panel] after parse detail node", node);
                    }
                    addNode(node);
                    setLoading(false);
                }
            }
            catch (e) {
                var typedE = e;
                _window.useConnect.getActions().setError(typedE.message);
            }
        }
    };
    var initSelectListen = function (_window) {
        var useTreeNode = _window.useTreeNode;
        var useDetailNode = _window.useDetailNode;
        try {
            return useTreeNode.subscribe(function (s) { return s.select; }, function () {
                var currentSelect = useTreeNode.getReadonlyState().select;
                console.log("select", currentSelect === null || currentSelect === void 0 ? void 0 : currentSelect.current);
                if (currentSelect === null || currentSelect === void 0 ? void 0 : currentSelect.current) {
                    useDetailNode.getActions().setLoading(true);
                    sendMessage({ type: MessagePanelType.nodeSelect, data: currentSelect.current.id });
                }
            });
        }
        catch (_a) {
        }
    };
    // TODO
    var initHoverListen = function (_window) {
        var useTreeNode = _window.useTreeNode;
        var useDetailNode = _window.useDetailNode;
        try {
            return useTreeNode.subscribe(function (s) { return s.hover; }, function () {
                var currentHover = useTreeNode.getReadonlyState().hover;
                console.log("hover", currentHover === null || currentHover === void 0 ? void 0 : currentHover.current);
                if (currentHover === null || currentHover === void 0 ? void 0 : currentHover.current) {
                    useDetailNode.getActions().setLoading(true);
                    sendMessage({ type: MessagePanelType.nodeHover, data: currentHover.current.id });
                }
            });
        }
        catch (_a) {
        }
    };
    var initPort = function () {
        workerConnecting = true;
        var _a = panelWindow.useConnect.getActions(), disconnect = _a.disconnect, setConnectHandler = _a.setConnectHandler;
        setConnectHandler(function () { return initPort(); });
        port = chrome.runtime.connect({ name: tabId.toString() });
        var onMessage = function (message) {
            workerConnecting = false;
            {
                console.log("[@my-react-devtool/panel] message from port", message);
            }
            if (!workerReady && message.type === MessageWorkerType.init) {
                workerReady = true;
                panelWindow.useConnect.getActions().connect();
            }
            if ((message === null || message === void 0 ? void 0 : message.type) === MessageHookType.render) {
                onRender(message.data, panelWindow);
            }
        };
        var onDisconnect = function () {
            console.log("[@my-react-devtool/panel] disconnect");
            port.onMessage.removeListener(onMessage);
            disconnect();
            port = null;
            workerReady = false;
        };
        port.onMessage.addListener(onMessage);
        port.onDisconnect.addListener(onDisconnect);
    };
    var init = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var cleanList_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    cleanList_1 = [];
                    return [4 /*yield*/, showPanel(function (window) {
                            {
                                console.log("show panel");
                            }
                            panelWindow = window;
                            sendMessage({ type: MessagePanelType.show });
                            cleanList_1.push(initSelectListen(window), initHoverListen(window));
                        }, function () {
                            {
                                console.log("hide panel");
                            }
                            sendMessage({ type: MessagePanelType.hide });
                            cleanList_1.forEach(function (f) { return f(); });
                        })];
                case 1:
                    _a.sent();
                    initPort();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    init(tabId);

})();
//# sourceMappingURL=panel.development.js.map
