export interface ProjectStyle {
  image: string;
  name: string;
  description: string;
  donationDefault: number;
  donationOptions: number[];
  links: Links;
  external_url: string;
}
export const defaultProjectStyle: ProjectStyle = {
  name: "",
  image: "",
  description: "",
  donationDefault: 0,
  links: {twitter:"",instagram:'',youtube:'',opensea:''},
  external_url: "",
  donationOptions: [0,0,0],
};

export interface Project {
  title:string;
  goal: number;
  balance: number;
  owner: string;
  ownerName?: string;
  coin: string;
  uri: string;
  active: boolean;
}
export const defaultProject: Project = {
  title:"",
  goal: 0,
  balance: 0,
  owner: "",
  coin: "",
  uri: "",
  active: true,
};
export interface Links {
  twitter: string;
  instagram: string;
  opensea: string;
  youtube: string;
}
