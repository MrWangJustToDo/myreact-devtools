import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="object-src 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://chrome-devtools-frontend.appspot.com"
        />
        <meta name="referrer" content="no-referrer" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
