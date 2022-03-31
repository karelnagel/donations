import { ApolloQueryResult } from "@apollo/client";
import Head from "next/head";
import React from "react";
import { client } from "../../../apollo";
import {
  ProjectTitlesQueryResult,
  ProjectTitlesDocument,
  ProjectDocument,
  ProjectQueryResult,
  Token,
  useProjectQuery,
  useProjectSubQuery,
} from "../../../graphql/generated";

export default function Project({ token }: { token: Token }) {
  const { data } = useProjectSubQuery({ variables: { title: token.title } });
  console.log(data);

  const name = token.title;
  const description = token.owner;
  const url = "https://ethdon.xyz";
  const image = token.projects[0].image;
  return (
    <div>
      <Head>
        <title>{token.title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />

        <meta name="og:title" content={name} />
        <meta name="og:url" content={url} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <h1>{token.title}</h1>
      <h1>{token.coin}</h1>
      <h1>{token.owner}</h1>
      <h1>{token.token}</h1>
      <h1>{token.currentProject}</h1>
      <h1>{token.active ? "true" : "falcse"}</h1>
      <h1>{token.projects[0].image}</h1>
      <h1>{token.projects[0].order}</h1>

      <h1>Donated: {data?.tokens[0].projects[0].donated}</h1>
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = (await client.query({ query: ProjectTitlesDocument })) as ProjectTitlesQueryResult;

  const paths = result.data ? result.data.tokens.map((t) => ({ params: { title: t.title } })) : [];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { title } }: { params: { title: string } })=> {
  const result = (await client.query({ query: ProjectDocument, variables: { title } })) as ProjectQueryResult;
  const token = result.data ? (result.data.tokens[0] as Token) : ({} as Token);
  return {
    props: {
      token,
    },
    revalidate: 60,
  };
};
