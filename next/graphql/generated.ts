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

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  question: Question;
  votes: Array<Vote>;
  votesAmount: Scalars['BigInt'];
  votesCount: Scalars['Int'];
};


export type AnswerVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
};

export type Answer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  answer?: InputMaybe<Scalars['String']>;
  answer_contains?: InputMaybe<Scalars['String']>;
  answer_contains_nocase?: InputMaybe<Scalars['String']>;
  answer_ends_with?: InputMaybe<Scalars['String']>;
  answer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  answer_gt?: InputMaybe<Scalars['String']>;
  answer_gte?: InputMaybe<Scalars['String']>;
  answer_in?: InputMaybe<Array<Scalars['String']>>;
  answer_lt?: InputMaybe<Scalars['String']>;
  answer_lte?: InputMaybe<Scalars['String']>;
  answer_not?: InputMaybe<Scalars['String']>;
  answer_not_contains?: InputMaybe<Scalars['String']>;
  answer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  answer_not_ends_with?: InputMaybe<Scalars['String']>;
  answer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  answer_not_in?: InputMaybe<Array<Scalars['String']>>;
  answer_not_starts_with?: InputMaybe<Scalars['String']>;
  answer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  answer_starts_with?: InputMaybe<Scalars['String']>;
  answer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  question?: InputMaybe<Scalars['String']>;
  question_contains?: InputMaybe<Scalars['String']>;
  question_contains_nocase?: InputMaybe<Scalars['String']>;
  question_ends_with?: InputMaybe<Scalars['String']>;
  question_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_gt?: InputMaybe<Scalars['String']>;
  question_gte?: InputMaybe<Scalars['String']>;
  question_in?: InputMaybe<Array<Scalars['String']>>;
  question_lt?: InputMaybe<Scalars['String']>;
  question_lte?: InputMaybe<Scalars['String']>;
  question_not?: InputMaybe<Scalars['String']>;
  question_not_contains?: InputMaybe<Scalars['String']>;
  question_not_contains_nocase?: InputMaybe<Scalars['String']>;
  question_not_ends_with?: InputMaybe<Scalars['String']>;
  question_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_not_in?: InputMaybe<Array<Scalars['String']>>;
  question_not_starts_with?: InputMaybe<Scalars['String']>;
  question_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  question_starts_with?: InputMaybe<Scalars['String']>;
  question_starts_with_nocase?: InputMaybe<Scalars['String']>;
  votesAmount?: InputMaybe<Scalars['BigInt']>;
  votesAmount_gt?: InputMaybe<Scalars['BigInt']>;
  votesAmount_gte?: InputMaybe<Scalars['BigInt']>;
  votesAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesAmount_lt?: InputMaybe<Scalars['BigInt']>;
  votesAmount_lte?: InputMaybe<Scalars['BigInt']>;
  votesAmount_not?: InputMaybe<Scalars['BigInt']>;
  votesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesCount?: InputMaybe<Scalars['Int']>;
  votesCount_gt?: InputMaybe<Scalars['Int']>;
  votesCount_gte?: InputMaybe<Scalars['Int']>;
  votesCount_in?: InputMaybe<Array<Scalars['Int']>>;
  votesCount_lt?: InputMaybe<Scalars['Int']>;
  votesCount_lte?: InputMaybe<Scalars['Int']>;
  votesCount_not?: InputMaybe<Scalars['Int']>;
  votesCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Answer_OrderBy {
  Answer = 'answer',
  Id = 'id',
  Index = 'index',
  Question = 'question',
  Votes = 'votes',
  VotesAmount = 'votesAmount',
  VotesCount = 'votesCount'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Coin = {
  __typename?: 'Coin';
  collections: Array<Collection>;
  donated: Scalars['BigInt'];
  donationsCount: Scalars['Int'];
  global: Global;
  id: Scalars['ID'];
};


export type CoinCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Collection_Filter>;
};

export type Coin_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  global?: InputMaybe<Scalars['String']>;
  global_contains?: InputMaybe<Scalars['String']>;
  global_contains_nocase?: InputMaybe<Scalars['String']>;
  global_ends_with?: InputMaybe<Scalars['String']>;
  global_ends_with_nocase?: InputMaybe<Scalars['String']>;
  global_gt?: InputMaybe<Scalars['String']>;
  global_gte?: InputMaybe<Scalars['String']>;
  global_in?: InputMaybe<Array<Scalars['String']>>;
  global_lt?: InputMaybe<Scalars['String']>;
  global_lte?: InputMaybe<Scalars['String']>;
  global_not?: InputMaybe<Scalars['String']>;
  global_not_contains?: InputMaybe<Scalars['String']>;
  global_not_contains_nocase?: InputMaybe<Scalars['String']>;
  global_not_ends_with?: InputMaybe<Scalars['String']>;
  global_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  global_not_in?: InputMaybe<Array<Scalars['String']>>;
  global_not_starts_with?: InputMaybe<Scalars['String']>;
  global_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  global_starts_with?: InputMaybe<Scalars['String']>;
  global_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Coin_OrderBy {
  Collections = 'collections',
  Donated = 'donated',
  DonationsCount = 'donationsCount',
  Global = 'global',
  Id = 'id'
}

export type Collection = {
  __typename?: 'Collection';
  address: CollectionAddress;
  background: Scalars['String'];
  coin: Coin;
  content: Array<Content>;
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
  questions: Array<Question>;
  questionsCount: Scalars['Int'];
  socials: Array<Scalars['String']>;
  supporters: Array<Supporter>;
  time: Scalars['BigInt'];
  url: Scalars['String'];
};


export type CollectionContentArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Content_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Content_Filter>;
};


export type CollectionDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};


export type CollectionQuestionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Question_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Question_Filter>;
};


export type CollectionSupportersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Supporter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Supporter_Filter>;
};

export type CollectionAddress = {
  __typename?: 'CollectionAddress';
  collection: Collection;
  id: Scalars['ID'];
};

export type CollectionAddress_Filter = {
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

export enum CollectionAddress_OrderBy {
  Collection = 'collection',
  Id = 'id'
}

export type Collection_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  coin?: InputMaybe<Scalars['String']>;
  coin_contains?: InputMaybe<Scalars['String']>;
  coin_contains_nocase?: InputMaybe<Scalars['String']>;
  coin_ends_with?: InputMaybe<Scalars['String']>;
  coin_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coin_gt?: InputMaybe<Scalars['String']>;
  coin_gte?: InputMaybe<Scalars['String']>;
  coin_in?: InputMaybe<Array<Scalars['String']>>;
  coin_lt?: InputMaybe<Scalars['String']>;
  coin_lte?: InputMaybe<Scalars['String']>;
  coin_not?: InputMaybe<Scalars['String']>;
  coin_not_contains?: InputMaybe<Scalars['String']>;
  coin_not_contains_nocase?: InputMaybe<Scalars['String']>;
  coin_not_ends_with?: InputMaybe<Scalars['String']>;
  coin_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coin_not_in?: InputMaybe<Array<Scalars['String']>>;
  coin_not_starts_with?: InputMaybe<Scalars['String']>;
  coin_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coin_starts_with?: InputMaybe<Scalars['String']>;
  coin_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  questionsCount?: InputMaybe<Scalars['Int']>;
  questionsCount_gt?: InputMaybe<Scalars['Int']>;
  questionsCount_gte?: InputMaybe<Scalars['Int']>;
  questionsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  questionsCount_lt?: InputMaybe<Scalars['Int']>;
  questionsCount_lte?: InputMaybe<Scalars['Int']>;
  questionsCount_not?: InputMaybe<Scalars['Int']>;
  questionsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  Content = 'content',
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
  Questions = 'questions',
  QuestionsCount = 'questionsCount',
  Socials = 'socials',
  Supporters = 'supporters',
  Time = 'time',
  Url = 'url'
}

export type Content = {
  __typename?: 'Content';
  collection: Collection;
  content: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  ipfs: Scalars['String'];
  price: Scalars['BigInt'];
  time: Scalars['BigInt'];
};

export type Content_Filter = {
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
  content?: InputMaybe<Scalars['String']>;
  content_contains?: InputMaybe<Scalars['String']>;
  content_contains_nocase?: InputMaybe<Scalars['String']>;
  content_ends_with?: InputMaybe<Scalars['String']>;
  content_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_gt?: InputMaybe<Scalars['String']>;
  content_gte?: InputMaybe<Scalars['String']>;
  content_in?: InputMaybe<Array<Scalars['String']>>;
  content_lt?: InputMaybe<Scalars['String']>;
  content_lte?: InputMaybe<Scalars['String']>;
  content_not?: InputMaybe<Scalars['String']>;
  content_not_contains?: InputMaybe<Scalars['String']>;
  content_not_contains_nocase?: InputMaybe<Scalars['String']>;
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  content_not_in?: InputMaybe<Array<Scalars['String']>>;
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  content_starts_with?: InputMaybe<Scalars['String']>;
  content_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  price?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Content_OrderBy {
  Collection = 'collection',
  Content = 'content',
  Description = 'description',
  Id = 'id',
  Ipfs = 'ipfs',
  Price = 'price',
  Time = 'time'
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
  tokenId: Scalars['String'];
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
  tokenId?: InputMaybe<Scalars['String']>;
  tokenId_contains?: InputMaybe<Scalars['String']>;
  tokenId_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']>;
  tokenId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenId_gt?: InputMaybe<Scalars['String']>;
  tokenId_gte?: InputMaybe<Scalars['String']>;
  tokenId_in?: InputMaybe<Array<Scalars['String']>>;
  tokenId_lt?: InputMaybe<Scalars['String']>;
  tokenId_lte?: InputMaybe<Scalars['String']>;
  tokenId_not?: InputMaybe<Scalars['String']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']>;
  tokenId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']>;
  tokenId_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Donation_OrderBy {
  Amount = 'amount',
  Collection = 'collection',
  Donator = 'donator',
  Id = 'id',
  Message = 'message',
  Supporter = 'supporter',
  Time = 'time',
  TokenId = 'tokenId'
}

export type Global = {
  __typename?: 'Global';
  coins: Array<Coin>;
  collectionsCount: Scalars['Int'];
  donationsCount: Scalars['Int'];
  id: Scalars['ID'];
  supportersCount: Scalars['Int'];
  usersCount: Scalars['Int'];
};


export type GlobalCoinsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Coin_Filter>;
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
  Coins = 'coins',
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
  answer?: Maybe<Answer>;
  answers: Array<Answer>;
  coin?: Maybe<Coin>;
  coins: Array<Coin>;
  collection?: Maybe<Collection>;
  collectionAddress?: Maybe<CollectionAddress>;
  collectionAddresses: Array<CollectionAddress>;
  collections: Array<Collection>;
  content?: Maybe<Content>;
  contents: Array<Content>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  supporter?: Maybe<Supporter>;
  supporters: Array<Supporter>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
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


export type QueryAnswerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAnswersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Answer_Filter>;
};


export type QueryCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Coin_Filter>;
};


export type QueryCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollectionAddressArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollectionAddressesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionAddress_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollectionAddress_Filter>;
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


export type QueryContentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Content_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Content_Filter>;
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


export type QueryQuestionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryQuestionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Question_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Question_Filter>;
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


export type QueryVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Answer>;
  collection: Collection;
  endTime: Scalars['BigInt'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  ipfs: Scalars['String'];
  question: Scalars['String'];
  time: Scalars['BigInt'];
  votes: Array<Vote>;
  votesAmount: Scalars['BigInt'];
  votesCount: Scalars['Int'];
};


export type QuestionAnswersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Answer_Filter>;
};


export type QuestionVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
};

export type Question_Filter = {
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
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  question?: InputMaybe<Scalars['String']>;
  question_contains?: InputMaybe<Scalars['String']>;
  question_contains_nocase?: InputMaybe<Scalars['String']>;
  question_ends_with?: InputMaybe<Scalars['String']>;
  question_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_gt?: InputMaybe<Scalars['String']>;
  question_gte?: InputMaybe<Scalars['String']>;
  question_in?: InputMaybe<Array<Scalars['String']>>;
  question_lt?: InputMaybe<Scalars['String']>;
  question_lte?: InputMaybe<Scalars['String']>;
  question_not?: InputMaybe<Scalars['String']>;
  question_not_contains?: InputMaybe<Scalars['String']>;
  question_not_contains_nocase?: InputMaybe<Scalars['String']>;
  question_not_ends_with?: InputMaybe<Scalars['String']>;
  question_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_not_in?: InputMaybe<Array<Scalars['String']>>;
  question_not_starts_with?: InputMaybe<Scalars['String']>;
  question_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  question_starts_with?: InputMaybe<Scalars['String']>;
  question_starts_with_nocase?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesAmount?: InputMaybe<Scalars['BigInt']>;
  votesAmount_gt?: InputMaybe<Scalars['BigInt']>;
  votesAmount_gte?: InputMaybe<Scalars['BigInt']>;
  votesAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesAmount_lt?: InputMaybe<Scalars['BigInt']>;
  votesAmount_lte?: InputMaybe<Scalars['BigInt']>;
  votesAmount_not?: InputMaybe<Scalars['BigInt']>;
  votesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesCount?: InputMaybe<Scalars['Int']>;
  votesCount_gt?: InputMaybe<Scalars['Int']>;
  votesCount_gte?: InputMaybe<Scalars['Int']>;
  votesCount_in?: InputMaybe<Array<Scalars['Int']>>;
  votesCount_lt?: InputMaybe<Scalars['Int']>;
  votesCount_lte?: InputMaybe<Scalars['Int']>;
  votesCount_not?: InputMaybe<Scalars['Int']>;
  votesCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Question_OrderBy {
  Answers = 'answers',
  Collection = 'collection',
  EndTime = 'endTime',
  Id = 'id',
  Index = 'index',
  Ipfs = 'ipfs',
  Question = 'question',
  Time = 'time',
  Votes = 'votes',
  VotesAmount = 'votesAmount',
  VotesCount = 'votesCount'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  answer?: Maybe<Answer>;
  answers: Array<Answer>;
  coin?: Maybe<Coin>;
  coins: Array<Coin>;
  collection?: Maybe<Collection>;
  collectionAddress?: Maybe<CollectionAddress>;
  collectionAddresses: Array<CollectionAddress>;
  collections: Array<Collection>;
  content?: Maybe<Content>;
  contents: Array<Content>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  question?: Maybe<Question>;
  questions: Array<Question>;
  supporter?: Maybe<Supporter>;
  supporters: Array<Supporter>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
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


export type SubscriptionAnswerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAnswersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Answer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Answer_Filter>;
};


export type SubscriptionCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Coin_Filter>;
};


export type SubscriptionCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollectionAddressArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollectionAddressesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionAddress_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CollectionAddress_Filter>;
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


export type SubscriptionContentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Content_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Content_Filter>;
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


export type SubscriptionQuestionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionQuestionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Question_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Question_Filter>;
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


export type SubscriptionVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vote_Filter>;
};

export type Supporter = {
  __typename?: 'Supporter';
  account: Account;
  collection: Collection;
  donated: Scalars['BigInt'];
  donations: Array<Donation>;
  donationsCount: Scalars['Int'];
  id: Scalars['ID'];
  votes: Array<Vote>;
};


export type SupporterDonationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Donation_Filter>;
};


export type SupporterVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Vote_Filter>;
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
  Id = 'id',
  Votes = 'votes'
}

export type Vote = {
  __typename?: 'Vote';
  answer: Answer;
  id: Scalars['ID'];
  question: Question;
  supporter: Supporter;
};

export type Vote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  answer?: InputMaybe<Scalars['String']>;
  answer_contains?: InputMaybe<Scalars['String']>;
  answer_contains_nocase?: InputMaybe<Scalars['String']>;
  answer_ends_with?: InputMaybe<Scalars['String']>;
  answer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  answer_gt?: InputMaybe<Scalars['String']>;
  answer_gte?: InputMaybe<Scalars['String']>;
  answer_in?: InputMaybe<Array<Scalars['String']>>;
  answer_lt?: InputMaybe<Scalars['String']>;
  answer_lte?: InputMaybe<Scalars['String']>;
  answer_not?: InputMaybe<Scalars['String']>;
  answer_not_contains?: InputMaybe<Scalars['String']>;
  answer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  answer_not_ends_with?: InputMaybe<Scalars['String']>;
  answer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  answer_not_in?: InputMaybe<Array<Scalars['String']>>;
  answer_not_starts_with?: InputMaybe<Scalars['String']>;
  answer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  answer_starts_with?: InputMaybe<Scalars['String']>;
  answer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  question?: InputMaybe<Scalars['String']>;
  question_contains?: InputMaybe<Scalars['String']>;
  question_contains_nocase?: InputMaybe<Scalars['String']>;
  question_ends_with?: InputMaybe<Scalars['String']>;
  question_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_gt?: InputMaybe<Scalars['String']>;
  question_gte?: InputMaybe<Scalars['String']>;
  question_in?: InputMaybe<Array<Scalars['String']>>;
  question_lt?: InputMaybe<Scalars['String']>;
  question_lte?: InputMaybe<Scalars['String']>;
  question_not?: InputMaybe<Scalars['String']>;
  question_not_contains?: InputMaybe<Scalars['String']>;
  question_not_contains_nocase?: InputMaybe<Scalars['String']>;
  question_not_ends_with?: InputMaybe<Scalars['String']>;
  question_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  question_not_in?: InputMaybe<Array<Scalars['String']>>;
  question_not_starts_with?: InputMaybe<Scalars['String']>;
  question_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  question_starts_with?: InputMaybe<Scalars['String']>;
  question_starts_with_nocase?: InputMaybe<Scalars['String']>;
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
};

export enum Vote_OrderBy {
  Answer = 'answer',
  Id = 'id',
  Question = 'question',
  Supporter = 'supporter'
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


export type AccountCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, donated: any, donationsCount: number, name: string, description: string, image: string, goal: string, time: any, coin: { __typename?: 'Coin', id: string }, owner?: { __typename?: 'Account', id: string } | null }> };

export type AccountDonationsQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountDonationsQuery = { __typename?: 'Query', donations: Array<{ __typename?: 'Donation', id: string, message: string, amount: any, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', name: string, image: string, id: string, coin: { __typename?: 'Coin', id: string } } }> };

export type AccountSupportedQueryVariables = Exact<{
  owner?: InputMaybe<Scalars['String']>;
}>;


export type AccountSupportedQuery = { __typename?: 'Query', supporters: Array<{ __typename?: 'Supporter', id: string, donated: any, donationsCount: number, collection: { __typename?: 'Collection', image: string, name: string, id: string, coin: { __typename?: 'Coin', id: string } } }> };

export type CollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', donated: any, donationsCount: number, time: any, id: string, name: string, description: string, image: string, background: string, url: string, goal: string, socials: Array<string>, donationOptions: Array<string>, coin: { __typename?: 'Coin', id: string }, owner?: { __typename?: 'Account', id: string } | null, address: { __typename?: 'CollectionAddress', id: string }, donations: Array<{ __typename?: 'Donation', id: string, message: string, amount: any, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', coin: { __typename?: 'Coin', id: string } } }> } | null };

export type CollectionListQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionListQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string }> };

export type CollectionSupportersQueryVariables = Exact<{
  title?: InputMaybe<Scalars['ID']>;
}>;


export type CollectionSupportersQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', name: string, coin: { __typename?: 'Coin', id: string }, supporters: Array<{ __typename?: 'Supporter', id: string, donated: any, donationsCount: number, account: { __typename?: 'Account', id: string } }> } | null };

export type ContentQueryVariables = Exact<{
  title?: InputMaybe<Scalars['ID']>;
  account?: InputMaybe<Scalars['String']>;
}>;


export type ContentQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, owner?: { __typename?: 'Account', id: string } | null, address: { __typename?: 'CollectionAddress', id: string }, coin: { __typename?: 'Coin', id: string }, content: Array<{ __typename?: 'Content', id: string, description: string, content: string, price: any, time: any, collection: { __typename?: 'Collection', coin: { __typename?: 'Coin', id: string } } }>, supporters: Array<{ __typename?: 'Supporter', id: string, donated: any, account: { __typename?: 'Account', id: string } }> } | null };

export type DonationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DonationQuery = { __typename?: 'Query', donation?: { __typename?: 'Donation', amount: any, message: string, time: any, donator: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', name: string, description: string, url: string, image: string, socials: Array<string>, donationOptions: Array<string>, goal: string, coin: { __typename?: 'Coin', id: string } } } | null };

export type GlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalQuery = { __typename?: 'Query', global?: { __typename?: 'Global', donationsCount: number, collectionsCount: number, usersCount: number, supportersCount: number, coins: Array<{ __typename?: 'Coin', id: string, donated: any }> } | null };

export type LatestCollectionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
}>;


export type LatestCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', donated: any, time: any, name: string, description: string, image: string, background: string, goal: string, donationsCount: number, id: string, coin: { __typename?: 'Coin', id: string }, owner?: { __typename?: 'Account', id: string } | null }> };

export type QuestionsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['ID']>;
}>;


export type QuestionsQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, owner?: { __typename?: 'Account', id: string } | null, address: { __typename?: 'CollectionAddress', id: string }, questions: Array<{ __typename?: 'Question', id: string, endTime: any, question: string, votesAmount: any, votesCount: number, index: any, collection: { __typename?: 'Collection', coin: { __typename?: 'Coin', id: string } }, answers: Array<{ __typename?: 'Answer', id: string, answer: string, votesAmount: any, votesCount: number, index: any }> }> } | null };


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
    coin {
      id
    }
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
      coin {
        id
      }
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
export const AccountSupportedDocument = gql`
    query accountSupported($owner: String = "") {
  supporters(
    where: {account_contains_nocase: $owner}
    orderBy: donated
    orderDirection: desc
  ) {
    id
    donated
    donationsCount
    collection {
      image
      name
      id
      coin {
        id
      }
    }
  }
}
    `;

/**
 * __useAccountSupportedQuery__
 *
 * To run a query within a React component, call `useAccountSupportedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountSupportedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountSupportedQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *   },
 * });
 */
export function useAccountSupportedQuery(baseOptions?: Apollo.QueryHookOptions<AccountSupportedQuery, AccountSupportedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountSupportedQuery, AccountSupportedQueryVariables>(AccountSupportedDocument, options);
      }
export function useAccountSupportedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountSupportedQuery, AccountSupportedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountSupportedQuery, AccountSupportedQueryVariables>(AccountSupportedDocument, options);
        }
export type AccountSupportedQueryHookResult = ReturnType<typeof useAccountSupportedQuery>;
export type AccountSupportedLazyQueryHookResult = ReturnType<typeof useAccountSupportedLazyQuery>;
export type AccountSupportedQueryResult = Apollo.QueryResult<AccountSupportedQuery, AccountSupportedQueryVariables>;
export const CollectionDocument = gql`
    query collection($id: ID = "") {
  collection(id: $id) {
    donated
    donationsCount
    coin {
      id
    }
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
    address {
      id
    }
    donations(first: 1, orderBy: time, orderDirection: desc) {
      id
      message
      donator {
        id
      }
      amount
      time
      collection {
        coin {
          id
        }
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
export const CollectionSupportersDocument = gql`
    query collectionSupporters($title: ID = "") {
  collection(id: $title) {
    name
    coin {
      id
    }
    supporters(orderBy: donated, orderDirection: desc) {
      id
      donated
      donationsCount
      account {
        id
      }
    }
  }
}
    `;

/**
 * __useCollectionSupportersQuery__
 *
 * To run a query within a React component, call `useCollectionSupportersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionSupportersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionSupportersQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCollectionSupportersQuery(baseOptions?: Apollo.QueryHookOptions<CollectionSupportersQuery, CollectionSupportersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionSupportersQuery, CollectionSupportersQueryVariables>(CollectionSupportersDocument, options);
      }
export function useCollectionSupportersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionSupportersQuery, CollectionSupportersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionSupportersQuery, CollectionSupportersQueryVariables>(CollectionSupportersDocument, options);
        }
export type CollectionSupportersQueryHookResult = ReturnType<typeof useCollectionSupportersQuery>;
export type CollectionSupportersLazyQueryHookResult = ReturnType<typeof useCollectionSupportersLazyQuery>;
export type CollectionSupportersQueryResult = Apollo.QueryResult<CollectionSupportersQuery, CollectionSupportersQueryVariables>;
export const ContentDocument = gql`
    query content($title: ID = "", $account: String = "") {
  collection(id: $title) {
    id
    owner {
      id
    }
    name
    address {
      id
    }
    coin {
      id
    }
    content(orderBy: time, orderDirection: desc) {
      id
      description
      content
      price
      time
      collection {
        coin {
          id
        }
      }
    }
    supporters(where: {account_contains_nocase: $account}) {
      id
      donated
      account {
        id
      }
    }
  }
}
    `;

/**
 * __useContentQuery__
 *
 * To run a query within a React component, call `useContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentQuery({
 *   variables: {
 *      title: // value for 'title'
 *      account: // value for 'account'
 *   },
 * });
 */
export function useContentQuery(baseOptions?: Apollo.QueryHookOptions<ContentQuery, ContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
      }
export function useContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentQuery, ContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
        }
export type ContentQueryHookResult = ReturnType<typeof useContentQuery>;
export type ContentLazyQueryHookResult = ReturnType<typeof useContentLazyQuery>;
export type ContentQueryResult = Apollo.QueryResult<ContentQuery, ContentQueryVariables>;
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
      coin {
        id
      }
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
    coins {
      id
      donated
    }
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
    coin {
      id
    }
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
export const QuestionsDocument = gql`
    query questions($title: ID = "") {
  collection(id: $title) {
    id
    owner {
      id
    }
    name
    address {
      id
    }
    questions(orderBy: index, orderDirection: desc) {
      id
      endTime
      question
      votesAmount
      votesCount
      index
      collection {
        coin {
          id
        }
      }
      answers {
        id
        answer
        votesAmount
        votesCount
        index
      }
    }
  }
}
    `;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;