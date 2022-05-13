import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";

const CollectionPage: NextPage = () => {
  return (
    <Layout>
      {/* <h1 className="my-10 text-center  text-3xl font-bold">Latest collections</h1>
      {collections && (
        <div className="flex flex-col space-y-6 max-w-screen-sm m-auto">
          {collections.map((c, i) => (
            <CollectionObject collection={c} key={i} />
          ))}
        </div>
      )} */}
    </Layout>
  );
};

export default CollectionPage;
