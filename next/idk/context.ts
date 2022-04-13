import {  Web3Provider } from "@ethersproject/providers";
import { AlertColor } from "@mui/material";
import { createContext } from "react";

export const Context = createContext<ContextInterface>({
});

export interface ContextInterface {
    provider?: Web3Provider;
    user?: User;
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
    setProvider?: React.Dispatch<React.SetStateAction<Web3Provider | undefined>>
    setSnack?: (message: string, severity?: AlertColor) => void
    load?: (fun: () => Promise<any>, message: string) => Promise<void>
}

export interface User {
    address: string;
    chainId: number;
    name?: string;
    avatar?: string;
}
