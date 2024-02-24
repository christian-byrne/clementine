import Document, { Html, Head, Main, NextScript } from 'next/document';
import pathFormat from '@/utils/pathFormat';

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
            name="wardrobe webapp"
            content="created with nextjs, react, and material-design-bootstrap"
          />
          {/* Favicon */}
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          {/* Roboto font */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          {/* Apple touch icon */}
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico" />
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
