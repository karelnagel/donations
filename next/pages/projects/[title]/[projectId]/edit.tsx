import React from "react";
import { NextPage } from "next";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../../../components/EditPage";

const EditProject: NextPage = () => {
  const {
    query: { title, projectId },
  } = useRouter();

  return (
    <>
      <Layout>
        <div>
          <h2>Edit project</h2>
          <EditPage title={title?.toString()} projectId={projectId?.toString()} type={Type.EDIT_PROJECT} />
        </div>
      </Layout>
    </>
  );
};

export default EditProject;
