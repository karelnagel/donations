import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { createContext } from "react";
import { networks } from "../networks";
import { MessageType } from "./message";

export const rpcUrl = `https://${process.env.REACT_APP_NETWORK}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
export const defaultProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

export const Context = createContext<ContextInterface>({
  network: networks[0],
  addMessage: () => {},
  provider: defaultProvider,
  load: () => {},
});

export interface ContextInterface {
  provider: JsonRpcProvider;
  user?: User;
  network: NetworkInfo;

  addMessage: (
    message: string,
    type?: MessageType,
    time?: number | undefined
  ) => void;
  load: (asyncFunc: () => Promise<void>, message: string) => void;
}

export interface NetworkInfo {
  chainId: number;
  name: string;
  etherscan: string;
  opensea: string;
  openseaCollection: string;
  contract: string;
  token: string;
  coins: { value: string; label: string }[];
}
export interface User {
  address: string;
  name?: string;
  balance?: number;
}
