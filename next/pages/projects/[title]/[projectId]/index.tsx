import React from "react";
import { client } from "../../../../apollo";
import {
  ProjectDocument,
  ProjectQueryResult,
  Token,
  useProjectSubQuery,
  Project,
  ProjectListDocument,
  ProjectListQueryResult,
} from "../../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../../components/CustomHead";
import Layout from "../../../../components/Layout";
import { getProjectId } from "../../../../helpers";
import { TokenObject } from "../../../../components/TokenObject";
import { ContractObject } from "../../../../components/ContractObject";

interface Params extends ParsedUrlQuery {
  title: string;
  projectId: string;
}
interface ProjectProps {
  project: Project | null;
}
const ProjectPage: NextPage<ProjectProps> = ({ project }) => {
  const { data } = useProjectSubQuery({ variables: { id: getProjectId(project?.contract.id!, project?.count) } });
  if (!project) return <h1>No project found!</h1>;
  console.log(data);
  return (
    <>
      <CustomHead name={project.contract.id} description={project.owner.id} />
      <Layout>
        <p>coin: {project.coin}</p>
        <p>owner: {project.owner.id}</p>
        <p>address: {project.contract.address}</p>
        <p>{project.active ? "active" : "not active"}</p>

        <p>Donated: {data?.project?.donated}</p>
        <p>Donated: {data?.project?.donationCount}</p>
        <br />
        <ContractObject contract={project.contract} />
        <div>
          <h2>Donate</h2>
          <form action="">
            <input type="number" placeholder="donation amount" />
            <input type="text" placeholder="message" />
            <button type="submit">Send</button>
          </form>
        </div>
        <div>
          <h2>Latest donations</h2>
          <div>
            {data?.project?.tokens.map((t, i) => (
              <TokenObject key={i} token={t as Token} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: ProjectListDocument })) as ProjectListQueryResult;

  const paths = result.data?.projects.map((p) => ({ params: { title: p.contract.id, projectId: p.count } })) ?? [];
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const projectId = context.params?.projectId ?? "";
  const result = (await client.query({ query: ProjectDocument, variables: { id: getProjectId(title, projectId) } })) as ProjectQueryResult;

  const project = result.data ? (result.data.project as Project) : null;
  console.log({ title, projectId, project });
  return {
    props: {
      project,
      title,
      projectId,
    },
    revalidate: 60,
  };
};

export default ProjectPage;
