import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import Web3Modal from "web3modal";

import { Context } from "../idk/context";
import { useContext } from "react";

import { getENS } from "../lib/ethers";
import { network } from "../config";

export default function useWeb3Modal() {
    const { provider, setProvider, setUser } = useContext(Context);
    const [autoLoaded, setAutoLoaded] = useState(false);
    const [web3Modal, setWeb3Modal] = useState<Web3Modal>()

    useEffect(() => {
        setWeb3Modal(new Web3Modal({
            network: network.name,
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
                        // rpc: {
                        //     137: "https://polygon-mainnet.infura.io/v3/1fa1025d0ae7412f93785bb01b7bc589",
                        // },
                        // network: "matic"
                    }
                }
            }
        }))
    }, [])

    const loadWeb3Modal = useCallback(async () => {
        const newProvider = new Web3Provider(await web3Modal!.connect());
        setProvider!(newProvider);
        const address = await newProvider.getSigner().getAddress()
        const {name,avatar} = await getENS(address);
        setUser!({ address,name ,avatar })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3Modal]);

    const logoutOfWeb3Modal = useCallback(
        async function () {
            web3Modal!.clearCachedProvider();
            setProvider!(undefined)
            setUser!(undefined)
            // window.location.reload();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [web3Modal]
    );

    useEffect(() => {
        if (!autoLoaded && web3Modal && web3Modal!.cachedProvider) {
            loadWeb3Modal();
            setAutoLoaded(true);
        }
    }, [autoLoaded, loadWeb3Modal, web3Modal]);


    return { loadWeb3Modal, logoutOfWeb3Modal };
}

