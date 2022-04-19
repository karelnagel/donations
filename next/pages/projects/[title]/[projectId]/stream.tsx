import { useRouter } from "next/router";
import { NewDonation } from "../../../../components/NexDonation";
import useProject from "../../../../hooks/useProject";
import Image from "next/image";
import { coinName, getImage, toCoin, toWeiStr } from "../../../../idk/helpers";
import { Donation } from "../../../../graphql/generated";
export default function Stream() {
  const { title, projectId, left } = useRouter().query;

  const { project, lastDonation } = useProject(title?.toString()!, projectId?.toString()!, null);
  const donationPercent =
    project?.donated && project?.goal ? (Number(toCoin(project.donated, project.coin)) / Number(toCoin(project.goal, project.coin))) * 100 : 0;

  if (!project) return <div></div>;
  return (
    <div className={`relative h-[100vh] ml-auto text-white flex flex-col justify-between ${left ? "items-start" : "items-end"}`}>
      <div className={`${left ? "rounded-br-2xl" : "rounded-bl-2xl"} overflow-hidden`}>
        <NewDonation
          donation={
            lastDonation ??
            ({ amount: toWeiStr("100", project.coin), message: "hello", owner: "0xF4ABa5431B0A26E15FC50Ca03264011e8d86EaB9", project } as Donation)
          }
        />
      </div>
      <div className={`bg-stream1 h-16 flex overflow-hidden shadow-lg ${left ? "rounded-tr-2xl" : "rounded-tl-2xl"}`}>
        <div className="relative h-16 w-16 object-cover">
          <Image src={getImage(project.image)} alt="" layout="fill" />
        </div>
        <div className="relative flex items-center uppercase font-bold text-lg space-x-20 pr-2">
          <div className="absolute left-0 w-[90%] h-full bg-stream2 shadow-md" style={{ width: `${donationPercent ?? "0"}%` }}></div>
          <p className="relative">{project.name}</p>
          <p className="relative">
            {toCoin(project.donated, project.coin).split(".")[0]} / {toCoin(project.goal, project.coin).split(".")[0]} {coinName(project.coin)}
          </p>
        </div>
      </div>
    </div>
  );
}
