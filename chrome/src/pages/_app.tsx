import { Code, HeroUIProvider, Snippet, Spacer, Spinner, Tooltip, Button, ToastProvider } from "@heroui/react";
import { CircleCheck, CircleX } from "lucide-react";
// import { Fira_Code } from "next/font/google";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

import { CodePreview } from "@/components/CodePreview";
import { FontSize } from "@/components/FontSize";
import { useBridgeTarget } from "@/hooks/useBridgeTarget";
import { useConnect } from "@/hooks/useConnect";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useWebDev } from "@/hooks/useWebDev";

import type { AppProps } from "next/app";

import "@/utils/clear";

import "@/styles/globals.css";
import "allotment/dist/style.css";

// const roboto = Fira_Code({
//   weight: "400",
//   subsets: ["greek-ext", "cyrillic-ext", "latin-ext"],
//   display: "swap",
//   variable: "--root-font--",
// });

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

const source = (str: string, type: "web" | "local", token?: string) => `function loadScript(url) {
  const script = document.createElement("script");
  return new Promise((resolve, reject) => {
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  }).finally(() => script.remove());
}

const getFunc = () => ${type === "web" ? "window.__MY_REACT_DEVTOOL_WEB__" : "window.__MY_REACT_DEVTOOL_IFRAME__"};

function init() {
  if (typeof getFunc() === 'function') {
    getFunc()("${str}", "${token}");
  } else {
    loadScript("${str}/bundle/hook.js").then(init);
  }
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
          {(isWebDev || isLocalDev) && <div className="text-center text-[1.5rem] text-red-300 mt-2">Waiting for a DevTool Engine connect...</div>}
          {isWebDev || isLocalDev ? <Spacer className="my-2" /> : null}
          {isWebDev && (
            <CodePreview code={source(str, "web", query?.token as string)} title="Please run this code in the console of the page you want to debug" />
          )}
          {isLocalDev && (
            <CodePreview code={source(str, "local", query?.token as string)} title="Please run this code in the console of the page you want to debug" />
          )}
        </div>
      </div>
    );
  } else if (isPanelPage && !render) {
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center text-[1.5rem] text-red-400 px-10">
          <div>
            This {isWebDev ? `${getWebTitle(name, url)} page` : "page"} not render By <Code className=" text-inherit text-[1.5rem] ml-2">@my-react</Code>
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
                  {state ? <CircleCheck className="text-green-500 w-[1.2rem]" /> : <CircleX className=" text-red-500 w-[1.2rem]" />}
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  }

  useWebDev();

  useBridgeTarget();

  const rendered = isMounted ? (
    children
  ) : (
    <div className="fixed w-full h-full flex items-center justify-center">
      <Spinner color="primary" size="lg" />
    </div>
  );

  return (
    <HeroUIProvider>
      <style jsx global>{`
        .font-code {
          font-family: ${"Maple Mono"} !important;
          --root-font--: ${"Maple Mono"};
        }
      `}</style>
      <FontSize />
      <ThemeProvider attribute="class" defaultTheme="light">
        <ToastProvider />
        {rendered}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
