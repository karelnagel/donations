import { createRef, useState } from "react";
import Layout from "../components/Layout";
import { useContractListQuery } from "../graphql/generated";
import useContract from "../hooks/useContract";
import useSigning from "../hooks/useSigning";
import { defaultProjectInfo, ProjectInfo } from "../interfaces/ProjectInfo";

export default function New() {
  const { data } = useContractListQuery();
  const { newContract } = useContract({});
  const [title, setTitle] = useState("");
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");

  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(defaultProjectInfo);
  const fileInput = createRef<HTMLInputElement>();
  const { uploadData } = useSigning();

  const newCon = async (e: any) => {
    e.preventDefault();

    if (!data) return;
    if (!fileInput.current?.files![0]) return console.log("no image");

    const error = await newContract(title, coin, owner);
    if (error) return console.log(error);

    const upload = await uploadData(title, "1", projectInfo, fileInput.current.files[0]);
    if (!upload) return console.log("Error uploading data");

    console.log("success");
  };
  return (
    <Layout>
      <div>
        <h2>Create new contract</h2>
        <form action="">
          <input type="text" placeholder="title" onChange={(e) => setTitle(e.currentTarget.value)} required />
          <input type="text" placeholder="coin" onChange={(e) => setCoin(e.currentTarget.value)} required />
          <input type="text" placeholder="projectOwner" onChange={(e) => setOwner(e.currentTarget.value)} required />
          <br />
          <input type="file" ref={fileInput} />
          <input type="text" placeholder="name" onChange={(e) => setProjectInfo((p) => ({ ...p, name: e.target.value }))} />
          <input type="text" placeholder="description" onChange={(e) => setProjectInfo((p) => ({ ...p, description: e.target.value }))} />
          <input type="number" placeholder="goal" onChange={(e) => setProjectInfo((p) => ({ ...p, goal: e.target.value }))} />
          <input type="text" placeholder="url" onChange={(e) => setProjectInfo((p) => ({ ...p, external_url: e.target.value }))} />
          <input
            type="text"
            placeholder="twitter"
            onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, twitter: e.target.value } }))}
          />
          <button type="submit" onClick={newCon}>
            New contract
          </button>
        </form>
      </div>
    </Layout>
  );
}
