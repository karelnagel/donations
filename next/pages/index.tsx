import type { GetStaticProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { LatestProjectsDocument, LatestProjectsQueryResult, Project } from "../graphql/generated";
import { ProjectInfo } from "../interfaces/ProjectInfo";
import { apolloRequest } from "../idk/apollo";
import { getProjectInfo } from "../lib/firestore";
import { ProjectObject } from "../components/ProjectObject";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../idk/faqs";
import { crypto, nft, streamer } from "../idk/images";

interface ProjectProps {
  projects: { project?: Project; projectInfo?: ProjectInfo }[];
}

const Home: NextPage<ProjectProps> = ({ projects }) => {
  return (
    <Layout className="flex flex-col items-center space-y-4 ">
      <div className="relative w-full">
        <div className="z-10 absolute text-white flex flex-col justify-center items-center w-full h-full">
          <h1 className="uppercase font-bold md:text-3xl mb-14 text-center text-xl">Crypto donations with NFTs for streamers</h1>
          <Link href={"/new"} passHref>
            <Button variant="contained" size="large">
              Start your project
            </Button>
          </Link>
        </div>
        <div className="w-full relative h-96">
          <Image alt="" src={streamer} className="blur-sm scale-105 object-cover" layout="fill" />
        </div>
      </div>
      <div className="max-w-screen-md m-auto">
        <section id="about">
          <p className=" text-center text-lg">
            A platform for streamers to accept crypto donations, it is decentralized, open source and with no commissions, so you can be sure all the
            money goes to you. With every donation comes NFT for the donator, that can be later used for accessing private groups, meetings and other
            benefits that the creator decides to add.
          </p>
        </section>
        <section id="why-crypto" className="md:flex justify-between items-center">
          <div>
            <h2>Why crypto?</h2>
            <ul>
              <li>Easier to donate</li>
              <li>Smaller and more transparent fees</li>
              <li>Decentralized</li>
              <li>Crypto people are usually more generous</li>
            </ul>
          </div>
          <div className="home-image">
            <Image src={crypto} alt="" layout="fill" className="object-cover"></Image>
          </div>
        </section>
        <section id="why-nfts" className="md:flex flex-row-reverse justify-between items-center">
          <div className="flex-1">
            <h2 className="uppercase font-bold text-lg">Why NFTs?</h2>
            <ul>
              <li>So streamers can give back to their supporters</li>
              <li>Supporters can show that they cared about someone or some cause early</li>
              <li>If fans know that they can get something in return they might be more generous</li>
              <li>Crypto people are usually more generous</li>
              <li>If resold on market, then creator gets a percent of the sale</li>
            </ul>
          </div>
          <div className="home-image">
            <Image src={nft} alt="" layout="fill" className="object-cover"></Image>
          </div>
        </section>
        <section id="projects" className="text-center">
          <h2 className="text-center">Latest projects</h2>
          <div className="flex flex-col  space-y-4 max-w-screen-sm mx-auto my-10">
            {projects.map((p, i) => (
              <ProjectObject project={p.project} projectInfo={p.projectInfo} key={i} />
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
