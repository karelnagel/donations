import React from "react";
import { client } from "../../apollo";
import { ContractTitlesDocument, ContractTitlesQueryResult, ContractDocument, ContractQueryResult, Contract } from "../../../graphql/generated";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layout";
import { ProjectObject } from "../../components/ProjectObject";
import { Account, AccountDocument, AccountListDocument, AccountListQueryResult, AccountQueryResult } from "../../graphql/generated";
import { ContractObject } from "../../components/ContractObject";
import { TokenObject } from "../../components/TokenObject";

interface Params extends ParsedUrlQuery {
  account: string;
}
interface AccountProps {
  account: Account | null;
}
const AccountPage: NextPage<AccountProps> = ({ account }) => {
  if (!account) return <h1>No account found!</h1>;
  return (
    <>
      <CustomHead name={account.id} description={account.id} />
      <Layout>
        <h1>account: {account.id}</h1>
        <div>
          <h2>Latest contracts:</h2>
          <div>
            {account.contracts.map((c, i) => (
              <ContractObject key={i} contract={c} />
            ))}
          </div>
        </div>
        <div>
          <h2>Latest projects:</h2>
          <div>
            {account.projects.map((p, i) => (
              <ProjectObject key={i} project={p} />
            ))}
          </div>
        </div>
        <div>
          <h2>Latest tokens:</h2>
          <div>
            {account.tokens.map((t, i) => (
              <TokenObject key={i} token={t} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = (await client.query({ query: AccountListDocument })) as AccountListQueryResult;

  const paths = result.data?.accounts.map((a) => ({ params: { account: a.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<AccountProps, Params> = async (context) => {
  const accountId = context.params?.account ?? "";
  const result = (await client.query({
    query: AccountDocument,
    variables: { id: accountId, firstC: 5, firstP: 5, firstT: 5 },
  })) as AccountQueryResult;

  const account = result.data ? (result.data.account as Account) : null;
  return {
    props: {
      account,
    },
    revalidate: 60,
  };
};

export default AccountPage;
