import { useContext, useEffect, useState } from "react";
import useChain from "./useChain";
import { ethers } from "ethers"
import { Context } from "../idk/context";

export default function useBalance(coinAddress?: string) {
    const { user } = useContext(Context)
    const [balance, setBalance] = useState("0");
    const { getBalance } = useChain({ coinAddress })
    useEffect(() => {
        (async () => {
            if (coinAddress) {
                const result = await getBalance();
                setBalance(ethers.utils.formatEther(result));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinAddress, user]);
    return { balance }
}