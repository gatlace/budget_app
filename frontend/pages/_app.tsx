import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IsMobileProvider } from '../hooks/useIsMobile'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <IsMobileProvider>
      <Header />
      <Component {...pageProps} />
    </IsMobileProvider> 
  )
}

export default MyApp
