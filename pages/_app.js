import '../styles/globals.css';

// This App component is the top-level component for all different pages.
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
