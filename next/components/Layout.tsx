import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
import Header from "./Header"

export default function Layout({ children,className }: { children: any,className?:string }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </div>
  );
}
