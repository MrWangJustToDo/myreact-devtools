import { __my_react_shared__ } from "@my-react/react";
import { Code, NextUIProvider, Snippet, Spacer, Spinner, Tooltip, Button } from "@nextui-org/react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { useConnect } from "@/hooks/useConnect";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useWebDev } from "@/hooks/useWebDev";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

const roboto = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
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

__my_react_shared__.enableLoopFromRoot.current = true;

export default function App({ Component, pageProps, router }: AppProps) {
  const { render, state, name, url, reconnect } = useConnect((s) => ({ render: s.render, state: s.state, name: s.name, url: s.url, reconnect: s.cb }));

  const isMounted = useIsMounted();

  const isPanelPage = router.pathname === "/devTool";

  const isWebDev = process.env.NEXT_PUBLIC_MODE === "web";

  let children = <Component {...pageProps} />;

  if (isPanelPage && typeof render !== "boolean") {
    const str = isMounted ? window.location.origin : "";
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center">
          <Spinner color="primary" size="lg" />
          {isWebDev && <div className="text-center text-[18px] text-red-300 mt-2">Waiting for a DevTool Engine connect...</div>}
          {isWebDev && (
            <Snippet symbol="" color="success" variant="solid" size="sm" className="mt-1">
              {`__MY_REACT_DEVTOOL_WEB__("${str}")`}
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
                <Button isIconOnly disabled={state} onClick={() => reconnect?.()}>
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
