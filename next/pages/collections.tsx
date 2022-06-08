import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { CollectionObject } from "../components/CollectionObject";
import Layout from "../components/Layout";
import { networks } from "../config";
import { Collection, useLatestCollectionsQuery } from "../graphql/generated";

const CollectionPage: NextPage = () => {
  const { activeChain } = useNetwork();
  const [chain, setChain] = useState("polygon");
  const collections = useLatestCollectionsQuery({ variables: { first: 10 }, context: { network: chain } });
  useEffect(() => {
    collections.refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);
  useEffect(() => {
    if (activeChain?.name) setChain(activeChain.name);
  }, [activeChain?.name]);
  return (
    <Layout>
      <h1 className="my-10 text-center  text-3xl font-bold">Latest collections on {chain}</h1>
      
      <div className="flex justify-center mb-4">
        <TextField className="w-40" id="select" label="Select network" select onChange={(e) => setChain(e.target.value)} required value={chain}>
        {networks.map((c, i) => (
          <MenuItem key={i} value={c.chain.name}>
            {c.chain.name}
          </MenuItem>
        ))}
      </TextField>

      </div>
      {collections&& (
        <div className="flex flex-col space-y-6 max-w-screen-sm m-auto">
          {collections.loading ? (
            <CircularProgress />
          ) : (
            collections.data?.collections.map((c, i) => <CollectionObject collection={c as Collection} key={c.time} />)
          )}
        </div>
      )}
    </Layout>
  );
};

export default CollectionPage;
