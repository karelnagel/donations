import React, { createRef, useEffect, useState } from "react";
import {
  Contract,
  ContractDocument,
  ContractListDocument,
  ContractListQueryResult,
  ContractQueryResult,
  useContractQuery,
} from "../graphql/generated";
import { defaultProjectInfo, ProjectInfo } from "../interfaces/ProjectInfo";
import useSigning from "../hooks/useSigning";
import useContract from "../hooks/useContract";
import { apolloRequest } from "../idk/apollo";
import { getProjectInfo } from "../lib/firestore";

export enum Type {
  NEW_CONTRACT,
  NEW_PROJECT,
  EDIT_PROJECT,
}
const EditPage = ({ title, projectId, type }: { title?: string; projectId?: string; type: Type }) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState<number>();
  const [titles, setTitles] = useState<string[]>();
  const [contract, setContract] = useState<Contract>();
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");
  const fileInput = createRef<HTMLInputElement>();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(defaultProjectInfo);
  const { newProject, newContract } = useContract({ contractAddress: contract?.address });
  const { uploadData } = useSigning();

  useEffect(() => {
    const effect = async () => {
      if (type === Type.NEW_CONTRACT) {
        console.log("asdfasdfasdfasdfasdf");
        // get all the titles and check names
        const contractQuery = await apolloRequest<ContractListQueryResult>(ContractListDocument);
        const contractTitles = contractQuery.data?.contracts.map((c) => c.id);
        setTitles(contractTitles);
        setCurrentProjectId(1);
      } else if (type === Type.NEW_PROJECT) {
        //get contracts latest project and projectId++
        if (title) {
          const contractQuery = await apolloRequest<ContractQueryResult>(ContractDocument, { id: title });
          const contr = contractQuery.data?.contract;
          if (contr) {
            setContract(contr as Contract);
            setCurrentProjectId(Number(contr.projects[0].count) + 1);
            setCurrentTitle(title);
          }
        }
      } else if (type === Type.EDIT_PROJECT) {
        console.log("asdasd");
        //get ProjectInfo and fill all the inputs with the data
        if (title && projectId) {
          const proInfo = await getProjectInfo(title, projectId);
          console.log({ title, proInfo, projectId });

          if (proInfo) setProjectInfo(proInfo);
          setCurrentProjectId(Number(projectId));
          setCurrentTitle(title);
        }
      }
    };
    effect();
  }, [projectId, title, type]);
  const newPro = async (e: any) => {
    e.preventDefault();

    if (!currentProjectId || !currentTitle) return console.log("no data");
    if (titles?.includes(currentTitle)) return console.log("title exists ");
    const file = fileInput.current?.files![0];
    if (type !== Type.EDIT_PROJECT && !file) return console.log("no image");

    if (type === Type.NEW_PROJECT) {
      const error = await newProject(coin, owner);
      if (error) return console.log(error);
    } else if (type === Type.NEW_CONTRACT) {
      const error = await newContract(currentTitle, coin, owner);
      if (error) return console.log(error);
    }

    const result = uploadData(currentTitle, currentProjectId.toString(), projectInfo, file);
    if (!result) return console.log("error uploading data");

    console.log("success");
  };

  return (
    <form action="">
      {type === Type.NEW_CONTRACT && (
        <>
          {titles?.includes(currentTitle) && <p>Title already exists</p>}
          <input type="text" placeholder="title" onChange={(e) => setCurrentTitle(e.target.value)} required />
        </>
      )}
      {type !== Type.EDIT_PROJECT && (
        <>
          <input type="text" placeholder="coin" onChange={(e) => setCoin(e.target.value)} required />
          <input type="text" placeholder="project owner" onChange={(e) => setOwner(e.target.value)} required />
        </>
      )}
      <br />

      <input type="file" ref={fileInput} />
      <input type="text" placeholder="name" value={projectInfo.name} onChange={(e) => setProjectInfo((p) => ({ ...p, name: e.target.value }))} />
      <input
        type="text"
        placeholder="description"
        value={projectInfo.description}
        onChange={(e) => setProjectInfo((p) => ({ ...p, description: e.target.value }))}
      />
      <input type="number" placeholder="goal" value={projectInfo.goal} onChange={(e) => setProjectInfo((p) => ({ ...p, goal: e.target.value }))} />
      <input
        type="text"
        placeholder="url"
        value={projectInfo.external_url}
        onChange={(e) => setProjectInfo((p) => ({ ...p, external_url: e.target.value }))}
      />
      <br />

      <input
        type="text"
        placeholder="twitter"
        onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, twitter: e.target.value } }))}
      />
      <br />

      <button type="submit" onClick={newPro}>
        Start project
      </button>
    </form>
  );
};

export default EditPage;
