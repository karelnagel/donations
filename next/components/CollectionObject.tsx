import { useRouter } from "next/router";
import React from "react";
import { getImage } from "../idk/helpers";
import { AccountObject } from "./AccountObject";
import { ProgresssBar } from "./ProgressBar";
import Image from "next/image";
import { Collection } from "../graphql/generated";
import { collectionUrl } from "../idk/urls";
import Link from "next/link";
import { useNetwork } from "wagmi";

export function CollectionObject({ collection, network }: { collection?: Collection; network?: string }) {
  const { activeChain: chain } = useNetwork();

  return collection ? (
    <Link href={collectionUrl(collection.id, network ?? chain?.name)} passHref>
      <div className="relative overflow-hidden shadow-md p-4 rounded-lg cursor-pointer shadow-primary bg-project bg-cover">
        <Image layout="fill" alt="" src={getImage(collection.background)} className="object-cover" />
        <div className="flex justify-between">
          <div className="w-20 h-20 relative">
            <Image
              placeholder="blur"
              blurDataURL="/favicon.png"
              src={getImage(collection.image)}
              alt=""
              className="object-cover rounded-lg flex-1"
              layout="fill"
            />
          </div>

          <div className="text-right flex flex-col justify-evenly z-10">
            <h2 className="font-bold mb-2">{collection.name}</h2>
            <AccountObject account={collection.owner?.id!} />
          </div>
        </div>
        <ProgresssBar collection={collection} />
      </div>
    </Link>
  ) : (
    <div></div>
  );
}
