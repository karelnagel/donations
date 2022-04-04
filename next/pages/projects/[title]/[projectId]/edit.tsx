import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../../../components/EditPage";

const EditProject: NextPage = () => {
  const {
    query: { title, projectId },
  } = useRouter();

  return <EditPage title={title?.toString()} projectId={projectId?.toString()} type={Type.EDIT_PROJECT} topText="Edit project" buttonText="Edit" />;
};

export default EditProject;
