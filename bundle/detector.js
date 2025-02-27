(function () {
    'use strict';

    var core = {exports: {}};

    var index_production$1 = {};

    var reactShared = {exports: {}};

    var index_production = {};

    var hasRequiredIndex_production$1;

    function requireIndex_production$1 () {
    	if (hasRequiredIndex_production$1) return index_production;
    	hasRequiredIndex_production$1 = 1;
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
    		/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


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
    		    STATE_TYPE[STATE_TYPE["__retrigger__"] = 2048] = "__retrigger__";
    		    STATE_TYPE[STATE_TYPE["__rerun__"] = 4096] = "__rerun__";
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
    		
    	} (index_production));
    	return index_production;
    }

    var hasRequiredReactShared;

    function requireReactShared () {
    	if (hasRequiredReactShared) return reactShared.exports;
    	hasRequiredReactShared = 1;

    	{
    	  reactShared.exports = requireIndex_production$1();
    	}
    	return reactShared.exports;
    }

    var hasRequiredIndex_production;

    function requireIndex_production () {
    	if (hasRequiredIndex_production) return index_production$1;
    	hasRequiredIndex_production = 1;
    	(function (exports) {

    		var reactShared = requireReactShared();

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

    		var isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
    		var emptyConstructor = {}.constructor;
    		var id$1 = 1;
    		var loadById = false;
    		var idToValueMap = new Map();
    		var valueToIdMap = new Map();
    		var cacheMap = new WeakMap();
    		var getType = function (value) {
    		    if (isInBrowser && value && value instanceof Element) {
    		        return "Element";
    		    }
    		    var type = Object.prototype.toString.call(value).slice(8, -1);
    		    if (type === "Object" && typeof value[Symbol.iterator] === "function") {
    		        return "Iterable";
    		    }
    		    if (type === "Custom" && value.constructor !== Object && value instanceof Object) {
    		        // For projects implementing objects overriding `.prototype[Symbol.toStringTag]`
    		        return "Object";
    		    }
    		    return type;
    		};
    		var isObject = function (value) {
    		    return (value === "Object" ||
    		        // value === "Error" ||
    		        // value === "WeakMap" ||
    		        // value === "WeakSet" ||
    		        value === "Array" ||
    		        value === "Iterable" ||
    		        value === "Map" ||
    		        // value === "Promise" ||
    		        value === "Set");
    		};
    		var getTargetNode = function (value, type, deep) {
    		    if (deep === void 0) { deep = 3; }
    		    var existId = valueToIdMap.get(value);
    		    var currentId = existId || id$1++;
    		    idToValueMap.set(currentId, value);
    		    valueToIdMap.set(value, currentId);
    		    // full deep to load
    		    if (deep === 0) {
    		        return {
    		            i: currentId,
    		            t: type,
    		            v: undefined,
    		            e: true,
    		            l: false,
    		        };
    		    }
    		    else {
    		        if (type === "Array") {
    		            return {
    		                i: currentId,
    		                t: type,
    		                v: value.map(function (val) { return getNode(val, deep - 1); }),
    		                e: true,
    		            };
    		        }
    		        else if (type === "Iterable") {
    		            return {
    		                i: currentId,
    		                t: type,
    		                v: Array.from(value).map(function (val) { return getNode(val, deep - 1); }),
    		                e: true,
    		            };
    		        }
    		        else if (type === "Map") {
    		            return {
    		                i: currentId,
    		                t: type,
    		                v: Array.from(value.entries()).map(function (_a) {
    		                    var key = _a[0], val = _a[1];
    		                    return ({
    		                        t: "Array",
    		                        e: true,
    		                        v: [getNode(key, deep - 1), getNode(val, deep - 1)],
    		                    });
    		                }),
    		                e: true,
    		            };
    		        }
    		        else if (type === "Set") {
    		            return {
    		                i: currentId,
    		                t: type,
    		                v: Array.from(value).map(function (val) { return getNode(val, deep - 1); }),
    		                e: true,
    		            };
    		        }
    		        else if (type === "Object") {
    		            if (typeof (value === null || value === void 0 ? void 0 : value.constructor) === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
    		                return {
    		                    i: currentId,
    		                    t: type,
    		                    n: value.constructor.name,
    		                    v: Object.keys(value).reduce(function (acc, key) {
    		                        acc[key] = getNode(value[key], deep - 1);
    		                        return acc;
    		                    }, {}),
    		                    e: true,
    		                };
    		            }
    		            return {
    		                i: currentId,
    		                t: type,
    		                v: Object.keys(value).reduce(function (acc, key) {
    		                    acc[key] = getNode(value[key], deep - 1);
    		                    return acc;
    		                }, {}),
    		                e: true,
    		            };
    		        }
    		    }
    		};
    		var getNodeWithCache = function (value, type, deep) {
    		    if (deep === void 0) { deep = 3; }
    		    if (loadById) {
    		        var cache = cacheMap.get(value);
    		        if (cache) {
    		            return __assign(__assign({}, cache), { c: true });
    		        }
    		    }
    		    var v = getTargetNode(value, type, deep);
    		    if ((v === null || v === void 0 ? void 0 : v.l) === false) {
    		        return v;
    		    }
    		    cacheMap.set(value, v);
    		    return v;
    		};
    		var getNode = function (value, deep) {
    		    if (deep === void 0) { deep = 3; }
    		    try {
    		        var type = getType(value);
    		        var expandable = isObject(type);
    		        if (expandable) {
    		            // full deep to load
    		            return getNodeWithCache(value, type, deep);
    		        }
    		        else {
    		            var existId = valueToIdMap.get(value);
    		            var currentId = existId || id$1++;
    		            idToValueMap.set(currentId, value);
    		            valueToIdMap.set(value, currentId);
    		            if (type === "Element") {
    		                return {
    		                    i: currentId,
    		                    t: type,
    		                    v: "<".concat(value.tagName.toLowerCase(), " />"),
    		                    e: expandable,
    		                };
    		            }
    		            if (type === "Error") {
    		                return {
    		                    i: currentId,
    		                    t: type,
    		                    v: value.message,
    		                    e: expandable,
    		                };
    		            }
    		            if (typeof value === "object" && value !== null) {
    		                return {
    		                    i: currentId,
    		                    t: type,
    		                    v: Object.prototype.toString.call(value),
    		                    e: expandable,
    		                };
    		            }
    		            else {
    		                return {
    		                    i: currentId,
    		                    t: type,
    		                    v: String(value),
    		                    e: expandable,
    		                };
    		            }
    		        }
    		    }
    		    catch (e) {
    		        return {
    		            i: NaN,
    		            t: "ReadError",
    		            v: "Read data error: " + e.message,
    		            e: false,
    		        };
    		    }
    		};
    		var getNodeForce = function (value, deep) {
    		    if (deep === void 0) { deep = 3; }
    		    cacheMap = new WeakMap();
    		    return getNode(value, deep);
    		};
    		var getNodeFromId = function (id) {
    		    var value = idToValueMap.get(id);
    		    if (value) {
    		        loadById = true;
    		        var res = getNode(value);
    		        loadById = false;
    		        return res;
    		    }
    		};
    		var getValueById = function (id) {
    		    if (id && !Number.isNaN(id)) {
    		        return { v: idToValueMap.get(id), f: true };
    		    }
    		    else {
    		        return { v: undefined, f: false };
    		    }
    		};

    		exports.MessageHookType = void 0;
    		(function (MessageHookType) {
    		    MessageHookType["init"] = "hook-init";
    		    MessageHookType["mount"] = "hook-mount";
    		    MessageHookType["render"] = "hook-render";
    		    MessageHookType["origin"] = "hook-origin";
    		})(exports.MessageHookType || (exports.MessageHookType = {}));
    		exports.MessageDetectorType = void 0;
    		(function (MessageDetectorType) {
    		    MessageDetectorType["init"] = "detector-init";
    		})(exports.MessageDetectorType || (exports.MessageDetectorType = {}));
    		exports.MessagePanelType = void 0;
    		(function (MessagePanelType) {
    		    MessagePanelType["show"] = "panel-show";
    		    MessagePanelType["hide"] = "panel-hide";
    		    MessagePanelType["varStore"] = "panel-var-store";
    		    MessagePanelType["varSource"] = "panel-var-source";
    		    MessagePanelType["enableHover"] = "panel-enable-hover";
    		    MessagePanelType["enableUpdate"] = "panel-enable-update";
    		    MessagePanelType["enableHoverOnBrowser"] = "panel-enable-hover-on-browser";
    		    MessagePanelType["nodeHover"] = "panel-hover";
    		    MessagePanelType["nodeSelect"] = "panel-select";
    		    MessagePanelType["nodeStore"] = "panel-store";
    		    MessagePanelType["nodeTrigger"] = "panel-trigger";
    		    MessagePanelType["nodeInspect"] = "panel-inspect";
    		    MessagePanelType["nodeSelectForce"] = "panel-select-force";
    		    MessagePanelType["chunks"] = "panel-chunks";
    		    MessagePanelType["clear"] = "panel-clear";
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
    		    DevToolMessageEnum["hmr"] = "hmr";
    		    DevToolMessageEnum["hmrStatus"] = "hmrStatus";
    		    DevToolMessageEnum["run"] = "run";
    		    DevToolMessageEnum["source"] = "source";
    		    DevToolMessageEnum["detail"] = "detail";
    		    DevToolMessageEnum["unmount"] = "unmount";
    		    DevToolMessageEnum["select-unmount"] = "select-unmount";
    		    DevToolMessageEnum["message"] = "message";
    		    DevToolMessageEnum["warn"] = "warn";
    		    DevToolMessageEnum["error"] = "error";
    		    DevToolMessageEnum["chunks"] = "chunks";
    		    DevToolMessageEnum["dom-hover"] = "dom-hover";
    		})(exports.DevToolMessageEnum || (exports.DevToolMessageEnum = {}));
    		exports.HMRStatus = void 0;
    		(function (HMRStatus) {
    		    HMRStatus[HMRStatus["refresh"] = 1] = "refresh";
    		    HMRStatus[HMRStatus["remount"] = 2] = "remount";
    		})(exports.HMRStatus || (exports.HMRStatus = {}));
    		var DevToolSource = "@my-react/devtool";

    		var id = 0;
    		// PlainNode is a simplified version of FiberNode just for show the structure
    		var PlainNode = /** @class */ (function () {
    		    // hooks: HOOKTree[];
    		    function PlainNode(_id) {
    		        this.i = _id || "".concat(id++);
    		    }
    		    return PlainNode;
    		}());

    		// sync from import { NODE_TYPE } from '@my-react/react-reconciler';
    		exports.NODE_TYPE = void 0;
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
    		    NODE_TYPE[NODE_TYPE["__context__"] = 524288] = "__context__";
    		    NODE_TYPE[NODE_TYPE["__scopeLazy__"] = 1048576] = "__scopeLazy__";
    		    NODE_TYPE[NODE_TYPE["__scopeSuspense__"] = 2097152] = "__scopeSuspense__";
    		})(exports.NODE_TYPE || (exports.NODE_TYPE = {}));

    		var treeMap = new Map();
    		var detailMap = new Map();
    		var fiberStore = new Map();
    		var domToFiber = new WeakMap();
    		var plainStore = new Map();
    		var directory = {};
    		var count = 0;
    		var shallowAssignFiber = function (plain, fiber) {
    		    var hasKey = fiber.key !== null && fiber.key !== undefined;
    		    if (fiber.nativeNode) {
    		        domToFiber.set(fiber.nativeNode, fiber);
    		    }
    		    var typedContainerFiber = fiber;
    		    if (typedContainerFiber.containerNode) {
    		        domToFiber.set(typedContainerFiber.containerNode, fiber);
    		    }
    		    if (hasKey && !directory[fiber.key]) {
    		        directory[fiber.key] = ++count + "";
    		    }
    		    var name = getFiberName(fiber);
    		    if (!directory[name]) {
    		        directory[name] = ++count + "";
    		    }
    		    plain.k = hasKey ? directory[fiber.key] : undefined;
    		    var _a = getFiberType(fiber), t = _a.t, hasCompiler = _a.hasCompiler;
    		    plain.t = t;
    		    if (hasCompiler) {
    		        plain.m = true;
    		    }
    		    plain.n = directory[name];
    		};
    		var assignFiber = function (plain, fiber, force) {
    		    shallowAssignFiber(plain, fiber);
    		    plain.p = getProps(fiber, force);
    		    plain._s = getSource(fiber);
    		    plain._t = getTree(fiber);
    		    plain._h = getHook(fiber, force);
    		    if (fiber.type & exports.NODE_TYPE.__class__) {
    		        plain.s = getState(fiber, force);
    		    }
    		};
    		// TODO improve performance
    		var loopTree = function (fiber, parent) {
    		    if (!fiber)
    		        return null;
    		    var exist = treeMap.get(fiber);
    		    var current = exist || new PlainNode();
    		    current.c = null;
    		    if (parent) {
    		        parent.c = parent.c || [];
    		        parent.c.push(current);
    		        current._d = parent._d + 1;
    		    }
    		    else {
    		        current._d = 0;
    		    }
    		    shallowAssignFiber(current, fiber);
    		    if (!exist) {
    		        treeMap.set(fiber, current);
    		        fiberStore.set(current.i, fiber);
    		        plainStore.set(current.i, current);
    		    }
    		    if (fiber.child) {
    		        loopTree(fiber.child, current);
    		    }
    		    if (fiber.sibling) {
    		        loopTree(fiber.sibling, parent);
    		    }
    		    return { current: current, directory: directory };
    		};
    		var loopChangedTree = function (fiber, set, parent) {
    		    if (!fiber)
    		        return null;
    		    set.add(fiber);
    		    var exist = treeMap.get(fiber);
    		    // TODO throw a error?
    		    if (!exist && !parent)
    		        return null;
    		    var current = exist || new PlainNode();
    		    current.c = null;
    		    if (parent) {
    		        parent.c = parent.c || [];
    		        parent.c.push(current);
    		        current._d = parent._d + 1;
    		    }
    		    shallowAssignFiber(current, fiber);
    		    if (!exist) {
    		        treeMap.set(fiber, current);
    		        fiberStore.set(current.i, fiber);
    		        plainStore.set(current.i, current);
    		    }
    		    if (fiber.child) {
    		        loopChangedTree(fiber.child, set, current);
    		    }
    		    if (fiber.sibling) {
    		        loopChangedTree(fiber.sibling, set, parent);
    		    }
    		    return { current: current, directory: directory };
    		};
    		var generateTreeMap = function (dispatch) {
    		    var rootFiber = dispatch.rootFiber;
    		    var rootNode = loopTree(rootFiber);
    		    return rootNode;
    		};
    		var unmountPlainNode = function (fiber, runtime) {
    		    var plain = treeMap.get(fiber);
    		    if (plain) {
    		        if (plain.i === runtime._selectId) {
    		            runtime.notifyUnSelect();
    		        }
    		        fiberStore.delete(plain.i);
    		        plainStore.delete(plain.i);
    		    }
    		    treeMap.delete(fiber);
    		    detailMap.delete(fiber);
    		};
    		var getPlainNodeByFiber = function (fiber) {
    		    return treeMap.get(fiber);
    		};
    		var getPlainNodeIdByFiber = function (fiber) {
    		    var node = getPlainNodeByFiber(fiber);
    		    return node === null || node === void 0 ? void 0 : node.i;
    		};
    		var getTreeByFiber = function (fiber) {
    		    if (!fiber)
    		        return null;
    		    if (fiber.parent) {
    		        return getTreeByFiber(fiber.parent);
    		    }
    		    else {
    		        return getPlainNodeByFiber(fiber);
    		    }
    		};
    		var getPlainNodeArrayByList = function (list) {
    		    var hasViewList = new WeakSet();
    		    var result = [];
    		    list.listToFoot(function (fiber) {
    		        if (hasViewList.has(fiber))
    		            return;
    		        hasViewList.add(fiber);
    		        var re = loopChangedTree(fiber, hasViewList);
    		        if (re && re.current) {
    		            result.push(re.current);
    		        }
    		    });
    		    return { result: result, directory: directory };
    		};
    		var getDetailNodeByFiber = function (fiber, force) {
    		    var plainNode = getPlainNodeByFiber(fiber);
    		    if (!plainNode) {
    		        throw new Error("plainNode not found, look like a bug for @my-react/devtools");
    		    }
    		    var exist = detailMap.get(fiber);
    		    if (exist) {
    		        assignFiber(exist, fiber, force);
    		        return exist;
    		    }
    		    else {
    		        var created = new PlainNode(plainNode.i);
    		        assignFiber(created, fiber, force);
    		        detailMap.set(fiber, created);
    		        return created;
    		    }
    		};
    		var getComponentFiberByDom = function (dom) {
    		    var fiber = domToFiber.get(dom);
    		    if (!fiber)
    		        return;
    		    var r = fiber;
    		    while (r) {
    		        if (reactShared.include(r.type, exports.NODE_TYPE.__class__) | reactShared.include(r.type, exports.NODE_TYPE.__function__)) {
    		            return r;
    		        }
    		        r = r.parent;
    		    }
    		};
    		var getElementNodesFromFiber = function (fiber) {
    		    var nodes = [];
    		    var fibers = fiber ? [fiber] : [];
    		    while (fibers.length) {
    		        var c = fibers.shift();
    		        if (c.nativeNode) {
    		            nodes.push(c.nativeNode);
    		        }
    		        else {
    		            var l = c.child;
    		            while (l) {
    		                fibers.push(l);
    		                l = l.sibling;
    		            }
    		        }
    		    }
    		    return nodes;
    		};
    		var getFiberNodeById = function (id) {
    		    return fiberStore.get(id);
    		};

    		var typeKeys = [];
    		// SEE https://github.com/facebook/react/blob/main/compiler/packages/react-compiler-runtime/src/index.ts
    		var reactCompilerSymbol = Symbol.for("react.memo_cache_sentinel");
    		Object.keys(exports.NODE_TYPE).forEach(function (key) {
    		    if (!key.startsWith("__")) {
    		        typeKeys.push(+key);
    		    }
    		});
    		var getTypeName = function (type) {
    		    switch (type) {
    		        case exports.NODE_TYPE.__keepLive__:
    		            return "KeepAlive";
    		        case exports.NODE_TYPE.__memo__:
    		            return "Memo";
    		        case exports.NODE_TYPE.__forwardRef__:
    		            return "ForwardRef";
    		        case exports.NODE_TYPE.__lazy__:
    		            return "Lazy";
    		        case exports.NODE_TYPE.__provider__:
    		            return "Provider";
    		        case exports.NODE_TYPE.__consumer__:
    		            return "Consumer";
    		        case exports.NODE_TYPE.__fragment__:
    		            return "Fragment";
    		        case exports.NODE_TYPE.__scope__:
    		            return "Scope";
    		        case exports.NODE_TYPE.__strict__:
    		            return "Strict";
    		        case exports.NODE_TYPE.__profiler__:
    		            return "Profiler";
    		        case exports.NODE_TYPE.__suspense__:
    		            return "Suspense";
    		        case exports.NODE_TYPE.__portal__:
    		            return "Portal";
    		        case exports.NODE_TYPE.__comment__:
    		            return "Comment";
    		        case exports.NODE_TYPE.__empty__:
    		            return "Empty";
    		        case exports.NODE_TYPE.__null__:
    		            return "Null";
    		        case exports.NODE_TYPE.__text__:
    		            return "Text";
    		        case exports.NODE_TYPE.__function__:
    		            return "Function";
    		        case exports.NODE_TYPE.__class__:
    		            return "Class";
    		        case exports.NODE_TYPE.__plain__:
    		            return "Plain";
    		        case exports.NODE_TYPE.__initial__:
    		            return "Initial";
    		        case exports.NODE_TYPE.__context__:
    		            return "Context";
    		        case exports.NODE_TYPE.__scopeLazy__:
    		            return "ScopeLazy";
    		        case exports.NODE_TYPE.__scopeSuspense__:
    		            return "ScopeSuspense";
    		        default:
    		            return "";
    		    }
    		};
    		var getFiberTag = function (node) {
    		    var t = node.t;
    		    var tag = [];
    		    if (t & exports.NODE_TYPE.__memo__) {
    		        tag.push("memo");
    		    }
    		    if (t & exports.NODE_TYPE.__forwardRef__) {
    		        tag.push("forwardRef");
    		    }
    		    if (t & exports.NODE_TYPE.__lazy__) {
    		        tag.push("lazy");
    		    }
    		    if (node.m) {
    		        tag.push("compiler ✨");
    		    }
    		    return tag;
    		};
    		var getFiberType = function (fiber) {
    		    var _a;
    		    var t = fiber.type;
    		    var hasCompiler = false;
    		    // check react compiler
    		    (_a = fiber.hookList) === null || _a === void 0 ? void 0 : _a.listToFoot(function (l) {
    		        var _a;
    		        if (hasCompiler)
    		            return;
    		        if (l.type === reactShared.HOOK_TYPE.useMemo && ((_a = l.result) === null || _a === void 0 ? void 0 : _a[reactCompilerSymbol])) {
    		            hasCompiler = true;
    		        }
    		    });
    		    return { t: t, hasCompiler: hasCompiler };
    		};
    		var getFiberName = function (fiber) {
    		    var typedFiber = fiber;
    		    if (fiber.type & exports.NODE_TYPE.__provider__) {
    		        var typedElementType = fiber.elementType;
    		        var name_1 = typedElementType.Context.displayName;
    		        return "".concat(name_1 || "Context", ".Provider");
    		    }
    		    if (fiber.type & exports.NODE_TYPE.__context__) {
    		        // fix: next version
    		        var typedElementType = fiber.elementType;
    		        var name_2 = typedElementType.displayName;
    		        return "".concat(name_2 || "Context");
    		    }
    		    if (fiber.type & exports.NODE_TYPE.__consumer__) {
    		        var typedElementType = fiber.elementType;
    		        var name_3 = typedElementType.Context.displayName;
    		        return "".concat(name_3 || "Context", ".Consumer");
    		    }
    		    if (fiber.type & exports.NODE_TYPE.__lazy__) {
    		        var typedElementType = fiber.elementType;
    		        var typedRender = typedElementType === null || typedElementType === void 0 ? void 0 : typedElementType.render;
    		        var name_4 = (typedRender === null || typedRender === void 0 ? void 0 : typedRender.displayName) || (typedRender === null || typedRender === void 0 ? void 0 : typedRender.name) || "";
    		        var element = typedFiber._debugElement;
    		        var type = element === null || element === void 0 ? void 0 : element.type;
    		        name_4 = (type === null || type === void 0 ? void 0 : type.displayName) || name_4;
    		        return "".concat(name_4 || "Anonymous");
    		    }
    		    if (fiber.type & exports.NODE_TYPE.__portal__)
    		        return "Portal";
    		    if (fiber.type & exports.NODE_TYPE.__null__)
    		        return "Null";
    		    if (fiber.type & exports.NODE_TYPE.__empty__)
    		        return "Empty";
    		    if (fiber.type & exports.NODE_TYPE.__scope__)
    		        return "Scope";
    		    if (fiber.type & exports.NODE_TYPE.__scopeLazy__)
    		        return "ScopeLazy";
    		    if (fiber.type & exports.NODE_TYPE.__scopeSuspense__)
    		        return "ScopeSuspense";
    		    if (fiber.type & exports.NODE_TYPE.__strict__)
    		        return "Strict";
    		    if (fiber.type & exports.NODE_TYPE.__profiler__)
    		        return "Profiler";
    		    if (fiber.type & exports.NODE_TYPE.__suspense__)
    		        return "Suspense";
    		    if (fiber.type & exports.NODE_TYPE.__comment__)
    		        return "Comment";
    		    if (fiber.type & exports.NODE_TYPE.__keepLive__)
    		        return "KeepAlive";
    		    if (fiber.type & exports.NODE_TYPE.__fragment__)
    		        return "Fragment";
    		    if (fiber.type & exports.NODE_TYPE.__text__)
    		        return "text";
    		    if (typeof fiber.elementType === "string")
    		        return "".concat(fiber.elementType);
    		    if (typeof fiber.elementType === "function") {
    		        var typedElementType = fiber.elementType;
    		        var name_5 = typedElementType.displayName || typedElementType.name || "Anonymous";
    		        var element = typedFiber._debugElement;
    		        // may be a Suspense element
    		        var type = element === null || element === void 0 ? void 0 : element.type;
    		        name_5 = (type === null || type === void 0 ? void 0 : type.displayName) || name_5;
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
    		    var current = fiber;
    		    var parent = current === null || current === void 0 ? void 0 : current.parent;
    		    while (parent) {
    		        var plain = getPlainNodeByFiber(parent);
    		        var id = plain.i;
    		        tree.push(id);
    		        current = parent;
    		        parent = parent.parent;
    		    }
    		    if (current) {
    		        var typedCurrent = current;
    		        var dispatch = typedCurrent.renderDispatch;
    		        if (dispatch && dispatch.renderMode) {
    		            tree.push("@my-react ".concat(dispatch.renderMode));
    		        }
    		        if (dispatch && dispatch.version) {
    		            tree.push("@my-react ".concat(dispatch.version));
    		        }
    		        else {
    		            tree.push("@my-react legacy");
    		        }
    		    }
    		    return tree;
    		};
    		var getHook = function (fiber, force) {
    		    var _a;
    		    var final = [];
    		    var hookList = fiber.hookList;
    		    var processStack = function (hook, index) {
    		        var _a, _b;
    		        var stack = hook._debugStack;
    		        if (!stack || !Array.isArray(stack) || stack.length === 0) {
    		            var isEffect = hook.type === reactShared.HOOK_TYPE.useEffect || hook.type === reactShared.HOOK_TYPE.useLayoutEffect || hook.type === reactShared.HOOK_TYPE.useInsertionEffect;
    		            var isContext = hook.type === reactShared.HOOK_TYPE.useContext;
    		            final.push({
    		                k: index.toString(),
    		                h: true,
    		                i: index,
    		                n: isContext ? getContextName(hook.value) : getHookName(hook.type),
    		                v: force ? getNodeForce(isEffect ? hook.value : hook.result) : getNode(isEffect ? hook.value : hook.result),
    		                d: 0,
    		            });
    		        }
    		        else {
    		            var prevHookTree = final.at(-1);
    		            var parentHookChild = final;
    		            for (var i = 0; i < stack.length; i++) {
    		                var isHook = i === stack.length - 1;
    		                var _c = stack[i], name_6 = _c.name, id = _c.id;
    		                if (id === (prevHookTree === null || prevHookTree === void 0 ? void 0 : prevHookTree.k)) {
    		                    if (isHook) {
    		                        var hookTree = { k: id, i: index, h: isHook, d: i, n: name_6.startsWith("use") ? name_6.substring(3) : name_6 };
    		                        parentHookChild.push(hookTree);
    		                        prevHookTree = hookTree;
    		                    }
    		                    else {
    		                        prevHookTree.c = prevHookTree.c || [];
    		                        parentHookChild = prevHookTree.c;
    		                        prevHookTree = (_a = prevHookTree.c) === null || _a === void 0 ? void 0 : _a.at(-1);
    		                    }
    		                }
    		                else {
    		                    var hookTree = { k: id, i: isHook ? index : undefined, h: isHook, d: i, n: name_6.startsWith("use") ? name_6.substring(3) : name_6 };
    		                    if (isHook) {
    		                        parentHookChild.push(hookTree);
    		                        prevHookTree = hookTree;
    		                    }
    		                    else {
    		                        parentHookChild.push(hookTree);
    		                        hookTree.c = hookTree.c || [];
    		                        parentHookChild = hookTree.c;
    		                        prevHookTree = (_b = hookTree.c) === null || _b === void 0 ? void 0 : _b.at(-1);
    		                    }
    		                }
    		                if (isHook) {
    		                    var isEffect = hook.type === reactShared.HOOK_TYPE.useEffect || hook.type === reactShared.HOOK_TYPE.useLayoutEffect || hook.type === reactShared.HOOK_TYPE.useInsertionEffect;
    		                    var isContext = hook.type === reactShared.HOOK_TYPE.useContext;
    		                    // overwrite name
    		                    prevHookTree.n = isContext ? getContextName(hook.value) : getHookName(hook.type);
    		                    prevHookTree.v = force ? getNodeForce(isEffect ? hook.value : hook.result) : getNode(isEffect ? hook.value : hook.result);
    		                }
    		            }
    		        }
    		    };
    		    (_a = hookList === null || hookList === void 0 ? void 0 : hookList.toArray()) === null || _a === void 0 ? void 0 : _a.forEach(processStack);
    		    return final;
    		};
    		var getProps = function (fiber, force) {
    		    return force ? getNodeForce(fiber.pendingProps) : getNode(fiber.pendingProps);
    		};
    		var getState = function (fiber, force) {
    		    return force ? getNodeForce(fiber.pendingState) : getNode(fiber.pendingState);
    		};
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

    		// Get the window object for the document that a node belongs to,
    		// or return null if it cannot be found (node not attached to DOM,
    		// etc).
    		function getOwnerWindow(node) {
    		    if (!node.ownerDocument) {
    		        return null;
    		    }
    		    return node.ownerDocument.defaultView;
    		}
    		// Get the iframe containing a node, or return null if it cannot
    		// be found (node not within iframe, etc).
    		function getOwnerIframe(node) {
    		    var nodeWindow = getOwnerWindow(node);
    		    if (nodeWindow) {
    		        return nodeWindow.frameElement;
    		    }
    		    return null;
    		}
    		// Get a bounding client rect for a node, with an
    		// offset added to compensate for its border.
    		function getBoundingClientRectWithBorderOffset(node) {
    		    var dimensions = getElementDimensions(node);
    		    return mergeRectOffsets([
    		        node.getBoundingClientRect(),
    		        {
    		            top: dimensions.borderTop,
    		            left: dimensions.borderLeft,
    		            bottom: dimensions.borderBottom,
    		            right: dimensions.borderRight,
    		            // This width and height won't get used by mergeRectOffsets (since this
    		            // is not the first rect in the array), but we set them so that this
    		            // object type checks as a ClientRect.
    		            width: 0,
    		            height: 0,
    		        },
    		    ]);
    		}
    		// Add together the top, left, bottom, and right properties of
    		// each ClientRect, but keep the width and height of the first one.
    		function mergeRectOffsets(rects) {
    		    return rects.reduce(function (previousRect, rect) {
    		        if (previousRect == null) {
    		            return rect;
    		        }
    		        return {
    		            top: previousRect.top + rect.top,
    		            left: previousRect.left + rect.left,
    		            width: previousRect.width,
    		            height: previousRect.height,
    		            bottom: previousRect.bottom + rect.bottom,
    		            right: previousRect.right + rect.right,
    		        };
    		    });
    		}
    		// Calculate a boundingClientRect for a node relative to boundaryWindow,
    		// taking into account any offsets caused by intermediate iframes.
    		function getNestedBoundingClientRect(node, boundaryWindow) {
    		    var ownerIframe = getOwnerIframe(node);
    		    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    		    // @ts-ignore
    		    if (ownerIframe && ownerIframe !== boundaryWindow) {
    		        var rects = [node.getBoundingClientRect()];
    		        var currentIframe = ownerIframe;
    		        var onlyOneMore = false;
    		        while (currentIframe) {
    		            var rect = getBoundingClientRectWithBorderOffset(currentIframe);
    		            rects.push(rect);
    		            currentIframe = getOwnerIframe(currentIframe);
    		            if (onlyOneMore) {
    		                break;
    		            }
    		            // We don't want to calculate iframe offsets upwards beyond
    		            // the iframe containing the boundaryWindow, but we
    		            // need to calculate the offset relative to the boundaryWindow.
    		            if (currentIframe && getOwnerWindow(currentIframe) === boundaryWindow) {
    		                onlyOneMore = true;
    		            }
    		        }
    		        return mergeRectOffsets(rects);
    		    }
    		    else {
    		        return node.getBoundingClientRect();
    		    }
    		}
    		function getElementDimensions(domElement) {
    		    var calculatedStyle = window.getComputedStyle(domElement);
    		    return {
    		        borderLeft: parseInt(calculatedStyle.borderLeftWidth, 10),
    		        borderRight: parseInt(calculatedStyle.borderRightWidth, 10),
    		        borderTop: parseInt(calculatedStyle.borderTopWidth, 10),
    		        borderBottom: parseInt(calculatedStyle.borderBottomWidth, 10),
    		        marginLeft: parseInt(calculatedStyle.marginLeft, 10),
    		        marginRight: parseInt(calculatedStyle.marginRight, 10),
    		        marginTop: parseInt(calculatedStyle.marginTop, 10),
    		        marginBottom: parseInt(calculatedStyle.marginBottom, 10),
    		        paddingLeft: parseInt(calculatedStyle.paddingLeft, 10),
    		        paddingRight: parseInt(calculatedStyle.paddingRight, 10),
    		        paddingTop: parseInt(calculatedStyle.paddingTop, 10),
    		        paddingBottom: parseInt(calculatedStyle.paddingBottom, 10),
    		    };
    		}

    		/* eslint-disable @typescript-eslint/ban-ts-comment */
    		// https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/backend/views/Highlighter/Overlay.js
    		var assign = Object.assign;
    		// Note that the Overlay components are not affected by the active Theme,
    		// because they highlight elements in the main Chrome window (outside of devtools).
    		// The colors below were chosen to roughly match those used by Chrome devtools.
    		var OverlayRect = /** @class */ (function () {
    		    function OverlayRect(doc, container) {
    		        this.node = doc.createElement("div");
    		        this.border = doc.createElement("div");
    		        this.padding = doc.createElement("div");
    		        this.content = doc.createElement("div");
    		        this.border.style.borderColor = overlayStyles.border;
    		        this.padding.style.borderColor = overlayStyles.padding;
    		        this.content.style.backgroundColor = overlayStyles.background;
    		        assign(this.node.style, {
    		            borderColor: overlayStyles.margin,
    		            pointerEvents: "none",
    		            position: "fixed",
    		        });
    		        this.node.style.zIndex = "10000000";
    		        this.node.appendChild(this.border);
    		        this.border.appendChild(this.padding);
    		        this.padding.appendChild(this.content);
    		        container.appendChild(this.node);
    		    }
    		    OverlayRect.prototype.remove = function () {
    		        if (this.node.parentNode) {
    		            this.node.parentNode.removeChild(this.node);
    		        }
    		    };
    		    OverlayRect.prototype.update = function (box, dims) {
    		        boxWrap(dims, "margin", this.node);
    		        boxWrap(dims, "border", this.border);
    		        boxWrap(dims, "padding", this.padding);
    		        assign(this.content.style, {
    		            height: box.height - dims.borderTop - dims.borderBottom - dims.paddingTop - dims.paddingBottom + "px",
    		            width: box.width - dims.borderLeft - dims.borderRight - dims.paddingLeft - dims.paddingRight + "px",
    		        });
    		        assign(this.node.style, {
    		            top: box.top - dims.marginTop + "px",
    		            left: box.left - dims.marginLeft + "px",
    		        });
    		    };
    		    return OverlayRect;
    		}());
    		var OverlayTip = /** @class */ (function () {
    		    function OverlayTip(doc, container) {
    		        this.tip = doc.createElement("div");
    		        assign(this.tip.style, {
    		            display: "flex",
    		            flexFlow: "row nowrap",
    		            backgroundColor: "#333740",
    		            borderRadius: "2px",
    		            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    		            fontWeight: "bold",
    		            padding: "3px 5px",
    		            pointerEvents: "none",
    		            position: "fixed",
    		            fontSize: "12px",
    		            whiteSpace: "nowrap",
    		        });
    		        this.nameSpan = doc.createElement("span");
    		        this.tip.appendChild(this.nameSpan);
    		        assign(this.nameSpan.style, {
    		            color: "#ee78e6",
    		            borderRight: "1px solid #aaaaaa",
    		            paddingRight: "0.5rem",
    		            marginRight: "0.5rem",
    		        });
    		        this.dimSpan = doc.createElement("span");
    		        this.tip.appendChild(this.dimSpan);
    		        assign(this.dimSpan.style, {
    		            color: "#d7d7d7",
    		        });
    		        this.tip.style.zIndex = "10000000";
    		        container.appendChild(this.tip);
    		    }
    		    OverlayTip.prototype.remove = function () {
    		        if (this.tip.parentNode) {
    		            this.tip.parentNode.removeChild(this.tip);
    		        }
    		    };
    		    OverlayTip.prototype.updateText = function (name, width, height) {
    		        this.nameSpan.textContent = name;
    		        this.dimSpan.textContent = Math.round(width) + "px × " + Math.round(height) + "px";
    		    };
    		    OverlayTip.prototype.updatePosition = function (dims, bounds) {
    		        var tipRect = this.tip.getBoundingClientRect();
    		        var tipPos = findTipPos(dims, bounds, {
    		            width: tipRect.width,
    		            height: tipRect.height,
    		        });
    		        assign(this.tip.style, tipPos.style);
    		    };
    		    return OverlayTip;
    		}());
    		var Overlay = /** @class */ (function () {
    		    function Overlay(agent) {
    		        this.agent = agent;
    		        // Find the root window, because overlays are positioned relative to it.
    		        // @ts-ignore
    		        var currentWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
    		        this.window = currentWindow;
    		        // When opened in shells/dev, the tooltip should be bound by the app iframe, not by the topmost window.
    		        // @ts-ignore
    		        var tipBoundsWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
    		        this.tipBoundsWindow = tipBoundsWindow;
    		        var doc = currentWindow.document;
    		        this.container = doc.createElement("div");
    		        this.container.style.zIndex = "10000000";
    		        this.container.setAttribute("data-select", "@my-react");
    		        this.tip = new OverlayTip(doc, this.container);
    		        this.rects = [];
    		        this.agent = agent;
    		        doc.body.appendChild(this.container);
    		    }
    		    Overlay.prototype.remove = function () {
    		        this.tip.remove();
    		        this.rects.forEach(function (rect) {
    		            rect.remove();
    		        });
    		        this.rects.length = 0;
    		        if (this.container.parentNode) {
    		            this.container.parentNode.removeChild(this.container);
    		        }
    		    };
    		    Overlay.prototype.inspect = function (fiber, nodes) {
    		        var _this = this;
    		        // We can't get the size of text nodes or comment nodes. React as of v15
    		        // heavily uses comment nodes to delimit text.
    		        var elements = nodes.filter(function (node) { return node.nodeType === Node.ELEMENT_NODE; });
    		        while (this.rects.length > elements.length) {
    		            var rect = this.rects.pop();
    		            rect.remove();
    		        }
    		        if (elements.length === 0) {
    		            return;
    		        }
    		        while (this.rects.length < elements.length) {
    		            this.rects.push(new OverlayRect(this.window.document, this.container));
    		        }
    		        var outerBox = {
    		            top: Number.POSITIVE_INFINITY,
    		            right: Number.NEGATIVE_INFINITY,
    		            bottom: Number.NEGATIVE_INFINITY,
    		            left: Number.POSITIVE_INFINITY,
    		        };
    		        elements.forEach(function (element, index) {
    		            var box = getNestedBoundingClientRect(element, _this.window);
    		            var dims = getElementDimensions(element);
    		            outerBox.top = Math.min(outerBox.top, box.top - dims.marginTop);
    		            outerBox.right = Math.max(outerBox.right, box.left + box.width + dims.marginRight);
    		            outerBox.bottom = Math.max(outerBox.bottom, box.top + box.height + dims.marginBottom);
    		            outerBox.left = Math.min(outerBox.left, box.left - dims.marginLeft);
    		            var rect = _this.rects[index];
    		            rect.update(box, dims);
    		        });
    		        var name = getFiberName(fiber);
    		        var typedEle = fiber._debugElement;
    		        var owner = typedEle === null || typedEle === void 0 ? void 0 : typedEle._owner;
    		        var ownerName = owner ? getFiberName(owner) : null;
    		        if (ownerName) {
    		            name += " (in " + ownerName + ")";
    		        }
    		        this.tip.updateText(name, outerBox.right - outerBox.left, outerBox.bottom - outerBox.top);
    		        var tipBounds = getNestedBoundingClientRect(this.tipBoundsWindow.document.documentElement, this.window);
    		        this.tip.updatePosition({
    		            top: outerBox.top,
    		            left: outerBox.left,
    		            height: outerBox.bottom - outerBox.top,
    		            width: outerBox.right - outerBox.left,
    		        }, {
    		            top: tipBounds.top + this.tipBoundsWindow.scrollY,
    		            left: tipBounds.left + this.tipBoundsWindow.scrollX,
    		            height: this.tipBoundsWindow.innerHeight,
    		            width: this.tipBoundsWindow.innerWidth,
    		        });
    		    };
    		    return Overlay;
    		}());
    		function findTipPos(dims, bounds, tipSize) {
    		    var tipHeight = Math.max(tipSize.height, 20);
    		    var tipWidth = Math.max(tipSize.width, 60);
    		    var margin = 5;
    		    var top;
    		    if (dims.top + dims.height + tipHeight <= bounds.top + bounds.height) {
    		        if (dims.top + dims.height < bounds.top + 0) {
    		            top = bounds.top + margin;
    		        }
    		        else {
    		            top = dims.top + dims.height + margin;
    		        }
    		    }
    		    else if (dims.top - tipHeight <= bounds.top + bounds.height) {
    		        if (dims.top - tipHeight - margin < bounds.top + margin) {
    		            top = bounds.top + margin;
    		        }
    		        else {
    		            top = dims.top - tipHeight - margin;
    		        }
    		    }
    		    else {
    		        top = bounds.top + bounds.height - tipHeight - margin;
    		    }
    		    var left = dims.left + margin;
    		    if (dims.left < bounds.left) {
    		        left = bounds.left + margin;
    		    }
    		    if (dims.left + tipWidth > bounds.left + bounds.width) {
    		        left = bounds.left + bounds.width - tipWidth - margin;
    		    }
    		    // @ts-ignore
    		    top += "px";
    		    // @ts-ignore
    		    left += "px";
    		    return {
    		        style: { top: top, left: left },
    		    };
    		}
    		function boxWrap(dims, what, node) {
    		    assign(node.style, {
    		        borderTopWidth: dims[what + "Top"] + "px",
    		        borderLeftWidth: dims[what + "Left"] + "px",
    		        borderRightWidth: dims[what + "Right"] + "px",
    		        borderBottomWidth: dims[what + "Bottom"] + "px",
    		        borderStyle: "solid",
    		    });
    		}
    		var overlayStyles = {
    		    background: "rgba(120, 170, 210, 0.7)",
    		    padding: "rgba(77, 200, 0, 0.3)",
    		    margin: "rgba(255, 155, 0, 0.3)",
    		    border: "rgba(255, 200, 50, 0.3)",
    		};

    		var color$1 = {
    		    update: "rgba(200,50,50,0.8)",
    		    append: "rgba(50,200,50,0.8)",
    		    setRef: "rgba(50,50,200,0.8)",
    		    warn: "rgba(230,150,40,0.8)",
    		};
    		/**
    		 * @internal
    		 */
    		var HighLight = /** @class */ (function () {
    		    function HighLight(agent) {
    		        var _this = this;
    		        this.agent = agent;
    		        this.mask = null;
    		        this.range = document.createRange();
    		        this.running = false;
    		        this.__pendingUpdate__ = new Set();
    		        this.__pendingAppend__ = new Set();
    		        this.__pendingSetRef__ = new Set();
    		        this.__pendingWarn__ = new Set();
    		        this.width = 0;
    		        this.height = 0;
    		        this.ready = function () {
    		            _this.mask = document.createElement("canvas");
    		            _this.mask.setAttribute("data-update", "@my-react");
    		            _this.mask.style.cssText = "\n      position: fixed;\n      z-index: 99999999;\n      left: 0;\n      top: 0;\n      pointer-events: none;\n      ";
    		            document.documentElement.prepend(_this.mask);
    		            _this.setSize();
    		            window.addEventListener("resize", _this.setSize);
    		        };
    		        this.setSize = debounce(function () {
    		            _this.width = window.innerWidth || document.documentElement.clientWidth;
    		            _this.height = window.innerHeight || document.documentElement.clientHeight;
    		            _this.mask.width = _this.width;
    		            _this.mask.height = _this.height;
    		        });
    		        this.highLight = function (fiber, type) {
    		            if (!_this.mask) {
    		                _this.ready();
    		            }
    		            if (fiber.nativeNode) {
    		                switch (type) {
    		                    case "update":
    		                        _this.__pendingUpdate__.add(fiber);
    		                        break;
    		                    case "append":
    		                        _this.__pendingAppend__.add(fiber);
    		                        break;
    		                    case "setRef":
    		                        _this.__pendingSetRef__.add(fiber);
    		                        break;
    		                    case "warn":
    		                        _this.__pendingWarn__.add(fiber);
    		                }
    		            }
    		            if (!_this.running) {
    		                _this.running = true;
    		                requestAnimationFrame(_this.flashPending);
    		            }
    		        };
    		        this.processHighlight = function (fiber, context) {
    		            if (reactShared.include(fiber.state, reactShared.STATE_TYPE.__unmount__) || !fiber.nativeNode)
    		                return;
    		            try {
    		                var node = fiber.nativeNode;
    		                if (node.nodeType === Node.TEXT_NODE) {
    		                    _this.range.selectNodeContents(node);
    		                }
    		                else {
    		                    _this.range.selectNode(node);
    		                }
    		                var rect = _this.range.getBoundingClientRect();
    		                if ((rect.width || rect.height) &&
    		                    rect.top >= 0 &&
    		                    rect.left >= 0 &&
    		                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    		                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    		                    // do the highlight paint
    		                    var left = rect.left - 0.5;
    		                    var top_1 = rect.top - 0.5;
    		                    var width = rect.width + 1;
    		                    var height = rect.height + 1;
    		                    context.strokeRect(left < 0 ? 0 : left, top_1 < 0 ? 0 : top_1, width > window.innerWidth ? window.innerWidth : width, height > window.innerHeight ? window.innerHeight : height);
    		                }
    		            }
    		            catch (_a) {
    		            }
    		        };
    		        this.flashPending = function () {
    		            var context = _this.mask.getContext("2d");
    		            var allPendingUpdate = new Set(_this.__pendingUpdate__);
    		            _this.__pendingUpdate__.clear();
    		            context.strokeStyle = color$1.update;
    		            allPendingUpdate.forEach(function (fiber) { return _this.processHighlight(fiber, context); });
    		            var allPendingAppend = new Set(_this.__pendingAppend__);
    		            _this.__pendingAppend__.clear();
    		            context.strokeStyle = color$1.append;
    		            allPendingAppend.forEach(function (fiber) { return _this.processHighlight(fiber, context); });
    		            var allPendingSetRef = new Set(_this.__pendingSetRef__);
    		            _this.__pendingSetRef__.clear();
    		            context.strokeStyle = color$1.setRef;
    		            allPendingSetRef.forEach(function (fiber) { return _this.processHighlight(fiber, context); });
    		            var allPendingWarn = new Set(_this.__pendingWarn__);
    		            _this.__pendingWarn__.clear();
    		            context.strokeStyle = color$1.warn;
    		            allPendingWarn.forEach(function (fiber) { return _this.processHighlight(fiber, context); });
    		            setTimeout(function () {
    		                context.clearRect(0, 0, _this.width, _this.height);
    		                _this.running = false;
    		                if (_this.__pendingUpdate__.size || _this.__pendingAppend__.size || _this.__pendingSetRef__.size) {
    		                    _this.running = true;
    		                    _this.flashPending();
    		                }
    		            }, 100);
    		        };
    		    }
    		    return HighLight;
    		}());

    		// TODO use 'eventListener' instead of 'patchFunction'
    		function overridePatchToFiberUnmount(dispatch, runtime) {
    		    if (typeof dispatch.onFiberUnmount === "function") {
    		        dispatch.onFiberUnmount(function (f) { return unmountPlainNode(f, runtime); });
    		    }
    		    else {
    		        var originalPatchUnmount_1 = dispatch.patchToFiberUnmount;
    		        dispatch.patchToFiberUnmount = function (fiber) {
    		            originalPatchUnmount_1.call(this, fiber);
    		            unmountPlainNode(fiber, runtime);
    		        };
    		    }
    		}
    		var setupDispatch = function (dispatch, runtime) {
    		    if (dispatch["$$hasDevToolInject"])
    		        return;
    		    dispatch["$$hasDevToolInject"] = true;
    		    overridePatchToFiberUnmount(dispatch, runtime);
    		    Object.defineProperty(dispatch, "__devtool_runtime__", { value: { core: runtime, version: "0.0.1" } });
    		};

    		var cb = function () { };
    		var map = new Map();
    		var DevToolCore = /** @class */ (function () {
    		    function DevToolCore() {
    		        var _this = this;
    		        this._dispatch = new Set();
    		        // 是否存在 @my-react
    		        this._detector = false;
    		        this._origin = "";
    		        this._map = new Map();
    		        // 字符串字典
    		        this._dir = {};
    		        this._hmr = {};
    		        this._hmrStatus = {};
    		        this._error = {};
    		        this._warn = {};
    		        this._hoverId = "";
    		        this._selectId = "";
    		        this._tempDomHoverId = "";
    		        this._domHoverId = "";
    		        this._trigger = {};
    		        this._state = {};
    		        this._source = null;
    		        this._needUnmount = false;
    		        this._enabled = false;
    		        // 在开发工具中选中组件定位到浏览器中
    		        this._enableHover = false;
    		        this._enableUpdate = false;
    		        // 在浏览器中选中dom定位到开发工具组件树中
    		        this._enableHoverOnBrowser = false;
    		        this._listeners = new Set();
    		        this.version = "0.0.1";
    		        this.notifyAll = debounce(function () {
    		            _this.notifyDetector();
    		            if (_this._needUnmount) {
    		                _this._notify({ type: exports.DevToolMessageEnum.unmount, data: null });
    		                _this._needUnmount = false;
    		            }
    		            if (_this._dispatch.size) {
    		                _this._dispatch.forEach(function (dispatch) {
    		                    _this.notifyDispatch(dispatch);
    		                });
    		            }
    		            _this.notifyConfig();
    		            _this.notifyDir();
    		            _this.notifyTrigger();
    		            _this.notifyHMR();
    		            _this.notifyHMRStatus();
    		            _this.notifySelect();
    		            _this.notifyWarn();
    		            _this.notifyError();
    		        }, 200);
    		        this.update = new HighLight(this);
    		    }
    		    DevToolCore.prototype.getDispatch = function () {
    		        return Array.from(this._dispatch);
    		    };
    		    Object.defineProperty(DevToolCore.prototype, "hasEnable", {
    		        get: function () {
    		            return this._enabled;
    		        },
    		        enumerable: false,
    		        configurable: true
    		    });
    		    DevToolCore.prototype.setHoverStatus = function (d) {
    		        this._enableHover = d;
    		    };
    		    DevToolCore.prototype.setHoverOnBrowserStatus = function (d, cb) {
    		        this._enableHoverOnBrowser = d;
    		        cb === null || cb === void 0 ? void 0 : cb(d);
    		    };
    		    DevToolCore.prototype.enableBrowserHover = function () {
    		        var _this = this;
    		        var _a, _b;
    		        if (!this.hasEnable)
    		            return;
    		        if (this._enableHoverOnBrowser)
    		            return;
    		        if (typeof document === "undefined") {
    		            return;
    		        }
    		        this._enableHoverOnBrowser = true;
    		        (_b = (_a = this.select) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
    		        var debounceNotifyDomHover = debounce(function () {
    		            _this.notifyDomHover();
    		        }, 100);
    		        var onMouseEnter = debounce(function (e) {
    		            var _a, _b, _c, _d;
    		            var target = e.target;
    		            (_b = (_a = _this.select) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
    		            if (!_this.hasEnable)
    		                return;
    		            if (target.nodeType === Node.ELEMENT_NODE) {
    		                var fiber = getComponentFiberByDom(target);
    		                if (fiber) {
    		                    (_d = (_c = _this.select) === null || _c === void 0 ? void 0 : _c.remove) === null || _d === void 0 ? void 0 : _d.call(_c);
    		                    _this.select = new Overlay(_this);
    		                    _this.select.inspect(fiber, getElementNodesFromFiber(fiber));
    		                    var id = getPlainNodeIdByFiber(fiber);
    		                    _this._tempDomHoverId = id;
    		                    // debounceNotifyDomHover();
    		                }
    		            }
    		        }, 16);
    		        var onClick = function (e) {
    		            if (!_this.hasEnable)
    		                return;
    		            _this._domHoverId = _this._tempDomHoverId;
    		            debounceNotifyDomHover();
    		            e.stopPropagation();
    		            e.preventDefault();
    		        };
    		        document.addEventListener("mouseenter", onMouseEnter, true);
    		        document.addEventListener("click", onClick, true);
    		        document.addEventListener("mousedown", onClick, true);
    		        document.addEventListener("pointerdown", onClick, true);
    		        cb = function () {
    		            var _a, _b;
    		            _this._enableHoverOnBrowser = false;
    		            (_b = (_a = _this.select) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
    		            document.removeEventListener("mouseenter", onMouseEnter, true);
    		            document.removeEventListener("click", onClick, true);
    		            document.removeEventListener("mousedown", onClick, true);
    		            document.removeEventListener("pointerdown", onClick, true);
    		        };
    		    };
    		    DevToolCore.prototype.disableBrowserHover = function () {
    		        if (!this._enableHoverOnBrowser)
    		            return;
    		        cb();
    		    };
    		    DevToolCore.prototype.setUpdateStatus = function (d) {
    		        this._enableUpdate = d;
    		    };
    		    DevToolCore.prototype.addDispatch = function (dispatch) {
    		        if (dispatch)
    		            this._detector = true;
    		        if (this.hasDispatch(dispatch))
    		            return;
    		        setupDispatch(dispatch, this);
    		        this._dispatch.add(dispatch);
    		        this.patchDispatch(dispatch);
    		    };
    		    DevToolCore.prototype.patchDispatch = function (dispatch) {
    		        var _this = this;
    		        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    		        if (dispatch["$$hasDevToolPatch"])
    		            return;
    		        dispatch["$$hasDevToolPatch"] = true;
    		        var onLoad = throttle(function () {
    		            if (!_this.hasEnable)
    		                return;
    		            _this.notifyDispatch(dispatch);
    		            _this.notifySelect();
    		        }, 200);
    		        var onChange = function (list) {
    		            var directory = getPlainNodeArrayByList(list).directory;
    		            if (!reactShared.isNormalEquals(_this._dir, directory)) {
    		                _this._dir = __assign({}, directory);
    		                _this.notifyDir();
    		            }
    		            _this.notifyChanged(list);
    		        };
    		        var onUnmount = function () {
    		            // if (!this.hasEnable) return;
    		            _this._needUnmount = true;
    		            _this.delDispatch(dispatch);
    		        };
    		        var onFiberTrigger = function (fiber) {
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            _this._trigger[id] = _this._trigger[id] ? _this._trigger[id] + 1 : 1;
    		            if (!_this.hasEnable)
    		                return;
    		            _this.notifyTrigger();
    		        };
    		        var onFiberUpdate = function (fiber) {
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            if (!_this.hasEnable)
    		                return;
    		            if (id === _this._selectId)
    		                _this.notifySelect();
    		        };
    		        var onFiberState = function (fiber) {
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            _this._state[id] = _this._state[id] ? _this._state[id] + 1 : 1;
    		        };
    		        var onFiberHMR = function (fiber, forceRefresh) {
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            _this._hmr[id] = _this._hmr[id] ? _this._hmr[id] + 1 : 1;
    		            if (typeof forceRefresh === "boolean") {
    		                _this._hmrStatus[id] = forceRefresh ? exports.HMRStatus.remount : exports.HMRStatus.refresh;
    		            }
    		            if (!_this.hasEnable)
    		                return;
    		            _this.notifyHMR();
    		            if (typeof forceRefresh === "boolean") {
    		                _this.notifyHMRStatus();
    		            }
    		            _this.notifyDispatch(dispatch, true);
    		        };
    		        var onFiberWarn = function (fiber) {
    		            var args = [];
    		            for (var _i = 1; _i < arguments.length; _i++) {
    		                args[_i - 1] = arguments[_i];
    		            }
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            _this._warn[id] = _this._warn[id] || [];
    		            _this._warn[id].push(args);
    		            _this.notifyWarn();
    		        };
    		        var onFiberError = function (fiber) {
    		            var args = [];
    		            for (var _i = 1; _i < arguments.length; _i++) {
    		                args[_i - 1] = arguments[_i];
    		            }
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            _this._error[id] = _this._error[id] || [];
    		            _this._error[id].push(args);
    		            _this.notifyError();
    		        };
    		        var onPerformanceWarn = function (fiber) {
    		            var id = getPlainNodeIdByFiber(fiber);
    		            if (!id)
    		                return;
    		            if (_this.hasEnable && _this._enableUpdate) {
    		                _this.update.highLight(fiber, "warn");
    		            }
    		            _this.notifyHighlight(id, "performance");
    		        };
    		        var onDOMUpdate = function (fiber) {
    		            if (_this.hasEnable && _this._enableUpdate) {
    		                _this.update.highLight(fiber, "update");
    		            }
    		        };
    		        var onDOMAppend = function (fiber) {
    		            if (_this.hasEnable && _this._enableUpdate) {
    		                _this.update.highLight(fiber, "append");
    		            }
    		        };
    		        var onDOMSetRef = function (fiber) {
    		            if (_this.hasEnable && _this._enableUpdate) {
    		                _this.update.highLight(fiber, "setRef");
    		            }
    		        };
    		        if (typeof dispatch.onAfterCommit === "function" && typeof dispatch.onAfterUpdate === "function") {
    		            dispatch.onAfterCommit(onLoad);
    		            // dispatch.onAfterUpdate(onLoad);
    		            (_a = dispatch.onAfterUnmount) === null || _a === void 0 ? void 0 : _a.call(dispatch, onUnmount);
    		            (_b = dispatch.onFiberState) === null || _b === void 0 ? void 0 : _b.call(dispatch, onFiberState);
    		            (_c = dispatch.onFiberTrigger) === null || _c === void 0 ? void 0 : _c.call(dispatch, onFiberTrigger);
    		            (_d = dispatch.onPerformanceWarn) === null || _d === void 0 ? void 0 : _d.call(dispatch, onPerformanceWarn);
    		            (_e = dispatch.onFiberChange) === null || _e === void 0 ? void 0 : _e.call(dispatch, onChange);
    		            (_f = dispatch.onFiberUpdate) === null || _f === void 0 ? void 0 : _f.call(dispatch, onFiberUpdate);
    		            (_g = dispatch.onFiberHMR) === null || _g === void 0 ? void 0 : _g.call(dispatch, onFiberHMR);
    		            (_h = dispatch.onDOMUpdate) === null || _h === void 0 ? void 0 : _h.call(dispatch, onDOMUpdate);
    		            (_j = dispatch.onDOMAppend) === null || _j === void 0 ? void 0 : _j.call(dispatch, onDOMAppend);
    		            (_k = dispatch.onDOMSetRef) === null || _k === void 0 ? void 0 : _k.call(dispatch, onDOMSetRef);
    		            (_l = dispatch.onFiberError) === null || _l === void 0 ? void 0 : _l.call(dispatch, onFiberError);
    		            (_m = dispatch.onFiberWarn) === null || _m === void 0 ? void 0 : _m.call(dispatch, onFiberWarn);
    		        }
    		        else {
    		            var originalAfterCommit_1 = dispatch.afterCommit;
    		            var originalAfterUpdate_1 = dispatch.afterUpdate;
    		            var originalAfterUnmount_1 = dispatch.afterUnmount;
    		            dispatch.afterCommit = function () {
    		                var _a;
    		                (_a = originalAfterCommit_1 === null || originalAfterCommit_1 === void 0 ? void 0 : originalAfterCommit_1.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterCommit_1, this);
    		                onLoad();
    		            };
    		            // TODO `global patch` flag for performance
    		            dispatch.afterUpdate = function () {
    		                var _a;
    		                (_a = originalAfterUpdate_1 === null || originalAfterUpdate_1 === void 0 ? void 0 : originalAfterUpdate_1.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterUpdate_1, this);
    		                onLoad();
    		            };
    		            dispatch.afterUnmount = function () {
    		                var _a;
    		                (_a = originalAfterUnmount_1 === null || originalAfterUnmount_1 === void 0 ? void 0 : originalAfterUnmount_1.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterUnmount_1, this);
    		                onUnmount();
    		            };
    		        }
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
    		        var _a = generateTreeMap(dispatch), directory = _a.directory, current = _a.current;
    		        if (!reactShared.isNormalEquals(this._dir, directory)) {
    		            this._dir = __assign({}, directory);
    		            this.notifyDir();
    		        }
    		        this._map.set(dispatch, current);
    		        return current;
    		    };
    		    DevToolCore.prototype.setSelect = function (id) {
    		        this._selectId = id;
    		    };
    		    DevToolCore.prototype.setHover = function (id) {
    		        this._hoverId = id;
    		    };
    		    DevToolCore.prototype.setSource = function (source) {
    		        this._source = source;
    		    };
    		    DevToolCore.prototype.showHover = function () {
    		        var _a, _b, _c, _d;
    		        if (!this._enableHover)
    		            return;
    		        (_b = (_a = this.select) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
    		        this.select = new Overlay(this);
    		        if (this._hoverId) {
    		            var fiber = getFiberNodeById(this._hoverId);
    		            if (fiber) {
    		                this.select.inspect(fiber, getElementNodesFromFiber(fiber));
    		            }
    		        }
    		        else {
    		            (_d = (_c = this.select) === null || _c === void 0 ? void 0 : _c.remove) === null || _d === void 0 ? void 0 : _d.call(_c);
    		            this.select = null;
    		        }
    		    };
    		    DevToolCore.prototype.inspectDom = function () {
    		        if (!this.hasEnable)
    		            return;
    		        var fiber = getFiberNodeById(this._selectId);
    		        var domArray = getElementNodesFromFiber(fiber);
    		        var dom = domArray[0];
    		        if (typeof inspect === "function" && dom) {
    		            inspect(dom);
    		            return;
    		        }
    		        this.notifyMessage("current id: ".concat(this._selectId, " of fiber not contain dom node"), "warning");
    		    };
    		    DevToolCore.prototype.inspectSource = function () {
    		        if (!this.hasEnable)
    		            return;
    		        if (typeof this._source === "function") {
    		            var s = this._source;
    		            this._source = null;
    		            inspect(s);
    		            return;
    		        }
    		        this.notifyMessage("can not view source for current item", "warning");
    		    };
    		    DevToolCore.prototype.notifyDir = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.dir, data: this._dir });
    		    };
    		    DevToolCore.prototype.notifyDetector = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.init, data: this._detector });
    		    };
    		    DevToolCore.prototype.notifyTrigger = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.trigger, data: this._trigger });
    		    };
    		    DevToolCore.prototype.notifyHighlight = function (id, type) {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.highlight, data: { id: id, type: type } });
    		    };
    		    DevToolCore.prototype.notifyWarn = function () {
    		        var _this = this;
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({
    		            type: exports.DevToolMessageEnum.warn,
    		            data: Object.keys(this._warn).reduce(function (p, c) {
    		                p[c] = _this._warn[c].map(function (i) { return getNode(i); });
    		                return p;
    		            }, {}),
    		        });
    		    };
    		    DevToolCore.prototype.notifyError = function () {
    		        var _this = this;
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({
    		            type: exports.DevToolMessageEnum.error,
    		            data: Object.keys(this._error).reduce(function (p, c) {
    		                p[c] = _this._error[c].map(function (i) { return getNode(i); });
    		                return p;
    		            }, {}),
    		        });
    		    };
    		    // TODO
    		    DevToolCore.prototype.notifyChanged = function (list) {
    		        if (!this.hasEnable)
    		            return;
    		        var tree = getTreeByFiber(list.head.value);
    		        this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
    		    };
    		    DevToolCore.prototype.notifyHMR = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.hmr, data: this._hmr });
    		    };
    		    DevToolCore.prototype.notifyHMRStatus = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.hmrStatus, data: this._hmrStatus });
    		    };
    		    DevToolCore.prototype.notifyConfig = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({
    		            type: exports.DevToolMessageEnum.config,
    		            data: { enableHover: this._enableHover, enableUpdate: this._enableUpdate, enableHoverOnBrowser: this._enableHoverOnBrowser },
    		        });
    		    };
    		    DevToolCore.prototype.notifySelect = function (force) {
    		        if (force === void 0) { force = false; }
    		        if (!this.hasEnable)
    		            return;
    		        var id = this._selectId;
    		        if (!id)
    		            return;
    		        var fiber = getFiberNodeById(id);
    		        if (fiber) {
    		            this._notify({ type: exports.DevToolMessageEnum.detail, data: getDetailNodeByFiber(fiber, force) });
    		        }
    		        else {
    		            this._notify({ type: exports.DevToolMessageEnum.detail, data: null });
    		        }
    		    };
    		    DevToolCore.prototype.notifyUnSelect = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum["select-unmount"], data: null });
    		    };
    		    DevToolCore.prototype.notifyDomHover = function () {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum["dom-hover"], data: this._domHoverId });
    		    };
    		    DevToolCore.prototype.notifySource = function () {
    		        if (!this.hasEnable)
    		            return;
    		        // notify devtool to inspect source
    		        this._notify({ type: exports.DevToolMessageEnum.source, data: true });
    		    };
    		    DevToolCore.prototype.notifyChunks = function (ids) {
    		        if (!this.hasEnable)
    		            return;
    		        var data = ids.reduce(function (p, c) {
    		            var d = getNodeFromId(Number(c));
    		            p[c] = { loaded: d };
    		            return p;
    		        }, {});
    		        this._notify({ type: exports.DevToolMessageEnum.chunks, data: data });
    		    };
    		    DevToolCore.prototype.notifyMessage = function (message, type) {
    		        if (!this.hasEnable)
    		            return;
    		        this._notify({ type: exports.DevToolMessageEnum.message, data: { message: message, type: type } });
    		    };
    		    DevToolCore.prototype.notifyDispatch = function (dispatch, force) {
    		        if (!this.hasEnable)
    		            return;
    		        if (this._dispatch.has(dispatch)) {
    		            var now = Date.now();
    		            if (force) {
    		                map.set(dispatch, now);
    		                var tree = this.getTree(dispatch);
    		                this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
    		            }
    		            else {
    		                var last = map.get(dispatch);
    		                if (last && now - last < 200)
    		                    return;
    		                map.set(dispatch, now);
    		                var tree = this.getTree(dispatch);
    		                this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
    		            }
    		        }
    		    };
    		    // TODO support multiple connect agent
    		    DevToolCore.prototype.connect = function () {
    		        if (this._enabled)
    		            return;
    		        this._enabled = true;
    		    };
    		    DevToolCore.prototype.disconnect = function () {
    		        var _a, _b;
    		        if (!this._enabled)
    		            return;
    		        (_b = (_a = this.select) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
    		        this.select = null;
    		        this._enabled = false;
    		    };
    		    DevToolCore.prototype.clear = function () {
    		        this._error = {};
    		        this._hmr = {};
    		        this._hoverId = "";
    		        this._selectId = "";
    		        this._source = null;
    		        this._hmrStatus = {};
    		        this._domHoverId = "";
    		        this._tempDomHoverId = "";
    		        this._state = {};
    		        this._trigger = {};
    		        this._warn = {};
    		        this._enableHoverOnBrowser = false;
    		        this.disableBrowserHover();
    		    };
    		    return DevToolCore;
    		}());
    		var color = color$1;

    		exports.DevToolCore = DevToolCore;
    		exports.DevToolSource = DevToolSource;
    		exports.PlainNode = PlainNode;
    		exports.assignFiber = assignFiber;
    		exports.color = color;
    		exports.debounce = debounce;
    		exports.generateTreeMap = generateTreeMap;
    		exports.getComponentFiberByDom = getComponentFiberByDom;
    		exports.getContextName = getContextName;
    		exports.getDetailNodeByFiber = getDetailNodeByFiber;
    		exports.getElementNodesFromFiber = getElementNodesFromFiber;
    		exports.getFiberName = getFiberName;
    		exports.getFiberNodeById = getFiberNodeById;
    		exports.getFiberTag = getFiberTag;
    		exports.getFiberType = getFiberType;
    		exports.getHook = getHook;
    		exports.getHookName = getHookName;
    		exports.getNode = getNode;
    		exports.getNodeForce = getNodeForce;
    		exports.getNodeFromId = getNodeFromId;
    		exports.getPlainNodeArrayByList = getPlainNodeArrayByList;
    		exports.getPlainNodeByFiber = getPlainNodeByFiber;
    		exports.getPlainNodeIdByFiber = getPlainNodeIdByFiber;
    		exports.getProps = getProps;
    		exports.getSource = getSource;
    		exports.getState = getState;
    		exports.getTree = getTree;
    		exports.getTreeByFiber = getTreeByFiber;
    		exports.getTypeName = getTypeName;
    		exports.getValueById = getValueById;
    		exports.loopChangedTree = loopChangedTree;
    		exports.loopTree = loopTree;
    		exports.shallowAssignFiber = shallowAssignFiber;
    		exports.throttle = throttle;
    		exports.typeKeys = typeKeys;
    		exports.unmountPlainNode = unmountPlainNode; 
    	} (index_production$1));
    	return index_production$1;
    }

    var hasRequiredCore;

    function requireCore () {
    	if (hasRequiredCore) return core.exports;
    	hasRequiredCore = 1;

    	{
    	  core.exports = requireIndex_production();
    	}
    	return core.exports;
    }

    var coreExports = requireCore();

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
        sourceFrom["iframe"] = "iframe";
        sourceFrom["bridge"] = "bridge";
        sourceFrom["detector"] = "detector";
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
            window.postMessage(__assign(__assign({ from: from }, message), { source: coreExports.DevToolSource }), "*");
        };
    };

    var hookReady = false;
    var id = null;
    var detectorPostMessageWithSource = generatePostMessageWithSource(sourceFrom.detector);
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
    var onMessage = function (message) {
        var _a, _b, _c;
        if (message.source !== window)
            return;
        if (((_a = message.data) === null || _a === void 0 ? void 0 : _a.source) !== coreExports.DevToolSource)
            return;
        if (!hookReady && ((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === coreExports.MessageHookType.init) {
            hookReady = true;
            detectorPostMessageWithSource({ type: coreExports.MessageDetectorType.init });
        }
        if (((_c = message.data) === null || _c === void 0 ? void 0 : _c.type) === coreExports.MessageHookType.mount) {
            runWhenHookReady(function () {
                chrome.runtime.sendMessage({ type: coreExports.MessageHookType.mount, from: sourceFrom.detector });
            });
        }
    };
    window.addEventListener("message", onMessage);

})();
