import { GetStaticProps, NextPage } from "next";
import React from "react";
import { apolloRequest } from "../../idk/apollo";
import Layout from "../../components/Layout";
import { ProjectObject } from "../../components/ProjectObject";
import { Project, LatestProjectsDocument, LatestProjectsQueryResult } from "../../graphql/generated";
import { getProjectInfo } from "../../lib/firestore";
import { ProjectInfo } from "../../interfaces/ProjectInfo";

interface ProjectProps {
  projects: { project?: Project; projectInfo?: ProjectInfo }[];
}

const ProjectsPage: NextPage<ProjectProps> = ({ projects }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="my-10 text-center uppercase text-lg font-bold">Latest projects</h1>
        {projects && (
          <div className="flex flex-col  space-y-4">
            {projects.map((p, i) => (
              <ProjectObject project={p.project} projectInfo={p.projectInfo} key={i} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const result = await apolloRequest<LatestProjectsQueryResult>(LatestProjectsDocument, { first: 5 });
  const projects = result.data
    ? await Promise.all(
        result.data.projects.map(async (p) => {
          const info = await getProjectInfo(p.contract.id, p.count);
          return { project: (p as Project) ?? undefined, projectInfo: info ?? undefined };
        })
      )
    : [];
  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};

export default ProjectsPage;
