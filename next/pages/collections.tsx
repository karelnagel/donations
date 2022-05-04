import { GetStaticProps, NextPage } from "next";
import React from "react";
import { apolloRequest } from "../idk/apollo";
import Layout from "../components/Layout";
import { Collection, LatestCollectionsDocument, LatestCollectionsQueryResult } from "../graphql/generated";
import { CollectionObject } from "../components/CollectionObject";

interface CollectionProps {
  collections: Collection[];
}

const CollectionPage: NextPage<CollectionProps> = ({ collections }) => {
  return (
    <Layout>
      <h1 className="my-10 text-center  text-3xl font-bold">Latest collections</h1>
      {collections && (
        <div className="flex flex-col space-y-6 max-w-screen-sm m-auto">
          {collections.map((c, i) => (
            <CollectionObject collection={c} key={i} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<CollectionProps> = async () => {
  const result = await apolloRequest<LatestCollectionsQueryResult>(LatestCollectionsDocument, { first: 5 });
  const projects = result.data?.collections ? result.data.collections.map((c) => c as Collection) : [];
  return {
    props: {
      collections: projects,
    },
    revalidate: 60,
  };
};

export default CollectionPage;