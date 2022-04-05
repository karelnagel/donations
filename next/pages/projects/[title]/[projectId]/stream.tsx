import { useRouter } from "next/router";
import { NewDonation } from "../../../../components/NexDonation";
import { ProgresssBar } from "../../../../components/ProgressBar";
import useProject from "../../../../hooks/useProject";

export default function Stream() {
  const { title, projectId } = useRouter().query;

  const { project, projectInfo, newDonation } = useProject(title?.toString(), projectId?.toString());

  return (
    <div className="flex flex-col items-center text-white">
      <div className="h-20">
        <NewDonation donation={newDonation} />
      </div>
      <div className="">
        <ProgresssBar project={project} projectInfo={projectInfo} />
      </div>
    </div>
  );
}
