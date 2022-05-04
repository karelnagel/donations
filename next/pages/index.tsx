import type { GetStaticProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { GlobalDocument, GlobalQueryResult, Global, Collection, LatestCollectionsQueryResult, LatestCollectionsDocument } from "../graphql/generated";
import { apolloRequest } from "../idk/apollo";
import { CollectionObject } from "../components/CollectionObject";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../idk/faqs";
import { crypto, nft } from "../idk/images";
import Button from "../components/Button";

interface ProjectProps {
  collections: Collection[];
  global: Global | null;
}

const Home: NextPage<ProjectProps> = ({ collections, global }) => {
  const stats = [
    { number: global?.collectionsCount, stat: "collections" },
    { number: global?.usersCount, stat: "users" },
    { number: global?.supportersCount, stat: "supporters" },
    { number: global?.donationsCount, stat: "donations" },
  ];
  return (
    <Layout className="flex flex-col items-center space-y-4" noMargin>
      <div className="relative w-full h-screen bg-cover bg-blobs p-10">
        <div className="flex justify-between flex-col items-center h-full">
          <div></div>
          <div className="flex w-full max-w-screen-lg space-x-4 justify-between items-center">
            <div className="md:basis-3/5">
              <h1 className="text-white text-5xl md:text-6xl font-bold">Crypto donations for streamers</h1>
              <p className="my-10 text-lg">Decentralized opensource platform for accepting crypto donations, with rewarding NFTs</p>
              <Button href="/new" big>
                Start your collection
              </Button>
            </div>
          </div>
          <div className="flex justify-between max-w-lg w-full space-x-2">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center uppercase">
                <p className="text-3xl font-bold">{s.number}</p>
                <p>{s.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-screen-md m-auto">
        <section id="about">
          <p className=" text-center text-2xl">
            A decentralized opensource platform for accepting crypto donations in live streams. All donations are NFTs, that allow the streamer to
            create private content, groups and meetups for their supporters.
          </p>
        </section>
        <section id="why-crypto" className="md:flex justify-between items-center space-x-4">
          <div>
            <h2>Why crypto?</h2>
            <ul>
              <li>Easier to donate</li>
              <li>Smaller and more transparent fees</li>
              <li>Decentralized</li>
              <li>Crypto people are usually more generous with their donations</li>
            </ul>
          </div>
          <div className="home-image">
            <Image src={crypto} alt="" layout="fill" className="object-cover"></Image>
          </div>
        </section>
        <section id="why-nfts" className="md:flex flex-row justify-between items-center space-x-4">
          <div className="home-image">
            <Image src={nft} alt="" layout="fill" className="object-cover"></Image>
          </div>
          <div className="flex-auto">
            <h2 className="">Why NFTs?</h2>
            <ul>
              <li>Streamers can give back to their supporters</li>
              <li>Supporters can show that they cared about someone or some cause</li>
              <li>If fans know that they can get something in return they might donate more</li>
              <li>If resold on the market, then creator gets a percent of the sale</li>
            </ul>
          </div>
        </section>
        <section>
          <h2>How does this work?</h2>
          <ol>
            <li>Streamer creates a new Collection</li>
            <li>
              Streamer can add a overlay of their collection to their stream (
              <a href={process.env.NEXT_PUBLIC_URL + "/projects/ethdon/1/stream"}>example</a>)
            </li>
            <li>
              Streamer adds donation link to their stream description (<a href={process.env.NEXT_PUBLIC_URL + "/projects/ethdon/1"}>example</a>)
            </li>
            <li>Users go to the link and can donate in crypto using their ethereum wallet</li>
            <li>After donating user receives a NFT with donation message and amount in the attributes</li>
            <li>All the donated money goes to the streamer</li>
            <li>Streamer can use these NFTs as a access tokens, for private content, as tickets or any other way they wish</li>
          </ol>
        </section>
        <section id="projects" className="flex flex-col items-center">
          <h2 className="text-center">Latest collections</h2>
          <div className="flex flex-col  space-y-6 max-w-screen-sm  w-full mx-auto my-10">
            {collections.map((p, i) => (
              <CollectionObject collection={p} key={i} />
            ))}
          </div>
          <Button href="/collections">Latest collections</Button>
        </section>
        <section id="faq">
          <h2 className="text-center">FAQ</h2>
          <div>
            {/* Todo material accordion */}
            {faqs.map((f, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <p>{f.question}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <p>{f.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const result = await apolloRequest<LatestCollectionsQueryResult>(LatestCollectionsDocument, { first: 4 });
  const collections = result.data?.collections ? result.data.collections.map((c) => c as Collection) : [];

  const result2 = await apolloRequest<GlobalQueryResult>(GlobalDocument);
  const global = result2.data?.global ? (result2.data.global as Global) : null;
  return {
    props: {
      collections,
      global,
    },
    revalidate: 60,
  };
};

export default Home;
