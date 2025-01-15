import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="referrer" content="no-referrer" />
        <link rel="icon" href="favicon.ico" />
        {process.env.NEXT_PUBLIC_MODE === "web" && <script async data-socket src="/socket.io/socket.io.js" />}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
