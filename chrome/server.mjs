import cors from "cors";
import { createServer } from "http";
import next from "next";
import { parse } from "url";

import { setupSocketIO } from "./lib/socketio-server.mjs";
import { setupWebSocket } from "./lib/ws-server.mjs";

const port = parseInt(process.env.PORT || "3002", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => import("express"))
  .then(({ default: express }) => {
    const serve = express();

    const server = createServer(serve);

    setupSocketIO(server);
    setupWebSocket(server, "/ws");

    serve.use(cors());

    serve.use((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(port, () => {
      console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
      console.log(`> WebSocket endpoint: ws://localhost:${port}/ws`);
    });
  });
