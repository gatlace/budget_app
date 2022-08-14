import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => (
    <Html lang="en">
        <Head>
            <meta name="author" content="Zii Donato" />
            <Script src="https://kit.fontawesome.com/2605ed76c2.js" strategy='beforeInteractive'/>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
)

export default Document;