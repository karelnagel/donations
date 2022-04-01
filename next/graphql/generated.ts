import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Account = {
  __typename?: 'Account';
  contracts: Array<Contract>;
  id: Scalars['ID'];
  projects: Array<Project>;
  tokens: Array<Token>;
};


export type AccountContractsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contract_Filter>;
};


export type AccountProjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};


export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Account_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Account_OrderBy {
  Contracts = 'contracts',
  Id = 'id',
  Projects = 'projects',
  Tokens = 'tokens'
}

/** The block at which the query should be executed. */
export type Block_Height = {
  /** Value containing a block hash */
  hash?: InputMaybe<Scalars['Bytes']>;
  /** Value containing a block number */
  number?: InputMaybe<Scalars['Int']>;
  /**
   * Value containing the minimum block number.
   * In the case of `number_gte`, the query will be executed on the latest block only if
   * the subgraph has progressed to or past the minimum block number.
   * Defaults to the latest block when omitted.
   *
   */
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['Bytes'];
  contractURI?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  owner: Account;
  projects: Array<Project>;
  time: Scalars['BigInt'];
};


export type ContractProjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};

export type Contract_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractURI?: InputMaybe<Scalars['String']>;
  contractURI_contains?: InputMaybe<Scalars['String']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_gt?: InputMaybe<Scalars['String']>;
  contractURI_gte?: InputMaybe<Scalars['String']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_lt?: InputMaybe<Scalars['String']>;
  contractURI_lte?: InputMaybe<Scalars['String']>;
  contractURI_not?: InputMaybe<Scalars['String']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Contract_OrderBy {
  Address = 'address',
  ContractUri = 'contractURI',
  Id = 'id',
  Owner = 'owner',
  Projects = 'projects',
  Time = 'time'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  active: Scalars['Boolean'];
  coin: Scalars['Bytes'];
  contract: Contract;
  count: Scalars['BigInt'];
  donated: Scalars['BigInt'];
  donationCount: Scalars['Int'];
  id: Scalars['ID'];
  owner: Account;
  time: Scalars['BigInt'];
  tokens: Array<Token>;
};


export type ProjectTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Project_Filter = {
  active?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  coin?: InputMaybe<Scalars['Bytes']>;
  coin_contains?: InputMaybe<Scalars['Bytes']>;
  coin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  coin_not?: InputMaybe<Scalars['Bytes']>;
  coin_not_contains?: InputMaybe<Scalars['Bytes']>;
  coin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donated?: InputMaybe<Scalars['BigInt']>;
  donated_gt?: InputMaybe<Scalars['BigInt']>;
  donated_gte?: InputMaybe<Scalars['BigInt']>;
  donated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donated_lt?: InputMaybe<Scalars['BigInt']>;
  donated_lte?: InputMaybe<Scalars['BigInt']>;
  donated_not?: InputMaybe<Scalars['BigInt']>;
  donated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donationCount?: InputMaybe<Scalars['Int']>;
  donationCount_gt?: InputMaybe<Scalars['Int']>;
  donationCount_gte?: InputMaybe<Scalars['Int']>;
  donationCount_in?: InputMaybe<Array<Scalars['Int']>>;
  donationCount_lt?: InputMaybe<Scalars['Int']>;
  donationCount_lte?: InputMaybe<Scalars['Int']>;
  donationCount_not?: InputMaybe<Scalars['Int']>;
  donationCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Project_OrderBy {
  Active = 'active',
  Coin = 'coin',
  Contract = 'contract',
  Count = 'count',
  Donated = 'donated',
  DonationCount = 'donationCount',
  Id = 'id',
  Owner = 'owner',
  Time = 'time',
  Tokens = 'tokens'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  title?: Maybe<Title>;
  titles: Array<Title>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type QueryTitleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTitlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Title_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Title_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  title?: Maybe<Title>;
  titles: Array<Title>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type SubscriptionTitleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTitlesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Title_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Title_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Title = {
  __typename?: 'Title';
  id: Scalars['ID'];
  title: Contract;
};

export type Title_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Title_OrderBy {
  Id = 'id',
  Title = 'title'
}

export type Token = {
  __typename?: 'Token';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  message: Scalars['String'];
  owner: Account;
  project: Project;
  time: Scalars['BigInt'];
  tokenURI?: Maybe<Scalars['String']>;
};

export type Token_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  message?: InputMaybe<Scalars['String']>;
  message_contains?: InputMaybe<Scalars['String']>;
  message_contains_nocase?: InputMaybe<Scalars['String']>;
  message_ends_with?: InputMaybe<Scalars['String']>;
  message_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_gt?: InputMaybe<Scalars['String']>;
  message_gte?: InputMaybe<Scalars['String']>;
  message_in?: InputMaybe<Array<Scalars['String']>>;
  message_lt?: InputMaybe<Scalars['String']>;
  message_lte?: InputMaybe<Scalars['String']>;
  message_not?: InputMaybe<Scalars['String']>;
  message_not_contains?: InputMaybe<Scalars['String']>;
  message_not_contains_nocase?: InputMaybe<Scalars['String']>;
  message_not_ends_with?: InputMaybe<Scalars['String']>;
  message_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_in?: InputMaybe<Array<Scalars['String']>>;
  message_not_starts_with?: InputMaybe<Scalars['String']>;
  message_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_starts_with?: InputMaybe<Scalars['String']>;
  message_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Scalars['String']>;
  project_contains?: InputMaybe<Scalars['String']>;
  project_contains_nocase?: InputMaybe<Scalars['String']>;
  project_ends_with?: InputMaybe<Scalars['String']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_gt?: InputMaybe<Scalars['String']>;
  project_gte?: InputMaybe<Scalars['String']>;
  project_in?: InputMaybe<Array<Scalars['String']>>;
  project_lt?: InputMaybe<Scalars['String']>;
  project_lte?: InputMaybe<Scalars['String']>;
  project_not?: InputMaybe<Scalars['String']>;
  project_not_contains?: InputMaybe<Scalars['String']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']>;
  project_not_ends_with?: InputMaybe<Scalars['String']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  project_not_in?: InputMaybe<Array<Scalars['String']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  project_starts_with?: InputMaybe<Scalars['String']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Message = 'message',
  Owner = 'owner',
  Project = 'project',
  Time = 'time',
  TokenUri = 'tokenURI'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AccountQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  first1?: InputMaybe<Scalars['Int']>;
  first2?: InputMaybe<Scalars['Int']>;
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', contracts: Array<{ __typename?: 'Contract', id: string }>, projects: Array<{ __typename?: 'Project', id: string }>, tokens: Array<{ __typename?: 'Token', id: string }> } | null };

export type LatestProjectsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LatestProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', donated: any, time: any, count: any, coin: any, active: boolean, contract: { __typename?: 'Contract', id: string }, owner: { __typename?: 'Account', id: string } }> };

export type ProjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', active: boolean, coin: any, time: any, id: string, owner: { __typename?: 'Account', id: string }, contract: { __typename?: 'Contract', owner: { __typename?: 'Account', id: string } } } | null };

export type ProjectSubQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ProjectSubQuery = { __typename?: 'Query', project?: { __typename?: 'Project', donated: any, donationCount: number, tokens: Array<{ __typename?: 'Token', amount: any, message: string, time: any, owner: { __typename?: 'Account', id: string } }> } | null };

export type ProjectTitlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectTitlesQuery = { __typename?: 'Query', contracts: Array<{ __typename?: 'Contract', id: string, projects: Array<{ __typename?: 'Project', count: any }> }> };


export const AccountDocument = gql`
    query account($id: ID = "", $first: Int = 10, $first1: Int = 10, $first2: Int = 10) {
  account(id: $id) {
    contracts(first: $first, orderBy: time, orderDirection: desc) {
      id
    }
    projects(first: $first1, orderBy: time, orderDirection: desc) {
      id
    }
    tokens(first: $first2, orderBy: time, orderDirection: desc) {
      id
    }
  }
}
    `;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      first1: // value for 'first1'
 *      first2: // value for 'first2'
 *   },
 * });
 */
export function useAccountQuery(baseOptions?: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const LatestProjectsDocument = gql`
    query latestProjects($first: Int = 10) {
  projects(first: $first, orderBy: time, orderDirection: desc) {
    donated
    time
    count
    coin
    active
    contract {
      id
    }
    owner {
      id
    }
  }
}
    `;

/**
 * __useLatestProjectsQuery__
 *
 * To run a query within a React component, call `useLatestProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestProjectsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useLatestProjectsQuery(baseOptions?: Apollo.QueryHookOptions<LatestProjectsQuery, LatestProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestProjectsQuery, LatestProjectsQueryVariables>(LatestProjectsDocument, options);
      }
export function useLatestProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestProjectsQuery, LatestProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestProjectsQuery, LatestProjectsQueryVariables>(LatestProjectsDocument, options);
        }
export type LatestProjectsQueryHookResult = ReturnType<typeof useLatestProjectsQuery>;
export type LatestProjectsLazyQueryHookResult = ReturnType<typeof useLatestProjectsLazyQuery>;
export type LatestProjectsQueryResult = Apollo.QueryResult<LatestProjectsQuery, LatestProjectsQueryVariables>;
export const ProjectDocument = gql`
    query project($id: ID = "") {
  project(id: $id) {
    active
    coin
    time
    id
    owner {
      id
    }
    contract {
      owner {
        id
      }
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions?: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectSubDocument = gql`
    query projectSub($id: ID = "") {
  project(id: $id) {
    donated
    donationCount
    tokens(first: 5, orderBy: time, orderDirection: desc) {
      amount
      message
      owner {
        id
      }
      time
    }
  }
}
    `;

/**
 * __useProjectSubQuery__
 *
 * To run a query within a React component, call `useProjectSubQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSubQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectSubQuery(baseOptions?: Apollo.QueryHookOptions<ProjectSubQuery, ProjectSubQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectSubQuery, ProjectSubQueryVariables>(ProjectSubDocument, options);
      }
export function useProjectSubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSubQuery, ProjectSubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectSubQuery, ProjectSubQueryVariables>(ProjectSubDocument, options);
        }
export type ProjectSubQueryHookResult = ReturnType<typeof useProjectSubQuery>;
export type ProjectSubLazyQueryHookResult = ReturnType<typeof useProjectSubLazyQuery>;
export type ProjectSubQueryResult = Apollo.QueryResult<ProjectSubQuery, ProjectSubQueryVariables>;
export const ProjectTitlesDocument = gql`
    query projectTitles {
  contracts {
    id
    projects {
      count
    }
  }
}
    `;

/**
 * __useProjectTitlesQuery__
 *
 * To run a query within a React component, call `useProjectTitlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTitlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTitlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectTitlesQuery(baseOptions?: Apollo.QueryHookOptions<ProjectTitlesQuery, ProjectTitlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTitlesQuery, ProjectTitlesQueryVariables>(ProjectTitlesDocument, options);
      }
export function useProjectTitlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTitlesQuery, ProjectTitlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTitlesQuery, ProjectTitlesQueryVariables>(ProjectTitlesDocument, options);
        }
export type ProjectTitlesQueryHookResult = ReturnType<typeof useProjectTitlesQuery>;
export type ProjectTitlesLazyQueryHookResult = ReturnType<typeof useProjectTitlesLazyQuery>;
export type ProjectTitlesQueryResult = Apollo.QueryResult<ProjectTitlesQuery, ProjectTitlesQueryVariables>;