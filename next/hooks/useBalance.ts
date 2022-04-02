import { useContext, useEffect, useState } from "react";
import useContract from "./useContract";
import { ethers } from "ethers"
import { Context } from "../interfaces/context";

export default function useBalance(coinAddress?: string) {
    const { user } = useContext(Context)
    const [balance, setBalance] = useState(ethers.BigNumber.from(0));
    const { getBalance } = useContract({ coinAddress })
    useEffect(() => {
        (async () => {
            if (coinAddress) {
                const result = await getBalance();

                setBalance(result);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinAddress, user]);
    return { balance }
}