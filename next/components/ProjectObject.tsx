import { useRouter } from "next/router";
import React from "react";
import { Project } from "../graphql/generated";
import { getImage } from "../idk/helpers";
import { AccountObject } from "./AccountObject";
import { ProgresssBar } from "./ProgressBar";
import Image from "next/image";

export function ProjectObject({ project }: { project?: Project }) {
  const router = useRouter();

  return project ? (
    <div className="shadow-md p-4 rounded-lg cursor-pointer shadow-primary bg-background" onClick={() => router.push(`/projects/${project.collection.id}/${project.index}`)}>
      <div className="flex justify-between">
        <div className="w-20 h-20 relative">
          <Image
            placeholder="blur"
            blurDataURL="/favicon.png"
            src={getImage(project.image)}
            alt=""
            className="object-cover rounded-lg flex-1"
            layout="fill"
          />
        </div>

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
