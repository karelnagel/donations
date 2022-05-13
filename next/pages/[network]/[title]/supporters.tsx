import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCollectionSupportersQuery } from "../../../graphql/generated";
import Layout from "../../../components/Layout";
import { coinName, toCoin } from "../../../idk/helpers";
import { AccountObject } from "../../../components/AccountObject";
import Button from "../../../components/Button";
import { collectionUrl } from "../../../idk/urls";

const ProjectSupporters: NextPage = () => {
  const { title, network } = useRouter().query;
  const { data } = useCollectionSupportersQuery({ variables: { title: title?.toString() }, context: { network } });
  return (
    <Layout className="flex flex-col space-y-20 items-center">
      <h3 className="text-3xl font-bold">Top supporters of {data?.collection?.name}</h3>
      {data?.collection && (
        <div className="flex flex-col space-y-4 w-full max-w-screen-sm">
          <div className="grid grid-cols-3 gap-4 items-center justify-items-center text-lg font-bold">
            <p>Account</p>
            <p>Donated</p>
            <p>Times donated</p>
          </div>
          {data.collection.supporters.map((s) => (
            <div key={s.id} className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <AccountObject account={s.account.id} />
              <p>
                {toCoin(s.donated, data?.collection?.coin.id)} {coinName(data.collection?.coin.id)}
              </p>
              <p>{s.donationsCount} times</p>
            </div>
          ))}
        </div>
      )}
      <Button href={collectionUrl(title?.toString(), network?.toString())}>Back</Button>
    </Layout>
  );
};

export default ProjectSupporters;
