import { Project } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";

export function ProgresssBar({ project }: { project?: Project }) {
  const donationPercent = project?.donated && project?.goal ? (Number(toCoin(project.donated)) / Number(toCoin(project.goal))) * 100 : 0;

  return project ? (
    <div>
      <p className="font-bold mb-1 text-center">
        Collected {toCoin(project.donated)} / {toCoin(project.goal)} {coinName(project.coin)} with {project.donationCount} donation
      </p>
      <div className="max-w-sm border-primary border-2 h-8 mx-2 md:mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className={`bg-primary h-full`} style={{ width: `${donationPercent ?? "0"}%` }}></div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
