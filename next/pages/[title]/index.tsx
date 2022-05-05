import React, { useContext, useEffect, useState } from "react";
import { apolloRequest } from "../../idk/apollo";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layout";
import { coinName, getImage, sameAddr, toCoin, toWei } from "../../idk/helpers";
import useChain from "../../hooks/useChain";
import useBalance from "../../hooks/useBalance";
import { Chip, CircularProgress, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import { AccountObject } from "../../components/AccountObject";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import { useRouter } from "next/router";
import { Context } from "../../idk/context";
import { ProgresssBar } from "../../components/ProgressBar";
import { NewDonation } from "../../components/NewDonation";
import Link from "next/link";
import Modal from "../../components/Modal";
import { network } from "../../config";
import Button from "../../components/Button";
import { Collection, CollectionDocument, CollectionListDocument, CollectionListQueryResult, CollectionQueryResult } from "../../graphql/generated";
import useCollection from "../../hooks/useCollection";

interface Params extends ParsedUrlQuery {
  title: string;
}
interface CollectionProps {
  initialCollection: Collection | null;
  title: string;
}
const CollectionPage: NextPage<CollectionProps> = ({ initialCollection: initialCollection, title }) => {
  const router = useRouter();
  const { collection, lastDonation } = useCollection(title, initialCollection);
  const { user, setSnack, load } = useContext(Context);

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [tokenId, setTokenId] = useState("");

  const { balance } = useBalance(collection?.coin.id);
  const { donate, getAllowance, approve } = useChain({
    contractAddress: collection?.address,
    coinAddress: collection?.coin.id,
  });

  const donationOptions = [
    toCoin(collection?.donationOptions[0] ?? "0", collection?.coin.id),
    toCoin(collection?.donationOptions[1] ?? "0", collection?.coin.id),
    toCoin(collection?.donationOptions[2] ?? "0", collection?.coin.id),
    toCoin(balance.toString(), collection?.coin.id),
  ];

  useEffect(() => {
    if (sameAddr(lastDonation?.donator.id, user?.address)) {
      setTokenId(lastDonation?.id.split("_t")[1]!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastDonation]);

  const makeDonation = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const amountInWei = toWei(amount, collection?.coin.id);

      const allowance = await getAllowance();
      if (amountInWei.gt(balance)) {
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
  console.log(collection?.background);
  if (!collection) return <h1>Loading...</h1>;
  return (
    <>
      <CustomHead name={collection.name} description={collection.description} image={getImage(collection.image)} />
      <Layout>
        <Modal
          visible={!!tokenId}
          onClose={() => {
            setTokenId("");
          }}
        >
          <p className="uppercase font-bold my-4 text-black">Donation successful</p>
          <p className="mb-2 text-black">View your NFT on Opensea:</p>
          {tokenId && tokenId !== "loading" ? (
            <Button href={`${network.opensea}${collection.address}/${tokenId}`} newTab>
              View NFT
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Modal>
        <div className="fixed top-0 right-0 rounded-bl-2xl overflow-hidden">
          <NewDonation donation={lastDonation} />
        </div>
        <div className="max-w-screen-md mx-auto text-center">
          <h1 className="mt-20 mb-10 text-4xl  font-bold">{collection.name}</h1>
          <div
            className={`bg-project bg-cover md:flex relative overflow-hidden justify-between mb-20 shadow-lg p-4 rounded-lg shadow-primary bg-zinc-800`}
          >
            <Image layout="fill" alt="" src={getImage(collection.background)} />
            <div className="min-w-60 w-60 h-60 relative object-cover rounded-3xl overflow-hidden m-auto">
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
            <div className="md:text-right flex flex-col justify-between md:ml-4 md:w-[60%] z-10">
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

          <ProgresssBar collection={collection} />
          <br />
          {user ? (
            <div className="mb-20 flex flex-col items-stretch max-w-sm mx-auto space-y-4">
              <h2 className="my-4 text-lg font-bold">Make a donation to {collection.name}</h2>
              <form onSubmit={makeDonation} className="flex-col flex space-y-2">
                <TextField type="text" label="Your message" onChange={(e) => setMessage(e.currentTarget.value)} required />
                <TextField
                  type="number"
                  inputProps={{ step: "any" }}
                  label="How much you want to donate?"
                  id="filled-start-adornment"
                  error={amount ? toWei(amount, collection?.coin.id).gt(balance) : false}
                  helperText={amount && toWei(amount, collection?.coin.id).gt(balance) ? "Balance too low" : ""}
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
                <Button>Donate</Button>
              </form>
              {sameAddr(collection.owner?.id, user.address) && (
                <>
                  <Link href={`/${title}/edit`} passHref>
                    <Button secondary>Edit</Button>
                  </Link>
                  <Button
                    secondary
                    onClick={() => {
                      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}${router.asPath}/stream`);
                      setSnack!("Stream link copied to clipboard!", "success");
                    }}
                  >
                    Copy stream link
                  </Button>
                </>
              )}
            </div>
          ) : (
            <p className="my-10 uppercase font-bold text-lg">{!user ? "Connect your wallet to make a donation" : "Collection is not active"}</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloRequest<CollectionListQueryResult>(CollectionListDocument);

  const paths = result.data?.collections.map((p) => ({ params: { title: p.id } })) ?? [];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CollectionProps, Params> = async (context) => {
  const title = context.params?.title ?? "";
  const collectionId = context.params?.collectionId ?? "";
  const result = await apolloRequest<CollectionQueryResult>(CollectionDocument, { id: title });

  const initialCollection = result.data?.collection ? (result.data.collection as Collection) : null;
  return {
    props: {
      initialCollection: initialCollection,
      title,
    },
    revalidate: 10,
  };
};

export default CollectionPage;
