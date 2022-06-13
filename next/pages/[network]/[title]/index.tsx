import React, { useContext, useEffect, useState } from "react";
import { apolloRequest } from "../../../idk/apollo";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/Layout";
import { coinName, getImage, sameAddr, toCoin, toWei } from "../../../idk/helpers";
import useChain from "../../../hooks/useChain";
import { Chip, CircularProgress, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { AccountObject } from "../../../components/AccountObject";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import { useRouter } from "next/router";
import { Context } from "../../../idk/context";
import { ProgresssBar } from "../../../components/ProgressBar";
import { NewDonation } from "../../../components/NewDonation";
import Link from "next/link";
import { networks } from "../../../config";
import Button from "../../../components/Button";
import { Collection, CollectionDocument, CollectionListDocument, CollectionListQueryResult, CollectionQueryResult } from "../../../graphql/generated";
import useCollection from "../../../hooks/useCollection";
import { useBalance, useAccount } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import Check from "../../../components/Check";
import { collectionUrl, openseaUrl } from "../../../idk/urls";

interface Params extends ParsedUrlQuery {
  title: string;
  network: string;
}
interface CollectionProps {
  initialCollection: Collection | null;
  title: string;
  network: string;
}
const CollectionPage: NextPage<CollectionProps> = ({ initialCollection: initialCollection, title, network }) => {
  const router = useRouter();
  const { data: account } = useAccount();
  const { collection, lastDonation } = useCollection(title, network, initialCollection);
  const { setSnack, load } = useContext(Context);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [tokenId, setTokenId] = useState("");

  const { data: balance } = useBalance({ token: collection?.coin.id, addressOrName: account?.address });
  const { donate, getAllowance, approve } = useChain({
    contractAddress: collection?.address.id,
    coinAddress: collection?.coin.id,
  });
  const donationOptions = [
    toCoin(collection?.donationOptions[0] ?? "0", collection?.coin.id),
    toCoin(collection?.donationOptions[1] ?? "0", collection?.coin.id),
    toCoin(collection?.donationOptions[2] ?? "0", collection?.coin.id),
    toCoin(balance?.value.toString() ?? "0", collection?.coin.id),
  ];

  useEffect(() => {
    if (sameAddr(lastDonation?.donator.id, account?.address)) {
      setTokenId(lastDonation?.id.split("_t")[1]!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDonation]);

  const makeDonation = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const amountInWei = toWei(amount, collection?.coin.id);

      const allowance = await getAllowance();
      if (amountInWei.gt(balance?.value ?? BigNumber.from(0))) {
        return setSnack!("Balance too low");
      }
      if (amountInWei.gt(allowance)) {
        const error = await approve(amountInWei);
        if (error) return setSnack!(error);
      }
      const error2 = await donate(amountInWei, message);
      if (error2) return setSnack!(error2);
      setSnack!("Donation was successful", "success");
      setTokenId((t) => t ?? "loading");
    }, "Making donation! \n\nThis will take 2 transactions: \n1. for approving spending the coins  \n2. for donating. \n\nPlease continue to your wallet!");
  };
  if (!collection) return <h1>Loading...</h1>;
  else if (!networks.find((n) => sameAddr(n.chain.name, network))) return <h1>No network named {network}!</h1>;
  return (
    <div>
      <CustomHead name={collection.name} description={collection.description} image={getImage(collection.image)} />
      <Layout>
        <div
          className={`fixed ${tokenId ? "visible" : "invisible"} top-0 w-full h-full bg-black bg-opacity-50 z-20 flex`}
          onClick={() => {
            setTokenId("");
          }}
        >
          <div className="m-auto bg-white p-4 rounded-md flex flex-col items-center">
            <p className="uppercase font-bold my-4 text-black">Donation successful</p>
            <p className="mb-2 text-black">View your NFT on Opensea:</p>
            {tokenId && tokenId !== "loading" ? (
              <Button href={openseaUrl(network, collection.address.id, tokenId)} newTab>
                View NFT
              </Button>
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
        <div className="fixed top-0 right-0 rounded-bl-2xl overflow-hidden">
          <NewDonation donation={lastDonation} />
        </div>
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="mt-20 mb-10 text-4xl  font-bold">Donate to {collection.name}</h1>

          <div
            className={`bg-project bg-cover md:flex relative overflow-hidden justify-between mb-6 shadow-lg p-4 rounded-lg shadow-primary bg-zinc-800`}
          >
            <Image layout="fill" alt="" src={getImage(collection.background)} />
            <Link href={openseaUrl(network, collection.address.id, "1")} passHref>
              <div className="min-w-60 w-60 h-60 relative object-cover rounded-3xl overflow-hidden m-auto cursor-pointer">
                {collection.image && (
                  <Image
                    placeholder="blur"
                    blurDataURL="/favicon.png"
                    priority
                    src={getImage(collection.image)}
                    alt=""
                    layout="fill"
                    className="object-cover"
                  />
                )}
              </div>
            </Link>
            <div className="md:text-right flex flex-col justify-between md:ml-4 md:w-[60%] z-10 relative">
              <div>
                <p className="my-2">{collection.description}</p>
                <span className="flex justify-end items-center space-x-2">
                  <p className="my-2">Money goes to:</p>
                  <AccountObject account={collection.owner?.id!} />
                </span>
              </div>

              <div className=" flex space-x-4 md:justify-end justify-center">
                {collection.url && (
                  <a href={collection.url}>
                    <LinkIcon fontSize="large" />
                  </a>
                )}
                {collection.socials[0] && (
                  <a href={collection.socials[0]}>
                    <YouTubeIcon fontSize="large" />
                  </a>
                )}
                {collection.socials[1] && (
                  <a href={collection.socials[1]}>
                    <FacebookIcon fontSize="large" />
                  </a>
                )}
                {collection.socials[2] && (
                  <a href={collection.socials[2]}>
                    <TwitterIcon fontSize="large" />
                  </a>
                )}
                {collection.socials[3] && (
                  <a href={collection?.socials[3]}>
                    <InstagramIcon fontSize="large" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-evenly mb-12">
            <Button text href={collectionUrl(title, network, "content")}>
              Private content
            </Button>
            <Button text href={collectionUrl(title, network, "vote")}>
              Voting
            </Button>
            <Button text href={collectionUrl(title, network, "supporters")}>
              Supporters
            </Button>
          </div>
          <ProgresssBar collection={collection} />
          <br />
          <Check>
            <div className="mb-20 flex flex-col items-stretch max-w-sm mx-auto space-y-4">
              <h2 className="my-4 text-lg font-bold">Make a donation to {collection.name}</h2>
              <form onSubmit={makeDonation} className="flex-col flex space-y-2">
                <TextField type="text" label="Your message" onChange={(e) => setMessage(e.currentTarget.value)} required />
                <TextField
                  type="number"
                  inputProps={{ step: "any" }}
                  label="How much you want to donate?"
                  id="filled-start-adornment"
                  error={amount ? toWei(amount, collection?.coin.id).gt(balance?.value ?? BigNumber.from(0)) : false}
                  helperText={amount && toWei(amount, collection?.coin.id).gt(balance?.value ?? BigNumber.from(0)) ? "Balance too low" : ""}
                  value={amount}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{coinName(collection.coin.id)}</InputAdornment>,
                  }}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  required
                />
                <div className="w-full flex justify-between pb-4">
                  {donationOptions.map((o, i) => (
                    <Chip key={i} label={i === 3 ? "MAX" : o} onClick={() => setAmount(o)} variant={amount === o ? "filled" : "outlined"} />
                  ))}
                </div>
                <Button submit>Donate</Button>
              </form>
              <Check owner={collection.owner?.id}>
                <div>
                  <Button secondary href={collectionUrl(title, network, "edit")}>
                    Edit
                  </Button>
                  <Button
                    secondary
                    onClick={() => {
                      navigator.clipboard.writeText(collectionUrl(title, network, "stream", true));
                      setSnack!("Stream link copied to clipboard!", "success");
                    }}
                  >
                    Copy stream link
                  </Button>
                </div>
              </Check>
            </div>
          </Check>
        </div>
      </Layout>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths: { params: Params }[] = [];

  for (const network of networks) {
    const result = await apolloRequest<any>(CollectionListDocument, network.chain.name);
    const params = result.data?.collections.map((p: any) => ({ params: { title: p.id, network: network.chain.name.toLowerCase() } }));
    if (params) paths.push(...params);
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CollectionProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const network = context.params?.network ?? "";
  const result = await apolloRequest<CollectionQueryResult>(CollectionDocument, network, { id: title });

  const initialCollection = result.data?.collection ? (result.data.collection as Collection) : null;
  return {
    props: {
      initialCollection: initialCollection,
      title,
      network,
    },
    revalidate: 10,
  };
};

export default CollectionPage;
