import { NextUIProvider } from "@nextui-org/react";
// import { ThemeProvider } from "next-themes";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </NextUIProvider>
  );
}
