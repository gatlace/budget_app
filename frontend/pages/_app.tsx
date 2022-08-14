import Header from 'components/Header/Header'
import Page from 'components/Page'
import type { AppProps } from 'next/app'
import "styles/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Page>
      <Header />
      <Component {...pageProps} />
    </Page>
    <div id="portals"/>
  </>
}

export default MyApp
