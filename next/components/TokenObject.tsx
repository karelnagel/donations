import Link from "next/link";
import React from "react";
import { Donation } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";

export function TokenObject({ token }: { token: Donation }) {
  return (
    <div className="w-full p-4 shadow-lg text-center rounded-lg cursor-pointer">
      <Link href={`/projects/${token.project.collection.id}/${token.project.index}`} passHref>
        <p>
          Donated {toCoin(token.amount,token.project.coin)} {coinName(token.project.coin)} to {token.project.name}, with message {`"${token.message}"`}
        </p>
      </Link>
    </div>
  );
}
