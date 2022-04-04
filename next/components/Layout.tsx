import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
const Header = dynamic(() => import("./Header"));

export default function Layout({ children }: { children: any }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
