import { clearStore, test, assert, mockIpfsFile, logStore } from 'matchstick-as/assembly/index'
import { addr, addresses, createCollection, num } from "./helpers"
import { handleAddContent, handleNewVote, handleStartVote } from "../src/mappings/collection"
import { AddContent, NewVote, StartVote } from "../generated/templates/collection/Collection"
import { param, str } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { getAnswerId, getContentId, getQuestionId, getVoteId } from '../src/helpers/getIds'
import { getAnswer, getQuestion, getSupporter } from '../src/helpers/initializers'

function createNewVoteEvent(address: string, voteId: i32, answer: i32, account: string): NewVote {
  let event = changetype<NewVote>(newMockEvent())

  event.parameters =
    [param('voteId', num(voteId)),
    param('answer', num(answer)),
    param('sender', addr(account))]

  event.address = Address.fromString(address);

  return event
}

test('New vote', () => {
  const ipfs = "This is ipfs hash"
  const voteIndex = 1
  const donated = 1000000
  const collection = createCollection()
  const account = addresses[2]

  const supporter = getSupporter(collection.id, addresses[2])
  supporter.donated = BigInt.fromI32(donated)
  supporter.save()

  const question = getQuestion(collection.id, voteIndex.toString())
  const answer0 = getAnswer(collection.id, voteIndex.toString(), "0")
  const answer1 = getAnswer(collection.id, voteIndex.toString(), "1")

  const event = createNewVoteEvent(collection.address, voteIndex, answer0.index.toI32(), account)

  handleNewVote(event)

  const voteId = getVoteId(collection.id, voteIndex.toString(), account)
  assert.fieldEquals("Vote", voteId, "id", voteId)
  assert.fieldEquals("Vote", voteId, "answer", answer0.id)
  assert.fieldEquals("Vote", voteId, "question", question.id)
  assert.fieldEquals("Vote", voteId, "supporter", supporter.id)

  assert.fieldEquals("Question", question.id, "id", question.id)
  assert.fieldEquals("Question", question.id, "votesCount", "1")
  assert.fieldEquals("Question", question.id, "votesAmount", donated.toString())

  assert.fieldEquals("Answer", answer0.id, "id", answer0.id)
  assert.fieldEquals("Answer", answer0.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer0.id, "votesAmount", donated.toString())

  assert.fieldEquals("Answer", answer1.id, "id", answer1.id)
  assert.fieldEquals("Answer", answer1.id, "votesCount", "0")
  assert.fieldEquals("Answer", answer1.id, "votesAmount", "0")

  //Changing users vote

  const event2 = createNewVoteEvent(collection.address, voteIndex, answer1.index.toI32(), account)

  handleNewVote(event2)

  assert.fieldEquals("Vote", voteId, "answer", answer1.id)

  assert.fieldEquals("Question", question.id, "votesCount", "1")
  assert.fieldEquals("Question", question.id, "votesAmount", donated.toString())

  assert.fieldEquals("Answer", answer0.id, "votesCount", "0")
  assert.fieldEquals("Answer", answer0.id, "votesAmount", "0")

  assert.fieldEquals("Answer", answer1.id, "votesCount", "1")
  assert.fieldEquals("Answer", answer1.id, "votesAmount", donated.toString())


  clearStore()
})
