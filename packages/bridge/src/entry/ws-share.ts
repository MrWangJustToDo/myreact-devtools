import { core } from "../core";
import { onMessageFromPanelOrWorkerOrDetector } from "../message";

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private url: string;
  private type: string;

  constructor(
    url: string,
    options?: {
      type?: string;
      reconnectionAttempts?: number;
      reconnectionDelay?: number;
    }
  ) {
    this.url = url;
    this.type = options?.type || "client";
    this.maxReconnectAttempts = options?.reconnectionAttempts ?? 5;
    this.reconnectDelay = options?.reconnectionDelay ?? 1000;
  }

  connect() {
    const urlWithType = `${this.url}?type=${this.type}`;
    this.ws = new WebSocket(urlWithType);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.trigger("connect", undefined);
    };

    this.ws.onclose = () => {
      this.trigger("disconnect", undefined);
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("[WebSocket] error:", error);
    };

    this.ws.onmessage = (event) => {
      try {
        const { event: eventName, data } = JSON.parse(event.data);
        this.trigger(eventName, data);
      } catch (e) {
        console.error("[WebSocket] failed to parse message:", e);
      }
    };

    return this;
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        if (__DEV__) {
          console.log(`[WebSocket] reconnecting... attempt ${this.reconnectAttempts}`);
        }
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  on(event: string, callback: (data: unknown) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return this;
  }

  off(event: string, callback: (data: unknown) => void) {
    this.listeners.get(event)?.delete(callback);
    return this;
  }

  private trigger(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }

  emit(event: string, data?: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    }
    return this;
  }

  close() {
    this.maxReconnectAttempts = 0;
    this.ws?.close();
    this.ws = null;
    this.listeners.clear();
  }
}

export const wsClient = ({
  url,
  name,
  options,
}: {
  url: string;
  name: string;
  options?: {
    originalUrl?: string;
    originalTitle?: string;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    [p: string]: unknown;
  };
}) => {
  core.clearSubscribe();

  const ws = new WebSocketClient(url, {
    type: "client",
    reconnectionAttempts: options?.reconnectionAttempts,
    reconnectionDelay: options?.reconnectionDelay,
  });

  let unSubscribe = () => {};

  ws.on("connect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] websocket connected");
    }

    ws.emit("init", {
      name: name,
      type: "client",
      url: options?.originalUrl,
      title: options?.originalTitle,
    });

    unSubscribe = core.subscribe((message) => {
      ws.emit("render", message);
    });
  });

  ws.on("disconnect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] websocket disconnected");
    }

    unSubscribe();

    core.disconnect();
  });

  ws.on("action", (data) => {
    onMessageFromPanelOrWorkerOrDetector(data as any);
  });

  ws.on("duplicate", () => {
    console.warn("[@my-react-devtool/hook] duplicate client detected, disconnecting...");
    ws.close();
  });

  ws.connect();

  return ws;
};
