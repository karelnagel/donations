import React from "react";
import { network } from "../config";
import Logo from "./Logo";
import { useConnect, useDisconnect, useAccount, useNetwork, useEnsName, useEnsAvatar } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  const { connect, connectors, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();
  const { data: name } = useEnsName({ address: account?.address });
  const { data: avatar } = useEnsAvatar({ addressOrName: account?.address });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="absolute top-0 z-20 w-full">
      {account && network.chainId !== activeChain?.id && (
        <div
          onClick={() => switchNetwork!(network.chainId)}
          className="cursor-pointer w-full py-2 bg-primary text-center text-white font-bold absolute"
        >
          Wrong network! Click to switch to {network.name}
        </div>
      )}
      <header className="w-full mt-10">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2">
          <Logo />
          <ConnectButton  showBalance={false} />
        </div>
      </header>
    </div>
  );
}
