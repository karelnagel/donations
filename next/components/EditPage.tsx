import React, { createRef, useContext, useEffect, useState } from "react";
import useChain from "../hooks/useChain";
import TextField from "@mui/material/TextField";
import Layout from "./Layout";
import { MenuItem } from "@mui/material";
import { Context } from "../idk/context";
import { useRouter } from "next/router";
import { getProjectId, sameAddr, toCoin, toWeiStr } from "../idk/helpers";
import { Project, useCollectionLazyQuery, useCollectionListLazyQuery, useProjectLazyQuery } from "../graphql/generated";
import { ipfsUpload } from "../lib/ipfs";
import { network } from "../config";
import Button from "./Button";

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
  const router = useRouter();

  const fileInput = createRef<HTMLInputElement>();
  const [getTitles, titles] = useCollectionListLazyQuery();
  const [getCollection, collection] = useCollectionLazyQuery({ variables: { id: title } });
  const [getSavedProject, savedProject] = useProjectLazyQuery({ variables: { id: getProjectId(title!, projectId!) } });
  const [project, setProject] = useState<Project>({
    coin: "select",
    name: "",
    description: "",
    owner: "",
    goal: "",
    url: "",
    socials: ["", "", "", ""],
    donationOptions: ["", "", ""],
  } as Project);
  const [newTitle, setNewTitle] = useState("");

  const { newProject, newCollection, setIPFS } = useChain({ contractAddress: collection.data?.collection?.address });
  const { user, setSnack, load } = useContext(Context);

  useEffect(() => {
    if (type === Type.NEW_CONTRACT) {
      getTitles();
    } else if (title) {
      getCollection();

      if (type === Type.EDIT_PROJECT && projectId) {
        getSavedProject();
      }
    }
  }, [type, title, projectId, getCollection, getSavedProject, getTitles]);

  useEffect(() => {
    const pro = savedProject.data?.project;

    if (pro)
      setProject({
        ...(pro as Project),
        donationOptions: [pro.donationOptions[0] ?? "0", pro.donationOptions[1] ?? "0", pro.donationOptions[2] ?? "0"],
        socials: [pro.socials[0] ?? "", pro.socials[1] ?? "", pro.socials[2] ?? "", pro.socials[3] ?? ""],
      });
  }, [savedProject.data?.project]);

  const newPro = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      if (!user) return setSnack!("User not logged in");
      if (titles.data?.collections.find((c) => c.id === newTitle)) return setSnack!("title exists ");
      if (collection.data?.collection && !sameAddr(collection.data?.collection?.owner, user?.address)) return setSnack!("Not collection owner ");

      const file = fileInput.current?.files![0];
      if (type !== Type.EDIT_PROJECT && !file) return setSnack!("no image");

      const ipfsHash = await ipfsUpload(project, file);
      if (!ipfsHash) return setSnack!("error uploading to ipfs");

      const projectOwner = project.owner ? project.owner : user.address;
      if (type === Type.NEW_CONTRACT) {
        const error = await newCollection(newTitle, project.coin, projectOwner, ipfsHash);
        if (error) return setSnack!(error);
      } else if (type === Type.NEW_PROJECT) {
        const error = await newProject(project.coin, projectOwner, ipfsHash);
        if (error) return setSnack!(error);
      } else if (type === Type.EDIT_PROJECT) {
        const error = await setIPFS(Number(projectId!), ipfsHash);
        if (error) return setSnack!(error);
      }

      setSnack!("Success", "success");
      router.push(`/projects/${title ?? newTitle}/${projectId ?? (collection.data?.collection?.projectsCount ?? 0) + 1}`);
    }, "Editing project! \nPlease continue to your wallet  ");
  };

  if (!user) return <Layout>Connect wallet to edit project</Layout>;
  else if (collection.data?.collection && !sameAddr(collection.data.collection.owner, user.address)) return <Layout>Not owner</Layout>;
  return (
    <Layout>
      <div className="max-w-screen-md m-auto text-center">
        <h2 className="m-10 text-3xl font-bold">{topText}</h2>
        <form onSubmit={newPro}>
          <div className="flex-col flex  px-2 space-y-2 text-left">
            {type === Type.NEW_CONTRACT && (
              <TextField
                type="text"
                label="Project title"
                error={!!titles.data?.collections.find((c) => c.id === newTitle)}
                helperText={!!titles.data?.collections.find((c) => c.id === newTitle) ? "Title already exists, try another one!" : null}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            )}
            {type !== Type.EDIT_PROJECT && (
              <>
                <TextField
                  id="select"
                  label="Which ERC20 coin you want to use?"
                  select
                  onChange={(e) => setProject((p) => ({ ...p, coin: e.target.value }))}
                  required
                  value={project.coin}
                >
                  {network.coins.map((c, i) => (
                    <MenuItem key={i} value={c.address}>
                      {c.coin}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="text"
                  label="Project beneficiary (leave empty if its you)"
                  value={project.owner}
                  onChange={(e) => setProject((p) => ({ ...p, owner: e.target.value }))}
                />
              </>
            )}
            <input type="file" ref={fileInput} className="" />
            <TextField type="text" label="Project name" value={project.name} onChange={(e) => setProject((p) => ({ ...p, name: e.target.value }))} />
            <TextField
              type="text"
              label="Project description"
              value={project.description}
              onChange={(e) => setProject((p) => ({ ...p, description: e.target.value }))}
            />
            <TextField
              type="number"
              inputProps={{ step: "any" }}
              label="Project goal"
              value={toCoin(project.goal, project.coin)}
              onChange={(e) => setProject((p) => ({ ...p, goal: toWeiStr(e.target.value, project.coin) }))}
            />
            <TextField
              type="text"
              label="URL to your page "
              value={project.url}
              onChange={(e) => setProject((p) => ({ ...p, url: e.target.value }))}
            />
            <p>Social media links</p>
            <div className="flex space-x-2 justify-between">
              {project.socials &&
                project.socials.map((s, i) => (
                  <TextField
                    key={i}
                    type="text"
                    label={i == 0 ? "Youtube" : i == 1 ? "Facebook" : i == 2 ? "Twitter" : "Instagram"}
                    value={s}
                    onChange={(e) => setProject((p) => ({ ...p, socials: [...p.socials.map((s2, i2) => (i2 === i ? e.target.value : s2))] }))}
                  />
                ))}
            </div>
            <p>Donation options</p>
            <div className="flex space-x-2 justify-between">
              {project.donationOptions &&
                project.donationOptions.map((d, i) => (
                  <TextField
                    key={i}
                    type="number"
                    inputProps={{ step: "any" }}
                    label={`Option ${i + 1}`}
                    value={toCoin(d, project.coin)}
                    required
                    onChange={(e) =>
                      setProject((p) => ({
                        ...p,
                        donationOptions: [...p.donationOptions.map((d2, i2) => (i2 === i ? toWeiStr(e.target.value, project.coin) : d2))],
                      }))
                    }
                  />
                ))}
            </div>
          </div>
          <br />
          <Button submit>{buttonText}</Button>
          <br />
          <br />
          <Button onClick={router.back} secondary>
            Back
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPage;
