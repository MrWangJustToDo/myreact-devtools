(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var socket_io$1 = {exports: {}};

	/*!
	 * Socket.IO v4.8.1
	 * (c) 2014-2024 Guillermo Rauch
	 * Released under the MIT License.
	 */
	var socket_io = socket_io$1.exports;

	var hasRequiredSocket_io;

	function requireSocket_io () {
		if (hasRequiredSocket_io) return socket_io$1.exports;
		hasRequiredSocket_io = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(socket_io, (function () {
			  function _arrayLikeToArray(r, a) {
			    (null == a || a > r.length) && (a = r.length);
			    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
			    return n;
			  }
			  function _arrayWithoutHoles(r) {
			    if (Array.isArray(r)) return _arrayLikeToArray(r);
			  }
			  function _construct(t, e, r) {
			    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
			    var o = [null];
			    o.push.apply(o, e);
			    var p = new (t.bind.apply(t, o))();
			    return r && _setPrototypeOf(p, r.prototype), p;
			  }
			  function _defineProperties(e, r) {
			    for (var t = 0; t < r.length; t++) {
			      var o = r[t];
			      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
			    }
			  }
			  function _createClass(e, r, t) {
			    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
			      writable: false
			    }), e;
			  }
			  function _createForOfIteratorHelper(r, e) {
			    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
			    if (!t) {
			      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
			        t && (r = t);
			        var n = 0,
			          F = function () {};
			        return {
			          s: F,
			          n: function () {
			            return n >= r.length ? {
			              done: true
			            } : {
			              done: false,
			              value: r[n++]
			            };
			          },
			          e: function (r) {
			            throw r;
			          },
			          f: F
			        };
			      }
			      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
			    }
			    var o,
			      a = true,
			      u = false;
			    return {
			      s: function () {
			        t = t.call(r);
			      },
			      n: function () {
			        var r = t.next();
			        return a = r.done, r;
			      },
			      e: function (r) {
			        u = true, o = r;
			      },
			      f: function () {
			        try {
			          a || null == t.return || t.return();
			        } finally {
			          if (u) throw o;
			        }
			      }
			    };
			  }
			  function _extends() {
			    return _extends = Object.assign ? Object.assign.bind() : function (n) {
			      for (var e = 1; e < arguments.length; e++) {
			        var t = arguments[e];
			        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			      }
			      return n;
			    }, _extends.apply(null, arguments);
			  }
			  function _getPrototypeOf(t) {
			    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
			      return t.__proto__ || Object.getPrototypeOf(t);
			    }, _getPrototypeOf(t);
			  }
			  function _inheritsLoose(t, o) {
			    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
			  }
			  function _isNativeFunction(t) {
			    try {
			      return -1 !== Function.toString.call(t).indexOf("[native code]");
			    } catch (n) {
			      return "function" == typeof t;
			    }
			  }
			  function _isNativeReflectConstruct() {
			    try {
			      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
			    } catch (t) {}
			    return (_isNativeReflectConstruct = function () {
			      return !!t;
			    })();
			  }
			  function _iterableToArray(r) {
			    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
			  }
			  function _nonIterableSpread() {
			    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
			  }
			  function _setPrototypeOf(t, e) {
			    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
			      return t.__proto__ = e, t;
			    }, _setPrototypeOf(t, e);
			  }
			  function _toConsumableArray(r) {
			    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
			  }
			  function _toPrimitive(t, r) {
			    if ("object" != typeof t || !t) return t;
			    var e = t[Symbol.toPrimitive];
			    if (void 0 !== e) {
			      var i = e.call(t, r);
			      if ("object" != typeof i) return i;
			      throw new TypeError("@@toPrimitive must return a primitive value.");
			    }
			    return (String )(t);
			  }
			  function _toPropertyKey(t) {
			    var i = _toPrimitive(t, "string");
			    return "symbol" == typeof i ? i : i + "";
			  }
			  function _typeof(o) {
			    "@babel/helpers - typeof";

			    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
			      return typeof o;
			    } : function (o) {
			      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
			    }, _typeof(o);
			  }
			  function _unsupportedIterableToArray(r, a) {
			    if (r) {
			      if ("string" == typeof r) return _arrayLikeToArray(r, a);
			      var t = {}.toString.call(r).slice(8, -1);
			      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
			    }
			  }
			  function _wrapNativeSuper(t) {
			    var r = "function" == typeof Map ? new Map() : void 0;
			    return _wrapNativeSuper = function (t) {
			      if (null === t || !_isNativeFunction(t)) return t;
			      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
			      if (void 0 !== r) {
			        if (r.has(t)) return r.get(t);
			        r.set(t, Wrapper);
			      }
			      function Wrapper() {
			        return _construct(t, arguments, _getPrototypeOf(this).constructor);
			      }
			      return Wrapper.prototype = Object.create(t.prototype, {
			        constructor: {
			          value: Wrapper,
			          enumerable: false,
			          writable: true,
			          configurable: true
			        }
			      }), _setPrototypeOf(Wrapper, t);
			    }, _wrapNativeSuper(t);
			  }

			  var PACKET_TYPES = Object.create(null); // no Map = no polyfill
			  PACKET_TYPES["open"] = "0";
			  PACKET_TYPES["close"] = "1";
			  PACKET_TYPES["ping"] = "2";
			  PACKET_TYPES["pong"] = "3";
			  PACKET_TYPES["message"] = "4";
			  PACKET_TYPES["upgrade"] = "5";
			  PACKET_TYPES["noop"] = "6";
			  var PACKET_TYPES_REVERSE = Object.create(null);
			  Object.keys(PACKET_TYPES).forEach(function (key) {
			    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
			  });
			  var ERROR_PACKET = {
			    type: "error",
			    data: "parser error"
			  };

			  var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
			  var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
			  // ArrayBuffer.isView method is not defined in IE10
			  var isView$1 = function isView(obj) {
			    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
			  };
			  var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
			    var type = _ref.type,
			      data = _ref.data;
			    if (withNativeBlob$1 && data instanceof Blob) {
			      if (supportsBinary) {
			        return callback(data);
			      } else {
			        return encodeBlobAsBase64(data, callback);
			      }
			    } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
			      if (supportsBinary) {
			        return callback(data);
			      } else {
			        return encodeBlobAsBase64(new Blob([data]), callback);
			      }
			    }
			    // plain string
			    return callback(PACKET_TYPES[type] + (data || ""));
			  };
			  var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
			    var fileReader = new FileReader();
			    fileReader.onload = function () {
			      var content = fileReader.result.split(",")[1];
			      callback("b" + (content || ""));
			    };
			    return fileReader.readAsDataURL(data);
			  };
			  function toArray(data) {
			    if (data instanceof Uint8Array) {
			      return data;
			    } else if (data instanceof ArrayBuffer) {
			      return new Uint8Array(data);
			    } else {
			      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
			    }
			  }
			  var TEXT_ENCODER;
			  function encodePacketToBinary(packet, callback) {
			    if (withNativeBlob$1 && packet.data instanceof Blob) {
			      return packet.data.arrayBuffer().then(toArray).then(callback);
			    } else if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) {
			      return callback(toArray(packet.data));
			    }
			    encodePacket(packet, false, function (encoded) {
			      if (!TEXT_ENCODER) {
			        TEXT_ENCODER = new TextEncoder();
			      }
			      callback(TEXT_ENCODER.encode(encoded));
			    });
			  }

			  // imported from https://github.com/socketio/base64-arraybuffer
			  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
			  // Use a lookup table to find the index.
			  var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
			  for (var i = 0; i < chars.length; i++) {
			    lookup$1[chars.charCodeAt(i)] = i;
			  }
			  var decode$1 = function decode(base64) {
			    var bufferLength = base64.length * 0.75,
			      len = base64.length,
			      i,
			      p = 0,
			      encoded1,
			      encoded2,
			      encoded3,
			      encoded4;
			    if (base64[base64.length - 1] === '=') {
			      bufferLength--;
			      if (base64[base64.length - 2] === '=') {
			        bufferLength--;
			      }
			    }
			    var arraybuffer = new ArrayBuffer(bufferLength),
			      bytes = new Uint8Array(arraybuffer);
			    for (i = 0; i < len; i += 4) {
			      encoded1 = lookup$1[base64.charCodeAt(i)];
			      encoded2 = lookup$1[base64.charCodeAt(i + 1)];
			      encoded3 = lookup$1[base64.charCodeAt(i + 2)];
			      encoded4 = lookup$1[base64.charCodeAt(i + 3)];
			      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
			      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
			      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
			    }
			    return arraybuffer;
			  };

			  var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
			  var decodePacket = function decodePacket(encodedPacket, binaryType) {
			    if (typeof encodedPacket !== "string") {
			      return {
			        type: "message",
			        data: mapBinary(encodedPacket, binaryType)
			      };
			    }
			    var type = encodedPacket.charAt(0);
			    if (type === "b") {
			      return {
			        type: "message",
			        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
			      };
			    }
			    var packetType = PACKET_TYPES_REVERSE[type];
			    if (!packetType) {
			      return ERROR_PACKET;
			    }
			    return encodedPacket.length > 1 ? {
			      type: PACKET_TYPES_REVERSE[type],
			      data: encodedPacket.substring(1)
			    } : {
			      type: PACKET_TYPES_REVERSE[type]
			    };
			  };
			  var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
			    if (withNativeArrayBuffer$1) {
			      var decoded = decode$1(data);
			      return mapBinary(decoded, binaryType);
			    } else {
			      return {
			        base64: true,
			        data: data
			      }; // fallback for old browsers
			    }
			  };
			  var mapBinary = function mapBinary(data, binaryType) {
			    switch (binaryType) {
			      case "blob":
			        if (data instanceof Blob) {
			          // from WebSocket + binaryType "blob"
			          return data;
			        } else {
			          // from HTTP long-polling or WebTransport
			          return new Blob([data]);
			        }
			      case "arraybuffer":
			      default:
			        if (data instanceof ArrayBuffer) {
			          // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
			          return data;
			        } else {
			          // from WebTransport (Uint8Array)
			          return data.buffer;
			        }
			    }
			  };

			  var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
			  var encodePayload = function encodePayload(packets, callback) {
			    // some packets may be added to the array while encoding, so the initial length must be saved
			    var length = packets.length;
			    var encodedPackets = new Array(length);
			    var count = 0;
			    packets.forEach(function (packet, i) {
			      // force base64 encoding for binary packets
			      encodePacket(packet, false, function (encodedPacket) {
			        encodedPackets[i] = encodedPacket;
			        if (++count === length) {
			          callback(encodedPackets.join(SEPARATOR));
			        }
			      });
			    });
			  };
			  var decodePayload = function decodePayload(encodedPayload, binaryType) {
			    var encodedPackets = encodedPayload.split(SEPARATOR);
			    var packets = [];
			    for (var i = 0; i < encodedPackets.length; i++) {
			      var decodedPacket = decodePacket(encodedPackets[i], binaryType);
			      packets.push(decodedPacket);
			      if (decodedPacket.type === "error") {
			        break;
			      }
			    }
			    return packets;
			  };
			  function createPacketEncoderStream() {
			    return new TransformStream({
			      transform: function transform(packet, controller) {
			        encodePacketToBinary(packet, function (encodedPacket) {
			          var payloadLength = encodedPacket.length;
			          var header;
			          // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
			          if (payloadLength < 126) {
			            header = new Uint8Array(1);
			            new DataView(header.buffer).setUint8(0, payloadLength);
			          } else if (payloadLength < 65536) {
			            header = new Uint8Array(3);
			            var view = new DataView(header.buffer);
			            view.setUint8(0, 126);
			            view.setUint16(1, payloadLength);
			          } else {
			            header = new Uint8Array(9);
			            var _view = new DataView(header.buffer);
			            _view.setUint8(0, 127);
			            _view.setBigUint64(1, BigInt(payloadLength));
			          }
			          // first bit indicates whether the payload is plain text (0) or binary (1)
			          if (packet.data && typeof packet.data !== "string") {
			            header[0] |= 0x80;
			          }
			          controller.enqueue(header);
			          controller.enqueue(encodedPacket);
			        });
			      }
			    });
			  }
			  var TEXT_DECODER;
			  function totalLength(chunks) {
			    return chunks.reduce(function (acc, chunk) {
			      return acc + chunk.length;
			    }, 0);
			  }
			  function concatChunks(chunks, size) {
			    if (chunks[0].length === size) {
			      return chunks.shift();
			    }
			    var buffer = new Uint8Array(size);
			    var j = 0;
			    for (var i = 0; i < size; i++) {
			      buffer[i] = chunks[0][j++];
			      if (j === chunks[0].length) {
			        chunks.shift();
			        j = 0;
			      }
			    }
			    if (chunks.length && j < chunks[0].length) {
			      chunks[0] = chunks[0].slice(j);
			    }
			    return buffer;
			  }
			  function createPacketDecoderStream(maxPayload, binaryType) {
			    if (!TEXT_DECODER) {
			      TEXT_DECODER = new TextDecoder();
			    }
			    var chunks = [];
			    var state = 0 /* State.READ_HEADER */;
			    var expectedLength = -1;
			    var isBinary = false;
			    return new TransformStream({
			      transform: function transform(chunk, controller) {
			        chunks.push(chunk);
			        while (true) {
			          if (state === 0 /* State.READ_HEADER */) {
			            if (totalLength(chunks) < 1) {
			              break;
			            }
			            var header = concatChunks(chunks, 1);
			            isBinary = (header[0] & 0x80) === 0x80;
			            expectedLength = header[0] & 0x7f;
			            if (expectedLength < 126) {
			              state = 3 /* State.READ_PAYLOAD */;
			            } else if (expectedLength === 126) {
			              state = 1 /* State.READ_EXTENDED_LENGTH_16 */;
			            } else {
			              state = 2 /* State.READ_EXTENDED_LENGTH_64 */;
			            }
			          } else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
			            if (totalLength(chunks) < 2) {
			              break;
			            }
			            var headerArray = concatChunks(chunks, 2);
			            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
			            state = 3 /* State.READ_PAYLOAD */;
			          } else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
			            if (totalLength(chunks) < 8) {
			              break;
			            }
			            var _headerArray = concatChunks(chunks, 8);
			            var view = new DataView(_headerArray.buffer, _headerArray.byteOffset, _headerArray.length);
			            var n = view.getUint32(0);
			            if (n > Math.pow(2, 53 - 32) - 1) {
			              // the maximum safe integer in JavaScript is 2^53 - 1
			              controller.enqueue(ERROR_PACKET);
			              break;
			            }
			            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
			            state = 3 /* State.READ_PAYLOAD */;
			          } else {
			            if (totalLength(chunks) < expectedLength) {
			              break;
			            }
			            var data = concatChunks(chunks, expectedLength);
			            controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
			            state = 0 /* State.READ_HEADER */;
			          }
			          if (expectedLength === 0 || expectedLength > maxPayload) {
			            controller.enqueue(ERROR_PACKET);
			            break;
			          }
			        }
			      }
			    });
			  }
			  var protocol$1 = 4;

			  /**
			   * Initialize a new `Emitter`.
			   *
			   * @api public
			   */

			  function Emitter(obj) {
			    if (obj) return mixin(obj);
			  }

			  /**
			   * Mixin the emitter properties.
			   *
			   * @param {Object} obj
			   * @return {Object}
			   * @api private
			   */

			  function mixin(obj) {
			    for (var key in Emitter.prototype) {
			      obj[key] = Emitter.prototype[key];
			    }
			    return obj;
			  }

			  /**
			   * Listen on the given `event` with `fn`.
			   *
			   * @param {String} event
			   * @param {Function} fn
			   * @return {Emitter}
			   * @api public
			   */

			  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
			    this._callbacks = this._callbacks || {};
			    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
			    return this;
			  };

			  /**
			   * Adds an `event` listener that will be invoked a single
			   * time then automatically removed.
			   *
			   * @param {String} event
			   * @param {Function} fn
			   * @return {Emitter}
			   * @api public
			   */

			  Emitter.prototype.once = function (event, fn) {
			    function on() {
			      this.off(event, on);
			      fn.apply(this, arguments);
			    }
			    on.fn = fn;
			    this.on(event, on);
			    return this;
			  };

			  /**
			   * Remove the given callback for `event` or all
			   * registered callbacks.
			   *
			   * @param {String} event
			   * @param {Function} fn
			   * @return {Emitter}
			   * @api public
			   */

			  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
			    this._callbacks = this._callbacks || {};

			    // all
			    if (0 == arguments.length) {
			      this._callbacks = {};
			      return this;
			    }

			    // specific event
			    var callbacks = this._callbacks['$' + event];
			    if (!callbacks) return this;

			    // remove all handlers
			    if (1 == arguments.length) {
			      delete this._callbacks['$' + event];
			      return this;
			    }

			    // remove specific handler
			    var cb;
			    for (var i = 0; i < callbacks.length; i++) {
			      cb = callbacks[i];
			      if (cb === fn || cb.fn === fn) {
			        callbacks.splice(i, 1);
			        break;
			      }
			    }

			    // Remove event specific arrays for event types that no
			    // one is subscribed for to avoid memory leak.
			    if (callbacks.length === 0) {
			      delete this._callbacks['$' + event];
			    }
			    return this;
			  };

			  /**
			   * Emit `event` with the given args.
			   *
			   * @param {String} event
			   * @param {Mixed} ...
			   * @return {Emitter}
			   */

			  Emitter.prototype.emit = function (event) {
			    this._callbacks = this._callbacks || {};
			    var args = new Array(arguments.length - 1),
			      callbacks = this._callbacks['$' + event];
			    for (var i = 1; i < arguments.length; i++) {
			      args[i - 1] = arguments[i];
			    }
			    if (callbacks) {
			      callbacks = callbacks.slice(0);
			      for (var i = 0, len = callbacks.length; i < len; ++i) {
			        callbacks[i].apply(this, args);
			      }
			    }
			    return this;
			  };

			  // alias used for reserved events (protected method)
			  Emitter.prototype.emitReserved = Emitter.prototype.emit;

			  /**
			   * Return array of callbacks for `event`.
			   *
			   * @param {String} event
			   * @return {Array}
			   * @api public
			   */

			  Emitter.prototype.listeners = function (event) {
			    this._callbacks = this._callbacks || {};
			    return this._callbacks['$' + event] || [];
			  };

			  /**
			   * Check if this emitter has `event` handlers.
			   *
			   * @param {String} event
			   * @return {Boolean}
			   * @api public
			   */

			  Emitter.prototype.hasListeners = function (event) {
			    return !!this.listeners(event).length;
			  };

			  var nextTick = function () {
			    var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
			    if (isPromiseAvailable) {
			      return function (cb) {
			        return Promise.resolve().then(cb);
			      };
			    } else {
			      return function (cb, setTimeoutFn) {
			        return setTimeoutFn(cb, 0);
			      };
			    }
			  }();
			  var globalThisShim = function () {
			    if (typeof self !== "undefined") {
			      return self;
			    } else if (typeof window !== "undefined") {
			      return window;
			    } else {
			      return Function("return this")();
			    }
			  }();
			  var defaultBinaryType = "arraybuffer";
			  function createCookieJar() {}

			  function pick(obj) {
			    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			      attr[_key - 1] = arguments[_key];
			    }
			    return attr.reduce(function (acc, k) {
			      if (obj.hasOwnProperty(k)) {
			        acc[k] = obj[k];
			      }
			      return acc;
			    }, {});
			  }
			  // Keep a reference to the real timeout functions so they can be used when overridden
			  var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
			  var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
			  function installTimerFunctions(obj, opts) {
			    if (opts.useNativeTimers) {
			      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
			      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
			    } else {
			      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
			      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
			    }
			  }
			  // base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
			  var BASE64_OVERHEAD = 1.33;
			  // we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
			  function byteLength(obj) {
			    if (typeof obj === "string") {
			      return utf8Length(obj);
			    }
			    // arraybuffer or blob
			    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
			  }
			  function utf8Length(str) {
			    var c = 0,
			      length = 0;
			    for (var i = 0, l = str.length; i < l; i++) {
			      c = str.charCodeAt(i);
			      if (c < 0x80) {
			        length += 1;
			      } else if (c < 0x800) {
			        length += 2;
			      } else if (c < 0xd800 || c >= 0xe000) {
			        length += 3;
			      } else {
			        i++;
			        length += 4;
			      }
			    }
			    return length;
			  }
			  /**
			   * Generates a random 8-characters string.
			   */
			  function randomString() {
			    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
			  }

			  // imported from https://github.com/galkn/querystring
			  /**
			   * Compiles a querystring
			   * Returns string representation of the object
			   *
			   * @param {Object}
			   * @api private
			   */
			  function encode(obj) {
			    var str = '';
			    for (var i in obj) {
			      if (obj.hasOwnProperty(i)) {
			        if (str.length) str += '&';
			        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
			      }
			    }
			    return str;
			  }
			  /**
			   * Parses a simple querystring into an object
			   *
			   * @param {String} qs
			   * @api private
			   */
			  function decode(qs) {
			    var qry = {};
			    var pairs = qs.split('&');
			    for (var i = 0, l = pairs.length; i < l; i++) {
			      var pair = pairs[i].split('=');
			      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			    }
			    return qry;
			  }

			  var TransportError = /*#__PURE__*/function (_Error) {
			    function TransportError(reason, description, context) {
			      var _this;
			      _this = _Error.call(this, reason) || this;
			      _this.description = description;
			      _this.context = context;
			      _this.type = "TransportError";
			      return _this;
			    }
			    _inheritsLoose(TransportError, _Error);
			    return TransportError;
			  }( /*#__PURE__*/_wrapNativeSuper(Error));
			  var Transport = /*#__PURE__*/function (_Emitter) {
			    /**
			     * Transport abstract constructor.
			     *
			     * @param {Object} opts - options
			     * @protected
			     */
			    function Transport(opts) {
			      var _this2;
			      _this2 = _Emitter.call(this) || this;
			      _this2.writable = false;
			      installTimerFunctions(_this2, opts);
			      _this2.opts = opts;
			      _this2.query = opts.query;
			      _this2.socket = opts.socket;
			      _this2.supportsBinary = !opts.forceBase64;
			      return _this2;
			    }
			    /**
			     * Emits an error.
			     *
			     * @param {String} reason
			     * @param description
			     * @param context - the error context
			     * @return {Transport} for chaining
			     * @protected
			     */
			    _inheritsLoose(Transport, _Emitter);
			    var _proto = Transport.prototype;
			    _proto.onError = function onError(reason, description, context) {
			      _Emitter.prototype.emitReserved.call(this, "error", new TransportError(reason, description, context));
			      return this;
			    }
			    /**
			     * Opens the transport.
			     */;
			    _proto.open = function open() {
			      this.readyState = "opening";
			      this.doOpen();
			      return this;
			    }
			    /**
			     * Closes the transport.
			     */;
			    _proto.close = function close() {
			      if (this.readyState === "opening" || this.readyState === "open") {
			        this.doClose();
			        this.onClose();
			      }
			      return this;
			    }
			    /**
			     * Sends multiple packets.
			     *
			     * @param {Array} packets
			     */;
			    _proto.send = function send(packets) {
			      if (this.readyState === "open") {
			        this.write(packets);
			      }
			    }
			    /**
			     * Called upon open
			     *
			     * @protected
			     */;
			    _proto.onOpen = function onOpen() {
			      this.readyState = "open";
			      this.writable = true;
			      _Emitter.prototype.emitReserved.call(this, "open");
			    }
			    /**
			     * Called with data.
			     *
			     * @param {String} data
			     * @protected
			     */;
			    _proto.onData = function onData(data) {
			      var packet = decodePacket(data, this.socket.binaryType);
			      this.onPacket(packet);
			    }
			    /**
			     * Called with a decoded packet.
			     *
			     * @protected
			     */;
			    _proto.onPacket = function onPacket(packet) {
			      _Emitter.prototype.emitReserved.call(this, "packet", packet);
			    }
			    /**
			     * Called upon close.
			     *
			     * @protected
			     */;
			    _proto.onClose = function onClose(details) {
			      this.readyState = "closed";
			      _Emitter.prototype.emitReserved.call(this, "close", details);
			    }
			    /**
			     * Pauses the transport, in order not to lose packets during an upgrade.
			     *
			     * @param onPause
			     */;
			    _proto.pause = function pause(onPause) {};
			    _proto.createUri = function createUri(schema) {
			      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			      return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
			    };
			    _proto._hostname = function _hostname() {
			      var hostname = this.opts.hostname;
			      return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
			    };
			    _proto._port = function _port() {
			      if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
			        return ":" + this.opts.port;
			      } else {
			        return "";
			      }
			    };
			    _proto._query = function _query(query) {
			      var encodedQuery = encode(query);
			      return encodedQuery.length ? "?" + encodedQuery : "";
			    };
			    return Transport;
			  }(Emitter);

			  var Polling = /*#__PURE__*/function (_Transport) {
			    function Polling() {
			      var _this;
			      _this = _Transport.apply(this, arguments) || this;
			      _this._polling = false;
			      return _this;
			    }
			    _inheritsLoose(Polling, _Transport);
			    var _proto = Polling.prototype;
			    /**
			     * Opens the socket (triggers polling). We write a PING message to determine
			     * when the transport is open.
			     *
			     * @protected
			     */
			    _proto.doOpen = function doOpen() {
			      this._poll();
			    }
			    /**
			     * Pauses polling.
			     *
			     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
			     * @package
			     */;
			    _proto.pause = function pause(onPause) {
			      var _this2 = this;
			      this.readyState = "pausing";
			      var pause = function pause() {
			        _this2.readyState = "paused";
			        onPause();
			      };
			      if (this._polling || !this.writable) {
			        var total = 0;
			        if (this._polling) {
			          total++;
			          this.once("pollComplete", function () {
			            --total || pause();
			          });
			        }
			        if (!this.writable) {
			          total++;
			          this.once("drain", function () {
			            --total || pause();
			          });
			        }
			      } else {
			        pause();
			      }
			    }
			    /**
			     * Starts polling cycle.
			     *
			     * @private
			     */;
			    _proto._poll = function _poll() {
			      this._polling = true;
			      this.doPoll();
			      this.emitReserved("poll");
			    }
			    /**
			     * Overloads onData to detect payloads.
			     *
			     * @protected
			     */;
			    _proto.onData = function onData(data) {
			      var _this3 = this;
			      var callback = function callback(packet) {
			        // if its the first message we consider the transport open
			        if ("opening" === _this3.readyState && packet.type === "open") {
			          _this3.onOpen();
			        }
			        // if its a close packet, we close the ongoing requests
			        if ("close" === packet.type) {
			          _this3.onClose({
			            description: "transport closed by the server"
			          });
			          return false;
			        }
			        // otherwise bypass onData and handle the message
			        _this3.onPacket(packet);
			      };
			      // decode payload
			      decodePayload(data, this.socket.binaryType).forEach(callback);
			      // if an event did not trigger closing
			      if ("closed" !== this.readyState) {
			        // if we got data we're not polling
			        this._polling = false;
			        this.emitReserved("pollComplete");
			        if ("open" === this.readyState) {
			          this._poll();
			        }
			      }
			    }
			    /**
			     * For polling, send a close packet.
			     *
			     * @protected
			     */;
			    _proto.doClose = function doClose() {
			      var _this4 = this;
			      var close = function close() {
			        _this4.write([{
			          type: "close"
			        }]);
			      };
			      if ("open" === this.readyState) {
			        close();
			      } else {
			        // in case we're trying to close while
			        // handshaking is in progress (GH-164)
			        this.once("open", close);
			      }
			    }
			    /**
			     * Writes a packets payload.
			     *
			     * @param {Array} packets - data packets
			     * @protected
			     */;
			    _proto.write = function write(packets) {
			      var _this5 = this;
			      this.writable = false;
			      encodePayload(packets, function (data) {
			        _this5.doWrite(data, function () {
			          _this5.writable = true;
			          _this5.emitReserved("drain");
			        });
			      });
			    }
			    /**
			     * Generates uri for connection.
			     *
			     * @private
			     */;
			    _proto.uri = function uri() {
			      var schema = this.opts.secure ? "https" : "http";
			      var query = this.query || {};
			      // cache busting is forced
			      if (false !== this.opts.timestampRequests) {
			        query[this.opts.timestampParam] = randomString();
			      }
			      if (!this.supportsBinary && !query.sid) {
			        query.b64 = 1;
			      }
			      return this.createUri(schema, query);
			    };
			    return _createClass(Polling, [{
			      key: "name",
			      get: function get() {
			        return "polling";
			      }
			    }]);
			  }(Transport);

			  // imported from https://github.com/component/has-cors
			  var value = false;
			  try {
			    value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
			  } catch (err) {
			    // if XMLHttp support is disabled in IE then it will throw
			    // when trying to create
			  }
			  var hasCORS = value;

			  function empty() {}
			  var BaseXHR = /*#__PURE__*/function (_Polling) {
			    /**
			     * XHR Polling constructor.
			     *
			     * @param {Object} opts
			     * @package
			     */
			    function BaseXHR(opts) {
			      var _this;
			      _this = _Polling.call(this, opts) || this;
			      if (typeof location !== "undefined") {
			        var isSSL = "https:" === location.protocol;
			        var port = location.port;
			        // some user agents have empty `location.port`
			        if (!port) {
			          port = isSSL ? "443" : "80";
			        }
			        _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
			      }
			      return _this;
			    }
			    /**
			     * Sends data.
			     *
			     * @param {String} data to send.
			     * @param {Function} called upon flush.
			     * @private
			     */
			    _inheritsLoose(BaseXHR, _Polling);
			    var _proto = BaseXHR.prototype;
			    _proto.doWrite = function doWrite(data, fn) {
			      var _this2 = this;
			      var req = this.request({
			        method: "POST",
			        data: data
			      });
			      req.on("success", fn);
			      req.on("error", function (xhrStatus, context) {
			        _this2.onError("xhr post error", xhrStatus, context);
			      });
			    }
			    /**
			     * Starts a poll cycle.
			     *
			     * @private
			     */;
			    _proto.doPoll = function doPoll() {
			      var _this3 = this;
			      var req = this.request();
			      req.on("data", this.onData.bind(this));
			      req.on("error", function (xhrStatus, context) {
			        _this3.onError("xhr poll error", xhrStatus, context);
			      });
			      this.pollXhr = req;
			    };
			    return BaseXHR;
			  }(Polling);
			  var Request = /*#__PURE__*/function (_Emitter) {
			    /**
			     * Request constructor
			     *
			     * @param {Object} options
			     * @package
			     */
			    function Request(createRequest, uri, opts) {
			      var _this4;
			      _this4 = _Emitter.call(this) || this;
			      _this4.createRequest = createRequest;
			      installTimerFunctions(_this4, opts);
			      _this4._opts = opts;
			      _this4._method = opts.method || "GET";
			      _this4._uri = uri;
			      _this4._data = undefined !== opts.data ? opts.data : null;
			      _this4._create();
			      return _this4;
			    }
			    /**
			     * Creates the XHR object and sends the request.
			     *
			     * @private
			     */
			    _inheritsLoose(Request, _Emitter);
			    var _proto2 = Request.prototype;
			    _proto2._create = function _create() {
			      var _this5 = this;
			      var _a;
			      var opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
			      opts.xdomain = !!this._opts.xd;
			      var xhr = this._xhr = this.createRequest(opts);
			      try {
			        xhr.open(this._method, this._uri, true);
			        try {
			          if (this._opts.extraHeaders) {
			            // @ts-ignore
			            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
			            for (var i in this._opts.extraHeaders) {
			              if (this._opts.extraHeaders.hasOwnProperty(i)) {
			                xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
			              }
			            }
			          }
			        } catch (e) {}
			        if ("POST" === this._method) {
			          try {
			            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
			          } catch (e) {}
			        }
			        try {
			          xhr.setRequestHeader("Accept", "*/*");
			        } catch (e) {}
			        (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
			        // ie6 check
			        if ("withCredentials" in xhr) {
			          xhr.withCredentials = this._opts.withCredentials;
			        }
			        if (this._opts.requestTimeout) {
			          xhr.timeout = this._opts.requestTimeout;
			        }
			        xhr.onreadystatechange = function () {
			          var _a;
			          if (xhr.readyState === 3) {
			            (_a = _this5._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
			            // @ts-ignore
			            xhr.getResponseHeader("set-cookie"));
			          }
			          if (4 !== xhr.readyState) return;
			          if (200 === xhr.status || 1223 === xhr.status) {
			            _this5._onLoad();
			          } else {
			            // make sure the `error` event handler that's user-set
			            // does not throw in the same tick and gets caught here
			            _this5.setTimeoutFn(function () {
			              _this5._onError(typeof xhr.status === "number" ? xhr.status : 0);
			            }, 0);
			          }
			        };
			        xhr.send(this._data);
			      } catch (e) {
			        // Need to defer since .create() is called directly from the constructor
			        // and thus the 'error' event can only be only bound *after* this exception
			        // occurs.  Therefore, also, we cannot throw here at all.
			        this.setTimeoutFn(function () {
			          _this5._onError(e);
			        }, 0);
			        return;
			      }
			      if (typeof document !== "undefined") {
			        this._index = Request.requestsCount++;
			        Request.requests[this._index] = this;
			      }
			    }
			    /**
			     * Called upon error.
			     *
			     * @private
			     */;
			    _proto2._onError = function _onError(err) {
			      this.emitReserved("error", err, this._xhr);
			      this._cleanup(true);
			    }
			    /**
			     * Cleans up house.
			     *
			     * @private
			     */;
			    _proto2._cleanup = function _cleanup(fromError) {
			      if ("undefined" === typeof this._xhr || null === this._xhr) {
			        return;
			      }
			      this._xhr.onreadystatechange = empty;
			      if (fromError) {
			        try {
			          this._xhr.abort();
			        } catch (e) {}
			      }
			      if (typeof document !== "undefined") {
			        delete Request.requests[this._index];
			      }
			      this._xhr = null;
			    }
			    /**
			     * Called upon load.
			     *
			     * @private
			     */;
			    _proto2._onLoad = function _onLoad() {
			      var data = this._xhr.responseText;
			      if (data !== null) {
			        this.emitReserved("data", data);
			        this.emitReserved("success");
			        this._cleanup();
			      }
			    }
			    /**
			     * Aborts the request.
			     *
			     * @package
			     */;
			    _proto2.abort = function abort() {
			      this._cleanup();
			    };
			    return Request;
			  }(Emitter);
			  Request.requestsCount = 0;
			  Request.requests = {};
			  /**
			   * Aborts pending requests when unloading the window. This is needed to prevent
			   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
			   * emitted.
			   */
			  if (typeof document !== "undefined") {
			    // @ts-ignore
			    if (typeof attachEvent === "function") {
			      // @ts-ignore
			      attachEvent("onunload", unloadHandler);
			    } else if (typeof addEventListener === "function") {
			      var terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
			      addEventListener(terminationEvent, unloadHandler, false);
			    }
			  }
			  function unloadHandler() {
			    for (var i in Request.requests) {
			      if (Request.requests.hasOwnProperty(i)) {
			        Request.requests[i].abort();
			      }
			    }
			  }
			  var hasXHR2 = function () {
			    var xhr = newRequest({
			      xdomain: false
			    });
			    return xhr && xhr.responseType !== null;
			  }();
			  /**
			   * HTTP long-polling based on the built-in `XMLHttpRequest` object.
			   *
			   * Usage: browser
			   *
			   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
			   */
			  var XHR = /*#__PURE__*/function (_BaseXHR) {
			    function XHR(opts) {
			      var _this6;
			      _this6 = _BaseXHR.call(this, opts) || this;
			      var forceBase64 = opts && opts.forceBase64;
			      _this6.supportsBinary = hasXHR2 && !forceBase64;
			      return _this6;
			    }
			    _inheritsLoose(XHR, _BaseXHR);
			    var _proto3 = XHR.prototype;
			    _proto3.request = function request() {
			      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			      _extends(opts, {
			        xd: this.xd
			      }, this.opts);
			      return new Request(newRequest, this.uri(), opts);
			    };
			    return XHR;
			  }(BaseXHR);
			  function newRequest(opts) {
			    var xdomain = opts.xdomain;
			    // XMLHttpRequest can be disabled on IE
			    try {
			      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
			        return new XMLHttpRequest();
			      }
			    } catch (e) {}
			    if (!xdomain) {
			      try {
			        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
			      } catch (e) {}
			    }
			  }

			  // detect ReactNative environment
			  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
			  var BaseWS = /*#__PURE__*/function (_Transport) {
			    function BaseWS() {
			      return _Transport.apply(this, arguments) || this;
			    }
			    _inheritsLoose(BaseWS, _Transport);
			    var _proto = BaseWS.prototype;
			    _proto.doOpen = function doOpen() {
			      var uri = this.uri();
			      var protocols = this.opts.protocols;
			      // React Native only supports the 'headers' option, and will print a warning if anything else is passed
			      var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
			      if (this.opts.extraHeaders) {
			        opts.headers = this.opts.extraHeaders;
			      }
			      try {
			        this.ws = this.createSocket(uri, protocols, opts);
			      } catch (err) {
			        return this.emitReserved("error", err);
			      }
			      this.ws.binaryType = this.socket.binaryType;
			      this.addEventListeners();
			    }
			    /**
			     * Adds event listeners to the socket
			     *
			     * @private
			     */;
			    _proto.addEventListeners = function addEventListeners() {
			      var _this = this;
			      this.ws.onopen = function () {
			        if (_this.opts.autoUnref) {
			          _this.ws._socket.unref();
			        }
			        _this.onOpen();
			      };
			      this.ws.onclose = function (closeEvent) {
			        return _this.onClose({
			          description: "websocket connection closed",
			          context: closeEvent
			        });
			      };
			      this.ws.onmessage = function (ev) {
			        return _this.onData(ev.data);
			      };
			      this.ws.onerror = function (e) {
			        return _this.onError("websocket error", e);
			      };
			    };
			    _proto.write = function write(packets) {
			      var _this2 = this;
			      this.writable = false;
			      // encodePacket efficient as it uses WS framing
			      // no need for encodePayload
			      var _loop = function _loop() {
			        var packet = packets[i];
			        var lastPacket = i === packets.length - 1;
			        encodePacket(packet, _this2.supportsBinary, function (data) {
			          // Sometimes the websocket has already been closed but the browser didn't
			          // have a chance of informing us about it yet, in that case send will
			          // throw an error
			          try {
			            _this2.doWrite(packet, data);
			          } catch (e) {}
			          if (lastPacket) {
			            // fake drain
			            // defer to next tick to allow Socket to clear writeBuffer
			            nextTick(function () {
			              _this2.writable = true;
			              _this2.emitReserved("drain");
			            }, _this2.setTimeoutFn);
			          }
			        });
			      };
			      for (var i = 0; i < packets.length; i++) {
			        _loop();
			      }
			    };
			    _proto.doClose = function doClose() {
			      if (typeof this.ws !== "undefined") {
			        this.ws.onerror = function () {};
			        this.ws.close();
			        this.ws = null;
			      }
			    }
			    /**
			     * Generates uri for connection.
			     *
			     * @private
			     */;
			    _proto.uri = function uri() {
			      var schema = this.opts.secure ? "wss" : "ws";
			      var query = this.query || {};
			      // append timestamp to URI
			      if (this.opts.timestampRequests) {
			        query[this.opts.timestampParam] = randomString();
			      }
			      // communicate binary support capabilities
			      if (!this.supportsBinary) {
			        query.b64 = 1;
			      }
			      return this.createUri(schema, query);
			    };
			    return _createClass(BaseWS, [{
			      key: "name",
			      get: function get() {
			        return "websocket";
			      }
			    }]);
			  }(Transport);
			  var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
			  /**
			   * WebSocket transport based on the built-in `WebSocket` object.
			   *
			   * Usage: browser, Node.js (since v21), Deno, Bun
			   *
			   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
			   * @see https://caniuse.com/mdn-api_websocket
			   * @see https://nodejs.org/api/globals.html#websocket
			   */
			  var WS = /*#__PURE__*/function (_BaseWS) {
			    function WS() {
			      return _BaseWS.apply(this, arguments) || this;
			    }
			    _inheritsLoose(WS, _BaseWS);
			    var _proto2 = WS.prototype;
			    _proto2.createSocket = function createSocket(uri, protocols, opts) {
			      return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
			    };
			    _proto2.doWrite = function doWrite(_packet, data) {
			      this.ws.send(data);
			    };
			    return WS;
			  }(BaseWS);

			  /**
			   * WebTransport transport based on the built-in `WebTransport` object.
			   *
			   * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
			   *
			   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
			   * @see https://caniuse.com/webtransport
			   */
			  var WT = /*#__PURE__*/function (_Transport) {
			    function WT() {
			      return _Transport.apply(this, arguments) || this;
			    }
			    _inheritsLoose(WT, _Transport);
			    var _proto = WT.prototype;
			    _proto.doOpen = function doOpen() {
			      var _this = this;
			      try {
			        // @ts-ignore
			        this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
			      } catch (err) {
			        return this.emitReserved("error", err);
			      }
			      this._transport.closed.then(function () {
			        _this.onClose();
			      })["catch"](function (err) {
			        _this.onError("webtransport error", err);
			      });
			      // note: we could have used async/await, but that would require some additional polyfills
			      this._transport.ready.then(function () {
			        _this._transport.createBidirectionalStream().then(function (stream) {
			          var decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, _this.socket.binaryType);
			          var reader = stream.readable.pipeThrough(decoderStream).getReader();
			          var encoderStream = createPacketEncoderStream();
			          encoderStream.readable.pipeTo(stream.writable);
			          _this._writer = encoderStream.writable.getWriter();
			          var read = function read() {
			            reader.read().then(function (_ref) {
			              var done = _ref.done,
			                value = _ref.value;
			              if (done) {
			                return;
			              }
			              _this.onPacket(value);
			              read();
			            })["catch"](function (err) {});
			          };
			          read();
			          var packet = {
			            type: "open"
			          };
			          if (_this.query.sid) {
			            packet.data = "{\"sid\":\"".concat(_this.query.sid, "\"}");
			          }
			          _this._writer.write(packet).then(function () {
			            return _this.onOpen();
			          });
			        });
			      });
			    };
			    _proto.write = function write(packets) {
			      var _this2 = this;
			      this.writable = false;
			      var _loop = function _loop() {
			        var packet = packets[i];
			        var lastPacket = i === packets.length - 1;
			        _this2._writer.write(packet).then(function () {
			          if (lastPacket) {
			            nextTick(function () {
			              _this2.writable = true;
			              _this2.emitReserved("drain");
			            }, _this2.setTimeoutFn);
			          }
			        });
			      };
			      for (var i = 0; i < packets.length; i++) {
			        _loop();
			      }
			    };
			    _proto.doClose = function doClose() {
			      var _a;
			      (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
			    };
			    return _createClass(WT, [{
			      key: "name",
			      get: function get() {
			        return "webtransport";
			      }
			    }]);
			  }(Transport);

			  var transports = {
			    websocket: WS,
			    webtransport: WT,
			    polling: XHR
			  };

			  // imported from https://github.com/galkn/parseuri
			  /**
			   * Parses a URI
			   *
			   * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
			   *
			   * See:
			   * - https://developer.mozilla.org/en-US/docs/Web/API/URL
			   * - https://caniuse.com/url
			   * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
			   *
			   * History of the parse() method:
			   * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
			   * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
			   * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
			   *
			   * @author Steven Levithan <stevenlevithan.com> (MIT license)
			   * @api private
			   */
			  var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
			  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
			  function parse(str) {
			    if (str.length > 8000) {
			      throw "URI too long";
			    }
			    var src = str,
			      b = str.indexOf('['),
			      e = str.indexOf(']');
			    if (b != -1 && e != -1) {
			      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
			    }
			    var m = re.exec(str || ''),
			      uri = {},
			      i = 14;
			    while (i--) {
			      uri[parts[i]] = m[i] || '';
			    }
			    if (b != -1 && e != -1) {
			      uri.source = src;
			      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
			      uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
			      uri.ipv6uri = true;
			    }
			    uri.pathNames = pathNames(uri, uri['path']);
			    uri.queryKey = queryKey(uri, uri['query']);
			    return uri;
			  }
			  function pathNames(obj, path) {
			    var regx = /\/{2,9}/g,
			      names = path.replace(regx, "/").split("/");
			    if (path.slice(0, 1) == '/' || path.length === 0) {
			      names.splice(0, 1);
			    }
			    if (path.slice(-1) == '/') {
			      names.splice(names.length - 1, 1);
			    }
			    return names;
			  }
			  function queryKey(uri, query) {
			    var data = {};
			    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
			      if ($1) {
			        data[$1] = $2;
			      }
			    });
			    return data;
			  }

			  var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
			  var OFFLINE_EVENT_LISTENERS = [];
			  if (withEventListeners) {
			    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
			    // script, so we create one single event listener here which will forward the event to the socket instances
			    addEventListener("offline", function () {
			      OFFLINE_EVENT_LISTENERS.forEach(function (listener) {
			        return listener();
			      });
			    }, false);
			  }
			  /**
			   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
			   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
			   *
			   * This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
			   * successfully establishes the connection.
			   *
			   * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
			   *
			   * @example
			   * import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
			   *
			   * const socket = new SocketWithoutUpgrade({
			   *   transports: [WebSocket]
			   * });
			   *
			   * socket.on("open", () => {
			   *   socket.send("hello");
			   * });
			   *
			   * @see SocketWithUpgrade
			   * @see Socket
			   */
			  var SocketWithoutUpgrade = /*#__PURE__*/function (_Emitter) {
			    /**
			     * Socket constructor.
			     *
			     * @param {String|Object} uri - uri or options
			     * @param {Object} opts - options
			     */
			    function SocketWithoutUpgrade(uri, opts) {
			      var _this;
			      _this = _Emitter.call(this) || this;
			      _this.binaryType = defaultBinaryType;
			      _this.writeBuffer = [];
			      _this._prevBufferLen = 0;
			      _this._pingInterval = -1;
			      _this._pingTimeout = -1;
			      _this._maxPayload = -1;
			      /**
			       * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
			       * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
			       */
			      _this._pingTimeoutTime = Infinity;
			      if (uri && "object" === _typeof(uri)) {
			        opts = uri;
			        uri = null;
			      }
			      if (uri) {
			        var parsedUri = parse(uri);
			        opts.hostname = parsedUri.host;
			        opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
			        opts.port = parsedUri.port;
			        if (parsedUri.query) opts.query = parsedUri.query;
			      } else if (opts.host) {
			        opts.hostname = parse(opts.host).host;
			      }
			      installTimerFunctions(_this, opts);
			      _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
			      if (opts.hostname && !opts.port) {
			        // if no port is specified manually, use the protocol default
			        opts.port = _this.secure ? "443" : "80";
			      }
			      _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
			      _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
			      _this.transports = [];
			      _this._transportsByName = {};
			      opts.transports.forEach(function (t) {
			        var transportName = t.prototype.name;
			        _this.transports.push(transportName);
			        _this._transportsByName[transportName] = t;
			      });
			      _this.opts = _extends({
			        path: "/engine.io",
			        agent: false,
			        withCredentials: false,
			        upgrade: true,
			        timestampParam: "t",
			        rememberUpgrade: false,
			        addTrailingSlash: true,
			        rejectUnauthorized: true,
			        perMessageDeflate: {
			          threshold: 1024
			        },
			        transportOptions: {},
			        closeOnBeforeunload: false
			      }, opts);
			      _this.opts.path = _this.opts.path.replace(/\/$/, "") + (_this.opts.addTrailingSlash ? "/" : "");
			      if (typeof _this.opts.query === "string") {
			        _this.opts.query = decode(_this.opts.query);
			      }
			      if (withEventListeners) {
			        if (_this.opts.closeOnBeforeunload) {
			          // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
			          // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
			          // closed/reloaded)
			          _this._beforeunloadEventListener = function () {
			            if (_this.transport) {
			              // silently close the transport
			              _this.transport.removeAllListeners();
			              _this.transport.close();
			            }
			          };
			          addEventListener("beforeunload", _this._beforeunloadEventListener, false);
			        }
			        if (_this.hostname !== "localhost") {
			          _this._offlineEventListener = function () {
			            _this._onClose("transport close", {
			              description: "network connection lost"
			            });
			          };
			          OFFLINE_EVENT_LISTENERS.push(_this._offlineEventListener);
			        }
			      }
			      if (_this.opts.withCredentials) {
			        _this._cookieJar = createCookieJar();
			      }
			      _this._open();
			      return _this;
			    }
			    /**
			     * Creates transport of the given type.
			     *
			     * @param {String} name - transport name
			     * @return {Transport}
			     * @private
			     */
			    _inheritsLoose(SocketWithoutUpgrade, _Emitter);
			    var _proto = SocketWithoutUpgrade.prototype;
			    _proto.createTransport = function createTransport(name) {
			      var query = _extends({}, this.opts.query);
			      // append engine.io protocol identifier
			      query.EIO = protocol$1;
			      // transport name
			      query.transport = name;
			      // session id if we already have one
			      if (this.id) query.sid = this.id;
			      var opts = _extends({}, this.opts, {
			        query: query,
			        socket: this,
			        hostname: this.hostname,
			        secure: this.secure,
			        port: this.port
			      }, this.opts.transportOptions[name]);
			      return new this._transportsByName[name](opts);
			    }
			    /**
			     * Initializes transport to use and starts probe.
			     *
			     * @private
			     */;
			    _proto._open = function _open() {
			      var _this2 = this;
			      if (this.transports.length === 0) {
			        // Emit error on next tick so it can be listened to
			        this.setTimeoutFn(function () {
			          _this2.emitReserved("error", "No transports available");
			        }, 0);
			        return;
			      }
			      var transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
			      this.readyState = "opening";
			      var transport = this.createTransport(transportName);
			      transport.open();
			      this.setTransport(transport);
			    }
			    /**
			     * Sets the current transport. Disables the existing one (if any).
			     *
			     * @private
			     */;
			    _proto.setTransport = function setTransport(transport) {
			      var _this3 = this;
			      if (this.transport) {
			        this.transport.removeAllListeners();
			      }
			      // set up transport
			      this.transport = transport;
			      // set up transport listeners
			      transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", function (reason) {
			        return _this3._onClose("transport close", reason);
			      });
			    }
			    /**
			     * Called when connection is deemed open.
			     *
			     * @private
			     */;
			    _proto.onOpen = function onOpen() {
			      this.readyState = "open";
			      SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
			      this.emitReserved("open");
			      this.flush();
			    }
			    /**
			     * Handles a packet.
			     *
			     * @private
			     */;
			    _proto._onPacket = function _onPacket(packet) {
			      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			        this.emitReserved("packet", packet);
			        // Socket is live - any packet counts
			        this.emitReserved("heartbeat");
			        switch (packet.type) {
			          case "open":
			            this.onHandshake(JSON.parse(packet.data));
			            break;
			          case "ping":
			            this._sendPacket("pong");
			            this.emitReserved("ping");
			            this.emitReserved("pong");
			            this._resetPingTimeout();
			            break;
			          case "error":
			            var err = new Error("server error");
			            // @ts-ignore
			            err.code = packet.data;
			            this._onError(err);
			            break;
			          case "message":
			            this.emitReserved("data", packet.data);
			            this.emitReserved("message", packet.data);
			            break;
			        }
			      }
			    }
			    /**
			     * Called upon handshake completion.
			     *
			     * @param {Object} data - handshake obj
			     * @private
			     */;
			    _proto.onHandshake = function onHandshake(data) {
			      this.emitReserved("handshake", data);
			      this.id = data.sid;
			      this.transport.query.sid = data.sid;
			      this._pingInterval = data.pingInterval;
			      this._pingTimeout = data.pingTimeout;
			      this._maxPayload = data.maxPayload;
			      this.onOpen();
			      // In case open handler closes socket
			      if ("closed" === this.readyState) return;
			      this._resetPingTimeout();
			    }
			    /**
			     * Sets and resets ping timeout timer based on server pings.
			     *
			     * @private
			     */;
			    _proto._resetPingTimeout = function _resetPingTimeout() {
			      var _this4 = this;
			      this.clearTimeoutFn(this._pingTimeoutTimer);
			      var delay = this._pingInterval + this._pingTimeout;
			      this._pingTimeoutTime = Date.now() + delay;
			      this._pingTimeoutTimer = this.setTimeoutFn(function () {
			        _this4._onClose("ping timeout");
			      }, delay);
			      if (this.opts.autoUnref) {
			        this._pingTimeoutTimer.unref();
			      }
			    }
			    /**
			     * Called on `drain` event
			     *
			     * @private
			     */;
			    _proto._onDrain = function _onDrain() {
			      this.writeBuffer.splice(0, this._prevBufferLen);
			      // setting prevBufferLen = 0 is very important
			      // for example, when upgrading, upgrade packet is sent over,
			      // and a nonzero prevBufferLen could cause problems on `drain`
			      this._prevBufferLen = 0;
			      if (0 === this.writeBuffer.length) {
			        this.emitReserved("drain");
			      } else {
			        this.flush();
			      }
			    }
			    /**
			     * Flush write buffers.
			     *
			     * @private
			     */;
			    _proto.flush = function flush() {
			      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			        var packets = this._getWritablePackets();
			        this.transport.send(packets);
			        // keep track of current length of writeBuffer
			        // splice writeBuffer and callbackBuffer on `drain`
			        this._prevBufferLen = packets.length;
			        this.emitReserved("flush");
			      }
			    }
			    /**
			     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
			     * long-polling)
			     *
			     * @private
			     */;
			    _proto._getWritablePackets = function _getWritablePackets() {
			      var shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
			      if (!shouldCheckPayloadSize) {
			        return this.writeBuffer;
			      }
			      var payloadSize = 1; // first packet type
			      for (var i = 0; i < this.writeBuffer.length; i++) {
			        var data = this.writeBuffer[i].data;
			        if (data) {
			          payloadSize += byteLength(data);
			        }
			        if (i > 0 && payloadSize > this._maxPayload) {
			          return this.writeBuffer.slice(0, i);
			        }
			        payloadSize += 2; // separator + packet type
			      }
			      return this.writeBuffer;
			    }
			    /**
			     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
			     *
			     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
			     * `write()` method then the message would not be buffered by the Socket.IO client.
			     *
			     * @return {boolean}
			     * @private
			     */
			    /* private */;
			    _proto._hasPingExpired = function _hasPingExpired() {
			      var _this5 = this;
			      if (!this._pingTimeoutTime) return true;
			      var hasExpired = Date.now() > this._pingTimeoutTime;
			      if (hasExpired) {
			        this._pingTimeoutTime = 0;
			        nextTick(function () {
			          _this5._onClose("ping timeout");
			        }, this.setTimeoutFn);
			      }
			      return hasExpired;
			    }
			    /**
			     * Sends a message.
			     *
			     * @param {String} msg - message.
			     * @param {Object} options.
			     * @param {Function} fn - callback function.
			     * @return {Socket} for chaining.
			     */;
			    _proto.write = function write(msg, options, fn) {
			      this._sendPacket("message", msg, options, fn);
			      return this;
			    }
			    /**
			     * Sends a message. Alias of {@link Socket#write}.
			     *
			     * @param {String} msg - message.
			     * @param {Object} options.
			     * @param {Function} fn - callback function.
			     * @return {Socket} for chaining.
			     */;
			    _proto.send = function send(msg, options, fn) {
			      this._sendPacket("message", msg, options, fn);
			      return this;
			    }
			    /**
			     * Sends a packet.
			     *
			     * @param {String} type: packet type.
			     * @param {String} data.
			     * @param {Object} options.
			     * @param {Function} fn - callback function.
			     * @private
			     */;
			    _proto._sendPacket = function _sendPacket(type, data, options, fn) {
			      if ("function" === typeof data) {
			        fn = data;
			        data = undefined;
			      }
			      if ("function" === typeof options) {
			        fn = options;
			        options = null;
			      }
			      if ("closing" === this.readyState || "closed" === this.readyState) {
			        return;
			      }
			      options = options || {};
			      options.compress = false !== options.compress;
			      var packet = {
			        type: type,
			        data: data,
			        options: options
			      };
			      this.emitReserved("packetCreate", packet);
			      this.writeBuffer.push(packet);
			      if (fn) this.once("flush", fn);
			      this.flush();
			    }
			    /**
			     * Closes the connection.
			     */;
			    _proto.close = function close() {
			      var _this6 = this;
			      var close = function close() {
			        _this6._onClose("forced close");
			        _this6.transport.close();
			      };
			      var cleanupAndClose = function cleanupAndClose() {
			        _this6.off("upgrade", cleanupAndClose);
			        _this6.off("upgradeError", cleanupAndClose);
			        close();
			      };
			      var waitForUpgrade = function waitForUpgrade() {
			        // wait for upgrade to finish since we can't send packets while pausing a transport
			        _this6.once("upgrade", cleanupAndClose);
			        _this6.once("upgradeError", cleanupAndClose);
			      };
			      if ("opening" === this.readyState || "open" === this.readyState) {
			        this.readyState = "closing";
			        if (this.writeBuffer.length) {
			          this.once("drain", function () {
			            if (_this6.upgrading) {
			              waitForUpgrade();
			            } else {
			              close();
			            }
			          });
			        } else if (this.upgrading) {
			          waitForUpgrade();
			        } else {
			          close();
			        }
			      }
			      return this;
			    }
			    /**
			     * Called upon transport error
			     *
			     * @private
			     */;
			    _proto._onError = function _onError(err) {
			      SocketWithoutUpgrade.priorWebsocketSuccess = false;
			      if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
			        this.transports.shift();
			        return this._open();
			      }
			      this.emitReserved("error", err);
			      this._onClose("transport error", err);
			    }
			    /**
			     * Called upon transport close.
			     *
			     * @private
			     */;
			    _proto._onClose = function _onClose(reason, description) {
			      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			        // clear timers
			        this.clearTimeoutFn(this._pingTimeoutTimer);
			        // stop event from firing again for transport
			        this.transport.removeAllListeners("close");
			        // ensure transport won't stay open
			        this.transport.close();
			        // ignore further transport communication
			        this.transport.removeAllListeners();
			        if (withEventListeners) {
			          if (this._beforeunloadEventListener) {
			            removeEventListener("beforeunload", this._beforeunloadEventListener, false);
			          }
			          if (this._offlineEventListener) {
			            var i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
			            if (i !== -1) {
			              OFFLINE_EVENT_LISTENERS.splice(i, 1);
			            }
			          }
			        }
			        // set ready state
			        this.readyState = "closed";
			        // clear session id
			        this.id = null;
			        // emit close event
			        this.emitReserved("close", reason, description);
			        // clean buffers after, so users can still
			        // grab the buffers on `close` event
			        this.writeBuffer = [];
			        this._prevBufferLen = 0;
			      }
			    };
			    return SocketWithoutUpgrade;
			  }(Emitter);
			  SocketWithoutUpgrade.protocol = protocol$1;
			  /**
			   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
			   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
			   *
			   * This class comes with an upgrade mechanism, which means that once the connection is established with the first
			   * low-level transport, it will try to upgrade to a better transport.
			   *
			   * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
			   *
			   * @example
			   * import { SocketWithUpgrade, WebSocket } from "engine.io-client";
			   *
			   * const socket = new SocketWithUpgrade({
			   *   transports: [WebSocket]
			   * });
			   *
			   * socket.on("open", () => {
			   *   socket.send("hello");
			   * });
			   *
			   * @see SocketWithoutUpgrade
			   * @see Socket
			   */
			  var SocketWithUpgrade = /*#__PURE__*/function (_SocketWithoutUpgrade) {
			    function SocketWithUpgrade() {
			      var _this7;
			      _this7 = _SocketWithoutUpgrade.apply(this, arguments) || this;
			      _this7._upgrades = [];
			      return _this7;
			    }
			    _inheritsLoose(SocketWithUpgrade, _SocketWithoutUpgrade);
			    var _proto2 = SocketWithUpgrade.prototype;
			    _proto2.onOpen = function onOpen() {
			      _SocketWithoutUpgrade.prototype.onOpen.call(this);
			      if ("open" === this.readyState && this.opts.upgrade) {
			        for (var i = 0; i < this._upgrades.length; i++) {
			          this._probe(this._upgrades[i]);
			        }
			      }
			    }
			    /**
			     * Probes a transport.
			     *
			     * @param {String} name - transport name
			     * @private
			     */;
			    _proto2._probe = function _probe(name) {
			      var _this8 = this;
			      var transport = this.createTransport(name);
			      var failed = false;
			      SocketWithoutUpgrade.priorWebsocketSuccess = false;
			      var onTransportOpen = function onTransportOpen() {
			        if (failed) return;
			        transport.send([{
			          type: "ping",
			          data: "probe"
			        }]);
			        transport.once("packet", function (msg) {
			          if (failed) return;
			          if ("pong" === msg.type && "probe" === msg.data) {
			            _this8.upgrading = true;
			            _this8.emitReserved("upgrading", transport);
			            if (!transport) return;
			            SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
			            _this8.transport.pause(function () {
			              if (failed) return;
			              if ("closed" === _this8.readyState) return;
			              cleanup();
			              _this8.setTransport(transport);
			              transport.send([{
			                type: "upgrade"
			              }]);
			              _this8.emitReserved("upgrade", transport);
			              transport = null;
			              _this8.upgrading = false;
			              _this8.flush();
			            });
			          } else {
			            var err = new Error("probe error");
			            // @ts-ignore
			            err.transport = transport.name;
			            _this8.emitReserved("upgradeError", err);
			          }
			        });
			      };
			      function freezeTransport() {
			        if (failed) return;
			        // Any callback called by transport should be ignored since now
			        failed = true;
			        cleanup();
			        transport.close();
			        transport = null;
			      }
			      // Handle any error that happens while probing
			      var onerror = function onerror(err) {
			        var error = new Error("probe error: " + err);
			        // @ts-ignore
			        error.transport = transport.name;
			        freezeTransport();
			        _this8.emitReserved("upgradeError", error);
			      };
			      function onTransportClose() {
			        onerror("transport closed");
			      }
			      // When the socket is closed while we're probing
			      function onclose() {
			        onerror("socket closed");
			      }
			      // When the socket is upgraded while we're probing
			      function onupgrade(to) {
			        if (transport && to.name !== transport.name) {
			          freezeTransport();
			        }
			      }
			      // Remove all listeners on the transport and on self
			      var cleanup = function cleanup() {
			        transport.removeListener("open", onTransportOpen);
			        transport.removeListener("error", onerror);
			        transport.removeListener("close", onTransportClose);
			        _this8.off("close", onclose);
			        _this8.off("upgrading", onupgrade);
			      };
			      transport.once("open", onTransportOpen);
			      transport.once("error", onerror);
			      transport.once("close", onTransportClose);
			      this.once("close", onclose);
			      this.once("upgrading", onupgrade);
			      if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
			        // favor WebTransport
			        this.setTimeoutFn(function () {
			          if (!failed) {
			            transport.open();
			          }
			        }, 200);
			      } else {
			        transport.open();
			      }
			    };
			    _proto2.onHandshake = function onHandshake(data) {
			      this._upgrades = this._filterUpgrades(data.upgrades);
			      _SocketWithoutUpgrade.prototype.onHandshake.call(this, data);
			    }
			    /**
			     * Filters upgrades, returning only those matching client transports.
			     *
			     * @param {Array} upgrades - server upgrades
			     * @private
			     */;
			    _proto2._filterUpgrades = function _filterUpgrades(upgrades) {
			      var filteredUpgrades = [];
			      for (var i = 0; i < upgrades.length; i++) {
			        if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
			      }
			      return filteredUpgrades;
			    };
			    return SocketWithUpgrade;
			  }(SocketWithoutUpgrade);
			  /**
			   * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
			   * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
			   *
			   * This class comes with an upgrade mechanism, which means that once the connection is established with the first
			   * low-level transport, it will try to upgrade to a better transport.
			   *
			   * @example
			   * import { Socket } from "engine.io-client";
			   *
			   * const socket = new Socket();
			   *
			   * socket.on("open", () => {
			   *   socket.send("hello");
			   * });
			   *
			   * @see SocketWithoutUpgrade
			   * @see SocketWithUpgrade
			   */
			  var Socket$1 = /*#__PURE__*/function (_SocketWithUpgrade) {
			    function Socket(uri) {
			      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			      var o = _typeof(uri) === "object" ? uri : opts;
			      if (!o.transports || o.transports && typeof o.transports[0] === "string") {
			        o.transports = (o.transports || ["polling", "websocket", "webtransport"]).map(function (transportName) {
			          return transports[transportName];
			        }).filter(function (t) {
			          return !!t;
			        });
			      }
			      return _SocketWithUpgrade.call(this, uri, o) || this;
			    }
			    _inheritsLoose(Socket, _SocketWithUpgrade);
			    return Socket;
			  }(SocketWithUpgrade);

			  Socket$1.protocol;

			  function getDefaultExportFromCjs (x) {
			  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
			  }

			  var browser = {exports: {}};

			  var ms;
			  var hasRequiredMs;
			  function requireMs() {
			    if (hasRequiredMs) return ms;
			    hasRequiredMs = 1;
			    var s = 1000;
			    var m = s * 60;
			    var h = m * 60;
			    var d = h * 24;
			    var w = d * 7;
			    var y = d * 365.25;

			    /**
			     * Parse or format the given `val`.
			     *
			     * Options:
			     *
			     *  - `long` verbose formatting [false]
			     *
			     * @param {String|Number} val
			     * @param {Object} [options]
			     * @throws {Error} throw an error if val is not a non-empty string or a number
			     * @return {String|Number}
			     * @api public
			     */

			    ms = function ms(val, options) {
			      options = options || {};
			      var type = _typeof(val);
			      if (type === 'string' && val.length > 0) {
			        return parse(val);
			      } else if (type === 'number' && isFinite(val)) {
			        return options["long"] ? fmtLong(val) : fmtShort(val);
			      }
			      throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
			    };

			    /**
			     * Parse the given `str` and return milliseconds.
			     *
			     * @param {String} str
			     * @return {Number}
			     * @api private
			     */

			    function parse(str) {
			      str = String(str);
			      if (str.length > 100) {
			        return;
			      }
			      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
			      if (!match) {
			        return;
			      }
			      var n = parseFloat(match[1]);
			      var type = (match[2] || 'ms').toLowerCase();
			      switch (type) {
			        case 'years':
			        case 'year':
			        case 'yrs':
			        case 'yr':
			        case 'y':
			          return n * y;
			        case 'weeks':
			        case 'week':
			        case 'w':
			          return n * w;
			        case 'days':
			        case 'day':
			        case 'd':
			          return n * d;
			        case 'hours':
			        case 'hour':
			        case 'hrs':
			        case 'hr':
			        case 'h':
			          return n * h;
			        case 'minutes':
			        case 'minute':
			        case 'mins':
			        case 'min':
			        case 'm':
			          return n * m;
			        case 'seconds':
			        case 'second':
			        case 'secs':
			        case 'sec':
			        case 's':
			          return n * s;
			        case 'milliseconds':
			        case 'millisecond':
			        case 'msecs':
			        case 'msec':
			        case 'ms':
			          return n;
			        default:
			          return undefined;
			      }
			    }

			    /**
			     * Short format for `ms`.
			     *
			     * @param {Number} ms
			     * @return {String}
			     * @api private
			     */

			    function fmtShort(ms) {
			      var msAbs = Math.abs(ms);
			      if (msAbs >= d) {
			        return Math.round(ms / d) + 'd';
			      }
			      if (msAbs >= h) {
			        return Math.round(ms / h) + 'h';
			      }
			      if (msAbs >= m) {
			        return Math.round(ms / m) + 'm';
			      }
			      if (msAbs >= s) {
			        return Math.round(ms / s) + 's';
			      }
			      return ms + 'ms';
			    }

			    /**
			     * Long format for `ms`.
			     *
			     * @param {Number} ms
			     * @return {String}
			     * @api private
			     */

			    function fmtLong(ms) {
			      var msAbs = Math.abs(ms);
			      if (msAbs >= d) {
			        return plural(ms, msAbs, d, 'day');
			      }
			      if (msAbs >= h) {
			        return plural(ms, msAbs, h, 'hour');
			      }
			      if (msAbs >= m) {
			        return plural(ms, msAbs, m, 'minute');
			      }
			      if (msAbs >= s) {
			        return plural(ms, msAbs, s, 'second');
			      }
			      return ms + ' ms';
			    }

			    /**
			     * Pluralization helper.
			     */

			    function plural(ms, msAbs, n, name) {
			      var isPlural = msAbs >= n * 1.5;
			      return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
			    }
			    return ms;
			  }

			  /**
			   * This is the common logic for both the Node.js and web browser
			   * implementations of `debug()`.
			   */

			  function setup(env) {
			    createDebug.debug = createDebug;
			    createDebug["default"] = createDebug;
			    createDebug.coerce = coerce;
			    createDebug.disable = disable;
			    createDebug.enable = enable;
			    createDebug.enabled = enabled;
			    createDebug.humanize = requireMs();
			    createDebug.destroy = destroy;
			    Object.keys(env).forEach(function (key) {
			      createDebug[key] = env[key];
			    });

			    /**
			    * The currently active debug mode names, and names to skip.
			    */

			    createDebug.names = [];
			    createDebug.skips = [];

			    /**
			    * Map of special "%n" handling functions, for the debug "format" argument.
			    *
			    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			    */
			    createDebug.formatters = {};

			    /**
			    * Selects a color for a debug namespace
			    * @param {String} namespace The namespace string for the debug instance to be colored
			    * @return {Number|String} An ANSI color code for the given namespace
			    * @api private
			    */
			    function selectColor(namespace) {
			      var hash = 0;
			      for (var i = 0; i < namespace.length; i++) {
			        hash = (hash << 5) - hash + namespace.charCodeAt(i);
			        hash |= 0; // Convert to 32bit integer
			      }
			      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			    }
			    createDebug.selectColor = selectColor;

			    /**
			    * Create a debugger with the given `namespace`.
			    *
			    * @param {String} namespace
			    * @return {Function}
			    * @api public
			    */
			    function createDebug(namespace) {
			      var prevTime;
			      var enableOverride = null;
			      var namespacesCache;
			      var enabledCache;
			      function debug() {
			        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			          args[_key] = arguments[_key];
			        }
			        // Disabled?
			        if (!debug.enabled) {
			          return;
			        }
			        var self = debug;

			        // Set `diff` timestamp
			        var curr = Number(new Date());
			        var ms = curr - (prevTime || curr);
			        self.diff = ms;
			        self.prev = prevTime;
			        self.curr = curr;
			        prevTime = curr;
			        args[0] = createDebug.coerce(args[0]);
			        if (typeof args[0] !== 'string') {
			          // Anything else let's inspect with %O
			          args.unshift('%O');
			        }

			        // Apply any `formatters` transformations
			        var index = 0;
			        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
			          // If we encounter an escaped % then don't increase the array index
			          if (match === '%%') {
			            return '%';
			          }
			          index++;
			          var formatter = createDebug.formatters[format];
			          if (typeof formatter === 'function') {
			            var val = args[index];
			            match = formatter.call(self, val);

			            // Now we need to remove `args[index]` since it's inlined in the `format`
			            args.splice(index, 1);
			            index--;
			          }
			          return match;
			        });

			        // Apply env-specific formatting (colors, etc.)
			        createDebug.formatArgs.call(self, args);
			        var logFn = self.log || createDebug.log;
			        logFn.apply(self, args);
			      }
			      debug.namespace = namespace;
			      debug.useColors = createDebug.useColors();
			      debug.color = createDebug.selectColor(namespace);
			      debug.extend = extend;
			      debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			      Object.defineProperty(debug, 'enabled', {
			        enumerable: true,
			        configurable: false,
			        get: function get() {
			          if (enableOverride !== null) {
			            return enableOverride;
			          }
			          if (namespacesCache !== createDebug.namespaces) {
			            namespacesCache = createDebug.namespaces;
			            enabledCache = createDebug.enabled(namespace);
			          }
			          return enabledCache;
			        },
			        set: function set(v) {
			          enableOverride = v;
			        }
			      });

			      // Env-specific initialization logic for debug instances
			      if (typeof createDebug.init === 'function') {
			        createDebug.init(debug);
			      }
			      return debug;
			    }
			    function extend(namespace, delimiter) {
			      var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			      newDebug.log = this.log;
			      return newDebug;
			    }

			    /**
			    * Enables a debug mode by namespaces. This can include modes
			    * separated by a colon and wildcards.
			    *
			    * @param {String} namespaces
			    * @api public
			    */
			    function enable(namespaces) {
			      createDebug.save(namespaces);
			      createDebug.namespaces = namespaces;
			      createDebug.names = [];
			      createDebug.skips = [];
			      var i;
			      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			      var len = split.length;
			      for (i = 0; i < len; i++) {
			        if (!split[i]) {
			          // ignore empty strings
			          continue;
			        }
			        namespaces = split[i].replace(/\*/g, '.*?');
			        if (namespaces[0] === '-') {
			          createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			        } else {
			          createDebug.names.push(new RegExp('^' + namespaces + '$'));
			        }
			      }
			    }

			    /**
			    * Disable debug output.
			    *
			    * @return {String} namespaces
			    * @api public
			    */
			    function disable() {
			      var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
			        return '-' + namespace;
			      }))).join(',');
			      createDebug.enable('');
			      return namespaces;
			    }

			    /**
			    * Returns true if the given mode name is enabled, false otherwise.
			    *
			    * @param {String} name
			    * @return {Boolean}
			    * @api public
			    */
			    function enabled(name) {
			      if (name[name.length - 1] === '*') {
			        return true;
			      }
			      var i;
			      var len;
			      for (i = 0, len = createDebug.skips.length; i < len; i++) {
			        if (createDebug.skips[i].test(name)) {
			          return false;
			        }
			      }
			      for (i = 0, len = createDebug.names.length; i < len; i++) {
			        if (createDebug.names[i].test(name)) {
			          return true;
			        }
			      }
			      return false;
			    }

			    /**
			    * Convert regexp to namespace
			    *
			    * @param {RegExp} regxep
			    * @return {String} namespace
			    * @api private
			    */
			    function toNamespace(regexp) {
			      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
			    }

			    /**
			    * Coerce `val`.
			    *
			    * @param {Mixed} val
			    * @return {Mixed}
			    * @api private
			    */
			    function coerce(val) {
			      if (val instanceof Error) {
			        return val.stack || val.message;
			      }
			      return val;
			    }

			    /**
			    * XXX DO NOT USE. This is a temporary stub function.
			    * XXX It WILL be removed in the next major release.
			    */
			    function destroy() {
			      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			    }
			    createDebug.enable(createDebug.load());
			    return createDebug;
			  }
			  var common = setup;
			  (function (module, exports) {
			    /**
			     * This is the web browser implementation of `debug()`.
			     */

			    exports.formatArgs = formatArgs;
			    exports.save = save;
			    exports.load = load;
			    exports.useColors = useColors;
			    exports.storage = localstorage();
			    exports.destroy = function () {
			      var warned = false;
			      return function () {
			        if (!warned) {
			          warned = true;
			          console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			        }
			      };
			    }();

			    /**
			     * Colors.
			     */

			    exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

			    /**
			     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			     * and the Firebug extension (any Firefox version) are known
			     * to support "%c" CSS customizations.
			     *
			     * TODO: add a `localStorage` variable to explicitly enable/disable colors
			     */

			    // eslint-disable-next-line complexity
			    function useColors() {
			      // NB: In an Electron preload script, document will be defined but not fully
			      // initialized. Since we know we're in Chrome, we'll just detect this case
			      // explicitly
			      if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
			        return true;
			      }

			      // Internet Explorer and Edge do not support colors.
			      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
			        return false;
			      }

			      // Is webkit? http://stackoverflow.com/a/16459606/376773
			      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
			      // Is firebug? http://stackoverflow.com/a/398120/376773
			      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
			      // Is firefox >= v31?
			      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
			      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
			      // Double check webkit in userAgent just in case we are in a worker
			      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
			    }

			    /**
			     * Colorize log arguments if enabled.
			     *
			     * @api public
			     */

			    function formatArgs(args) {
			      args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
			      if (!this.useColors) {
			        return;
			      }
			      var c = 'color: ' + this.color;
			      args.splice(1, 0, c, 'color: inherit');

			      // The final "%c" is somewhat tricky, because there could be other
			      // arguments passed either before or after the %c, so we need to
			      // figure out the correct index to insert the CSS into
			      var index = 0;
			      var lastC = 0;
			      args[0].replace(/%[a-zA-Z%]/g, function (match) {
			        if (match === '%%') {
			          return;
			        }
			        index++;
			        if (match === '%c') {
			          // We only are interested in the *last* %c
			          // (the user may have provided their own)
			          lastC = index;
			        }
			      });
			      args.splice(lastC, 0, c);
			    }

			    /**
			     * Invokes `console.debug()` when available.
			     * No-op when `console.debug` is not a "function".
			     * If `console.debug` is not available, falls back
			     * to `console.log`.
			     *
			     * @api public
			     */
			    exports.log = console.debug || console.log || function () {};

			    /**
			     * Save `namespaces`.
			     *
			     * @param {String} namespaces
			     * @api private
			     */
			    function save(namespaces) {
			      try {
			        if (namespaces) {
			          exports.storage.setItem('debug', namespaces);
			        } else {
			          exports.storage.removeItem('debug');
			        }
			      } catch (error) {
			        // Swallow
			        // XXX (@Qix-) should we be logging these?
			      }
			    }

			    /**
			     * Load `namespaces`.
			     *
			     * @return {String} returns the previously persisted debug modes
			     * @api private
			     */
			    function load() {
			      var r;
			      try {
			        r = exports.storage.getItem('debug');
			      } catch (error) {
			        // Swallow
			        // XXX (@Qix-) should we be logging these?
			      }

			      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			      if (!r && typeof process !== 'undefined' && 'env' in process) {
			        r = process.env.DEBUG;
			      }
			      return r;
			    }

			    /**
			     * Localstorage attempts to return the localstorage.
			     *
			     * This is necessary because safari throws
			     * when a user disables cookies/localstorage
			     * and you attempt to access it.
			     *
			     * @return {LocalStorage}
			     * @api private
			     */

			    function localstorage() {
			      try {
			        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
			        // The Browser also has localStorage in the global context.
			        return localStorage;
			      } catch (error) {
			        // Swallow
			        // XXX (@Qix-) should we be logging these?
			      }
			    }
			    module.exports = common(exports);
			    var formatters = module.exports.formatters;

			    /**
			     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			     */

			    formatters.j = function (v) {
			      try {
			        return JSON.stringify(v);
			      } catch (error) {
			        return '[UnexpectedJSONParseError]: ' + error.message;
			      }
			    };
			  })(browser, browser.exports);
			  var browserExports = browser.exports;
			  var debugModule = /*@__PURE__*/getDefaultExportFromCjs(browserExports);

			  var debug$3 = debugModule("socket.io-client:url"); // debug()
			  /**
			   * URL parser.
			   *
			   * @param uri - url
			   * @param path - the request path of the connection
			   * @param loc - An object meant to mimic window.location.
			   *        Defaults to window.location.
			   * @public
			   */
			  function url(uri) {
			    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
			    var loc = arguments.length > 2 ? arguments[2] : undefined;
			    var obj = uri;
			    // default to window.location
			    loc = loc || typeof location !== "undefined" && location;
			    if (null == uri) uri = loc.protocol + "//" + loc.host;
			    // relative path support
			    if (typeof uri === "string") {
			      if ("/" === uri.charAt(0)) {
			        if ("/" === uri.charAt(1)) {
			          uri = loc.protocol + uri;
			        } else {
			          uri = loc.host + uri;
			        }
			      }
			      if (!/^(https?|wss?):\/\//.test(uri)) {
			        debug$3("protocol-less url %s", uri);
			        if ("undefined" !== typeof loc) {
			          uri = loc.protocol + "//" + uri;
			        } else {
			          uri = "https://" + uri;
			        }
			      }
			      // parse
			      debug$3("parse %s", uri);
			      obj = parse(uri);
			    }
			    // make sure we treat `localhost:80` and `localhost` equally
			    if (!obj.port) {
			      if (/^(http|ws)$/.test(obj.protocol)) {
			        obj.port = "80";
			      } else if (/^(http|ws)s$/.test(obj.protocol)) {
			        obj.port = "443";
			      }
			    }
			    obj.path = obj.path || "/";
			    var ipv6 = obj.host.indexOf(":") !== -1;
			    var host = ipv6 ? "[" + obj.host + "]" : obj.host;
			    // define unique id
			    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
			    // define href
			    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
			    return obj;
			  }

			  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
			  var isView = function isView(obj) {
			    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
			  };
			  var toString = Object.prototype.toString;
			  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
			  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
			  /**
			   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
			   *
			   * @private
			   */
			  function isBinary(obj) {
			    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
			  }
			  function hasBinary(obj, toJSON) {
			    if (!obj || _typeof(obj) !== "object") {
			      return false;
			    }
			    if (Array.isArray(obj)) {
			      for (var i = 0, l = obj.length; i < l; i++) {
			        if (hasBinary(obj[i])) {
			          return true;
			        }
			      }
			      return false;
			    }
			    if (isBinary(obj)) {
			      return true;
			    }
			    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
			      return hasBinary(obj.toJSON(), true);
			    }
			    for (var key in obj) {
			      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
			        return true;
			      }
			    }
			    return false;
			  }

			  /**
			   * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
			   *
			   * @param {Object} packet - socket.io event packet
			   * @return {Object} with deconstructed packet and list of buffers
			   * @public
			   */
			  function deconstructPacket(packet) {
			    var buffers = [];
			    var packetData = packet.data;
			    var pack = packet;
			    pack.data = _deconstructPacket(packetData, buffers);
			    pack.attachments = buffers.length; // number of binary 'attachments'
			    return {
			      packet: pack,
			      buffers: buffers
			    };
			  }
			  function _deconstructPacket(data, buffers) {
			    if (!data) return data;
			    if (isBinary(data)) {
			      var placeholder = {
			        _placeholder: true,
			        num: buffers.length
			      };
			      buffers.push(data);
			      return placeholder;
			    } else if (Array.isArray(data)) {
			      var newData = new Array(data.length);
			      for (var i = 0; i < data.length; i++) {
			        newData[i] = _deconstructPacket(data[i], buffers);
			      }
			      return newData;
			    } else if (_typeof(data) === "object" && !(data instanceof Date)) {
			      var _newData = {};
			      for (var key in data) {
			        if (Object.prototype.hasOwnProperty.call(data, key)) {
			          _newData[key] = _deconstructPacket(data[key], buffers);
			        }
			      }
			      return _newData;
			    }
			    return data;
			  }
			  /**
			   * Reconstructs a binary packet from its placeholder packet and buffers
			   *
			   * @param {Object} packet - event packet with placeholders
			   * @param {Array} buffers - binary buffers to put in placeholder positions
			   * @return {Object} reconstructed packet
			   * @public
			   */
			  function reconstructPacket(packet, buffers) {
			    packet.data = _reconstructPacket(packet.data, buffers);
			    delete packet.attachments; // no longer useful
			    return packet;
			  }
			  function _reconstructPacket(data, buffers) {
			    if (!data) return data;
			    if (data && data._placeholder === true) {
			      var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
			      if (isIndexValid) {
			        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
			      } else {
			        throw new Error("illegal attachments");
			      }
			    } else if (Array.isArray(data)) {
			      for (var i = 0; i < data.length; i++) {
			        data[i] = _reconstructPacket(data[i], buffers);
			      }
			    } else if (_typeof(data) === "object") {
			      for (var key in data) {
			        if (Object.prototype.hasOwnProperty.call(data, key)) {
			          data[key] = _reconstructPacket(data[key], buffers);
			        }
			      }
			    }
			    return data;
			  }

			  /**
			   * These strings must not be used as event names, as they have a special meaning.
			   */
			  var RESERVED_EVENTS$1 = ["connect",
			  // used on the client side
			  "connect_error",
			  // used on the client side
			  "disconnect",
			  // used on both sides
			  "disconnecting",
			  // used on the server side
			  "newListener",
			  // used by the Node.js EventEmitter
			  "removeListener" // used by the Node.js EventEmitter
			  ];
			  /**
			   * Protocol version.
			   *
			   * @public
			   */
			  var protocol = 5;
			  var PacketType;
			  (function (PacketType) {
			    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
			    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
			    PacketType[PacketType["EVENT"] = 2] = "EVENT";
			    PacketType[PacketType["ACK"] = 3] = "ACK";
			    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
			    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
			    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
			  })(PacketType || (PacketType = {}));
			  /**
			   * A socket.io Encoder instance
			   */
			  var Encoder = /*#__PURE__*/function () {
			    /**
			     * Encoder constructor
			     *
			     * @param {function} replacer - custom replacer to pass down to JSON.parse
			     */
			    function Encoder(replacer) {
			      this.replacer = replacer;
			    }
			    /**
			     * Encode a packet as a single string if non-binary, or as a
			     * buffer sequence, depending on packet type.
			     *
			     * @param {Object} obj - packet object
			     */
			    var _proto = Encoder.prototype;
			    _proto.encode = function encode(obj) {
			      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			        if (hasBinary(obj)) {
			          return this.encodeAsBinary({
			            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
			            nsp: obj.nsp,
			            data: obj.data,
			            id: obj.id
			          });
			        }
			      }
			      return [this.encodeAsString(obj)];
			    }
			    /**
			     * Encode packet as string.
			     */;
			    _proto.encodeAsString = function encodeAsString(obj) {
			      // first is type
			      var str = "" + obj.type;
			      // attachments if we have them
			      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
			        str += obj.attachments + "-";
			      }
			      // if we have a namespace other than `/`
			      // we append it followed by a comma `,`
			      if (obj.nsp && "/" !== obj.nsp) {
			        str += obj.nsp + ",";
			      }
			      // immediately followed by the id
			      if (null != obj.id) {
			        str += obj.id;
			      }
			      // json data
			      if (null != obj.data) {
			        str += JSON.stringify(obj.data, this.replacer);
			      }
			      return str;
			    }
			    /**
			     * Encode packet as 'buffer sequence' by removing blobs, and
			     * deconstructing packet into object with placeholders and
			     * a list of buffers.
			     */;
			    _proto.encodeAsBinary = function encodeAsBinary(obj) {
			      var deconstruction = deconstructPacket(obj);
			      var pack = this.encodeAsString(deconstruction.packet);
			      var buffers = deconstruction.buffers;
			      buffers.unshift(pack); // add packet info to beginning of data list
			      return buffers; // write all the buffers
			    };
			    return Encoder;
			  }();
			  /**
			   * A socket.io Decoder instance
			   *
			   * @return {Object} decoder
			   */
			  var Decoder = /*#__PURE__*/function (_Emitter) {
			    /**
			     * Decoder constructor
			     *
			     * @param {function} reviver - custom reviver to pass down to JSON.stringify
			     */
			    function Decoder(reviver) {
			      var _this;
			      _this = _Emitter.call(this) || this;
			      _this.reviver = reviver;
			      return _this;
			    }
			    /**
			     * Decodes an encoded packet string into packet JSON.
			     *
			     * @param {String} obj - encoded packet
			     */
			    _inheritsLoose(Decoder, _Emitter);
			    var _proto2 = Decoder.prototype;
			    _proto2.add = function add(obj) {
			      var packet;
			      if (typeof obj === "string") {
			        if (this.reconstructor) {
			          throw new Error("got plaintext data when reconstructing a packet");
			        }
			        packet = this.decodeString(obj);
			        var isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
			          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
			          // binary packet's json
			          this.reconstructor = new BinaryReconstructor(packet);
			          // no attachments, labeled binary but no binary data to follow
			          if (packet.attachments === 0) {
			            _Emitter.prototype.emitReserved.call(this, "decoded", packet);
			          }
			        } else {
			          // non-binary full packet
			          _Emitter.prototype.emitReserved.call(this, "decoded", packet);
			        }
			      } else if (isBinary(obj) || obj.base64) {
			        // raw binary data
			        if (!this.reconstructor) {
			          throw new Error("got binary data when not reconstructing a packet");
			        } else {
			          packet = this.reconstructor.takeBinaryData(obj);
			          if (packet) {
			            // received final buffer
			            this.reconstructor = null;
			            _Emitter.prototype.emitReserved.call(this, "decoded", packet);
			          }
			        }
			      } else {
			        throw new Error("Unknown type: " + obj);
			      }
			    }
			    /**
			     * Decode a packet String (JSON data)
			     *
			     * @param {String} str
			     * @return {Object} packet
			     */;
			    _proto2.decodeString = function decodeString(str) {
			      var i = 0;
			      // look up type
			      var p = {
			        type: Number(str.charAt(0))
			      };
			      if (PacketType[p.type] === undefined) {
			        throw new Error("unknown packet type " + p.type);
			      }
			      // look up attachments if type binary
			      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
			        var start = i + 1;
			        while (str.charAt(++i) !== "-" && i != str.length) {}
			        var buf = str.substring(start, i);
			        if (buf != Number(buf) || str.charAt(i) !== "-") {
			          throw new Error("Illegal attachments");
			        }
			        p.attachments = Number(buf);
			      }
			      // look up namespace (if any)
			      if ("/" === str.charAt(i + 1)) {
			        var _start = i + 1;
			        while (++i) {
			          var c = str.charAt(i);
			          if ("," === c) break;
			          if (i === str.length) break;
			        }
			        p.nsp = str.substring(_start, i);
			      } else {
			        p.nsp = "/";
			      }
			      // look up id
			      var next = str.charAt(i + 1);
			      if ("" !== next && Number(next) == next) {
			        var _start2 = i + 1;
			        while (++i) {
			          var _c = str.charAt(i);
			          if (null == _c || Number(_c) != _c) {
			            --i;
			            break;
			          }
			          if (i === str.length) break;
			        }
			        p.id = Number(str.substring(_start2, i + 1));
			      }
			      // look up json data
			      if (str.charAt(++i)) {
			        var payload = this.tryParse(str.substr(i));
			        if (Decoder.isPayloadValid(p.type, payload)) {
			          p.data = payload;
			        } else {
			          throw new Error("invalid payload");
			        }
			      }
			      return p;
			    };
			    _proto2.tryParse = function tryParse(str) {
			      try {
			        return JSON.parse(str, this.reviver);
			      } catch (e) {
			        return false;
			      }
			    };
			    Decoder.isPayloadValid = function isPayloadValid(type, payload) {
			      switch (type) {
			        case PacketType.CONNECT:
			          return isObject(payload);
			        case PacketType.DISCONNECT:
			          return payload === undefined;
			        case PacketType.CONNECT_ERROR:
			          return typeof payload === "string" || isObject(payload);
			        case PacketType.EVENT:
			        case PacketType.BINARY_EVENT:
			          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			        case PacketType.ACK:
			        case PacketType.BINARY_ACK:
			          return Array.isArray(payload);
			      }
			    }
			    /**
			     * Deallocates a parser's resources
			     */;
			    _proto2.destroy = function destroy() {
			      if (this.reconstructor) {
			        this.reconstructor.finishedReconstruction();
			        this.reconstructor = null;
			      }
			    };
			    return Decoder;
			  }(Emitter);
			  /**
			   * A manager of a binary event's 'buffer sequence'. Should
			   * be constructed whenever a packet of type BINARY_EVENT is
			   * decoded.
			   *
			   * @param {Object} packet
			   * @return {BinaryReconstructor} initialized reconstructor
			   */
			  var BinaryReconstructor = /*#__PURE__*/function () {
			    function BinaryReconstructor(packet) {
			      this.packet = packet;
			      this.buffers = [];
			      this.reconPack = packet;
			    }
			    /**
			     * Method to be called when binary data received from connection
			     * after a BINARY_EVENT packet.
			     *
			     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
			     * @return {null | Object} returns null if more binary data is expected or
			     *   a reconstructed packet object if all buffers have been received.
			     */
			    var _proto3 = BinaryReconstructor.prototype;
			    _proto3.takeBinaryData = function takeBinaryData(binData) {
			      this.buffers.push(binData);
			      if (this.buffers.length === this.reconPack.attachments) {
			        // done with buffer list
			        var packet = reconstructPacket(this.reconPack, this.buffers);
			        this.finishedReconstruction();
			        return packet;
			      }
			      return null;
			    }
			    /**
			     * Cleans up binary packet reconstruction variables.
			     */;
			    _proto3.finishedReconstruction = function finishedReconstruction() {
			      this.reconPack = null;
			      this.buffers = [];
			    };
			    return BinaryReconstructor;
			  }();
			  function isNamespaceValid(nsp) {
			    return typeof nsp === "string";
			  }
			  // see https://caniuse.com/mdn-javascript_builtins_number_isinteger
			  var isInteger = Number.isInteger || function (value) {
			    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
			  };
			  function isAckIdValid(id) {
			    return id === undefined || isInteger(id);
			  }
			  // see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
			  function isObject(value) {
			    return Object.prototype.toString.call(value) === "[object Object]";
			  }
			  function isDataValid(type, payload) {
			    switch (type) {
			      case PacketType.CONNECT:
			        return payload === undefined || isObject(payload);
			      case PacketType.DISCONNECT:
			        return payload === undefined;
			      case PacketType.EVENT:
			        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			      case PacketType.ACK:
			        return Array.isArray(payload);
			      case PacketType.CONNECT_ERROR:
			        return typeof payload === "string" || isObject(payload);
			      default:
			        return false;
			    }
			  }
			  function isPacketValid(packet) {
			    return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
			  }

			  var parser = /*#__PURE__*/Object.freeze({
			    __proto__: null,
			    protocol: protocol,
			    get PacketType () { return PacketType; },
			    Encoder: Encoder,
			    Decoder: Decoder,
			    isPacketValid: isPacketValid
			  });

			  function on(obj, ev, fn) {
			    obj.on(ev, fn);
			    return function subDestroy() {
			      obj.off(ev, fn);
			    };
			  }

			  var debug$2 = debugModule("socket.io-client:socket"); // debug()
			  /**
			   * Internal events.
			   * These events can't be emitted by the user.
			   */
			  var RESERVED_EVENTS = Object.freeze({
			    connect: 1,
			    connect_error: 1,
			    disconnect: 1,
			    disconnecting: 1,
			    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
			    newListener: 1,
			    removeListener: 1
			  });
			  /**
			   * A Socket is the fundamental class for interacting with the server.
			   *
			   * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
			   *
			   * @example
			   * const socket = io();
			   *
			   * socket.on("connect", () => {
			   *   console.log("connected");
			   * });
			   *
			   * // send an event to the server
			   * socket.emit("foo", "bar");
			   *
			   * socket.on("foobar", () => {
			   *   // an event was received from the server
			   * });
			   *
			   * // upon disconnection
			   * socket.on("disconnect", (reason) => {
			   *   console.log(`disconnected due to ${reason}`);
			   * });
			   */
			  var Socket = /*#__PURE__*/function (_Emitter) {
			    /**
			     * `Socket` constructor.
			     */
			    function Socket(io, nsp, opts) {
			      var _this;
			      _this = _Emitter.call(this) || this;
			      /**
			       * Whether the socket is currently connected to the server.
			       *
			       * @example
			       * const socket = io();
			       *
			       * socket.on("connect", () => {
			       *   console.log(socket.connected); // true
			       * });
			       *
			       * socket.on("disconnect", () => {
			       *   console.log(socket.connected); // false
			       * });
			       */
			      _this.connected = false;
			      /**
			       * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
			       * be transmitted by the server.
			       */
			      _this.recovered = false;
			      /**
			       * Buffer for packets received before the CONNECT packet
			       */
			      _this.receiveBuffer = [];
			      /**
			       * Buffer for packets that will be sent once the socket is connected
			       */
			      _this.sendBuffer = [];
			      /**
			       * The queue of packets to be sent with retry in case of failure.
			       *
			       * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
			       * @private
			       */
			      _this._queue = [];
			      /**
			       * A sequence to generate the ID of the {@link QueuedPacket}.
			       * @private
			       */
			      _this._queueSeq = 0;
			      _this.ids = 0;
			      /**
			       * A map containing acknowledgement handlers.
			       *
			       * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
			       *
			       * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
			       * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
			       * - `const value = await socket.emitWithAck("test")`
			       *
			       * From those that don't:
			       *
			       * - `socket.emit("test", (value) => { ... });`
			       *
			       * In the first case, the handlers will be called with an error when:
			       *
			       * - the timeout is reached
			       * - the socket gets disconnected
			       *
			       * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
			       * an acknowledgement from the server.
			       *
			       * @private
			       */
			      _this.acks = {};
			      _this.flags = {};
			      _this.io = io;
			      _this.nsp = nsp;
			      if (opts && opts.auth) {
			        _this.auth = opts.auth;
			      }
			      _this._opts = _extends({}, opts);
			      if (_this.io._autoConnect) _this.open();
			      return _this;
			    }
			    /**
			     * Whether the socket is currently disconnected
			     *
			     * @example
			     * const socket = io();
			     *
			     * socket.on("connect", () => {
			     *   console.log(socket.disconnected); // false
			     * });
			     *
			     * socket.on("disconnect", () => {
			     *   console.log(socket.disconnected); // true
			     * });
			     */
			    _inheritsLoose(Socket, _Emitter);
			    var _proto = Socket.prototype;
			    /**
			     * Subscribe to open, close and packet events
			     *
			     * @private
			     */
			    _proto.subEvents = function subEvents() {
			      if (this.subs) return;
			      var io = this.io;
			      this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
			    }
			    /**
			     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
			     *
			     * @example
			     * const socket = io();
			     *
			     * console.log(socket.active); // true
			     *
			     * socket.on("disconnect", (reason) => {
			     *   if (reason === "io server disconnect") {
			     *     // the disconnection was initiated by the server, you need to manually reconnect
			     *     console.log(socket.active); // false
			     *   }
			     *   // else the socket will automatically try to reconnect
			     *   console.log(socket.active); // true
			     * });
			     */;
			    /**
			     * "Opens" the socket.
			     *
			     * @example
			     * const socket = io({
			     *   autoConnect: false
			     * });
			     *
			     * socket.connect();
			     */
			    _proto.connect = function connect() {
			      if (this.connected) return this;
			      this.subEvents();
			      if (!this.io["_reconnecting"]) this.io.open(); // ensure open
			      if ("open" === this.io._readyState) this.onopen();
			      return this;
			    }
			    /**
			     * Alias for {@link connect()}.
			     */;
			    _proto.open = function open() {
			      return this.connect();
			    }
			    /**
			     * Sends a `message` event.
			     *
			     * This method mimics the WebSocket.send() method.
			     *
			     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
			     *
			     * @example
			     * socket.send("hello");
			     *
			     * // this is equivalent to
			     * socket.emit("message", "hello");
			     *
			     * @return self
			     */;
			    _proto.send = function send() {
			      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			        args[_key] = arguments[_key];
			      }
			      args.unshift("message");
			      this.emit.apply(this, args);
			      return this;
			    }
			    /**
			     * Override `emit`.
			     * If the event is in `events`, it's emitted normally.
			     *
			     * @example
			     * socket.emit("hello", "world");
			     *
			     * // all serializable datastructures are supported (no need to call JSON.stringify)
			     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
			     *
			     * // with an acknowledgement from the server
			     * socket.emit("hello", "world", (val) => {
			     *   // ...
			     * });
			     *
			     * @return self
			     */;
			    _proto.emit = function emit(ev) {
			      var _a, _b, _c;
			      if (RESERVED_EVENTS.hasOwnProperty(ev)) {
			        throw new Error('"' + ev.toString() + '" is a reserved event name');
			      }
			      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			        args[_key2 - 1] = arguments[_key2];
			      }
			      args.unshift(ev);
			      if (this._opts.retries && !this.flags.fromQueue && !this.flags["volatile"]) {
			        this._addToQueue(args);
			        return this;
			      }
			      var packet = {
			        type: PacketType.EVENT,
			        data: args
			      };
			      packet.options = {};
			      packet.options.compress = this.flags.compress !== false;
			      // event ack callback
			      if ("function" === typeof args[args.length - 1]) {
			        var id = this.ids++;
			        debug$2("emitting packet with ack id %d", id);
			        var ack = args.pop();
			        this._registerAckCallback(id, ack);
			        packet.id = id;
			      }
			      var isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
			      var isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
			      var discardPacket = this.flags["volatile"] && !isTransportWritable;
			      if (discardPacket) {
			        debug$2("discard packet as the transport is not currently writable");
			      } else if (isConnected) {
			        this.notifyOutgoingListeners(packet);
			        this.packet(packet);
			      } else {
			        this.sendBuffer.push(packet);
			      }
			      this.flags = {};
			      return this;
			    }
			    /**
			     * @private
			     */;
			    _proto._registerAckCallback = function _registerAckCallback(id, ack) {
			      var _this2 = this;
			      var _a;
			      var timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
			      if (timeout === undefined) {
			        this.acks[id] = ack;
			        return;
			      }
			      // @ts-ignore
			      var timer = this.io.setTimeoutFn(function () {
			        delete _this2.acks[id];
			        for (var i = 0; i < _this2.sendBuffer.length; i++) {
			          if (_this2.sendBuffer[i].id === id) {
			            debug$2("removing packet with ack id %d from the buffer", id);
			            _this2.sendBuffer.splice(i, 1);
			          }
			        }
			        debug$2("event with ack id %d has timed out after %d ms", id, timeout);
			        ack.call(_this2, new Error("operation has timed out"));
			      }, timeout);
			      var fn = function fn() {
			        // @ts-ignore
			        _this2.io.clearTimeoutFn(timer);
			        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			          args[_key3] = arguments[_key3];
			        }
			        ack.apply(_this2, args);
			      };
			      fn.withError = true;
			      this.acks[id] = fn;
			    }
			    /**
			     * Emits an event and waits for an acknowledgement
			     *
			     * @example
			     * // without timeout
			     * const response = await socket.emitWithAck("hello", "world");
			     *
			     * // with a specific timeout
			     * try {
			     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
			     * } catch (err) {
			     *   // the server did not acknowledge the event in the given delay
			     * }
			     *
			     * @return a Promise that will be fulfilled when the server acknowledges the event
			     */;
			    _proto.emitWithAck = function emitWithAck(ev) {
			      var _this3 = this;
			      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			        args[_key4 - 1] = arguments[_key4];
			      }
			      return new Promise(function (resolve, reject) {
			        var fn = function fn(arg1, arg2) {
			          return arg1 ? reject(arg1) : resolve(arg2);
			        };
			        fn.withError = true;
			        args.push(fn);
			        _this3.emit.apply(_this3, [ev].concat(args));
			      });
			    }
			    /**
			     * Add the packet to the queue.
			     * @param args
			     * @private
			     */;
			    _proto._addToQueue = function _addToQueue(args) {
			      var _this4 = this;
			      var ack;
			      if (typeof args[args.length - 1] === "function") {
			        ack = args.pop();
			      }
			      var packet = {
			        id: this._queueSeq++,
			        tryCount: 0,
			        pending: false,
			        args: args,
			        flags: _extends({
			          fromQueue: true
			        }, this.flags)
			      };
			      args.push(function (err) {
			        if (packet !== _this4._queue[0]) {
			          // the packet has already been acknowledged
			          return;
			        }
			        var hasError = err !== null;
			        if (hasError) {
			          if (packet.tryCount > _this4._opts.retries) {
			            debug$2("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
			            _this4._queue.shift();
			            if (ack) {
			              ack(err);
			            }
			          }
			        } else {
			          debug$2("packet [%d] was successfully sent", packet.id);
			          _this4._queue.shift();
			          if (ack) {
			            for (var _len5 = arguments.length, responseArgs = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
			              responseArgs[_key5 - 1] = arguments[_key5];
			            }
			            ack.apply(void 0, [null].concat(responseArgs));
			          }
			        }
			        packet.pending = false;
			        return _this4._drainQueue();
			      });
			      this._queue.push(packet);
			      this._drainQueue();
			    }
			    /**
			     * Send the first packet of the queue, and wait for an acknowledgement from the server.
			     * @param force - whether to resend a packet that has not been acknowledged yet
			     *
			     * @private
			     */;
			    _proto._drainQueue = function _drainQueue() {
			      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			      debug$2("draining queue");
			      if (!this.connected || this._queue.length === 0) {
			        return;
			      }
			      var packet = this._queue[0];
			      if (packet.pending && !force) {
			        debug$2("packet [%d] has already been sent and is waiting for an ack", packet.id);
			        return;
			      }
			      packet.pending = true;
			      packet.tryCount++;
			      debug$2("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
			      this.flags = packet.flags;
			      this.emit.apply(this, packet.args);
			    }
			    /**
			     * Sends a packet.
			     *
			     * @param packet
			     * @private
			     */;
			    _proto.packet = function packet(_packet) {
			      _packet.nsp = this.nsp;
			      this.io._packet(_packet);
			    }
			    /**
			     * Called upon engine `open`.
			     *
			     * @private
			     */;
			    _proto.onopen = function onopen() {
			      var _this5 = this;
			      debug$2("transport is open - connecting");
			      if (typeof this.auth == "function") {
			        this.auth(function (data) {
			          _this5._sendConnectPacket(data);
			        });
			      } else {
			        this._sendConnectPacket(this.auth);
			      }
			    }
			    /**
			     * Sends a CONNECT packet to initiate the Socket.IO session.
			     *
			     * @param data
			     * @private
			     */;
			    _proto._sendConnectPacket = function _sendConnectPacket(data) {
			      this.packet({
			        type: PacketType.CONNECT,
			        data: this._pid ? _extends({
			          pid: this._pid,
			          offset: this._lastOffset
			        }, data) : data
			      });
			    }
			    /**
			     * Called upon engine or manager `error`.
			     *
			     * @param err
			     * @private
			     */;
			    _proto.onerror = function onerror(err) {
			      if (!this.connected) {
			        this.emitReserved("connect_error", err);
			      }
			    }
			    /**
			     * Called upon engine `close`.
			     *
			     * @param reason
			     * @param description
			     * @private
			     */;
			    _proto.onclose = function onclose(reason, description) {
			      debug$2("close (%s)", reason);
			      this.connected = false;
			      delete this.id;
			      this.emitReserved("disconnect", reason, description);
			      this._clearAcks();
			    }
			    /**
			     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
			     * the server.
			     *
			     * @private
			     */;
			    _proto._clearAcks = function _clearAcks() {
			      var _this6 = this;
			      Object.keys(this.acks).forEach(function (id) {
			        var isBuffered = _this6.sendBuffer.some(function (packet) {
			          return String(packet.id) === id;
			        });
			        if (!isBuffered) {
			          // note: handlers that do not accept an error as first argument are ignored here
			          var ack = _this6.acks[id];
			          delete _this6.acks[id];
			          if (ack.withError) {
			            ack.call(_this6, new Error("socket has been disconnected"));
			          }
			        }
			      });
			    }
			    /**
			     * Called with socket packet.
			     *
			     * @param packet
			     * @private
			     */;
			    _proto.onpacket = function onpacket(packet) {
			      var sameNamespace = packet.nsp === this.nsp;
			      if (!sameNamespace) return;
			      switch (packet.type) {
			        case PacketType.CONNECT:
			          if (packet.data && packet.data.sid) {
			            this.onconnect(packet.data.sid, packet.data.pid);
			          } else {
			            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
			          }
			          break;
			        case PacketType.EVENT:
			        case PacketType.BINARY_EVENT:
			          this.onevent(packet);
			          break;
			        case PacketType.ACK:
			        case PacketType.BINARY_ACK:
			          this.onack(packet);
			          break;
			        case PacketType.DISCONNECT:
			          this.ondisconnect();
			          break;
			        case PacketType.CONNECT_ERROR:
			          this.destroy();
			          var err = new Error(packet.data.message);
			          // @ts-ignore
			          err.data = packet.data.data;
			          this.emitReserved("connect_error", err);
			          break;
			      }
			    }
			    /**
			     * Called upon a server event.
			     *
			     * @param packet
			     * @private
			     */;
			    _proto.onevent = function onevent(packet) {
			      var args = packet.data || [];
			      debug$2("emitting event %j", args);
			      if (null != packet.id) {
			        debug$2("attaching ack callback to event");
			        args.push(this.ack(packet.id));
			      }
			      if (this.connected) {
			        this.emitEvent(args);
			      } else {
			        this.receiveBuffer.push(Object.freeze(args));
			      }
			    };
			    _proto.emitEvent = function emitEvent(args) {
			      if (this._anyListeners && this._anyListeners.length) {
			        var listeners = this._anyListeners.slice();
			        var _iterator = _createForOfIteratorHelper(listeners),
			          _step;
			        try {
			          for (_iterator.s(); !(_step = _iterator.n()).done;) {
			            var listener = _step.value;
			            listener.apply(this, args);
			          }
			        } catch (err) {
			          _iterator.e(err);
			        } finally {
			          _iterator.f();
			        }
			      }
			      _Emitter.prototype.emit.apply(this, args);
			      if (this._pid && args.length && typeof args[args.length - 1] === "string") {
			        this._lastOffset = args[args.length - 1];
			      }
			    }
			    /**
			     * Produces an ack callback to emit with an event.
			     *
			     * @private
			     */;
			    _proto.ack = function ack(id) {
			      var self = this;
			      var sent = false;
			      return function () {
			        // prevent double callbacks
			        if (sent) return;
			        sent = true;
			        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			          args[_key6] = arguments[_key6];
			        }
			        debug$2("sending ack %j", args);
			        self.packet({
			          type: PacketType.ACK,
			          id: id,
			          data: args
			        });
			      };
			    }
			    /**
			     * Called upon a server acknowledgement.
			     *
			     * @param packet
			     * @private
			     */;
			    _proto.onack = function onack(packet) {
			      var ack = this.acks[packet.id];
			      if (typeof ack !== "function") {
			        debug$2("bad ack %s", packet.id);
			        return;
			      }
			      delete this.acks[packet.id];
			      debug$2("calling ack %s with %j", packet.id, packet.data);
			      // @ts-ignore FIXME ack is incorrectly inferred as 'never'
			      if (ack.withError) {
			        packet.data.unshift(null);
			      }
			      // @ts-ignore
			      ack.apply(this, packet.data);
			    }
			    /**
			     * Called upon server connect.
			     *
			     * @private
			     */;
			    _proto.onconnect = function onconnect(id, pid) {
			      debug$2("socket connected with id %s", id);
			      this.id = id;
			      this.recovered = pid && this._pid === pid;
			      this._pid = pid; // defined only if connection state recovery is enabled
			      this.connected = true;
			      this.emitBuffered();
			      this.emitReserved("connect");
			      this._drainQueue(true);
			    }
			    /**
			     * Emit buffered events (received and emitted).
			     *
			     * @private
			     */;
			    _proto.emitBuffered = function emitBuffered() {
			      var _this7 = this;
			      this.receiveBuffer.forEach(function (args) {
			        return _this7.emitEvent(args);
			      });
			      this.receiveBuffer = [];
			      this.sendBuffer.forEach(function (packet) {
			        _this7.notifyOutgoingListeners(packet);
			        _this7.packet(packet);
			      });
			      this.sendBuffer = [];
			    }
			    /**
			     * Called upon server disconnect.
			     *
			     * @private
			     */;
			    _proto.ondisconnect = function ondisconnect() {
			      debug$2("server disconnect (%s)", this.nsp);
			      this.destroy();
			      this.onclose("io server disconnect");
			    }
			    /**
			     * Called upon forced client/server side disconnections,
			     * this method ensures the manager stops tracking us and
			     * that reconnections don't get triggered for this.
			     *
			     * @private
			     */;
			    _proto.destroy = function destroy() {
			      if (this.subs) {
			        // clean subscriptions to avoid reconnections
			        this.subs.forEach(function (subDestroy) {
			          return subDestroy();
			        });
			        this.subs = undefined;
			      }
			      this.io["_destroy"](this);
			    }
			    /**
			     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
			     *
			     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
			     *
			     * @example
			     * const socket = io();
			     *
			     * socket.on("disconnect", (reason) => {
			     *   // console.log(reason); prints "io client disconnect"
			     * });
			     *
			     * socket.disconnect();
			     *
			     * @return self
			     */;
			    _proto.disconnect = function disconnect() {
			      if (this.connected) {
			        debug$2("performing disconnect (%s)", this.nsp);
			        this.packet({
			          type: PacketType.DISCONNECT
			        });
			      }
			      // remove socket from pool
			      this.destroy();
			      if (this.connected) {
			        // fire events
			        this.onclose("io client disconnect");
			      }
			      return this;
			    }
			    /**
			     * Alias for {@link disconnect()}.
			     *
			     * @return self
			     */;
			    _proto.close = function close() {
			      return this.disconnect();
			    }
			    /**
			     * Sets the compress flag.
			     *
			     * @example
			     * socket.compress(false).emit("hello");
			     *
			     * @param compress - if `true`, compresses the sending data
			     * @return self
			     */;
			    _proto.compress = function compress(_compress) {
			      this.flags.compress = _compress;
			      return this;
			    }
			    /**
			     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
			     * ready to send messages.
			     *
			     * @example
			     * socket.volatile.emit("hello"); // the server may or may not receive it
			     *
			     * @returns self
			     */;
			    /**
			     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
			     * given number of milliseconds have elapsed without an acknowledgement from the server:
			     *
			     * @example
			     * socket.timeout(5000).emit("my-event", (err) => {
			     *   if (err) {
			     *     // the server did not acknowledge the event in the given delay
			     *   }
			     * });
			     *
			     * @returns self
			     */
			    _proto.timeout = function timeout(_timeout) {
			      this.flags.timeout = _timeout;
			      return this;
			    }
			    /**
			     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
			     * callback.
			     *
			     * @example
			     * socket.onAny((event, ...args) => {
			     *   console.log(`got ${event}`);
			     * });
			     *
			     * @param listener
			     */;
			    _proto.onAny = function onAny(listener) {
			      this._anyListeners = this._anyListeners || [];
			      this._anyListeners.push(listener);
			      return this;
			    }
			    /**
			     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
			     * callback. The listener is added to the beginning of the listeners array.
			     *
			     * @example
			     * socket.prependAny((event, ...args) => {
			     *   console.log(`got event ${event}`);
			     * });
			     *
			     * @param listener
			     */;
			    _proto.prependAny = function prependAny(listener) {
			      this._anyListeners = this._anyListeners || [];
			      this._anyListeners.unshift(listener);
			      return this;
			    }
			    /**
			     * Removes the listener that will be fired when any event is emitted.
			     *
			     * @example
			     * const catchAllListener = (event, ...args) => {
			     *   console.log(`got event ${event}`);
			     * }
			     *
			     * socket.onAny(catchAllListener);
			     *
			     * // remove a specific listener
			     * socket.offAny(catchAllListener);
			     *
			     * // or remove all listeners
			     * socket.offAny();
			     *
			     * @param listener
			     */;
			    _proto.offAny = function offAny(listener) {
			      if (!this._anyListeners) {
			        return this;
			      }
			      if (listener) {
			        var listeners = this._anyListeners;
			        for (var i = 0; i < listeners.length; i++) {
			          if (listener === listeners[i]) {
			            listeners.splice(i, 1);
			            return this;
			          }
			        }
			      } else {
			        this._anyListeners = [];
			      }
			      return this;
			    }
			    /**
			     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
			     * e.g. to remove listeners.
			     */;
			    _proto.listenersAny = function listenersAny() {
			      return this._anyListeners || [];
			    }
			    /**
			     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
			     * callback.
			     *
			     * Note: acknowledgements sent to the server are not included.
			     *
			     * @example
			     * socket.onAnyOutgoing((event, ...args) => {
			     *   console.log(`sent event ${event}`);
			     * });
			     *
			     * @param listener
			     */;
			    _proto.onAnyOutgoing = function onAnyOutgoing(listener) {
			      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
			      this._anyOutgoingListeners.push(listener);
			      return this;
			    }
			    /**
			     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
			     * callback. The listener is added to the beginning of the listeners array.
			     *
			     * Note: acknowledgements sent to the server are not included.
			     *
			     * @example
			     * socket.prependAnyOutgoing((event, ...args) => {
			     *   console.log(`sent event ${event}`);
			     * });
			     *
			     * @param listener
			     */;
			    _proto.prependAnyOutgoing = function prependAnyOutgoing(listener) {
			      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
			      this._anyOutgoingListeners.unshift(listener);
			      return this;
			    }
			    /**
			     * Removes the listener that will be fired when any event is emitted.
			     *
			     * @example
			     * const catchAllListener = (event, ...args) => {
			     *   console.log(`sent event ${event}`);
			     * }
			     *
			     * socket.onAnyOutgoing(catchAllListener);
			     *
			     * // remove a specific listener
			     * socket.offAnyOutgoing(catchAllListener);
			     *
			     * // or remove all listeners
			     * socket.offAnyOutgoing();
			     *
			     * @param [listener] - the catch-all listener (optional)
			     */;
			    _proto.offAnyOutgoing = function offAnyOutgoing(listener) {
			      if (!this._anyOutgoingListeners) {
			        return this;
			      }
			      if (listener) {
			        var listeners = this._anyOutgoingListeners;
			        for (var i = 0; i < listeners.length; i++) {
			          if (listener === listeners[i]) {
			            listeners.splice(i, 1);
			            return this;
			          }
			        }
			      } else {
			        this._anyOutgoingListeners = [];
			      }
			      return this;
			    }
			    /**
			     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
			     * e.g. to remove listeners.
			     */;
			    _proto.listenersAnyOutgoing = function listenersAnyOutgoing() {
			      return this._anyOutgoingListeners || [];
			    }
			    /**
			     * Notify the listeners for each packet sent
			     *
			     * @param packet
			     *
			     * @private
			     */;
			    _proto.notifyOutgoingListeners = function notifyOutgoingListeners(packet) {
			      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			        var listeners = this._anyOutgoingListeners.slice();
			        var _iterator2 = _createForOfIteratorHelper(listeners),
			          _step2;
			        try {
			          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
			            var listener = _step2.value;
			            listener.apply(this, packet.data);
			          }
			        } catch (err) {
			          _iterator2.e(err);
			        } finally {
			          _iterator2.f();
			        }
			      }
			    };
			    return _createClass(Socket, [{
			      key: "disconnected",
			      get: function get() {
			        return !this.connected;
			      }
			    }, {
			      key: "active",
			      get: function get() {
			        return !!this.subs;
			      }
			    }, {
			      key: "volatile",
			      get: function get() {
			        this.flags["volatile"] = true;
			        return this;
			      }
			    }]);
			  }(Emitter);

			  /**
			   * Initialize backoff timer with `opts`.
			   *
			   * - `min` initial timeout in milliseconds [100]
			   * - `max` max timeout [10000]
			   * - `jitter` [0]
			   * - `factor` [2]
			   *
			   * @param {Object} opts
			   * @api public
			   */
			  function Backoff(opts) {
			    opts = opts || {};
			    this.ms = opts.min || 100;
			    this.max = opts.max || 10000;
			    this.factor = opts.factor || 2;
			    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
			    this.attempts = 0;
			  }
			  /**
			   * Return the backoff duration.
			   *
			   * @return {Number}
			   * @api public
			   */
			  Backoff.prototype.duration = function () {
			    var ms = this.ms * Math.pow(this.factor, this.attempts++);
			    if (this.jitter) {
			      var rand = Math.random();
			      var deviation = Math.floor(rand * this.jitter * ms);
			      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
			    }
			    return Math.min(ms, this.max) | 0;
			  };
			  /**
			   * Reset the number of attempts.
			   *
			   * @api public
			   */
			  Backoff.prototype.reset = function () {
			    this.attempts = 0;
			  };
			  /**
			   * Set the minimum duration
			   *
			   * @api public
			   */
			  Backoff.prototype.setMin = function (min) {
			    this.ms = min;
			  };
			  /**
			   * Set the maximum duration
			   *
			   * @api public
			   */
			  Backoff.prototype.setMax = function (max) {
			    this.max = max;
			  };
			  /**
			   * Set the jitter
			   *
			   * @api public
			   */
			  Backoff.prototype.setJitter = function (jitter) {
			    this.jitter = jitter;
			  };

			  var debug$1 = debugModule("socket.io-client:manager"); // debug()
			  var Manager = /*#__PURE__*/function (_Emitter) {
			    function Manager(uri, opts) {
			      var _this;
			      var _a;
			      _this = _Emitter.call(this) || this;
			      _this.nsps = {};
			      _this.subs = [];
			      if (uri && "object" === _typeof(uri)) {
			        opts = uri;
			        uri = undefined;
			      }
			      opts = opts || {};
			      opts.path = opts.path || "/socket.io";
			      _this.opts = opts;
			      installTimerFunctions(_this, opts);
			      _this.reconnection(opts.reconnection !== false);
			      _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
			      _this.reconnectionDelay(opts.reconnectionDelay || 1000);
			      _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
			      _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
			      _this.backoff = new Backoff({
			        min: _this.reconnectionDelay(),
			        max: _this.reconnectionDelayMax(),
			        jitter: _this.randomizationFactor()
			      });
			      _this.timeout(null == opts.timeout ? 20000 : opts.timeout);
			      _this._readyState = "closed";
			      _this.uri = uri;
			      var _parser = opts.parser || parser;
			      _this.encoder = new _parser.Encoder();
			      _this.decoder = new _parser.Decoder();
			      _this._autoConnect = opts.autoConnect !== false;
			      if (_this._autoConnect) _this.open();
			      return _this;
			    }
			    _inheritsLoose(Manager, _Emitter);
			    var _proto = Manager.prototype;
			    _proto.reconnection = function reconnection(v) {
			      if (!arguments.length) return this._reconnection;
			      this._reconnection = !!v;
			      if (!v) {
			        this.skipReconnect = true;
			      }
			      return this;
			    };
			    _proto.reconnectionAttempts = function reconnectionAttempts(v) {
			      if (v === undefined) return this._reconnectionAttempts;
			      this._reconnectionAttempts = v;
			      return this;
			    };
			    _proto.reconnectionDelay = function reconnectionDelay(v) {
			      var _a;
			      if (v === undefined) return this._reconnectionDelay;
			      this._reconnectionDelay = v;
			      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
			      return this;
			    };
			    _proto.randomizationFactor = function randomizationFactor(v) {
			      var _a;
			      if (v === undefined) return this._randomizationFactor;
			      this._randomizationFactor = v;
			      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
			      return this;
			    };
			    _proto.reconnectionDelayMax = function reconnectionDelayMax(v) {
			      var _a;
			      if (v === undefined) return this._reconnectionDelayMax;
			      this._reconnectionDelayMax = v;
			      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
			      return this;
			    };
			    _proto.timeout = function timeout(v) {
			      if (!arguments.length) return this._timeout;
			      this._timeout = v;
			      return this;
			    }
			    /**
			     * Starts trying to reconnect if reconnection is enabled and we have not
			     * started reconnecting yet
			     *
			     * @private
			     */;
			    _proto.maybeReconnectOnOpen = function maybeReconnectOnOpen() {
			      // Only try to reconnect if it's the first time we're connecting
			      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
			        // keeps reconnection from firing twice for the same reconnection loop
			        this.reconnect();
			      }
			    }
			    /**
			     * Sets the current transport `socket`.
			     *
			     * @param {Function} fn - optional, callback
			     * @return self
			     * @public
			     */;
			    _proto.open = function open(fn) {
			      var _this2 = this;
			      debug$1("readyState %s", this._readyState);
			      if (~this._readyState.indexOf("open")) return this;
			      debug$1("opening %s", this.uri);
			      this.engine = new Socket$1(this.uri, this.opts);
			      var socket = this.engine;
			      var self = this;
			      this._readyState = "opening";
			      this.skipReconnect = false;
			      // emit `open`
			      var openSubDestroy = on(socket, "open", function () {
			        self.onopen();
			        fn && fn();
			      });
			      var onError = function onError(err) {
			        debug$1("error");
			        _this2.cleanup();
			        _this2._readyState = "closed";
			        _this2.emitReserved("error", err);
			        if (fn) {
			          fn(err);
			        } else {
			          // Only do this if there is no fn to handle the error
			          _this2.maybeReconnectOnOpen();
			        }
			      };
			      // emit `error`
			      var errorSub = on(socket, "error", onError);
			      if (false !== this._timeout) {
			        var timeout = this._timeout;
			        debug$1("connect attempt will timeout after %d", timeout);
			        // set timer
			        var timer = this.setTimeoutFn(function () {
			          debug$1("connect attempt timed out after %d", timeout);
			          openSubDestroy();
			          onError(new Error("timeout"));
			          socket.close();
			        }, timeout);
			        if (this.opts.autoUnref) {
			          timer.unref();
			        }
			        this.subs.push(function () {
			          _this2.clearTimeoutFn(timer);
			        });
			      }
			      this.subs.push(openSubDestroy);
			      this.subs.push(errorSub);
			      return this;
			    }
			    /**
			     * Alias for open()
			     *
			     * @return self
			     * @public
			     */;
			    _proto.connect = function connect(fn) {
			      return this.open(fn);
			    }
			    /**
			     * Called upon transport open.
			     *
			     * @private
			     */;
			    _proto.onopen = function onopen() {
			      debug$1("open");
			      // clear old subs
			      this.cleanup();
			      // mark as open
			      this._readyState = "open";
			      this.emitReserved("open");
			      // add new subs
			      var socket = this.engine;
			      this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)),
			      // @ts-ignore
			      on(this.decoder, "decoded", this.ondecoded.bind(this)));
			    }
			    /**
			     * Called upon a ping.
			     *
			     * @private
			     */;
			    _proto.onping = function onping() {
			      this.emitReserved("ping");
			    }
			    /**
			     * Called with data.
			     *
			     * @private
			     */;
			    _proto.ondata = function ondata(data) {
			      try {
			        this.decoder.add(data);
			      } catch (e) {
			        this.onclose("parse error", e);
			      }
			    }
			    /**
			     * Called when parser fully decodes a packet.
			     *
			     * @private
			     */;
			    _proto.ondecoded = function ondecoded(packet) {
			      var _this3 = this;
			      // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
			      nextTick(function () {
			        _this3.emitReserved("packet", packet);
			      }, this.setTimeoutFn);
			    }
			    /**
			     * Called upon socket error.
			     *
			     * @private
			     */;
			    _proto.onerror = function onerror(err) {
			      debug$1("error", err);
			      this.emitReserved("error", err);
			    }
			    /**
			     * Creates a new socket for the given `nsp`.
			     *
			     * @return {Socket}
			     * @public
			     */;
			    _proto.socket = function socket(nsp, opts) {
			      var socket = this.nsps[nsp];
			      if (!socket) {
			        socket = new Socket(this, nsp, opts);
			        this.nsps[nsp] = socket;
			      } else if (this._autoConnect && !socket.active) {
			        socket.connect();
			      }
			      return socket;
			    }
			    /**
			     * Called upon a socket close.
			     *
			     * @param socket
			     * @private
			     */;
			    _proto._destroy = function _destroy(socket) {
			      var nsps = Object.keys(this.nsps);
			      for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
			        var nsp = _nsps[_i];
			        var _socket = this.nsps[nsp];
			        if (_socket.active) {
			          debug$1("socket %s is still active, skipping close", nsp);
			          return;
			        }
			      }
			      this._close();
			    }
			    /**
			     * Writes a packet.
			     *
			     * @param packet
			     * @private
			     */;
			    _proto._packet = function _packet(packet) {
			      debug$1("writing packet %j", packet);
			      var encodedPackets = this.encoder.encode(packet);
			      for (var i = 0; i < encodedPackets.length; i++) {
			        this.engine.write(encodedPackets[i], packet.options);
			      }
			    }
			    /**
			     * Clean up transport subscriptions and packet buffer.
			     *
			     * @private
			     */;
			    _proto.cleanup = function cleanup() {
			      debug$1("cleanup");
			      this.subs.forEach(function (subDestroy) {
			        return subDestroy();
			      });
			      this.subs.length = 0;
			      this.decoder.destroy();
			    }
			    /**
			     * Close the current socket.
			     *
			     * @private
			     */;
			    _proto._close = function _close() {
			      debug$1("disconnect");
			      this.skipReconnect = true;
			      this._reconnecting = false;
			      this.onclose("forced close");
			    }
			    /**
			     * Alias for close()
			     *
			     * @private
			     */;
			    _proto.disconnect = function disconnect() {
			      return this._close();
			    }
			    /**
			     * Called when:
			     *
			     * - the low-level engine is closed
			     * - the parser encountered a badly formatted packet
			     * - all sockets are disconnected
			     *
			     * @private
			     */;
			    _proto.onclose = function onclose(reason, description) {
			      var _a;
			      debug$1("closed due to %s", reason);
			      this.cleanup();
			      (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
			      this.backoff.reset();
			      this._readyState = "closed";
			      this.emitReserved("close", reason, description);
			      if (this._reconnection && !this.skipReconnect) {
			        this.reconnect();
			      }
			    }
			    /**
			     * Attempt a reconnection.
			     *
			     * @private
			     */;
			    _proto.reconnect = function reconnect() {
			      var _this4 = this;
			      if (this._reconnecting || this.skipReconnect) return this;
			      var self = this;
			      if (this.backoff.attempts >= this._reconnectionAttempts) {
			        debug$1("reconnect failed");
			        this.backoff.reset();
			        this.emitReserved("reconnect_failed");
			        this._reconnecting = false;
			      } else {
			        var delay = this.backoff.duration();
			        debug$1("will wait %dms before reconnect attempt", delay);
			        this._reconnecting = true;
			        var timer = this.setTimeoutFn(function () {
			          if (self.skipReconnect) return;
			          debug$1("attempting reconnect");
			          _this4.emitReserved("reconnect_attempt", self.backoff.attempts);
			          // check again for the case socket closed in above events
			          if (self.skipReconnect) return;
			          self.open(function (err) {
			            if (err) {
			              debug$1("reconnect attempt error");
			              self._reconnecting = false;
			              self.reconnect();
			              _this4.emitReserved("reconnect_error", err);
			            } else {
			              debug$1("reconnect success");
			              self.onreconnect();
			            }
			          });
			        }, delay);
			        if (this.opts.autoUnref) {
			          timer.unref();
			        }
			        this.subs.push(function () {
			          _this4.clearTimeoutFn(timer);
			        });
			      }
			    }
			    /**
			     * Called upon successful reconnect.
			     *
			     * @private
			     */;
			    _proto.onreconnect = function onreconnect() {
			      var attempt = this.backoff.attempts;
			      this._reconnecting = false;
			      this.backoff.reset();
			      this.emitReserved("reconnect", attempt);
			    };
			    return Manager;
			  }(Emitter);

			  var debug = debugModule("socket.io-client"); // debug()
			  /**
			   * Managers cache.
			   */
			  var cache = {};
			  function lookup(uri, opts) {
			    if (_typeof(uri) === "object") {
			      opts = uri;
			      uri = undefined;
			    }
			    opts = opts || {};
			    var parsed = url(uri, opts.path || "/socket.io");
			    var source = parsed.source;
			    var id = parsed.id;
			    var path = parsed.path;
			    var sameNamespace = cache[id] && path in cache[id]["nsps"];
			    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
			    var io;
			    if (newConnection) {
			      debug("ignoring socket cache for %s", source);
			      io = new Manager(source, opts);
			    } else {
			      if (!cache[id]) {
			        debug("new io instance for %s", source);
			        cache[id] = new Manager(source, opts);
			      }
			      io = cache[id];
			    }
			    if (parsed.query && !opts.query) {
			      opts.query = parsed.queryKey;
			    }
			    return io.socket(parsed.path, opts);
			  }
			  // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
			  // namespace (e.g. `io.connect(...)`), for backward compatibility
			  _extends(lookup, {
			    Manager: Manager,
			    Socket: Socket,
			    io: lookup,
			    connect: lookup
			  });

			  return lookup;

			}));
			
		} (socket_io$1));
		return socket_io$1.exports;
	}

	var socket_ioExports = requireSocket_io();
	var io = /*@__PURE__*/getDefaultExportFromCjs(socket_ioExports);

	var core$1 = {exports: {}};

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
			var Root = Symbol.for("react.root");
			var Scope = Symbol.for("react.scope");
			var ScopeLazy = Symbol.for("react.scope_lazy");
			var ScopeSuspense = Symbol.for("react.scope_suspense");
			var Comment = Symbol.for("react.comment");
			var Offscreen = Symbol.for("react.offscreen");
			var Activity = Symbol.for("react.activity");
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
			        return Array.from(this.arr);
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
			    HOOK_TYPE[HOOK_TYPE["useOptimistic"] = 16] = "useOptimistic";
			    HOOK_TYPE[HOOK_TYPE["useEffectEvent"] = 17] = "useEffectEvent";
			})(exports.HOOK_TYPE || (exports.HOOK_TYPE = {}));

			exports.UpdateQueueType = void 0;
			(function (UpdateQueueType) {
			    UpdateQueueType[UpdateQueueType["component"] = 1] = "component";
			    UpdateQueueType[UpdateQueueType["hook"] = 2] = "hook";
			    UpdateQueueType[UpdateQueueType["context"] = 3] = "context";
			    UpdateQueueType[UpdateQueueType["hmr"] = 4] = "hmr";
			    UpdateQueueType[UpdateQueueType["trigger"] = 5] = "trigger";
			    UpdateQueueType[UpdateQueueType["suspense"] = 6] = "suspense";
			    UpdateQueueType[UpdateQueueType["lazy"] = 7] = "lazy";
			    UpdateQueueType[UpdateQueueType["promise"] = 8] = "promise";
			})(exports.UpdateQueueType || (exports.UpdateQueueType = {}));

			exports.STATE_TYPE = void 0;
			(function (STATE_TYPE) {
			    STATE_TYPE[STATE_TYPE["__initial__"] = 0] = "__initial__";
			    STATE_TYPE[STATE_TYPE["__create__"] = 1] = "__create__";
			    STATE_TYPE[STATE_TYPE["__stable__"] = 2] = "__stable__";
			    STATE_TYPE[STATE_TYPE["__inherit__"] = 4] = "__inherit__";
			    STATE_TYPE[STATE_TYPE["__triggerConcurrent__"] = 8] = "__triggerConcurrent__";
			    STATE_TYPE[STATE_TYPE["__triggerConcurrentForce__"] = 16] = "__triggerConcurrentForce__";
			    STATE_TYPE[STATE_TYPE["__triggerSync__"] = 32] = "__triggerSync__";
			    STATE_TYPE[STATE_TYPE["__triggerSyncForce__"] = 64] = "__triggerSyncForce__";
			    STATE_TYPE[STATE_TYPE["__unmount__"] = 128] = "__unmount__";
			    STATE_TYPE[STATE_TYPE["__hmr__"] = 256] = "__hmr__";
			    STATE_TYPE[STATE_TYPE["__retrigger__"] = 512] = "__retrigger__";
			    STATE_TYPE[STATE_TYPE["__reschedule__"] = 1024] = "__reschedule__";
			    STATE_TYPE[STATE_TYPE["__recreate__"] = 2048] = "__recreate__";
			    STATE_TYPE[STATE_TYPE["__suspense__"] = 4096] = "__suspense__";
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

			exports.Activity = Activity;
			exports.Comment = Comment;
			exports.Consumer = Consumer;
			exports.Context = Context;
			exports.Element = Element;
			exports.ForwardRef = ForwardRef;
			exports.Fragment = Fragment;
			exports.Lazy = Lazy;
			exports.ListTree = ListTree;
			exports.ListTreeNode = ListTreeNode;
			exports.Memo = Memo;
			exports.Offscreen = Offscreen;
			exports.Portal = Portal;
			exports.Profiler = Profiler;
			exports.Provider = Provider;
			exports.Root = Root;
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

	var hasRequiredIndex_production;

	function requireIndex_production () {
		if (hasRequiredIndex_production) return index_production$1;
		hasRequiredIndex_production = 1;
		(function (exports) {

			var reactShared = requireReactShared();
			var ErrorStackParser = requireErrorStackParser();

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
			    NODE_TYPE[NODE_TYPE["__internal__"] = 32768] = "__internal__";
			    NODE_TYPE[NODE_TYPE["__scope__"] = 65536] = "__scope__";
			    NODE_TYPE[NODE_TYPE["__comment__"] = 131072] = "__comment__";
			    NODE_TYPE[NODE_TYPE["__profiler__"] = 262144] = "__profiler__";
			    NODE_TYPE[NODE_TYPE["__context__"] = 524288] = "__context__";
			    NODE_TYPE[NODE_TYPE["__scopeLazy__"] = 1048576] = "__scopeLazy__";
			    NODE_TYPE[NODE_TYPE["__scopeSuspense__"] = 2097152] = "__scopeSuspense__";
			    NODE_TYPE[NODE_TYPE["__activity__"] = 4194304] = "__activity__";
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
			            Dispatcher.useOptimistic(null, function (s, a) { return s; });
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
			            // new version of @my-react change the `state` to `status`
			            var field = thenable.state || thenable.status;
			            switch (field) {
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
			        value: ref.current,
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
			    var isPending = hook ? (Array.isArray(hook.result) ? hook.result[0] : hook.result.value) : false;
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
			function useOptimistic(passthrough, reducer) {
			    var _a;
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useOptimistic) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var state = hook ? (_a = hook.result) === null || _a === void 0 ? void 0 : _a.value : passthrough;
			    hookLog.push({
			        displayName: null,
			        primitive: "Optimistic",
			        stackError: new Error(),
			        value: state,
			        dispatcherHookName: "Optimistic",
			    });
			    return [state, function (action) { }];
			}
			function useEffectEvent(passthrough) {
			    var hook = nextHook();
			    if (hook && hook.type !== reactShared.HOOK_TYPE.useEffectEvent) {
			        throw new Error("Invalid hook type, look like a bug for @my-react/devtools");
			    }
			    var state = hook ? hook.result : passthrough;
			    hookLog.push({
			        displayName: null,
			        primitive: "EffectEvent",
			        stackError: new Error(),
			        value: state,
			        dispatcherHookName: "EffectEvent",
			    });
			    return state;
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
			    useOptimistic: useOptimistic,
			    useEffectEvent: useEffectEvent,
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
			    var rootStack = ancestorStackError === undefined ? [] : ErrorStackParser.parse(ancestorStackError);
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
			    var rootStack = ancestorStackError === undefined ? [] : ErrorStackParser.parse(ancestorStackError);
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

			/**
			 * Copyright (c) Meta Platforms, Inc. and affiliates.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 *
			 */
			// This is a DevTools fork of shared/ConsolePatchingDev.
			// The shared console patching code is DEV-only.
			// We can't use it since DevTools only ships production builds.
			// Helpers to patch console.logs to avoid logging during side-effect free
			// replaying on render function. This currently only patches the object
			// lazily which won't cover if the log function was extracted eagerly.
			// We could also eagerly patch the method.
			var disabledDepth = 0;
			var prevLog;
			var prevInfo;
			var prevWarn;
			var prevError;
			var prevGroup;
			var prevGroupCollapsed;
			var prevGroupEnd;
			function disabledLog() { }
			disabledLog.__reactDisabledLog = true;
			function disableLogs() {
			    if (disabledDepth === 0) {
			        prevLog = console.log;
			        prevInfo = console.info;
			        prevWarn = console.warn;
			        prevError = console.error;
			        prevGroup = console.group;
			        prevGroupCollapsed = console.groupCollapsed;
			        prevGroupEnd = console.groupEnd;
			        // https://github.com/facebook/react/issues/19099
			        var props = {
			            configurable: true,
			            enumerable: true,
			            value: disabledLog,
			            writable: true,
			        };
			        // $FlowFixMe[cannot-write] Flow thinks console is immutable.
			        Object.defineProperties(console, {
			            info: props,
			            log: props,
			            warn: props,
			            error: props,
			            group: props,
			            groupCollapsed: props,
			            groupEnd: props,
			        });
			    }
			    disabledDepth++;
			}
			function reenableLogs() {
			    disabledDepth--;
			    if (disabledDepth === 0) {
			        var props = {
			            configurable: true,
			            enumerable: true,
			            writable: true,
			        };
			        // $FlowFixMe[cannot-write] Flow thinks console is immutable.
			        Object.defineProperties(console, {
			            log: __assign(__assign({}, props), { value: prevLog }),
			            info: __assign(__assign({}, props), { value: prevInfo }),
			            warn: __assign(__assign({}, props), { value: prevWarn }),
			            error: __assign(__assign({}, props), { value: prevError }),
			            group: __assign(__assign({}, props), { value: prevGroup }),
			            groupCollapsed: __assign(__assign({}, props), { value: prevGroupCollapsed }),
			            groupEnd: __assign(__assign({}, props), { value: prevGroupEnd }),
			        });
			    }
			    if (disabledDepth < 0) {
			        console.error('disabledDepth fell below zero. ' +
			            'This is a bug in React. Please file an issue.');
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

			/* eslint-disable max-lines */
			var treeMap = new Map();
			var detailMap = new Map();
			var fiberStore = new Map();
			var domToFiber = new WeakMap();
			var plainStore = new Map();
			var directory = {};
			var linkStateToHookIndex = new WeakMap();
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
			var assignFiber = function (plain, fiber) {
			    shallowAssignFiber(plain, fiber);
			    plain.p = getProps(fiber);
			    plain._s = getSource(fiber);
			    plain._t = getTree(fiber);
			    plain._h = getHook(fiber);
			    if (fiber.type & exports.NODE_TYPE.__class__) {
			        plain.s = getState(fiber);
			    }
			};
			// TODO improve performance
			var loopTree = function (fiber, parent) {
			    if (!fiber)
			        return null;
			    if (reactShared.include(fiber.state, reactShared.STATE_TYPE.__unmount__))
			        return null;
			    var exist = treeMap.get(fiber);
			    var current = exist || new PlainNode();
			    current.c = null;
			    if (parent) {
			        parent.c = parent.c || [];
			        parent.c.push(current);
			        current.d = parent.d + 1;
			    }
			    else {
			        current.d = 0;
			    }
			    current._d = current.d;
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
			    if (reactShared.include(fiber.state, reactShared.STATE_TYPE.__unmount__))
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
			        current.d = parent.d + 1;
			    }
			    current._d = current.d;
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
			        _runtime.notifyUnmountNode(plain.i);
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
			var getDetailNodeByFiber = function (fiber) {
			    var plainNode = getPlainNodeByFiber(fiber);
			    if (!plainNode) {
			        throw new Error("plainNode not found, look like a bug for @my-react/devtools");
			    }
			    var exist = detailMap.get(fiber);
			    if (exist) {
			        assignFiber(exist, fiber);
			        return exist;
			    }
			    else {
			        var created = new PlainNode(plainNode.i);
			        assignFiber(created, fiber);
			        detailMap.set(fiber, created);
			        return created;
			    }
			};
			var getFiberByDom = function (dom) {
			    var fiber = domToFiber.get(dom);
			    if (!fiber) {
			        if (dom.parentElement) {
			            return getFiberByDom(dom.parentElement);
			        }
			        else {
			            return null;
			        }
			    }
			    else {
			        return fiber;
			    }
			};
			var getComponentFiberByDom = function (dom) {
			    var fiber = getFiberByDom(dom);
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
			var getComponentFiberByFiber = function (fiber) {
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
			var getDispatchFromFiber = function (fiber) {
			    if (!fiber)
			        return;
			    var typedFiber = fiber;
			    if (typedFiber.renderDispatch) {
			        return typedFiber.renderDispatch;
			    }
			    return getDispatchFromFiber(fiber.parent);
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
			        return "current hook state not exist";
			    var currentDataType = typeof currentData.v;
			    if (!parentData.f && currentDataType !== "boolean" && currentDataType !== "number" && currentDataType !== "string")
			        return "current hook state is not primitive";
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
			    if (parentData.f && !rootData.f) {
			        return "root hook state not exist";
			    }
			    // const parentDataValue = parentData.v;
			    // shallow update
			    if (parentData.v === rootData.v) {
			        var newPayLoad_1 = Object.assign({}, rootData.v);
			        newPayLoad_1[params.path] = newVal;
			        var hookInstance = hookNode;
			        if (hookInstance._dispatch) {
			            hookInstance._update({ isForce: true });
			        }
			        else {
			            hookInstance._update({ payLoad: function () { return newPayLoad_1; }, reducer: editorReducer, isForce: true });
			        }
			    }
			    else {
			        // deep update
			        var newPayLoad_2 = Object.assign({}, rootData.v);
			        parentData.v[params.path] = newVal;
			        var hookInstance = hookNode;
			        if (hookInstance._dispatch) {
			            hookInstance._update({ isForce: true });
			        }
			        else {
			            hookInstance._update({ payLoad: function () { return newPayLoad_2; }, reducer: editorReducer, isForce: true });
			        }
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
			    try {
			        if (params.type === "state") {
			            return updateFiberByState(fiber, params);
			        }
			        if (params.type === "hook") {
			            return updateFiberByHook(fiber, params);
			        }
			        if (params.type === "props") {
			            return updateFiberByProps(fiber, params);
			        }
			        return "type not valid";
			    }
			    catch (e) {
			        return e.message;
			    }
			};
			var tryLinkStateToHookIndex = function (fiber, state) {
			    var _a, _b, _c, _e, _f, _g;
			    if (state.needUpdate && state.nodes) {
			        // filter all hook update queue
			        var nodes = (_b = (_a = state.nodes) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.call(_a, function (node) { return node.type === reactShared.UpdateQueueType.hook; });
			        // get all the keys from the nodes;
			        var allHooksArray_1 = ((_e = (_c = fiber.hookList) === null || _c === void 0 ? void 0 : _c.toArray) === null || _e === void 0 ? void 0 : _e.call(_c)) || [];
			        var keys = ((_g = (_f = nodes === null || nodes === void 0 ? void 0 : nodes.map) === null || _f === void 0 ? void 0 : _f.call(nodes, function (node) { var _a; return (_a = allHooksArray_1 === null || allHooksArray_1 === void 0 ? void 0 : allHooksArray_1.findIndex) === null || _a === void 0 ? void 0 : _a.call(allHooksArray_1, function (_node) { return (node === null || node === void 0 ? void 0 : node.trigger) === _node; }); })) === null || _g === void 0 ? void 0 : _g.filter(function (i) { return i !== -1; })) || [];
			        // link the keys to the state
			        linkStateToHookIndex.set(state, keys);
			    }
			};
			var getHookIndexFromState = function (state) {
			    return linkStateToHookIndex.get(state);
			};
			var deleteLinkState = function (state) {
			    linkStateToHookIndex.delete(state);
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
			        case exports.NODE_TYPE.__internal__:
			            return "KEEP——Internal (not used)";
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
			        case exports.NODE_TYPE.__activity__:
			            return "Activity";
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
			var getNameFromRawType = function (rawType) {
			    if (typeof rawType === "object") {
			        return rawType.displayName || getNameFromRawType(rawType.render);
			    }
			    if (typeof rawType === "function") {
			        return rawType.displayName || rawType.name || "Anonymous";
			    }
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
			    if (fiber.type & exports.NODE_TYPE.__activity__)
			        return "Activity";
			    if (fiber.type & exports.NODE_TYPE.__strict__)
			        return "Strict";
			    if (fiber.type & exports.NODE_TYPE.__profiler__)
			        return "Profiler";
			    if (fiber.type & exports.NODE_TYPE.__suspense__)
			        return "Suspense";
			    if (fiber.type & exports.NODE_TYPE.__comment__)
			        return "Comment";
			    if (fiber.type & exports.NODE_TYPE.__internal__)
			        return "KEEP\u2014\u2014Internal";
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
			        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			        // @ts-ignore
			        var rawType = typedFiber.elementRawType;
			        // may be a Suspense element
			        var type = ((element === null || element === void 0 ? void 0 : element.type) || rawType);
			        name_5 = getNameFromRawType(type) || name_5;
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
			            case reactShared.Root:
			                nodeType = reactShared.merge(nodeType, exports.NODE_TYPE.__internal__);
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
			            var packageName = (dispatch === null || dispatch === void 0 ? void 0 : dispatch.renderPackage) || "@my-react";
			            tree.push("$$ ".concat(packageName, " ").concat(dispatch.renderMode));
			        }
			        if (dispatch && dispatch.version) {
			            if (dispatch.dispatcher) {
			                tree.push("$$ @my-react ".concat(dispatch.version));
			            }
			            else {
			                tree.push("$$ @my-react legacy ".concat(dispatch.version));
			            }
			        }
			        else {
			            tree.push("$$ @my-react legacy");
			        }
			    }
			    return tree;
			};
			var parseHooksTreeToHOOKTree = function (node, d, p) {
			    var _p = p || { index: 0 };
			    return node.map(function (item) {
			        var id = item.id, name = item.name, value = item.value, subHooks = item.subHooks, isStateEditable = item.isStateEditable;
			        var isHook = !subHooks || subHooks.length === 0;
			        var children = subHooks ? parseHooksTreeToHOOKTree(subHooks, d + 1, _p) : undefined;
			        return {
			            k: id === null || id === void 0 ? void 0 : id.toString(),
			            e: isStateEditable,
			            i: isHook ? _p.index++ : undefined,
			            n: name || "Anonymous",
			            v: getNode(value),
			            d: d,
			            h: isHook,
			            c: children,
			            // all the hooks key
			            keys: isHook ? [id] : children.map(function (c) { return c.keys; }).flat(),
			        };
			    });
			};
			var getHookNormal = function (fiber) {
			    var _a;
			    var final = [];
			    if (!fiber.hookList)
			        return final;
			    var hookList = fiber.hookList;
			    var processStack = function (hook, index) {
			        var _a;
			        var isEffect = hook.type === reactShared.HOOK_TYPE.useEffect || hook.type === reactShared.HOOK_TYPE.useLayoutEffect || hook.type === reactShared.HOOK_TYPE.useInsertionEffect;
			        var isRef = hook.type === reactShared.HOOK_TYPE.useRef;
			        var isContext = hook.type === reactShared.HOOK_TYPE.useContext;
			        final.push({
			            k: index.toString(),
			            i: index,
			            n: isContext ? getContextName(hook.value) : getHookName(hook.type),
			            v: getNode(isEffect ? hook.value : isRef ? (_a = hook.result) === null || _a === void 0 ? void 0 : _a.current : hook.result),
			            d: 0,
			            h: true,
			            keys: [index],
			        });
			    };
			    (_a = hookList === null || hookList === void 0 ? void 0 : hookList.toArray()) === null || _a === void 0 ? void 0 : _a.forEach(processStack);
			    return final;
			};
			// disable all log
			var getHookStack = function (fiber, dispatch) {
			    var final = [];
			    if (!fiber.hookList)
			        return final;
			    disableLogs();
			    var hookTree = inspectHooksOfFiber(fiber, dispatch.dispatcher);
			    reenableLogs();
			    return parseHooksTreeToHOOKTree(hookTree, 0);
			};
			var getHook = function (fiber) {
			    var dispatch = getDispatchFromFiber(fiber);
			    if (dispatch && dispatch.dispatcher) {
			        try {
			            return getHookStack(fiber, dispatch);
			        }
			        catch (e) {
			            console.error(e);
			            return getHookNormal(fiber);
			        }
			    }
			    else {
			        return getHookNormal(fiber);
			    }
			};
			var getProps = function (fiber) {
			    return getNode(fiber.pendingProps);
			};
			var getState = function (fiber) {
			    return getNode(fiber.pendingState);
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
			// -- reactivity-store utils --
			var ReactiveFlags;
			(function (ReactiveFlags) {
			    ReactiveFlags["SKIP"] = "__v_skip";
			    ReactiveFlags["IS_REACTIVE"] = "__v_isReactive";
			    ReactiveFlags["IS_READONLY"] = "__v_isReadonly";
			    ReactiveFlags["IS_SHALLOW"] = "__v_isShallow";
			    ReactiveFlags["RAW"] = "__v_raw";
			    ReactiveFlags["IS_REF"] = "__v_isRef";
			})(ReactiveFlags || (ReactiveFlags = {}));
			function isReactive(value) {
			    if (isReadonly(value)) {
			        return isReactive(value[ReactiveFlags.RAW]);
			    }
			    return !!(value && value[ReactiveFlags.IS_REACTIVE]);
			}
			function isReadonly(value) {
			    return !!(value && value[ReactiveFlags.IS_READONLY]);
			}
			function isShallow(value) {
			    return !!(value && value[ReactiveFlags.IS_SHALLOW]);
			}
			function isProxy(value) {
			    return value ? !!value[ReactiveFlags.RAW] : false;
			}
			function isRef(r) {
			    return r ? r[ReactiveFlags.IS_REF] === true : false;
			}

			var isInBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
			var emptyConstructor = {}.constructor;
			var id = 1;
			var idToValueMap = new Map();
			var valueToIdMap = new Map();
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
			var getWrapperType = function (value) {
			    if (isReadonly(value)) {
			        return "Readonly";
			    }
			    if (isShallow(value)) {
			        return "Shallow";
			    }
			    if (isReactive(value)) {
			        return "Reactive";
			    }
			    if (isRef(value)) {
			        return "Ref";
			    }
			};
			var isObject = function (value) {
			    return (value !== "String" &&
			        value !== "Number" &&
			        value !== "Boolean" &&
			        value !== "Null" &&
			        value !== "Undefined" &&
			        value !== "Function" &&
			        value !== "AsyncFunction" &&
			        value !== "GeneratorFunction" &&
			        value !== "Symbol" &&
			        value !== "RegExp" &&
			        value !== "Promise" &&
			        value !== "Element" &&
			        value !== "WeakMap" &&
			        value !== "WeakSet");
			};
			var getTargetNode = function (value, type, deep) {
			    if (deep === void 0) { deep = 3; }
			    var existId = valueToIdMap.get(value);
			    var wrapperType = getWrapperType(value);
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
			            _t: wrapperType,
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
			                _t: wrapperType,
			                v: value.map(function (val) { return getNode(val, deep - 1); }),
			                e: true,
			            };
			        }
			        else if (type === "Iterable") {
			            return {
			                i: currentId,
			                t: type,
			                _t: wrapperType,
			                v: Array.from(value).map(function (val) { return getNode(val, deep - 1); }),
			                e: true,
			            };
			        }
			        else if (type === "Map") {
			            return {
			                i: currentId,
			                t: type,
			                _t: wrapperType,
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
			                _t: wrapperType,
			                v: Array.from(value).map(function (val) { return getNode(val, deep - 1); }),
			                e: true,
			            };
			        }
			        else if (type === "Object") {
			            return {
			                i: currentId,
			                t: type,
			                _t: wrapperType,
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
			                _t: wrapperType,
			                n: n,
			                v: Object.keys(value).reduce(function (acc, key) {
			                    acc[key] = getNode(value[key], deep - 1);
			                    return acc;
			                }, {}),
			                e: true,
			            };
			        }
			        else {
			            return {
			                i: currentId,
			                t: type,
			                _t: wrapperType || "Object",
			                n: n,
			                v: getAllKeys(value).reduce(function (acc, key) {
			                    acc[key] = getNode(value[key], deep - 1);
			                    return acc;
			                }, {}),
			                e: true,
			            };
			        }
			    }
			};
			var getAllKeys = function (data) {
			    if (!data)
			        return [];
			    var keys = [];
			    for (var key in data) {
			        keys.push(key);
			    }
			    return keys;
			};
			var getNode = function (value, deep) {
			    if (deep === void 0) { deep = 3; }
			    try {
			        var type = getType(value);
			        var expandable = isObject(type);
			        if (type === "Promise" && (value.status === "fulfilled" || value.status === "rejected")) {
			            expandable = true;
			        }
			        if (expandable) {
			            // full deep to load
			            return getTargetNode(value, type, deep);
			        }
			        else {
			            var wrapperType = getWrapperType(value);
			            var existId = valueToIdMap.get(value);
			            var currentId = existId || id++;
			            idToValueMap.set(currentId, value);
			            valueToIdMap.set(value, currentId);
			            if (type === "Element") {
			                return {
			                    i: currentId,
			                    t: type,
			                    _t: wrapperType,
			                    v: "<".concat(value.tagName.toLowerCase(), " />"),
			                    e: expandable,
			                };
			            }
			            if (type === "Error") {
			                return {
			                    i: currentId,
			                    t: type,
			                    _t: wrapperType,
			                    v: value.message,
			                    e: expandable,
			                };
			            }
			            if (typeof value === "object" && value !== null) {
			                return {
			                    i: currentId,
			                    t: type,
			                    _t: wrapperType,
			                    v: Object.prototype.toString.call(value),
			                    e: expandable,
			                };
			            }
			            else {
			                return {
			                    i: currentId,
			                    t: type,
			                    _t: wrapperType,
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
			var getNodeFromId = function (id) {
			    var value = idToValueMap.get(id);
			    if (value) {
			        return getNode(value);
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
			    DevToolMessageEnum["domHover"] = "dom-hover";
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
			var Select = /** @class */ (function () {
			    function Select(agent) {
			        this.agent = agent;
			        this.agent = agent;
			    }
			    Select.prototype.inspect = function (fiber) {
			        var _a, _b;
			        if (typeof window === "undefined")
			            return;
			        (_b = (_a = this.overlay) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
			        this.overlay = new Overlay(this.agent);
			        this.overlay.inspect(fiber, getElementNodesFromFiber(fiber));
			    };
			    Select.prototype.remove = function () {
			        var _a, _b;
			        if (typeof window === "undefined")
			            return;
			        (_b = (_a = this.overlay) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
			    };
			    return Select;
			}());

			// Note these colors are in sync with DevTools Profiler chart colors.
			var COLORS = ["#37afa9", "#63b19e", "#80b393", "#97b488", "#abb67d", "#beb771", "#cfb965", "#dfba57", "#efbb49", "#febc38"];
			var canvas = null;
			function drawWeb(nodeToData) {
			    if (canvas === null) {
			        initialize();
			    }
			    var dpr = window.devicePixelRatio || 1;
			    var canvasFlow = canvas;
			    canvasFlow.width = window.innerWidth * dpr;
			    canvasFlow.height = window.innerHeight * dpr;
			    canvasFlow.style.width = "".concat(window.innerWidth, "px");
			    canvasFlow.style.height = "".concat(window.innerHeight, "px");
			    var context = canvasFlow.getContext("2d");
			    context.scale(dpr, dpr);
			    context.clearRect(0, 0, canvasFlow.width / dpr, canvasFlow.height / dpr);
			    var mergedNodes = groupAndSortNodes(nodeToData);
			    mergedNodes.forEach(function (group) {
			        drawGroupBorders(context, group);
			        drawGroupLabel(context, group);
			    });
			}
			function groupAndSortNodes(nodeToData) {
			    var positionGroups = new Map();
			    iterateNodes(nodeToData, function (_a) {
			        var _b;
			        var rect = _a.rect, color = _a.color, displayName = _a.displayName, count = _a.count;
			        if (!rect)
			            return;
			        var key = "".concat(rect.left, ",").concat(rect.top);
			        if (!positionGroups.has(key))
			            positionGroups.set(key, []);
			        (_b = positionGroups.get(key)) === null || _b === void 0 ? void 0 : _b.push({ rect: rect, color: color, displayName: displayName, count: count });
			    });
			    return Array.from(positionGroups.values())
			        .reverse()
			        .sort(function (groupA, groupB) {
			        var maxCountA = Math.max.apply(Math, groupA.map(function (item) { return item.count; }));
			        var maxCountB = Math.max.apply(Math, groupB.map(function (item) { return item.count; }));
			        return maxCountA - maxCountB;
			    });
			}
			function drawGroupBorders(context, group) {
			    group.forEach(function (_a) {
			        var color = _a.color, rect = _a.rect;
			        context.beginPath();
			        context.strokeStyle = color;
			        context.rect(rect.left, rect.top, rect.width - 1, rect.height - 1);
			        context.stroke();
			    });
			}
			function drawGroupLabel(context, group) {
			    var mergedName = group
			        .map(function (_a) {
			        var displayName = _a.displayName, count = _a.count;
			        return (displayName ? "".concat(displayName).concat(count > 1 ? " x".concat(count) : "") : "");
			    })
			        .filter(Boolean)
			        .join(", ");
			    if (mergedName) {
			        drawLabel(context, group[0].rect, mergedName, group[0].color);
			    }
			}
			function draw(nodeToData) {
			    drawWeb(nodeToData);
			}
			function iterateNodes(nodeToData, execute) {
			    nodeToData.forEach(function (data, node) {
			        var colorIndex = Math.min(COLORS.length - 1, data.count - 1);
			        var color = COLORS[colorIndex];
			        execute({
			            color: color,
			            node: node,
			            count: data.count,
			            displayName: data.displayName,
			            expirationTime: data.expirationTime,
			            lastMeasuredAt: data.lastMeasuredAt,
			            rect: data.rect,
			        });
			    });
			}
			function drawLabel(context, rect, text, color) {
			    var left = rect.left, top = rect.top;
			    context.font = "10px monospace";
			    context.textBaseline = "middle";
			    context.textAlign = "center";
			    var padding = 2;
			    var textHeight = 14;
			    var metrics = context.measureText(text);
			    var backgroundWidth = metrics.width + padding * 2;
			    var backgroundHeight = textHeight;
			    var labelX = left;
			    var labelY = top - backgroundHeight;
			    context.fillStyle = color;
			    context.fillRect(labelX, labelY, backgroundWidth, backgroundHeight);
			    context.fillStyle = "#000000";
			    context.fillText(text, labelX + backgroundWidth / 2, labelY + backgroundHeight / 2);
			}
			function destroyWeb() {
			    if (canvas !== null) {
			        if (canvas.parentNode != null) {
			            canvas.parentNode.removeChild(canvas);
			        }
			        canvas = null;
			    }
			}
			function destroy() {
			    return destroyWeb();
			}
			function initialize() {
			    canvas = window.document.createElement("canvas");
			    canvas.style.cssText = "\n    xx-background-color: red;\n    xx-opacity: 0.5;\n    bottom: 0;\n    left: 0;\n    pointer-events: none;\n    position: fixed;\n    right: 0;\n    top: 0;\n    z-index: 1000000000;\n  ";
			    canvas.setAttribute("data-update", "@my-react");
			    var root = window.document.documentElement;
			    root.insertBefore(canvas, root.firstChild);
			}

			// How long the rect should be shown for?
			var DISPLAY_DURATION = 250;
			// What's the longest we are willing to show the overlay for?
			// This can be important if we're getting a flurry of events (e.g. scroll update).
			var MAX_DISPLAY_DURATION = 3000;
			// How long should a rect be considered valid for?
			var REMEASUREMENT_AFTER_DURATION = 250;
			// Some environments (e.g. React Native / Hermes) don't support the performance API yet.
			var getCurrentTime = typeof performance === "object" && typeof performance.now === "function" ? function () { return performance.now(); } : function () { return Date.now(); };
			var nodeToData = new Map();
			var drawAnimationFrameID = null;
			var redrawTimeoutID = null;
			function traceUpdates(fibers) {
			    fibers.forEach(function (fiber) {
			        var node = fiber.nativeNode;
			        if (!node)
			            return;
			        var data = nodeToData.get(node);
			        var now = getCurrentTime();
			        var lastMeasuredAt = data != null ? data.lastMeasuredAt : 0;
			        var rect = data != null ? data.rect : null;
			        if (rect === null || lastMeasuredAt + REMEASUREMENT_AFTER_DURATION < now) {
			            lastMeasuredAt = now;
			            rect = measureNode(node);
			        }
			        var comFiber = getComponentFiberByFiber(fiber);
			        var displayName = getFiberName((comFiber || fiber));
			        var plainNode = getPlainNodeByFiber(comFiber || fiber);
			        if (plainNode && plainNode.m) {
			            displayName += "✨";
			        }
			        nodeToData.set(node, {
			            count: data != null ? data.count + 1 : 1,
			            expirationTime: data != null ? Math.min(now + MAX_DISPLAY_DURATION, data.expirationTime + DISPLAY_DURATION) : now + DISPLAY_DURATION,
			            lastMeasuredAt: lastMeasuredAt,
			            rect: rect,
			            displayName: displayName,
			        });
			    });
			    if (redrawTimeoutID !== null) {
			        clearTimeout(redrawTimeoutID);
			        redrawTimeoutID = null;
			    }
			    if (drawAnimationFrameID === null) {
			        drawAnimationFrameID = requestAnimationFrame(prepareToDraw);
			    }
			}
			function prepareToDraw() {
			    drawAnimationFrameID = null;
			    redrawTimeoutID = null;
			    var now = getCurrentTime();
			    var earliestExpiration = Number.MAX_VALUE;
			    // Remove any items that have already expired.
			    nodeToData.forEach(function (data, node) {
			        if (data.expirationTime < now) {
			            nodeToData.delete(node);
			        }
			        else {
			            earliestExpiration = Math.min(earliestExpiration, data.expirationTime);
			        }
			    });
			    draw(nodeToData);
			    if (earliestExpiration !== Number.MAX_VALUE) {
			        redrawTimeoutID = setTimeout(prepareToDraw, earliestExpiration - now);
			    }
			}
			function measureNode(node) {
			    if (!node || typeof node.getBoundingClientRect !== "function") {
			        return null;
			    }
			    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			    // @ts-ignore
			    var currentWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;
			    return getNestedBoundingClientRect(node, currentWindow);
			}
			var Highlight = /** @class */ (function () {
			    function Highlight(agent) {
			        this.agent = agent;
			        this.pendingUpdates = new Set();
			        this.agent = agent;
			    }
			    Object.defineProperty(Highlight.prototype, "canvas", {
			        get: function () {
			            return canvas;
			        },
			        enumerable: false,
			        configurable: true
			    });
			    Highlight.prototype.addPending = function (fiber, type) {
			        if (typeof window === "undefined")
			            return;
			        if (type === "update") {
			            this.pendingUpdates.add(fiber);
			        }
			    };
			    Highlight.prototype.flushPending = function () {
			        if (typeof window === "undefined")
			            return;
			        traceUpdates(this.pendingUpdates);
			        this.pendingUpdates.clear();
			    };
			    Highlight.prototype.cancelPending = function () {
			        if (typeof window === "undefined")
			            return;
			        nodeToData.clear();
			        if (drawAnimationFrameID !== null) {
			            cancelAnimationFrame(drawAnimationFrameID);
			            drawAnimationFrameID = null;
			        }
			        if (redrawTimeoutID !== null) {
			            clearTimeout(redrawTimeoutID);
			            redrawTimeoutID = null;
			        }
			        destroy();
			    };
			    return Highlight;
			}());

			var getHMRState = function (dispatch) {
			    return dispatch === null || dispatch === void 0 ? void 0 : dispatch["$$hasRefreshInject"];
			};
			var getHMRInternal = function (dispatch, type) {
			    var _a, _b;
			    return (_b = (_a = dispatch === null || dispatch === void 0 ? void 0 : dispatch.__dev_refresh_runtime__) === null || _a === void 0 ? void 0 : _a.getSignatureByType) === null || _b === void 0 ? void 0 : _b.call(_a, type);
			};
			var getHMRInternalFromId = function (id) {
			    var fiber = getFiberNodeById(id.toString());
			    var dispatch = getDispatchFromFiber(fiber);
			    var hmrEnabled = getHMRState(dispatch);
			    if (!hmrEnabled)
			        return;
			    if (dispatch && fiber && reactShared.include(fiber.type, reactShared.merge(exports.NODE_TYPE.__function__, exports.NODE_TYPE.__class__))) {
			        return getHMRInternal(dispatch, fiber.elementType);
			    }
			};

			// browser platform inspect
			var inspectSource = function (core) {
			    if (!core.hasEnable)
			        return;
			    if (typeof globalThis["inspect"] !== "function") {
			        core.notifyMessage("current platform not support inspect", "warning");
			        return;
			    }
			    if (typeof core._source === "function" && typeof globalThis["inspect"] === "function") {
			        var s = core._source;
			        core._source = null;
			        globalThis["inspect"](s);
			        return;
			    }
			    if (core._source && typeof HTMLElement !== "undefined" && core._source instanceof HTMLElement && typeof globalThis["inspect"] === "function") {
			        var s = core._source;
			        core._source = null;
			        globalThis["inspect"](s);
			        window["$$$$0"] = s;
			        return;
			    }
			    core.notifyMessage("can not view source for current item", "warning");
			};
			var inspectCom = function (core) {
			    if (!core.hasEnable)
			        return;
			    var id = core._selectId;
			    if (!id)
			        return;
			    if (typeof globalThis["inspect"] !== "function") {
			        core.notifyMessage("current platform not support inspect", "warning");
			        return;
			    }
			    var fiber = getFiberNodeById(id);
			    if (fiber) {
			        var elementType = fiber.elementType;
			        if (typeof globalThis["inspect"] === "function" && elementType) {
			            globalThis["inspect"](elementType);
			            return;
			        }
			    }
			    core.notifyMessage("current id: ".concat(id, " of fiber can not inspect"), "warning");
			};
			var inspectDom = function (core) {
			    if (!core.hasEnable)
			        return;
			    var dom = core._selectDom;
			    if (typeof globalThis["inspect"] !== "function") {
			        core.notifyMessage("current platform not support inspect", "warning");
			        return;
			    }
			    if (typeof globalThis["inspect"] === "function" && dom) {
			        globalThis["inspect"](dom);
			        window["$$$$0"] = dom;
			        return;
			    }
			    core.notifyMessage("current id: ".concat(core._selectId, " of fiber not contain dom node"), "warning");
			};
			var cb = function () { };
			var enableBrowserHover = function (core) {
			    if (!core.hasEnable)
			        return;
			    if (core._enableHoverOnBrowser)
			        return;
			    if (typeof document === "undefined") {
			        return;
			    }
			    core._enableHoverOnBrowser = true;
			    core.select.remove();
			    var debounceNotifyDomHover = debounce(function () {
			        core.notifyDomHover();
			        core.disableBrowserHover();
			        core.notifyConfig();
			    }, 100);
			    var onMouseEnter = debounce(function (e) {
			        var target = e.target;
			        core.select.remove();
			        if (!core.hasEnable)
			            return;
			        if (target.nodeType === Node.ELEMENT_NODE) {
			            var fiber = getComponentFiberByDom(target);
			            if (fiber) {
			                core.select.remove();
			                core.select.inspect(fiber);
			                var id = getPlainNodeIdByFiber(fiber);
			                core._tempDomHoverId = id;
			                // debounceNotifyDomHover();
			            }
			        }
			    }, 16);
			    var onClick = function (e) {
			        if (!core.hasEnable)
			            return;
			        core._domHoverId = core._tempDomHoverId;
			        debounceNotifyDomHover();
			        e.stopPropagation();
			        e.preventDefault();
			    };
			    document.addEventListener("mouseenter", onMouseEnter, true);
			    document.addEventListener("click", onClick, true);
			    document.addEventListener("mousedown", onClick, true);
			    document.addEventListener("pointerdown", onClick, true);
			    cb = function () {
			        core._enableHoverOnBrowser = false;
			        core.select.remove();
			        document.removeEventListener("mouseenter", onMouseEnter, true);
			        document.removeEventListener("click", onClick, true);
			        document.removeEventListener("mousedown", onClick, true);
			        document.removeEventListener("pointerdown", onClick, true);
			    };
			};
			var disableBrowserHover = function (core) {
			    if (!core._enableHoverOnBrowser)
			        return;
			    cb();
			};

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
			    if (typeof dispatch.onFiberInitial === "function") {
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

			var DevToolCore = /** @class */ (function () {
			    function DevToolCore() {
			        var _this = this;
			        this._dispatch = new Set();
			        // 是否存在 @my-react
			        this._detector = false;
			        this._origin = "";
			        this._map = new Map();
			        this._timeMap = new Map();
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
			            _this.notifyHMRExtend();
			            _this.notifyWarn();
			            _this.notifyWarnStatus();
			            _this.notifyError();
			            _this.notifyErrorStatus();
			        }, 200);
			        this.update = new Highlight(this);
			        this.select = new Select(this);
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
			        enableBrowserHover(this);
			    };
			    DevToolCore.prototype.disableBrowserHover = function () {
			        disableBrowserHover(this);
			    };
			    DevToolCore.prototype.setUpdateStatus = function (d) {
			        this._enableUpdate = d;
			        if (!this._enableUpdate) {
			            this.update.cancelPending();
			        }
			    };
			    DevToolCore.prototype.setRetriggerStatus = function (d) {
			        this._enableRetrigger = d;
			        this.notifyTrigger();
			        this.notifyTriggerStatus();
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
			            _this.notifyHMRStatus();
			            _this.notifyHMRExtend();
			            _this.notifyTriggerStatus();
			            _this.notifyWarnStatus();
			            _this.notifyErrorStatus();
			        }, 200);
			        var onTrace = function () {
			            if (!_this.hasEnable)
			                return;
			            if (!_this._enableUpdate)
			                return;
			            _this.update.flushPending();
			        };
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
			        var notifyTriggerWithThrottle = throttle(function () { return _this.notifyTrigger(); }, 100);
			        var onFiberTrigger = function (fiber, state) {
			            var id = getPlainNodeIdByFiber(fiber);
			            if (!id)
			                return;
			            _this._trigger[id] = _this._trigger[id] || [];
			            // 长数据过滤
			            if (_this._trigger[id].length > 10) {
			                var index = _this._trigger[id].length - 11;
			                if (_this._trigger[id][index]) {
			                    deleteLinkState(_this._trigger[id][index]);
			                }
			                _this._trigger[id][index] = { isRetrigger: _this._trigger[id][index].isRetrigger };
			            }
			            tryLinkStateToHookIndex(fiber, state);
			            _this._trigger[id].push(state);
			            if (!_this.hasEnable)
			                return;
			            notifyTriggerWithThrottle();
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
			                _this.notifyHMRExtend();
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
			                _this.update.addPending(fiber, "warn");
			            }
			            _this.notifyHighlight(id, "performance");
			        };
			        var onDOMUpdate = function (fiber) {
			            if (_this.hasEnable && _this._enableUpdate) {
			                _this.update.addPending(fiber, "update");
			            }
			        };
			        var onDOMAppend = function (fiber) {
			            if (_this.hasEnable && _this._enableUpdate) {
			                _this.update.addPending(fiber, "append");
			            }
			        };
			        var onDOMSetRef = function (fiber) {
			            if (_this.hasEnable && _this._enableUpdate) {
			                _this.update.addPending(fiber, "setRef");
			            }
			        };
			        if (typeof dispatch.onFiberTrigger === "function") {
			            if (typeof dispatch.onAfterCommitMount === "function") {
			                dispatch.onAfterCommitMount(onLoad);
			                dispatch.onAfterCommitUpdate(onTrace);
			                dispatch.onAfterCommitUnmount(onUnmount);
			            }
			            else {
			                dispatch.onAfterCommit(onLoad);
			                dispatch.onAfterUpdate(onTrace);
			                (_a = dispatch.onAfterUnmount) === null || _a === void 0 ? void 0 : _a.call(dispatch, onUnmount);
			            }
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
			        if (!this._enableHover)
			            return;
			        this.select.remove();
			        if (this._hoverId) {
			            var fiber = getFiberNodeById(this._hoverId);
			            if (fiber) {
			                this.select.inspect(fiber);
			            }
			        }
			        else {
			            this.select.remove();
			        }
			    };
			    DevToolCore.prototype.inspectDom = function () {
			        inspectDom(this);
			    };
			    DevToolCore.prototype.inspectCom = function () {
			        inspectCom(this);
			    };
			    DevToolCore.prototype.inspectSource = function () {
			        inspectSource(this);
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
			        this._notify({
			            type: exports.DevToolMessageEnum.triggerStatus,
			            data: finalStatus.map(function (i) {
			                var _keysToLinkHook = getHookIndexFromState(i);
			                var node = getNode(i);
			                if (_keysToLinkHook && _keysToLinkHook.length > 0) {
			                    node._keysToLinkHook = _keysToLinkHook;
			                }
			                return node;
			            }),
			        });
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
			    DevToolCore.prototype.notifyHMRExtend = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var extend = getHMRInternalFromId(id);
			        this._notify({ type: exports.DevToolMessageEnum.hmrInternal, data: extend ? getNode(extend) : null });
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
			    DevToolCore.prototype.notifySelect = function () {
			        if (!this.hasEnable)
			            return;
			        var id = this._selectId;
			        if (!id)
			            return;
			        var fiber = getFiberNodeById(id);
			        if (fiber) {
			            this._notify({ type: exports.DevToolMessageEnum.detail, data: getDetailNodeByFiber(fiber) });
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
			            this._notify({ type: exports.DevToolMessageEnum.selectSync, data: this._selectId });
			        }
			    };
			    DevToolCore.prototype.notifyUnmountNode = function (id) {
			        if (!this.hasEnable)
			            return;
			        this._notify({ type: exports.DevToolMessageEnum.unmountNode, data: id });
			    };
			    DevToolCore.prototype.notifyDomHover = function () {
			        if (!this.hasEnable)
			            return;
			        this._notify({ type: exports.DevToolMessageEnum.domHover, data: this._domHoverId });
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
			                this._timeMap.set(dispatch, now);
			                var tree = this.getTree(dispatch);
			                this._notify({ type: exports.DevToolMessageEnum.ready, data: tree });
			            }
			            else {
			                var last = this._timeMap.get(dispatch);
			                if (last && now - last < 200)
			                    return;
			                this._timeMap.set(dispatch, now);
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
			        if (!this._enabled)
			            return;
			        this.select.remove();
			        this.update.cancelPending();
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
			        this._enableHoverOnBrowser = false;
			        this.disableBrowserHover();
			    };
			    DevToolCore.prototype.clearHMR = function () {
			        this._hmr = {};
			        this.notifyHMR();
			        this.notifyHMRStatus();
			    };
			    DevToolCore.prototype.clearMessage = function () {
			        this._warn = {};
			        this._error = {};
			        this.notifyWarn();
			        this.notifyError();
			        this.notifyWarnStatus();
			        this.notifyErrorStatus();
			    };
			    DevToolCore.prototype.clearTrigger = function () {
			        this._trigger = {};
			        this.notifyTrigger();
			        this.notifyTriggerStatus();
			    };
			    return DevToolCore;
			}());

			exports.DevToolCore = DevToolCore;
			exports.DevToolSource = DevToolSource;
			exports.PlainNode = PlainNode;
			exports.assignFiber = assignFiber;
			exports.debounce = debounce;
			exports.deleteLinkState = deleteLinkState;
			exports.generateTreeMap = generateTreeMap;
			exports.getComponentFiberByDom = getComponentFiberByDom;
			exports.getComponentFiberByFiber = getComponentFiberByFiber;
			exports.getContextName = getContextName;
			exports.getDetailNodeByFiber = getDetailNodeByFiber;
			exports.getDispatchFromFiber = getDispatchFromFiber;
			exports.getElementName = getElementName;
			exports.getElementNodesFromFiber = getElementNodesFromFiber;
			exports.getFiberByDom = getFiberByDom;
			exports.getFiberName = getFiberName;
			exports.getFiberNodeById = getFiberNodeById;
			exports.getFiberTag = getFiberTag;
			exports.getFiberType = getFiberType;
			exports.getHook = getHook;
			exports.getHookIndexFromState = getHookIndexFromState;
			exports.getHookName = getHookName;
			exports.getMockFiberFromElement = getMockFiberFromElement;
			exports.getNode = getNode;
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
			exports.isProxy = isProxy;
			exports.isReactive = isReactive;
			exports.isReadonly = isReadonly;
			exports.isRef = isRef;
			exports.isShallow = isShallow;
			exports.isValidElement = isValidElement;
			exports.loopChangedTree = loopChangedTree;
			exports.loopTree = loopTree;
			exports.shallowAssignFiber = shallowAssignFiber;
			exports.throttle = throttle;
			exports.tryLinkStateToHookIndex = tryLinkStateToHookIndex;
			exports.typeKeys = typeKeys;
			exports.unmountPlainNode = unmountPlainNode;
			exports.updateFiberNode = updateFiberNode; 
		} (index_production$1));
		return index_production$1;
	}

	var hasRequiredCore;

	function requireCore () {
		if (hasRequiredCore) return core$1.exports;
		hasRequiredCore = 1;

		{
		  core$1.exports = requireIndex_production();
		}
		return core$1.exports;
	}

	var coreExports = requireCore();

	var core = new coreExports.DevToolCore();

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

	var reactSharedExports = requireReactShared();

	/* eslint-disable @typescript-eslint/no-require-imports */
	var varId = 0;
	var getValidGlobalVarName = function () {
	    var varName = "$my-react-var-".concat(varId++);
	    while (globalThis[varName]) {
	        varName = "$my-react-var-".concat(varId++);
	    }
	    return varName;
	};
	var loadScript = function (url) {
	    if (typeof window !== "undefined") {
	        return new Promise(function (resolve, reject) {
	            if (typeof document === "undefined") {
	                reject(new Error("[@my-react-devtool/hook] document not found, current environment not support"));
	                return;
	            }
	            var script = document.createElement("script");
	            script.src = url;
	            script.onload = function () { return resolve(); };
	            script.onerror = reject;
	            document.body.appendChild(script);
	        });
	    }
	    else {
	        return Promise.reject(new Error("[@my-react-devtool/hook] current environment not support"));
	    }
	};

	var onMessageFromPanelOrWorkerOrDetector = function (data) {
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessageWorkerType.init || (data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.show) {
	        core.connect();
	        core.notifyAll();
	    }
	    // 主动关闭panel / 或者worker失活
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.hide || (data === null || data === void 0 ? void 0 : data.type) === coreExports.MessageWorkerType.close) {
	        core.disconnect();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.nodeSelect) {
	        core.setSelect(data.data);
	        core.notifySelect();
	        core.notifyHMRStatus();
	        core.notifyHMRExtend();
	        core.notifyTriggerStatus();
	        core.notifyWarnStatus();
	        core.notifyErrorStatus();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.nodeStore) {
	        var id = data.data;
	        var f = coreExports.getFiberNodeById(id);
	        if (f) {
	            console.log("[@my-react-devtool/hook] %cStore fiber node%c Value: %o", "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px", "", f);
	            core.notifyMessage("success log current id: ".concat(id, " of fiber in the console"), "success");
	        }
	        else {
	            core.notifyMessage("current id: ".concat(id, " of fiber not exist"), "error");
	        }
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.nodeTrigger) {
	        var id = data.data;
	        var f = coreExports.getFiberNodeById(id);
	        if (f) {
	            f._update(reactSharedExports.STATE_TYPE.__triggerConcurrentForce__);
	            core.notifyMessage("success trigger a update for current id: ".concat(id, " of fiber"), "success");
	        }
	        else {
	            core.notifyMessage("current id: ".concat(id, " of fiber not exist"), "error");
	        }
	    }
	    // if (data?.type === MessagePanelType.nodeInspect) {
	    //   core.inspectDom();
	    // }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.nodeHover) {
	        core.setHover(data.data);
	        core.showHover();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.nodeEditor) {
	        core.notifyEditor(data.data);
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.enableHover) {
	        core.setHoverStatus(data.data);
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.enableUpdate) {
	        core.setUpdateStatus(data.data);
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.enableHoverOnBrowser) {
	        var d = data.data;
	        if (d) {
	            core.enableBrowserHover();
	        }
	        else {
	            core.disableBrowserHover();
	        }
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.enableRetrigger) {
	        var d = data.data;
	        core.setRetriggerStatus(d);
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.chunks) {
	        core.notifyChunks(data.data);
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.varStore) {
	        var id = data.data;
	        var _a = coreExports.getValueById(id), f = _a.f, varStore = _a.v;
	        if (f) {
	            var varName = getValidGlobalVarName();
	            globalThis[varName] = varStore;
	            console.log("[@my-react-devtool/hook] %cStore global variable%c Name: ".concat(varName), "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px", "");
	            console.log("[@my-react-devtool/hook] %cStore global variable%c Value: %o", "color: white;background-color: rgba(10, 190, 235, 0.8); border-radius: 2px; padding: 2px 5px", "", varStore);
	            core.notifyMessage("success store current id: ".concat(id, " of data in the global variable: ").concat(varName), "success");
	        }
	        else {
	            core.notifyMessage("current id: ".concat(id, " of data not exist"), "error");
	        }
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.varSource) {
	        var id = data.data;
	        var varSource = coreExports.getValueById(id).v;
	        core.setSource(varSource);
	        core.notifySource();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.clear) {
	        core.clear();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.clearHMR) {
	        core.clearHMR();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.clearMessage) {
	        core.clearMessage();
	    }
	    if ((data === null || data === void 0 ? void 0 : data.type) === coreExports.MessagePanelType.clearTrigger) {
	        core.clearTrigger();
	    }
	};

	// support debug more platform
	var connectSocket$1 = null;
	// Node.js 环境下连接开发工具
	var initNODE_DEV = function (url) { return __awaiter(void 0, void 0, void 0, function () {
	    var connectSocket, unSubscribe;
	    var _a, _b, _c;
	    return __generator(this, function (_d) {
	        if (typeof process !== "object" || typeof globalThis.io !== "function")
	            return [2 /*return*/];
	        (_a = globalThis["__@my-react/dispatch__"]) === null || _a === void 0 ? void 0 : _a.forEach(function (d) { var _a; return (_a = globalThis.__MY_REACT_DEVTOOL_RUNTIME__) === null || _a === void 0 ? void 0 : _a.call(globalThis, d); });
	        (_c = (_b = globalThis.__MY_REACT_DEVTOOL_RUNTIME__) === null || _b === void 0 ? void 0 : _b.init) === null || _c === void 0 ? void 0 : _c.call(_b);
	        connectSocket = globalThis.io(url, {
	            reconnection: true, // 是否自动重新连接
	            reconnectionAttempts: Infinity, // 重新连接尝试次数
	            reconnectionDelay: 1000, // 初始重新连接延迟(ms)
	            reconnectionDelayMax: 5000, // 最大重新连接延迟(ms)
	            timeout: 8000, // 连接超时时间(ms)
	        });
	        unSubscribe = function () { };
	        connectSocket.on("connect", function () {
	            connectSocket.emit("init", {
	                name: "node-app-engine",
	                type: "client",
	            });
	            unSubscribe = core.subscribe(function (message) {
	                connectSocket.emit("render", message);
	            });
	        });
	        connectSocket.on("disconnect", function () {
	            unSubscribe();
	            core.disconnect();
	        });
	        connectSocket.on("action", function (data) {
	            onMessageFromPanelOrWorkerOrDetector(data);
	        });
	        connectSocket.on("duplicate", function () {
	            console.warn("[@my-react-devtool/hook] duplicate client detected, disconnecting...");
	            connectSocket === null || connectSocket === void 0 ? void 0 : connectSocket.disconnect();
	        });
	        return [2 /*return*/, connectSocket];
	    });
	}); };
	initNODE_DEV.close = function () {
	    var _a;
	    (_a = connectSocket$1 === null || connectSocket$1 === void 0 ? void 0 : connectSocket$1.close) === null || _a === void 0 ? void 0 : _a.call(connectSocket$1);
	    connectSocket$1 = null;
	};

	var connectSocket = null;
	// 浏览器环境下连接开发工具
	var initWEB_DEV = function (url) { return __awaiter(void 0, void 0, void 0, function () {
	    var socket, unSubscribe;
	    var _b, _c, _d;
	    return __generator(this, function (_e) {
	        switch (_e.label) {
	            case 0:
	                if (typeof window === "undefined")
	                    return [2 /*return*/];
	                console.log("[@my-react-devtool/hook] start a web ui devtool");
	                if (!(!window.io || !globalThis["io"])) return [3 /*break*/, 4];
	                _e.label = 1;
	            case 1:
	                _e.trys.push([1, 3, , 4]);
	                return [4 /*yield*/, loadScript("https://unpkg.com/socket.io-client@4.8.1/dist/socket.io.min.js")];
	            case 2:
	                _e.sent();
	                return [3 /*break*/, 4];
	            case 3:
	                _e.sent();
	                console.error("[@my-react-devtool/hook] load socket.io-client failed, please add socket.io-client manually");
	                return [3 /*break*/, 4];
	            case 4:
	                window.io = window.io || globalThis["io"];
	                (_b = window["__@my-react/dispatch__"]) === null || _b === void 0 ? void 0 : _b.forEach(function (d) { var _a; return (_a = window.__MY_REACT_DEVTOOL_RUNTIME__) === null || _a === void 0 ? void 0 : _a.call(window, d); });
	                (_d = (_c = window.__MY_REACT_DEVTOOL_RUNTIME__) === null || _c === void 0 ? void 0 : _c.init) === null || _d === void 0 ? void 0 : _d.call(_c);
	                socket = window.io(url);
	                connectSocket = socket;
	                unSubscribe = function () { };
	                socket.on("connect", function () {
	                    socket.emit("web-dev", { name: window.document.title, url: window.location.href });
	                    socket.emit("init", {
	                        name: "web-app-engine",
	                        type: "client",
	                        url: window.location.href,
	                        title: window.document.title,
	                    });
	                    unSubscribe = core.subscribe(function (message) {
	                        socket.emit("render", message);
	                    });
	                });
	                socket.on("disconnect", function () {
	                    unSubscribe();
	                    core.disconnect();
	                });
	                socket.on("action", function (data) {
	                    onMessageFromPanelOrWorkerOrDetector(data);
	                });
	                socket.on("duplicate", function () {
	                    console.warn("[@my-react-devtool/hook] duplicate client detected, disconnecting...");
	                    socket === null || socket === void 0 ? void 0 : socket.disconnect();
	                });
	                return [2 /*return*/];
	        }
	    });
	}); };
	initWEB_DEV.close = function () {
	    var _a;
	    (_a = connectSocket === null || connectSocket === void 0 ? void 0 : connectSocket.close) === null || _a === void 0 ? void 0 : _a.call(connectSocket);
	    connectSocket = null;
	};

	var _a;
	globalThis.io = io;
	var set = new Set();
	var globalHook = function (dispatch) {
	    set.add(dispatch);
	    core.addDispatch(dispatch);
	};
	if (!globalThis["__MY_REACT_DEVTOOL_INTERNAL__"]) {
	    globalThis["__MY_REACT_DEVTOOL_INTERNAL__"] = core;
	    globalThis["__MY_REACT_DEVTOOL_RUNTIME__"] = globalHook;
	    globalThis["__@my-react/react-devtool-inject__"] = globalHook;
	    if (typeof window !== "undefined") {
	        // support web dev
	        globalThis["__MY_REACT_DEVTOOL_WEB__"] = initWEB_DEV;
	    }
	    if (typeof process !== "undefined") {
	        // support node dev
	        globalThis["__MY_REACT_DEVTOOL_NODE__"] = initNODE_DEV;
	    }
	    if (typeof globalThis["__@my-react/react-devtool-inject-pending__"] === "function") {
	        (_a = globalThis["__@my-react/react-devtool-inject-pending__"]) === null || _a === void 0 ? void 0 : _a.call(globalThis);
	    }
	    else {
	        if (Array.isArray(globalThis["__@my-react/dispatch__"])) {
	            globalThis["__@my-react/dispatch__"].forEach(function (dispatch) {
	                globalHook(dispatch);
	            });
	        }
	    }
	}

})();
