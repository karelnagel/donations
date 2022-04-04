import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import EditPage, { Type } from "../../../components/EditPage";

const NewProject: NextPage = () => {
  const {
    query: { title },
  } = useRouter();

  return <EditPage title={title?.toString()} type={Type.NEW_PROJECT} topText="Start new project" buttonText="Start project" />;
};

export default NewProject;
