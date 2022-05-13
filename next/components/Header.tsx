import React from "react";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {

  return (
    <div className="absolute top-0 z-20 w-full">
      <header className="w-full mt-10">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2">
          <Logo />
          <ConnectButton  showBalance={false} />
        </div>
      </header>
    </div>
  );
}
