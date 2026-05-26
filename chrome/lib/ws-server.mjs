import { WebSocketServer } from "ws";
import { SocketWrapper } from "./socket-wrapper.mjs";
import { handleConnection } from "./socket-manager.mjs";

/**
 * Parse request URL using WHATWG URL API
 * @param {import('http').IncomingMessage} request
 */
const getUrlInfo = (request) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  return {
    pathname: url.pathname,
    searchParams: url.searchParams,
  };
};

/**
 * Setup WebSocket server
 * @param {import('http').Server} server
 * @param {string} path - WebSocket endpoint path (default: '/ws')
 */
export const setupWebSocket = (server, path = "/ws") => {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = getUrlInfo(request);

    if (pathname === path) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  wss.on("connection", (ws, request) => {
    const { searchParams } = getUrlInfo(request);
    const wrapper = new SocketWrapper(ws, "ws");
    wrapper.type = searchParams.get("type") || null;

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
