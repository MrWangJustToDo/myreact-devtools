import { Code, NextUIProvider, Snippet, Spacer, Spinner } from "@nextui-org/react";
import { JetBrains_Mono } from "next/font/google";

// import { ThemeProvider } from "next-themes";
import { useConnect } from "@/hooks/useConnect";
import { useWebDev } from "@/hooks/useWebDev";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

const roboto = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--root-font--",
});

export default function App({ Component, pageProps, router }: AppProps) {
  const render = useConnect((s) => s.render);

  const isPanelPage = router.pathname === "/devTool";

  let children = <Component {...pageProps} />;

  if (isPanelPage && typeof render !== "boolean") {
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner color="primary" size="lg" />
      </div>
    );
  } else if (isPanelPage && !render) {
    children = (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center text-[20px] text-red-400 px-10">
          <div>
            This page not render By <Code className=" text-inherit text-[20px] ml-2">@my-react</Code>
          </div>
          <Spacer className="my-2" />
          <Snippet symbol="" color="warning" variant="solid" hideCopyButton>
            https://github.com/MrWangJustToDo/MyReact
          </Snippet>
        </div>
      </div>
    );
  }

  useWebDev();

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
      {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
      {children}
      {/* </ThemeProvider> */}
    </NextUIProvider>
  );
}
