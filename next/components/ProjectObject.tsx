import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Project } from "../graphql/generated";
import { getProjectImage } from "../idk/helpers";
import { ProjectInfo } from "../interfaces/ProjectInfo";
import { AccountObject } from "./AccountObject";
import { ProgresssBar } from "./ProgressBar";

export function ProjectObject({ project, projectInfo }: { project?: Project; projectInfo?: ProjectInfo }) {
  const router = useRouter();

  return project && projectInfo ? (
    <div
      className="shadow-stone-900 shadow-md p-4 rounded-lg cursor-pointer"
      onClick={() => router.push(`/projects/${project.contract.id}/${project.count}`)}
    >
      <div className="flex justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getProjectImage(project.contract.id, project.count)} alt="" className="h-20 w-20 object-cover rounded-lg" />

        <div className="text-right flex flex-col justify-evenly">
          <h2 className="font-bold mb-2">{projectInfo.name}</h2>
          <AccountObject account={project.owner.id} />
        </div>
      </div>
      <ProgresssBar project={project} projectInfo={projectInfo} />
    </div>
  ) : (
    <div></div>
  );
}
