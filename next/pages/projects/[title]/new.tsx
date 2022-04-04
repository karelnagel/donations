import React from "react";
import { NextPage } from "next";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../../components/EditPage";

const NewProject: NextPage = () => {
  const {
    query: { title },
  } = useRouter();

  return (
    <>
      <Layout>
        <div>
          <h2>Start new project</h2>
          <EditPage title={title?.toString()}  type={Type.NEW_PROJECT} />
        </div>
      </Layout>
    </>
  );
};

export default NewProject;
