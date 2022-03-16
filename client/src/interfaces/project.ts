export interface ProjectStyle {
  image: string;
  name: string;
  description: string;
  donationDefault: number;
  donationOptions: number[];
  links: Links;
  external_link: string;
  seller_fee_basis_points: number;
  fee_recipient: string;
}
export const defaultProjectStyle: ProjectStyle = {
  name: "",
  image: "",
  description: "",
  donationDefault: 0,
  links: { twitter: "", instagram: "", youtube: "", opensea: "" },
  external_link: "",
  donationOptions: [0, 0, 0],
  seller_fee_basis_points: 500,
  fee_recipient: "",
};

export interface Project {
  title: string;
  goal: number;
  balance: number;
  owner: string;
  ownerName?: string;
  coin: string;
  uri: string;
  active: boolean;
  image: string;
  donationsCount: number;
}
export const defaultProject: Project = {
  title: "",
  goal: 0,
  balance: 0,
  owner: "",
  coin: "",
  uri: "",
  active: true,
  image: "",
  donationsCount: 0,
};
export interface Links {
  twitter: string;
  instagram: string;
  opensea: string;
  youtube: string;
}
