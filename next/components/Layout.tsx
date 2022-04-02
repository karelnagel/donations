import dynamic from "next/dynamic";
import React from "react";
import Footer from "./Footer";
const Header = dynamic(() => import('./Header'))

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
