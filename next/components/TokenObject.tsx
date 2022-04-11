import Link from "next/link";
import React from "react";
import { Token } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";

export function TokenObject({ token }: { token: Token }) {
  return (
    <div className="w-full p-4 shadow-lg text-center rounded-lg cursor-pointer">
      <Link href={`/projects/${token.project.contract.id}/${token.project.count}`} passHref>
        <p>
          Donated {toCoin(token.amount)} {coinName(token.project.coin)} to {token.project.contract.id}, with message {`"${token.message}"`}
        </p>
      </Link>
    </div>
  );
}
