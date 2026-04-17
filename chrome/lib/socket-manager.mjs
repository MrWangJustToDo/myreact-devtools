/**
 * @type {Set<import('./socket-wrapper.mjs').SocketWrapper>}
 */
export const socketSet = new Set();

let hasClient = false;
let hasServer = false;

/**
 * @param {import('./socket-wrapper.mjs').SocketWrapper} item
 */
export const processSocket = (item) => {
  item.on("disconnect", () => {
    socketSet.delete(item);

    if (item.type === "client") {
      hasClient = false;
    }

    if (item.type === "server") {
      hasServer = false;
    }

    if (item.name) {
      console.log("socket:", item.name, " disconnected");
    }

    console.log("disconnect a socket, total:", socketSet.size);

    socketSet.forEach((i) => i.emit("refresh"));
  });

  item.on("render", (data) => {
    socketSet.forEach((socket) => {
      if (socket !== item) {
        socket.emit("render", data);
      }
    });
  });

  item.on("init", (data) => {
    item.name = data.name;

    if (item.type === "client") {
      hasClient = true;
    }

    if (item.type === "server") {
      hasServer = true;
    }

    console.log("socket:", data.name, " connected");
  });

  item.on("action", (data) => {
    socketSet.forEach((socket) => {
      if (socket !== item) {
        socket.emit("action", data);
      }
    });
  });
};

/**
 * @param {import('./socket-wrapper.mjs').SocketWrapper} wrapper
 */
export const handleConnection = (wrapper) => {
  if (wrapper.type === "client" && hasClient) {
    wrapper.emit("duplicate");
    wrapper.disconnect();
    return;
  }

  if (wrapper.type === "server" && hasServer) {
    wrapper.emit("duplicate");
    wrapper.disconnect();
    return;
  }

  socketSet.add(wrapper);
  console.log("connect a new socket, total:", socketSet.size);
  processSocket(wrapper);
};
