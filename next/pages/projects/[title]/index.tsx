import React from "react";
import { client } from "../../../apollo";
import {
  ProjectTitlesQueryResult,
  ProjectTitlesDocument,
  ProjectDocument,
  ProjectQueryResult,
  Token,
  useProjectSubQuery,
  Project,
} from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ProjectProps {
  project: Project | null;
  title: string;
}
const Project: NextPage<ProjectProps> = ({ project, title }) => {
  const { data } = useProjectSubQuery({ variables: { id:title+"_p0" } });
  if (!project) return <h1>No project found!</h1>;
console.log(data)
  return (
    <>
      <CustomHead name={project.contract.id} description={project.owner.id} />
      <Layout>
        <h1>{project.contract.id}</h1>
        <h1>{project.coin}</h1>
        <h1>{project.owner.id}</h1>
        <h1>{project.contract.address}</h1>
        <h1>{project.active ? "true" : "false"}</h1>

        <h1>Donated: {data?.project?.donated}</h1>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: ProjectTitlesDocument })) as ProjectTitlesQueryResult;

  const paths = result.data?.contracts.map((t) => ({ params: { title: t.id} })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const result = (await client.query({ query: ProjectDocument, variables: { id:title+"_p0" } })) as ProjectQueryResult;

  const project = result.data ? (result.data.project as Project) : null;
  return {
    props: {
      project,
      title,
    },
    revalidate: 60,
  };
};

export default Project;
