import Image from "next/image";
import Link from "next/link";
import { links } from "../config";

export default function Footer() {
  return (
    <footer className="mt-auto bg-emerald-200 flex flex-col items-center p-10">
      <div className="flex space-x-10 my-4">
        {links.map((l, i) => (
          <a key={i} className="w-10 h-10 relative" href={l.link}>
            <Image src={l.image} alt="" layout="fill" className=""></Image>
          </a>
        ))}
      </div>

      <h2 className="logo">
        <Link href="/">Streamint</Link>{" "}
      </h2>
    </footer>
  );
}
