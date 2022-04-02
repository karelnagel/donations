import React from "react";
import useENS from "../hooks/useENS";

export function AccountObject({ account }: { account: string }) {
  const { name } = useENS(account);

  return (
    <div className="box">
      <h2>{name}</h2>
    </div>
  );
}
