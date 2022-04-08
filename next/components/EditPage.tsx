import React, { createRef, useContext, useEffect, useState } from "react";
import { Contract, ContractDocument, ContractListDocument, ContractListQueryResult, ContractQueryResult } from "../graphql/generated";
import { defaultProjectInfo, ProjectInfo } from "../interfaces/ProjectInfo";
import useSigning from "../hooks/useSigning";
import useChain from "../hooks/useChain";
import { apolloRequest } from "../idk/apollo";
import { getProjectInfo } from "../lib/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "./Layout";
import { MenuItem } from "@mui/material";
import { coins } from "../idk/config";
import { Context } from "../idk/context";
import { useRouter } from "next/router";

export enum Type {
  NEW_CONTRACT,
  NEW_PROJECT,
  EDIT_PROJECT,
}
const EditPage = ({
  title,
  projectId,
  type,
  topText,
  buttonText,
}: {
  topText: string;
  buttonText: string;
  title?: string;
  projectId?: string;
  type: Type;
}) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState<number>();
  const [titles, setTitles] = useState<string[]>();
  const [contract, setContract] = useState<Contract>();
  const [coin, setCoin] = useState("");
  const [owner, setOwner] = useState("");
  const fileInput = createRef<HTMLInputElement>();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(defaultProjectInfo);
  const { newProject, newContract } = useChain({ contractAddress: contract?.address });
  const { uploadData } = useSigning();
  const { user, setSnack, load } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const effect = async () => {
      if (type === Type.NEW_CONTRACT) {
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
        //get ProjectInfo and fill all the inputs with the data
        if (title && projectId) {
          const proInfo = await getProjectInfo(title, projectId);
          console.log({ title, proInfo, projectId });

          if (proInfo) setProjectInfo({ ...proInfo, donationOptions: proInfo.donationOptions ?? ["5", "10", "15"] });
          setCurrentProjectId(Number(projectId));
          setCurrentTitle(title);
        }
      }
    };
    effect();
  }, [projectId, title, type]);
  const newPro = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      if (!currentProjectId || !currentTitle) return setSnack!("no data");
      if (titles?.includes(currentTitle)) return setSnack!("title exists ");
      const file = fileInput.current?.files![0];
      if (type !== Type.EDIT_PROJECT && !file) return setSnack!("no image");

      const result = await uploadData(currentTitle, currentProjectId.toString(), projectInfo, file);
      if (!result) return setSnack!("error uploading data");
      const projectOwner = owner ? owner : user?.address!;
      if (type === Type.NEW_PROJECT) {
        const error = await newProject(coin, projectOwner);
        if (error) return setSnack!(error);
      } else if (type === Type.NEW_CONTRACT) {
        const error = await newContract(currentTitle, coin, projectOwner);
        if (error) return setSnack!(error);
      }

      setSnack!("Success", "success");
    }, "Editing project! \nPlease continue to your wallet  ");
    router.push(`/projects/${currentTitle}/${currentProjectId}`);
  };

  return (
    <Layout>
      <div className="max-w-screen-md m-auto text-center">
        <h2 className="m-10 text-xl uppercase font-bold">{topText}</h2>
        {!user ? (
          <p>Connect wallet to edit project</p>
        ) : (
          <form onSubmit={newPro}>
            <div className="flex-col flex  px-2 space-y-2 text-left">
              {type === Type.NEW_CONTRACT && (
                <TextField
                  type="text"
                  label="Project title"
                  error={titles?.includes(currentTitle)}
                  helperText={titles?.includes(currentTitle) ? "Title already exists, try another one!" : null}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  required
                />
              )}
              {type !== Type.EDIT_PROJECT && (
                <>
                  <TextField
                    id="select"
                    label="Which ERC20 coin you want to use?"
                    value={coin}
                    select
                    onChange={(e) => setCoin(e.target.value)}
                    required
                  >
                    {coins.map((c, i) => (
                      <MenuItem key={i} value={c.address}>
                        {c.coin}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField type="text" label="Project owner (leave empty if its you)" onChange={(e) => setOwner(e.target.value)} />
                </>
              )}
              <input type="file" ref={fileInput} className="" />
              <TextField
                type="text"
                label="Project name"
                value={projectInfo.name}
                onChange={(e) => setProjectInfo((p) => ({ ...p, name: e.target.value }))}
              />
              <TextField
                type="text"
                label="Project description"
                value={projectInfo.description}
                onChange={(e) => setProjectInfo((p) => ({ ...p, description: e.target.value }))}
              />
              <TextField
                type="number"
                label="Project goal"
                value={projectInfo.goal}
                onChange={(e) => setProjectInfo((p) => ({ ...p, goal: e.target.value }))}
              />
              <TextField
                type="text"
                label="URL to your page "
                value={projectInfo.external_url}
                onChange={(e) => setProjectInfo((p) => ({ ...p, external_url: e.target.value }))}
              />
              <p>Social media links</p>
              <div className="flex space-x-2">
                <TextField
                  type="text"
                  label="Twitter"
                  value={projectInfo.socials.twitter}
                  onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, twitter: e.target.value } }))}
                />
                <TextField
                  type="text"
                  label="Instagram"
                  value={projectInfo.socials.instagram}
                  onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, instagram: e.target.value } }))}
                />
                <TextField
                  type="text"
                  label="Youtube"
                  value={projectInfo.socials.youtube}
                  onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, youtube: e.target.value } }))}
                />
                <TextField
                  type="text"
                  label="Facebook"
                  value={projectInfo.socials.facebook}
                  onChange={(e) => setProjectInfo((p) => ({ ...p, socials: { ...p.socials, facebook: e.target.value } }))}
                />
              </div>
              <p>Donation options</p>
              <div className="flex space-x-2 justify-between">
                {projectInfo.donationOptions &&
                  projectInfo.donationOptions.map((d, i) => (
                    <TextField
                      key={i}
                      type="number"
                      label={`Option ${i + 1}`}
                      value={d}
                      required
                      onChange={(e) =>
                        setProjectInfo((p) => ({ ...p, donationOptions: [...p.donationOptions.map((d2, i2) => (i2 === i ? e.target.value : d2))] }))
                      }
                    />
                  ))}
              </div>
            </div>
            <br />
            <Button type="submit" variant="contained">
              {buttonText}
            </Button>
            <br />
            <br />
            <Button onClick={router.back} variant="outlined">
              Back
            </Button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditPage;
