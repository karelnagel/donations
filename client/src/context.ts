import { Web3Provider } from "@ethersproject/providers";
import { createContext } from "react";
import { MessageType, NetworkInfo, User } from "./consts/interfaces";
import { networks } from "./consts/setup";

export const Context = createContext<ContextInterface>({network:networks[1],addMessage:()=>{}});
export interface ContextInterface {
  provider?: Web3Provider;
  user?: User;
  network: NetworkInfo;
  addMessage: (
    message: string,
    type?: MessageType,
    time?: number | undefined
  ) => void;
}
