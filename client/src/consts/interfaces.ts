export interface LinksObj {
  twitter?: string;
  instagram?: string;
  opensea?: string;
  youtube?: string;
}

export interface ProjectStyle {
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
export interface Message {
  message: string;
  type: MessageType;
  time?: number;
}
export enum MessageType {
  network,
  donation,
  error,
  success,
  else,
}

export interface Return {
  error?: string;
}
export interface ReturnString extends Return {
  result?: string;
}
export interface ReturnNumber extends Return {
  result?: number;
}
export interface ReturnProject extends Return {
  result?: Project;
}
export interface ReturnProjectStyle extends Return {
  result?: ProjectStyle;
}
export const error = (error: string, e: unknown): Return => {
  console.log(e);
  return { error };
};

export interface NetworkInfo {
  chainId: number;
  name: string;
  contract: string;
  token: string;
  coins: { value: string; label: string }[];
}
export interface User {
  address: string;
  balance?:number;
}
