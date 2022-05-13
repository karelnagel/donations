import React from "react";
import { useRouter } from "next/router";
import { useAccount, useNetwork } from "wagmi";
import { sameAddr } from "../idk/helpers";

export default function CheckNetwork({ children }: { children: any }) {
  const { network } = useRouter().query;
  const { activeChain: chain } = useNetwork();
  const { data: account } = useAccount();

  if (!account) return <p>Please connect your wallet!</p>;
  if (network && !sameAddr(network?.toString(), chain?.name)) return <p>Connect your wallet to {network} network!</p>;
  return children;
}
