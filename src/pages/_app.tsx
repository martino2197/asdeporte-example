import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "@/router/PrivateRouter";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import theme from "@/styles/theme";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <PrivateRoute>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </PrivateRoute>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
