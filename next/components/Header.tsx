import Link from "next/link";
import React, { useContext } from "react";
import { short } from "../idk/helpers";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Context } from "../idk/context";

export default function Header() {
  const { loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const { user } = useContext(Context);

  return (
      <header className="w-full shadow-md hover:bg-gray-50 duration-300">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2 ">
          <h3 className="font-bold text-2xl text-primary text hover:text-primaryDark duration-300">
            <Link href={"/"}>Donations</Link>
          </h3>
          <div className="bg-primary flex px-1 items-center rounded-3xl hover:bg-primaryDark shadow-xl duration-300 text-white font-bold h-12 cursor-pointer">
            <div className="mx-4" onClick={() => (user ? logoutOfWeb3Modal() : loadWeb3Modal())}>
              {user ? user.name ?? short(user.address) : "Connect Wallet"}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {user?.avatar && <img src={user.avatar} className="rounded-full h-10 w-10 object-cover " alt="" />}
          </div>
        </div>
      </header>
  );
}
