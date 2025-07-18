import cors from "cors";
import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { parse } from "url";

const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * @type {Set<import('socket.io').Socket>}
 */
let socketSet = new Set();

// support local dev
/**
 *
 * @param {import('socket.io').Socket} item
 */
const processSocket = (item) => {
  item.on("disconnect", () => {
    socketSet.delete(item);

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

app
  .prepare()
  .then(() => import("express"))
  .then(({ default: express }) => {
    const serve = express();

    const server = createServer(serve);

    const io = new Server(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 });

    serve.use(cors());

    serve.use((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    io.on("connection", (socket) => {
      socketSet.add(socket);

      console.log("connect a new socket, total:", socketSet.size);

      processSocket(socket);
    });

    server.listen(port, () => {
      console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
    });
  });
