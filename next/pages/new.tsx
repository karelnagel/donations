import { createRef, useState } from "react";
import Layout from "../components/Layout";
import { useContractListQuery } from "../graphql/generated";
import useContract from "../hooks/useContract";
import useSigning from "../hooks/useSigning";
import { ContractInfo, ContractInfoTypes, defaultContractInfo } from "../interfaces/ContractInfo";
import axios from "axios";
import { uploadImage } from "../lib/storage";
import { defaultProjectInfo, ProjectInfo } from "../interfaces/ProjectInfo";

export default function New() {
  const { data } = useContractListQuery();
  const { newContract } = useContract({});
  const [title, setTitle] = useState("");
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");

  const [contractInfo, setContractInfo] = useState<ContractInfo>(defaultContractInfo);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(defaultProjectInfo);
  const fileInput = createRef<HTMLInputElement>();
  const fileInput2 = createRef<HTMLInputElement>();
  const { sign } = useSigning();

  const newCon = async (e: any) => {
    e.preventDefault();

    if (!data) return;
    if (!fileInput.current?.files![0]) return console.log("no image");
    if (!fileInput2.current?.files![0]) return console.log("no image");

    if (data.contracts.find((c) => c.id === title)) return console.log("title already exists");

    const imageResult = uploadImage(`images/${title}/contract`, fileInput.current.files[0]); // Todo to api
    if (!imageResult) return console.log("could not upload image");

    const imageResult2 = uploadImage(`images/${title}/1`, fileInput2.current.files[0]); // Todo to api
    if (!imageResult2) return console.log("could not upload image");

    const signature = await sign(ContractInfoTypes, contractInfo);
    if (!signature) return console.log("no signature");

    const result = await axios.post(`/api/contracts/new/`, { title, contractInfo, signature, projectInfo });
    if (result.status !== 200) return console.log("error sending data");

    const error = await newContract(title, coin, owner);
    if (error) return console.log(error);
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
          <input type="text" placeholder="name" onChange={(e) => setContractInfo((c) => ({ ...c, name: e.target.value }))} />
          <input type="text" placeholder="description" onChange={(e) => setContractInfo((c) => ({ ...c, description: e.target.value }))} />
          <input type="text" placeholder="url" onChange={(e) => setContractInfo((c) => ({ ...c, external_link: e.target.value }))} />
          <input
            type="number"
            placeholder="seller_fee_basis_points"
            onChange={(e) => setContractInfo((c) => ({ ...c, seller_fee_basis_points: e.target.value }))}
          />
          <input type="text" placeholder="fee_recipient" onChange={(e) => setContractInfo((c) => ({ ...c, fee_recipient: e.target.value }))} />

          <br />
          <input type="file" ref={fileInput2} />
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
