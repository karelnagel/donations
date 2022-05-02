import React, { useContext, useEffect, useState } from "react";
import { apolloRequest } from "../../../../idk/apollo";
import { ProjectDocument, ProjectQueryResult, Project, ProjectListDocument, ProjectListQueryResult } from "../../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../../components/CustomHead";
import Layout from "../../../../components/Layout";
import { coinName, getImage, getProjectId, sameAddr, toCoin, toWei } from "../../../../idk/helpers";
import useChain from "../../../../hooks/useChain";
import useBalance from "../../../../hooks/useBalance";
import useProject from "../../../../hooks/useProject";
import { Button, Chip, CircularProgress, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { AccountObject } from "../../../../components/AccountObject";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import { useRouter } from "next/router";
import { Context } from "../../../../idk/context";
import { ProgresssBar } from "../../../../components/ProgressBar";
import { NewDonation } from "../../../../components/NexDonation";
import { ContractObject } from "../../../../components/ContractObject";
import Link from "next/link";
import Modal from "../../../../components/Modal";
import { network } from "../../../../config";

interface Params extends ParsedUrlQuery {
  title: string;
  projectId: string;
}
interface ProjectProps {
  initialProject: Project | null;
  title: string;
  projectId: string;
}
const ProjectPage: NextPage<ProjectProps> = ({ initialProject, title, projectId }) => {
  const router = useRouter();
  const { project, lastDonation } = useProject(title, projectId, initialProject);
  const { user, setSnack, load } = useContext(Context);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [tokenId, setTokenId] = useState("");

  const { balance } = useBalance(project?.coin);
  const { donate, end, getAllowance, approve } = useChain({
    contractAddress: project?.collection.address,
    projectId: project?.index,
    coinAddress: project?.coin,
  });

  const donationOptions = [
    toCoin(project?.donationOptions[0] ?? "0", project?.coin),
    toCoin(project?.donationOptions[1] ?? "0", project?.coin),
    toCoin(project?.donationOptions[2] ?? "0", project?.coin),
    toCoin(balance.toString(), project?.coin),
  ];

  useEffect(() => {
    if (sameAddr(lastDonation?.owner, user?.address)) {
      setTokenId(lastDonation?.id.split("_t")[1]!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDonation]);

  const makeDonation = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const amountInWei = toWei(amount, project?.coin);

      const allowance = await getAllowance();
      if (amountInWei.gt(balance)) {
        return setSnack!("Balance too low");
      }
      if (amountInWei.gt(allowance)) {
        const error = await approve(amountInWei);
        if (error) return setSnack!(error);
      }
      const error2 = await donate(amountInWei, message);
      if (error2) return setSnack!(error2);
      setSnack!("Donation was successful", "success");
      setTokenId((t) => t ?? "loading");
    }, "Making donation! \n\nThis will take 2 transactions: \n1. for approving spending the coins  \n2. for donating. \n\nPlease continue to your wallet!");
  };

  const endPro = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const error = await end();
      if (error) return setSnack!(error);

      setSnack!("Ended project successfully!", "success");
    }, "Ending project! Please continue to your wallet!");
  };

  if (!project) return <h1>Loading...</h1>;
  return (
    <>
      <CustomHead name={project.name} description={project.description} image={getImage(project.image)} />
      <Layout>
        <Modal
          visible={!!tokenId}
          onClose={() => {
            setTokenId("");
          }}
        >
          <p className="uppercase font-bold my-4">Donation successful</p>
          <p className="mb-2">View your NFT on Opensea:</p>
          {tokenId && tokenId !== "loading" ? (
            <Button variant="contained" target="_blank" rel="noopener noreferrer" href={`${network.opensea}${project.collection.address}/${tokenId}`}>
              View NFT
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Modal>
        <div className="fixed top-0 right-0 rounded-bl-2xl overflow-hidden">
          <NewDonation donation={lastDonation} />
        </div>
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="mt-20 mb-10 text-4xl  font-bold">{project.name}</h1>
          <div className="md:flex  justify-between mb-20 shadow-lg p-4 rounded-lg shadow-primary bg-zinc-800">
            <div className="min-w-60 w-60 h-60 relative object-cover rounded-3xl overflow-hidden m-auto">
              {project.image && (
                <Image
                  placeholder="blur"
                  blurDataURL="/favicon.png"
                  priority
                  src={getImage(project.image)}
                  alt=""
                  layout="fill"
                  className="object-cover"
                />
              )}
            </div>
            <div className="md:text-right flex flex-col justify-between md:ml-4 md:w-[60%]">
              <div>
                <p className="my-2">{project.description}</p>
                <span className="flex justify-end items-center space-x-2">
                  <p className="my-2">Money goes to:</p>
                  <AccountObject account={project.owner} />
                </span>
                <ContractObject title={project.collection.id} />
              </div>

              <div className=" flex space-x-4 md:justify-end justify-center">
                {project.url && (
                  <a href={project.url}>
                    <LinkIcon fontSize="large" />
                  </a>
                )}
                {project.socials[0] && (
                  <a href={project.socials[0]}>
                    <YouTubeIcon fontSize="large" />
                  </a>
                )}
                {project.socials[1] && (
                  <a href={project.socials[1]}>
                    <FacebookIcon fontSize="large" />
                  </a>
                )}
                {project.socials[2] && (
                  <a href={project.socials[2]}>
                    <TwitterIcon fontSize="large" />
                  </a>
                )}
                {project.socials[3] && (
                  <a href={project?.socials[3]}>
                    <InstagramIcon fontSize="large" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <ProgresssBar project={project} />
          <br />
          {user && project.active ? (
            <div className="mb-20">
              <h2 className="my-6 text-lg font-bold">Make a donation to {project.name}</h2>
              <form onSubmit={makeDonation} className="flex-col flex max-w-xs mx-auto space-y-2">
                <TextField type="text" label="Your message" onChange={(e) => setMessage(e.currentTarget.value)} required />
                <TextField
                  type="number"
                  inputProps={{ step: "any" }}
                  label="How much you want to donate?"
                  id="filled-start-adornment"
                  error={amount ? toWei(amount, project?.coin).gt(balance) : false}
                  helperText={amount && toWei(amount, project?.coin).gt(balance) ? "Balance too low" : ""}
                  value={amount}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{coinName(project.coin)}</InputAdornment>,
                  }}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  required
                />
                <div className="w-full flex justify-between pb-4">
                  {donationOptions.map((o, i) => (
                    <Chip key={i} label={i === 3 ? "MAX" : o} onClick={() => setAmount(o)} variant={amount === o ? "filled" : "outlined"} />
                  ))}
                </div>
                <Button type="submit" variant="contained">
                  Donate
                </Button>
              </form>
              {sameAddr(project.collection.owner, user.address) && (
                <>
                  <br />
                  <Button onClick={endPro} variant="outlined">
                    End
                  </Button>
                  <span> </span>
                  <Link href={`/projects/${title}/${projectId}/edit`} passHref>
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <br />
                  <br />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}${router.asPath}/stream`);
                      setSnack!("Stream link copied to clipboard!", "success");
                    }}
                  >
                    Copy stream link
                  </Button>
                </>
              )}
            </div>
          ) : (
            <p className="my-10 uppercase font-bold text-lg">{!user ? "Connect your wallet to make a donation" : "Project is not active"}</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<ProjectListQueryResult>(ProjectListDocument);

  const paths = result.data?.projects.map((p) => ({ params: { title: p.collection.id, projectId: p.index } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const projectId = context.params?.projectId ?? "";
  const result = await apolloRequest<ProjectQueryResult>(ProjectDocument, { id: getProjectId(title, projectId) });

  const initialProject = result.data?.project ? (result.data.project as Project) : null;
  return {
    props: {
      initialProject,
      title,
      projectId,
    },
    revalidate: 10,
  };
};

export default ProjectPage;
