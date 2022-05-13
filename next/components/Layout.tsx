import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className, noMargin }: { children: any; className?: string; noMargin?: boolean }) {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-tl from-background to-blue-900">
        <Header />
        <div className={className + ` ${noMargin ? "" : "mt-32 pb-20"}`}>{children}</div>
        <Footer />
    </main>
  );
}
