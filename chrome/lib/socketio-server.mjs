import { Server } from "socket.io";
import { SocketWrapper } from "./socket-wrapper.mjs";
import { handleConnection } from "./socket-manager.mjs";

/**
 * Setup Socket.IO server
 * @param {import('http').Server} server
 */
export const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
  });

  io.on("connection", (socket) => {
    const wrapper = new SocketWrapper(socket, "socketio");
    wrapper.type = socket.type || null;
    handleConnection(wrapper);
  });

  return io;
};
