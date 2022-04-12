import { ethers } from "ethers";
import { Project } from "../graphql/generated";
import { coinName } from "../idk/helpers";

export function ProgresssBar({ project }: { project?: Project }) {
  const donationPercent =
    project?.donated && project?.goal ? (Number(ethers.utils.formatEther(project.donated)) / Number(project.goal)) * 100 : 0;

  return project ? (
    <div>
      <p className="font-bold mb-1 text-center">
        Collected {ethers.utils.formatEther(project.donated)} / {project.goal} {coinName(project.coin)} with {project.donationCount} donation
      </p>
      <div className="max-w-sm border-primary border-2 h-8 mx-2 md:mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className={`bg-primary h-full`} style={{ width: `${donationPercent ?? "0"}%` }}></div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
