import Image from "next/image";
import Link from "next/link";
import { links } from "../idk/config";
import { etherscan, github, twitter } from "../idk/images";

export default function Footer() {
  return (
    <footer className="mt-auto bg-emerald-200 flex flex-col items-center p-10">
      <div className="flex space-x-10 my-4">
        <a className="w-10 h-10 relative" href={links.twitter}>
          <Image src={twitter} alt="" layout="fill" className=""></Image>
        </a>
        <div className="w-10 h-10 relative ">
          <Image src={etherscan} alt="" layout="fill" className=""></Image>
        </div>
        <div className="w-10 h-10 relative ">
          <Image src={github} alt="" layout="fill" className=""></Image>
        </div>
      </div>

      <h2 className=" ">
        <Link href="/">Ethereum Donations</Link>{" "}
      </h2>
    </footer>
  );
}
