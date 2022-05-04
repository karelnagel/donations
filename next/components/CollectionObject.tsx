import { useRouter } from "next/router";
import React from "react";
import { getImage } from "../idk/helpers";
import { AccountObject } from "./AccountObject";
import { ProgresssBar } from "./ProgressBar";
import Image from "next/image";
import { Collection } from "../graphql/generated";

export function CollectionObject({ collection }: { collection?: Collection }) {
  const router = useRouter();

  return collection ? (
    <div className="shadow-md p-4 rounded-lg cursor-pointer shadow-primary bg-project bg-cover" onClick={() => router.push(`/${collection.id}`)}>
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

        <div className="text-right flex flex-col justify-evenly">
          <h2 className="font-bold mb-2">{collection.name}</h2>
          <AccountObject account={collection.owner?.id!} />
        </div>
      </div>
      <ProgresssBar collection={collection} />
    </div>
  ) : (
    <div></div>
  );
}
