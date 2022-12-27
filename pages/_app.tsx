import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto";
import "mapbox-gl/dist/mapbox-gl.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
