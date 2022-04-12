import React, { useContext } from "react";
import { apolloRequest } from "../../../idk/apollo";
import { Collection, CollectionDocument, CollectionListDocument, CollectionListQueryResult, CollectionQueryResult } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { ProjectObject } from "../../../components/ProjectObject";
import { Context } from "../../../idk/context";
import { AccountObject } from "../../../components/AccountObject";
import { sameAddr } from "../../../idk/helpers";
import { Button } from "@mui/material";
import Link from "next/link";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface ContractProps {
  collection: Collection | null;
}
const ContractPage: NextPage<ContractProps> = ({ collection }) => {
  const { user } = useContext(Context);
  if (!collection) return <h1>No contract found!</h1>;
  return (
    <>
      <CustomHead name={collection.id} description={collection.owner} />
      <Layout>
        <div className="max-w-screen-md mx-auto text-center flex flex-col items-center space-y-2">
          <p className="font-bold text-lg my-10 uppercase">{collection.id}</p>
          <span className="flex items-center space-x-2 justify-center">
            Owner:
            <AccountObject account={collection.owner} />
          </span>

          <Button>etherscan</Button>
          <Button>opensea</Button>
          {sameAddr(user?.address, collection.owner) && (
            <Link href={`/collections/${collection.id}/new`} passHref>
              <Button>Start new project </Button>
            </Link>
          )}
          <h2 className="">Latest projects:</h2>
          <div className="flex flex-col space-y-2">
            {collection.projects && collection.projects.map((p, i) => <ProjectObject key={i} project={p} />)}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<CollectionListQueryResult>(CollectionListDocument);

  const paths = result.data?.collections.map((t) => ({ params: { title: t.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ContractProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const collectionReq = await apolloRequest<CollectionQueryResult>(CollectionDocument, { id: title });
  const collection = collectionReq.data?.collection ? (collectionReq.data.collection as Collection) : null;
  return {
    props: {
      collection,
    },
    revalidate: 10,
  };
};

export default ContractPage;
