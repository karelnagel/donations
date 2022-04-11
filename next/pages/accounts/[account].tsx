import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Project, Token, useAccountContractsLazyQuery, useAccountProjectsLazyQuery, useAccountTokensLazyQuery } from "../../graphql/generated";
import { getProjectInfo } from "../../lib/firestore";
import { ProjectInfo } from "../../interfaces/ProjectInfo";
import { AccountObject } from "../../components/AccountObject";
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
  const [getTokens, tokens] = useAccountTokensLazyQuery({ variables: { owner: account } });
  const [getProjects, projects] = useAccountProjectsLazyQuery({ variables: { owner: account } });
  const [getContracts, contracts] = useAccountContractsLazyQuery({ variables: { owner: account } });
  const [projectInfo, setProjectInfo] = useState<{ project: Project; projectInfo?: ProjectInfo }[]>();
  const { name, avatar } = useENS(account);
  useEffect(() => {
    if (tab) setValue(Number(tab));
  }, [tab]);

  useEffect(() => {
    if (value === 0) getContracts();
    else if (value === 1) getProjects();
    else if (value === 2) getTokens();
  }, [getContracts, getProjects, getTokens, value]);

  useEffect(() => {
    const effect = async () => {
      const proInfo = projects?.data
        ? await Promise.all(
            projects.data.projects.map(async (p) => {
              const info = await getProjectInfo(p.contract.id, p.count);
              return { project: p as Project, projectInfo: info ?? undefined };
            })
          )
        : undefined;
      setProjectInfo(proInfo);
    };
    effect();
  }, [projects.data]);

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
              (contracts.loading ? <CircularProgress /> : contracts.data?.contracts.map((c, i) => <ContractObject title={c.id} key={i} />))}
            {value === 1 &&
              (projects.loading || !projectInfo ? (
                <CircularProgress />
              ) : (
                projectInfo && projectInfo.map((p, i) => <ProjectObject key={i} project={p.project} projectInfo={p.projectInfo} />)
              ))}
            {value === 2 && (tokens.loading ? <CircularProgress /> : tokens.data?.tokens.map((t, i) => <TokenObject key={i} token={t as Token} />))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountPage;
