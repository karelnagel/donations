import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className, noMargin }: { children: any; className?: string; noMargin?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-back bg-cover">
      <div className="">
        <Header />
        <main className={className + ` ${noMargin ? "" : "mt-32"}`}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
