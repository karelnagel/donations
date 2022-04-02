import React, { useState } from "react";
import { client } from "../../../apollo";
import { ContractDocument, ContractQueryResult, Contract, ContractListDocument, ContractListQueryResult } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { ProjectObject } from "../../../components/ProjectObject";
import useContract from "../../../hooks/useContract";
import { getContractInfo } from "../../../lib/contractInfo";
import { ContractInfo } from "../../../interfaces/api";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ContractProps {
  contract: Contract | null;
  contractInfo: ContractInfo | null;
}
const ContractPage: NextPage<ContractProps> = ({ contract, contractInfo }) => {
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");
  const { newProject } = useContract({ contractAddress: contract?.address });
  const newPro = async (e: any) => {
    e.preventDefault();
    await newProject(coin, owner);
  };
  if (!contract) return <h1>No contract found!</h1>;
  return (
    <>
      <CustomHead name={contract.id} description={contract.owner.id} />
      <Layout>
        <p>title: {contract.id}</p>
        <p>owner: {contract.owner.id}</p>
        <p>address: {contract.address}</p>
        <p>name: {contractInfo?.name}</p>
        <p>description: {contractInfo?.description}</p>
        <p>link: {contractInfo?.external_link}</p>
        <p>image: {contractInfo?.image}</p>
        <div>
          <h2>Latest projects by contract:</h2>
          <div>
            {contract.projects.map((p, i) => (
              <ProjectObject project={p} key={i} />
            ))}
          </div>
        </div>
        <div>
          <h2>Start new project</h2>
          <form action="">
            <input type="text" placeholder="coin" onChange={(e) => setCoin(e.currentTarget.value)} required />
            <input type="text" placeholder="project owner" onChange={(e) => setOwner(e.currentTarget.value)} required />
            <button type="submit" onClick={newPro}>
              Start project
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: ContractListDocument })) as ContractListQueryResult;

  const paths = result.data?.contracts.map((t) => ({ params: { title: t.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ContractProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const result = (await client.query({ query: ContractDocument, variables: { id: title } })) as ContractQueryResult;

  const contract = result.data ? (result.data.contract as Contract) : null;
  const contractInfo = await getContractInfo(title);
  return {
    props: {
      contract,
      contractInfo,
    },
    revalidate: 10,
  };
};

export default ContractPage;
