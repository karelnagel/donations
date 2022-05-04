import React, { createRef, useContext, useEffect, useState } from "react";
import useChain from "../hooks/useChain";
import TextField from "@mui/material/TextField";
import Layout from "./Layout";
import { MenuItem } from "@mui/material";
import { Context } from "../idk/context";
import { useRouter } from "next/router";
import { sameAddr, toCoin, toWeiStr } from "../idk/helpers";
import { Collection, useCollectionLazyQuery, useCollectionListLazyQuery } from "../graphql/generated";
import { ipfsUpload } from "../lib/ipfs";
import { network } from "../config";
import Button from "./Button";

export enum Type {
  NEW_COLLECTION,
  EDIT_COLLECTION,
}
const EditPage = ({ title, type, topText, buttonText }: { topText: string; buttonText: string; title?: string; type: Type }) => {
  const router = useRouter();

  const fileInput = createRef<HTMLInputElement>();
  const [getTitles, titles] = useCollectionListLazyQuery();
  const [getSavedCollection, savedCollection] = useCollectionLazyQuery({ variables: { id: title } });
  const [collection, setCollection] = useState<Collection>({
    coin: "select",
    name: "",
    description: "",
    goal: "",
    url: "",
    socials: ["", "", "", ""],
    donationOptions: ["", "", ""],
  } as Collection);
  const [newTitle, setNewTitle] = useState("");

  const { newCollection, setIPFS } = useChain({ contractAddress: savedCollection.data?.collection?.address });
  const { user, setSnack, load } = useContext(Context);

  useEffect(() => {
    if (type === Type.NEW_COLLECTION) {
      getTitles();
    } else if (title) {
      getSavedCollection();
    }
  }, [type, title, getSavedCollection, getTitles]);

  useEffect(() => {
    const col = savedCollection.data?.collection;

    if (col)
      setCollection({
        ...(col as Collection),
        donationOptions: [col.donationOptions[0] ?? "0", col.donationOptions[1] ?? "0", col.donationOptions[2] ?? "0"],
        socials: [col.socials[0] ?? "", col.socials[1] ?? "", col.socials[2] ?? "", col.socials[3] ?? ""],
      });
  }, [savedCollection.data?.collection]);

  const newPro = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      if (!user) return setSnack!("User not logged in");
      if (titles.data?.collections.find((c) => c.id === newTitle)) return setSnack!("title exists ");
      if (savedCollection.data?.collection?.owner && !sameAddr(savedCollection.data.collection.owner.id, user?.address))
        return setSnack!("Not collection owner ");

      const file = fileInput.current?.files![0];
      if (type !== Type.EDIT_COLLECTION && !file) return setSnack!("no image");

      const ipfsHash = await ipfsUpload(collection, file);
      if (!ipfsHash) return setSnack!("error uploading to ipfs");

      if (type === Type.NEW_COLLECTION) {
        const error = await newCollection(newTitle, collection.coin, ipfsHash);
        if (error) return setSnack!(error);
      } else if (type === Type.EDIT_COLLECTION) {
        const error = await setIPFS(ipfsHash);
        if (error) return setSnack!(error);
      }

      setSnack!("Success", "success");
      router.push(`/${title ?? newTitle}`);
    }, "Editing project! \nPlease continue to your wallet  ");
  };

  if (!user) return <Layout>Connect wallet to edit project</Layout>;
  else if (savedCollection.data?.collection?.owner && !sameAddr(savedCollection.data.collection.owner.id, user.address))
    return <Layout>Not owner</Layout>;
  return (
    <Layout>
      <div className="max-w-screen-md m-auto text-center">
        <h2 className="m-10 text-3xl font-bold">{topText}</h2>
        <form onSubmit={newPro}>
          <div className="flex-col flex  px-2 space-y-2 text-left">
            {type === Type.NEW_COLLECTION && (
              <TextField
                type="text"
                label="Project title"
                error={!!titles.data?.collections.find((c) => c.id === newTitle)}
                helperText={!!titles.data?.collections.find((c) => c.id === newTitle) ? "Title already exists, try another one!" : null}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            )}
            {type !== Type.EDIT_COLLECTION && (
              <>
                <TextField
                  id="select"
                  label="Which ERC20 coin you want to use?"
                  select
                  onChange={(e) => setCollection((p) => ({ ...p, coin: e.target.value }))}
                  required
                  value={collection.coin}
                >
                  {network.coins.map((c, i) => (
                    <MenuItem key={i} value={c.address}>
                      {c.coin}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
            <input type="file" ref={fileInput} className="" />
            <TextField
              type="text"
              label="Project name"
              value={collection.name}
              onChange={(e) => setCollection((p) => ({ ...p, name: e.target.value }))}
            />
            <TextField
              type="text"
              label="Project description"
              value={collection.description}
              onChange={(e) => setCollection((p) => ({ ...p, description: e.target.value }))}
            />
            <TextField
              type="number"
              inputProps={{ step: "any" }}
              label="Project goal"
              value={toCoin(collection.goal, collection.coin)}
              onChange={(e) => setCollection((p) => ({ ...p, goal: toWeiStr(e.target.value, collection.coin) }))}
            />
            <TextField
              type="text"
              label="URL to your page "
              value={collection.url}
              onChange={(e) => setCollection((p) => ({ ...p, url: e.target.value }))}
            />
            <p>Social media links</p>
            <div className="flex space-x-2 justify-between">
              {collection.socials &&
                collection.socials.map((s, i) => (
                  <TextField
                    key={i}
                    type="text"
                    label={i == 0 ? "Youtube" : i == 1 ? "Facebook" : i == 2 ? "Twitter" : "Instagram"}
                    value={s}
                    onChange={(e) => setCollection((p) => ({ ...p, socials: [...p.socials.map((s2, i2) => (i2 === i ? e.target.value : s2))] }))}
                  />
                ))}
            </div>
            <p>Donation options</p>
            <div className="flex space-x-2 justify-between">
              {collection.donationOptions &&
                collection.donationOptions.map((d, i) => (
                  <TextField
                    key={i}
                    type="number"
                    inputProps={{ step: "any" }}
                    label={`Option ${i + 1}`}
                    value={toCoin(d, collection.coin)}
                    required
                    onChange={(e) =>
                      setCollection((p) => ({
                        ...p,
                        donationOptions: [...p.donationOptions.map((d2, i2) => (i2 === i ? toWeiStr(e.target.value, collection.coin) : d2))],
                      }))
                    }
                  />
                ))}
            </div>
          </div>
          <br />
          <Button submit>{buttonText}</Button>
        </form>
        <br />
        <Button onClick={router.back} secondary>
          Back
        </Button>
      </div>
    </Layout>
  );
};

export default EditPage;
