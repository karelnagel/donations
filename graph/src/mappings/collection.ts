import {
  OwnershipTransferred,
  NewDonation,
  SetIPFS,
  Transfer,
  AddContent,
  StartVote,
  NewVote
} from "../../generated/templates/collection/Collection"
import { ZERO_ADDRESS } from "../helpers/consts"
import { getDonation, getCollectionAddress, getAccount, getSupporter, getCoin, getCollectionByAddress, getContent, getQuestion, getAnswer, getVote } from "../helpers/initializers"
import { getCollectionIpfs } from "../helpers/getCollectionIpfs"
import { getContentIpfs } from "../helpers/getContentIpfs"
import { getQuestionIpfs } from "../helpers/getQuestionIpfs"
import { Answer, Question, Vote } from "../../generated/schema"
import { BigInt, log } from "@graphprotocol/graph-ts"
import { getVoteId } from "../helpers/getIds"

export function handleNewDonation(event: NewDonation): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  collection.donated = collection.donated.plus(event.params.amount);
  collection.donationsCount++;
  collection.save()

  const account = getAccount(event.params.sender.toHexString())

  const donation = getDonation(collection.id, event.params.id.toString())
  donation.amount = event.params.amount
  donation.message = event.params.message;
  donation.donator = account.id
  donation.supporter = getSupporter(collection.id, account.id).id
  donation.time = event.block.timestamp;
  donation.save()

  const coin = getCoin(collection.coin)
  coin.donationsCount++;
  coin.donated = coin.donated.plus(event.params.amount)
  coin.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  if (event.params.previousOwner.toHexString() == ZERO_ADDRESS) return // First ownership transfer is to the factory contract

  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  collection.owner = getAccount(event.params.newOwner.toHexString()).id;
  collection.save()
}

export function handleSetIPFS(event: SetIPFS): void {
  const title = getCollectionAddress(event.address.toHexString())
  if (!title) return;

  getCollectionIpfs(title.collection, event.params.ipfs)
}

export function handleTransfer(event: Transfer): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  const donation = getDonation(collection.id, event.params.tokenId.toString())

  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    const oldSupporter = getSupporter(collection.id, event.params.from.toHexString())
    oldSupporter.donated = oldSupporter.donated.minus(donation.amount)
    oldSupporter.donationsCount--
    oldSupporter.save()

    for (let i = 1; i <= collection.questionsCount; i++) {
      const vote = Vote.load(getVoteId(collection.id, i.toString(), oldSupporter.account));
      if (vote) {
        const question = Question.load(vote.question)
        if (question && event.block.timestamp <= question.endTime) {
          question.votesAmount = question.votesAmount.minus(donation.amount)
          question.save()

          const answer = Answer.load(vote.answer)
          if (answer) {
            answer.votesAmount = answer.votesAmount.minus(donation.amount)
            answer.save()
          }
        }
      }
    }
  }
  const newSupporter = getSupporter(collection.id, event.params.to.toHexString())
  newSupporter.donated = newSupporter.donated.plus(donation.amount)
  newSupporter.donationsCount++
  newSupporter.save()

  for (let i = 1; i <= collection.questionsCount; i++) {
    const vote = Vote.load(getVoteId(collection.id, i.toString(), newSupporter.account));
    if (vote) {
      const question = Question.load(vote.question)
      if (question && event.block.timestamp <= question.endTime) {

        question.votesAmount = question.votesAmount.plus(donation.amount)
        question.save()

        const answer = Answer.load(vote.answer)
        if (answer) {
          answer.votesAmount = answer.votesAmount.plus(donation.amount)
          answer.save()
        }
      }
    }
  }
  donation.supporter = newSupporter.id
  donation.save()
}

export function handleAddContent(event: AddContent): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return
  const content = getContent(collection.id, event.params.ipfs)
  content.time = event.block.timestamp
  content.save()
  getContentIpfs(collection.id, event.params.ipfs)
}

export function handleStartVote(event: StartVote): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return
  collection.questionsCount++;
  collection.save()

  const question = getQuestion(collection.id, event.params.voteId.toString())
  question.ipfs = event.params.data
  question.index = event.params.voteId
  question.endTime = event.params.endTime
  question.time = event.block.timestamp
  question.save()

  getQuestionIpfs(collection.id, event.params.voteId.toString(), event.params.data)
}

export function handleNewVote(event: NewVote): void {
  const collection = getCollectionByAddress(event.address.toHexString())
  if (!collection) return

  const supporter = getSupporter(collection.id, event.params.sender.toHexString())

  const vote = getVote(collection.id, event.params.voteId.toString(), event.params.sender.toHexString())

  if (!vote.answer) { //If not yet voted
    const question = getQuestion(collection.id, event.params.voteId.toString())
    question.votesCount++;
    question.votesAmount = question.votesAmount.plus(supporter.donated)
    question.save()
  }

  const oldAnswer = Answer.load(vote.answer)
  if (oldAnswer) {
    oldAnswer.votesCount--;
    oldAnswer.votesAmount = oldAnswer.votesAmount.minus(supporter.donated)
    oldAnswer.save()
  }

  const answer = getAnswer(collection.id, event.params.voteId.toString(), event.params.answer.toString())
  answer.votesCount++;
  answer.votesAmount = answer.votesAmount.plus(supporter.donated);
  answer.save()

  vote.answer = answer.id
  vote.save()
}