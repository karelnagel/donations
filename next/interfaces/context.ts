import { JsonRpcProvider } from "@ethersproject/providers";
import { createContext } from "react";

// export const rpcUrl = `https://${process.env.REACT_APP_NETWORK}.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;

export const Context = createContext<ContextInterface>({
});

export interface ContextInterface {
    provider?: JsonRpcProvider;
    user?: User;
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
    setProvider?: React.Dispatch<React.SetStateAction<JsonRpcProvider | undefined>>
}

export interface User {
    address: string;
}
