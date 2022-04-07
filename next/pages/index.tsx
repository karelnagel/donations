import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout className="flex flex-col items-center space-y-4 m-10">
      <h4>
        <Link href={"/projects"} passHref>
          <Button variant="contained">Latest projects</Button>
        </Link>
      </h4>
      <h4>
        <Link href={"/new"} passHref>
          <Button variant="contained">New project</Button>
        </Link>
      </h4>
    </Layout>
  );
};

export default Home;
