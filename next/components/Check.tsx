import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import { sameAddr } from "../idk/helpers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { networks } from "../config";

export default function Check({ children, owner, message }: { children: any; owner?: string; message?: boolean }) {
  const { network } = useRouter().query;
  const { activeChain: chain, switchNetwork } = useNetwork();
  const { data: account } = useAccount();
  const [error, setError] = useState<"connection" | "network" | "owner">();

  useEffect(() => {
    if (!account) setError("connection");
    else if (network && !sameAddr(network?.toString(), chain?.name)) setError("network");
    else if (owner && !sameAddr(account?.address, owner)) setError("owner");
    else setError(undefined);
  }, [account, chain?.name, network, owner]);

  return !error ? (
    children
  ) : (
    <div className="flex flex-col items-center space-y-4 text-lg font-bold">
      {error === "connection" && (
        <>
          <p>Please connect your wallet!</p>
          <ConnectButton />
        </>
      )}
      {error === "network" && (
        <>
          <p>Connect your wallet to {network} network!</p>
          <Button onClick={() => switchNetwork!(networks.find((n) => sameAddr(n.chain.name, network?.toString()))?.chain.id)}>
            Switch to {network}
          </Button>
        </>
      )}
      {error === "owner" && message && <>You are not the owner!</>}
    </div>
  );
}
