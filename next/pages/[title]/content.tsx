import React, { useContext, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Content, useContentQuery } from "../../graphql/generated";
import { Context } from "../../idk/context";
import { coinName, sameAddr, toCoin, toWei } from "../../idk/helpers";
import { TextField } from "@mui/material";
import Button from "../../components/Button";
import { uploadJson } from "../../lib/ipfs";
import useChain from "../../hooks/useChain";
import { useAccount, useSignMessage } from "wagmi";
import axios from "axios";
import { encrypt } from "../../lib/encryption";

const ProjectContent: NextPage = () => {
  const { title } = useRouter().query;
  const { load, setSnack } = useContext(Context);
  const { data: signature, signMessageAsync } = useSignMessage();
  const { data: account } = useAccount();
  const { data: collection } = useContentQuery({ variables: { title: title?.toString(), account: account?.address! } });
  const { addContent } = useChain({ contractAddress: collection?.collection?.address.id });
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [content, setContent] = useState("");
  const [data, setData] = useState<Content[]>();

  const startVoteForm = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const encryptedContent = encrypt(content);

      const hash = await uploadJson({ description, price, content: encryptedContent });
      if (!hash) return setSnack!("Error uploading content");
      console.log("Uploaded " + hash);

      const result = await addContent(hash);
      if (result) return setSnack!(result);
    }, "Adding content");
  };

  const getData = async () => {
    try {
      const signature = await signMessageAsync({ message: `Load content for ${title}` });
      const result = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/content/${title}`, {
        params: {
          signature,
          account: account?.address,
        },
      });
      if (result.status === 200) {
        setData(result.data);
        console.log(result.data);
      }
    } catch {
      setSnack!("Error getting data");
    }
  };
  return (
    <Layout className="flex flex-col items-center space-y-10">
      <h1 className="text-3xl">Content</h1>

      {collection?.collection && (
        <div className="w-full max-w-screen-sm mx-auto">
          {sameAddr(collection.collection.owner?.id, account?.address) && (
            <div className="">
              <h3>Add content</h3>
              <form action="" onSubmit={startVoteForm}>
                <TextField
                  label="Description (visible to everyone)"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <TextField
                  label="Price to see"
                  inputProps={{ step: "any" }}
                  type="number"
                  value={toCoin(price, collection.collection.coin.id)}
                  onChange={(e) => setPrice(toWei(e.currentTarget.value, collection.collection?.coin.id).toString())}
                  required
                />
                <TextField
                  label="Content (visible to everyone who hold enough tokens)"
                  required
                  value={content}
                  onChange={(e) => setContent(e.currentTarget.value)}
                />

                <Button submit>Add content</Button>
              </form>
            </div>
          )}
          <Button onClick={getData}>Load</Button>
          <div className="space-y-10">
            {data && data.map((c) => (
              <div key={c.id}>
                <p>{c.description}</p>
                <p>
                  {toCoin(c.price, c.collection.coin.id)} {coinName(c.collection.coin.id)}
                </p>
                <p>{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Button href={`/${title}`}>Back</Button>
    </Layout>
  );
};

export default ProjectContent;
