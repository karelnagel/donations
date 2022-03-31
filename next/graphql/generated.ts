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

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  message: Scalars['String'];
  project: Project;
  sender: Scalars['Bytes'];
  time: Scalars['BigInt'];
};

export type Donation_Filter = {
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
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Donation_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Message = 'message',
  Project = 'project',
  Sender = 'sender',
  Time = 'time'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  donated: Scalars['BigInt'];
  donations: Array<Donation>;
  id: Scalars['ID'];
  image: Scalars['String'];
  order: Scalars['Int'];
  time: Scalars['BigInt'];
  token: Token;
};


export type ProjectDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};

export type Project_Filter = {
  donated?: InputMaybe<Scalars['BigInt']>;
  donated_gt?: InputMaybe<Scalars['BigInt']>;
  donated_gte?: InputMaybe<Scalars['BigInt']>;
  donated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donated_lt?: InputMaybe<Scalars['BigInt']>;
  donated_lte?: InputMaybe<Scalars['BigInt']>;
  donated_not?: InputMaybe<Scalars['BigInt']>;
  donated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  order_gt?: InputMaybe<Scalars['Int']>;
  order_gte?: InputMaybe<Scalars['Int']>;
  order_in?: InputMaybe<Array<Scalars['Int']>>;
  order_lt?: InputMaybe<Scalars['Int']>;
  order_lte?: InputMaybe<Scalars['Int']>;
  order_not?: InputMaybe<Scalars['Int']>;
  order_not_in?: InputMaybe<Array<Scalars['Int']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Project_OrderBy {
  Donated = 'donated',
  Donations = 'donations',
  Id = 'id',
  Image = 'image',
  Order = 'order',
  Time = 'time',
  Token = 'token'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryDonationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDonationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Donation_Filter>;
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
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionDonationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDonationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Donation_Filter>;
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

export type Token = {
  __typename?: 'Token';
  active: Scalars['Boolean'];
  coin: Scalars['Bytes'];
  contractURI: Scalars['String'];
  currentProject: Scalars['Int'];
  donated: Scalars['BigInt'];
  id: Scalars['ID'];
  owner: Scalars['Bytes'];
  projects: Array<Project>;
  time: Scalars['BigInt'];
  title: Scalars['String'];
  token: Scalars['Bytes'];
  withdrawn: Scalars['BigInt'];
};


export type TokenProjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};

export type Token_Filter = {
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
  currentProject?: InputMaybe<Scalars['Int']>;
  currentProject_gt?: InputMaybe<Scalars['Int']>;
  currentProject_gte?: InputMaybe<Scalars['Int']>;
  currentProject_in?: InputMaybe<Array<Scalars['Int']>>;
  currentProject_lt?: InputMaybe<Scalars['Int']>;
  currentProject_lte?: InputMaybe<Scalars['Int']>;
  currentProject_not?: InputMaybe<Scalars['Int']>;
  currentProject_not_in?: InputMaybe<Array<Scalars['Int']>>;
  donated?: InputMaybe<Scalars['BigInt']>;
  donated_gt?: InputMaybe<Scalars['BigInt']>;
  donated_gte?: InputMaybe<Scalars['BigInt']>;
  donated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donated_lt?: InputMaybe<Scalars['BigInt']>;
  donated_lte?: InputMaybe<Scalars['BigInt']>;
  donated_not?: InputMaybe<Scalars['BigInt']>;
  donated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  token?: InputMaybe<Scalars['Bytes']>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawn?: InputMaybe<Scalars['BigInt']>;
  withdrawn_gt?: InputMaybe<Scalars['BigInt']>;
  withdrawn_gte?: InputMaybe<Scalars['BigInt']>;
  withdrawn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawn_lt?: InputMaybe<Scalars['BigInt']>;
  withdrawn_lte?: InputMaybe<Scalars['BigInt']>;
  withdrawn_not?: InputMaybe<Scalars['BigInt']>;
  withdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Token_OrderBy {
  Active = 'active',
  Coin = 'coin',
  ContractUri = 'contractURI',
  CurrentProject = 'currentProject',
  Donated = 'donated',
  Id = 'id',
  Owner = 'owner',
  Projects = 'projects',
  Time = 'time',
  Title = 'title',
  Token = 'token',
  Withdrawn = 'withdrawn'
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
  account?: InputMaybe<Scalars['Bytes']>;
}>;


export type AccountQuery = { __typename?: 'Query', donations: Array<{ __typename?: 'Donation', amount: any, message: string, sender: any, time: any }>, tokens: Array<{ __typename?: 'Token', title: string, donated: any, active: boolean }> };

export type LatestProjectsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LatestProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', donated: any, order: number, token: { __typename?: 'Token', currentProject: number, title: string, owner: any, coin: any } }> };

export type ProjectQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
}>;


export type ProjectQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', coin: any, title: string, token: any, owner: any, currentProject: number, active: boolean, projects: Array<{ __typename?: 'Project', order: number, image: string }> }> };

export type ProjectSubQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
}>;


export type ProjectSubQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', projects: Array<{ __typename?: 'Project', donated: any, donations: Array<{ __typename?: 'Donation', amount: any, message: string, sender: any }> }> }> };

export type ProjectTitlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectTitlesQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', title: string }> };


export const AccountDocument = gql`
    query account($account: Bytes = "") {
  donations(where: {sender: $account}, orderBy: time, orderDirection: desc) {
    amount
    message
    sender
    time
  }
  tokens(orderBy: time, orderDirection: desc, where: {owner: $account}) {
    title
    donated
    active
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
 *      account: // value for 'account'
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
  projects(orderBy: time, orderDirection: desc, first: $first) {
    donated
    order
    token {
      currentProject
      title
      owner
      coin
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
    query project($title: String = "") {
  tokens(where: {title: $title}) {
    coin
    title
    token
    owner
    currentProject
    active
    projects(first: 1, orderBy: time, orderDirection: desc) {
      order
      image
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
 *      title: // value for 'title'
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
    query projectSub($title: String = "") {
  tokens(where: {title: $title}) {
    projects(first: 1, orderBy: time, orderDirection: desc) {
      donations(first: 5, orderBy: time, orderDirection: desc) {
        amount
        message
        sender
      }
      donated
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
 *      title: // value for 'title'
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
  tokens {
    title
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