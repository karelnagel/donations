import { clearStore, test, assert, mockIpfsFile, logStore } from 'matchstick-as/assembly/index'
import { createCollection, num } from "./helpers"
import { handleAddContent, handleStartVote } from "../src/mappings/collection"
import { AddContent, StartVote } from "../generated/templates/collection/Collection"
import { param, str } from "./helpers"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Address } from '@graphprotocol/graph-ts'
import { getAnswerId, getContentId, getQuestionId } from '../src/helpers/getIds'

function createStartVoteEvent(address: string, voteId: i32, endTime: i32, data: string): StartVote {
  let event = changetype<StartVote>(newMockEvent())

  event.parameters =
    [param('voteId', num(voteId)),
    param('endTime', num(endTime)),
    param('data', str(data))]

  event.address = Address.fromString(address);

  return event
}

test('Start vote', () => {
  const ipfs = "This is ipfs hash"
  const voteId = 1
  const endTime = 100
  const collection = createCollection()

  const event = createStartVoteEvent(collection.address, voteId, endTime, ipfs)

  mockIpfsFile(ipfs, 'tests/ipfs/question.json')
  handleStartVote(event)

  assert.fieldEquals("Collection", collection.id, "questionsCount", "1")

  const questionId = getQuestionId(collection.id, voteId.toString())
  assert.fieldEquals("Question", questionId, "id", questionId)
  assert.fieldEquals("Question", questionId, "index", voteId.toString())
  assert.fieldEquals("Question", questionId, "endTime", endTime.toString())
  assert.fieldEquals("Question", questionId, "collection", collection.id)
  assert.fieldEquals("Question", questionId, "question", "This is question")
  assert.fieldEquals("Question", questionId, "votesCount", "0")
  assert.fieldEquals("Question", questionId, "votesAmount", "0")
  assert.fieldEquals("Question", questionId, "ipfs", ipfs)

  for (let i = 0; i < 3; i++) {
    const answerId = getAnswerId(collection.id, voteId.toString(), i.toString())
    assert.fieldEquals("Answer", answerId, "id", answerId)
    assert.fieldEquals("Answer", answerId, "index", i.toString())
    assert.fieldEquals("Answer", answerId, "answer", "This is answer " + i.toString())
    assert.fieldEquals("Answer", answerId, "votesCount", "0")
    assert.fieldEquals("Answer", answerId, "votesAmount", "0")
    assert.fieldEquals("Answer", answerId, "question", questionId)
    assert.fieldEquals("Answer", answerId, "id", answerId)
  }
  clearStore()
})
