import type { GetStaticProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import Streamer from "./../public/streamer.jpeg";
import { LatestProjectsDocument, LatestProjectsQueryResult, Project } from "../graphql/generated";
import { ProjectInfo } from "../interfaces/ProjectInfo";
import { apolloRequest } from "../idk/apollo";
import { getProjectInfo } from "../lib/firestore";
import { ProjectObject } from "../components/ProjectObject";

interface ProjectProps {
  projects: { project?: Project; projectInfo?: ProjectInfo }[];
}
const faqs = [
  { question: "How to start?", answer: "Go to https://ethdon.xyz/new and start your first collection" },
  {
    question: "Do I have to start new collection every time",
    answer:
      "No, one contract can have unlimited projects. Go to your contract page and click on 'New projects'. Every collection can have it's own titles and picture.",
  },
  {
    question: "Who get's the donation money?",
    answer: "When starting each project you can specify who will receive the funds, it can be you or some other account that supports some cause",
  },
  {
    question: "What's the difference between projects and collections?",
    answer:
      "Collections can have many projects, because each collection requires deploying a new smart contract, which is expensive. If one streamer want's to start raising for some other cause or for other account we recommend starting a new project. Opensea will show every project in the same collection,but you could filter by project id.",
  },
  {
    question: "How to edit collection on opensea?",
    answer:
      "Go to the collection and press the pen icon, after that you can specify many things like name, description and commission fee and its recepient",
  },
  {
    question: "Which coin can be donated",
    answer:
      "This works with every ERC20 coin, so you can pick your favorite. This website has limited coin list, to use your coin go to etherscan and create new project manually or ask us to add the coin.",
  },
  {
    question: "Are there any commissions?",
    answer: "No! Everything goes to the creator, but the supporters will still have to pay the gas fee, which depends on the network",
  },
  {
    question: "Is it decentralized?",
    answer:
      "All the smart contracts are deployed and can't be changed, all the tokens metadata still comes from private server but we are working on moving it to IPFS to make it more decentralized. Also we might launch a DAO to make the project community owned",
  },
];
const Home: NextPage<ProjectProps> = ({ projects }) => {
  return (
    <Layout className="flex flex-col items-center space-y-4 ">
      <section className="relative w-full">
        <div className="z-10 absolute text-white flex flex-col justify-center items-center w-full h-full">
          <h1 className="uppercase font-bold text-3xl mb-14">Crypto donations with NFTs for streamers</h1>
          <Link href={"/new"} passHref>
            <Button variant="contained" size="large">
              Start your project
            </Button>
          </Link>
        </div>
        <div className="">
          <Image alt="" src={Streamer} className="blur-sm scale-105" />
        </div>
      </section>
      <div className="max-w-screen-md m-auto">
        <section id="about">
          <p>
            A platform for streamers to accept crypto donations, it is decentralized, open source and with no commissions, so you can be sure all the
            money goes to you. With every donation comes NFT for the donator, that can be later used for accessing private groups, meetings and other
            benefits that the creator decides to add.
          </p>
        </section>
        <section id="why-crypto">
          <h2>Why crypto?</h2>
          <ul>
            <li>Easier to donate</li>
            <li>Smaller and more transparent fees</li>
            <li>Decentralized</li>
            <li>Crypto people are usually more generous</li>
          </ul>
        </section>
        <section id="why-crypto">
          <h2>Why NFTs?</h2>
          <ul className="list-disc">
            <li>So streamers can give back to their supporters</li>
            <li>Supporters can show that they cared about someone or some cause early</li>
            <li>If fans know that they can get something in return they might be more generous</li>
            <li>Crypto people are usually more generous</li>
            <li>If resold on market, then creator gets a percent of the sale</li>
          </ul>
        </section>
        <section id="projects">
          <h2>Latest projects</h2>
          <div className="flex flex-col  space-y-4">
            {projects.map((p, i) => (
              <ProjectObject project={p.project} projectInfo={p.projectInfo} key={i} />
            ))}
          </div>
          <Link href={"/projects"} passHref>
            <Button variant="contained">Latest projects</Button>
          </Link>
        </section>
        <section id="faq">
          <h2>FAQ</h2>
          <div>
            {/* Todo material accordion */}
            {faqs.map((f, i) => (
              <div key={i}>
                <p className="peer">{f.question}</p>
                <p hidden>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const result = await apolloRequest<LatestProjectsQueryResult>(LatestProjectsDocument, { first: 4 });
  const projects = result.data
    ? await Promise.all(
        result.data.projects.map(async (p) => {
          const info = await getProjectInfo(p.contract.id, p.count);
          return { project: (p as Project) ?? undefined, projectInfo: info ?? undefined };
        })
      )
    : [];
  return {
    props: {
      projects,
    },
    revalidate: 600,
  };
};

export default Home;
