import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../../components/EditPage";

const EditProject: NextPage = () => {
  const { title } = useRouter().query;

  return <EditPage title={title?.toString()} type={Type.EDIT_COLLECTION} topText="Edit collection" buttonText="Edit collection" />;
};

export default EditProject;
