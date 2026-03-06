import { core } from "../core";
import { onMessageFromPanelOrWorkerOrDetector } from "../message";

export const socketClient = ({
  io,
  name,
  url,
  options,
}: {
  io: any;
  name: string;
  url: string;
  options?: {
    originalUrl?: string;
    originalTitle?: string;
    [p: string]: any;
  };
}) => {
  if (typeof io !== "function") return;

  // clear the default postMessage subscribe
  core.clearSubscribe();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const socket = io(url, options);

  let unSubscribe = () => {};

  socket.on("connect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket connected");
    }

    socket.emit("init", {
      name: name,
      type: "client",
      url: options?.originalUrl,
      title: options?.originalTitle,
    });

    unSubscribe = core.subscribe((message) => {
      socket.emit("render", message);
    });
  });

  socket.on("disconnect", () => {
    if (__DEV__) {
      console.log("[@my-react-devtool/hook] socket disconnected");
    }

    unSubscribe();

    core.disconnect();
  });

  socket.on("action", (data) => {
    onMessageFromPanelOrWorkerOrDetector(data);
  });

  socket.on("duplicate", () => {
    console.warn("[@my-react-devtool/hook] duplicate client detected, disconnecting...");

    socket?.disconnect();
  });

  return socket;
};
