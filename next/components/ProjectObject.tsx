import { useRouter } from "next/router";
import React from "react";
import { Project } from "../graphql/generated";
import { AccountObject } from "./AccountObject";
import { ProgresssBar } from "./ProgressBar";

export function ProjectObject({ project }: { project?: Project; }) {
  const router = useRouter();

  return project ? (
    <div
      className="shadow-lg p-4 rounded-lg cursor-pointer"
      onClick={() => router.push(`/projects/${project.collection.id}/${project.index}`)}
    >
      <div className="flex justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt="" className="h-20 w-20 object-cover rounded-lg" />

        <div className="text-right flex flex-col justify-evenly">
          <h2 className="font-bold mb-2">{project.name}</h2>
          <AccountObject account={project.owner} />
        </div>
      </div>
      <ProgresssBar project={project} />
    </div>
  ) : (
    <div></div>
  );
}
