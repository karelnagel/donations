import type { GetStaticProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { GlobalDocument, GlobalQueryResult, LatestProjectsDocument, LatestProjectsQueryResult, Project, Global } from "../graphql/generated";
import { apolloRequest } from "../idk/apollo";
import { ProjectObject } from "../components/ProjectObject";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../idk/faqs";
import { crypto, nft, streamer } from "../idk/images";

interface ProjectProps {
  projects: Project[];
  global: Global | null;
}

const Home: NextPage<ProjectProps> = ({ projects, global }) => {
  const stats = [
    { number: global?.streamersCount, stat: "streamer" },
    { number: global?.usersCount, stat: "donators" },
    { number: global?.projectsCount, stat: "projects" },
    { number: global?.donationsCount, stat: "donations" },
  ];
  return (
    <Layout className="flex flex-col items-center space-y-4">
      <div className="relative w-full h-screen bg-cover bg-[url('/svgs/blobs.svg')] p-10">
        <div className="flex justify-between flex-col items-center h-full">
          <div></div>
          <div className="flex w-full max-w-screen-lg space-x-4 justify-between items-center">
            <div className="md:basis-3/5">
              <h1 className="text-white text-5xl md:text-6xl font-bold">Crypto donations for streamers</h1>
              <p className="my-10 text-lg">Decentralized opensource platform for accepting crypto donations, with rewarding NFTs</p>
              <Button href="/new" variant="contained">
                Start your project
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
            <li>Streamer creates a new Project</li>
            <li>
              Streamer can add a overlay of their project to their stream (
              <a href={process.env.NEXT_PUBLIC_URL + "/projects/ethdon/1/stream"}>example</a>)
            </li>
            <li>
              Streamer adds donation link to their stream description (<a href={process.env.NEXT_PUBLIC_URL + "/projects/ethdon/1"}>example</a>)
            </li>
            <li>Users go to the link and can donate in crypto using their ethereum wallet</li>
            <li>After donating user receives a NFT with donation message and amount in the attributes</li>
            <li>Streamer gets all the donated money (or if they set someone other as beneficiary then they will get the money)</li>
            <li>Streamer can use these NFTs as a access tokens or any other way they wish</li>
          </ol>
        </section>
        <section id="projects" className="text-center">
          <h2 className="text-center">Latest projects</h2>
          <div className="flex flex-col  space-y-4 max-w-screen-sm mx-auto my-10">
            {projects.map((p, i) => (
              <ProjectObject project={p} key={i} />
            ))}
          </div>
          <Link href={"/projects"} passHref>
            <Button variant="contained" className="">
              Latest projects
            </Button>
          </Link>
        </section>
        <section id="faq">
          <h2>FAQ</h2>
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
  const result = await apolloRequest<LatestProjectsQueryResult>(LatestProjectsDocument, { first: 4 });
  const projects = result.data?.projects ? result.data.projects.map((p) => p as Project) : [];

  const result2 = await apolloRequest<GlobalQueryResult>(GlobalDocument);
  const global = result2.data?.global ? (result2.data.global as Global) : null;
  return {
    props: {
      projects,
      global,
    },
    revalidate: 60,
  };
};

export default Home;
