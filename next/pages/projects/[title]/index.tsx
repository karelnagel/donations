import React from "react";
import { client } from "../../../apollo";
import { ContractDocument, ContractQueryResult, Contract, ContractListDocument, ContractListQueryResult } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { ProjectObject } from "../../../components/ProjectObject";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ContractProps {
  contract: Contract | null;
}
const ContractPage: NextPage<ContractProps> = ({ contract }) => {
  if (!contract) return <h1>No contract found!</h1>;
  return (
    <>
      <CustomHead name={contract.id} description={contract.owner.id} />
      <Layout>
        <h1>title: {contract.id}</h1>
        <h1>owner: {contract.owner.id}</h1>
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
  return {
    props: {
      contract,
    },
    revalidate: 60,
  };
};

export default ContractPage;
