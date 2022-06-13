import React, { createRef, useContext, useEffect, useState } from "react";
import useChain from "../hooks/useChain";
import TextField from "@mui/material/TextField";
import Layout from "./Layout";
import { MenuItem } from "@mui/material";
import { Context } from "../idk/context";
import { useRouter } from "next/router";
import { sameAddr, toCoin, toWeiStr } from "../idk/helpers";
import { Collection, useCollectionLazyQuery, useCollectionListLazyQuery } from "../graphql/generated";
import { collectionIpfsUpload } from "../lib/ipfs";
import Button from "./Button";
import { useAccount, useNetwork } from "wagmi";
import { getNetwork } from "../config";
import { collectionUrl } from "../idk/urls";
import Check from "./Check";

export enum Type {
  NEW_COLLECTION,
  EDIT_COLLECTION,
}
const EditPage = ({ title, type, topText, buttonText }: { topText: string; buttonText: string; title?: string; type: Type }) => {
  const router = useRouter();
  const network = router.query.network;

  const imageInput = createRef<HTMLInputElement>();
  const backgroundInput = createRef<HTMLInputElement>();
  const { data: account } = useAccount();
  const { activeChain: chain } = useNetwork();
  const [getTitles, titles] = useCollectionListLazyQuery();
  const [getSavedCollection, savedCollection] = useCollectionLazyQuery({ variables: { id: title }, context: { network } });
  const [collection, setCollection] = useState<Collection>({
    coin: { id: "select" },
    name: "",
    description: "",
    goal: "",
    url: "",
    socials: ["", "", "", ""],
    donationOptions: ["", "", ""],
  } as Collection);
  const [newTitle, setNewTitle] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const { newCollection, setIPFS, transferOwnership } = useChain({ contractAddress: savedCollection.data?.collection?.address.id });
  const { setSnack, load } = useContext(Context);

  useEffect(() => {
    if (type === Type.NEW_COLLECTION) {
      getTitles({ context: { network: chain?.name } });
    } else if (title) getSavedCollection();
  }, [type, title, getSavedCollection, getTitles, chain?.name]);

  useEffect(() => {
    const col = savedCollection.data?.collection;

    if (col)
      setCollection({
        ...(col as Collection),
        donationOptions: [col.donationOptions[0] ?? "0", col.donationOptions[1] ?? "0", col.donationOptions[2] ?? "0"],
        socials: [col.socials[0] ?? "", col.socials[1] ?? "", col.socials[2] ?? "", col.socials[3] ?? ""],
      });
  }, [savedCollection.data?.collection]);

  const transfer = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const result = await transferOwnership(newOwner);
      if (result) setSnack!("Error transfering ownership!");
    }, "Transfering ownership");
  };
  const newPro = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      if (!account) return setSnack!("User not logged in");
      if (titles.data?.collections.find((c) => c.id === newTitle)) return setSnack!("title exists ");
      if (savedCollection.data?.collection?.owner && !sameAddr(savedCollection.data.collection.owner.id, account?.address))
        return setSnack!("Not collection owner ");

      const background = backgroundInput.current?.files![0];
      const file = imageInput.current?.files![0];
      if (type !== Type.EDIT_COLLECTION && !file) return setSnack!("no image");

      const ipfsHash = await collectionIpfsUpload(collection, file, background);
      if (!ipfsHash) return setSnack!("error uploading to ipfs");

      if (type === Type.NEW_COLLECTION) {
        const error = await newCollection(newTitle, collection.coin.id, ipfsHash);
        if (error) return setSnack!(error);
      } else if (type === Type.EDIT_COLLECTION) {
        const error = await setIPFS(ipfsHash);
        if (error) return setSnack!(error);
      }

      setSnack!("Success", "success");
      router.push(collectionUrl(title ?? newTitle, chain?.name));
    }, "Editing project! \nPlease continue to your wallet");
  };
  return (
    <Layout>
      <div className="max-w-screen-md m-auto text-center">
        <h2 className="m-10 text-3xl font-bold">{topText}</h2>
        <Check owner={savedCollection.data?.collection?.owner?.id} message>
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
                    onChange={(e) => setCollection((p) => ({ ...p, coin: { ...p.coin, id: e.target.value } }))}
                    required
                    value={collection.coin.id}
                  >
                    {getNetwork(chain?.id).coins.map((c, i) => (
                      <MenuItem key={i} value={c.address}>
                        {c.coin}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
              <p>image</p>
              <input type="file" ref={imageInput} className="" />
              <p>background</p>
              <input type="file" ref={backgroundInput} className="" />
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
                value={toCoin(collection.goal, collection.coin.id)}
                onChange={(e) => setCollection((p) => ({ ...p, goal: toWeiStr(e.target.value, collection.coin.id) }))}
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
                      value={toCoin(d, collection.coin.id)}
                      required
                      onChange={(e) =>
                        setCollection((p) => ({
                          ...p,
                          donationOptions: [...p.donationOptions.map((d2, i2) => (i2 === i ? toWeiStr(e.target.value, collection.coin.id) : d2))],
                        }))
                      }
                    />
                  ))}
              </div>
            </div>
            <br />
            <Button submit className="mx-auto">
              {buttonText}
            </Button>
          </form>

          {type === Type.EDIT_COLLECTION && (
            <div className="mt-10 w-full ">
              <h3 className="text-2xl font-bold">Transfer ownership</h3>
              <form onSubmit={transfer} className="flex flex-col mt-4">
                <TextField type="text" label="New owner" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />

                <br />
                <Button submit className="mx-auto">
                  Transfer ownership
                </Button>
              </form>
            </div>
          )}
        </Check>
        <br />
        <Button href={title ? collectionUrl(title, network?.toString()) : "/"} secondary className="mx-auto">
          Back
        </Button>
      </div>
    </Layout>
  );
};

export default EditPage;
