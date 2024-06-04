(function (exports) {
    'use strict';

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

    {
      reactShared.exports = requireIndex_development$1();
    }

    var reactSharedExports = reactShared.exports;

    var core$1 = {exports: {}};

    var index_development = {};

    var hasRequiredIndex_development;

    function requireIndex_development () {
    	if (hasRequiredIndex_development) return index_development;
    	hasRequiredIndex_development = 1;

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

    	var id = 0;
    	// PlainNode is a simplified version of FiberNode just for show the structure
    	var PlainNode = /** @class */ (function () {
    	    function PlainNode() {
    	        this.id = "".concat(id++);
    	        this.uuid = "".concat(this.id, "--fiber");
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
    	        return "text - (native)";
    	    if (typeof fiber.elementType === "string")
    	        return "".concat(fiber.elementType);
    	    return "Unknown";
    	};
    	var getFiberContent = function (fiber) {
    	    var _a;
    	    return (_a = fiber.elementType) === null || _a === void 0 ? void 0 : _a.toString();
    	};

    	var treeMap = new Map();
    	var store = new Map();
    	var assignFiber = function (plain, fiber) {
    	    plain.name = getFiberName(fiber);
    	    plain.content = getFiberContent(fiber);
    	    plain.key = fiber.key;
    	    plain.type = fiber.type;
    	    // plain.ref = safeCloneRef(fiber.ref);
    	    // plain.props = safeClone(fiber.pendingProps);
    	};
    	var loopTree = function (fiber, parent) {
    	    if (!fiber)
    	        return null;
    	    var exist = treeMap.get(fiber);
    	    if (exist)
    	        return exist;
    	    var current = new PlainNode();
    	    if (parent) {
    	        parent.children = parent.children || [];
    	        parent.children.push(current);
    	        current.deep = parent.deep + 1;
    	    }
    	    else {
    	        current.deep = 0;
    	    }
    	    assignFiber(current, fiber);
    	    treeMap.set(fiber, current);
    	    store.set(current.uuid, fiber);
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
    	        store.delete(plain.uuid);
    	    }
    	    treeMap.delete(fiber);
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
    	        this._dispatch = new Set();
    	        this._map = new Map();
    	        this._listeners = new Set();
    	    }
    	    DevToolCore.prototype.getDispatch = function () {
    	        return Array.from(this._dispatch);
    	    };
    	    DevToolCore.prototype.addDispatch = function (dispatch) {
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
    	        // const originalAfterUpdate = dispatch.afterUpdate;
    	        var onLoad = throttle(function () {
    	            var tree = generateFiberTreeToPlainTree(dispatch);
    	            _this._map.set(dispatch, tree);
    	            _this.notify({ type: MessageType.init, data: tree });
    	        }, 10000);
    	        dispatch.afterCommit = function () {
    	            var _a;
    	            (_a = originalAfterCommit === null || originalAfterCommit === void 0 ? void 0 : originalAfterCommit.call) === null || _a === void 0 ? void 0 : _a.call(originalAfterCommit, this);
    	            onLoad();
    	        };
    	        // dispatch.afterUpdate = function (this: DevToolRenderDispatch) {
    	        //   originalAfterUpdate?.call?.(this);
    	        //   onLoad();
    	        // };
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
    	    DevToolCore.prototype.forceNotify = function () {
    	        var _this = this;
    	        this._dispatch.forEach(function (dispatch) {
    	            var tree = _this.getTree(dispatch);
    	            _this.notify({ type: MessageType.init, data: tree });
    	        });
    	    };
    	    return DevToolCore;
    	}());

    	index_development.DevToolCore = DevToolCore;
    	index_development.PlainNode = PlainNode;
    	index_development.debounce = debounce;
    	index_development.throttle = throttle;
    	
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

    var core = new coreExports.DevToolCore();
    core.subscribe(function (message) {
        window.postMessage({ type: MessageHookType.render, data: message }, "*");
    });
    var set = new Set();
    var detectorReady = false;
    var id = null;
    var runWhenDetectorReady = function (fn, count) {
        clearTimeout(id);
        if (detectorReady) {
            fn();
        }
        else {
            if (count && count > 10) {
                {
                    console.error("[@my-react-devtool/hook] detector not ready");
                }
            }
            id = setTimeout(function () { return runWhenDetectorReady(fn, count ? count + 1 : 1); }, 2000);
        }
    };
    var onMessage = function (message) {
        var _a, _b;
        if (message.source !== window)
            return;
        if (!detectorReady && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.type) === MessageDetectorType.init) {
            {
                console.log("[@my-react-devtool/hook] detector init");
            }
            detectorReady = true;
        }
        if (((_b = message.data) === null || _b === void 0 ? void 0 : _b.type) === MessagePanelType.show) {
            {
                console.log("[@my-react-devtool/hook] message from proxy", message);
            }
            core.forceNotify();
            // set.forEach((dispatch) => {
            //   if (!core.hasDispatch(dispatch)) {
            //     core.addDispatch(dispatch);
            //   }
            // });
        }
    };
    window.addEventListener("message", onMessage);
    var onceMount = reactSharedExports.once(function () {
        // current site is render by @my-react
        window.postMessage({ type: MessageHookType.mount }, "*");
    });
    var globalHook = function (dispatch) {
        set.add(dispatch);
        core.addDispatch(dispatch);
        runWhenDetectorReady(onceMount);
    };
    if (window.parent && window.parent !== window) {
        {
            console.warn("[@my-react-devtool/hook] currently the @my-react extension does not support iframe.");
        }
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
