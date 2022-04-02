import { GetStaticProps, NextPage } from "next";
import React from "react";
import { client } from "../../apollo";
import Layout from "../../components/Layout";
import { ProjectObject } from "../../components/ProjectObject";
import { Project, LatestProjectsDocument, LatestProjectsQueryResult } from "../../graphql/generated";

interface ProjectProps {
  projects: Project[] | null;
}

const ProjectsPage: NextPage<ProjectProps> = ({ projects }) => {
  return (
    <Layout>
      <main>
        <h1>Latest projects</h1>
        {projects && (
          <div>
            {projects.map((p, i) => (
              <ProjectObject project={p} key={i} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const result = (await client.query({ query: LatestProjectsDocument, variables: { first: 10 } })) as LatestProjectsQueryResult;
  const projects = result.data ? result.data.projects.map((p) => p as Project) : null;
  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};

export default ProjectsPage;
