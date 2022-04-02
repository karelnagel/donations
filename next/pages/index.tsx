import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h4>
        <Link href={"/projects"}>Latest projects</Link>
      </h4>
      <h4>
        <Link href={"/new"}>New project</Link>
      </h4>
    </Layout>
  );
};

export default Home;
