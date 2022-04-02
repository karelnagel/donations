import React from "react";
import useENS from "../hooks/useENS";
import Image from "next/image";

export function AccountObject({ account }: { account: string }) {
  const { name, avatar } = useENS(account);

  return (
    <div className="box">
      <h2>{name}</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {avatar && <img alt="account" src={avatar} width={100} height={100}></img>}
    </div>
  );
}
