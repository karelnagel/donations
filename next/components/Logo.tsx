import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" passHref>
      <h3 className="uppercase text-black font-extrabold  text-2xl hover:scale-110 duration-200 cursor-pointer">
        Strea<span className="text-primary">mint</span>
      </h3>
    </Link>
  );
}
