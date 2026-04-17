/**
 * Unified socket wrapper for both Socket.IO and WebSocket
 */
export class SocketWrapper {
  constructor(socket, protocol) {
    this.socket = socket;
    this.protocol = protocol; // 'socketio' or 'ws'
    this.name = null;
    this.type = null; // 'client' or 'server'
    this._listeners = new Map();
  }

  on(event, callback) {
    if (this.protocol === "socketio") {
      this.socket.on(event, callback);
    } else {
      if (!this._listeners.has(event)) {
        this._listeners.set(event, []);
      }
      this._listeners.get(event).push(callback);
    }
  }

  emit(event, data) {
    if (this.protocol === "socketio") {
      this.socket.emit(event, data);
    } else {
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify({ event, data }));
      }
    }
  }

  disconnect() {
    if (this.protocol === "socketio") {
      this.socket.disconnect();
    } else {
      this.socket.close();
    }
  }

  _handleMessage(message) {
    try {
      const { event, data } = JSON.parse(message);
      const listeners = this._listeners.get(event);
      if (listeners) {
        listeners.forEach((cb) => cb(data));
      }
    } catch (e) {
      console.error("Failed to parse WebSocket message:", e);
    }
  }

  _handleClose() {
    const listeners = this._listeners.get("disconnect");
    if (listeners) {
      listeners.forEach((cb) => cb());
    }
  }
}
