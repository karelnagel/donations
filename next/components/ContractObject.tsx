import Link from "next/link";
import React from "react";
import Image from "next/image";
import Ethereum from "./../public/icons/ethereum.svg";

export function ContractObject({ title }: { title: string }) {
  return (
    <Link href={`/collections/${title}`}>
      <a>
        <div className="flex justify-end my-2 hover:text-primaryDark duration-300">
          <p className="uppercase font-bold">{title}</p>
          <div className="relative h-6 w-6">
            <Image alt={title} src={Ethereum} layout="fill" className=" " />
          </div>
        </div>
      </a>
    </Link>
  );
}
