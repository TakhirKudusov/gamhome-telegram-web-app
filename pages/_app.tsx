import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto";
import "mapbox-gl/dist/mapbox-gl.css";
import { wrapper } from "../redux/store";
import { ContextProvider } from "../common/AppContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default wrapper.withRedux(App);
