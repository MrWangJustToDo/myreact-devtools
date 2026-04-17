import { sourceFrom } from "@my-react-devtool/bridge/type";
import { DevToolMessageEnum, DevToolSource, MessagePanelType, MessageWorkerType } from "@my-react-devtool/core";
import { useEffect } from "react";

import { onListener } from "@/utils/listener";
import { onRender } from "@/utils/render";

import { useConnect } from "./useConnect";

const getWsUrl = () => {
  if (typeof window === "undefined") return "ws://localhost:3002/ws";
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return process.env.NEXT_PUBLIC_WS_URL || `${protocol}//${window.location.host}/ws`;
};

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private url: string) {}

  connect(type?: string) {
    const urlWithType = type ? `${this.url}?type=${type}` : this.url;
    this.ws = new WebSocket(urlWithType);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.trigger("connect", undefined);
    };

    this.ws.onclose = () => {
      this.trigger("disconnect", undefined);
      this.attemptReconnect(type);
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
  }

  private attemptReconnect(type?: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`[WebSocket] reconnecting... attempt ${this.reconnectAttempts}`);
        this.connect(type);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  on(event: string, callback: (data: unknown) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (data: unknown) => void) {
    this.listeners.get(event)?.delete(callback);
  }

  private trigger(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }

  emit(event: string, data?: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    }
  }

  disconnect() {
    this.maxReconnectAttempts = 0;
    this.ws?.close();
    this.ws = null;
    this.listeners.clear();
  }
}

export const useWebSocketDev = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MODE === "websocket") {
      const ws = new WebSocketClient(getWsUrl());

      let connect = false;
      let id: NodeJS.Timeout | null = null;
      let unSubscribe = () => {};

      const listenBackendReady = () => {
        if (connect) {
          return;
        } else {
          ws.emit("action", { type: MessageWorkerType.init, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource });
          ws.emit("action", { type: MessagePanelType.show, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource });
          id = setTimeout(listenBackendReady, 1000);
        }
      };

      ws.on("connect", () => {
        console.log("[Dev mode] WebSocket client connect");

        useConnect.getActions().connect();

        listenBackendReady();

        ws.emit("init", {
          name: "@my-react/devtool",
          type: "server",
        });

        unSubscribe = onListener((data) => ws.emit("action", { ...data, from: sourceFrom.socket, to: sourceFrom.hook, source: DevToolSource }));
      });

      ws.on("disconnect", () => {
        console.log("[Dev mode] WebSocket client disconnect");

        connect = false;

        if (id) {
          clearTimeout(id);
        }

        unSubscribe();

        useConnect.getActions().disconnect();
      });

      ws.on("render", (data) => {
        console.log("[Dev mode] render", data);

        if ((data as { type: string }).type === DevToolMessageEnum.init) {
          connect = true;
        }

        onRender(data as any);
      });

      ws.on("refresh", () => {
        window.location.reload();
      });

      ws.on("duplicate", () => {
        console.warn("[Dev mode] duplicate server detected, disconnecting...");
        ws.disconnect();
      });

      ws.connect("server");

      return () => {
        ws.disconnect();
      };
    }
  }, []);
};
