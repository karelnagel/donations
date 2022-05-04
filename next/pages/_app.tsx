import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { client } from "../idk/apollo";
import { Context, User } from "../idk/context";
import { Web3Provider } from "@ethersproject/providers";
import { ThemeProvider } from "@mui/material/styles";
import { materialTheme } from "../idk/materialTheme";
import { Alert, AlertColor, CircularProgress, IconButton, Snackbar } from "@mui/material";
import Modal from "../components/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  const name = "Streamint - Donations for streamers";
  const description = "Crypto donations for streamers";
  const url = "https://streamint.xyz";
  const image = `${url}/logo.png`;

  const [provider, setProvider] = useState<Web3Provider>();
  const [user, setUser] = useState<User>();
  const [snackBar, setSnackBar] = useState<{ message: string; severity: AlertColor }>();
  const [loading, setLoading] = useState("");

  const load = async (fun: () => Promise<any>, message: string) => {
    setLoading(message);
    await fun();
    setLoading("");
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(undefined);
  };
  const setSnack = (message: string, severity: AlertColor = "error") => {
    setSnackBar({ message, severity: severity });
  };
  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />
        <meta name="keywords" content="ethereum,donations,streaming,streamers,eth,erc20,gaming" />

        <meta name="og:title" content={name} />
        <meta name="og:url" content={url} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="og:type" content="website" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <Context.Provider value={{ provider, user, setUser, setProvider, setSnack, load }}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={materialTheme}>
            <Component {...pageProps} />
            <Snackbar open={!!snackBar} autoHideDuration={10000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={snackBar?.severity} sx={{ width: "100%" }}>
                {snackBar?.message}
              </Alert>
            </Snackbar>
            <Modal visible={!!loading} onClose={() => setLoading("")}>
              <p className="whitespace-pre-line mb-6 text-md font-bold text-black">{loading}</p>
              <CircularProgress />
            </Modal>
          </ThemeProvider>
        </ApolloProvider>
      </Context.Provider>
    </>
  );
}

export default MyApp;
