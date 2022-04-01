import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { useLatestProjectsQuery, Project } from "../../graphql/generated";

export default function Projects() {
  const { data } = useLatestProjectsQuery({ variables: { first: 5 } });
  let idk: Project;
  return (
    <Layout>
      <main>
        <h1>Projects</h1>
        {data && (
          <div>
            {data.projects.map((p, i) => (
              <ProjectObject project={p as Project} key={i} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}

export function ProjectObject({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.contract.id}`}>
      <a>
        <h2>{project.contract.id}</h2>
        <p>{project.donated}</p>
        <p>{project.coin}</p>
      </a>
    </Link>
  );
}
