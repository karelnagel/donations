import React from "react";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import { sameAddr } from "../idk/helpers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { networks } from "../config";

export default function CheckNetwork({ children }: { children: any }) {
  const { network } = useRouter().query;
  const { activeChain: chain, switchNetwork } = useNetwork();
  const { data: account } = useAccount();

  if (!account)
    return (
      <div className="flex flex-col items-center space-y-4 text-lg font-bold">
        <p>Please connect your wallet!</p>
        <ConnectButton />
      </div>
    );
  if (network && !sameAddr(network?.toString(), chain?.name))
    return (
      <div className="flex flex-col items-center space-y-4 text-lg font-bold">
        <p>Connect your wallet to {network} network!</p>
        <Button onClick={() => switchNetwork!(networks.find((n) => sameAddr(n.chain.name, network.toString()))?.chain.id)}>
          Switch to {network}
        </Button>
      </div>
    );
  return children;
}
