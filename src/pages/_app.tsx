import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="og:description"
          content="MDP is a platform for developers."
        />
        <meta name="description" content="MDP is a platform for developers." />
        <meta name="og:title" content="MDP" />
        <meta name="og:url" content="https://example.com" />
        <meta name="og:image" content="https://example.com/img/ogp.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://example.com/img/ogp.png" />
        <meta name="twitter:site" content="@vcborn_support" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
