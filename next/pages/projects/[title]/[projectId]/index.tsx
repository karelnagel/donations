import React, { useContext, useState } from "react";
import { apolloRequest } from "../../../../idk/apollo";
import { ProjectDocument, ProjectQueryResult, Token, Project, ProjectListDocument, ProjectListQueryResult } from "../../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../../components/CustomHead";
import Layout from "../../../../components/Layout";
import { getProjectId, getProjectImage, sameAddr } from "../../../../idk/helpers";
import useChain from "../../../../hooks/useChain";
import { ethers } from "ethers";
import useBalance from "../../../../hooks/useBalance";
import { ProjectInfo } from "../../../../interfaces/ProjectInfo";
import { getProjectInfo } from "../../../../lib/firestore";
import useProject from "../../../../hooks/useProject";
import { Button, Chip, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { AccountObject } from "../../../../components/AccountObject";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import { useRouter } from "next/router";
import { coins } from "../../../../idk/config";
import { Context } from "../../../../idk/context";

interface Params extends ParsedUrlQuery {
  title: string;
  projectId: string;
}
interface ProjectProps {
  initialProject: Project | null;
  initialProjectInfo: ProjectInfo | null;
}
const ProjectPage: NextPage<ProjectProps | undefined> = ({ initialProject, initialProjectInfo }) => {
  const router = useRouter();
  const { title, projectId } = router.query as { title: string; projectId: string };
  const { project, projectInfo } = useProject(title!, projectId, initialProject, initialProjectInfo);
  const { user } = useContext(Context);
  const { donate, end, getAllowance, approve } = useChain({
    contractAddress: project?.contract.address,
    projectId: project?.count,
    coinAddress: project?.coin,
  });
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(project?.active!);
  const { balance } = useBalance(project?.coin);

  const donationOptions = ["5", "10", "15", ethers.utils.formatEther(balance)];
  const donationPercent =
    project?.donated && projectInfo?.goal ? (Number(ethers.utils.formatEther(project?.donated)) / Number(projectInfo?.goal)) * 100 : 0;
  const coin = coins.find((c) => sameAddr(c.address, project?.coin))?.coin ?? "ERC20";

  const makeDonation = async (e: any) => {
    e.preventDefault();
    const amountInWei = ethers.utils.parseEther(amount);

    const allowance = await getAllowance();
    if (amountInWei.gt(balance)) {
      console.log("balance lower than amount");
    }
    if (amountInWei.gt(allowance)) {
      const error = await approve(amountInWei);
      if (error) return console.log(error);
    }
    const error2 = await donate(amountInWei, message);
    if (error2) return console.log(error2);
    // Todo update make subscription
  };
  const endPro = async (e: any) => {
    e.preventDefault();
    const error = await end();
    if (error) return console.log(error);
    setActive(false);
  };

  if (!project || !projectInfo) return <h1>Loading...</h1>;
  return (
    <>
      <CustomHead name={projectInfo.name} description={projectInfo.description} />
      <Layout>
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="mt-20 mb-10 text-2xl uppercase font-bold">{projectInfo?.name}</h1>
          <div className="md:flex  justify-between mb-20 shadow-lg p-4 rounded-lg">
            <div className="min-w-60 w-60 h-60 relative object-cover rounded-3xl overflow-hidden m-auto">
              <Image src={getProjectImage(title, projectId)} alt="" layout="fill" />
            </div>
            <div className="md:text-right flex flex-col justify-between md:ml-4 md:w-[60%]">
              <div>
                <p className="my-2">{projectInfo?.description}</p>
                <p className="my-2">
                  {"Money goes to: "}
                  <AccountObject account={project.owner.id} />
                </p>
              </div>

              <div className=" flex space-x-4 md:justify-end justify-center">
                {projectInfo.external_url && (
                  <a href={projectInfo.external_url}>
                    <LinkIcon fontSize="large" />
                  </a>
                )}
                {projectInfo.socials.youtube && (
                  <a href={projectInfo.socials.youtube}>
                    <YouTubeIcon fontSize="large" />
                  </a>
                )}
                {projectInfo.socials.facebook && (
                  <a href={projectInfo?.socials.facebook}>
                    <FacebookIcon fontSize="large" />
                  </a>
                )}
                {projectInfo.socials.twitter && (
                  <a href={projectInfo?.socials.twitter}>
                    <TwitterIcon fontSize="large" />
                  </a>
                )}
                {projectInfo.socials.instagram && (
                  <a href={projectInfo?.socials.instagram}>
                    <InstagramIcon fontSize="large" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <p className="font-bold mb-1">
            Collected {ethers.utils.formatEther(project.donated)} / {projectInfo.goal} {coin} with {project.donationCount} donation
          </p>
          <div className="max-w-sm border-primary border-2 h-8 m-auto rounded-lg overflow-hidden shadow-lg">
            <div className={`bg-primary h-full`} style={{ width: `${donationPercent}%` }}></div>
          </div>
          <br />
          {user ? (
            <div className="mb-20">
              <h2 className="my-6 text-lg font-bold">Make a donation to {projectInfo.name}</h2>
              <form action="" className="flex-col flex max-w-xs mx-auto space-y-2">
                <TextField type="text" label="Your message" onChange={(e) => setMessage(e.currentTarget.value)} required />
                <TextField
                  type="number"
                  label="How much you want to donate?"
                  id="filled-start-adornment"
                  value={amount}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{coin}</InputAdornment>,
                  }}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  required
                />
                <div className="w-full flex justify-between pb-4">
                  {donationOptions.map((o, i) => (
                    <Chip
                      key={i}
                      label={donationOptions.length - 1 === i ? "MAX" : o}
                      onClick={() => setAmount(o)}
                      variant={amount === o ? "filled" : "outlined"}
                    />
                  ))}
                </div>
                <Button type="submit" onClick={makeDonation} variant="contained">
                  Donate
                </Button>
              </form>
              {sameAddr(project.owner.id, user.address) && (
                <>
                  <br />
                  <Button onClick={endPro} variant="outlined">
                    End
                  </Button>
                  <span> </span>
                  <Button variant="outlined" href={`${projectId}/edit`}>
                    Edit
                  </Button>
                </>
              )}
            </div>
          ) : (
            <p className="my-10 uppercase font-bold text-lg">Connect your wallet to make a donation</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<ProjectListQueryResult>(ProjectListDocument);

  const paths = result.data?.projects.map((p) => ({ params: { title: p.contract.id, projectId: p.count } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const projectId = context.params?.projectId ?? "";
  const result = await apolloRequest<ProjectQueryResult>(ProjectDocument, { id: getProjectId(title, projectId) });

  const project = result.data ? (result.data.project as Project) : null;
  const projectInfo = await getProjectInfo(title, projectId);
  return {
    props: {
      initialProject: project,
      initialProjectInfo: projectInfo,
    },
    revalidate: 10,
  };
};

export default ProjectPage;
