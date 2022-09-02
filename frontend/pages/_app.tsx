import Header from "components/Header/Header";
import type { AppProps } from "next/app";
import "styles/global.scss";
import Page from "components/Page";
import { checkIfLoggedIn, IronSessionSSR } from "bin/IronSession";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Page>
        <Component {...pageProps} />
      </Page>
      <Footer />
      <div id="portals" />
    </>
  );
}

export default MyApp;
