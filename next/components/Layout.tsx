import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
const Header = dynamic(() => import("./Header"));

export default function Layout({ children,className }: { children: any,className?:string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </div>
  );
}
