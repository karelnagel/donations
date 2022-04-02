import React from "react";
import { Token } from "../graphql/generated";
import { AccountObject } from "./AccountObject";

export function TokenObject({ token }: { token: Token }) {
  return (
    <div className="box">
      <h2>amount: {token.amount}</h2>
      <h2>message: {token.message}</h2>
      <AccountObject account={token.owner.id} />
    </div>
  );
}
