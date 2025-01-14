import { Code, NextUIProvider, Snippet, Spacer, Spinner, Tooltip, Button } from "@nextui-org/react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Fira_Code } from "next/font/google";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import { useBridgeTarget } from "@/hooks/useBridgeTarget";
import { useConnect } from "@/hooks/useConnect";
import { useIframeDev } from "@/hooks/useIframeDev";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useWebDev } from "@/hooks/useWebDev";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "allotment/dist/style.css";

const roboto = Fira_Code({
  weight: "400",
  subsets: ["greek-ext", "cyrillic-ext", "latin-ext"],
  display: "swap",
  variable: "--root-font--",
});

const getWebTitle = (name?: string, url?: string) => {
  if (name && url) {
    return `${name}-${url}`;
  }

  if (name) {
    return name;
  }

  if (url) {
    return url;
  }

  return "unknown";
};

const source = (str: string) => `function loadScript(url) {
  const script = document.createElement("script");
  return new Promise((resolve, reject) => {
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  }).finally(() => script.remove());
}

function init() {
  if (typeof __MY_REACT_DEVTOOL_WEB__ === 'function') {
    const allDispatch = window["__@my-react/dispatch__"];
    allDispatch.forEach((d) => __MY_REACT_DEVTOOL_RUNTIME__?.(d));
    __MY_REACT_DEVTOOL_WEB__("${str}");
  } else {
    loadScript("${str}/bundle/hook.js").then(init);
  }
}

init();
`;

const bridgeSource = (str: string, token: string) => `function loadScript(url) {
  const script = document.createElement("script");
  return new Promise((resolve, reject) => {
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  }).finally(() => script.remove());
}

function loadIframe(url) {
  return new Promise((resolve, reject) => {
    const exist = document.getElementById("my-react-bridge-${token}");
    if (exist) {
      resolve(exist);
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.id = "my-react-bridge-${token}";
    iframe.style = "display: none;";
    iframe.onload = resolve;
    iframe.onerror = reject;
    document.body.appendChild(iframe);
  }).then(() => document.getElementById("my-react-bridge-${token}"));
}

async function init () {
  const from = "hook";

  const source = "@my-react/devtool";

  let iframe = await loadIframe("${str}/bridge?token=${token}");

  if (typeof __MY_REACT_DEVTOOL_RUNTIME__ !== 'function') {
    await loadScript("${str}/bundle/hook.js");
  }

  const bridge = iframe.contentWindow;

  window.addEventListener(
    "message",
    (e) => {
      if (e.source === window && e.data && e.data.source === source && e.data.from === from) {
        bridge?.postMessage?.(e.data, "*");
      }
      if (e.source === bridge && e.data && e.data.source === source && e.data.from === 'iframe' && e.data.type === 'bridge-init') {
        __MY_REACT_DEVTOOL_RUNTIME__?.init?.();
      }
    },
  );

  const allDispatch = window["__@my-react/dispatch__"];

  allDispatch.forEach((d) => __MY_REACT_DEVTOOL_RUNTIME__?.(d));

  __MY_REACT_DEVTOOL_RUNTIME__?.init?.();
}

init();
`;

export default function App({ Component, pageProps, router }: AppProps) {
  const { render, state, name, url, reconnect } = useConnect((s) => ({ render: s.render, state: s.state, name: s.name, url: s.url, reconnect: s.cb }));

  const isMounted = useIsMounted();

  const { query, basePath } = useRouter();

  const isPanelPage = router.pathname === "/devTool";

  const isWebDev = process.env.NEXT_PUBLIC_MODE === "web";

  const isLocalDev = process.env.NEXT_PUBLIC_MODE === "local";

  let children = <Component {...pageProps} />;

  if (isPanelPage && typeof render !== "boolean") {
    const str = isMounted ? window.location.origin + basePath : "";
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center">
          <Spinner color="primary" size="lg" />
          {(isWebDev || isLocalDev) && <div className="text-center text-[18px] text-red-300 mt-2">Waiting for a DevTool Engine connect...</div>}
          {isWebDev && (
            <Snippet symbol="" color="success" tooltipProps={{ content: "copy to console to run" }} size="sm" className="mt-1 max-w-[80vw] overflow-auto">
              {source(str)}
            </Snippet>
          )}
          {isLocalDev && (
            <Snippet symbol="" color="success" tooltipProps={{ content: "copy to console to run" }} size="sm" className="mt-1 max-w-[80vw] overflow-auto">
              {bridgeSource(str, query?.token as string)}
            </Snippet>
          )}
        </div>
      </div>
    );
  } else if (isPanelPage && !render) {
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center text-[20px] text-red-400 px-10">
          <div>
            This {isWebDev ? `${getWebTitle(name, url)} page` : "page"} not render By <Code className=" text-inherit text-[20px] ml-2">@my-react</Code>
          </div>
          <Spacer className="my-2" />
          <Snippet symbol="" color="warning" variant="solid" hideCopyButton>
            https://github.com/MrWangJustToDo/MyReact
          </Snippet>
          <div className="fixed top-4 right-4">
            {!isWebDev && (
              <Tooltip
                content={<p className={state ? "text-green-400" : "text-red-400"}>{state ? "DevTool Connect" : "DevTool DisConnect"}</p>}
                showArrow
                placement="bottom-end"
              >
                <Button isIconOnly disabled={state} onPress={() => reconnect?.()}>
                  {state ? <CheckCircledIcon className="text-green-500" /> : <CrossCircledIcon className=" text-red-500" />}
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  }

  useWebDev();

  useIframeDev();

  useBridgeTarget();

  const rendered = isMounted ? (
    children
  ) : (
    <div className="fixed w-full h-full flex items-center justify-center">
      <Spinner color="primary" size="lg" />
    </div>
  );

  return (
    <NextUIProvider>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily} !important;
          --root-font--: ${roboto.style.fontFamily};
        }
        body {
          font-family: ${roboto.style.fontFamily} !important;
        }
      `}</style>
      <ThemeProvider attribute="class" defaultTheme="light">
        {rendered}
      </ThemeProvider>
    </NextUIProvider>
  );
}
