import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
const Home: NextPage = () => {
  return (
    <Layout>
      <h4>
        <Button variant="contained" href={"/projects"}>
          Latest projects
        </Button>
      </h4>
      <h4>
        <Button variant="contained" href={"/new"}>
          New project
        </Button>
      </h4>
    </Layout>
  );
};

export default Home;
