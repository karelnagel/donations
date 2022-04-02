import { useState } from "react";
import Layout from "../components/Layout";
import useContract from "../hooks/useContract";

export default function New() {
  const { newContract } = useContract();
  const [title, setTitle] = useState("");
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");

  const newCon = async (e: any) => {
    e.preventDefault();
    await newContract(title, coin, owner);
  };
  return (
    <Layout>
      <div>
        <h2>Create new contract</h2>
        <form action="">
          <input type="text" placeholder="title" onChange={(e) => setTitle(e.currentTarget.value)} required />
          <input type="text" placeholder="coin" onChange={(e) => setCoin(e.currentTarget.value)} required />
          <input type="text" placeholder="projectOwner" onChange={(e) => setOwner(e.currentTarget.value)} required />
          <button type="submit" onClick={newCon}>
            New contract
          </button>
        </form>
      </div>
    </Layout>
  );
}
