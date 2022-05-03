import Image from "next/image";
import React from "react";
import { links } from "../config";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto bg-cover flex flex-col items-center p-20 backdrop-blur-xl bg-footer">
      <div className="flex space-x-10 my-4">
        {links.map((l, i) => (
          <a key={i} className="w-10 h-10 relative" href={l.link}>
            <Image src={l.image} alt="" layout="fill" className=""></Image>
          </a>
        ))}
      </div>

      <Logo />
    </footer>
  );
}
