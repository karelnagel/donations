export interface LinksObj {
  twitter?: string;
  instagram?: string;
  opensea?: string;
  youtube?: string;
}

export interface ProjectObj {
  image?: string;
  name?: string;
  description?: string;
  donationDefault?: number;
  donationOptions?: number[];
  links?: LinksObj;
  external_url?: string;
}

export interface Project {
  goal: number;
  balance: number;
  owner: string;
  coin: string;
  uri: string;
  active: boolean;
}
