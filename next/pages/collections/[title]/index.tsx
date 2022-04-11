import React, { useContext } from "react";
import { apolloRequest } from "../../../idk/apollo";
import { ContractDocument, ContractQueryResult, Contract, ContractListDocument, ContractListQueryResult, Project } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { ProjectObject } from "../../../components/ProjectObject";
import { Context } from "../../../idk/context";
import { AccountObject } from "../../../components/AccountObject";
import { sameAddr } from "../../../idk/helpers";
import { Button } from "@mui/material";
import { getProjectInfo } from "../../../lib/firestore";
import { ProjectInfo } from "../../../interfaces/ProjectInfo";
import Link from "next/link";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ContractProps {
  contract: Contract | null;
  projects: { project: Project | null; projectInfo: ProjectInfo | null }[] | null;
}
const ContractPage: NextPage<ContractProps> = ({ contract, projects }) => {
  const { user } = useContext(Context);
  if (!contract) return <h1>No contract found!</h1>;
  return (
    <>
      <CustomHead name={contract.id} description={contract.owner.id} />
      <Layout>
        <div className="max-w-screen-md mx-auto text-center flex flex-col items-center space-y-2">
          <p className="font-bold text-lg my-10 uppercase">{contract.id}</p>
          <span className="flex items-center space-x-2 justify-center">
            Owner:
            <AccountObject account={contract.owner.id} />
          </span>

          <Button>etherscan</Button>
          <Button>opensea</Button>
          {sameAddr(user?.address, contract.owner.id) && (
            <Link href={`/collections/${contract.id}/new`} passHref>
              <Button>Start new project </Button>
            </Link>
          )}
          <h2 className="">Latest projects:</h2>
          <div className="flex flex-col space-y-2">
            {projects && projects.map((p, i) => <ProjectObject key={i} project={p.project!} projectInfo={p.projectInfo!} />)}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<ContractListQueryResult>(ContractListDocument);

  const paths = result.data?.contracts.map((t) => ({ params: { title: t.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ContractProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const result = await apolloRequest<ContractQueryResult>(ContractDocument, { id: title });

  const contract = result.data ? (result.data.contract as Contract) : null;
  const projects = contract
    ? await Promise.all(
        contract?.projects.map(async (p) => {
          const info = await getProjectInfo(p.contract.id, p.count);
          return { project: p as Project, projectInfo: info ?? null };
        })
      )
    : null;
  return {
    props: {
      contract,
      projects,
    },
    revalidate: 10,
  };
};

export default ContractPage;
