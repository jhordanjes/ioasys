import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/globals';
import AppProvider from '../hooks';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
