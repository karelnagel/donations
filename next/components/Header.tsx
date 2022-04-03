import Link from "next/link";
import React, { useContext } from "react";
import { short } from "../idk/helpers";
import useENS from "../hooks/useENS";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Context } from "../idk/context";

export default function Header() {
  const { loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const { user } = useContext(Context);

  return (
    <header>
      <h2>
        <Link href={"/"}>Ethereum donations</Link>
      </h2>
      <button onClick={() => (user ? logoutOfWeb3Modal() : loadWeb3Modal())}>{user ? user.name ?? short(user.address) : "Connect Wallet"}</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user?.avatar} height={60} alt="" />
    </header>
  );
}
