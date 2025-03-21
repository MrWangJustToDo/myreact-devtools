(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
			    return !!(src & rest);
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
			var ScopeLazy = Symbol.for("react.scope_lazy");
			var ScopeSuspense = Symbol.for("react.scope_suspense");
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
			    UpdateQueueType[UpdateQueueType["promise"] = 5] = "promise";
			    UpdateQueueType[UpdateQueueType["hmr"] = 6] = "hmr";
			    UpdateQueueType[UpdateQueueType["trigger"] = 7] = "trigger";
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
			    STATE_TYPE[STATE_TYPE["__reschedule__"] = 4096] = "__reschedule__";
			    STATE_TYPE[STATE_TYPE["__promise__"] = 8192] = "__promise__";
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
			        else {
			            this.length++;
			        }
			        var listNode = new ListTreeNode(node);
			        this.stickyFoot = listNode;
			    };
			    ListTree.prototype.pushToHead = function (node) {
			        if (this.stickyHead) {
			            var node_2 = this.stickyHead;
			            this.unshift(node_2.value);
			            this.stickyHead = null;
			        }
			        else {
			            this.length++;
			        }
			        var listNode = new ListTreeNode(node);
			        this.stickyHead = listNode;
			    };
			    ListTree.prototype.pop = function () {
			        var foot = this.stickyFoot || this.foot || this.stickyHead;
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
			        else {
			            this.length++;
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
			        else {
			            this.length++;
			        }
			        var listNode = new ListTreeNode(node);
			        this.stickyFoot = listNode;
			    };
			    ListTree.prototype.shift = function () {
			        var head = this.stickyHead || this.head || this.stickyFoot;
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
			exports.ScopeLazy = ScopeLazy;
			exports.ScopeSuspense = ScopeSuspense;
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

	var errorStackParser$1 = {exports: {}};

	var stackframe$1 = {exports: {}};

	var stackframe = stackframe$1.exports;

	var hasRequiredStackframe;

	function requireStackframe () {
		if (hasRequiredStackframe) return stackframe$1.exports;
		hasRequiredStackframe = 1;
		(function (module, exports) {
			(function(root, factory) {
			    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

			    /* istanbul ignore next */
			    {
			        module.exports = factory();
			    }
			}(stackframe, function() {
			    function _isNumber(n) {
			        return !isNaN(parseFloat(n)) && isFinite(n);
			    }

			    function _capitalize(str) {
			        return str.charAt(0).toUpperCase() + str.substring(1);
			    }

			    function _getter(p) {
			        return function() {
			            return this[p];
			        };
			    }

			    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
			    var numericProps = ['columnNumber', 'lineNumber'];
			    var stringProps = ['fileName', 'functionName', 'source'];
			    var arrayProps = ['args'];
			    var objectProps = ['evalOrigin'];

			    var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);

			    function StackFrame(obj) {
			        if (!obj) return;
			        for (var i = 0; i < props.length; i++) {
			            if (obj[props[i]] !== undefined) {
			                this['set' + _capitalize(props[i])](obj[props[i]]);
			            }
			        }
			    }

			    StackFrame.prototype = {
			        getArgs: function() {
			            return this.args;
			        },
			        setArgs: function(v) {
			            if (Object.prototype.toString.call(v) !== '[object Array]') {
			                throw new TypeError('Args must be an Array');
			            }
			            this.args = v;
			        },

			        getEvalOrigin: function() {
			            return this.evalOrigin;
			        },
			        setEvalOrigin: function(v) {
			            if (v instanceof StackFrame) {
			                this.evalOrigin = v;
			            } else if (v instanceof Object) {
			                this.evalOrigin = new StackFrame(v);
			            } else {
			                throw new TypeError('Eval Origin must be an Object or StackFrame');
			            }
			        },

			        toString: function() {
			            var fileName = this.getFileName() || '';
			            var lineNumber = this.getLineNumber() || '';
			            var columnNumber = this.getColumnNumber() || '';
			            var functionName = this.getFunctionName() || '';
			            if (this.getIsEval()) {
			                if (fileName) {
			                    return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
			                }
			                return '[eval]:' + lineNumber + ':' + columnNumber;
			            }
			            if (functionName) {
			                return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
			            }
			            return fileName + ':' + lineNumber + ':' + columnNumber;
			        }
			    };

			    StackFrame.fromString = function StackFrame$$fromString(str) {
			        var argsStartIndex = str.indexOf('(');
			        var argsEndIndex = str.lastIndexOf(')');

			        var functionName = str.substring(0, argsStartIndex);
			        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
			        var locationString = str.substring(argsEndIndex + 1);

			        if (locationString.indexOf('@') === 0) {
			            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
			            var fileName = parts[1];
			            var lineNumber = parts[2];
			            var columnNumber = parts[3];
			        }

			        return new StackFrame({
			            functionName: functionName,
			            args: args || undefined,
			            fileName: fileName,
			            lineNumber: lineNumber || undefined,
			            columnNumber: columnNumber || undefined
			        });
			    };

			    for (var i = 0; i < booleanProps.length; i++) {
			        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
			        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
			            return function(v) {
			                this[p] = Boolean(v);
			            };
			        })(booleanProps[i]);
			    }

			    for (var j = 0; j < numericProps.length; j++) {
			        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
			        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
			            return function(v) {
			                if (!_isNumber(v)) {
			                    throw new TypeError(p + ' must be a Number');
			                }
			                this[p] = Number(v);
			            };
			        })(numericProps[j]);
			    }

			    for (var k = 0; k < stringProps.length; k++) {
			        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
			        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
			            return function(v) {
			                this[p] = String(v);
			            };
			        })(stringProps[k]);
			    }

			    return StackFrame;
			})); 
		} (stackframe$1));
		return stackframe$1.exports;
	}

	var errorStackParser = errorStackParser$1.exports;

	var hasRequiredErrorStackParser;

	function requireErrorStackParser () {
		if (hasRequiredErrorStackParser) return errorStackParser$1.exports;
		hasRequiredErrorStackParser = 1;
		(function (module, exports) {
			(function(root, factory) {
			    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

			    /* istanbul ignore next */
			    {
			        module.exports = factory(requireStackframe());
			    }
			}(errorStackParser, function ErrorStackParser(StackFrame) {

			    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
			    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
			    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

			    return {
			        /**
			         * Given an Error object, extract the most information from it.
			         *
			         * @param {Error} error object
			         * @return {Array} of StackFrames
			         */
			        parse: function ErrorStackParser$$parse(error) {
			            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
			                return this.parseOpera(error);
			            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
			                return this.parseV8OrIE(error);
			            } else if (error.stack) {
			                return this.parseFFOrSafari(error);
			            } else {
			                throw new Error('Cannot parse given Error object');
			            }
			        },

			        // Separate line and column numbers from a string of the form: (URI:Line:Column)
			        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
			            // Fail-fast but return locations like "(native)"
			            if (urlLike.indexOf(':') === -1) {
			                return [urlLike];
			            }

			            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
			            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
			            return [parts[1], parts[2] || undefined, parts[3] || undefined];
			        },

			        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
			            var filtered = error.stack.split('\n').filter(function(line) {
			                return !!line.match(CHROME_IE_STACK_REGEXP);
			            }, this);

			            return filtered.map(function(line) {
			                if (line.indexOf('(eval ') > -1) {
			                    // Throw away eval information until we implement stacktrace.js/stackframe#8
			                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
			                }
			                var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').replace(/^.*?\s+/, '');

			                // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
			                // case it has spaces in it, as the string is split on \s+ later on
			                var location = sanitizedLine.match(/ (\(.+\)$)/);

			                // remove the parenthesized location from the line, if it was matched
			                sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

			                // if a location was matched, pass it to extractLocation() otherwise pass all sanitizedLine
			                // because this line doesn't have function name
			                var locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
			                var functionName = location && sanitizedLine || undefined;
			                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

			                return new StackFrame({
			                    functionName: functionName,
			                    fileName: fileName,
			                    lineNumber: locationParts[1],
			                    columnNumber: locationParts[2],
			                    source: line
			                });
			            }, this);
			        },

			        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
			            var filtered = error.stack.split('\n').filter(function(line) {
			                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
			            }, this);

			            return filtered.map(function(line) {
			                // Throw away eval information until we implement stacktrace.js/stackframe#8
			                if (line.indexOf(' > eval') > -1) {
			                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
			                }

			                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
			                    // Safari eval frames only have function names and nothing else
			                    return new StackFrame({
			                        functionName: line
			                    });
			                } else {
			                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
			                    var matches = line.match(functionNameRegex);
			                    var functionName = matches && matches[1] ? matches[1] : undefined;
			                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

			                    return new StackFrame({
			                        functionName: functionName,
			                        fileName: locationParts[0],
			                        lineNumber: locationParts[1],
			                        columnNumber: locationParts[2],
			                        source: line
			                    });
			                }
			            }, this);
			        },

			        parseOpera: function ErrorStackParser$$parseOpera(e) {
			            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
			                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
			                return this.parseOpera9(e);
			            } else if (!e.stack) {
			                return this.parseOpera10(e);
			            } else {
			                return this.parseOpera11(e);
			            }
			        },

			        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
			            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
			            var lines = e.message.split('\n');
			            var result = [];

			            for (var i = 2, len = lines.length; i < len; i += 2) {
			                var match = lineRE.exec(lines[i]);
			                if (match) {
			                    result.push(new StackFrame({
			                        fileName: match[2],
			                        lineNumber: match[1],
			                        source: lines[i]
			                    }));
			                }
			            }

			            return result;
			        },

			        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
			            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
			            var lines = e.stacktrace.split('\n');
			            var result = [];

			            for (var i = 0, len = lines.length; i < len; i += 2) {
			                var match = lineRE.exec(lines[i]);
			                if (match) {
			                    result.push(
			                        new StackFrame({
			                            functionName: match[3] || undefined,
			                            fileName: match[2],
			                            lineNumber: match[1],
			                            source: lines[i]
			                        })
			                    );
			                }
			            }

			            return result;
			        },

			        // Opera 10.65+ Error.stack very similar to FF/Safari
			        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
			            var filtered = error.stack.split('\n').filter(function(line) {
			                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
			            }, this);

			            return filtered.map(function(line) {
			                var tokens = line.split('@');
			                var locationParts = this.extractLocation(tokens.pop());
			                var functionCall = (tokens.shift() || '');
			                var functionName = functionCall
			                    .replace(/<anonymous function(: (\w+))?>/, '$2')
			                    .replace(/\([^)]*\)/g, '') || undefined;
			                var argsRaw;
			                if (functionCall.match(/\(([^)]*)\)/)) {
			                    argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
			                }
			                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
			                    undefined : argsRaw.split(',');

			                return new StackFrame({
			                    functionName: functionName,
			                    args: args,
			                    fileName: locationParts[0],
			                    lineNumber: locationParts[1],
			                    columnNumber: locationParts[2],
			                    source: line
			                });
			            }, this);
			        }
			    };
			})); 
		} (errorStackParser$1));
		return errorStackParser$1.exports;
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */

	var _listCacheClear;
	var hasRequired_listCacheClear;

	function require_listCacheClear () {
		if (hasRequired_listCacheClear) return _listCacheClear;
		hasRequired_listCacheClear = 1;
		function listCacheClear() {
		  this.__data__ = [];
		  this.size = 0;
		}

		_listCacheClear = listCacheClear;
		return _listCacheClear;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */

	var eq_1;
	var hasRequiredEq;

	function requireEq () {
		if (hasRequiredEq) return eq_1;
		hasRequiredEq = 1;
		function eq(value, other) {
		  return value === other || (value !== value && other !== other);
		}

		eq_1 = eq;
		return eq_1;
	}

	var _assocIndexOf;
	var hasRequired_assocIndexOf;

	function require_assocIndexOf () {
		if (hasRequired_assocIndexOf) return _assocIndexOf;
		hasRequired_assocIndexOf = 1;
		var eq = requireEq();

		/**
		 * Gets the index at which the `key` is found in `array` of key-value pairs.
		 *
		 * @private
		 * @param {Array} array The array to inspect.
		 * @param {*} key The key to search for.
		 * @returns {number} Returns the index of the matched value, else `-1`.
		 */
		function assocIndexOf(array, key) {
		  var length = array.length;
		  while (length--) {
		    if (eq(array[length][0], key)) {
		      return length;
		    }
		  }
		  return -1;
		}

		_assocIndexOf = assocIndexOf;
		return _assocIndexOf;
	}

	var _listCacheDelete;
	var hasRequired_listCacheDelete;

	function require_listCacheDelete () {
		if (hasRequired_listCacheDelete) return _listCacheDelete;
		hasRequired_listCacheDelete = 1;
		var assocIndexOf = require_assocIndexOf();

		/** Used for built-in method references. */
		var arrayProto = Array.prototype;

		/** Built-in value references. */
		var splice = arrayProto.splice;

		/**
		 * Removes `key` and its value from the list cache.
		 *
		 * @private
		 * @name delete
		 * @memberOf ListCache
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function listCacheDelete(key) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  if (index < 0) {
		    return false;
		  }
		  var lastIndex = data.length - 1;
		  if (index == lastIndex) {
		    data.pop();
		  } else {
		    splice.call(data, index, 1);
		  }
		  --this.size;
		  return true;
		}

		_listCacheDelete = listCacheDelete;
		return _listCacheDelete;
	}

	var _listCacheGet;
	var hasRequired_listCacheGet;

	function require_listCacheGet () {
		if (hasRequired_listCacheGet) return _listCacheGet;
		hasRequired_listCacheGet = 1;
		var assocIndexOf = require_assocIndexOf();

		/**
		 * Gets the list cache value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf ListCache
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function listCacheGet(key) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  return index < 0 ? undefined : data[index][1];
		}

		_listCacheGet = listCacheGet;
		return _listCacheGet;
	}

	var _listCacheHas;
	var hasRequired_listCacheHas;

	function require_listCacheHas () {
		if (hasRequired_listCacheHas) return _listCacheHas;
		hasRequired_listCacheHas = 1;
		var assocIndexOf = require_assocIndexOf();

		/**
		 * Checks if a list cache value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf ListCache
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function listCacheHas(key) {
		  return assocIndexOf(this.__data__, key) > -1;
		}

		_listCacheHas = listCacheHas;
		return _listCacheHas;
	}

	var _listCacheSet;
	var hasRequired_listCacheSet;

	function require_listCacheSet () {
		if (hasRequired_listCacheSet) return _listCacheSet;
		hasRequired_listCacheSet = 1;
		var assocIndexOf = require_assocIndexOf();

		/**
		 * Sets the list cache `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf ListCache
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the list cache instance.
		 */
		function listCacheSet(key, value) {
		  var data = this.__data__,
		      index = assocIndexOf(data, key);

		  if (index < 0) {
		    ++this.size;
		    data.push([key, value]);
		  } else {
		    data[index][1] = value;
		  }
		  return this;
		}

		_listCacheSet = listCacheSet;
		return _listCacheSet;
	}

	var _ListCache;
	var hasRequired_ListCache;

	function require_ListCache () {
		if (hasRequired_ListCache) return _ListCache;
		hasRequired_ListCache = 1;
		var listCacheClear = require_listCacheClear(),
		    listCacheDelete = require_listCacheDelete(),
		    listCacheGet = require_listCacheGet(),
		    listCacheHas = require_listCacheHas(),
		    listCacheSet = require_listCacheSet();

		/**
		 * Creates an list cache object.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function ListCache(entries) {
		  var index = -1,
		      length = entries == null ? 0 : entries.length;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		// Add methods to `ListCache`.
		ListCache.prototype.clear = listCacheClear;
		ListCache.prototype['delete'] = listCacheDelete;
		ListCache.prototype.get = listCacheGet;
		ListCache.prototype.has = listCacheHas;
		ListCache.prototype.set = listCacheSet;

		_ListCache = ListCache;
		return _ListCache;
	}

	var _stackClear;
	var hasRequired_stackClear;

	function require_stackClear () {
		if (hasRequired_stackClear) return _stackClear;
		hasRequired_stackClear = 1;
		var ListCache = require_ListCache();

		/**
		 * Removes all key-value entries from the stack.
		 *
		 * @private
		 * @name clear
		 * @memberOf Stack
		 */
		function stackClear() {
		  this.__data__ = new ListCache;
		  this.size = 0;
		}

		_stackClear = stackClear;
		return _stackClear;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	var _stackDelete;
	var hasRequired_stackDelete;

	function require_stackDelete () {
		if (hasRequired_stackDelete) return _stackDelete;
		hasRequired_stackDelete = 1;
		function stackDelete(key) {
		  var data = this.__data__,
		      result = data['delete'](key);

		  this.size = data.size;
		  return result;
		}

		_stackDelete = stackDelete;
		return _stackDelete;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	var _stackGet;
	var hasRequired_stackGet;

	function require_stackGet () {
		if (hasRequired_stackGet) return _stackGet;
		hasRequired_stackGet = 1;
		function stackGet(key) {
		  return this.__data__.get(key);
		}

		_stackGet = stackGet;
		return _stackGet;
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	var _stackHas;
	var hasRequired_stackHas;

	function require_stackHas () {
		if (hasRequired_stackHas) return _stackHas;
		hasRequired_stackHas = 1;
		function stackHas(key) {
		  return this.__data__.has(key);
		}

		_stackHas = stackHas;
		return _stackHas;
	}

	/** Detect free variable `global` from Node.js. */

	var _freeGlobal;
	var hasRequired_freeGlobal;

	function require_freeGlobal () {
		if (hasRequired_freeGlobal) return _freeGlobal;
		hasRequired_freeGlobal = 1;
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

		_freeGlobal = freeGlobal;
		return _freeGlobal;
	}

	var _root;
	var hasRequired_root;

	function require_root () {
		if (hasRequired_root) return _root;
		hasRequired_root = 1;
		var freeGlobal = require_freeGlobal();

		/** Detect free variable `self`. */
		var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

		/** Used as a reference to the global object. */
		var root = freeGlobal || freeSelf || Function('return this')();

		_root = root;
		return _root;
	}

	var _Symbol;
	var hasRequired_Symbol;

	function require_Symbol () {
		if (hasRequired_Symbol) return _Symbol;
		hasRequired_Symbol = 1;
		var root = require_root();

		/** Built-in value references. */
		var Symbol = root.Symbol;

		_Symbol = Symbol;
		return _Symbol;
	}

	var _getRawTag;
	var hasRequired_getRawTag;

	function require_getRawTag () {
		if (hasRequired_getRawTag) return _getRawTag;
		hasRequired_getRawTag = 1;
		var Symbol = require_Symbol();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var nativeObjectToString = objectProto.toString;

		/** Built-in value references. */
		var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

		/**
		 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {string} Returns the raw `toStringTag`.
		 */
		function getRawTag(value) {
		  var isOwn = hasOwnProperty.call(value, symToStringTag),
		      tag = value[symToStringTag];

		  try {
		    value[symToStringTag] = undefined;
		    var unmasked = true;
		  } catch (e) {}

		  var result = nativeObjectToString.call(value);
		  if (unmasked) {
		    if (isOwn) {
		      value[symToStringTag] = tag;
		    } else {
		      delete value[symToStringTag];
		    }
		  }
		  return result;
		}

		_getRawTag = getRawTag;
		return _getRawTag;
	}

	/** Used for built-in method references. */

	var _objectToString;
	var hasRequired_objectToString;

	function require_objectToString () {
		if (hasRequired_objectToString) return _objectToString;
		hasRequired_objectToString = 1;
		var objectProto = Object.prototype;

		/**
		 * Used to resolve the
		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		 * of values.
		 */
		var nativeObjectToString = objectProto.toString;

		/**
		 * Converts `value` to a string using `Object.prototype.toString`.
		 *
		 * @private
		 * @param {*} value The value to convert.
		 * @returns {string} Returns the converted string.
		 */
		function objectToString(value) {
		  return nativeObjectToString.call(value);
		}

		_objectToString = objectToString;
		return _objectToString;
	}

	var _baseGetTag;
	var hasRequired_baseGetTag;

	function require_baseGetTag () {
		if (hasRequired_baseGetTag) return _baseGetTag;
		hasRequired_baseGetTag = 1;
		var Symbol = require_Symbol(),
		    getRawTag = require_getRawTag(),
		    objectToString = require_objectToString();

		/** `Object#toString` result references. */
		var nullTag = '[object Null]',
		    undefinedTag = '[object Undefined]';

		/** Built-in value references. */
		var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

		/**
		 * The base implementation of `getTag` without fallbacks for buggy environments.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {string} Returns the `toStringTag`.
		 */
		function baseGetTag(value) {
		  if (value == null) {
		    return value === undefined ? undefinedTag : nullTag;
		  }
		  return (symToStringTag && symToStringTag in Object(value))
		    ? getRawTag(value)
		    : objectToString(value);
		}

		_baseGetTag = baseGetTag;
		return _baseGetTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	var isObject_1;
	var hasRequiredIsObject;

	function requireIsObject () {
		if (hasRequiredIsObject) return isObject_1;
		hasRequiredIsObject = 1;
		function isObject(value) {
		  var type = typeof value;
		  return value != null && (type == 'object' || type == 'function');
		}

		isObject_1 = isObject;
		return isObject_1;
	}

	var isFunction_1;
	var hasRequiredIsFunction;

	function requireIsFunction () {
		if (hasRequiredIsFunction) return isFunction_1;
		hasRequiredIsFunction = 1;
		var baseGetTag = require_baseGetTag(),
		    isObject = requireIsObject();

		/** `Object#toString` result references. */
		var asyncTag = '[object AsyncFunction]',
		    funcTag = '[object Function]',
		    genTag = '[object GeneratorFunction]',
		    proxyTag = '[object Proxy]';

		/**
		 * Checks if `value` is classified as a `Function` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
		 * @example
		 *
		 * _.isFunction(_);
		 * // => true
		 *
		 * _.isFunction(/abc/);
		 * // => false
		 */
		function isFunction(value) {
		  if (!isObject(value)) {
		    return false;
		  }
		  // The use of `Object#toString` avoids issues with the `typeof` operator
		  // in Safari 9 which returns 'object' for typed arrays and other constructors.
		  var tag = baseGetTag(value);
		  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
		}

		isFunction_1 = isFunction;
		return isFunction_1;
	}

	var _coreJsData;
	var hasRequired_coreJsData;

	function require_coreJsData () {
		if (hasRequired_coreJsData) return _coreJsData;
		hasRequired_coreJsData = 1;
		var root = require_root();

		/** Used to detect overreaching core-js shims. */
		var coreJsData = root['__core-js_shared__'];

		_coreJsData = coreJsData;
		return _coreJsData;
	}

	var _isMasked;
	var hasRequired_isMasked;

	function require_isMasked () {
		if (hasRequired_isMasked) return _isMasked;
		hasRequired_isMasked = 1;
		var coreJsData = require_coreJsData();

		/** Used to detect methods masquerading as native. */
		var maskSrcKey = (function() {
		  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		  return uid ? ('Symbol(src)_1.' + uid) : '';
		}());

		/**
		 * Checks if `func` has its source masked.
		 *
		 * @private
		 * @param {Function} func The function to check.
		 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
		 */
		function isMasked(func) {
		  return !!maskSrcKey && (maskSrcKey in func);
		}

		_isMasked = isMasked;
		return _isMasked;
	}

	/** Used for built-in method references. */

	var _toSource;
	var hasRequired_toSource;

	function require_toSource () {
		if (hasRequired_toSource) return _toSource;
		hasRequired_toSource = 1;
		var funcProto = Function.prototype;

		/** Used to resolve the decompiled source of functions. */
		var funcToString = funcProto.toString;

		/**
		 * Converts `func` to its source code.
		 *
		 * @private
		 * @param {Function} func The function to convert.
		 * @returns {string} Returns the source code.
		 */
		function toSource(func) {
		  if (func != null) {
		    try {
		      return funcToString.call(func);
		    } catch (e) {}
		    try {
		      return (func + '');
		    } catch (e) {}
		  }
		  return '';
		}

		_toSource = toSource;
		return _toSource;
	}

	var _baseIsNative;
	var hasRequired_baseIsNative;

	function require_baseIsNative () {
		if (hasRequired_baseIsNative) return _baseIsNative;
		hasRequired_baseIsNative = 1;
		var isFunction = requireIsFunction(),
		    isMasked = require_isMasked(),
		    isObject = requireIsObject(),
		    toSource = require_toSource();

		/**
		 * Used to match `RegExp`
		 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
		 */
		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

		/** Used to detect host constructors (Safari). */
		var reIsHostCtor = /^\[object .+?Constructor\]$/;

		/** Used for built-in method references. */
		var funcProto = Function.prototype,
		    objectProto = Object.prototype;

		/** Used to resolve the decompiled source of functions. */
		var funcToString = funcProto.toString;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/** Used to detect if a method is native. */
		var reIsNative = RegExp('^' +
		  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
		  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		);

		/**
		 * The base implementation of `_.isNative` without bad shim checks.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a native function,
		 *  else `false`.
		 */
		function baseIsNative(value) {
		  if (!isObject(value) || isMasked(value)) {
		    return false;
		  }
		  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
		  return pattern.test(toSource(value));
		}

		_baseIsNative = baseIsNative;
		return _baseIsNative;
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */

	var _getValue;
	var hasRequired_getValue;

	function require_getValue () {
		if (hasRequired_getValue) return _getValue;
		hasRequired_getValue = 1;
		function getValue(object, key) {
		  return object == null ? undefined : object[key];
		}

		_getValue = getValue;
		return _getValue;
	}

	var _getNative;
	var hasRequired_getNative;

	function require_getNative () {
		if (hasRequired_getNative) return _getNative;
		hasRequired_getNative = 1;
		var baseIsNative = require_baseIsNative(),
		    getValue = require_getValue();

		/**
		 * Gets the native function at `key` of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {string} key The key of the method to get.
		 * @returns {*} Returns the function if it's native, else `undefined`.
		 */
		function getNative(object, key) {
		  var value = getValue(object, key);
		  return baseIsNative(value) ? value : undefined;
		}

		_getNative = getNative;
		return _getNative;
	}

	var _Map;
	var hasRequired_Map;

	function require_Map () {
		if (hasRequired_Map) return _Map;
		hasRequired_Map = 1;
		var getNative = require_getNative(),
		    root = require_root();

		/* Built-in method references that are verified to be native. */
		var Map = getNative(root, 'Map');

		_Map = Map;
		return _Map;
	}

	var _nativeCreate;
	var hasRequired_nativeCreate;

	function require_nativeCreate () {
		if (hasRequired_nativeCreate) return _nativeCreate;
		hasRequired_nativeCreate = 1;
		var getNative = require_getNative();

		/* Built-in method references that are verified to be native. */
		var nativeCreate = getNative(Object, 'create');

		_nativeCreate = nativeCreate;
		return _nativeCreate;
	}

	var _hashClear;
	var hasRequired_hashClear;

	function require_hashClear () {
		if (hasRequired_hashClear) return _hashClear;
		hasRequired_hashClear = 1;
		var nativeCreate = require_nativeCreate();

		/**
		 * Removes all key-value entries from the hash.
		 *
		 * @private
		 * @name clear
		 * @memberOf Hash
		 */
		function hashClear() {
		  this.__data__ = nativeCreate ? nativeCreate(null) : {};
		  this.size = 0;
		}

		_hashClear = hashClear;
		return _hashClear;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	var _hashDelete;
	var hasRequired_hashDelete;

	function require_hashDelete () {
		if (hasRequired_hashDelete) return _hashDelete;
		hasRequired_hashDelete = 1;
		function hashDelete(key) {
		  var result = this.has(key) && delete this.__data__[key];
		  this.size -= result ? 1 : 0;
		  return result;
		}

		_hashDelete = hashDelete;
		return _hashDelete;
	}

	var _hashGet;
	var hasRequired_hashGet;

	function require_hashGet () {
		if (hasRequired_hashGet) return _hashGet;
		hasRequired_hashGet = 1;
		var nativeCreate = require_nativeCreate();

		/** Used to stand-in for `undefined` hash values. */
		var HASH_UNDEFINED = '__lodash_hash_undefined__';

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Gets the hash value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf Hash
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function hashGet(key) {
		  var data = this.__data__;
		  if (nativeCreate) {
		    var result = data[key];
		    return result === HASH_UNDEFINED ? undefined : result;
		  }
		  return hasOwnProperty.call(data, key) ? data[key] : undefined;
		}

		_hashGet = hashGet;
		return _hashGet;
	}

	var _hashHas;
	var hasRequired_hashHas;

	function require_hashHas () {
		if (hasRequired_hashHas) return _hashHas;
		hasRequired_hashHas = 1;
		var nativeCreate = require_nativeCreate();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Checks if a hash value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf Hash
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function hashHas(key) {
		  var data = this.__data__;
		  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
		}

		_hashHas = hashHas;
		return _hashHas;
	}

	var _hashSet;
	var hasRequired_hashSet;

	function require_hashSet () {
		if (hasRequired_hashSet) return _hashSet;
		hasRequired_hashSet = 1;
		var nativeCreate = require_nativeCreate();

		/** Used to stand-in for `undefined` hash values. */
		var HASH_UNDEFINED = '__lodash_hash_undefined__';

		/**
		 * Sets the hash `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf Hash
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the hash instance.
		 */
		function hashSet(key, value) {
		  var data = this.__data__;
		  this.size += this.has(key) ? 0 : 1;
		  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
		  return this;
		}

		_hashSet = hashSet;
		return _hashSet;
	}

	var _Hash;
	var hasRequired_Hash;

	function require_Hash () {
		if (hasRequired_Hash) return _Hash;
		hasRequired_Hash = 1;
		var hashClear = require_hashClear(),
		    hashDelete = require_hashDelete(),
		    hashGet = require_hashGet(),
		    hashHas = require_hashHas(),
		    hashSet = require_hashSet();

		/**
		 * Creates a hash object.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function Hash(entries) {
		  var index = -1,
		      length = entries == null ? 0 : entries.length;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		// Add methods to `Hash`.
		Hash.prototype.clear = hashClear;
		Hash.prototype['delete'] = hashDelete;
		Hash.prototype.get = hashGet;
		Hash.prototype.has = hashHas;
		Hash.prototype.set = hashSet;

		_Hash = Hash;
		return _Hash;
	}

	var _mapCacheClear;
	var hasRequired_mapCacheClear;

	function require_mapCacheClear () {
		if (hasRequired_mapCacheClear) return _mapCacheClear;
		hasRequired_mapCacheClear = 1;
		var Hash = require_Hash(),
		    ListCache = require_ListCache(),
		    Map = require_Map();

		/**
		 * Removes all key-value entries from the map.
		 *
		 * @private
		 * @name clear
		 * @memberOf MapCache
		 */
		function mapCacheClear() {
		  this.size = 0;
		  this.__data__ = {
		    'hash': new Hash,
		    'map': new (Map || ListCache),
		    'string': new Hash
		  };
		}

		_mapCacheClear = mapCacheClear;
		return _mapCacheClear;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */

	var _isKeyable;
	var hasRequired_isKeyable;

	function require_isKeyable () {
		if (hasRequired_isKeyable) return _isKeyable;
		hasRequired_isKeyable = 1;
		function isKeyable(value) {
		  var type = typeof value;
		  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
		    ? (value !== '__proto__')
		    : (value === null);
		}

		_isKeyable = isKeyable;
		return _isKeyable;
	}

	var _getMapData;
	var hasRequired_getMapData;

	function require_getMapData () {
		if (hasRequired_getMapData) return _getMapData;
		hasRequired_getMapData = 1;
		var isKeyable = require_isKeyable();

		/**
		 * Gets the data for `map`.
		 *
		 * @private
		 * @param {Object} map The map to query.
		 * @param {string} key The reference key.
		 * @returns {*} Returns the map data.
		 */
		function getMapData(map, key) {
		  var data = map.__data__;
		  return isKeyable(key)
		    ? data[typeof key == 'string' ? 'string' : 'hash']
		    : data.map;
		}

		_getMapData = getMapData;
		return _getMapData;
	}

	var _mapCacheDelete;
	var hasRequired_mapCacheDelete;

	function require_mapCacheDelete () {
		if (hasRequired_mapCacheDelete) return _mapCacheDelete;
		hasRequired_mapCacheDelete = 1;
		var getMapData = require_getMapData();

		/**
		 * Removes `key` and its value from the map.
		 *
		 * @private
		 * @name delete
		 * @memberOf MapCache
		 * @param {string} key The key of the value to remove.
		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		 */
		function mapCacheDelete(key) {
		  var result = getMapData(this, key)['delete'](key);
		  this.size -= result ? 1 : 0;
		  return result;
		}

		_mapCacheDelete = mapCacheDelete;
		return _mapCacheDelete;
	}

	var _mapCacheGet;
	var hasRequired_mapCacheGet;

	function require_mapCacheGet () {
		if (hasRequired_mapCacheGet) return _mapCacheGet;
		hasRequired_mapCacheGet = 1;
		var getMapData = require_getMapData();

		/**
		 * Gets the map value for `key`.
		 *
		 * @private
		 * @name get
		 * @memberOf MapCache
		 * @param {string} key The key of the value to get.
		 * @returns {*} Returns the entry value.
		 */
		function mapCacheGet(key) {
		  return getMapData(this, key).get(key);
		}

		_mapCacheGet = mapCacheGet;
		return _mapCacheGet;
	}

	var _mapCacheHas;
	var hasRequired_mapCacheHas;

	function require_mapCacheHas () {
		if (hasRequired_mapCacheHas) return _mapCacheHas;
		hasRequired_mapCacheHas = 1;
		var getMapData = require_getMapData();

		/**
		 * Checks if a map value for `key` exists.
		 *
		 * @private
		 * @name has
		 * @memberOf MapCache
		 * @param {string} key The key of the entry to check.
		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		 */
		function mapCacheHas(key) {
		  return getMapData(this, key).has(key);
		}

		_mapCacheHas = mapCacheHas;
		return _mapCacheHas;
	}

	var _mapCacheSet;
	var hasRequired_mapCacheSet;

	function require_mapCacheSet () {
		if (hasRequired_mapCacheSet) return _mapCacheSet;
		hasRequired_mapCacheSet = 1;
		var getMapData = require_getMapData();

		/**
		 * Sets the map `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf MapCache
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the map cache instance.
		 */
		function mapCacheSet(key, value) {
		  var data = getMapData(this, key),
		      size = data.size;

		  data.set(key, value);
		  this.size += data.size == size ? 0 : 1;
		  return this;
		}

		_mapCacheSet = mapCacheSet;
		return _mapCacheSet;
	}

	var _MapCache;
	var hasRequired_MapCache;

	function require_MapCache () {
		if (hasRequired_MapCache) return _MapCache;
		hasRequired_MapCache = 1;
		var mapCacheClear = require_mapCacheClear(),
		    mapCacheDelete = require_mapCacheDelete(),
		    mapCacheGet = require_mapCacheGet(),
		    mapCacheHas = require_mapCacheHas(),
		    mapCacheSet = require_mapCacheSet();

		/**
		 * Creates a map cache object to store key-value pairs.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function MapCache(entries) {
		  var index = -1,
		      length = entries == null ? 0 : entries.length;

		  this.clear();
		  while (++index < length) {
		    var entry = entries[index];
		    this.set(entry[0], entry[1]);
		  }
		}

		// Add methods to `MapCache`.
		MapCache.prototype.clear = mapCacheClear;
		MapCache.prototype['delete'] = mapCacheDelete;
		MapCache.prototype.get = mapCacheGet;
		MapCache.prototype.has = mapCacheHas;
		MapCache.prototype.set = mapCacheSet;

		_MapCache = MapCache;
		return _MapCache;
	}

	var _stackSet;
	var hasRequired_stackSet;

	function require_stackSet () {
		if (hasRequired_stackSet) return _stackSet;
		hasRequired_stackSet = 1;
		var ListCache = require_ListCache(),
		    Map = require_Map(),
		    MapCache = require_MapCache();

		/** Used as the size to enable large array optimizations. */
		var LARGE_ARRAY_SIZE = 200;

		/**
		 * Sets the stack `key` to `value`.
		 *
		 * @private
		 * @name set
		 * @memberOf Stack
		 * @param {string} key The key of the value to set.
		 * @param {*} value The value to set.
		 * @returns {Object} Returns the stack cache instance.
		 */
		function stackSet(key, value) {
		  var data = this.__data__;
		  if (data instanceof ListCache) {
		    var pairs = data.__data__;
		    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
		      pairs.push([key, value]);
		      this.size = ++data.size;
		      return this;
		    }
		    data = this.__data__ = new MapCache(pairs);
		  }
		  data.set(key, value);
		  this.size = data.size;
		  return this;
		}

		_stackSet = stackSet;
		return _stackSet;
	}

	var _Stack;
	var hasRequired_Stack;

	function require_Stack () {
		if (hasRequired_Stack) return _Stack;
		hasRequired_Stack = 1;
		var ListCache = require_ListCache(),
		    stackClear = require_stackClear(),
		    stackDelete = require_stackDelete(),
		    stackGet = require_stackGet(),
		    stackHas = require_stackHas(),
		    stackSet = require_stackSet();

		/**
		 * Creates a stack cache object to store key-value pairs.
		 *
		 * @private
		 * @constructor
		 * @param {Array} [entries] The key-value pairs to cache.
		 */
		function Stack(entries) {
		  var data = this.__data__ = new ListCache(entries);
		  this.size = data.size;
		}

		// Add methods to `Stack`.
		Stack.prototype.clear = stackClear;
		Stack.prototype['delete'] = stackDelete;
		Stack.prototype.get = stackGet;
		Stack.prototype.has = stackHas;
		Stack.prototype.set = stackSet;

		_Stack = Stack;
		return _Stack;
	}

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */

	var _arrayEach;
	var hasRequired_arrayEach;

	function require_arrayEach () {
		if (hasRequired_arrayEach) return _arrayEach;
		hasRequired_arrayEach = 1;
		function arrayEach(array, iteratee) {
		  var index = -1,
		      length = array == null ? 0 : array.length;

		  while (++index < length) {
		    if (iteratee(array[index], index, array) === false) {
		      break;
		    }
		  }
		  return array;
		}

		_arrayEach = arrayEach;
		return _arrayEach;
	}

	var _defineProperty;
	var hasRequired_defineProperty;

	function require_defineProperty () {
		if (hasRequired_defineProperty) return _defineProperty;
		hasRequired_defineProperty = 1;
		var getNative = require_getNative();

		var defineProperty = (function() {
		  try {
		    var func = getNative(Object, 'defineProperty');
		    func({}, '', {});
		    return func;
		  } catch (e) {}
		}());

		_defineProperty = defineProperty;
		return _defineProperty;
	}

	var _baseAssignValue;
	var hasRequired_baseAssignValue;

	function require_baseAssignValue () {
		if (hasRequired_baseAssignValue) return _baseAssignValue;
		hasRequired_baseAssignValue = 1;
		var defineProperty = require_defineProperty();

		/**
		 * The base implementation of `assignValue` and `assignMergeValue` without
		 * value checks.
		 *
		 * @private
		 * @param {Object} object The object to modify.
		 * @param {string} key The key of the property to assign.
		 * @param {*} value The value to assign.
		 */
		function baseAssignValue(object, key, value) {
		  if (key == '__proto__' && defineProperty) {
		    defineProperty(object, key, {
		      'configurable': true,
		      'enumerable': true,
		      'value': value,
		      'writable': true
		    });
		  } else {
		    object[key] = value;
		  }
		}

		_baseAssignValue = baseAssignValue;
		return _baseAssignValue;
	}

	var _assignValue;
	var hasRequired_assignValue;

	function require_assignValue () {
		if (hasRequired_assignValue) return _assignValue;
		hasRequired_assignValue = 1;
		var baseAssignValue = require_baseAssignValue(),
		    eq = requireEq();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Assigns `value` to `key` of `object` if the existing value is not equivalent
		 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		 * for equality comparisons.
		 *
		 * @private
		 * @param {Object} object The object to modify.
		 * @param {string} key The key of the property to assign.
		 * @param {*} value The value to assign.
		 */
		function assignValue(object, key, value) {
		  var objValue = object[key];
		  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
		      (value === undefined && !(key in object))) {
		    baseAssignValue(object, key, value);
		  }
		}

		_assignValue = assignValue;
		return _assignValue;
	}

	var _copyObject;
	var hasRequired_copyObject;

	function require_copyObject () {
		if (hasRequired_copyObject) return _copyObject;
		hasRequired_copyObject = 1;
		var assignValue = require_assignValue(),
		    baseAssignValue = require_baseAssignValue();

		/**
		 * Copies properties of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy properties from.
		 * @param {Array} props The property identifiers to copy.
		 * @param {Object} [object={}] The object to copy properties to.
		 * @param {Function} [customizer] The function to customize copied values.
		 * @returns {Object} Returns `object`.
		 */
		function copyObject(source, props, object, customizer) {
		  var isNew = !object;
		  object || (object = {});

		  var index = -1,
		      length = props.length;

		  while (++index < length) {
		    var key = props[index];

		    var newValue = customizer
		      ? customizer(object[key], source[key], key, object, source)
		      : undefined;

		    if (newValue === undefined) {
		      newValue = source[key];
		    }
		    if (isNew) {
		      baseAssignValue(object, key, newValue);
		    } else {
		      assignValue(object, key, newValue);
		    }
		  }
		  return object;
		}

		_copyObject = copyObject;
		return _copyObject;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */

	var _baseTimes;
	var hasRequired_baseTimes;

	function require_baseTimes () {
		if (hasRequired_baseTimes) return _baseTimes;
		hasRequired_baseTimes = 1;
		function baseTimes(n, iteratee) {
		  var index = -1,
		      result = Array(n);

		  while (++index < n) {
		    result[index] = iteratee(index);
		  }
		  return result;
		}

		_baseTimes = baseTimes;
		return _baseTimes;
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	var isObjectLike_1;
	var hasRequiredIsObjectLike;

	function requireIsObjectLike () {
		if (hasRequiredIsObjectLike) return isObjectLike_1;
		hasRequiredIsObjectLike = 1;
		function isObjectLike(value) {
		  return value != null && typeof value == 'object';
		}

		isObjectLike_1 = isObjectLike;
		return isObjectLike_1;
	}

	var _baseIsArguments;
	var hasRequired_baseIsArguments;

	function require_baseIsArguments () {
		if (hasRequired_baseIsArguments) return _baseIsArguments;
		hasRequired_baseIsArguments = 1;
		var baseGetTag = require_baseGetTag(),
		    isObjectLike = requireIsObjectLike();

		/** `Object#toString` result references. */
		var argsTag = '[object Arguments]';

		/**
		 * The base implementation of `_.isArguments`.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		 */
		function baseIsArguments(value) {
		  return isObjectLike(value) && baseGetTag(value) == argsTag;
		}

		_baseIsArguments = baseIsArguments;
		return _baseIsArguments;
	}

	var isArguments_1;
	var hasRequiredIsArguments;

	function requireIsArguments () {
		if (hasRequiredIsArguments) return isArguments_1;
		hasRequiredIsArguments = 1;
		var baseIsArguments = require_baseIsArguments(),
		    isObjectLike = requireIsObjectLike();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/** Built-in value references. */
		var propertyIsEnumerable = objectProto.propertyIsEnumerable;

		/**
		 * Checks if `value` is likely an `arguments` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 0.1.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		 *  else `false`.
		 * @example
		 *
		 * _.isArguments(function() { return arguments; }());
		 * // => true
		 *
		 * _.isArguments([1, 2, 3]);
		 * // => false
		 */
		var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
		  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
		    !propertyIsEnumerable.call(value, 'callee');
		};

		isArguments_1 = isArguments;
		return isArguments_1;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */

	var isArray_1;
	var hasRequiredIsArray;

	function requireIsArray () {
		if (hasRequiredIsArray) return isArray_1;
		hasRequiredIsArray = 1;
		var isArray = Array.isArray;

		isArray_1 = isArray;
		return isArray_1;
	}

	var isBuffer = {exports: {}};

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */

	var stubFalse_1;
	var hasRequiredStubFalse;

	function requireStubFalse () {
		if (hasRequiredStubFalse) return stubFalse_1;
		hasRequiredStubFalse = 1;
		function stubFalse() {
		  return false;
		}

		stubFalse_1 = stubFalse;
		return stubFalse_1;
	}

	isBuffer.exports;

	var hasRequiredIsBuffer;

	function requireIsBuffer () {
		if (hasRequiredIsBuffer) return isBuffer.exports;
		hasRequiredIsBuffer = 1;
		(function (module, exports) {
			var root = require_root(),
			    stubFalse = requireStubFalse();

			/** Detect free variable `exports`. */
			var freeExports = exports && !exports.nodeType && exports;

			/** Detect free variable `module`. */
			var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

			/** Detect the popular CommonJS extension `module.exports`. */
			var moduleExports = freeModule && freeModule.exports === freeExports;

			/** Built-in value references. */
			var Buffer = moduleExports ? root.Buffer : undefined;

			/* Built-in method references for those with the same name as other `lodash` methods. */
			var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

			/**
			 * Checks if `value` is a buffer.
			 *
			 * @static
			 * @memberOf _
			 * @since 4.3.0
			 * @category Lang
			 * @param {*} value The value to check.
			 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
			 * @example
			 *
			 * _.isBuffer(new Buffer(2));
			 * // => true
			 *
			 * _.isBuffer(new Uint8Array(2));
			 * // => false
			 */
			var isBuffer = nativeIsBuffer || stubFalse;

			module.exports = isBuffer; 
		} (isBuffer, isBuffer.exports));
		return isBuffer.exports;
	}

	/** Used as references for various `Number` constants. */

	var _isIndex;
	var hasRequired_isIndex;

	function require_isIndex () {
		if (hasRequired_isIndex) return _isIndex;
		hasRequired_isIndex = 1;
		var MAX_SAFE_INTEGER = 9007199254740991;

		/** Used to detect unsigned integer values. */
		var reIsUint = /^(?:0|[1-9]\d*)$/;

		/**
		 * Checks if `value` is a valid array-like index.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		 */
		function isIndex(value, length) {
		  var type = typeof value;
		  length = length == null ? MAX_SAFE_INTEGER : length;

		  return !!length &&
		    (type == 'number' ||
		      (type != 'symbol' && reIsUint.test(value))) &&
		        (value > -1 && value % 1 == 0 && value < length);
		}

		_isIndex = isIndex;
		return _isIndex;
	}

	/** Used as references for various `Number` constants. */

	var isLength_1;
	var hasRequiredIsLength;

	function requireIsLength () {
		if (hasRequiredIsLength) return isLength_1;
		hasRequiredIsLength = 1;
		var MAX_SAFE_INTEGER = 9007199254740991;

		/**
		 * Checks if `value` is a valid array-like length.
		 *
		 * **Note:** This method is loosely based on
		 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		 * @example
		 *
		 * _.isLength(3);
		 * // => true
		 *
		 * _.isLength(Number.MIN_VALUE);
		 * // => false
		 *
		 * _.isLength(Infinity);
		 * // => false
		 *
		 * _.isLength('3');
		 * // => false
		 */
		function isLength(value) {
		  return typeof value == 'number' &&
		    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		}

		isLength_1 = isLength;
		return isLength_1;
	}

	var _baseIsTypedArray;
	var hasRequired_baseIsTypedArray;

	function require_baseIsTypedArray () {
		if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
		hasRequired_baseIsTypedArray = 1;
		var baseGetTag = require_baseGetTag(),
		    isLength = requireIsLength(),
		    isObjectLike = requireIsObjectLike();

		/** `Object#toString` result references. */
		var argsTag = '[object Arguments]',
		    arrayTag = '[object Array]',
		    boolTag = '[object Boolean]',
		    dateTag = '[object Date]',
		    errorTag = '[object Error]',
		    funcTag = '[object Function]',
		    mapTag = '[object Map]',
		    numberTag = '[object Number]',
		    objectTag = '[object Object]',
		    regexpTag = '[object RegExp]',
		    setTag = '[object Set]',
		    stringTag = '[object String]',
		    weakMapTag = '[object WeakMap]';

		var arrayBufferTag = '[object ArrayBuffer]',
		    dataViewTag = '[object DataView]',
		    float32Tag = '[object Float32Array]',
		    float64Tag = '[object Float64Array]',
		    int8Tag = '[object Int8Array]',
		    int16Tag = '[object Int16Array]',
		    int32Tag = '[object Int32Array]',
		    uint8Tag = '[object Uint8Array]',
		    uint8ClampedTag = '[object Uint8ClampedArray]',
		    uint16Tag = '[object Uint16Array]',
		    uint32Tag = '[object Uint32Array]';

		/** Used to identify `toStringTag` values of typed arrays. */
		var typedArrayTags = {};
		typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
		typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
		typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
		typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
		typedArrayTags[uint32Tag] = true;
		typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
		typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
		typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
		typedArrayTags[errorTag] = typedArrayTags[funcTag] =
		typedArrayTags[mapTag] = typedArrayTags[numberTag] =
		typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
		typedArrayTags[setTag] = typedArrayTags[stringTag] =
		typedArrayTags[weakMapTag] = false;

		/**
		 * The base implementation of `_.isTypedArray` without Node.js optimizations.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		 */
		function baseIsTypedArray(value) {
		  return isObjectLike(value) &&
		    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
		}

		_baseIsTypedArray = baseIsTypedArray;
		return _baseIsTypedArray;
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */

	var _baseUnary;
	var hasRequired_baseUnary;

	function require_baseUnary () {
		if (hasRequired_baseUnary) return _baseUnary;
		hasRequired_baseUnary = 1;
		function baseUnary(func) {
		  return function(value) {
		    return func(value);
		  };
		}

		_baseUnary = baseUnary;
		return _baseUnary;
	}

	var _nodeUtil = {exports: {}};

	_nodeUtil.exports;

	var hasRequired_nodeUtil;

	function require_nodeUtil () {
		if (hasRequired_nodeUtil) return _nodeUtil.exports;
		hasRequired_nodeUtil = 1;
		(function (module, exports) {
			var freeGlobal = require_freeGlobal();

			/** Detect free variable `exports`. */
			var freeExports = exports && !exports.nodeType && exports;

			/** Detect free variable `module`. */
			var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

			/** Detect the popular CommonJS extension `module.exports`. */
			var moduleExports = freeModule && freeModule.exports === freeExports;

			/** Detect free variable `process` from Node.js. */
			var freeProcess = moduleExports && freeGlobal.process;

			/** Used to access faster Node.js helpers. */
			var nodeUtil = (function() {
			  try {
			    // Use `util.types` for Node.js 10+.
			    var types = freeModule && freeModule.require && freeModule.require('util').types;

			    if (types) {
			      return types;
			    }

			    // Legacy `process.binding('util')` for Node.js < 10.
			    return freeProcess && freeProcess.binding && freeProcess.binding('util');
			  } catch (e) {}
			}());

			module.exports = nodeUtil; 
		} (_nodeUtil, _nodeUtil.exports));
		return _nodeUtil.exports;
	}

	var isTypedArray_1;
	var hasRequiredIsTypedArray;

	function requireIsTypedArray () {
		if (hasRequiredIsTypedArray) return isTypedArray_1;
		hasRequiredIsTypedArray = 1;
		var baseIsTypedArray = require_baseIsTypedArray(),
		    baseUnary = require_baseUnary(),
		    nodeUtil = require_nodeUtil();

		/* Node.js helper references. */
		var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

		/**
		 * Checks if `value` is classified as a typed array.
		 *
		 * @static
		 * @memberOf _
		 * @since 3.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		 * @example
		 *
		 * _.isTypedArray(new Uint8Array);
		 * // => true
		 *
		 * _.isTypedArray([]);
		 * // => false
		 */
		var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

		isTypedArray_1 = isTypedArray;
		return isTypedArray_1;
	}

	var _arrayLikeKeys;
	var hasRequired_arrayLikeKeys;

	function require_arrayLikeKeys () {
		if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
		hasRequired_arrayLikeKeys = 1;
		var baseTimes = require_baseTimes(),
		    isArguments = requireIsArguments(),
		    isArray = requireIsArray(),
		    isBuffer = requireIsBuffer(),
		    isIndex = require_isIndex(),
		    isTypedArray = requireIsTypedArray();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Creates an array of the enumerable property names of the array-like `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @param {boolean} inherited Specify returning inherited property names.
		 * @returns {Array} Returns the array of property names.
		 */
		function arrayLikeKeys(value, inherited) {
		  var isArr = isArray(value),
		      isArg = !isArr && isArguments(value),
		      isBuff = !isArr && !isArg && isBuffer(value),
		      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
		      skipIndexes = isArr || isArg || isBuff || isType,
		      result = skipIndexes ? baseTimes(value.length, String) : [],
		      length = result.length;

		  for (var key in value) {
		    if ((inherited || hasOwnProperty.call(value, key)) &&
		        !(skipIndexes && (
		           // Safari 9 has enumerable `arguments.length` in strict mode.
		           key == 'length' ||
		           // Node.js 0.10 has enumerable non-index properties on buffers.
		           (isBuff && (key == 'offset' || key == 'parent')) ||
		           // PhantomJS 2 has enumerable non-index properties on typed arrays.
		           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
		           // Skip index properties.
		           isIndex(key, length)
		        ))) {
		      result.push(key);
		    }
		  }
		  return result;
		}

		_arrayLikeKeys = arrayLikeKeys;
		return _arrayLikeKeys;
	}

	/** Used for built-in method references. */

	var _isPrototype;
	var hasRequired_isPrototype;

	function require_isPrototype () {
		if (hasRequired_isPrototype) return _isPrototype;
		hasRequired_isPrototype = 1;
		var objectProto = Object.prototype;

		/**
		 * Checks if `value` is likely a prototype object.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
		 */
		function isPrototype(value) {
		  var Ctor = value && value.constructor,
		      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

		  return value === proto;
		}

		_isPrototype = isPrototype;
		return _isPrototype;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */

	var _overArg;
	var hasRequired_overArg;

	function require_overArg () {
		if (hasRequired_overArg) return _overArg;
		hasRequired_overArg = 1;
		function overArg(func, transform) {
		  return function(arg) {
		    return func(transform(arg));
		  };
		}

		_overArg = overArg;
		return _overArg;
	}

	var _nativeKeys;
	var hasRequired_nativeKeys;

	function require_nativeKeys () {
		if (hasRequired_nativeKeys) return _nativeKeys;
		hasRequired_nativeKeys = 1;
		var overArg = require_overArg();

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeKeys = overArg(Object.keys, Object);

		_nativeKeys = nativeKeys;
		return _nativeKeys;
	}

	var _baseKeys;
	var hasRequired_baseKeys;

	function require_baseKeys () {
		if (hasRequired_baseKeys) return _baseKeys;
		hasRequired_baseKeys = 1;
		var isPrototype = require_isPrototype(),
		    nativeKeys = require_nativeKeys();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 */
		function baseKeys(object) {
		  if (!isPrototype(object)) {
		    return nativeKeys(object);
		  }
		  var result = [];
		  for (var key in Object(object)) {
		    if (hasOwnProperty.call(object, key) && key != 'constructor') {
		      result.push(key);
		    }
		  }
		  return result;
		}

		_baseKeys = baseKeys;
		return _baseKeys;
	}

	var isArrayLike_1;
	var hasRequiredIsArrayLike;

	function requireIsArrayLike () {
		if (hasRequiredIsArrayLike) return isArrayLike_1;
		hasRequiredIsArrayLike = 1;
		var isFunction = requireIsFunction(),
		    isLength = requireIsLength();

		/**
		 * Checks if `value` is array-like. A value is considered array-like if it's
		 * not a function and has a `value.length` that's an integer greater than or
		 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.0.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		 * @example
		 *
		 * _.isArrayLike([1, 2, 3]);
		 * // => true
		 *
		 * _.isArrayLike(document.body.children);
		 * // => true
		 *
		 * _.isArrayLike('abc');
		 * // => true
		 *
		 * _.isArrayLike(_.noop);
		 * // => false
		 */
		function isArrayLike(value) {
		  return value != null && isLength(value.length) && !isFunction(value);
		}

		isArrayLike_1 = isArrayLike;
		return isArrayLike_1;
	}

	var keys_1;
	var hasRequiredKeys;

	function requireKeys () {
		if (hasRequiredKeys) return keys_1;
		hasRequiredKeys = 1;
		var arrayLikeKeys = require_arrayLikeKeys(),
		    baseKeys = require_baseKeys(),
		    isArrayLike = requireIsArrayLike();

		/**
		 * Creates an array of the own enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects. See the
		 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		 * for more details.
		 *
		 * @static
		 * @since 0.1.0
		 * @memberOf _
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keys(new Foo);
		 * // => ['a', 'b'] (iteration order is not guaranteed)
		 *
		 * _.keys('hi');
		 * // => ['0', '1']
		 */
		function keys(object) {
		  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
		}

		keys_1 = keys;
		return keys_1;
	}

	var _baseAssign;
	var hasRequired_baseAssign;

	function require_baseAssign () {
		if (hasRequired_baseAssign) return _baseAssign;
		hasRequired_baseAssign = 1;
		var copyObject = require_copyObject(),
		    keys = requireKeys();

		/**
		 * The base implementation of `_.assign` without support for multiple sources
		 * or `customizer` functions.
		 *
		 * @private
		 * @param {Object} object The destination object.
		 * @param {Object} source The source object.
		 * @returns {Object} Returns `object`.
		 */
		function baseAssign(object, source) {
		  return object && copyObject(source, keys(source), object);
		}

		_baseAssign = baseAssign;
		return _baseAssign;
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	var _nativeKeysIn;
	var hasRequired_nativeKeysIn;

	function require_nativeKeysIn () {
		if (hasRequired_nativeKeysIn) return _nativeKeysIn;
		hasRequired_nativeKeysIn = 1;
		function nativeKeysIn(object) {
		  var result = [];
		  if (object != null) {
		    for (var key in Object(object)) {
		      result.push(key);
		    }
		  }
		  return result;
		}

		_nativeKeysIn = nativeKeysIn;
		return _nativeKeysIn;
	}

	var _baseKeysIn;
	var hasRequired_baseKeysIn;

	function require_baseKeysIn () {
		if (hasRequired_baseKeysIn) return _baseKeysIn;
		hasRequired_baseKeysIn = 1;
		var isObject = requireIsObject(),
		    isPrototype = require_isPrototype(),
		    nativeKeysIn = require_nativeKeysIn();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 */
		function baseKeysIn(object) {
		  if (!isObject(object)) {
		    return nativeKeysIn(object);
		  }
		  var isProto = isPrototype(object),
		      result = [];

		  for (var key in object) {
		    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
		      result.push(key);
		    }
		  }
		  return result;
		}

		_baseKeysIn = baseKeysIn;
		return _baseKeysIn;
	}

	var keysIn_1;
	var hasRequiredKeysIn;

	function requireKeysIn () {
		if (hasRequiredKeysIn) return keysIn_1;
		hasRequiredKeysIn = 1;
		var arrayLikeKeys = require_arrayLikeKeys(),
		    baseKeysIn = require_baseKeysIn(),
		    isArrayLike = requireIsArrayLike();

		/**
		 * Creates an array of the own and inherited enumerable property names of `object`.
		 *
		 * **Note:** Non-object values are coerced to objects.
		 *
		 * @static
		 * @memberOf _
		 * @since 3.0.0
		 * @category Object
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names.
		 * @example
		 *
		 * function Foo() {
		 *   this.a = 1;
		 *   this.b = 2;
		 * }
		 *
		 * Foo.prototype.c = 3;
		 *
		 * _.keysIn(new Foo);
		 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
		 */
		function keysIn(object) {
		  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
		}

		keysIn_1 = keysIn;
		return keysIn_1;
	}

	var _baseAssignIn;
	var hasRequired_baseAssignIn;

	function require_baseAssignIn () {
		if (hasRequired_baseAssignIn) return _baseAssignIn;
		hasRequired_baseAssignIn = 1;
		var copyObject = require_copyObject(),
		    keysIn = requireKeysIn();

		/**
		 * The base implementation of `_.assignIn` without support for multiple sources
		 * or `customizer` functions.
		 *
		 * @private
		 * @param {Object} object The destination object.
		 * @param {Object} source The source object.
		 * @returns {Object} Returns `object`.
		 */
		function baseAssignIn(object, source) {
		  return object && copyObject(source, keysIn(source), object);
		}

		_baseAssignIn = baseAssignIn;
		return _baseAssignIn;
	}

	var _cloneBuffer = {exports: {}};

	_cloneBuffer.exports;

	var hasRequired_cloneBuffer;

	function require_cloneBuffer () {
		if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
		hasRequired_cloneBuffer = 1;
		(function (module, exports) {
			var root = require_root();

			/** Detect free variable `exports`. */
			var freeExports = exports && !exports.nodeType && exports;

			/** Detect free variable `module`. */
			var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

			/** Detect the popular CommonJS extension `module.exports`. */
			var moduleExports = freeModule && freeModule.exports === freeExports;

			/** Built-in value references. */
			var Buffer = moduleExports ? root.Buffer : undefined,
			    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

			/**
			 * Creates a clone of  `buffer`.
			 *
			 * @private
			 * @param {Buffer} buffer The buffer to clone.
			 * @param {boolean} [isDeep] Specify a deep clone.
			 * @returns {Buffer} Returns the cloned buffer.
			 */
			function cloneBuffer(buffer, isDeep) {
			  if (isDeep) {
			    return buffer.slice();
			  }
			  var length = buffer.length,
			      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

			  buffer.copy(result);
			  return result;
			}

			module.exports = cloneBuffer; 
		} (_cloneBuffer, _cloneBuffer.exports));
		return _cloneBuffer.exports;
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */

	var _copyArray;
	var hasRequired_copyArray;

	function require_copyArray () {
		if (hasRequired_copyArray) return _copyArray;
		hasRequired_copyArray = 1;
		function copyArray(source, array) {
		  var index = -1,
		      length = source.length;

		  array || (array = Array(length));
		  while (++index < length) {
		    array[index] = source[index];
		  }
		  return array;
		}

		_copyArray = copyArray;
		return _copyArray;
	}

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */

	var _arrayFilter;
	var hasRequired_arrayFilter;

	function require_arrayFilter () {
		if (hasRequired_arrayFilter) return _arrayFilter;
		hasRequired_arrayFilter = 1;
		function arrayFilter(array, predicate) {
		  var index = -1,
		      length = array == null ? 0 : array.length,
		      resIndex = 0,
		      result = [];

		  while (++index < length) {
		    var value = array[index];
		    if (predicate(value, index, array)) {
		      result[resIndex++] = value;
		    }
		  }
		  return result;
		}

		_arrayFilter = arrayFilter;
		return _arrayFilter;
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */

	var stubArray_1;
	var hasRequiredStubArray;

	function requireStubArray () {
		if (hasRequiredStubArray) return stubArray_1;
		hasRequiredStubArray = 1;
		function stubArray() {
		  return [];
		}

		stubArray_1 = stubArray;
		return stubArray_1;
	}

	var _getSymbols;
	var hasRequired_getSymbols;

	function require_getSymbols () {
		if (hasRequired_getSymbols) return _getSymbols;
		hasRequired_getSymbols = 1;
		var arrayFilter = require_arrayFilter(),
		    stubArray = requireStubArray();

		/** Used for built-in method references. */
		var objectProto = Object.prototype;

		/** Built-in value references. */
		var propertyIsEnumerable = objectProto.propertyIsEnumerable;

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeGetSymbols = Object.getOwnPropertySymbols;

		/**
		 * Creates an array of the own enumerable symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of symbols.
		 */
		var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		  if (object == null) {
		    return [];
		  }
		  object = Object(object);
		  return arrayFilter(nativeGetSymbols(object), function(symbol) {
		    return propertyIsEnumerable.call(object, symbol);
		  });
		};

		_getSymbols = getSymbols;
		return _getSymbols;
	}

	var _copySymbols;
	var hasRequired_copySymbols;

	function require_copySymbols () {
		if (hasRequired_copySymbols) return _copySymbols;
		hasRequired_copySymbols = 1;
		var copyObject = require_copyObject(),
		    getSymbols = require_getSymbols();

		/**
		 * Copies own symbols of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy symbols from.
		 * @param {Object} [object={}] The object to copy symbols to.
		 * @returns {Object} Returns `object`.
		 */
		function copySymbols(source, object) {
		  return copyObject(source, getSymbols(source), object);
		}

		_copySymbols = copySymbols;
		return _copySymbols;
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */

	var _arrayPush;
	var hasRequired_arrayPush;

	function require_arrayPush () {
		if (hasRequired_arrayPush) return _arrayPush;
		hasRequired_arrayPush = 1;
		function arrayPush(array, values) {
		  var index = -1,
		      length = values.length,
		      offset = array.length;

		  while (++index < length) {
		    array[offset + index] = values[index];
		  }
		  return array;
		}

		_arrayPush = arrayPush;
		return _arrayPush;
	}

	var _getPrototype;
	var hasRequired_getPrototype;

	function require_getPrototype () {
		if (hasRequired_getPrototype) return _getPrototype;
		hasRequired_getPrototype = 1;
		var overArg = require_overArg();

		/** Built-in value references. */
		var getPrototype = overArg(Object.getPrototypeOf, Object);

		_getPrototype = getPrototype;
		return _getPrototype;
	}

	var _getSymbolsIn;
	var hasRequired_getSymbolsIn;

	function require_getSymbolsIn () {
		if (hasRequired_getSymbolsIn) return _getSymbolsIn;
		hasRequired_getSymbolsIn = 1;
		var arrayPush = require_arrayPush(),
		    getPrototype = require_getPrototype(),
		    getSymbols = require_getSymbols(),
		    stubArray = requireStubArray();

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeGetSymbols = Object.getOwnPropertySymbols;

		/**
		 * Creates an array of the own and inherited enumerable symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of symbols.
		 */
		var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
		  var result = [];
		  while (object) {
		    arrayPush(result, getSymbols(object));
		    object = getPrototype(object);
		  }
		  return result;
		};

		_getSymbolsIn = getSymbolsIn;
		return _getSymbolsIn;
	}

	var _copySymbolsIn;
	var hasRequired_copySymbolsIn;

	function require_copySymbolsIn () {
		if (hasRequired_copySymbolsIn) return _copySymbolsIn;
		hasRequired_copySymbolsIn = 1;
		var copyObject = require_copyObject(),
		    getSymbolsIn = require_getSymbolsIn();

		/**
		 * Copies own and inherited symbols of `source` to `object`.
		 *
		 * @private
		 * @param {Object} source The object to copy symbols from.
		 * @param {Object} [object={}] The object to copy symbols to.
		 * @returns {Object} Returns `object`.
		 */
		function copySymbolsIn(source, object) {
		  return copyObject(source, getSymbolsIn(source), object);
		}

		_copySymbolsIn = copySymbolsIn;
		return _copySymbolsIn;
	}

	var _baseGetAllKeys;
	var hasRequired_baseGetAllKeys;

	function require_baseGetAllKeys () {
		if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
		hasRequired_baseGetAllKeys = 1;
		var arrayPush = require_arrayPush(),
		    isArray = requireIsArray();

		/**
		 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
		 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
		 * symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @param {Function} keysFunc The function to get the keys of `object`.
		 * @param {Function} symbolsFunc The function to get the symbols of `object`.
		 * @returns {Array} Returns the array of property names and symbols.
		 */
		function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		  var result = keysFunc(object);
		  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
		}

		_baseGetAllKeys = baseGetAllKeys;
		return _baseGetAllKeys;
	}

	var _getAllKeys;
	var hasRequired_getAllKeys;

	function require_getAllKeys () {
		if (hasRequired_getAllKeys) return _getAllKeys;
		hasRequired_getAllKeys = 1;
		var baseGetAllKeys = require_baseGetAllKeys(),
		    getSymbols = require_getSymbols(),
		    keys = requireKeys();

		/**
		 * Creates an array of own enumerable property names and symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names and symbols.
		 */
		function getAllKeys(object) {
		  return baseGetAllKeys(object, keys, getSymbols);
		}

		_getAllKeys = getAllKeys;
		return _getAllKeys;
	}

	var _getAllKeysIn;
	var hasRequired_getAllKeysIn;

	function require_getAllKeysIn () {
		if (hasRequired_getAllKeysIn) return _getAllKeysIn;
		hasRequired_getAllKeysIn = 1;
		var baseGetAllKeys = require_baseGetAllKeys(),
		    getSymbolsIn = require_getSymbolsIn(),
		    keysIn = requireKeysIn();

		/**
		 * Creates an array of own and inherited enumerable property names and
		 * symbols of `object`.
		 *
		 * @private
		 * @param {Object} object The object to query.
		 * @returns {Array} Returns the array of property names and symbols.
		 */
		function getAllKeysIn(object) {
		  return baseGetAllKeys(object, keysIn, getSymbolsIn);
		}

		_getAllKeysIn = getAllKeysIn;
		return _getAllKeysIn;
	}

	var _DataView;
	var hasRequired_DataView;

	function require_DataView () {
		if (hasRequired_DataView) return _DataView;
		hasRequired_DataView = 1;
		var getNative = require_getNative(),
		    root = require_root();

		/* Built-in method references that are verified to be native. */
		var DataView = getNative(root, 'DataView');

		_DataView = DataView;
		return _DataView;
	}

	var _Promise;
	var hasRequired_Promise;

	function require_Promise () {
		if (hasRequired_Promise) return _Promise;
		hasRequired_Promise = 1;
		var getNative = require_getNative(),
		    root = require_root();

		/* Built-in method references that are verified to be native. */
		var Promise = getNative(root, 'Promise');

		_Promise = Promise;
		return _Promise;
	}

	var _Set;
	var hasRequired_Set;

	function require_Set () {
		if (hasRequired_Set) return _Set;
		hasRequired_Set = 1;
		var getNative = require_getNative(),
		    root = require_root();

		/* Built-in method references that are verified to be native. */
		var Set = getNative(root, 'Set');

		_Set = Set;
		return _Set;
	}

	var _WeakMap;
	var hasRequired_WeakMap;

	function require_WeakMap () {
		if (hasRequired_WeakMap) return _WeakMap;
		hasRequired_WeakMap = 1;
		var getNative = require_getNative(),
		    root = require_root();

		/* Built-in method references that are verified to be native. */
		var WeakMap = getNative(root, 'WeakMap');

		_WeakMap = WeakMap;
		return _WeakMap;
	}

	var _getTag;
	var hasRequired_getTag;

	function require_getTag () {
		if (hasRequired_getTag) return _getTag;
		hasRequired_getTag = 1;
		var DataView = require_DataView(),
		    Map = require_Map(),
		    Promise = require_Promise(),
		    Set = require_Set(),
		    WeakMap = require_WeakMap(),
		    baseGetTag = require_baseGetTag(),
		    toSource = require_toSource();

		/** `Object#toString` result references. */
		var mapTag = '[object Map]',
		    objectTag = '[object Object]',
		    promiseTag = '[object Promise]',
		    setTag = '[object Set]',
		    weakMapTag = '[object WeakMap]';

		var dataViewTag = '[object DataView]';

		/** Used to detect maps, sets, and weakmaps. */
		var dataViewCtorString = toSource(DataView),
		    mapCtorString = toSource(Map),
		    promiseCtorString = toSource(Promise),
		    setCtorString = toSource(Set),
		    weakMapCtorString = toSource(WeakMap);

		/**
		 * Gets the `toStringTag` of `value`.
		 *
		 * @private
		 * @param {*} value The value to query.
		 * @returns {string} Returns the `toStringTag`.
		 */
		var getTag = baseGetTag;

		// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
		if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
		    (Map && getTag(new Map) != mapTag) ||
		    (Promise && getTag(Promise.resolve()) != promiseTag) ||
		    (Set && getTag(new Set) != setTag) ||
		    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
		  getTag = function(value) {
		    var result = baseGetTag(value),
		        Ctor = result == objectTag ? value.constructor : undefined,
		        ctorString = Ctor ? toSource(Ctor) : '';

		    if (ctorString) {
		      switch (ctorString) {
		        case dataViewCtorString: return dataViewTag;
		        case mapCtorString: return mapTag;
		        case promiseCtorString: return promiseTag;
		        case setCtorString: return setTag;
		        case weakMapCtorString: return weakMapTag;
		      }
		    }
		    return result;
		  };
		}

		_getTag = getTag;
		return _getTag;
	}

	/** Used for built-in method references. */

	var _initCloneArray;
	var hasRequired_initCloneArray;

	function require_initCloneArray () {
		if (hasRequired_initCloneArray) return _initCloneArray;
		hasRequired_initCloneArray = 1;
		var objectProto = Object.prototype;

		/** Used to check objects for own properties. */
		var hasOwnProperty = objectProto.hasOwnProperty;

		/**
		 * Initializes an array clone.
		 *
		 * @private
		 * @param {Array} array The array to clone.
		 * @returns {Array} Returns the initialized clone.
		 */
		function initCloneArray(array) {
		  var length = array.length,
		      result = new array.constructor(length);

		  // Add properties assigned by `RegExp#exec`.
		  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		    result.index = array.index;
		    result.input = array.input;
		  }
		  return result;
		}

		_initCloneArray = initCloneArray;
		return _initCloneArray;
	}

	var _Uint8Array;
	var hasRequired_Uint8Array;

	function require_Uint8Array () {
		if (hasRequired_Uint8Array) return _Uint8Array;
		hasRequired_Uint8Array = 1;
		var root = require_root();

		/** Built-in value references. */
		var Uint8Array = root.Uint8Array;

		_Uint8Array = Uint8Array;
		return _Uint8Array;
	}

	var _cloneArrayBuffer;
	var hasRequired_cloneArrayBuffer;

	function require_cloneArrayBuffer () {
		if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
		hasRequired_cloneArrayBuffer = 1;
		var Uint8Array = require_Uint8Array();

		/**
		 * Creates a clone of `arrayBuffer`.
		 *
		 * @private
		 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
		 * @returns {ArrayBuffer} Returns the cloned array buffer.
		 */
		function cloneArrayBuffer(arrayBuffer) {
		  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		  return result;
		}

		_cloneArrayBuffer = cloneArrayBuffer;
		return _cloneArrayBuffer;
	}

	var _cloneDataView;
	var hasRequired_cloneDataView;

	function require_cloneDataView () {
		if (hasRequired_cloneDataView) return _cloneDataView;
		hasRequired_cloneDataView = 1;
		var cloneArrayBuffer = require_cloneArrayBuffer();

		/**
		 * Creates a clone of `dataView`.
		 *
		 * @private
		 * @param {Object} dataView The data view to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned data view.
		 */
		function cloneDataView(dataView, isDeep) {
		  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
		}

		_cloneDataView = cloneDataView;
		return _cloneDataView;
	}

	/** Used to match `RegExp` flags from their coerced string values. */

	var _cloneRegExp;
	var hasRequired_cloneRegExp;

	function require_cloneRegExp () {
		if (hasRequired_cloneRegExp) return _cloneRegExp;
		hasRequired_cloneRegExp = 1;
		var reFlags = /\w*$/;

		/**
		 * Creates a clone of `regexp`.
		 *
		 * @private
		 * @param {Object} regexp The regexp to clone.
		 * @returns {Object} Returns the cloned regexp.
		 */
		function cloneRegExp(regexp) {
		  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		  result.lastIndex = regexp.lastIndex;
		  return result;
		}

		_cloneRegExp = cloneRegExp;
		return _cloneRegExp;
	}

	var _cloneSymbol;
	var hasRequired_cloneSymbol;

	function require_cloneSymbol () {
		if (hasRequired_cloneSymbol) return _cloneSymbol;
		hasRequired_cloneSymbol = 1;
		var Symbol = require_Symbol();

		/** Used to convert symbols to primitives and strings. */
		var symbolProto = Symbol ? Symbol.prototype : undefined,
		    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

		/**
		 * Creates a clone of the `symbol` object.
		 *
		 * @private
		 * @param {Object} symbol The symbol object to clone.
		 * @returns {Object} Returns the cloned symbol object.
		 */
		function cloneSymbol(symbol) {
		  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
		}

		_cloneSymbol = cloneSymbol;
		return _cloneSymbol;
	}

	var _cloneTypedArray;
	var hasRequired_cloneTypedArray;

	function require_cloneTypedArray () {
		if (hasRequired_cloneTypedArray) return _cloneTypedArray;
		hasRequired_cloneTypedArray = 1;
		var cloneArrayBuffer = require_cloneArrayBuffer();

		/**
		 * Creates a clone of `typedArray`.
		 *
		 * @private
		 * @param {Object} typedArray The typed array to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the cloned typed array.
		 */
		function cloneTypedArray(typedArray, isDeep) {
		  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
		}

		_cloneTypedArray = cloneTypedArray;
		return _cloneTypedArray;
	}

	var _initCloneByTag;
	var hasRequired_initCloneByTag;

	function require_initCloneByTag () {
		if (hasRequired_initCloneByTag) return _initCloneByTag;
		hasRequired_initCloneByTag = 1;
		var cloneArrayBuffer = require_cloneArrayBuffer(),
		    cloneDataView = require_cloneDataView(),
		    cloneRegExp = require_cloneRegExp(),
		    cloneSymbol = require_cloneSymbol(),
		    cloneTypedArray = require_cloneTypedArray();

		/** `Object#toString` result references. */
		var boolTag = '[object Boolean]',
		    dateTag = '[object Date]',
		    mapTag = '[object Map]',
		    numberTag = '[object Number]',
		    regexpTag = '[object RegExp]',
		    setTag = '[object Set]',
		    stringTag = '[object String]',
		    symbolTag = '[object Symbol]';

		var arrayBufferTag = '[object ArrayBuffer]',
		    dataViewTag = '[object DataView]',
		    float32Tag = '[object Float32Array]',
		    float64Tag = '[object Float64Array]',
		    int8Tag = '[object Int8Array]',
		    int16Tag = '[object Int16Array]',
		    int32Tag = '[object Int32Array]',
		    uint8Tag = '[object Uint8Array]',
		    uint8ClampedTag = '[object Uint8ClampedArray]',
		    uint16Tag = '[object Uint16Array]',
		    uint32Tag = '[object Uint32Array]';

		/**
		 * Initializes an object clone based on its `toStringTag`.
		 *
		 * **Note:** This function only supports cloning values with tags of
		 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
		 *
		 * @private
		 * @param {Object} object The object to clone.
		 * @param {string} tag The `toStringTag` of the object to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Object} Returns the initialized clone.
		 */
		function initCloneByTag(object, tag, isDeep) {
		  var Ctor = object.constructor;
		  switch (tag) {
		    case arrayBufferTag:
		      return cloneArrayBuffer(object);

		    case boolTag:
		    case dateTag:
		      return new Ctor(+object);

		    case dataViewTag:
		      return cloneDataView(object, isDeep);

		    case float32Tag: case float64Tag:
		    case int8Tag: case int16Tag: case int32Tag:
		    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
		      return cloneTypedArray(object, isDeep);

		    case mapTag:
		      return new Ctor;

		    case numberTag:
		    case stringTag:
		      return new Ctor(object);

		    case regexpTag:
		      return cloneRegExp(object);

		    case setTag:
		      return new Ctor;

		    case symbolTag:
		      return cloneSymbol(object);
		  }
		}

		_initCloneByTag = initCloneByTag;
		return _initCloneByTag;
	}

	var _baseCreate;
	var hasRequired_baseCreate;

	function require_baseCreate () {
		if (hasRequired_baseCreate) return _baseCreate;
		hasRequired_baseCreate = 1;
		var isObject = requireIsObject();

		/** Built-in value references. */
		var objectCreate = Object.create;

		/**
		 * The base implementation of `_.create` without support for assigning
		 * properties to the created object.
		 *
		 * @private
		 * @param {Object} proto The object to inherit from.
		 * @returns {Object} Returns the new object.
		 */
		var baseCreate = (function() {
		  function object() {}
		  return function(proto) {
		    if (!isObject(proto)) {
		      return {};
		    }
		    if (objectCreate) {
		      return objectCreate(proto);
		    }
		    object.prototype = proto;
		    var result = new object;
		    object.prototype = undefined;
		    return result;
		  };
		}());

		_baseCreate = baseCreate;
		return _baseCreate;
	}

	var _initCloneObject;
	var hasRequired_initCloneObject;

	function require_initCloneObject () {
		if (hasRequired_initCloneObject) return _initCloneObject;
		hasRequired_initCloneObject = 1;
		var baseCreate = require_baseCreate(),
		    getPrototype = require_getPrototype(),
		    isPrototype = require_isPrototype();

		/**
		 * Initializes an object clone.
		 *
		 * @private
		 * @param {Object} object The object to clone.
		 * @returns {Object} Returns the initialized clone.
		 */
		function initCloneObject(object) {
		  return (typeof object.constructor == 'function' && !isPrototype(object))
		    ? baseCreate(getPrototype(object))
		    : {};
		}

		_initCloneObject = initCloneObject;
		return _initCloneObject;
	}

	var _baseIsMap;
	var hasRequired_baseIsMap;

	function require_baseIsMap () {
		if (hasRequired_baseIsMap) return _baseIsMap;
		hasRequired_baseIsMap = 1;
		var getTag = require_getTag(),
		    isObjectLike = requireIsObjectLike();

		/** `Object#toString` result references. */
		var mapTag = '[object Map]';

		/**
		 * The base implementation of `_.isMap` without Node.js optimizations.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		 */
		function baseIsMap(value) {
		  return isObjectLike(value) && getTag(value) == mapTag;
		}

		_baseIsMap = baseIsMap;
		return _baseIsMap;
	}

	var isMap_1;
	var hasRequiredIsMap;

	function requireIsMap () {
		if (hasRequiredIsMap) return isMap_1;
		hasRequiredIsMap = 1;
		var baseIsMap = require_baseIsMap(),
		    baseUnary = require_baseUnary(),
		    nodeUtil = require_nodeUtil();

		/* Node.js helper references. */
		var nodeIsMap = nodeUtil && nodeUtil.isMap;

		/**
		 * Checks if `value` is classified as a `Map` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.3.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		 * @example
		 *
		 * _.isMap(new Map);
		 * // => true
		 *
		 * _.isMap(new WeakMap);
		 * // => false
		 */
		var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

		isMap_1 = isMap;
		return isMap_1;
	}

	var _baseIsSet;
	var hasRequired_baseIsSet;

	function require_baseIsSet () {
		if (hasRequired_baseIsSet) return _baseIsSet;
		hasRequired_baseIsSet = 1;
		var getTag = require_getTag(),
		    isObjectLike = requireIsObjectLike();

		/** `Object#toString` result references. */
		var setTag = '[object Set]';

		/**
		 * The base implementation of `_.isSet` without Node.js optimizations.
		 *
		 * @private
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		 */
		function baseIsSet(value) {
		  return isObjectLike(value) && getTag(value) == setTag;
		}

		_baseIsSet = baseIsSet;
		return _baseIsSet;
	}

	var isSet_1;
	var hasRequiredIsSet;

	function requireIsSet () {
		if (hasRequiredIsSet) return isSet_1;
		hasRequiredIsSet = 1;
		var baseIsSet = require_baseIsSet(),
		    baseUnary = require_baseUnary(),
		    nodeUtil = require_nodeUtil();

		/* Node.js helper references. */
		var nodeIsSet = nodeUtil && nodeUtil.isSet;

		/**
		 * Checks if `value` is classified as a `Set` object.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.3.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		 * @example
		 *
		 * _.isSet(new Set);
		 * // => true
		 *
		 * _.isSet(new WeakSet);
		 * // => false
		 */
		var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

		isSet_1 = isSet;
		return isSet_1;
	}

	var _baseClone;
	var hasRequired_baseClone;

	function require_baseClone () {
		if (hasRequired_baseClone) return _baseClone;
		hasRequired_baseClone = 1;
		var Stack = require_Stack(),
		    arrayEach = require_arrayEach(),
		    assignValue = require_assignValue(),
		    baseAssign = require_baseAssign(),
		    baseAssignIn = require_baseAssignIn(),
		    cloneBuffer = require_cloneBuffer(),
		    copyArray = require_copyArray(),
		    copySymbols = require_copySymbols(),
		    copySymbolsIn = require_copySymbolsIn(),
		    getAllKeys = require_getAllKeys(),
		    getAllKeysIn = require_getAllKeysIn(),
		    getTag = require_getTag(),
		    initCloneArray = require_initCloneArray(),
		    initCloneByTag = require_initCloneByTag(),
		    initCloneObject = require_initCloneObject(),
		    isArray = requireIsArray(),
		    isBuffer = requireIsBuffer(),
		    isMap = requireIsMap(),
		    isObject = requireIsObject(),
		    isSet = requireIsSet(),
		    keys = requireKeys(),
		    keysIn = requireKeysIn();

		/** Used to compose bitmasks for cloning. */
		var CLONE_DEEP_FLAG = 1,
		    CLONE_FLAT_FLAG = 2,
		    CLONE_SYMBOLS_FLAG = 4;

		/** `Object#toString` result references. */
		var argsTag = '[object Arguments]',
		    arrayTag = '[object Array]',
		    boolTag = '[object Boolean]',
		    dateTag = '[object Date]',
		    errorTag = '[object Error]',
		    funcTag = '[object Function]',
		    genTag = '[object GeneratorFunction]',
		    mapTag = '[object Map]',
		    numberTag = '[object Number]',
		    objectTag = '[object Object]',
		    regexpTag = '[object RegExp]',
		    setTag = '[object Set]',
		    stringTag = '[object String]',
		    symbolTag = '[object Symbol]',
		    weakMapTag = '[object WeakMap]';

		var arrayBufferTag = '[object ArrayBuffer]',
		    dataViewTag = '[object DataView]',
		    float32Tag = '[object Float32Array]',
		    float64Tag = '[object Float64Array]',
		    int8Tag = '[object Int8Array]',
		    int16Tag = '[object Int16Array]',
		    int32Tag = '[object Int32Array]',
		    uint8Tag = '[object Uint8Array]',
		    uint8ClampedTag = '[object Uint8ClampedArray]',
		    uint16Tag = '[object Uint16Array]',
		    uint32Tag = '[object Uint32Array]';

		/** Used to identify `toStringTag` values supported by `_.clone`. */
		var cloneableTags = {};
		cloneableTags[argsTag] = cloneableTags[arrayTag] =
		cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
		cloneableTags[boolTag] = cloneableTags[dateTag] =
		cloneableTags[float32Tag] = cloneableTags[float64Tag] =
		cloneableTags[int8Tag] = cloneableTags[int16Tag] =
		cloneableTags[int32Tag] = cloneableTags[mapTag] =
		cloneableTags[numberTag] = cloneableTags[objectTag] =
		cloneableTags[regexpTag] = cloneableTags[setTag] =
		cloneableTags[stringTag] = cloneableTags[symbolTag] =
		cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
		cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		cloneableTags[errorTag] = cloneableTags[funcTag] =
		cloneableTags[weakMapTag] = false;

		/**
		 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
		 * traversed objects.
		 *
		 * @private
		 * @param {*} value The value to clone.
		 * @param {boolean} bitmask The bitmask flags.
		 *  1 - Deep clone
		 *  2 - Flatten inherited properties
		 *  4 - Clone symbols
		 * @param {Function} [customizer] The function to customize cloning.
		 * @param {string} [key] The key of `value`.
		 * @param {Object} [object] The parent object of `value`.
		 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
		 * @returns {*} Returns the cloned value.
		 */
		function baseClone(value, bitmask, customizer, key, object, stack) {
		  var result,
		      isDeep = bitmask & CLONE_DEEP_FLAG,
		      isFlat = bitmask & CLONE_FLAT_FLAG,
		      isFull = bitmask & CLONE_SYMBOLS_FLAG;

		  if (customizer) {
		    result = object ? customizer(value, key, object, stack) : customizer(value);
		  }
		  if (result !== undefined) {
		    return result;
		  }
		  if (!isObject(value)) {
		    return value;
		  }
		  var isArr = isArray(value);
		  if (isArr) {
		    result = initCloneArray(value);
		    if (!isDeep) {
		      return copyArray(value, result);
		    }
		  } else {
		    var tag = getTag(value),
		        isFunc = tag == funcTag || tag == genTag;

		    if (isBuffer(value)) {
		      return cloneBuffer(value, isDeep);
		    }
		    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
		      result = (isFlat || isFunc) ? {} : initCloneObject(value);
		      if (!isDeep) {
		        return isFlat
		          ? copySymbolsIn(value, baseAssignIn(result, value))
		          : copySymbols(value, baseAssign(result, value));
		      }
		    } else {
		      if (!cloneableTags[tag]) {
		        return object ? value : {};
		      }
		      result = initCloneByTag(value, tag, isDeep);
		    }
		  }
		  // Check for circular references and return its corresponding clone.
		  stack || (stack = new Stack);
		  var stacked = stack.get(value);
		  if (stacked) {
		    return stacked;
		  }
		  stack.set(value, result);

		  if (isSet(value)) {
		    value.forEach(function(subValue) {
		      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
		    });
		  } else if (isMap(value)) {
		    value.forEach(function(subValue, key) {
		      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
		    });
		  }

		  var keysFunc = isFull
		    ? (isFlat ? getAllKeysIn : getAllKeys)
		    : (isFlat ? keysIn : keys);

		  var props = isArr ? undefined : keysFunc(value);
		  arrayEach(props || value, function(subValue, key) {
		    if (props) {
		      key = subValue;
		      subValue = value[key];
		    }
		    // Recursively populate clone (susceptible to call stack limits).
		    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
		  });
		  return result;
		}

		_baseClone = baseClone;
		return _baseClone;
	}

	var cloneDeep_1;
	var hasRequiredCloneDeep;

	function requireCloneDeep () {
		if (hasRequiredCloneDeep) return cloneDeep_1;
		hasRequiredCloneDeep = 1;
		var baseClone = require_baseClone();

		/** Used to compose bitmasks for cloning. */
		var CLONE_DEEP_FLAG = 1,
		    CLONE_SYMBOLS_FLAG = 4;

		/**
		 * This method is like `_.clone` except that it recursively clones `value`.
		 *
		 * @static
		 * @memberOf _
		 * @since 1.0.0
		 * @category Lang
		 * @param {*} value The value to recursively clone.
		 * @returns {*} Returns the deep cloned value.
		 * @see _.clone
		 * @example
		 *
		 * var objects = [{ 'a': 1 }, { 'b': 2 }];
		 *
		 * var deep = _.cloneDeep(objects);
		 * console.log(deep[0] === objects[0]);
		 * // => false
		 */
		function cloneDeep(value) {
		  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
		}

		cloneDeep_1 = cloneDeep;
		return cloneDeep_1;
	}

	var hasRequiredIndex_production;

	function requireIndex_production () {
		if (hasRequiredIndex_production) return index_production$1;
		hasRequiredIndex_production = 1;
		(function (exports) {

			var reactShared = requireReactShared();
			var ErrorStackParser = requireErrorStackParser();
			var cloneDeep = requireCloneDeep();

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

			// https://github.com/facebook/react/blob/main/packages/react-debug-tools/src/ReactDebugHooks.js
			/* eslint-disable @typescript-eslint/no-unused-vars */
			/* eslint-disable max-lines */
			/* eslint-disable @typescript-eslint/ban-ts-comment */
			var hookLog = [];
			var primitiveStackCache = null;
			function getPrimitiveStackCache() {
			    var _a, _b;
			    // This initializes a cache of all primitive hooks so that the top
			    // most stack frames added by calling the primitive hook can be removed.
			    if (primitiveStackCache === null) {
			        var cache = new Map();
			        var readHookLog = void 0;
			        try {
			            // Use all hooks here to add them to the hook log.
			            Dispatcher.useContext((_a = {}, _a[reactShared.TYPEKEY] = reactShared.Context, _a.Provider = { value: null }, _a));
			            Dispatcher.useState(null);
			            Dispatcher.useReducer(function (s, a) { return s; }, null);
			            Dispatcher.useRef(null);
			            Dispatcher.useLayoutEffect(function () { });
			            Dispatcher.useInsertionEffect(function () { });
			            Dispatcher.useEffect(function () { });
			            Dispatcher.useImperativeHandle(undefined, function () { return null; });
			            Dispatcher.useDebugValue(null, function () { });
			            Dispatcher.useCallback(function () { });
			            Dispatcher.useTransition();
			            Dispatcher.useSyncExternalStore(function () { return function () { }; }, function () { return null; }, function () { return null; });
			            Dispatcher.useDeferredValue(null);
			            Dispatcher.useMemo(function () { return null; });
			            if (typeof Dispatcher.use === "function") {
			                Dispatcher.use((_b = {}, _b[reactShared.TYPEKEY] = reactShared.Context, _b.Provider = { value: null }, _b));
			                Dispatcher.use({
			                    then: function () { },
			                    state: "fulfilled",
			                    value: null,
			                });
			                try {
			                    Dispatcher.use({
			                        then: function () { },
			                    });
			                }
			                catch (x) {
			                    void 0;
			                }
			            }
			            Dispatcher.useSignal(null);
			            Dispatcher.useId();
			        }
			        finally {
			            readHookLog = hookLog;
			            hookLog = [];
			        }
			        for (var i = 0; i < readHookLog.length; i++) {
			            var hook = readHookLog[i];
			            cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
			        }
			        primitiveStackCache = cache;
			    }
			    return primitiveStackCache;
			}
			var currentFiber = null;
			var currentHookNode = null;
			function nextHook() {
			    var hook = currentHookNode;
			    if (hook !== null) {
			        currentHookNode = currentHookNode.next;
			    }
			    return hook === null || hook === void 0 ? void 0 : hook.value;
			}
			var defaultGetContextFiber = function (fiber, ContextObject) {
			    if ((fiber === null || fiber === void 0 ? void 0 : fiber.parent) && ContextObject) {
			        var parent_1 = fiber.parent;
			        while (parent_1) {
			            if (reactShared.include(parent_1.type, exports.NODE_TYPE.__provider__)) {
			                var typedElementType = parent_1.elementType;
			                var contextObj = typedElementType["Context"];
			                if (contextObj === ContextObject) {
			                    return parent_1;
			                }
			            }
			            if (reactShared.include(parent_1.type, exports.NODE_TYPE.__context__)) {
			                var typedElementType = parent_1.elementType;
			                var contextObj = typedElementType;
			                if (contextObj === ContextObject) {
			                    return parent_1;
			                }
			            }
			            parent_1 = parent_1.parent;
			        }
			    }
			    else {
			        return null;
			    }
			};
			var defaultGetContextValue = function (fiber, ContextObject) {
			    if (fiber) {
			        return fiber.pendingProps["value"];
			    }
			    else {
			        return ContextObject === null || ContextObject === void 0 ? void 0 : ContextObject.Provider["value"];
			    }
			};
			function readContext(context) {
			    if (currentFiber === null) {
			        return context.Provider.value;
			    }
			    else {
			        var fiber = defaultGetContextFiber(currentFiber, context);
			        var value = defaultGetContextValue(fiber, context);
			        return value;
			    }
			}
			var SuspenseException = new Error("Suspense Exception: This is not a real error! It's an implementation " +
			    "detail of `use` to interrupt the current render. You must either " +
			    "rethrow it immediately, or move the `use` call outside of the " +
			    "`try/catch` block. Capturing without rethrowing will lead to " +
			    "unexpected behavior.\n\n" +
			    "To handle async errors, wrap your component in an error boundary, or " +
			    "call the promise's `.catch` method and pass the result to `use`.");
			function use(usable) {
			    if (usable !== null && typeof usable === "object") {
			        if (typeof usable.then === "function") {
			            var thenable = usable;
			            switch (thenable.state) {
			                case "fulfilled": {
			                    var fulfilledValue = thenable.value;
			                    hookLog.push({
			                        displayName: null,
			                        primitive: "Promise",
			                        stackError: new Error(),
			                        value: fulfilledValue,
			                        dispatcherHookName: "Use",
			                    });
			                    return fulfilledValue;
			                }
			                case "rejected": {
			                    var rejectedError = thenable.reason;
			                    throw rejectedError;
			                }
			            }
			            // If this was an uncached Promise we have to abandon this attempt
			            // but we can still emit anything up until this point.
			            hookLog.push({
			                displayName: null,
			                primitive: "Unresolved",
			                stackError: new Error(),
			                value: thenable,
			                dispatcherHookName: "Use",
			            });
			            throw SuspenseException;
			        }
			        else if (usable[reactShared.TYPEKEY] === reactShared.Context) {
			            var context = usable;
			            var value = readContext(context);
			            hookLog.push({
			                displayName: context.displayName || "Context",
			                primitive: "Context (use)",
			                stackError: new Error(),
			                value: value,
			                dispatcherHookName: "Use",
			            });
			            return value;
			        }
			    }
			    throw new Error("An unsupported type was passed to use(): " + String(usable));
			}
			function useContext(context) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useContext) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var value = readContext(context);
			    hookLog.push({
			        displayName: context.displayName || null,
			        primitive: "Context",
			        stackError: new Error(),
			        value: value,
			        dispatcherHookName: "Context",
			    });
			    return value;
			}
			function useState(initialState) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useState) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var typedInitialState = initialState;
			    var state = hook ? hook.result : typeof initialState === "function" ? typedInitialState() : initialState;
			    hookLog.push({
			        displayName: null,
			        primitive: "State",
			        stackError: new Error(),
			        value: state,
			        dispatcherHookName: "State",
			    });
			    return [state, function (action) { }];
			}
			function useReducer(reducer, initialArg, init) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useReducer) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var state = hook ? hook.result : init !== undefined ? init(initialArg) : initialArg;
			    hookLog.push({
			        displayName: null,
			        primitive: "Reducer",
			        stackError: new Error(),
			        value: state,
			        dispatcherHookName: "Reducer",
			    });
			    return [state, function (action) { }];
			}
			function useRef(initialValue) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useRef) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var ref = hook ? hook.result : { current: initialValue };
			    hookLog.push({
			        displayName: null,
			        primitive: "Ref",
			        stackError: new Error(),
			        value: ref,
			        dispatcherHookName: "Ref",
			    });
			    return ref;
			}
			function useLayoutEffect(create, inputs) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useLayoutEffect) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    hookLog.push({
			        displayName: null,
			        primitive: "LayoutEffect",
			        stackError: new Error(),
			        value: create,
			        dispatcherHookName: "LayoutEffect",
			    });
			}
			function useInsertionEffect(create, inputs) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useInsertionEffect) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    hookLog.push({
			        displayName: null,
			        primitive: "InsertionEffect",
			        stackError: new Error(),
			        value: create,
			        dispatcherHookName: "InsertionEffect",
			    });
			}
			function useEffect(create, deps) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useEffect) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    hookLog.push({
			        displayName: null,
			        primitive: "Effect",
			        stackError: new Error(),
			        value: create,
			        dispatcherHookName: "Effect",
			    });
			}
			function useImperativeHandle(ref, create, inputs) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useImperativeHandle) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    // We don't actually store the instance anywhere if there is no ref callback
			    // and if there is a ref callback it might not store it but if it does we
			    // have no way of knowing where. So let's only enable introspection of the
			    // ref itself if it is using the object form.
			    var instance = undefined;
			    if (ref !== null && typeof ref === "object") {
			        instance = ref.current;
			    }
			    hookLog.push({
			        displayName: null,
			        primitive: "ImperativeHandle",
			        stackError: new Error(),
			        value: instance,
			        dispatcherHookName: "ImperativeHandle",
			    });
			}
			function useDebugValue(value, formatterFn) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useDebugValue) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    hookLog.push({
			        displayName: null,
			        primitive: "DebugValue",
			        stackError: new Error(),
			        value: typeof formatterFn === "function" ? formatterFn(value) : value,
			        dispatcherHookName: "DebugValue",
			    });
			}
			function useCallback(callback, inputs) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useCallback) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var value = hook ? hook.result : callback;
			    hookLog.push({
			        displayName: null,
			        primitive: "Callback",
			        stackError: new Error(),
			        value: value,
			        dispatcherHookName: "Callback",
			    });
			    return value;
			}
			function useMemo(nextCreate, inputs) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useMemo) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var value = hook ? hook.result : nextCreate();
			    hookLog.push({
			        displayName: null,
			        primitive: "Memo",
			        stackError: new Error(),
			        value: value,
			        dispatcherHookName: "Memo",
			    });
			    return value;
			}
			function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useSyncExternalStore) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var value = getSnapshot();
			    hookLog.push({
			        displayName: null,
			        primitive: "SyncExternalStore",
			        stackError: new Error(),
			        value: value,
			        dispatcherHookName: "SyncExternalStore",
			    });
			    return value;
			}
			function useTransition() {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useTransition) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var isPending = hook ? hook.result[0] : false;
			    hookLog.push({
			        displayName: null,
			        primitive: "Transition",
			        stackError: new Error(),
			        value: isPending,
			        dispatcherHookName: "Transition",
			    });
			    return [isPending, function () { }];
			}
			function useDeferredValue(value, initialValue) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useDeferredValue) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var prevValue = hook ? hook.result : value;
			    hookLog.push({
			        displayName: null,
			        primitive: "DeferredValue",
			        stackError: new Error(),
			        value: prevValue,
			        dispatcherHookName: "DeferredValue",
			    });
			    return prevValue;
			}
			function useId() {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useId) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var id = hook ? hook.result : "";
			    hookLog.push({
			        displayName: null,
			        primitive: "Id",
			        stackError: new Error(),
			        value: id,
			        dispatcherHookName: "Id",
			    });
			    return id;
			}
			function useSignal(initial) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useSignal) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var value = hook ? hook.result.getValue : typeof initial === "function" ? initial : function () { return initial; };
			    hookLog.push({
			        displayName: null,
			        primitive: "Signal",
			        stackError: new Error(),
			        value: value(),
			        dispatcherHookName: "Signal",
			    });
			    return [value, function () { }];
			}
			var Dispatcher = {
			    readContext: readContext,
			    use: use,
			    useCallback: useCallback,
			    useContext: useContext,
			    useEffect: useEffect,
			    useImperativeHandle: useImperativeHandle,
			    useLayoutEffect: useLayoutEffect,
			    useInsertionEffect: useInsertionEffect,
			    useMemo: useMemo,
			    useReducer: useReducer,
			    useRef: useRef,
			    useState: useState,
			    useDebugValue: useDebugValue,
			    useDeferredValue: useDeferredValue,
			    useTransition: useTransition,
			    useSyncExternalStore: useSyncExternalStore,
			    useId: useId,
			    useSignal: useSignal,
			};
			// create a proxy to throw a custom error
			// in case future versions of React adds more hooks
			var DispatcherProxyHandler = {
			    get: function (target, prop) {
			        if (Object.prototype.hasOwnProperty.call(target, prop)) {
			            return target[prop];
			        }
			        var error = new Error("Missing method in Dispatcher: " + prop);
			        // Note: This error name needs to stay in sync with react-devtools-shared
			        // TODO: refactor this if we ever combine the devtools and debug tools packages
			        error.name = "ReactDebugToolsUnsupportedHookError";
			        throw error;
			    },
			};
			// `Proxy` may not exist on some platforms
			var DispatcherProxy = typeof Proxy === "undefined" ? Dispatcher : new Proxy(Dispatcher, DispatcherProxyHandler);
			// Don't assume
			//
			// We can't assume that stack frames are nth steps away from anything.
			// E.g. we can't assume that the root call shares all frames with the stack
			// of a hook call. A simple way to demonstrate this is wrapping `new Error()`
			// in a wrapper constructor like a polyfill. That'll add an extra frame.
			// Similar things can happen with the call to the dispatcher. The top frame
			// may not be the primitive.
			//
			// We also can't assume that the last frame of the root call is the same
			// frame as the last frame of the hook call because long stack traces can be
			// truncated to a stack trace limit.
			var mostLikelyAncestorIndex = 0;
			function findSharedIndex(hookStack, rootStack, rootIndex) {
			    var source = rootStack[rootIndex].source;
			    hookSearch: for (var i = 0; i < hookStack.length; i++) {
			        if (hookStack[i].source === source) {
			            // This looks like a match. Validate that the rest of both stack match up.
			            for (var a = rootIndex + 1, b = i + 1; a < rootStack.length && b < hookStack.length; a++, b++) {
			                if (hookStack[b].source !== rootStack[a].source) {
			                    // If not, give up and try a different match.
			                    continue hookSearch;
			                }
			            }
			            return i;
			        }
			    }
			    return -1;
			}
			function findCommonAncestorIndex(rootStack, hookStack) {
			    var rootIndex = findSharedIndex(hookStack, rootStack, mostLikelyAncestorIndex);
			    if (rootIndex !== -1) {
			        return rootIndex;
			    }
			    // If the most likely one wasn't a hit, try any other frame to see if it is shared.
			    // If that takes more than 5 frames, something probably went wrong.
			    for (var i = 0; i < rootStack.length && i < 5; i++) {
			        rootIndex = findSharedIndex(hookStack, rootStack, i);
			        if (rootIndex !== -1) {
			            mostLikelyAncestorIndex = i;
			            return rootIndex;
			        }
			    }
			    return -1;
			}
			function isReactWrapper(functionName, wrapperName) {
			    var hookName = parseHookName(functionName);
			    if (wrapperName === "HostTransitionStatus") {
			        return hookName === wrapperName || hookName === "FormStatus";
			    }
			    return hookName === wrapperName;
			}
			function findPrimitiveIndex(hookStack, hook) {
			    var stackCache = getPrimitiveStackCache();
			    var primitiveStack = stackCache.get(hook.primitive);
			    if (primitiveStack === undefined) {
			        return -1;
			    }
			    for (var i = 0; i < primitiveStack.length && i < hookStack.length; i++) {
			        // Note: there is no guarantee that we will find the top-most primitive frame in the stack
			        // For React Native (uses Hermes), these source fields will be identical and skipped
			        if (primitiveStack[i].source !== hookStack[i].source) {
			            // If the next two frames are functions called `useX` then we assume that they're part of the
			            // wrappers that the React package or other packages adds around the dispatcher.
			            if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.dispatcherHookName)) {
			                i++;
			            }
			            if (i < hookStack.length - 1 && isReactWrapper(hookStack[i].functionName, hook.dispatcherHookName)) {
			                i++;
			            }
			            return i;
			        }
			    }
			    return -1;
			}
			function parseTrimmedStack(rootStack, hook) {
			    // Get the stack trace between the primitive hook function and
			    // the root function call. I.e. the stack frames of custom hooks.
			    var hookStack = ErrorStackParser.parse(hook.stackError);
			    var rootIndex = findCommonAncestorIndex(rootStack, hookStack);
			    var primitiveIndex = findPrimitiveIndex(hookStack, hook);
			    if (rootIndex === -1 || primitiveIndex === -1 || rootIndex - primitiveIndex < 2) {
			        if (primitiveIndex === -1) {
			            // Something went wrong. Give up.
			            return [null, null];
			        }
			        else {
			            return [hookStack[primitiveIndex - 1], null];
			        }
			    }
			    return [hookStack[primitiveIndex - 1], hookStack.slice(primitiveIndex, rootIndex - 1)];
			}
			function parseHookName(functionName) {
			    if (!functionName) {
			        return "";
			    }
			    var startIndex = functionName.lastIndexOf("[as ");
			    if (startIndex !== -1) {
			        // Workaround for sourcemaps in Jest and Chrome.
			        // In `node --enable-source-maps`, we don't see "Object.useHostTransitionStatus [as useFormStatus]" but "Object.useFormStatus"
			        // "Object.useHostTransitionStatus [as useFormStatus]" -> "useFormStatus"
			        return parseHookName(functionName.slice(startIndex + "[as ".length, -1));
			    }
			    startIndex = functionName.lastIndexOf(".");
			    if (startIndex === -1) {
			        startIndex = 0;
			    }
			    else {
			        startIndex += 1;
			    }
			    if (functionName.slice(startIndex).startsWith("unstable_")) {
			        startIndex += "unstable_".length;
			    }
			    if (functionName.slice(startIndex).startsWith("experimental_")) {
			        startIndex += "experimental_".length;
			    }
			    if (functionName.slice(startIndex, startIndex + 3) === "use") {
			        if (functionName.length - startIndex === 3) {
			            return "Use";
			        }
			        startIndex += 3;
			    }
			    return functionName.slice(startIndex);
			}
			function buildTree(rootStack, readHookLog) {
			    var rootChildren = [];
			    var prevStack = null;
			    var levelChildren = rootChildren;
			    var nativeHookID = 0;
			    var stackOfChildren = [];
			    for (var i = 0; i < readHookLog.length; i++) {
			        var hook = readHookLog[i];
			        var parseResult = parseTrimmedStack(rootStack, hook);
			        var primitiveFrame = parseResult[0];
			        var stack = parseResult[1];
			        var displayName = hook.displayName;
			        if (displayName === null && primitiveFrame !== null) {
			            displayName =
			                // @ts-ignore
			                parseHookName(primitiveFrame === null || primitiveFrame === void 0 ? void 0 : primitiveFrame.functionName) ||
			                    // Older versions of React do not have sourcemaps.
			                    // In those versions there was always a 1:1 mapping between wrapper and dispatcher method.
			                    parseHookName(hook.dispatcherHookName);
			        }
			        if (stack !== null) {
			            stack = Array.isArray(stack) ? stack : [stack];
			            // Note: The indices 0 <= n < length-1 will contain the names.
			            // The indices 1 <= n < length will contain the source locations.
			            // That's why we get the name from n - 1 and don't check the source
			            // of index 0.
			            var commonSteps = 0;
			            if (prevStack !== null) {
			                // Compare the current level's stack to the new stack.
			                while (commonSteps < stack.length && commonSteps < prevStack.length) {
			                    var stackSource = stack[stack.length - commonSteps - 1].source;
			                    var prevSource = prevStack[prevStack.length - commonSteps - 1].source;
			                    if (stackSource !== prevSource) {
			                        break;
			                    }
			                    commonSteps++;
			                }
			                // Pop back the stack as many steps as were not common.
			                for (var j = prevStack.length - 1; j > commonSteps; j--) {
			                    // $FlowFixMe[incompatible-type]
			                    levelChildren = stackOfChildren.pop();
			                }
			            }
			            // The remaining part of the new stack are custom hooks. Push them
			            // to the tree.
			            for (var j = stack.length - commonSteps - 1; j >= 1; j--) {
			                var children = [];
			                var stackFrame = stack[j];
			                var levelChild_1 = {
			                    id: null,
			                    isStateEditable: false,
			                    name: parseHookName(stack[j - 1].functionName),
			                    value: undefined,
			                    subHooks: children,
			                    hookSource: {
			                        lineNumber: stackFrame.lineNumber,
			                        columnNumber: stackFrame.columnNumber,
			                        functionName: stackFrame.functionName,
			                        fileName: stackFrame.fileName,
			                    },
			                };
			                levelChildren.push(levelChild_1);
			                stackOfChildren.push(levelChildren);
			                levelChildren = children;
			            }
			            prevStack = stack;
			        }
			        var primitive = hook.primitive;
			        var id = nativeHookID++;
			        // For the time being, only State and Reducer hooks support runtime overrides.
			        var isStateEditable = primitive === "Reducer" || primitive === "State";
			        var name_1 = displayName || primitive;
			        var levelChild = {
			            id: id,
			            isStateEditable: isStateEditable,
			            name: name_1,
			            value: hook.value,
			            subHooks: [],
			            hookSource: null,
			        };
			        var hookSource = {
			            lineNumber: null,
			            functionName: null,
			            fileName: null,
			            columnNumber: null,
			        };
			        if (stack && Array.isArray(stack) && stack.length >= 1) {
			            var stackFrame = stack[0];
			            hookSource.lineNumber = stackFrame.lineNumber;
			            hookSource.functionName = stackFrame.functionName;
			            hookSource.fileName = stackFrame.fileName;
			            hookSource.columnNumber = stackFrame.columnNumber;
			        }
			        levelChild.hookSource = hookSource;
			        levelChildren.push(levelChild);
			    }
			    // Associate custom hook values (useDebugValue() hook entries) with the correct hooks.
			    processDebugValues(rootChildren, null);
			    return rootChildren;
			}
			// Custom hooks support user-configurable labels (via the special useDebugValue() hook).
			// That hook adds user-provided values to the hooks tree,
			// but these values aren't intended to appear alongside of the other hooks.
			// Instead they should be attributed to their parent custom hook.
			// This method walks the tree and assigns debug values to their custom hook owners.
			function processDebugValues(hooksTree, parentHooksNode) {
			    var debugValueHooksNodes = [];
			    for (var i = 0; i < hooksTree.length; i++) {
			        var hooksNode = hooksTree[i];
			        if (hooksNode.name === "DebugValue" && hooksNode.subHooks.length === 0) {
			            hooksTree.splice(i, 1);
			            i--;
			            debugValueHooksNodes.push(hooksNode);
			        }
			        else {
			            processDebugValues(hooksNode.subHooks, hooksNode);
			        }
			    }
			    // Bubble debug value labels to their custom hook owner.
			    // If there is no parent hook, just ignore them for now.
			    // (We may warn about this in the future.)
			    if (parentHooksNode !== null) {
			        if (debugValueHooksNodes.length === 1) {
			            parentHooksNode.value = debugValueHooksNodes[0].value;
			        }
			        else if (debugValueHooksNodes.length > 1) {
			            parentHooksNode.value = debugValueHooksNodes.map(function (_a) {
			                var value = _a.value;
			                return value;
			            });
			        }
			    }
			}
			function handleRenderFunctionError(error) {
			    // original error might be any type.
			    if (error === SuspenseException) {
			        // An uncached Promise was used. We can't synchronously resolve the rest of
			        // the Hooks but we can at least show what ever we got so far.
			        return;
			    }
			    if (reactShared.isPromise(error)) {
			        return;
			    }
			    if (error instanceof Error && error.name === "ReactDebugToolsUnsupportedHookError") {
			        throw error;
			    }
			    // If the error is not caused by an unsupported feature, it means
			    // that the error is caused by user's code in renderFunction.
			    // In this case, we should wrap the original error inside a custom error
			    // so that devtools can give a clear message about it.
			    // @ts-ignore
			    var wrapperError = new Error("Error rendering inspected component", {
			        cause: error,
			    });
			    // Note: This error name needs to stay in sync with react-devtools-shared
			    // TODO: refactor this if we ever combine the devtools and debug tools packages
			    wrapperError.name = "ReactDebugToolsRenderError";
			    // this stage-4 proposal is not supported by all environments yet.
			    // @ts-ignore
			    wrapperError.cause = error;
			    throw wrapperError;
			}
			function inspectHooks(renderFunction, props, currentDispatcher) {
			    // DevTools will pass the current renderer's injected dispatcher.
			    // Other apps might compile debug hooks as part of their app though.
			    currentDispatcher.current.proxy = DispatcherProxy;
			    var readHookLog;
			    var ancestorStackError;
			    try {
			        ancestorStackError = new Error();
			        renderFunction(props);
			    }
			    catch (error) {
			        handleRenderFunctionError(error);
			    }
			    finally {
			        readHookLog = hookLog;
			        hookLog = [];
			        currentDispatcher.current.proxy = null;
			    }
			    var rootStack = ErrorStackParser.parse(ancestorStackError);
			    return buildTree(rootStack, readHookLog);
			}
			function inspectHooksOfForwardRef(renderFunction, props, ref, currentDispatcher) {
			    currentDispatcher.current.proxy = DispatcherProxy;
			    var readHookLog;
			    var ancestorStackError;
			    try {
			        ancestorStackError = new Error();
			        renderFunction(props, ref);
			    }
			    catch (error) {
			        handleRenderFunctionError(error);
			    }
			    finally {
			        readHookLog = hookLog;
			        hookLog = [];
			        currentDispatcher.current.proxy = null;
			    }
			    var rootStack = ErrorStackParser.parse(ancestorStackError);
			    return buildTree(rootStack, readHookLog);
			}
			function inspectHooksOfFiber(fiber, dispatch) {
			    if (!reactShared.include(fiber.type, exports.NODE_TYPE.__function__)) {
			        return;
			    }
			    // Warm up the cache so that it doesn't consume the currentHook.
			    getPrimitiveStackCache();
			    // Set up the current hook so that we can step through and read the
			    // current state from them.
			    currentHookNode = fiber.hookList.head;
			    currentFiber = fiber;
			    var typedElementType = fiber.elementType;
			    var props = fiber.memoizedProps;
			    try {
			        if (reactShared.include(fiber.type, exports.NODE_TYPE.__forwardRef__)) {
			            return inspectHooksOfForwardRef(typedElementType, props, fiber.ref, dispatch);
			        }
			        else {
			            return inspectHooks(typedElementType, props, dispatch);
			        }
			    }
			    finally {
			        currentHookNode = null;
			        currentFiber = null;
			    }
			}

			var id$1 = 0;
			// PlainNode is a simplified version of FiberNode just for show the structure
			var PlainNode = /** @class */ (function () {
			    // hooks: HOOKTree[];
			    function PlainNode(_id) {
			        this.i = _id || "".concat(id$1++);
			    }
			    return PlainNode;
			}());

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
			var unmountPlainNode = function (_fiber, _runtime) {
			    if (!_fiber)
			        return;
			    var plain = treeMap.get(_fiber);
			    if (plain) {
			        if (plain.i === _runtime._selectId) {
			            _runtime.notifyUnSelect();
			        }
			        fiberStore.delete(plain.i);
			        plainStore.delete(plain.i);
			        delete _runtime._hmr[plain.i];
			        delete _runtime._warn[plain.i];
			        delete _runtime._error[plain.i];
			        delete _runtime._state[plain.i];
			        delete _runtime._trigger[plain.i];
			    }
			    treeMap.delete(_fiber);
			    detailMap.delete(_fiber);
			};
			var initPlainNode = function (_fiber, _runtime) {
			    if (!_fiber)
			        return;
			    var plain = treeMap.get(_fiber);
			    if (!plain) {
			        var newPlain = new PlainNode();
			        treeMap.set(_fiber, newPlain);
			        fiberStore.set(newPlain.i, _fiber);
			        plainStore.set(newPlain.i, newPlain);
			    }
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
			        if (reactShared.include(r.type, exports.NODE_TYPE.__class__) || reactShared.include(r.type, exports.NODE_TYPE.__function__)) {
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
			var editorReducer = function (state, action) {
			    return typeof action === "function" ? action(state) : action;
			};
			var updateFiberByHook = function (fiber, params) {
			    var _a, _b, _c;
			    if (typeof params.hookIndex !== "number")
			        return "params not valid";
			    var hookNode = (_c = (_b = (_a = fiber.hookList) === null || _a === void 0 ? void 0 : _a.toArray) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c[params.hookIndex];
			    if (!hookNode)
			        return "hook not found";
			    var nodeId = Number(params.id);
			    var parentId = Number(params.parentId);
			    var rootId = Number(params.rootId);
			    var currentData = getValueById(nodeId);
			    var parentData = getValueById(parentId);
			    var rootData = getValueById(rootId);
			    if (!currentData.f)
			        return "current state not exist";
			    var currentDataType = typeof currentData.v;
			    if (!parentData.f && currentDataType !== "boolean" && currentDataType !== "number" && currentDataType !== "string")
			        return "current state is not primitive";
			    var newVal = currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;
			    // 更新成功
			    if (!parentData.f) {
			        var hookInstance = hookNode;
			        // oldVersion, not full support
			        if (hookInstance._dispatch) {
			            hookInstance._dispatch(newVal);
			        }
			        else {
			            hookInstance._update({ payLoad: function () { return newVal; }, reducer: editorReducer, isForce: true });
			        }
			        return;
			    }
			    var parentDataValue = parentData.v;
			    try {
			        parentDataValue[params.path] = newVal;
			        var newRootData_1 = cloneDeep(rootData.v);
			        var hookInstance = hookNode;
			        if (hookInstance._dispatch) {
			            hookInstance._update({ isForce: true });
			        }
			        else {
			            hookInstance._update({ payLoad: function () { return newRootData_1; }, reducer: editorReducer, isForce: true });
			        }
			        return;
			    }
			    catch (e) {
			        return e.message;
			    }
			};
			var updateFiberByProps = function (fiber, params) {
			    var nodeId = Number(params.id);
			    var parentId = Number(params.parentId);
			    var currentData = getValueById(nodeId);
			    var parentData = getValueById(parentId);
			    if (!currentData.f)
			        return "current props not exist";
			    var currentDataType = typeof currentData.v;
			    var newVal = currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;
			    // deep props update
			    if (parentData.f) {
			        var newProps = Object.assign({}, fiber.pendingProps);
			        parentData.v[params.path] = newVal;
			        fiber.pendingProps = newProps;
			        fiber._update(reactShared.STATE_TYPE.__triggerSyncForce__);
			    }
			    else {
			        // shallow props update
			        var newProps = Object.assign({}, fiber.pendingProps);
			        newProps[params.path] = newVal;
			        fiber.pendingProps = newProps;
			        fiber._update(reactShared.STATE_TYPE.__triggerSyncForce__);
			    }
			};
			var updateFiberByState = function (fiber, params) {
			    var nodeId = Number(params.id);
			    var parentId = Number(params.parentId);
			    var currentData = getValueById(nodeId);
			    var parentData = getValueById(parentId);
			    if (!currentData.f)
			        return "current state not exist";
			    var currentDataType = typeof currentData.v;
			    var newVal = currentDataType === "boolean" ? (params.newVal === "true" ? true : false) : currentDataType === "number" ? Number(params.newVal) : params.newVal;
			    // deep state update
			    if (parentData.f) {
			        var typedInstance = fiber.instance;
			        var newState = Object.assign({}, typedInstance.state);
			        parentData.v[params.path] = newVal;
			        typedInstance.setState(newState);
			    }
			    else {
			        // shallow state update
			        var typedInstance = fiber.instance;
			        var newState = Object.assign({}, typedInstance.state);
			        newState[params.path] = newVal;
			        typedInstance.setState(newState);
			    }
			};
			var updateFiberNode = function (fiber, params) {
			    if (params.type === "hook") {
			        return updateFiberByHook(fiber, params);
			    }
			    if (params.type === "props") {
			        return updateFiberByProps(fiber, params);
			    }
			    if (params.type === "state") {
			        return updateFiberByState(fiber, params);
			    }
			    return "type not valid";
			};

			var typeKeys = [];
			var platform = null;
			var setPlatform = function (p) {
			    platform = p;
			};
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
			// SEE @my-react/react-reconciler
			var getFiberName = function (fiber) {
			    var typedFiber = fiber;
			    if (fiber.type & exports.NODE_TYPE.__provider__) {
			        var typedElementType = fiber.elementType;
			        var name_1 = typedElementType.Context.displayName;
			        return "".concat(name_1 || "Context", ".Provider");
			    }
			    if (fiber.type & exports.NODE_TYPE.__context__) {
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
			// SEE @my-react/react-reconciler
			var isValidElement = function (element) {
			    return typeof element === "object" && !Array.isArray(element) && element !== null && (element === null || element === void 0 ? void 0 : element[reactShared.TYPEKEY]) === reactShared.Element;
			};
			// SEE @my-react/react-reconciler
			var getMockFiberFromElement = function (element) {
			    var _a, _b, _c, _d, _e;
			    var nodeType = exports.NODE_TYPE.__initial__;
			    var elementType = element.type;
			    var finalElement = element;
			    var pendingProps = element.props;
			    var ref = (_a = element.ref) !== null && _a !== void 0 ? _a : undefined;
			    var key = (_b = element.key) !== null && _b !== void 0 ? _b : undefined;
			    if (typeof elementType === "object" && elementType !== null) {
			        var typedElementType = elementType;
			        switch (typedElementType[reactShared.TYPEKEY]) {
			            case reactShared.Provider:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__provider__);
			                break;
			            // support react 19 context api
			            case reactShared.Context:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__context__);
			                break;
			            case reactShared.Consumer:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__consumer__);
			                break;
			            case reactShared.Memo:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__memo__);
			                elementType = typedElementType.render;
			                break;
			            case reactShared.ForwardRef:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__forwardRef__);
			                elementType = typedElementType.render;
			                break;
			            case reactShared.Lazy:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__lazy__);
			                break;
			            default:
			                throw new Error("[@my-react/react] invalid object element type \"".concat((_c = typedElementType[reactShared.TYPEKEY]) === null || _c === void 0 ? void 0 : _c.toString(), "\""));
			        }
			        if (typeof elementType === "object") {
			            if (elementType[reactShared.TYPEKEY] === reactShared.ForwardRef) {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__forwardRef__);
			                elementType = elementType.render;
			            }
			            if (elementType[reactShared.TYPEKEY] === reactShared.Provider) {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__provider__);
			            }
			            if (elementType[reactShared.TYPEKEY] === reactShared.Context) {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__context__);
			            }
			            if (elementType[reactShared.TYPEKEY] === reactShared.Consumer) {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__consumer__);
			            }
			        }
			        if (typeof elementType === "function") {
			            if ((_d = elementType.prototype) === null || _d === void 0 ? void 0 : _d.isMyReactComponent) {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__class__);
			            }
			            else {
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__function__);
			            }
			        }
			    }
			    else if (typeof elementType === "function") {
			        if ((_e = elementType.prototype) === null || _e === void 0 ? void 0 : _e.isMyReactComponent) {
			            nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__class__);
			        }
			        else {
			            nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__function__);
			        }
			    }
			    else if (typeof elementType === "symbol") {
			        switch (elementType) {
			            case reactShared.KeepLive:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__keepLive__);
			                break;
			            case reactShared.Fragment:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__fragment__);
			                break;
			            case reactShared.Strict:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__strict__);
			                break;
			            case reactShared.Suspense:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__suspense__);
			                break;
			            case reactShared.Scope:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__scope__);
			                break;
			            case reactShared.ScopeLazy:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__scopeLazy__);
			                break;
			            case reactShared.ScopeSuspense:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__scopeSuspense__);
			                break;
			            case reactShared.Comment:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__comment__);
			                break;
			            case reactShared.Portal:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__portal__);
			                break;
			            case reactShared.Profiler:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__profiler__);
			                break;
			            default:
			                throw new Error("[@my-react/react] invalid symbol element type \"".concat(elementType === null || elementType === void 0 ? void 0 : elementType.toString(), "\""));
			        }
			    }
			    else if (typeof elementType === "string") {
			        nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__plain__);
			    }
			    else {
			        nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__empty__);
			    }
			    var mockFiber = {
			        type: nodeType,
			        elementType: elementType,
			        pendingProps: pendingProps,
			        key: key,
			        ref: ref,
			        _debugElement: finalElement,
			    };
			    return mockFiber;
			};
			var getElementName = function (element) { return "<".concat(getFiberName(getMockFiberFromElement(element)), " />"); };
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
			var parseHooksTreeToHOOKTree = function (node, d, parentId, force) {
			    return node.map(function (item) {
			        var id = item.id, name = item.name, value = item.value, subHooks = item.subHooks, isStateEditable = item.isStateEditable;
			        return {
			            k: id === null || id === void 0 ? void 0 : id.toString(),
			            e: isStateEditable,
			            i: id,
			            n: name || "Anonymous",
			            v: force ? getNodeForce(value) : getNode(value),
			            d: d,
			            h: !subHooks.length ? true : false,
			            c: subHooks ? parseHooksTreeToHOOKTree(subHooks, d + 1, id, force) : undefined,
			        };
			    });
			};
			var getHookNormal = function (fiber, force) {
			    var _a;
			    var final = [];
			    if (!fiber.hookList)
			        return final;
			    var hookList = fiber.hookList;
			    var processStack = function (hook, index) {
			        var isEffect = hook.type === reactShared.HOOK_TYPE.useEffect || hook.type === reactShared.HOOK_TYPE.useLayoutEffect || hook.type === reactShared.HOOK_TYPE.useInsertionEffect;
			        var isContext = hook.type === reactShared.HOOK_TYPE.useContext;
			        final.push({
			            k: index.toString(),
			            i: index,
			            n: isContext ? getContextName(hook.value) : getHookName(hook.type),
			            v: force ? getNodeForce(isEffect ? hook.value : hook.result) : getNode(isEffect ? hook.value : hook.result),
			            d: 0,
			            h: true,
			        });
			    };
			    (_a = hookList === null || hookList === void 0 ? void 0 : hookList.toArray()) === null || _a === void 0 ? void 0 : _a.forEach(processStack);
			    return final;
			};
			var getHookStack = function (fiber, force) {
			    var final = [];
			    if (!fiber.hookList)
			        return final;
			    var hookTree = inspectHooksOfFiber(fiber, platform.dispatcher);
			    return parseHooksTreeToHOOKTree(hookTree, 0, null, force);
			};
			var getHook = function (fiber, force) {
			    if (platform && platform.dispatcher) {
			        try {
			            return getHookStack(fiber, force);
			        }
			        catch (e) {
			            console.error(e);
			            return getHookNormal(fiber, force);
			        }
			    }
			    else {
			        return getHookNormal(fiber, force);
			    }
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

			var isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
			var emptyConstructor = {}.constructor;
			var id = 1;
			var loadById = false;
			var idToValueMap = new Map();
			var valueToIdMap = new Map();
			var cacheMap = new WeakMap();
			var getType = function (value) {
			    if (isValidElement(value)) {
			        return "ReactElement";
			    }
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
			        value === "Set" ||
			        value === "ReactElement");
			};
			var getTargetNode = function (value, type, deep) {
			    if (deep === void 0) { deep = 3; }
			    var existId = valueToIdMap.get(value);
			    var currentId = existId || id++;
			    var n = undefined;
			    if (type === "Object" && typeof (value === null || value === void 0 ? void 0 : value.constructor) === "function" && value.constructor !== emptyConstructor && value.constructor.name) {
			        n = value.constructor.name;
			    }
			    if (type === "ReactElement") {
			        n = getElementName(value);
			    }
			    idToValueMap.set(currentId, value);
			    valueToIdMap.set(value, currentId);
			    // full deep to load
			    if (deep === 0) {
			        return {
			            i: currentId,
			            t: type,
			            n: n,
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
			            return {
			                i: currentId,
			                t: type,
			                n: n,
			                v: Object.keys(value).reduce(function (acc, key) {
			                    acc[key] = getNode(value[key], deep - 1);
			                    return acc;
			                }, {}),
			                e: true,
			            };
			        }
			        else if (type === "ReactElement") {
			            return {
			                i: currentId,
			                t: type,
			                n: n,
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
			            var currentId = existId || id++;
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
			    MessagePanelType["enableRetrigger"] = "panel-enable-retrigger";
			    MessagePanelType["enableHoverOnBrowser"] = "panel-enable-hover-on-browser";
			    MessagePanelType["nodeHover"] = "panel-hover";
			    MessagePanelType["nodeSelect"] = "panel-select";
			    MessagePanelType["nodeStore"] = "panel-store";
			    MessagePanelType["nodeEditor"] = "panel-editor";
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
			    DevToolMessageEnum["triggerStatus"] = "triggerStatus";
			    DevToolMessageEnum["hmr"] = "hmr";
			    DevToolMessageEnum["hmrStatus"] = "hmrStatus";
			    DevToolMessageEnum["source"] = "source";
			    DevToolMessageEnum["detail"] = "detail";
			    DevToolMessageEnum["unmount"] = "unmount";
			    DevToolMessageEnum["select-sync"] = "select-sync";
			    DevToolMessageEnum["select-unmount"] = "select-unmount";
			    DevToolMessageEnum["message"] = "message";
			    DevToolMessageEnum["warn"] = "warn";
			    DevToolMessageEnum["warnStatus"] = "warnStatus";
			    DevToolMessageEnum["error"] = "error";
			    DevToolMessageEnum["errorStatus"] = "errorStatus";
			    DevToolMessageEnum["chunks"] = "chunks";
			    DevToolMessageEnum["dom-hover"] = "dom-hover";
			})(exports.DevToolMessageEnum || (exports.DevToolMessageEnum = {}));
			exports.HMRStatus = void 0;
			(function (HMRStatus) {
			    HMRStatus[HMRStatus["none"] = 0] = "none";
			    HMRStatus[HMRStatus["refresh"] = 1] = "refresh";
			    HMRStatus[HMRStatus["remount"] = 2] = "remount";
			})(exports.HMRStatus || (exports.HMRStatus = {}));
			var DevToolSource = "@my-react/devtool";

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

			// https://github.com/facebook/react/blob/main/packages/react-devtools-shared/src/backend/views/Highlighter/Overlay.js
			/* eslint-disable @typescript-eslint/ban-ts-comment */
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
			function overridePatchToFiberInit(dispatch, runtime) {
			    if (typeof dispatch.onFiberInitial === 'function') {
			        dispatch.onFiberInitial(function (f) { return initPlainNode(f); });
			    }
			    else {
			        var originalPatchInit_1 = dispatch.patchToFiberInitial;
			        dispatch.patchToFiberInitial = function (fiber) {
			            originalPatchInit_1.call(this, fiber);
			            initPlainNode(fiber);
			        };
			    }
			}
			var setupDispatch = function (dispatch, runtime) {
			    if (dispatch["$$hasDevToolInject"])
			        return;
			    dispatch["$$hasDevToolInject"] = true;
			    overridePatchToFiberInit(dispatch);
			    overridePatchToFiberUnmount(dispatch, runtime);
			    Object.defineProperty(dispatch, "__dev_devtool_runtime__", { value: { core: runtime, version: "0.0.1" } });
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
			        this._error = {};
			        this._warn = {};
			        this._hoverId = "";
			        this._selectId = "";
			        this._selectDom = null;
			        this._hasSelectChange = false;
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
			        // 显示Retrigger的触发状态
			        this._enableRetrigger = false;
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
			            _this.notifySelect();
			            _this.notifyTrigger();
			            _this.notifyTriggerStatus();
			            _this.notifyHMR();
			            _this.notifyHMRStatus();
			            _this.notifyWarn();
			            _this.notifyWarnStatus();
			            _this.notifyError();
			            _this.notifyErrorStatus();
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
			    DevToolCore.prototype.setRetriggerStatus = function (d) {
			        this._enableRetrigger = d;
			        this.notifyTrigger();
			        this.notifyTriggerStatus();
			    };
			    DevToolCore.prototype.addDispatch = function (dispatch, platform) {
			        if (dispatch)
			            this._detector = true;
			        if (this.hasDispatch(dispatch))
			            return;
			        setupDispatch(dispatch, this);
			        this._dispatch.add(dispatch);
			        if (platform && this._platform && platform !== this._platform) {
			            console.warn("[@my-react-devtool/core] you have multiple platform connect, please check");
			        }
			        if (platform) {
			            this._platform = platform;
			            setPlatform(this._platform);
			        }
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
			            _this.notifyHMRStatus();
			            _this.notifyTriggerStatus();
			            _this.notifyWarnStatus();
			            _this.notifyErrorStatus();
			        }, 200);
			        var onChange = function (list) {
			            if (!_this.hasEnable)
			                return;
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
			        var onFiberTrigger = function (fiber, state) {
			            var id = getPlainNodeIdByFiber(fiber);
			            if (!id)
			                return;
			            _this._trigger[id] = _this._trigger[id] || [];
			            // 长数据过滤
			            if (_this._trigger[id].length > 10) {
			                var index = _this._trigger[id].length - 11;
			                _this._trigger[id][index] = { isRetrigger: _this._trigger[id][index].isRetrigger };
			            }
			            _this._trigger[id].push(state);
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
			            if (id === _this._selectId) {
			                _this.notifySelect();
			                _this.notifyHMRStatus();
			                _this.notifyTriggerStatus();
			                _this.notifyWarnStatus();
			                _this.notifyErrorStatus();
			            }
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
			            _this._hmr[id] = _this._hmr[id] || [];
			            _this._hmr[id].push(typeof forceRefresh === "boolean" ? (forceRefresh ? exports.HMRStatus.remount : exports.HMRStatus.refresh) : exports.HMRStatus.none);
			            if (!_this.hasEnable)
			                return;
			            _this.notifyHMR();
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
			            if (_this._warn[id].length > 10) {
			                var index = _this._warn[id].length - 11;
			                _this._warn[id][index] = 1;
			            }
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
			            if (_this._error[id].length > 10) {
			                var index = _this._error[id].length - 11;
			                _this._error[id][index] = 1;
			            }
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
			        var fiber = getFiberNodeById(id);
			        if (!fiber)
			            return;
			        if (id === this._selectId)
			            return;
			        var domArray = getElementNodesFromFiber(fiber);
			        this._selectId = id;
			        this._selectDom = domArray[0];
			    };
			    DevToolCore.prototype.setSelectDom = function (dom) {
			        var fiber = getComponentFiberByDom(dom);
			        if (!fiber)
			            return;
			        var id = getPlainNodeIdByFiber(fiber);
			        if (id === this._selectId)
			            return;
			        this._selectId = id;
			        this._selectDom = dom;
			        this._hasSelectChange = true;
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
			        var dom = this._selectDom;
			        if (typeof globalThis["inspect"] === "function" && dom) {
			            globalThis["inspect"](dom);
			            window["$$$$0"] = dom;
			            return;
			        }
			        this.notifyMessage("current id: ".concat(this._selectId, " of fiber not contain dom node"), "warning");
			    };
			    DevToolCore.prototype.inspectCom = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var fiber = getFiberNodeById(id);
			        if (fiber) {
			            var elementType = fiber.elementType;
			            if (typeof globalThis["inspect"] === "function" && elementType) {
			                globalThis["inspect"](elementType);
			                return;
			            }
			        }
			        this.notifyMessage("current id: ".concat(id, " of fiber can not inspect"), "warning");
			    };
			    DevToolCore.prototype.inspectSource = function () {
			        if (!this.hasEnable)
			            return;
			        if (typeof this._source === "function" && typeof globalThis["inspect"] === "function") {
			            var s = this._source;
			            this._source = null;
			            globalThis["inspect"](s);
			            return;
			        }
			        if (this._source && this._source instanceof HTMLElement && typeof globalThis["inspect"] === "function") {
			            var s = this._source;
			            this._source = null;
			            globalThis["inspect"](s);
			            window["$$$$0"] = s;
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
			        var _this = this;
			        if (!this.hasEnable)
			            return;
			        var state = Object.keys(this._trigger).reduce(function (p, c) {
			            var t = _this._trigger[c];
			            var f = t.filter(function (i) { return (i.isRetrigger ? _this._enableRetrigger : true); });
			            p[c] = f.length;
			            return p;
			        }, {});
			        this._notify({ type: exports.DevToolMessageEnum.trigger, data: state });
			    };
			    DevToolCore.prototype.notifyTriggerStatus = function () {
			        var _this = this;
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var status = this._trigger[id];
			        if (!status)
			            return;
			        var finalStatus = status.filter(function (i) { return (i.isRetrigger ? _this._enableRetrigger : true); }).slice(-10);
			        this._notify({ type: exports.DevToolMessageEnum.triggerStatus, data: finalStatus.map(function (i) { return getNode(i); }) });
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
			                p[c] = _this._warn[c].length;
			                return p;
			            }, {}),
			        });
			    };
			    DevToolCore.prototype.notifyWarnStatus = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var status = this._warn[id];
			        if (!status)
			            return;
			        var finalStatus = status.slice(-10);
			        this._notify({ type: exports.DevToolMessageEnum.warnStatus, data: finalStatus.map(function (i) { return getNode(i); }) });
			    };
			    DevToolCore.prototype.notifyError = function () {
			        var _this = this;
			        if (!this.hasEnable)
			            return;
			        this._notify({
			            type: exports.DevToolMessageEnum.error,
			            data: Object.keys(this._error).reduce(function (p, c) {
			                p[c] = _this._error[c].length;
			                return p;
			            }, {}),
			        });
			    };
			    DevToolCore.prototype.notifyErrorStatus = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var status = this._error[id];
			        if (!status)
			            return;
			        var finalStatus = status.slice(-10);
			        this._notify({ type: exports.DevToolMessageEnum.errorStatus, data: finalStatus.map(function (i) { return getNode(i); }) });
			    };
			    // TODO
			    DevToolCore.prototype.notifyChanged = function (list) {
			        if (!this.hasEnable)
			            return;
			        var tree = getTreeByFiber(list.head.value);
			        this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
			    };
			    DevToolCore.prototype.notifyHMR = function () {
			        var _this = this;
			        if (!this.hasEnable)
			            return;
			        var state = Object.keys(this._hmr).reduce(function (p, c) {
			            p[c] = _this._hmr[c].length;
			            return p;
			        }, {});
			        this._notify({ type: exports.DevToolMessageEnum.hmr, data: state });
			    };
			    DevToolCore.prototype.notifyHMRStatus = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var status = this._hmr[id];
			        if (!status)
			            return;
			        this._notify({ type: exports.DevToolMessageEnum.hmrStatus, data: status });
			    };
			    DevToolCore.prototype.notifyConfig = function () {
			        if (!this.hasEnable)
			            return;
			        this._notify({
			            type: exports.DevToolMessageEnum.config,
			            data: {
			                enableHover: this._enableHover,
			                enableUpdate: this._enableUpdate,
			                enableRetrigger: this._enableRetrigger,
			                enableHoverOnBrowser: this._enableHoverOnBrowser,
			            },
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
			    DevToolCore.prototype.notifySelectSync = function () {
			        if (!this.hasEnable)
			            return;
			        if (this._hasSelectChange) {
			            this._hasSelectChange = false;
			            this._notify({ type: exports.DevToolMessageEnum["select-sync"], data: this._selectId });
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
			    DevToolCore.prototype.notifyEditor = function (params) {
			        if (!this.hasEnable)
			            return;
			        var fiber = getFiberNodeById(this._selectId);
			        var res = updateFiberNode(fiber, params);
			        if (typeof res === "string") {
			            // have error
			            this.notifyMessage(res, "error");
			        }
			        else {
			            this.notifyMessage("update success", "success");
			        }
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
			        this._selectDom = null;
			        this._source = null;
			        this._domHoverId = "";
			        this._tempDomHoverId = "";
			        this._state = {};
			        this._trigger = {};
			        this._warn = {};
			        this._platform = null;
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
			exports.getElementName = getElementName;
			exports.getElementNodesFromFiber = getElementNodesFromFiber;
			exports.getFiberName = getFiberName;
			exports.getFiberNodeById = getFiberNodeById;
			exports.getFiberTag = getFiberTag;
			exports.getFiberType = getFiberType;
			exports.getHook = getHook;
			exports.getHookName = getHookName;
			exports.getMockFiberFromElement = getMockFiberFromElement;
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
			exports.initPlainNode = initPlainNode;
			exports.isValidElement = isValidElement;
			exports.loopChangedTree = loopChangedTree;
			exports.loopTree = loopTree;
			exports.setPlatform = setPlatform;
			exports.shallowAssignFiber = shallowAssignFiber;
			exports.throttle = throttle;
			exports.typeKeys = typeKeys;
			exports.unmountPlainNode = unmountPlainNode;
			exports.updateFiberNode = updateFiberNode; 
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
