import { NextUIProvider } from "@nextui-org/react";
import { JetBrains_Mono } from "next/font/google";

// import { ThemeProvider } from "next-themes";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

const roboto = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--root-font--",
});

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </NextUIProvider>
  );
}
