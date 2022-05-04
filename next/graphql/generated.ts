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
  collections: Array<Collection>;
  donations: Array<Donation>;
  id: Scalars['ID'];
  supportedCollections: Array<Supporter>;
};


export type AccountCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Collection_Filter>;
};


export type AccountDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};


export type AccountSupportedCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Supporter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Supporter_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  Collections = 'collections',
  Donations = 'donations',
  Id = 'id',
  SupportedCollections = 'supportedCollections'
}

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
  background: Scalars['String'];
  coin: Scalars['Bytes'];
  description: Scalars['String'];
  donated: Scalars['BigInt'];
  donationOptions: Array<Scalars['String']>;
  donations: Array<Donation>;
  donationsCount: Scalars['Int'];
  goal: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  ipfs: Scalars['String'];
  name: Scalars['String'];
  owner?: Maybe<Account>;
  socials: Array<Scalars['String']>;
  supporters: Array<Supporter>;
  time: Scalars['BigInt'];
  url: Scalars['String'];
};


export type CollectionDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};


export type CollectionSupportersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Supporter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Supporter_Filter>;
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
  background?: InputMaybe<Scalars['String']>;
  background_contains?: InputMaybe<Scalars['String']>;
  background_contains_nocase?: InputMaybe<Scalars['String']>;
  background_ends_with?: InputMaybe<Scalars['String']>;
  background_ends_with_nocase?: InputMaybe<Scalars['String']>;
  background_gt?: InputMaybe<Scalars['String']>;
  background_gte?: InputMaybe<Scalars['String']>;
  background_in?: InputMaybe<Array<Scalars['String']>>;
  background_lt?: InputMaybe<Scalars['String']>;
  background_lte?: InputMaybe<Scalars['String']>;
  background_not?: InputMaybe<Scalars['String']>;
  background_not_contains?: InputMaybe<Scalars['String']>;
  background_not_contains_nocase?: InputMaybe<Scalars['String']>;
  background_not_ends_with?: InputMaybe<Scalars['String']>;
  background_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  background_not_in?: InputMaybe<Array<Scalars['String']>>;
  background_not_starts_with?: InputMaybe<Scalars['String']>;
  background_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  background_starts_with?: InputMaybe<Scalars['String']>;
  background_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coin?: InputMaybe<Scalars['Bytes']>;
  coin_contains?: InputMaybe<Scalars['Bytes']>;
  coin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  coin_not?: InputMaybe<Scalars['Bytes']>;
  coin_not_contains?: InputMaybe<Scalars['Bytes']>;
  coin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
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
  donationOptions?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_contains?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  donationOptions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  donationsCount?: InputMaybe<Scalars['Int']>;
  donationsCount_gt?: InputMaybe<Scalars['Int']>;
  donationsCount_gte?: InputMaybe<Scalars['Int']>;
  donationsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  donationsCount_lt?: InputMaybe<Scalars['Int']>;
  donationsCount_lte?: InputMaybe<Scalars['Int']>;
  donationsCount_not?: InputMaybe<Scalars['Int']>;
  donationsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
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

export enum Collection_OrderBy {
  Address = 'address',
  Background = 'background',
  Coin = 'coin',
  Description = 'description',
  Donated = 'donated',
  DonationOptions = 'donationOptions',
  Donations = 'donations',
  DonationsCount = 'donationsCount',
  Goal = 'goal',
  Id = 'id',
  Image = 'image',
  Ipfs = 'ipfs',
  Name = 'name',
  Owner = 'owner',
  Socials = 'socials',
  Supporters = 'supporters',
  Time = 'time',
  Url = 'url'
}

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['BigInt'];
  collection: Collection;
  donator: Account;
  id: Scalars['ID'];
  message: Scalars['String'];
  supporter: Supporter;
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
  donator?: InputMaybe<Scalars['String']>;
  donator_contains?: InputMaybe<Scalars['String']>;
  donator_contains_nocase?: InputMaybe<Scalars['String']>;
  donator_ends_with?: InputMaybe<Scalars['String']>;
  donator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  donator_gt?: InputMaybe<Scalars['String']>;
  donator_gte?: InputMaybe<Scalars['String']>;
  donator_in?: InputMaybe<Array<Scalars['String']>>;
  donator_lt?: InputMaybe<Scalars['String']>;
  donator_lte?: InputMaybe<Scalars['String']>;
  donator_not?: InputMaybe<Scalars['String']>;
  donator_not_contains?: InputMaybe<Scalars['String']>;
  donator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  donator_not_ends_with?: InputMaybe<Scalars['String']>;
  donator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  donator_not_in?: InputMaybe<Array<Scalars['String']>>;
  donator_not_starts_with?: InputMaybe<Scalars['String']>;
  donator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  donator_starts_with?: InputMaybe<Scalars['String']>;
  donator_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  supporter?: InputMaybe<Scalars['String']>;
  supporter_contains?: InputMaybe<Scalars['String']>;
  supporter_contains_nocase?: InputMaybe<Scalars['String']>;
  supporter_ends_with?: InputMaybe<Scalars['String']>;
  supporter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  supporter_gt?: InputMaybe<Scalars['String']>;
  supporter_gte?: InputMaybe<Scalars['String']>;
  supporter_in?: InputMaybe<Array<Scalars['String']>>;
  supporter_lt?: InputMaybe<Scalars['String']>;
  supporter_lte?: InputMaybe<Scalars['String']>;
  supporter_not?: InputMaybe<Scalars['String']>;
  supporter_not_contains?: InputMaybe<Scalars['String']>;
  supporter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  supporter_not_ends_with?: InputMaybe<Scalars['String']>;
  supporter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  supporter_not_in?: InputMaybe<Array<Scalars['String']>>;
  supporter_not_starts_with?: InputMaybe<Scalars['String']>;
  supporter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  supporter_starts_with?: InputMaybe<Scalars['String']>;
  supporter_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  Collection = 'collection',
  Donator = 'donator',
  Id = 'id',
  Message = 'message',
  Supporter = 'supporter',
  Time = 'time'
}

export type Global = {
  __typename?: 'Global';
  collectionsCount: Scalars['Int'];
  donationsCount: Scalars['Int'];
  id: Scalars['ID'];
  supportersCount: Scalars['Int'];
  usersCount: Scalars['Int'];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  collectionsCount?: InputMaybe<Scalars['Int']>;
  collectionsCount_gt?: InputMaybe<Scalars['Int']>;
  collectionsCount_gte?: InputMaybe<Scalars['Int']>;
  collectionsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  collectionsCount_lt?: InputMaybe<Scalars['Int']>;
  collectionsCount_lte?: InputMaybe<Scalars['Int']>;
  collectionsCount_not?: InputMaybe<Scalars['Int']>;
  collectionsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  donationsCount?: InputMaybe<Scalars['Int']>;
  donationsCount_gt?: InputMaybe<Scalars['Int']>;
  donationsCount_gte?: InputMaybe<Scalars['Int']>;
  donationsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  donationsCount_lt?: InputMaybe<Scalars['Int']>;
  donationsCount_lte?: InputMaybe<Scalars['Int']>;
  donationsCount_not?: InputMaybe<Scalars['Int']>;
  donationsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  supportersCount?: InputMaybe<Scalars['Int']>;
  supportersCount_gt?: InputMaybe<Scalars['Int']>;
  supportersCount_gte?: InputMaybe<Scalars['Int']>;
  supportersCount_in?: InputMaybe<Array<Scalars['Int']>>;
  supportersCount_lt?: InputMaybe<Scalars['Int']>;
  supportersCount_lte?: InputMaybe<Scalars['Int']>;
  supportersCount_not?: InputMaybe<Scalars['Int']>;
  supportersCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  usersCount?: InputMaybe<Scalars['Int']>;
  usersCount_gt?: InputMaybe<Scalars['Int']>;
  usersCount_gte?: InputMaybe<Scalars['Int']>;
  usersCount_in?: InputMaybe<Array<Scalars['Int']>>;
  usersCount_lt?: InputMaybe<Scalars['Int']>;
  usersCount_lte?: InputMaybe<Scalars['Int']>;
  usersCount_not?: InputMaybe<Scalars['Int']>;
  usersCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Global_OrderBy {
  CollectionsCount = 'collectionsCount',
  DonationsCount = 'donationsCount',
  Id = 'id',
  SupportersCount = 'supportersCount',
  UsersCount = 'usersCount'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  supporter?: Maybe<Supporter>;
  supporters: Array<Supporter>;
  title?: Maybe<Title>;
  titles: Array<Title>;
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


export type QueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type QuerySupporterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySupportersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Supporter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Supporter_Filter>;
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
  account?: Maybe<Account>;
  accounts: Array<Account>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  supporter?: Maybe<Supporter>;
  supporters: Array<Supporter>;
  title?: Maybe<Title>;
  titles: Array<Title>;
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


export type SubscriptionGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type SubscriptionSupporterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSupportersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Supporter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Supporter_Filter>;
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

export type Supporter = {
  __typename?: 'Supporter';
  account: Account;
  collection: Collection;
  donated: Scalars['BigInt'];
  donations: Array<Donation>;
  donationsCount: Scalars['Int'];
  id: Scalars['ID'];
};


export type SupporterDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};

export type Supporter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  donated?: InputMaybe<Scalars['BigInt']>;
  donated_gt?: InputMaybe<Scalars['BigInt']>;
  donated_gte?: InputMaybe<Scalars['BigInt']>;
  donated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donated_lt?: InputMaybe<Scalars['BigInt']>;
  donated_lte?: InputMaybe<Scalars['BigInt']>;
  donated_not?: InputMaybe<Scalars['BigInt']>;
  donated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  donationsCount?: InputMaybe<Scalars['Int']>;
  donationsCount_gt?: InputMaybe<Scalars['Int']>;
  donationsCount_gte?: InputMaybe<Scalars['Int']>;
  donationsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  donationsCount_lt?: InputMaybe<Scalars['Int']>;
  donationsCount_lte?: InputMaybe<Scalars['Int']>;
  donationsCount_not?: InputMaybe<Scalars['Int']>;
  donationsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Supporter_OrderBy {
  Account = 'account',
  Collection = 'collection',
  Donated = 'donated',
  Donations = 'donations',
  DonationsCount = 'donationsCount',
  Id = 'id'
}

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


export type AccountCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, donated: any, donationsCount: number, coin: any, name: string, description: string, image: string, goal: string, time: any, owner?: { __typename?: 'Account', id: string } | null }> };

export type AccountDonationsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountDonationsQuery = { __typename?: 'Query', donations: Array<{ __typename?: 'Donation', id: string, message: string, amount: any, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', coin: any, name: string, image: string, id: string } }> };

export type CollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', donated: any, donationsCount: number, coin: any, time: any, id: string, name: string, description: string, image: string, background: string, url: string, goal: string, socials: Array<string>, donationOptions: Array<string>, address: any, owner?: { __typename?: 'Account', id: string } | null, donations: Array<{ __typename?: 'Donation', id: string, message: string, amount: any, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', coin: any } }> } | null };

export type CollectionListQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionListQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string }> };

export type DonationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DonationQuery = { __typename?: 'Query', donation?: { __typename?: 'Donation', amount: any, message: string, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', name: string, description: string, url: string, coin: any, image: string, socials: Array<string>, donationOptions: Array<string>, goal: string } } | null };

export type GlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalQuery = { __typename?: 'Query', global?: { __typename?: 'Global', donationsCount: number, collectionsCount: number, usersCount: number, supportersCount: number } | null };

export type LatestCollectionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LatestCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', donated: any, time: any, coin: any, name: string, description: string, image: string, background: string, goal: string, donationsCount: number, id: string, owner?: { __typename?: 'Account', id: string } | null }> };


export const AccountCollectionsDocument = gql`
    query accountCollections($owner: String = "") {
  collections(
    where: {owner_contains_nocase: $owner}
    orderBy: time
    orderDirection: desc
  ) {
    id
    donated
    donationsCount
    coin
    owner {
      id
    }
    name
    description
    image
    goal
    time
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
    where: {donator_contains_nocase: $owner}
    orderBy: time
    orderDirection: desc
  ) {
    id
    message
    amount
    donator {
      id
    }
    collection {
      coin
      name
      image
      id
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
export const CollectionDocument = gql`
    query collection($id: ID = "") {
  collection(id: $id) {
    donated
    donationsCount
    coin
    time
    id
    owner {
      id
    }
    name
    description
    image
    background
    url
    goal
    socials
    donationOptions
    address
    donations(first: 1, orderBy: time, orderDirection: desc) {
      id
      message
      donator {
        id
      }
      amount
      time
      collection {
        coin
      }
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
    donator {
      id
    }
    message
    time
    collection {
      name
      description
      url
      coin
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
export const GlobalDocument = gql`
    query global {
  global(id: "0") {
    donationsCount
    collectionsCount
    usersCount
    supportersCount
  }
}
    `;

/**
 * __useGlobalQuery__
 *
 * To run a query within a React component, call `useGlobalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalQuery(baseOptions?: Apollo.QueryHookOptions<GlobalQuery, GlobalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, options);
      }
export function useGlobalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalQuery, GlobalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalQuery, GlobalQueryVariables>(GlobalDocument, options);
        }
export type GlobalQueryHookResult = ReturnType<typeof useGlobalQuery>;
export type GlobalLazyQueryHookResult = ReturnType<typeof useGlobalLazyQuery>;
export type GlobalQueryResult = Apollo.QueryResult<GlobalQuery, GlobalQueryVariables>;
export const LatestCollectionsDocument = gql`
    query latestCollections($first: Int = 10) {
  collections(first: $first, orderBy: time, orderDirection: desc) {
    donated
    time
    coin
    name
    description
    image
    background
    goal
    donationsCount
    id
    owner {
      id
    }
  }
}
    `;

/**
 * __useLatestCollectionsQuery__
 *
 * To run a query within a React component, call `useLatestCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestCollectionsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useLatestCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<LatestCollectionsQuery, LatestCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LatestCollectionsQuery, LatestCollectionsQueryVariables>(LatestCollectionsDocument, options);
      }
export function useLatestCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LatestCollectionsQuery, LatestCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LatestCollectionsQuery, LatestCollectionsQueryVariables>(LatestCollectionsDocument, options);
        }
export type LatestCollectionsQueryHookResult = ReturnType<typeof useLatestCollectionsQuery>;
export type LatestCollectionsLazyQueryHookResult = ReturnType<typeof useLatestCollectionsLazyQuery>;
export type LatestCollectionsQueryResult = Apollo.QueryResult<LatestCollectionsQuery, LatestCollectionsQueryVariables>;