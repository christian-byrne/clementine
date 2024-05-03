import Document, { Html, Head, Main, NextScript } from "next/document";
import pathFormat from "@/utils/pathFormat";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Meta tags */}
          <meta charSet="utf-8" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta name="theme-color" content="#000000" />
          <meta
            name="La Vie en Bleu"
            content="created with nextjs, react, and material-design-bootstrap"
          />
          {/* Favicon */}
          <link rel="icon" href="/icons/brand/brand-robot_lady.png" />
          {/* Roboto font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Apple touch icon */}
          <link rel="apple-touch-icon" href=
          "/icons/brand/brand-robot_lady.png" />
          {/* Manifest */}
          <link rel="manifest" href={pathFormat("/manifest.json")} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
