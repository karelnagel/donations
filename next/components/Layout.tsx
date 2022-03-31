import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
