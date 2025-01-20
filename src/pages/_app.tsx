import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "@/router/PrivateRouter";
import "@/styles/globals.css";

const theme = createTheme({
  // Puedes personalizar tu tema aquí
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
