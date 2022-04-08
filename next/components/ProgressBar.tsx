import { ethers } from "ethers";
import { Project } from "../graphql/generated";
import { coinName } from "../idk/helpers";
import { ProjectInfo } from "../interfaces/ProjectInfo";

export function ProgresssBar({ project, projectInfo }: { project?: Project; projectInfo?: ProjectInfo }) {
  const donationPercent =
    project?.donated && projectInfo?.goal ? (Number(ethers.utils.formatEther(project?.donated)) / Number(projectInfo?.goal)) * 100 : 0;

  return project && projectInfo ? (
    <div>
      <p className="font-bold mb-1 text-center">
        Collected {ethers.utils.formatEther(project.donated)} / {projectInfo.goal} {coinName(project.coin)} with {project.donationCount} donation
      </p>
      <div className="max-w-sm border-primary border-2 h-8 mx-2 md:mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className={`bg-primary h-full`} style={{ width: `${donationPercent ?? "0"}%` }}></div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
