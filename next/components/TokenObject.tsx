import Link from "next/link";
import React from "react";
import { useNetwork } from "wagmi";
import { Donation } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";
import { collectionUrl } from "../idk/urls";

export function TokenObject({ token }: { token: Donation }) {
  const { activeChain: chain } = useNetwork();
  return (
    <div className="w-full p-4 shadow-md shadow-primary border-primary border-2 text-center rounded-lg cursor-pointer">
      <Link href={collectionUrl(token.collection.id, chain?.name)} passHref>
        <p>
          Donated {toCoin(token.amount, token.collection.coin.id)} {coinName(token.collection.coin.id)} to {token.collection.name}, with message{" "}
          {`"${token.message}"`}
        </p>
      </Link>
    </div>
  );
}
