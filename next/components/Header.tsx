import Link from "next/link";
import React, { useContext } from "react";
import useENS from "../hooks/useENS";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Context } from "../interfaces/context";

export default function Header() {
  const { loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const { user } = useContext(Context);
  const { name } = useENS(user?.address);

  return (
    <header>
      <h2>
        <Link href={"/"}>Ethereum donations</Link>
      </h2>
      <button onClick={() => (user ? logoutOfWeb3Modal() : loadWeb3Modal())}>{user ? name : "Connect Wallet"}</button>
    </header>
  );
}
