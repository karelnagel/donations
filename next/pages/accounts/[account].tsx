import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Donation,
  Project,
  useAccountCollectionsLazyQuery,
  useAccountDonationsLazyQuery,
  useAccountProjectsLazyQuery,
} from "../../graphql/generated";
import { useRouter } from "next/router";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { TokenObject } from "../../components/TokenObject";
import { ProjectObject } from "../../components/ProjectObject";
import { NextPage } from "next";
import { ContractObject } from "../../components/ContractObject";
import useENS from "../../hooks/useENS";

const AccountPage: NextPage = () => {
  const router = useRouter();
  const { account, tab } = router.query as { account: string; tab?: string };
  const [value, setValue] = useState(0);
  const [getDonations, donations] = useAccountDonationsLazyQuery({ variables: { owner: account } });
  const [getProjects, projects] = useAccountProjectsLazyQuery({ variables: { owner: account } });
  const [getCollections, collections] = useAccountCollectionsLazyQuery({ variables: { owner: account } });
  const { name, avatar } = useENS(account);
  useEffect(() => {
    if (tab) setValue(Number(tab));
  }, [tab]);

  useEffect(() => {
    if (value === 0) getCollections();
    else if (value === 1) getProjects();
    else if (value === 2) getDonations();
  }, [getCollections, getProjects, getDonations, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (!account) return <h1>No account found!</h1>;
  return (
    <>
      <Layout>
        <div className="max-w-screen-md mx-auto flex flex-col space-y-10 my-10 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="w-32 h-32">{avatar && <img className="rounded-full shadow-lg" src={avatar} alt={name} />}</div>
          <p className="uppercase font-bold text-lg">{name}</p>
          <Tabs value={value} onChange={handleChange} centered variant="fullWidth" className="w-full">
            <Tab label="Collections" />
            <Tab label="Projects" />
            <Tab label="Donations" />
          </Tabs>
          <div className="max-w-md flex flex-col space-y-4">
            {value === 0 &&
              (collections.loading ? <CircularProgress /> : collections.data?.collections.map((c, i) => <ContractObject title={c.id} key={i} />))}
            {value === 1 &&
              (projects.loading ? <CircularProgress /> : projects.data?.projects.map((p, i) => <ProjectObject key={i} project={p as Project} />))}
            {value === 2 &&
              (donations.loading ? <CircularProgress /> : donations.data?.donations.map((d, i) => <TokenObject key={i} token={d as Donation} />))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountPage;
