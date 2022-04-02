import Link from "next/link";
import React from "react";
import { Project } from "../graphql/generated";
import { AccountObject } from "./AccountObject";

export function ProjectObject({ project }: { project: Project }) {
  return (
    <div className="box">
      <Link href={`/projects/${project.contract.id}/${project.count}`}>
        <a>
          <h2>{project.contract.id}</h2>
          <p>{project.donated}</p>
          <p>{project.coin}</p>
          <AccountObject account={project.owner.id} />
        </a>
      </Link>
    </div>
  );
}
