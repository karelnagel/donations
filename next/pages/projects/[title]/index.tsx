import React from "react";
import { client } from "../../../apollo";
import {
  ProjectTitlesQueryResult,
  ProjectTitlesDocument,
  ProjectDocument,
  ProjectQueryResult,
  Token,
  useProjectSubQuery,
} from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface TokenProps {
  token: Token | null;
  title: string;
}
const Project: NextPage<TokenProps> = ({ token, title }) => {
  const { data } = useProjectSubQuery({ variables: { title } });
  if (!token) return <h1>No token!</h1>;

  return (
    <>
      <CustomHead name={token.title} description={token.owner} image={token.projects[0].image} />
      <Layout>
        <h1>{token.title}</h1>
        <h1>{token.coin}</h1>
        <h1>{token.owner}</h1>
        <h1>{token.token}</h1>
        <h1>{token.currentProject}</h1>
        <h1>{token.active ? "true" : "falcse"}</h1>
        <h1>{token.projects[0].image}</h1>
        <h1>{token.projects[0].order}</h1>

        <h1>Donated: {data?.tokens[0].projects[0].donated}</h1>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: ProjectTitlesDocument })) as ProjectTitlesQueryResult;

  const paths = result.data?.tokens.map((t) => ({ params: { title: t.title } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TokenProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const result = (await client.query({ query: ProjectDocument, variables: { title } })) as ProjectQueryResult;

  const token = result.data ? (result.data.tokens[0] as Token) : null;
  return {
    props: {
      token,
      title,
    },
    revalidate: 60,
  };
};

export default Project;
