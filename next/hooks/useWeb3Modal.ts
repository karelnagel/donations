import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";

import { Context } from "../idk/context";
import { useContext } from "react";

import { getENS } from "../lib/ethers";
import { network } from "../config";

export default function useWeb3Modal() {
    const { setProvider, setUser, user } = useContext(Context);
    const [autoLoaded, setAutoLoaded] = useState(false);
    const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
    const [connection, setConnection] = useState<any>()

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

    useEffect(() => {
        const effect = async () => {
            if (user?.address) {
                const { name, avatar } = await getENS(user?.address!);
                setUser!(u => ({ ...u!, name, avatar }))
            }
        }
        effect()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.address, user?.chainId])

    useEffect(() => {
        if (connection && user) {
            connection.on("accountsChanged", (accounts: string[]) => {
                console.log(accounts[0]);
                setUser!(u => ({ chainId: u!.chainId, address: accounts[0] }))
            });

            connection.on("chainChanged", (chainId: any) => {
                console.log(Number(chainId));
                setUser!(u => ({ address: u!.address, chainId: Number(chainId) }))
            });

            connection.on("disconnect", (error: { code: number; message: string }) => {
                console.log("disc", error);
                logoutOfWeb3Modal()
            });
            return () => connection.removeAllListeners()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection, user])

    const loadWeb3Modal = useCallback(async () => {
        const conn = await web3Modal!.connect()
        setConnection(conn)

        const newProvider = new Web3Provider(conn);
        setProvider!(newProvider);

        const address = (await newProvider.listAccounts())[0]
        const chainId = (await newProvider.getNetwork()).chainId
        setUser!({ address, chainId })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3Modal]);

    const logoutOfWeb3Modal = useCallback(
        async function () {
            web3Modal!.clearCachedProvider();
            setProvider!(undefined)
            setUser!(undefined)
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

