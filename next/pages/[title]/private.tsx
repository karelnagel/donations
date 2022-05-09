import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ProjectPrivate: NextPage = () => {
  const {
    query: { title },
  } = useRouter();

  return <div>Private</div>
};

export default ProjectPrivate;
