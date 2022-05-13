import { BigNumber } from "@ethersproject/bignumber";
import React from "react";
import { Question } from "../graphql/generated";
import { coinName, toCoin } from "../idk/helpers";

export default function QuestionObject({ question, vote }: { question: Question; vote: (voteId: BigNumber, answer: BigNumber) => void }) {
  const timeLeft = (question.endTime - Date.now() / 1000) / 60 / 60;
  const answerPercents = question.answers.map((a) =>
    question.votesAmount !== "0" ? (Number(a.votesAmount) / Number(question.votesAmount)) * 100 : 0
  );
  return (
    <div key={question.id} className="">
      <p className="text-2xl mb-4">{question.question}</p>
      <p>
        {toCoin(question.votesAmount, question.collection.coin.id)} {coinName(question.collection.coin.id)} voted by {question.votesCount} voters
      </p>
      <p>{timeLeft.toFixed(2)} hours remaining</p>
      {question.answers.map((a, i) => (
        <div
          className="group relative my-2 border-black border grid grid-cols-3 justify-items-center p-3 rounded-r-xl cursor-pointer hover:scale-105"
          key={a.id}
          onClick={() => vote(question.index, a.index)}
        >
          <div style={{ width: `${answerPercents[i]}%` }} className={`absolute bg-secondary h-full left-0 top-0 rounded-r-xl`}></div>
          <p className="relative">{a.answer}</p>
          <p className="font-bold relative invisible group-hover:visible">VOTE</p>
          <p className="relative">
            {answerPercents[i].toFixed(2)}% by {a.votesCount} voters
          </p>
        </div>
      ))}
    </div>
  );
}
