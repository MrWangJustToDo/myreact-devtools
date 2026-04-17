import { parse } from "url";
import { WebSocketServer } from "ws";
import { SocketWrapper } from "./socket-wrapper.mjs";
import { handleConnection } from "./socket-manager.mjs";

/**
 * Setup WebSocket server
 * @param {import('http').Server} server
 * @param {string} path - WebSocket endpoint path (default: '/ws')
 */
export const setupWebSocket = (server, path = "/ws") => {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url, true);

    if (pathname === path) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  wss.on("connection", (ws, request) => {
    const { query } = parse(request.url, true);
    const wrapper = new SocketWrapper(ws, "ws");
    wrapper.type = query.type || null;

    ws.on("message", (message) => {
      wrapper._handleMessage(message.toString());
    });

    ws.on("close", () => {
      wrapper._handleClose();
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    handleConnection(wrapper);
  });

  return wss;
};
