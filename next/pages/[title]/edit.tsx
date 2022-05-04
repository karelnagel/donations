import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../components/EditPage";

const EditProject: NextPage = () => {
  const {
    query: { title },
  } = useRouter();

  return <EditPage title={title?.toString()} type={Type.EDIT_COLLECTION} topText="Edit project" buttonText="Edit" />;
};

export default EditProject;
