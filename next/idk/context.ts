import { AlertColor } from "@mui/material";
import { createContext } from "react";

export const Context = createContext<ContextInterface>({
});

export interface ContextInterface {
    setSnack?: (message: string, severity?: AlertColor) => void
    load?: (fun: () => Promise<any>, message: string) => Promise<void>
}
