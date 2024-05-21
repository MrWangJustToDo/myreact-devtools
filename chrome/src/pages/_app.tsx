import { NextUIProvider } from "@nextui-org/react";

import { Memo } from "@/components/Memo";

import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
 

  return (
    <NextUIProvider>
      <Memo />
      {/* <NextThemesProvider attribute="class" defaultTheme="dark"> */}
      <Component {...pageProps} />
      {/* </NextThemesProvider> */}
    </NextUIProvider>
  );
}
