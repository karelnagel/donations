import React from "react";
import { sameAddr } from "../idk/helpers";
import CheckNetwork from "./CheckNetwork";
import { useAccount } from "wagmi";

export default function CheckOwner({ children, owner, message }: { children: any; owner?: string; message?: string }) {
  const { data: account } = useAccount();
  if (owner && !sameAddr(account?.address, owner)) return <p>{message ?? ""}</p>;
  return <CheckNetwork>{children}</CheckNetwork>;
}
