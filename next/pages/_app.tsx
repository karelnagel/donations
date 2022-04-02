import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { client } from "./../apollo";
import { Context, User } from "../interfaces/context";
import { JsonRpcProvider } from "@ethersproject/providers";

function MyApp({ Component, pageProps }: AppProps) {
  const name = "Ethereum donations";
  const description = "Ethereum donations for creators";
  const url = "https://ethdon.xyz";
  const image = `${url}/favicon.png`;

  const [provider, setProvider] = useState<JsonRpcProvider>();
  const [user, setUser] = useState<User>();

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

      <Context.Provider value={{ provider, user, setUser, setProvider }}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Context.Provider>
    </>
  );
}

export default MyApp;
