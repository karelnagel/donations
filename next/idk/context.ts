import { JsonRpcProvider } from "@ethersproject/providers";
import { AlertColor } from "@mui/material";
import { createContext } from "react";

export const Context = createContext<ContextInterface>({
});

export interface ContextInterface {
    provider?: JsonRpcProvider;
    user?: User;
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
    setProvider?: React.Dispatch<React.SetStateAction<JsonRpcProvider | undefined>>
    setSnack?: (message: string, severity?: AlertColor) => void
    load?: (fun: () => Promise<any>, message: string) => Promise<void>
}

export interface User {
    address: string;
    name?: string;
    avatar?: string;
}
