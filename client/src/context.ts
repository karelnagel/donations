import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { createContext } from "react";
import { MessageType, NetworkInfo, User } from "./consts/interfaces";
import { networks } from "./consts/setup";

const rpcUrl = `https://${process.env.REACT_APP_NETWORK}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
export const defaultProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

export const Context = createContext<ContextInterface>({
  network: networks[1],
  addMessage: () => {},
  provider: defaultProvider,
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
  setLoading?: React.Dispatch<React.SetStateAction<string>>;
}
