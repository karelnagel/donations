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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['Bytes'];
  id: Scalars['ID'];
  owner: Scalars['String'];
  projects: Array<Project>;
  projectsCount: Scalars['Int'];
  time: Scalars['BigInt'];
};


export type CollectionProjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Project_Filter>;
};

export type Collection_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  projectsCount?: InputMaybe<Scalars['Int']>;
  projectsCount_gt?: InputMaybe<Scalars['Int']>;
  projectsCount_gte?: InputMaybe<Scalars['Int']>;
  projectsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  projectsCount_lt?: InputMaybe<Scalars['Int']>;
  projectsCount_lte?: InputMaybe<Scalars['Int']>;
  projectsCount_not?: InputMaybe<Scalars['Int']>;
  projectsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Collection_OrderBy {
  Address = 'address',
  Id = 'id',
  Owner = 'owner',
  Projects = 'projects',
  ProjectsCount = 'projectsCount',
  Time = 'time'
}

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  message: Scalars['String'];
  originalOwner: Scalars['String'];
  owner: Scalars['String'];
  project: Project;
  time: Scalars['BigInt'];
};

export type Donation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  originalOwner?: InputMaybe<Scalars['String']>;
  originalOwner_contains?: InputMaybe<Scalars['String']>;
  originalOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  originalOwner_ends_with?: InputMaybe<Scalars['String']>;
  originalOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  originalOwner_gt?: InputMaybe<Scalars['String']>;
  originalOwner_gte?: InputMaybe<Scalars['String']>;
  originalOwner_in?: InputMaybe<Array<Scalars['String']>>;
  originalOwner_lt?: InputMaybe<Scalars['String']>;
  originalOwner_lte?: InputMaybe<Scalars['String']>;
  originalOwner_not?: InputMaybe<Scalars['String']>;
  originalOwner_not_contains?: InputMaybe<Scalars['String']>;
  originalOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  originalOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  originalOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  originalOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  originalOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  originalOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  originalOwner_starts_with?: InputMaybe<Scalars['String']>;
  originalOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
};

export enum Donation_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Message = 'message',
  OriginalOwner = 'originalOwner',
  Owner = 'owner',
  Project = 'project',
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
  collection: Collection;
  description: Scalars['String'];
  donated: Scalars['BigInt'];
  donationCount: Scalars['Int'];
  donationOptions: Array<Scalars['String']>;
  donations: Array<Donation>;
  goal: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  index: Scalars['BigInt'];
  ipfs: Scalars['String'];
  name: Scalars['String'];
  owner: Scalars['String'];
  socials: Array<Scalars['String']>;
  time: Scalars['BigInt'];
  url: Scalars['String'];
};


export type ProjectDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  collection?: InputMaybe<Scalars['String']>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  donationOptions?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_contains?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  goal?: InputMaybe<Scalars['String']>;
  goal_contains?: InputMaybe<Scalars['String']>;
  goal_contains_nocase?: InputMaybe<Scalars['String']>;
  goal_ends_with?: InputMaybe<Scalars['String']>;
  goal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  goal_gt?: InputMaybe<Scalars['String']>;
  goal_gte?: InputMaybe<Scalars['String']>;
  goal_in?: InputMaybe<Array<Scalars['String']>>;
  goal_lt?: InputMaybe<Scalars['String']>;
  goal_lte?: InputMaybe<Scalars['String']>;
  goal_not?: InputMaybe<Scalars['String']>;
  goal_not_contains?: InputMaybe<Scalars['String']>;
  goal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  goal_not_ends_with?: InputMaybe<Scalars['String']>;
  goal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  goal_not_in?: InputMaybe<Array<Scalars['String']>>;
  goal_not_starts_with?: InputMaybe<Scalars['String']>;
  goal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  goal_starts_with?: InputMaybe<Scalars['String']>;
  goal_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ipfs?: InputMaybe<Scalars['String']>;
  ipfs_contains?: InputMaybe<Scalars['String']>;
  ipfs_contains_nocase?: InputMaybe<Scalars['String']>;
  ipfs_ends_with?: InputMaybe<Scalars['String']>;
  ipfs_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipfs_gt?: InputMaybe<Scalars['String']>;
  ipfs_gte?: InputMaybe<Scalars['String']>;
  ipfs_in?: InputMaybe<Array<Scalars['String']>>;
  ipfs_lt?: InputMaybe<Scalars['String']>;
  ipfs_lte?: InputMaybe<Scalars['String']>;
  ipfs_not?: InputMaybe<Scalars['String']>;
  ipfs_not_contains?: InputMaybe<Scalars['String']>;
  ipfs_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ipfs_not_ends_with?: InputMaybe<Scalars['String']>;
  ipfs_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ipfs_not_in?: InputMaybe<Array<Scalars['String']>>;
  ipfs_not_starts_with?: InputMaybe<Scalars['String']>;
  ipfs_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ipfs_starts_with?: InputMaybe<Scalars['String']>;
  ipfs_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  socials?: InputMaybe<Array<Scalars['String']>>;
  socials_contains?: InputMaybe<Array<Scalars['String']>>;
  socials_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  socials_not?: InputMaybe<Array<Scalars['String']>>;
  socials_not_contains?: InputMaybe<Array<Scalars['String']>>;
  socials_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_contains_nocase?: InputMaybe<Scalars['String']>;
  url_ends_with?: InputMaybe<Scalars['String']>;
  url_ends_with_nocase?: InputMaybe<Scalars['String']>;
  url_gt?: InputMaybe<Scalars['String']>;
  url_gte?: InputMaybe<Scalars['String']>;
  url_in?: InputMaybe<Array<Scalars['String']>>;
  url_lt?: InputMaybe<Scalars['String']>;
  url_lte?: InputMaybe<Scalars['String']>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_contains_nocase?: InputMaybe<Scalars['String']>;
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  url_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<Scalars['String']>>;
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  url_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  url_starts_with?: InputMaybe<Scalars['String']>;
  url_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Project_OrderBy {
  Active = 'active',
  Coin = 'coin',
  Collection = 'collection',
  Description = 'description',
  Donated = 'donated',
  DonationCount = 'donationCount',
  DonationOptions = 'donationOptions',
  Donations = 'donations',
  Goal = 'goal',
  Id = 'id',
  Image = 'image',
  Index = 'index',
  Ipfs = 'ipfs',
  Name = 'name',
  Owner = 'owner',
  Socials = 'socials',
  Time = 'time',
  Url = 'url'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  title?: Maybe<Title>;
  titles: Array<Title>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  title?: Maybe<Title>;
  titles: Array<Title>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
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

export type Title = {
  __typename?: 'Title';
  collection: Scalars['String'];
  id: Scalars['ID'];
};

export type Title_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  collection?: InputMaybe<Scalars['String']>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Title_OrderBy {
  Collection = 'collection',
  Id = 'id'
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

export type AccountCollectionsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, address: any, time: any, owner: string }> };

export type AccountDonationsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountDonationsQuery = { __typename?: 'Query', donations: Array<{ __typename?: 'Donation', id: string, message: string, amount: any, owner: string, time: any, project: { __typename?: 'Project', coin: any, index: any, name: string, image: string, collection: { __typename?: 'Collection', id: string } } }> };

export type AccountProjectsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, index: any, donated: any, donationCount: number, coin: any, owner: string, name: string, description: string, image: string, goal: string, time: any, collection: { __typename?: 'Collection', id: string } }> };

export type CollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, address: any, owner: string, projectsCount: number, projects: Array<{ __typename?: 'Project', donated: any, index: any, coin: any, active: boolean, name: string, description: string, image: string, goal: string, owner: string, collection: { __typename?: 'Collection', id: string } }> } | null };

export type CollectionListQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionListQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string }> };

export type DonationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DonationQuery = { __typename?: 'Query', donation?: { __typename?: 'Donation', amount: any, owner: string, message: string, time: any, project: { __typename?: 'Project', index: any, name: string, description: string, url: string, image: string, socials: Array<string>, donationOptions: Array<string>, goal: string } } | null };

export type LatestProjectsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LatestProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', donated: any, time: any, index: any, coin: any, active: boolean, name: string, description: string, image: string, goal: string, owner: string, collection: { __typename?: 'Collection', id: string } }> };

export type ProjectQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', donated: any, donationCount: number, index: any, active: boolean, coin: any, time: any, id: string, owner: string, name: string, description: string, image: string, url: string, goal: string, socials: Array<string>, donationOptions: Array<string>, collection: { __typename?: 'Collection', id: string, address: any, owner: string } } | null };

export type ProjectListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectListQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', index: any, collection: { __typename?: 'Collection', id: string, projectsCount: number } }> };


export const AccountCollectionsDocument = gql`
    query accountCollections($owner: String = "") {
  collections(
    where: {owner_contains_nocase: $owner}
    orderBy: time
    orderDirection: desc
  ) {
    id
    address
    time
    owner
  }
}
    `;

/**
 * __useAccountCollectionsQuery__
 *
 * To run a query within a React component, call `useAccountCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountCollectionsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useAccountCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<AccountCollectionsQuery, AccountCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountCollectionsQuery, AccountCollectionsQueryVariables>(AccountCollectionsDocument, options);
      }
export function useAccountCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountCollectionsQuery, AccountCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountCollectionsQuery, AccountCollectionsQueryVariables>(AccountCollectionsDocument, options);
        }
export type AccountCollectionsQueryHookResult = ReturnType<typeof useAccountCollectionsQuery>;
export type AccountCollectionsLazyQueryHookResult = ReturnType<typeof useAccountCollectionsLazyQuery>;
export type AccountCollectionsQueryResult = Apollo.QueryResult<AccountCollectionsQuery, AccountCollectionsQueryVariables>;
export const AccountDonationsDocument = gql`
    query accountDonations($owner: String = "") {
  donations(
    where: {owner_contains_nocase: $owner}
    orderBy: time
    orderDirection: desc
  ) {
    id
    message
    amount
    owner
    project {
      coin
      index
      name
      image
      collection {
        id
      }
    }
    time
  }
}
    `;

/**
 * __useAccountDonationsQuery__
 *
 * To run a query within a React component, call `useAccountDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountDonationsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useAccountDonationsQuery(baseOptions?: Apollo.QueryHookOptions<AccountDonationsQuery, AccountDonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountDonationsQuery, AccountDonationsQueryVariables>(AccountDonationsDocument, options);
      }
export function useAccountDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountDonationsQuery, AccountDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountDonationsQuery, AccountDonationsQueryVariables>(AccountDonationsDocument, options);
        }
export type AccountDonationsQueryHookResult = ReturnType<typeof useAccountDonationsQuery>;
export type AccountDonationsLazyQueryHookResult = ReturnType<typeof useAccountDonationsLazyQuery>;
export type AccountDonationsQueryResult = Apollo.QueryResult<AccountDonationsQuery, AccountDonationsQueryVariables>;
export const AccountProjectsDocument = gql`
    query accountProjects($owner: String = "") {
  projects(
    where: {owner_contains_nocase: $owner}
    orderBy: time
    orderDirection: desc
  ) {
    id
    index
    donated
    donationCount
    coin
    owner
    name
    description
    image
    goal
    collection {
      id
    }
    time
  }
}
    `;

/**
 * __useAccountProjectsQuery__
 *
 * To run a query within a React component, call `useAccountProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountProjectsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useAccountProjectsQuery(baseOptions?: Apollo.QueryHookOptions<AccountProjectsQuery, AccountProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountProjectsQuery, AccountProjectsQueryVariables>(AccountProjectsDocument, options);
      }
export function useAccountProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountProjectsQuery, AccountProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountProjectsQuery, AccountProjectsQueryVariables>(AccountProjectsDocument, options);
        }
export type AccountProjectsQueryHookResult = ReturnType<typeof useAccountProjectsQuery>;
export type AccountProjectsLazyQueryHookResult = ReturnType<typeof useAccountProjectsLazyQuery>;
export type AccountProjectsQueryResult = Apollo.QueryResult<AccountProjectsQuery, AccountProjectsQueryVariables>;
export const CollectionDocument = gql`
    query collection($id: ID = "", $first: Int = 10) {
  collection(id: $id) {
    id
    address
    owner
    projectsCount
    projects(first: $first, orderBy: time, orderDirection: desc) {
      donated
      index
      coin
      active
      name
      description
      image
      goal
      collection {
        id
      }
      owner
    }
  }
}
    `;

/**
 * __useCollectionQuery__
 *
 * To run a query within a React component, call `useCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCollectionQuery(baseOptions?: Apollo.QueryHookOptions<CollectionQuery, CollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionQuery, CollectionQueryVariables>(CollectionDocument, options);
      }
export function useCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionQuery, CollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionQuery, CollectionQueryVariables>(CollectionDocument, options);
        }
export type CollectionQueryHookResult = ReturnType<typeof useCollectionQuery>;
export type CollectionLazyQueryHookResult = ReturnType<typeof useCollectionLazyQuery>;
export type CollectionQueryResult = Apollo.QueryResult<CollectionQuery, CollectionQueryVariables>;
export const CollectionListDocument = gql`
    query collectionList {
  collections {
    id
  }
}
    `;

/**
 * __useCollectionListQuery__
 *
 * To run a query within a React component, call `useCollectionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCollectionListQuery(baseOptions?: Apollo.QueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
      }
export function useCollectionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
        }
export type CollectionListQueryHookResult = ReturnType<typeof useCollectionListQuery>;
export type CollectionListLazyQueryHookResult = ReturnType<typeof useCollectionListLazyQuery>;
export type CollectionListQueryResult = Apollo.QueryResult<CollectionListQuery, CollectionListQueryVariables>;
export const DonationDocument = gql`
    query donation($id: ID = "") {
  donation(id: $id) {
    amount
    owner
    message
    time
    project {
      index
      name
      description
      url
      image
      socials
      donationOptions
      goal
    }
  }
}
    `;

/**
 * __useDonationQuery__
 *
 * To run a query within a React component, call `useDonationQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDonationQuery(baseOptions?: Apollo.QueryHookOptions<DonationQuery, DonationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationQuery, DonationQueryVariables>(DonationDocument, options);
      }
export function useDonationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationQuery, DonationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationQuery, DonationQueryVariables>(DonationDocument, options);
        }
export type DonationQueryHookResult = ReturnType<typeof useDonationQuery>;
export type DonationLazyQueryHookResult = ReturnType<typeof useDonationLazyQuery>;
export type DonationQueryResult = Apollo.QueryResult<DonationQuery, DonationQueryVariables>;
export const LatestProjectsDocument = gql`
    query latestProjects($first: Int = 10) {
  projects(
    first: $first
    orderBy: time
    orderDirection: desc
    where: {active: true}
  ) {
    donated
    time
    index
    coin
    active
    name
    description
    image
    goal
    collection {
      id
    }
    owner
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
    donated
    donationCount
    index
    active
    coin
    time
    id
    owner
    name
    description
    image
    url
    goal
    socials
    donationOptions
    collection {
      id
      address
      owner
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
export const ProjectListDocument = gql`
    query projectList {
  projects {
    index
    collection {
      id
      projectsCount
    }
  }
}
    `;

/**
 * __useProjectListQuery__
 *
 * To run a query within a React component, call `useProjectListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectListQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectListQuery(baseOptions?: Apollo.QueryHookOptions<ProjectListQuery, ProjectListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectListQuery, ProjectListQueryVariables>(ProjectListDocument, options);
      }
export function useProjectListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectListQuery, ProjectListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectListQuery, ProjectListQueryVariables>(ProjectListDocument, options);
        }
export type ProjectListQueryHookResult = ReturnType<typeof useProjectListQuery>;
export type ProjectListLazyQueryHookResult = ReturnType<typeof useProjectListLazyQuery>;
export type ProjectListQueryResult = Apollo.QueryResult<ProjectListQuery, ProjectListQueryVariables>;