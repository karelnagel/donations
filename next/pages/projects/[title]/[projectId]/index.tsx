import React, { useContext, useEffect, useState } from "react";
import { client } from "../../../../apollo";
import {
  ProjectDocument,
  ProjectQueryResult,
  Token,
  useProjectSubQuery,
  Project,
  ProjectListDocument,
  ProjectListQueryResult,
  Account,
} from "../../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../../components/CustomHead";
import Layout from "../../../../components/Layout";
import { getProjectId } from "../../../../helpers";
import { TokenObject } from "../../../../components/TokenObject";
import { ContractObject } from "../../../../components/ContractObject";
import useContract from "../../../../hooks/useContract";
import { ethers } from "ethers";
import useBalance from "../../../../hooks/useBalance";
import { setMaxListeners } from "events";
import { userInfo } from "os";
import { Context } from "../../../../interfaces/context";

interface Params extends ParsedUrlQuery {
  title: string;
  projectId: string;
}
interface ProjectProps {
  project: Project | null;
}
const ProjectPage: NextPage<ProjectProps> = ({ project }) => {
  const { data } = useProjectSubQuery({ variables: { id: getProjectId(project?.contract.id!, project?.count) } });
  const { user } = useContext(Context);
  const { donate, end, getAllowance, approve } = useContract({
    contractAddress: project?.contract.address,
    projectId: project?.count,
    coinAddress: project?.coin,
  });
  const [project2, setProject2] = useState<Project>();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(project?.active!);
  const { balance } = useBalance(project?.coin);

  useEffect(() => {
    if (data) setProject2(data.project as Project);
  }, [data]);

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
    //Todo update
    setProject2((p) =>
      p
        ? {
            ...p,
            donated: amountInWei.add(p.donated),
            donationCount: p.donationCount + 1,
          }
        : undefined
    );
  };
  const endPro = async (e: any) => {
    e.preventDefault();
    const error = await end();
    if (error) return console.log(error);
    setActive(false);
  };
  if (!project) return <h1>No project found!</h1>;
  return (
    <>
      <CustomHead name={project.contract.id} description={project.owner.id} />
      <Layout>
        <p>coin: {project.coin}</p>
        <p>owner: {project.owner.id}</p>
        <p>address: {project.contract.address}</p>
        <p>{active ? "active" : "not active"}</p>

        <p>Donated: {project2 ? ethers.utils.formatEther(project2.donated) : "0"}</p>
        <p>Donated count: {project2?.donationCount}</p>
        <p>Balance: {ethers.utils.formatEther(balance)} ERC20</p>
        <br />
        <ContractObject contract={project.contract} />
        <div>
          <h2>Donate</h2>
          <form action="">
            <input type="number" step="any" placeholder="donation amount" onChange={(e) => setAmount(e.currentTarget.value)} required />
            <input type="text" placeholder="message" onChange={(e) => setMessage(e.currentTarget.value)} />
            <button type="submit" onClick={makeDonation}>
              Send
            </button>
          </form>
        </div>
        <div>
          <h2>Latest donations</h2>
          <div>
            {project2?.tokens.map((t, i) => (
              <TokenObject key={i} token={t as Token} />
            ))}
          </div>
        </div>
        <button onClick={endPro}>End</button>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: ProjectListDocument })) as ProjectListQueryResult;

  const paths = result.data?.projects.map((p) => ({ params: { title: p.contract.id, projectId: p.count } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProjectProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const projectId = context.params?.projectId ?? "";
  const result = (await client.query({ query: ProjectDocument, variables: { id: getProjectId(title, projectId) } })) as ProjectQueryResult;

  const project = result.data ? (result.data.project as Project) : null;
  return {
    props: {
      project,
      title,
      projectId,
    },
    revalidate: 10,
  };
};

export default ProjectPage;
