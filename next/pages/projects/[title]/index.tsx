import React, { useContext } from "react";
import { client } from "../../../idk/apollo";
import { ContractDocument, ContractQueryResult, Contract, ContractListDocument, ContractListQueryResult } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { ProjectObject } from "../../../components/ProjectObject";
import { getContractInfo } from "../../../lib/firestore";
import { ContractInfo } from "../../../interfaces/ContractInfo";
import { userInfo } from "os";
import { Context } from "../../../idk/context";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ContractProps {
  contract: Contract | null;
  contractInfo: ContractInfo | null;
}
const ContractPage: NextPage<ContractProps> = ({ contract, contractInfo }) => {
  const { user } = useContext(Context);
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`http://localhost:3000/api/images/${contract.id}`} alt="" height={100} />
        {user?.address.toLowerCase() === contract.owner.id.toLowerCase() && (
          <a href={`/projects/${contract.id}/new`}>
            <button>Start new project</button>
          </a>
        )}
        <div>
          <h2>Latest projects by contract:</h2>
          <div>
            {contract.projects.map((p, i) => (
              <ProjectObject project={p} key={i} />
            ))}
          </div>
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
