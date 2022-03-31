import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { client } from "./../apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const name = "Ethereum donations";
  const description = "Ethereum donations for creators";
  const url = "https://ethdon.xyz";
  const image = `${url}/favicon.png`;

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

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      ,
    </>
  );
}

export default MyApp;
