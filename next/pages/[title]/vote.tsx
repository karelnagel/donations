import React, { useContext, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Question, useQuestionsQuery } from "../../graphql/generated";
import { Context } from "../../idk/context";
import { sameAddr } from "../../idk/helpers";
import { TextField } from "@mui/material";
import Button from "../../components/Button";
import { uploadJson } from "../../lib/ipfs";
import useChain from "../../hooks/useChain";
import { BigNumber, ethers } from "ethers";
import QuestionObject from "../../components/Question";

const ProjectVote: NextPage = () => {
  const { title } = useRouter().query;
  const { user, load, setSnack } = useContext(Context);
  const { data } = useQuestionsQuery({ variables: { title: title?.toString() }, pollInterval: 1000 });
  const { startVote, newVote } = useChain({ contractAddress: data?.collection?.address.id });
  const [question, setQuestion] = useState("");
  const [hours, setHours] = useState("1");
  const [answers, setAnswers] = useState(["", ""]);

  const startVoteForm = async (e: any) => {
    e.preventDefault();
    load!(async () => {
      const hash = await uploadJson({ question, answers });
      if (!hash) return setSnack!("Error uploading vote info");
      console.log("Uploaded " + hash);

      const result = await startVote(ethers.BigNumber.from(hours).mul(60 * 60), hash);
      if (result) return setSnack!(result);
    }, "Starting new vote");
  };
  const vote = async (voteId: BigNumber, answer: BigNumber) => {
    load!(async () => {
      const result = await newVote(voteId, answer);
      if (result) setSnack!(result);
    }, "Voting ");
  };
  return (
    <Layout className="flex flex-col items-center space-y-10">
      <h1 className="text-3xl">Voting</h1>
      {data?.collection && (
        <div className="w-full max-w-screen-sm mx-auto">
          {sameAddr(data.collection.owner?.id, user?.address) && (
            <div className="">
              <h3>Create new vote</h3>
              <form action="" onSubmit={startVoteForm}>
                <TextField label="Question" required value={question} onChange={(e) => setQuestion(e.currentTarget.value)} />
                <TextField
                  label="Hours"
                  inputProps={{ step: "any" }}
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.currentTarget.value)}
                  required
                />
                {answers.map((a, i) => (
                  <div key={i} className="flex">
                    <TextField
                      label={`Answer ${i + 1}`}
                      required
                      value={answers[i]}
                      onChange={(e) => setAnswers((as) => as.map((a, i2) => (i2 === i ? e.target.value : a)))}
                    />
                  </div>
                ))}
                <div className="flex space-x-4">
                  <Button text onClick={() => setAnswers((a) => [...a, ""])}>
                    Add answer
                  </Button>
                  {answers.length > 2 && (
                    <Button text onClick={() => setAnswers((a) => a.filter((_, i) => i !== answers.length - 1))}>
                      Remove last
                    </Button>
                  )}
                </div>

                <Button submit>Create new vote</Button>
              </form>
            </div>
          )}
          <div className="space-y-10">
            {data.collection.questions.map((q) => (
              <QuestionObject key={q.id} question={q as Question} vote={vote} />
            ))}
          </div>
        </div>
      )}
      <Button href={`/${title}`}>Back</Button>
    </Layout>
  );
};

export default ProjectVote;
