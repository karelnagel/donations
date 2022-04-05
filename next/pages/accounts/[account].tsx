import React from "react";
import { apolloRequest } from "../../idk/apollo";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layout";
import { ProjectObject } from "../../components/ProjectObject";
import { Account, AccountDocument, AccountListDocument, AccountListQueryResult, AccountQueryResult, Project } from "../../graphql/generated";
import { getProjectInfo } from "../../lib/firestore";
import { ProjectInfo } from "../../interfaces/ProjectInfo";
import { AccountObject } from "../../components/AccountObject";
import { NewDonation } from "../../components/NexDonation";

interface Params extends ParsedUrlQuery {
  account: string;
}
interface AccountProps {
  account?: Account;
  projects?: { project?: Project; projectInfo?: ProjectInfo }[];
}
const AccountPage: NextPage<AccountProps> = ({ account, projects }) => {
  if (!account) return <h1>No account found!</h1>;
  return (
    <>
      <CustomHead name={account.id} description={account.id} />
      <Layout>
        <div className="max-w-screen-md mx-auto flex flex-col items-center space-y-10 mt-10 text-center">
          <AccountObject account={account.id} />
          <div>
            <h2>Latest projects:</h2>
            <div>{projects && projects.map((p, i) => <ProjectObject key={i} project={p.project} projectInfo={p.projectInfo} />)}</div>
          </div>
          <div>
            <h2>Latest tokens:</h2>
            <div className="flex flex-col space-y-2 mb-10">
              {account.tokens.map((t, i) => (
                <NewDonation key={i} donation={t} onlyNew={false} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<AccountListQueryResult>(AccountListDocument);

  const paths = result.data?.accounts.map((a) => ({ params: { account: a.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<AccountProps, Params> = async (context) => {
  const accountId = context.params?.account ?? "";
  const result = await apolloRequest<AccountQueryResult>(AccountDocument, { id: accountId, firstP: 5, firstT: 5 });

  const account = result.data ? (result.data.account as Account) : undefined;
  const projects = account
    ? await Promise.all(
        account?.projects.map(async (p) => {
          const info = await getProjectInfo(p.contract.id, p.count);
          return { project: p as Project, projectInfo: info ?? undefined };
        })
      )
    : undefined;
  return {
    props: {
      account,
      projects,
    },
    revalidate: 10,
  };
};

export default AccountPage;
